<template>
    <div>
        <section id="table">
            <v-list class="menu" theme="dark" :selected="selectedMenuItem">
                <v-list-subheader>Menu</v-list-subheader>
                <v-list-item
                    v-for="(item, index) in menuItems"
                    :key="index"
                    :value="item.id"
                    :title="item.title"
                    :subtitle="item.subtitle"
                    @click="selectMenuItem(item.id)"
                    color="primary"
                >
                    <template v-slot:prepend>
                        <v-avatar :color="item.color">
                            <v-icon color="white" :icon="item.icon"></v-icon>
                        </v-avatar>
                    </template>
                </v-list-item>
            </v-list>
            <ClientOnly>
                <v-data-table
                    class="table"
                    theme="dark"
                    :headers="headers"
                    :items="getSelectedMenu()"
                    :search="search"
                    sortAscIcon="mdi-menu-up"
                    sortDescIcon="mdi-menu-down"
                >
                    <template v-slot:top>
                        <Icon class="search-icon" name="fa:search" size="1rem"/>
                        <input v-model="search" type="text" placeholder="Vyhľadaj...">
                    </template>
                    <template v-slot:item.isVegetarian="{ item }">
                        <v-chip :color="item.raw.isVegetarian ? 'green' : 'red'">
                            {{ item.raw.isVegetarian ? "Áno" : "Nie" }}
                        </v-chip>
                    </template>
                    <template v-slot:item.isSpicy="{ item }">
                        <v-chip :color="item.raw.isSpicy ? 'green' : 'red'">
                            {{ item.raw.isSpicy ? "Áno" : "Nie" }}
                        </v-chip>
                    </template>
                    <template v-slot:item.actions="{ item }">
                        <v-icon class="me-2" size="small" @click="">mdi-pencil</v-icon>
                        <v-icon size="small" @click="">mdi-delete</v-icon>
                    </template>
                    <template v-slot:no-data>
                        <p>Žiadne výsledky</p>
                    </template>
                </v-data-table>
            </ClientOnly>
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

    const client = useSupabaseClient();
    const user = useSupabaseUser();

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
    
    const selectedMenuItem = ref([0]);
    const menuItems = ref([
        {
            id: 0,
            title: "Pizza",
            subtitle: pizzas.value.length,
            icon: "mdi-pizza",
            color: "red",
        },
        {
            id: 1,
            title: "Štangle",
            subtitle: stangle.value.length,
            icon: "mdi-food-takeout-box",
            color: "purple",
        },
        {
            id: 2,
            title: "Šaláty",
            subtitle: salads.value.length,
            icon: "mdi-apple",
            color: "green",
        },
        {
            id: 3,
            title: "Cestoviny",
            subtitle: pasta.value.length,
            icon: "mdi-pasta",
            color: "orange",
        },
        {
            id: 4,
            title: "Ďalšie",
            subtitle: others.value.length,
            icon: "mdi-food",
            color: "blue",
        },
    ]);
    const search = ref("");
    const headers = [
        { title: "#", key: "id" },
        { title: "Názov", key: "title" },
        { title: "Deskripcia", key: "description", sortable: false },
        { title: "Alergény", key: "alergens", sortable: false },
        { title: "(€) Normálna Cena", key: "normalPrice" },
        { title: "(€) Mini Cena", key: "miniPrice" },
        { title: "(€) Maxi Cena", key: "maxiPrice" },
        { title: "Vegetariánske", key: "isVegetarian" },
        { title: "Pikantné", key: "isSpicy" },
        { title: "", key: "actions", sortable: false },
    ];

    function selectMenuItem(id) {
        selectedMenuItem.value = [id];
    }

    function getSelectedMenu() {
        switch (selectedMenuItem.value["0"]) {
            case 0:
                return pizzas.value;
            
            case 1:
                return stangle.value;
            
            case 2:
                return salads.value;
            
            case 3:
                return pasta.value;
            
            case 4:
                return others.value;
            
            default:
                return pizzas.value;
        }
    }

    onMounted(() => {
        watchEffect(() => {
            if (!user.value) {
                navigateTo("/auth");
            }
        });
    });
</script>

<style scoped>
    #table {
        grid-template-columns: 12rem 1fr;
        align-content: flex-start;
        align-items: flex-start;
        padding: 4rem 0 0 0;
    }

    .menu {
        width: 100%;
        display: grid;
        gap: 1rem;
    }

    .search-icon {
        margin-left: .75rem;
        color: var(--color-text-alt);
    }

    @media only screen and (max-width: 1280px) {
        #table {
            grid-template-columns: 1fr;
        }

        .menu {
            display: flex;
        }
    }
</style>