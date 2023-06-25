<template>
    <div>
        <section>
            <form @submit.prevent="login">
                <h4>Autentifikácia</h4>
                <div class="inputfield">
                    <input v-model="email" id="email" name="email" type="email">
                    <label for="email">Email</label>
                </div>
                <div class="inputfield">
                    <Icon 
                        @click.prevent="togglePasswordVisibility" 
                        class="visibility" 
                        :name="passwordVisible ? 'fa6-solid:eye-slash' : 'fa6-solid:eye'" 
                        size="1rem"
                    />
                    <input v-model="password" id="password" name="password" :type="passwordVisible ? 'text' : 'password'">
                    <label for="password">Heslo</label>
                </div>
                <button class="btn-login btn-primary" type="submit">Prihlásiť sa</button>
            </form>
        </section>
    </div>
</template>

<script setup>
    useHead({
        title: "Bad Boys | Autentifikácia",
    });

    definePageMeta({
        middleware: ["auth"],
    });

    const email = ref("");
    const password = ref("");
    const passwordVisible = ref(false);

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

    function togglePasswordVisibility() {
        passwordVisible.value = !passwordVisible.value;
    }
</script>

<style scoped>
    form {
        min-width: 25%;
        display: grid;
        gap: 2rem;
        padding: 3rem 2.5rem;
        background-color: var(--color-background-secondary);
        border-radius: .5rem;
    }

    .inputfield {
        display: flex;
        flex-flow: column-reverse;
        gap: .5rem;
        position: relative;
    }

    .inputfield label {
        font-size: .75rem;
        font-weight: 500;
        color: var(--color-text-alt);
        transition: color 300ms;
    }

    .inputfield input {
        width: 100%;
        background-color: var(--color-background-primary);
        color: var(--color-text);
    }

    .inputfield input:focus + label {
        color: var(--color-primary);
    }

    .btn-login {
        width: 100%;
        font-size: 1rem;
    }

    .visibility {
        position: absolute;
        bottom: .6rem;
        right: 1rem;
        cursor: pointer;
        transition: filter 300ms;
    }

    .visibility:hover {
        filter: opacity(50%);
    }
</style>