export default defineNuxtRouteMiddleware((to) => {
    const user = useSupabaseUser();

    if (!user.value && to.path === "/dashboard") {
        navigateTo("/auth");
    } else if (user.value && to.path === "/auth") {
        navigateTo("/");
    }
});