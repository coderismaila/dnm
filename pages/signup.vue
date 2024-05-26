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

const loading = ref(false);
const { toast } = useToast();

const formSchema = toTypedSchema(
  z.object({
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    email: z.string().email(),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must include at least one uppercase letter")
      .regex(/[0-9]/, "Password must include at least one number")
      .regex(/[\W_]/, "Password must include at least one symbol"),
  })
);

const { handleSubmit } = useForm({
  validationSchema: formSchema,
});

const onSubmit = handleSubmit(async (values) => {
  console.log(values);
  try {
    loading.value = true;
    await $fetch("/api/auth/signup", { method: "POST", body: values });
  } catch (error) {
    toast({
      title: "Error",
      // @ts-ignore
      description: error.statusMessage,
      variant: "destructive",
      action: h(
        ToastAction,
        {
          altText: "Try again",
        },
        {
          default: () => "Try again",
        }
      ),
    });
    loading.value = false;
  }
});
</script>

<template>
  <Card class="mx-auto max-w-sm">
    <CardHeader>
      <CardTitle class="text-xl"> Sign Up </CardTitle>
      <CardDescription>
        Enter your information to create an account
      </CardDescription>
    </CardHeader>
    <CardContent>
      <form @submit="onSubmit">
        <div class="grid gap-4">
          <div class="grid grid-cols-2 gap-4">
            <div class="grid gap-2">
              <FormField v-slot="{ componentField }" name="firstName">
                <FormItem v-auto-animate>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="shadcn"
                      v-bind="componentField"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
            </div>
            <div class="grid gap-2">
              <FormField v-slot="{ componentField }" name="lastName">
                <FormItem v-auto-animate>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="shadcn"
                      v-bind="componentField"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
            </div>
          </div>
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
            <Loader2 v-if="loading" class="w-4 h-4 mr-2 animate-spin" /> Create
            an account
          </Button>
        </div>
      </form>
      <div class="mt-4 text-center text-sm">
        Already have an account?
        <NuxtLink href="/signin" class="underline">Sign in</NuxtLink>
      </div>
    </CardContent>
  </Card>
</template>
