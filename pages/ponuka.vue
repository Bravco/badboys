<template>
    <section id="hero-alt">
        <h1>Ponuka</h1>
        <div class="hero-background"></div>
    </section>
    <Quickinfo/>
    <Menu title="Pizza" :items="pizzas">
        <template v-slot:description>
            <p>MINI - ∅ 20 cm, 300 g</p>
            <p>CLASSIC - ∅ 30 cm, 500 g</p>
            <p>MAXI - ∅ 50 cm, 900 g</p>
        </template>
    </Menu>

    <Menu title="Štangle" :items="stangle">
        <template v-slot:description>
            <p>DRESING - 140 g : klasik, cesnakový, pikantný</p>
        </template>
    </Menu>
</template>

<script setup>
    const client = useSupabaseClient();

    const { data: pizzas } = await useAsyncData("pizzas", async () => {
        const { data } = (await client.from("pizzas").select().order("id"));
        return data;
    });

    const { data: stangle } = await useAsyncData("stangle", async () => {
        const { data } = (await client.from("stangle").select().order("id"));
        return data;
    });

    const { data: salads } = await useAsyncData("salads", async () => {
        const { data } = (await client.from("salads").select().order("id"));
        return data;
    });

    const { data: pasta } = await useAsyncData("pasta", async () => {
        const { data } = (await client.from("pasta").select().order("id"));
        return data;
    });

    const { data: others } = await useAsyncData("others", async () => {
        const { data } = (await client.from("others").select().order("id"));
        return data;
    });
</script>

<style scoped>
    .hero-background {
        background-image: url("~/assets/hero-ponuka.png");
    }
</style>