<template>
    <div>
        <ul class="info-list" v-motion-slide-visible-bottom>
            <li class="info-item">
                <div class="icon-wrapper">
                    <Icon name="fa6-solid:phone" size="3rem"/>
                </div>
                <div class="content">
                    <h3>Telefón</h3>
                    <div class="text">
                        <p>+421 902 532 676</p>
                        <p>+421 944 692 269</p>
                    </div>
                </div>
            </li>
            <li class="info-item">
                <div class="icon-wrapper">
                    <Icon name="fa6-solid:location-dot" size="3rem"/>
                </div>
                <div class="content">
                    <h3>Lokácia</h3>
                    <div class="text">
                        <p>Slovenského raja 169/23,</p>
                        <p>053 11 Smižany</p>
                    </div>
                </div>
            </li>
            <li class="info-item">
                <div class="icon-wrapper">
                    <Icon name="fa6-solid:van-shuttle" size="3rem"/>
                </div>
                <div class="content">
                    <h3>Donáška</h3>
                    <div class="text">
                        <p>Smižany, sídlisko Západ <span>ZDARMA</span></p>
                        <p>SNV, Sp. Tomášovce, Arnútovce, Iliašovce <span>1.00 €</span></p>
                        <p>Ferčekovce, Harichovce, Letanovce, Sp. Štvrtok <span>1.50 €</span></p>
                    </div>
                </div>
            </li>
            <li class="info-item">
                <div class="icon-wrapper">
                    <Icon name="fa6-solid:clock" size="3rem"/>
                </div>
                <div class="content">
                    <h3>Otváracie hodiny</h3>
                    <div class="text">
                        <p>PO-SO: 11.00 - 22.00</p>
                        <p>NE: 14.00 - 22.00</p>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<style scoped>
    .info-list {
        display: grid;
        grid-template-columns: 1fr 2fr 2fr 1fr;
        padding: 8rem 5%;
    }

    .info-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2rem;
    }

    .info-item:first-child {
        margin-right: auto;
    }

    .info-item:last-child {
        margin-left: auto;
    }

    .icon-wrapper {
        width: 6rem;
        height: 6rem;
        display: grid;
        place-items: center;
        background-color: var(--color-primary);
        border-radius: .5rem;
    }

    .content {
        display: grid;
        gap: 1rem;
    }

    h3, .text p {
        text-align: center;
    }

    .text p span {
        color: var(--color-primary);
    }
</style>