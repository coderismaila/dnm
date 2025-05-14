<script setup lang="ts">
const colorMode = useColorMode();

const color = computed(() => colorMode.value === "dark" ? "#09090b" : "#ffffff");

const { theme, radius } = useCustomize();

useHead({
  meta: [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { key: "theme-color", name: "theme-color", content: color },
  ],
  link: [
    { rel: "icon", href: "/favicon.ico" },
  ],
  htmlAttrs: {
    lang: "en",
  },
  bodyAttrs: {
    class: computed(() => `theme-${theme.value}`),
    style: computed(() => `--radius: ${radius.value}rem;`),
  },
});

const title = "DNM - Distribution Network Management Application";
const description = "This application helps manage assets of electricity distribution company in Nigeria";

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogUrl: "https://dashboard.dianprata.com",
  ogImage: "https://nuxt-shadcn-dashboard.vercel.app/social-card.png",
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: "https://nuxt-shadcn-dashboard.vercel.app/social-card.png",
  twitterCard: "summary_large_image",
});

const router = useRouter();

defineShortcuts({
  "G-H": () => router.push("/"),
  "G-S": () => router.push("/settings"),
});
</script>

<template>
  <NuxtLayout>
    <NuxtRouteAnnouncer />
    <NuxtPage />
    <Toaster />
  </NuxtLayout>
</template>
