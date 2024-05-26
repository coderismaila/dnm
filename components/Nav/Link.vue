<script setup lang="ts">
interface NavLinkProps {
  title: string;
  href: string;
  icon: string;
}
defineProps<NavLinkProps>();
</script>
<template>
  <a
    href="/"
    class="mx-[-0.65rem] md:mx-0 flex items-center gap-4 md:gap-3 rounded-xl md:rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
  >
    <Icon :name="icon" class="h-5 md:h-4 w-5 md:w-4" />
    {{ title }}
  </a>
</template>
