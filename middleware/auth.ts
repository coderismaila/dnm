export default defineNuxtRouteMiddleware((to, from) => {
  const { loggedIn } = useUserSession();

  if (!loggedIn.value) {
    // navigate to login with current page as next query
    return navigateTo("/signin?next=" + encodeURIComponent(from.fullPath));
  }
});
