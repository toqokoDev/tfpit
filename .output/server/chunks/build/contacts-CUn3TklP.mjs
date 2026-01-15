import { _ as __nuxt_component_0 } from './nuxt-link-TvooyZgq.mjs';
import { defineComponent, mergeProps, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderAttr, ssrRenderComponent } from 'vue/server-renderer';
import { u as useHead } from './server.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'pinia';
import 'vue-router';
import '@supabase/ssr';
import 'lucide-vue-next';
import 'vue-sonner';
import 'clsx';
import 'tailwind-merge';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "contacts",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({ title: "Контакты" });
    const CONTACT_METHODS = [
      {
        title: "Электронная почта",
        description: "Для общих вопросов и предложений",
        value: "info@tfp.by"
      },
      {
        title: "Техническая поддержка",
        description: "Если возникли проблемы с платформой",
        value: "support@tfp.by"
      },
      {
        title: "Сотрудничество",
        description: "Для партнеров и рекламодателей",
        value: "partners@tfp.by"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-background text-foreground" }, _attrs))}><section class="container mx-auto px-4 py-20 lg:py-28"><div class="mx-auto max-w-3xl"><h1 class="mb-6 text-4xl font-extrabold tracking-tight lg:text-5xl"> Контакты </h1><p class="mb-12 text-lg text-muted-foreground"> Свяжитесь с нами, если у вас есть вопросы, предложения или нужна помощь. Мы всегда рады обратной связи от нашего сообщества. </p><div class="space-y-6 mb-12"><!--[-->`);
      ssrRenderList(CONTACT_METHODS, (method, index) => {
        _push(`<div class="rounded-xl border bg-card p-6"><h3 class="mb-2 text-xl font-semibold">${ssrInterpolate(method.title)}</h3><p class="mb-3 text-sm text-muted-foreground">${ssrInterpolate(method.description)}</p><a${ssrRenderAttr("href", `mailto:${method.value}`)} class="text-primary hover:underline font-medium">${ssrInterpolate(method.value)}</a></div>`);
      });
      _push(`<!--]--></div><div class="rounded-xl border bg-muted/50 p-6 mb-12"><h2 class="mb-4 text-2xl font-bold">Время ответа</h2><div class="space-y-2 text-muted-foreground"><p> Мы стремимся отвечать на все запросы в течение 24-48 часов в рабочие дни. Для срочных вопросов, пожалуйста, укажите это в теме письма. </p></div></div><div class="space-y-6"><h2 class="text-2xl font-bold">Полезные ссылки</h2><div class="grid gap-4 sm:grid-cols-2">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/about/help",
        class: "group rounded-xl border bg-card p-6 transition-colors hover:bg-muted"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 class="mb-2 font-semibold group-hover:text-primary transition-colors"${_scopeId}> Помощь </h3><p class="text-sm text-muted-foreground"${_scopeId}> Часто задаваемые вопросы и руководства </p>`);
          } else {
            return [
              createVNode("h3", { class: "mb-2 font-semibold group-hover:text-primary transition-colors" }, " Помощь "),
              createVNode("p", { class: "text-sm text-muted-foreground" }, " Часто задаваемые вопросы и руководства ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/about/rules",
        class: "group rounded-xl border bg-card p-6 transition-colors hover:bg-muted"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 class="mb-2 font-semibold group-hover:text-primary transition-colors"${_scopeId}> Правила </h3><p class="text-sm text-muted-foreground"${_scopeId}> Правила использования платформы </p>`);
          } else {
            return [
              createVNode("h3", { class: "mb-2 font-semibold group-hover:text-primary transition-colors" }, " Правила "),
              createVNode("p", { class: "text-sm text-muted-foreground" }, " Правила использования платформы ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/about/contacts.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=contacts-CUn3TklP.mjs.map
