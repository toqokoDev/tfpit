<script lang="ts" setup>
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";

type Role = 'model' | 'photographer';

// ----------------
// ----- Data -----
// ----------------

const supabase = useSupabaseClient();
const route = useRoute();
const queryRole = route.query.role as Role;

const isRegisterProcessing = ref<boolean>(false);
const registerErrorMessageKey = ref<string | null>(null);

// ----------------
// ----- Page -----
// ----------------

useHead({ title: 'Регистрация' });

definePageMeta({
  layout: 'blank'
});

// -----------------
// ----- Hooks -----
// -----------------

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(registerSchema),
  initialValues: {
    role: queryRole,
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  },
});

// ---------------------
// ----- Functions -----
// ---------------------

const register = handleSubmit(async (values) => {
  try {
    registerErrorMessageKey.value = null;
    isRegisterProcessing.value = true;

    const { error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: {
          first_name: values.first_name,
          last_name: values.last_name,
          role: values.role,
        }
      }
    });

    if (error) {
      registerErrorMessageKey.value = error.message;
      isRegisterProcessing.value = false;
      return;
    }

    isRegisterProcessing.value = false;
    return navigateTo('/profile');
  } catch (error) {
    registerErrorMessageKey.value = 'errors.somethingWentWrong';
    isRegisterProcessing.value = false;
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
        <form class="flex flex-col gap-6 w-full max-w-xs" @submit="register">
          <ui-field-group>
            <div class="flex flex-col items-center gap-1 text-center">
              <h1 class="text-2xl font-bold">Создать аккаунт</h1>
              <p class="text-muted-foreground text-sm text-balance">
                Заполните данные для регистрации в TFP сообществе
              </p>
            </div>

            <div class="grid grid-cols-2 gap-2">
              <base-input
                name="first_name"
                type="text"
                label="Имя"
                placeholder="Иван"
              />
              <base-input
                name="last_name"
                type="text"
                label="Фамилия"
                placeholder="Иванов"
              />
            </div>

            <base-select
              name="role"
              label="Выберите роль"
              placeholder="Кто вы?"
              :options="[
                { label: 'Модель', value: 'model' },
                { label: 'Фотограф', value: 'photographer' }
              ]"
            />

            <base-input
              name="email"
              type="email"
              label="Email"
              placeholder="email@example.com"
              autocomplete="email"
            />

            <base-input
              name="password"
              type="password"
              label="Пароль"
              placeholder="********"
              autocomplete="new-password"
            />

            <ui-field>
              <base-processing-button
                type="submit"
                label="Создать аккаунт"
                :is-processing="isRegisterProcessing"
              />
            </ui-field>

            <div class="text-center text-sm">
              Уже есть аккаунта?
              <router-link to="/auth/login" class="underline underline-offset-4 hover:text-primary">
                Войти
              </router-link>
            </div>
          </ui-field-group>
        </form>
      </div>
    </div>
  </div>
</template>
