<template>
    <section id="hero-alt">
        <h1>Ponuka</h1>
        <div class="hero-background"></div>
    </section>
    <Quickinfo/>
    <section class="menu-section">
        <div class="menu-header">
            <h2>Pizza</h2>
            <div class="menu-description paragraph-alt">
                <p>MINI - ∅ 20 cm, 300 g</p>
                <p>CLASSIC - ∅ 30 cm, 500 g</p>
                <p>MAXI - ∅ 50 cm, 900 g</p>
            </div>
        </div>
        <ul class="menu-list">
            <li v-for="pizza in pizzas" class="menu-item">
                <img class="menu-item-image" src="~/assets/pizza.svg" alt="pizza">
                <div class="menu-item-info">
                    <div class="text">
                        <h4>
                            {{ pizza.title }}
                            <Icon v-if="pizza.isVegetarian" class="vegetarian-icon" name="fa6-solid:leaf" size="1.5rem"/>
                            <Icon v-if="pizza.isSpicy" class="spicy-icon" name="fa6-solid:pepper-hot" size="1.5rem"/>
                        </h4>
                        <p>
                            {{ pizza.description }}
                            <span class="alergens">({{ pizza.alergens }})</span>
                        </p>
                    </div>
                    <h4 class="price">
                        {{ pizza.miniPrice?.toFixed(2) }}
                        <span v-if="pizza.miniPrice">/</span>
                        {{ pizza.normalPrice.toFixed(2) }}
                        <span v-if="pizza.maxiPrice">/</span>
                        {{ pizza.maxiPrice?.toFixed(2) }}
                        <span>€</span>
                    </h4>
                </div>
            </li>
        </ul>
    </section>
</template>

<script setup>
    const client = useSupabaseClient();

    const { data: pizzas } = await useAsyncData("pizzas", async () => {
        const { data } = (await client.from("pizzas").select().order("id"));
        return data;
    });
</script>

<style scoped>
    .hero-background {
        background-image: url("~/assets/hero-ponuka.png");
    }

    .menu-section {
        justify-content: center;
        align-content: start;
        gap: 4rem;
        padding-bottom: 10%;
    }

    .menu-header {
        display: grid;
        place-items: center;
        gap: 1rem;
    }

    .menu-description {
        display: flex;
        gap: 2rem;
    }

    .menu-list {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
        gap: 2rem;
    }

    .menu-item {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .menu-item-image {
        width: 6rem;
        filter: invert(1) opacity(50%);
    }

    .menu-item-info {
        display: grid;
        gap: 1rem;
    }

    .menu-item-info .text {
        display: grid;
        gap: .25rem;
    }

    .price {
        color: var(--color-primary);
    }

    .price span, .alergens {
        color: var(--color-text-alt);
    }

    .vegetarian-icon {
        color: #4EFF4A;
    }

    .spicy-icon {
        color: red;
    }
</style>