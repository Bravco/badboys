import { createVuetify } from "vuetify";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import * as components from "vuetify/components";
import { VDataTable } from "vuetify/lib/labs/components.mjs";
import * as directives from "vuetify/directives";

export default defineNuxtPlugin((nuxtApp) => {
    const vuetify = createVuetify({
        icons: {
            defaultSet: "mdi",
            aliases,
            sets: {
                mdi,
            },
        },
        components: {
            ...components,
            VDataTable,
        },
        directives,
    });

    nuxtApp.vueApp.use(vuetify);
});