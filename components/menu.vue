<template>
    <div>
        <section id="menu-section">
            <div class="heading" v-motion-slide-visible-bottom>
                <h2>{{ title }}</h2>
                <div class="menu-description paragraph-alt">
                    <slot name="description"></slot>
                </div>
            </div>
            <ul class="menu-list">
                <li v-for="item in items" class="menu-item" v-motion-slide-visible-bottom>
                    <img v-if="isPizza" class="menu-item-image" src="~/assets/pizza.svg" alt="item-image">
                    <img v-else class="menu-item-image" src="~/assets/salad.svg" alt="item-image">
                    <div class="menu-item-info">
                        <div class="text">
                            <h4>
                                {{ item.title }}
                                <Icon v-if="item.isVegetarian" class="vegetarian-icon" name="fa6-solid:leaf" size="1.5rem"/>
                                <Icon v-if="item.isSpicy" class="spicy-icon" name="fa6-solid:pepper-hot" size="1.5rem"/>
                            </h4>
                            <p>
                                {{ item.description }}
                                <span v-if="item.alergens" class="alergens">({{ item.alergens }})</span>
                            </p>
                        </div>
                        <h4 class="price">
                            {{ item.miniPrice ? item.miniPrice.toFixed(2) : null }}
                            <span v-if="item.miniPrice">/</span>
                            {{ item.normalPrice ? item.normalPrice.toFixed(2) : null }}
                            <span v-if="item.maxiPrice">/</span>
                            {{ item.maxiPrice ? item.maxiPrice.toFixed(2) : null }}
                            <span>€</span>
                        </h4>
                    </div>
                </li>
            </ul>
        </section>
    </div>
</template>

<script setup>
    const props = defineProps({
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: false,
        },
        items: {
            type: Array,
            required: true,
        },
        isPizza: {
            type: Boolean,
            default: true,
            required: false,
        },
    });
</script>

<style scoped>
    #menu-section {
        min-height: unset;
        align-content: start;
        gap: 4rem;
        padding-bottom: 10%;
    }

    .menu-description {
        display: flex;
        gap: 2rem;
        font-weight: 500;
    }

    .menu-list {
        display: grid;
        grid-template-columns: repeat(2, 32rem);
        gap: 2rem;
    }

    .menu-item {
        display: flex;
        align-items: center;
        gap: 2rem;
    }

    .menu-item-image {
        height: 6rem;
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

    @media only screen and (max-width: 1024px) {
        .menu-list {
            grid-template-columns: 32rem;
        }
    }
</style>