<template>
    <section id="hero-alt">
        <h1>Ponuka</h1>
        <div class="hero-background"></div>
    </section>
</template>

<script setup>
    const client = useSupabaseClient();

    const { data } = await useAsyncData("pizzas", async () => {
        const { data } = (await client.from("pizzas").select());
        return data;
    });

    console.log(data);
</script>

<style scoped>
    .hero-background {
        background-image: url("~/assets/hero-ponuka.png");
    }
</style>