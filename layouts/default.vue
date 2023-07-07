<template>
    <header>
        <nav>
            <Logo class="logo"/>
            <ul :class="['nav-list', {'active' : isMobileMenuActive}]">
                <li :class="['nav-item', { 'active': currentRoute.fullPath === '/' }]">
                    <NuxtLink to="/">Domov</NuxtLink>
                </li>
                <li :class="['nav-item', { 'active': currentRoute.fullPath === '/ponuka' }]">
                    <NuxtLink to="/ponuka">Ponuka</NuxtLink>
                </li>
                <li v-if="user" :class="['nav-item', { 'active': currentRoute.fullPath === '/dashboard' }]">
                    <NuxtLink to="/dashboard">Dashboard</NuxtLink>
                </li>
            </ul>
            <button @click.prevent="toggleMobileMenu" :class="['hamburger', {'active' : isMobileMenuActive}]">
                <span class="bar"></span>
            </button>
        </nav>
    </header>
    <slot/>
    <footer>
        <div class="background"></div>
        <div class="content">
            <div class="left">
                <Logo/>
                <p>Najlepšia pizza na celom východnom Slovensku.</p>
                <a v-if="user" @click.prevent="logout" class="footer-link">Odhlásiť sa</a>
                <NuxtLink v-else class="footer-link" to="/auth">Prihlásiť sa</NuxtLink>
            </div>
            <div class="right">
                <div class="footer-item">
                    <h4>Navigácia</h4>
                    <ul>
                        <li><NuxtLink to="/">Domov</NuxtLink></li>
                        <li><NuxtLink to="/ponuka">Ponuka</NuxtLink></li>
                        <li v-if="user"><NuxtLink to="/dashboard">Dashboard</NuxtLink></li>
                    </ul>
                </div>
                <div class="footer-item">
                    <h4>Otváracie hodiny</h4>
                    <ul>
                        <li>PO-SO 11.00 - 22.00</li>
                        <li>NE: 14.00 - 22.00</li>
                    </ul>
                </div>
                <div class="footer-item">
                    <h4>Kontakt</h4>
                    <ul>
                        <li>+421 902 532 676</li>
                        <li>+421 944 692 269</li>
                    </ul>
                </div>
                <div class="footer-item">
                    <h4>Lokácia</h4>
                    <ul>
                        <li>Slovenského raja 169/23,</li>
                        <li>053 11 Smižany</li>
                    </ul>
                    <a class="footer-link" href="https://www.google.com/maps/place/BAD+BOYS+PIZZA/@48.9548108,20.5139215,15z/data=!4m2!3m1!1s0x0:0x99f8b7d67837fe23?sa=X&ved=2ahUKEwiA0qXmj8r_AhUhiv0HHaSSAEQQ_BJ6BAhgEAg" target="_blank">Pozri na mape ↗</a>
                </div>
            </div>
        </div>
        <hr>
        <p class="copyright">copyright 2023 &copy; Bad Boys | Made by Bravčo</p>
    </footer>
</template>

<script setup>
    const { currentRoute, afterEach } = useRouter();
    const client = useSupabaseClient();
    const user = useSupabaseUser();
    const isMobileMenuActive = ref(false);

    afterEach(() => {
        isMobileMenuActive.value = false;
    });

    function logout() {
        client.auth.signOut();
    }

    function toggleMobileMenu() {
        isMobileMenuActive.value = !isMobileMenuActive.value;
    }
</script>

<style scoped>
    nav {
        width: 100vw;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: fixed;
        padding: 1rem 5%;
        background-color: rgba(0, 0, 0, .25);
        backdrop-filter: blur(.5rem);
        z-index: 100;
    }

    .nav-list {
        display: flex;
        gap: 5rem;
    }

    .nav-item {
        font-weight: 500;
    }

    .nav-item.active {
        border-bottom: 2px solid var(--color-primary);
    }

    .hamburger {
        display: none;
    }

    footer {
        display: grid;
        gap: .5rem;
        position: relative;
        padding: 8rem 5% 1rem 5%;
    }

    footer .background {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -100;
        background-image: url("~/assets/footer.png");
        background-repeat: no-repeat;
        background-position: top;
        background-size: cover;
    }

    footer .content {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
    }

    footer .content .left, .footer-item {
        display: flex;
        flex-direction: column;
        gap: .5rem;
    }

    footer .content .left {
        max-width: 16rem;
    }

    footer .content .right {
        display: flex;
        justify-content: space-between;
        gap: 8rem;
    }

    .footer-item ul {
        display: grid;
        gap: .25rem;
    }

    .footer-link {
        margin-top: 1rem;
        text-decoration: underline;
        font-weight: 500;
        color: var(--color-primary);
    }

    footer .copyright {
        text-align: center;
        color: var(--color-text-alt);
    }

    @media only screen and (max-width: 1024px) {
        footer .content {
            flex-direction: column;
            gap: 4rem;
        }

        footer .content .right {
            flex-direction: column;
            gap: 2rem;
        }
    }

    @media only screen and (max-width: 768px) {
        .nav-list {
            width: 100%;
            height: 100vh;
            opacity: 0;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            position: absolute;
            top: 0;
            left: 0;
            transition-property: opacity, background-color, backdrop-filter;
            transition-duration: 300ms;
        }

        .nav-list.active {
            opacity: 1;
            background-color: rgba(0, 0, 0, .25);
            backdrop-filter: blur(.5rem);
        }

        .nav-list:not(.active) {
            pointer-events: none;
        }

        nav:has(.nav-list.active) {
            background-color: unset;
            backdrop-filter: unset;
            transition-property: background-color;
            transition-duration: 300ms;
        }

        .nav-item {
            width: fit-content;
            font-size: 3rem;
        }

        .nav-item.active {
            border-width: 4px;
        }

        .logo, .hamburger {
            z-index: 1;
        }

        .hamburger {
            width: 2rem;
            height: 2rem;
            display: block;
            position: relative;
        }

        .hamburger .bar, .hamburger::after, .hamburger::before {
            content: "";
            width: 100%;
            height: .25rem;
            display: block;
            margin: 6px 0;
            background-color: var(--color-text);
            border-radius: .25rem;
            transition: all 300ms;
        }

        .hamburger:not(.active):hover .bar {
            background-color: var(--color-primary);
            transform: translate(8px);
        }

        .hamburger.active .bar {
            opacity: 0;
        }

        .hamburger.active::before {
            transform: rotate(-45deg) translate(-7px, 7px);
        }

        .hamburger.active::after {
            transform: rotate(45deg) translate(-7px, -7px);
        }
    }
</style>