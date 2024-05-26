<script setup lang="ts">
const navLinks = [
  { title: "Dashboard", href: "/", icon: "streamline:graph" },
  { title: "Transmission Stations", href: "/", icon: "mdi:transmission-tower" },
  { title: "Injection Substations", href: "/", icon: "ph:warehouse" },
  { title: "Feeders", href: "/", icon: "lucide:utility-pole" },
  { title: "Distribution Transformers", href: "/", icon: "carbon:chip" },
];
</script>
<template>
  <nav
    class="grid items-start px-0 md:px-2 text-lg md:text-sm font-semibold md:font-medium lg:px-4"
  >
    <a
      href="#"
      class="flex md:hidden items-center gap-2 mb-2 text-lg font-semibold"
    >
      <Icon name="carbon:scis-control-tower" class="h-6 w-6" />
      <span class="sr-only">DNM</span>
    </a>
    <a
      v-for="link in navLinks"
      :key="link.title"
      href="/"
      class="mx-[-0.65rem] md:mx-0 flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
    >
      <Icon :name="link.icon" class="h-4 w-4" />
      {{ link.title }}
    </a>
  </nav>
</template>
