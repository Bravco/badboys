<template>
    <div>
        <Floatingitems style="--floating-items-top: 50vh"/>
        <section id="hero-alt">
            <h1 v-motion-slide-left>Ponuka</h1>
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
        <Menu title="Šaláty" :items="salads" :is-pizza="false"/>
        <Menu title="Cestoviny" :items="pasta" :is-pizza="false"/>
        <Menu title="Ďalšie" :items="others" :is-pizza="false"/>
        <section id="ingredients" v-motion-slide-visible-bottom>
            <div class="heading">
                <h2>Prílohy</h2>
                <p class="paragraph-alt">Prílohy na maxi pizzu sa účtujú dvojnásobne</p>
            </div>
            <ul>
                <li class="description-item">Syr (120g), Saláma (70g), Šunka (90g), Klobása (100g), Slanina (70g), Kuracie mäso (220g) - <span>2.00 €</span></li>
                <li class="description-item">Tuniak (90g) - <span>1.50 €</span></li>
                <li class="description-item">Kukurica (110g), Olivy (90g), Čierne olivy (90g), Brokolica (110g), Cibuľa (120g), Paradajka (130g), Paprika (90g), Šampiňóny (160g), Ananás (120g) - <span>2.50 €</span></li>
                <li class="description-item">Syrový okraj (120g) - <span>2.50 €</span></li>
            </ul>
        </section>
        <section id="alergens" v-motion-slide-visible-bottom>
            <div class="heading">
                <h2>Alergény</h2>
            </div>
            <ul>
                <li>1. Obilniny obsahujúce lepok. t. j. pšenica, raž, jačmeň, ovos, špalda, kamut alebo ich hybridné odrody.</li>
                <li>3. Vajcia a výrobky z nich.</li>
                <li>4. Ryby a výrobky z nich.</li>
                <li>7. Mlieko a výrobky z neho.</li>
                <li>8. Orechy, ktorými sú mandle, lieskové orechy, vlašské orechy, kešu, pekanové orechy, para orechy, pistácie, makadamové orechy a výrobky z nich.</li>
                <li>10. Horčica a výrobky z nej.</li>
            </ul>
        </section>
    </div>
</template>

<script setup>
    useHead({
        title: "Bad Boys | Ponuka",
    });

    const client = useSupabaseClient();

    async function fetchTableData(tableName) {
        const { data } = await client.from(tableName).select().order("id");
        return data;
    }

    const { data: pizzas } = await useAsyncData("pizzas", async () => fetchTableData("pizzas"));
    const { data: stangle } = await useAsyncData("stangle", async () => fetchTableData("stangle"));
    const { data: salads } = await useAsyncData("salads", async () => fetchTableData("salads"));
    const { data: pasta } = await useAsyncData("pasta", async () => fetchTableData("pasta"));
    const { data: others } = await useAsyncData("others", async () => fetchTableData("others"));

    let channel;
    onMounted(() => {
        channel = client.channel("changes").on(
            "postgres_changes",
            {
                event: "*",
                schema: "public",
                table: "*",
            },
            async (payload) => {
                const { data: pizzas } = await useAsyncData("pizzas", async () => fetchTableData("pizzas"));
                const { data: stangle } = await useAsyncData("stangle", async () => fetchTableData("stangle"));
                const { data: salads } = await useAsyncData("salads", async () => fetchTableData("salads"));
                const { data: pasta } = await useAsyncData("pasta", async () => fetchTableData("pasta"));
                const { data: others } = await useAsyncData("others", async () => fetchTableData("others"));
            },
        ).subscribe();
    });

    onUnmounted(() => {
        channel.unsubscribe();
    });
</script>

<style scoped>
    .hero-background {
        background-image: url("~/assets/hero-ponuka.png");
    }

    #ingredients, #alergens {
        min-height: unset;
        align-content: start;
        gap: 4rem;
        padding-bottom: 10%;
    }

    #ingredients ul, #alergens ul {
        display: grid;
        gap: 1rem;
    }
    
    .description-item span {
        font-size: 1.25rem;
        font-weight: 500;
    }
</style>