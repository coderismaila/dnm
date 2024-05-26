<script setup lang="ts">
const { loggedIn } = useUserSession();

watch(loggedIn, () => {
  if (!loggedIn.value) {
    navigateTo("/signin");
  }
});
</script>
<template>
  <NuxtLayout>
    <NuxtPage />
    <Toaster />
  </NuxtLayout>
</template>
