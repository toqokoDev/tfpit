<script lang="ts" setup>
import { toTypedSchema } from "@vee-validate/zod";
import { Mail } from "lucide-vue-next";
import { useForm } from "vee-validate";
import { toast } from "vue-sonner";

// ----------------
// ----- Data -----
// ----------------

const supabase = useSupabaseClient();

const roles = ref<UserRoleSchema[]>([]);
const isFetching = ref<boolean>(true);
const isRegisterProcessing = ref<boolean>(false);
const isConfirmDialogOpen = ref<boolean>(false);
const registerErrorMessageKey = ref<string | null>(null);

const rolesOptions = computed(() => 
  roles.value.map(role => ({
    label: role.title,
    value: role.id
  }))
);

// -----------------
// ----- Hooks -----
// -----------------

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(registerSchema),
  initialValues: {
    role: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  },
});

onMounted(() => {
  getRoles();
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
        emailRedirectTo: `${window.location.origin}/auth/confirm`,
        data: {
          first_name: values.first_name,
          last_name: values.last_name,
          role: values.role,
        }
      }
    });

    if (error) throw error;

    isConfirmDialogOpen.value = true;
  } catch (error: any) {
    registerErrorMessageKey.value = error.message || 'errors.somethingWentWrong';
    toast.error('Ошибка при регистрации');
  } finally {
    isRegisterProcessing.value = false;
  }
});

async function getRoles() {
  try {
    isFetching.value = true;
    const { data, error } = await supabase
      .from('roles')
      .select('*');

    if (error) throw error;
    
    roles.value = data as UserRoleSchema[];

    console.log(roles);
  } catch (error) {
    console.error(error);
    toast.error('Не удалось загрузить роли');
  } finally {
    isFetching.value = false;
  }
}

// ----------------
// ----- Page -----
// ----------------

useHead({ title: 'Регистрация' });
definePageMeta({ layout: 'blank' });
</script>

<template>
  <div class="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
    <div class="flex w-full max-w-sm flex-col gap-6">
      <span class="flex items-center gap-2 self-center font-medium">
        <base-logo />
      </span>
      
      <div class="flex flex-1 items-center justify-center">
        <div v-if="isFetching" class="flex justify-center">
          <ui-spinner /> </div>

        <form v-else class="flex flex-col gap-6 w-full max-w-xs" @submit="register">
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
              :options="rolesOptions"
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

    <ui-dialog :open="isConfirmDialogOpen" @update:open="isConfirmDialogOpen = $event">
      <ui-dialog-content class="sm:max-w-md">
        <ui-dialog-header>
          <ui-dialog-title>Проверьте почту</ui-dialog-title>
          <ui-dialog-description>
            Мы отправили письмо со ссылкой для подтверждения на ваш адрес.
          </ui-dialog-description>
        </ui-dialog-header>
        
        <div class="flex flex-col items-center justify-center py-4">
          <div class="bg-primary/10 p-3 rounded-full mb-4">
            <mail class="h-10 w-10 text-primary" />
          </div>
          <p class="text-sm text-center text-muted-foreground">
            Пожалуйста, перейдите по ссылке в письме, чтобы завершить регистрацию и войти в аккаунт.
          </p>
        </div>

        <ui-dialog-footer>
          <nuxt-link to="/" as-child>
            <ui-button type="button" variant="secondary">
              Хорошо
            </ui-button>
          </nuxt-link>
        </ui-dialog-footer>
      </ui-dialog-content>
    </ui-dialog>
  </div>
</template>
