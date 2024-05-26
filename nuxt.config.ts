// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxthub/core",
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@nuxt/eslint",
    "nuxt-lucide-icons",
    "nuxt-icon",
    "nuxt-auth-utils"
  ],
  hub: {
    database: true,
  },
  shadcn: {
    prefix: "",
    componentDir: "./components/ui",
  },
});