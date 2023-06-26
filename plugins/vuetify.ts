import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import { VDataTable } from "vuetify/lib/labs/components.mjs";

export default defineNuxtPlugin((nuxtApp) => {
    const vuetify = createVuetify({
        components: {
            ...components,
            VDataTable,
        },
    });

    nuxtApp.vueApp.use(vuetify);
});