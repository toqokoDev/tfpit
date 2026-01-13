<script lang="ts" setup>
  import { toTypedSchema } from "@vee-validate/zod";
  import { useForm } from "vee-validate";
  import { AlertCircleIcon } from "lucide-vue-next";

// ----------------
// ----- Data -----
// ----------------

const isLoginProcessing = ref<boolean>(false);
const loginErrorMessageKey = ref<string | null>(null);

// ----------------
// ----- Page -----
// ----------------

useHead({ title: 'Вход' });

definePageMeta({
  layout: 'blank'
});

// -----------------
// ----- Hooks -----
// -----------------

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(loginSchema),
  initialValues: {
    email: '',
    password: '',
  },
});

// ---------------------
// ----- Functions -----
// ---------------------

const login = handleSubmit(async (values) => {
  try {
    loginErrorMessageKey.value = null;
    isLoginProcessing.value = true;
    
    console.log(values);

    return navigateTo({
      path: '/profile',
      query: { from: 'login' },
    });
  } catch (error) {
    loginErrorMessageKey.value = 'errors.somethingWentWrong';
    isLoginProcessing.value = false;
  }
});
</script>

<template>
  <div class="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
    <div class="flex w-full max-w-sm flex-col gap-6">
      <span class="flex items-center gap-2 self-center font-medium">
        <base-logo />
      </span>
      
      <div class="flex flex-1 items-center justify-center">
        <form class="flex flex-col gap-6 w-full max-w-xs" @submit="login">
          <ui-field-group>
            <div class="flex flex-col items-center gap-1 text-center">
              <h1 class="text-2xl font-bold">
                Регистрация
              </h1>
              <p class="text-muted-foreground text-sm text-balance">
                Создайте аккаунт, чтобы продолжить работу
              </p>
            </div>

            <ui-alert
              v-if="loginErrorMessageKey"
              variant="destructive"
              class="border-destructive"
            >
              <alert-circle-icon />
              <ui-alert-title class="font-normal">
                <p>{{ loginErrorMessageKey }}</p>
              </ui-alert-title>
            </ui-alert>

            <base-input
              name="email"
              type="email"
              label="Введите email"
              placeholder="email@example.com"
              autocomplete="email"
              errors-to-show="all"
            />

            <base-input
              name="password"
              type="password"
              label="Введите пароль"
              placeholder="********"
              autocomplete="current-password"
              errors-to-show="all"
            />

            <ui-field>
              <base-processing-button
                type="submit"
                label="Зарегистрироваться"
                :is-processing="isLoginProcessing"
              />
            </ui-field>
          </ui-field-group>
        </form>
      </div>
    </div>
  </div>
</template>
