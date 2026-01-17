<script setup lang="ts">
import { SunDim, MoonStar } from "lucide-vue-next";

const colorMode = useColorMode();

function toggleColor() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
}

const currentUserStore = useCurrentUserStore();
const isDataloading = ref(true);

const { data: loadedUser } = await useAsyncData('init-user', async () => {
  if (currentUserStore.isExist()) {
    await sleep(150);
    isDataloading.value = false;
    return null;
  }

  const supabase = useSupabaseClient<Database>();
  const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();

  if (authError || authUser === null) {
    await sleep(150);
    isDataloading.value = false;
    return null;
  }

  const { data: user, error: userFetchError } = await supabase
    .from('users')
    .select('id, email, first_name, last_name, avatar_url')
    .eq('id', authUser.id)
    .limit(1)
    .maybeSingle();

  if (userFetchError || user === null) {
    await sleep(150);
    isDataloading.value = false;
    return null;
  }

  await sleep(150);
  isDataloading.value = false;

  return {
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
    avatar_url: user.avatar_url || undefined,
  };
}, {
  server: false,
});

const currentUser = computed(() => {
  if (currentUserStore.isExist()) {
    const user = currentUserStore.user!;
    return {
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      avatar_url: user.avatar_url || undefined,
    };
  }
  
  return loadedUser.value;
});

const route = useRoute();
const showFooter = computed(() => {
  return !route.path.startsWith('/profile');
});
</script>

<template>
  <div class="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
    <header class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div class="container mx-auto flex h-16 items-center justify-between px-4">
        
        <NuxtLink to="/" class="flex items-center gap-2 font-bold text-xl tracking-tighter">
          <base-logo />
        </NuxtLink>

        <nav class="flex items-center gap-4">
          <NuxtLink to="/offer" class="text-sm font-medium hover:text-primary transition-colors">Объявления</NuxtLink>
          <NuxtLink to="/about" class="hidden md:flex text-sm font-medium hover:text-primary transition-colors">О сервисе</NuxtLink>
        </nav>

        <template v-if="isDataloading">
          <ui-skeleton class="w-[100px] h-[30px] md:w-[150px] rounded-full" />
        </template>
        <template v-else>
          <div class="flex items-center gap-2">
            <ui-button 
              variant="ghost" 
              size="icon" 
              class="rounded-full shadow-none" 
              @click="toggleColor"
            >
              <SunDim v-if="colorMode.value === 'light'" class="size-6" />
              <MoonStar v-else-if="colorMode.value === 'dark'" class="size-6" />
            </ui-button>

            <div class="h-6 w-[1px] bg-border mx-1 block"></div>
            
            <div v-if="currentUser">
              <base-profile :user="currentUser"/>
            </div>

            <div v-else>
              <NuxtLink to="/auth/login">
                <ui-button size="sm" class="font-semibold shadow-md">
                  Войти
                </ui-button>
              </NuxtLink>
            </div>
          </div>
        </template>

      </div>
    </header>

    <main class="flex-1">
      <nuxt-page
        :transition="{
          name: 'page-vertical',
          mode: 'out-in',
        }"
      />
    </main>

    <footer v-if="showFooter" class="border-t py-12 bg-muted/30">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-muted-foreground">
          <p>© 2026 TFP.BY Платформа для творческого взаимодействия.</p>
          <div class="flex gap-6">
            <NuxtLink to="/about/rules" class="hover:underline">Правила</NuxtLink>
            <NuxtLink to="/about/help" class="hover:underline">Помощь</NuxtLink>
            <NuxtLink to="/about/contacts" class="hover:underline">Контакты</NuxtLink>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
