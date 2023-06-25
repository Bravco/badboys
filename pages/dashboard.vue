<template>
    <div>
        <section>
            <div>
                <h4>Dashboard</h4>
                <p class="paragraph-alt">Work in progress...</p>
            </div>
        </section>
    </div>
</template>

<script setup>
    useHead({
        title: "Bad Boys | Dashboard",
    });

    definePageMeta({
        middleware: ["auth"],
    });
    
    const user = useSupabaseUser();

    onMounted(() => {
        watchEffect(() => {
            if (!user.value) {
                navigateTo("/auth");
            }
        });
    });
</script>