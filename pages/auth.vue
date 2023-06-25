<template>
    <section>
        <form @submit.prevent="login">
            <label for="email">Email</label>
            <input v-model="email" id="email" name="email" type="email">
            
            <label for="password">Heslo</label>
            <input v-model="password" id="password" name="password" type="password">

            <button type="submit">Prihlásiť sa</button>
        </form>
    </section>
</template>

<script setup>
    definePageMeta({
        middleware: ["auth"],
    });

    const email = ref("");
    const password = ref("");

    const client = useSupabaseClient();
    const user = useSupabaseUser();

    onMounted(() => {
        watchEffect(() => {
            if (user.value) {
                navigateTo("/dashboard");
            }
        });
    });

    async function login() {
        const { error } = await client.auth.signInWithPassword({
            email: email.value,
            password: password.value,
        });
        console.log(error);
    }
</script>