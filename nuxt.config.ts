import { resolve } from "pathe";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // ---------------
  // ----- App -----
  // ---------------

  css: [
    '~/assets/css/tailwind.css',
    'vue-sonner/style.css',
  ],

  app: {
    head: {
      titleTemplate: '%s - TFP',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        { rel: 'icon', href: '/favicon.ico' },
      ],
    },
  },

  // ---------------
  // ----- Vue -----
  // ---------------

  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag.startsWith('lucide-'),
    },
  },

  // ------------------------
  // ----- Auto Imports -----
  // ------------------------

  imports: {
    dirs: [
      resolve('app/stores'),
      resolve('shared/schemas'),
    ],
  },

  modules: ['shadcn-nuxt', '@nuxtjs/tailwindcss', '@nuxtjs/color-mode'],

  colorMode: {
    classSuffix: ''
  },

  shadcn: {
    prefix: 'ui',
    componentDir: './components/ui',
  },
})