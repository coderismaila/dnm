<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/toast";
import * as z from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { vAutoAnimate } from "@formkit/auto-animate/vue";
import { useForm } from "vee-validate";
import { Loader2 } from "lucide-vue-next";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

definePageMeta({
  layout: "auth",
});

const { fetch: refreshSession } = useUserSession();
const loading = ref(false);
const { toast } = useToast();

const formSchema = toTypedSchema(
  z.object({
    email: z.string().email(),
    password: z.string(),
  })
);

const { handleSubmit } = useForm({
  validationSchema: formSchema,
});

const onSubmit = handleSubmit(async (values) => {
  try {
    loading.value = true;
    await $fetch("/api/auth/signin", { method: "POST", body: values });
    await refreshSession();
    // navigate to next if available else dashboard
    const route = useRoute();
    if (route.query.next) {
      navigateTo(route.query.next as string);
    } else {
      navigateTo("/");
    }
  } catch (error) {
    toast({
      title: "Error",
      // @ts-ignore
      description: error.statusMessage,
      variant: "destructive",
    });
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <Card class="mx-auto max-w-sm">
    <CardHeader>
      <CardTitle class="text-xl"> Sign In </CardTitle>
      <CardDescription>
        Enter your email below to login to your account
      </CardDescription>
    </CardHeader>
    <CardContent>
      <form @submit="onSubmit">
        <div class="grid gap-4">
          <div class="grid gap-2">
            <FormField v-slot="{ componentField }" name="email">
              <FormItem v-auto-animate>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="m@example.com"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>
          <div class="grid gap-2">
            <FormField v-slot="{ componentField }" name="password">
              <FormItem v-auto-animate>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>
          <Button type="submit" class="w-full">
            <Loader2 v-if="loading" class="w-4 h-4 mr-2 animate-spin" /> Sign in
          </Button>
        </div>
      </form>
      <div class="mt-4 text-center text-sm">
        Don't have an account?
        <NuxtLink href="/signup" class="underline">Sign up</NuxtLink>
      </div>
    </CardContent>
  </Card>
</template>
