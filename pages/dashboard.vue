<template>
    <div>
        <section id="table">
            <v-list class="menu" theme="dark" :selected="selectedMenuIndex">
                <v-list-subheader>Menu</v-list-subheader>
                <v-list-item
                    v-for="(item, index) in menuItems"
                    :key="index"
                    :value="item.id"
                    :title="item.title"
                    :subtitle="item.count"
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
                    :items="selectedMenu.items"
                    :search="search"
                    sortAscIcon="mdi-menu-up"
                    sortDescIcon="mdi-menu-down"
                >
                    <template v-slot:top>
                        <v-toolbar class="toolbar">
                            <Icon class="search-icon" name="fa:search" size="1rem"/>
                            <input v-model="search" type="text" placeholder="Vyhľadaj...">
                            <v-spacer></v-spacer>
                            <v-dialog v-model="dialog" persistent max-width="32rem">
                                <template v-slot:activator="{ props }">
                                    <v-btn color="primary" v-bind="props">Pridať položku</v-btn>
                                </template>
                                <v-card>
                                    <v-card-title>
                                        <h4>{{ formTitle }}</h4>
                                    </v-card-title>

                                    <v-card-text>
                                        <v-container>
                                            <v-row>
                                                <v-col>
                                                    <v-text-field
                                                        v-model="editedItem.title"
                                                        label="Názov"
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col>
                                                    <v-text-field
                                                        v-model="editedItem.alergens"
                                                        label="Alergény"
                                                    ></v-text-field>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col>
                                                    <v-text-field
                                                        v-model="editedItem.description"
                                                        label="Deskripcia"
                                                    ></v-text-field>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col>
                                                    <v-text-field
                                                        v-model="editedItem.miniPrice"
                                                        prefix="€"
                                                        label="Mini cena"
                                                        type="number"
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col>
                                                    <v-text-field
                                                        v-model="editedItem.normalPrice"
                                                        prefix="€"
                                                        label="Classic cena"
                                                        type="number"
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col>
                                                    <v-text-field
                                                        v-model="editedItem.maxiPrice"
                                                        prefix="€"
                                                        label="Maxi cena"
                                                        type="number"
                                                    ></v-text-field>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col>
                                                    <v-checkbox v-model="editedItem.isVegetarian" color="green" label="Vegetariánske"></v-checkbox>
                                                </v-col>
                                                <v-col>
                                                    <v-checkbox v-model="editedItem.isSpicy" color="red" label="Pikantné"></v-checkbox>
                                                </v-col>
                                            </v-row>
                                        </v-container>
                                    </v-card-text>

                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn variant="text" @click="close">Zrušiť</v-btn>
                                        <v-btn color="primary" variant="text" @click="save">Uložiť</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                            <v-dialog v-model="dialogDelete" persistent max-width="32rem">
                                <v-card>
                                    <v-card-title>
                                        <h4>
                                            {{ `Naozaj chcete odstrániť položku ${editedItem.title}?` }}
                                        </h4>
                                    </v-card-title>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="primary" variant="text" @click="closeDelete">Nie</v-btn>
                                        <v-btn variant="text" @click="deleteItemConfirm">Áno</v-btn>
                                        <v-spacer></v-spacer>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-toolbar>
                    </template>
                    <template v-slot:item.id="{ item }">
                        <p>{{ selectedMenu.items.indexOf(item.raw)+1 }}</p>
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
                        <div class="actions">
                            <v-icon class="me-2" size="small" @click="editItem(item.raw)">mdi-pencil</v-icon>
                            <v-icon size="small" @click="deleteItem(item.raw)">mdi-delete</v-icon>
                        </div>
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

    async function fetchTableData(tableName) {
        const { data } = await client.from(tableName).select().order("id");
        return data;
    }

    const { data: pizzas } = await useAsyncData("pizzas", async () => fetchTableData("pizzas"));
    const { data: stangle } = await useAsyncData("stangle", async () => fetchTableData("stangle"));
    const { data: salads } = await useAsyncData("salads", async () => fetchTableData("salads"));
    const { data: pasta } = await useAsyncData("pasta", async () => fetchTableData("pasta"));
    const { data: others } = await useAsyncData("others", async () => fetchTableData("others"));
    
    const selectedMenuIndex = ref([0]);
    const menuItems = ref([
        {
            id: 0,
            title: "Pizza",
            count: pizzas.value.length,
            icon: "mdi-pizza",
            color: "red",
        },
        {
            id: 1,
            title: "Štangle",
            count: stangle.value.length,
            icon: "mdi-food-takeout-box",
            color: "purple",
        },
        {
            id: 2,
            title: "Šaláty",
            count: salads.value.length,
            icon: "mdi-apple",
            color: "green",
        },
        {
            id: 3,
            title: "Cestoviny",
            count: pasta.value.length,
            icon: "mdi-pasta",
            color: "orange",
        },
        {
            id: 4,
            title: "Ďalšie",
            count: others.value.length,
            icon: "mdi-food",
            color: "blue",
        },
    ]);

    const dialog = ref(false);
    const dialogDelete = ref(false);
    const defaultItem = {
        title: null,
        description: null,
        alergens: null,
        normalPrice: null,
        miniPrice: null,
        maxiPrice: null,
        isVegetarian: false,
        isSpicy: false,
    };
    const editedItem = ref(defaultItem);
    const editedIndex = ref(-1);
    const search = ref("");
    const headers = [
        { title: "#", key: "id" },
        { title: "Názov", key: "title" },
        { title: "Deskripcia", key: "description", sortable: false },
        { title: "Alergény", key: "alergens", sortable: false },
        { title: "(€) Mini Cena", key: "miniPrice" },
        { title: "(€) Normálna Cena", key: "normalPrice" },
        { title: "(€) Maxi Cena", key: "maxiPrice" },
        { title: "Vegetariánske", key: "isVegetarian" },
        { title: "Pikantné", key: "isSpicy" },
        { title: "", key: "actions", sortable: false },
    ];

    const formTitle = computed(() => {
        return editedIndex.value === -1
            ? "Pridať položku"
            : `Úprava položky ${editedItem.value.title}`;
    });

    const selectedMenu = computed(() => {
        let items = null;
        let table = null;

        switch (selectedMenuIndex.value["0"]) {
            case 0:
                table = "pizzas";
                items = pizzas.value;
                break;
            
            case 1:
                table = "stangle";
                items = stangle.value;
                break;
            
            case 2:
                table = "salads";
                items = salads.value;
                break;
            
            case 3:
                table = "pasta";
                items = pasta.value;
                break;
            
            case 4:
                table = "others";
                items = others.value;
                break;
            
            default:
                table = "pizzas";
                items = pizzas.value;
                break;
        }

        return {
            table: table,
            items: items,
        }
    });

    function selectMenuItem(id) {
        selectedMenuIndex.value = [id];
    }

    function close() {
        dialog.value = false;
        nextTick(() => {
            editedItem.value = defaultItem;
            editedIndex.value = -1;
        });
    }

    function closeDelete() {
        dialogDelete.value = false;
        nextTick(() => {
            editedItem.value = defaultItem;
            editedIndex.value = -1;
        });
    }

    async function save() {
        if (editedIndex.value > -1) {
            for (const key in editedItem.value) {
                const value = editedItem.value[key];
                if ((key != "isVegetarian" && key != "isSpicy") &&(value === "" || value == 0)) {
                    editedItem.value[key] = null;
                }
            }
            await client.from(selectedMenu.value.table).update(editedItem.value).eq("id", editedItem.value.id);
        } else {
            await client.from(selectedMenu.value.table).insert(editedItem.value);
        }
        close();
    }

    function editItem(item) {
        editedIndex.value = selectedMenu.value.items.indexOf(item);
        editedItem.value = Object.assign({}, defaultItem, item);
        dialog.value = true;
    }

    function deleteItem(item) {
        editedIndex.value = selectedMenu.value.items.indexOf(item);
        editedItem.value = Object.assign({}, defaultItem, item);
        dialogDelete.value = true;
    }

    async function deleteItemConfirm() {
        await client.from(selectedMenu.value.table).delete().match({ id: editedItem.value.id });
        closeDelete();
    }

    let channel;
    onMounted(() => {
        watchEffect(() => {
            if (!user.value) {
                navigateTo("/auth");
            }
        });
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
    #table {
        grid-template-columns: 12rem 1fr;
        align-content: flex-start;
        align-items: flex-start;
        padding: 5rem 0 0 0;
    }

    .menu {
        width: 100%;
        display: grid;
        gap: 1rem;
    }

    .toolbar {
        background-color: transparent;
    }

    .search-icon {
        margin-left: .75rem;
        color: var(--color-text-alt);
    }

    .actions {
        display: flex;
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