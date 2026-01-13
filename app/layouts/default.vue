<script setup lang="ts">
import { SunDim, MoonStar, UserCircle2 } from "lucide-vue-next";

const colorMode = useColorMode();
const user = useSupabaseUser();

function toggleColor() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
}
</script>

<template>
  <div class="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
    <header class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div class="container mx-auto flex h-16 items-center justify-between px-4">
        
        <NuxtLink to="/" class="flex items-center gap-2 font-bold text-xl tracking-tighter">
          <base-logo />
        </NuxtLink>

        <nav class="hidden md:flex items-center gap-4">
          <NuxtLink to="/feed" class="text-sm font-medium hover:text-primary transition-colors">Объявления</NuxtLink>
          <NuxtLink to="/about" class="text-sm font-medium hover:text-primary transition-colors">О сервисе</NuxtLink>
        </nav>

        <div class="flex items-center gap-2">
          
          <ui-button 
            variant="ghost" 
            size="icon" 
            class="rounded-full shadow-none" 
            @click="toggleColor"
          >
            <span v-if="colorMode.value === 'dark'" class="text-lg">
              <moon-star class="size-6" />
            </span>
            <span v-else class="text-lg">
              <sun-dim class="size-6" />
            </span>
            <span class="sr-only">Переключить тему</span>
          </ui-button>

          <div class="h-6 w-[1px] bg-border mx-1 hidden sm:block"></div>

          <template v-if="user">
            <NuxtLink to="/profile">
              <ui-button variant="outline" size="sm" class="font-semibold">
                <user-circle2 class="size-6" />
                <span>Профиль</span>
              </ui-button>
            </NuxtLink>
          </template>

          <template v-else>
            <NuxtLink to="/auth/login">
              <ui-button size="sm" class="font-semibold shadow-md">
                Войти
              </ui-button>
            </NuxtLink>
          </template>
        </div>

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

    <footer class="border-t py-12 bg-muted/30">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-muted-foreground">
          <p>© 2026 TFP.BY Платформа для творческого взаимодействия.</p>
          <div class="flex gap-6">
            <a href="#" class="hover:underline">Правила</a>
            <a href="#" class="hover:underline">Помощь</a>
            <a href="#" class="hover:underline">Контакты</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
/* Плавный переход темы */
.dark body {
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
}
</style>