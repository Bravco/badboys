<template>
    <div>
        <section id="table">
            <ClientOnly>
                <v-data-table
                    class="table"
                    theme="dark"
                    :headers="headers"
                    :items="pizzas"
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

    const search = ref("");
    const headers = [
        { title: "#", key: "id" },
        { title: "Názov", key: "title" },
        { title: "Deskripcia", key: "description", sortable: false },
        { title: "Alergény", key: "alergens", sortable: false },
        { title: "(€) Normálna Cena", key: "normalPrice" },
        { title: "(€) Mini Cena", key: "miniPrice" },
        { title: "(€) Maxi Cena", key: "maxiPrice" },
        { title: "Vegetariánska", key: "isVegetarian" },
        { title: "Pikantná", key: "isSpicy" },
    ];
    
    const client = useSupabaseClient();
    const user = useSupabaseUser();

    const { data: pizzas } = await useAsyncData("pizzas", async () => {
        const { data } = (await client.from("pizzas").select().order("id"));
        return data;
    });

    onMounted(() => {
        watchEffect(() => {
            if (!user.value) {
                navigateTo("/auth");
            }
        });
    });
</script>

<style scoped>
    .v-theme-dark {
        --v-theme-surface: (25, 25, 25);
    }

    #table {
        align-content: flex-start;
        padding: 4rem 0 0 0;
    }

    .search-icon {
        margin-left: .75rem;
        color: var(--color-text-alt);
    }
</style>