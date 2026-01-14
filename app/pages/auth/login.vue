<script lang="ts" setup>
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { AlertCircleIcon } from "lucide-vue-next";

// ----------------
// ----- Data -----
// ----------------

const supabase = useSupabaseClient<Database>();

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

    const { error: loginError } = await supabase
      .auth
      .signInWithPassword({ ...values });

    if (loginError) {
      if (loginError.code === 'invalid_credentials') {
        loginErrorMessageKey.value = 'Неверные логин или пароль';
        isLoginProcessing.value = false;
        return;
      }

      throw loginError;
    }

    return navigateTo('/profile');
  } catch (error) {
    loginErrorMessageKey.value = 'Ошибка при входе';
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
                Вход в аккаунт
              </h1>
              <p class="text-muted-foreground text-sm text-balance">
                Авторизуйтесь, чтобы продолжить работу
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
                label="Войти"
                :is-processing="isLoginProcessing"
              />
            </ui-field>

            <div class="text-center text-sm">
              Ещё нет аккаунта?
              <router-link to="/auth/register" class="underline underline-offset-4 hover:text-primary">
                Зарегистрироваться
              </router-link>
            </div>
          </ui-field-group>
        </form>
      </div>
    </div>
  </div>
</template>
