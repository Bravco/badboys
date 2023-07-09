<template>
    <div class="floating-items">
        <nuxt-img
            v-for="i in itemsCount" 
            v-motion-fade-visible
            loading="lazy"
            :src="`/floatingItems/${Math.floor(Math.random() * 5)}.svg`"
            alt="floating-item"
            class="floating-item" 
            :style="{
                'margin-top': `${32 * i}rem`,
                ...((i % 2) === 0 ? { right: '5%' } : { left: '5%' }),
                'rotate': Math.random()*360 + 'deg',
            }"
        />
    </div>
</template>

<script setup>
    const itemsCount = ref(0);

    onMounted(() => {
        setTimeout(() => {
            const totalHeight = window.document.querySelector(".floating-items").offsetHeight;
            const magicNumber = 550;
            itemsCount.value = Math.round(totalHeight / magicNumber);
        }, 1000);
    });
</script>

<style>
    div:has(> .floating-items) {
        position: relative;
    }
</style>

<style scoped>
    .floating-items {
        width: 100%;
        height: calc(100% - var(--floating-items-top));
        position: absolute;
        top: var(--floating-items-top);
        z-index: -1;
    }
    
    .floating-item {
        position: absolute;
        width: 10rem;
        height: 10rem;
        filter: brightness(0) invert(1) opacity(.15);
    }
</style>