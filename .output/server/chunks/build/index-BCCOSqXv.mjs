import { _ as __nuxt_component_0 } from './nuxt-link-TvooyZgq.mjs';
import { _ as __nuxt_component_3 } from './Button-B-WuZDFb.mjs';
import { defineComponent, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from 'vue';
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
import 'reka-ui';
import 'class-variance-authority';
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

const _imports_0 = "" + __buildAssetsURL("work-process.Ui55D0Ib.png");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const STATS = [
      { label: "Активных пользователей", value: "50,000+" },
      { label: "Проектов ежемесячно", value: "12,000+" },
      { label: "Городов присутствия", value: "150+" },
      { label: "Успешных съемок", value: "300k+" }
    ];
    const VALUES = [
      {
        title: "Доступность",
        description: "Мы верим, что отсутствие огромного бюджета не должно быть препятствием для реализации крутых идей."
      },
      {
        title: "Профессионализм",
        description: "TFP — это не «бесплатно», это обмен опытом и навыками для создания качественного контента."
      },
      {
        title: "Безопасность",
        description: "Мы развиваем систему рейтингов и отзывов, чтобы вы могли уверенно выбирать партнеров по съемке."
      }
    ];
    useHead({ title: "О сервисе" });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_ui_button = __nuxt_component_3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-background text-foreground" }, _attrs))}><section class="container mx-auto px-4 py-20 text-center lg:py-28"><h1 class="mb-6 text-4xl font-extrabold tracking-tight lg:text-6xl"> Мы объединяем <br><span class="text-primary">творческих людей</span></h1><p class="mx-auto max-w-[800px] text-lg text-muted-foreground md:text-xl"> Наша миссия - создать крупнейшую экосистему для фотографов, моделей и визуальных художников, где каждый может найти команду мечты для реализации самых смелых идей. </p></section><section class="border-y bg-slate-50/50 py-16 dark:bg-slate-900/10"><div class="container mx-auto px-4"><div class="grid grid-cols-2 gap-8 md:grid-cols-4"><!--[-->`);
      ssrRenderList(STATS, (stat) => {
        _push(`<div class="text-center"><div class="text-3xl font-bold lg:text-4xl">${ssrInterpolate(stat.value)}</div><div class="mt-2 text-sm text-muted-foreground uppercase tracking-wider">${ssrInterpolate(stat.label)}</div></div>`);
      });
      _push(`<!--]--></div></div></section><section class="container mx-auto px-4 py-24"><div class="grid items-center gap-12 lg:grid-cols-2"><div class="relative aspect-video overflow-hidden rounded-2xl bg-muted lg:aspect-square"><img${ssrRenderAttr("src", _imports_0)} alt="Work process" class="h-full w-full object-cover"></div><div class="space-y-6"><h2 class="text-3xl font-bold">Что такое TFP сегодня?</h2><p class="text-lg text-muted-foreground"> Термин <strong>Time for Print</strong> (Время за отпечатки) давно вышел за рамки простого обмена фотографиями. Сегодня это мощный инструмент нетворкинга и профессионального роста. </p><p class="text-lg text-muted-foreground"> Мы создали эту платформу, чтобы упростить процесс поиска единомышленников. Вам больше не нужно пролистывать сотни сообщений в чатах - всё структурировано, наглядно и удобно. </p><div class="grid gap-4 pt-4 sm:grid-cols-2"><!--[-->`);
      ssrRenderList(VALUES, (value) => {
        _push(`<div class="space-y-2"><h4 class="font-bold text-primary">${ssrInterpolate(value.title)}</h4><p class="text-sm text-muted-foreground">${ssrInterpolate(value.description)}</p></div>`);
      });
      _push(`<!--]--></div></div></div></section><section class="container mx-auto px-4 pb-24"><div class="rounded-3xl bg-slate-900 px-8 py-16 text-center text-white dark:bg-primary/10"><h2 class="mb-4 text-3xl font-bold md:text-4xl">Готовы создать что-то великое?</h2><p class="mb-8 text-slate-400">Присоединяйтесь к нашему комьюнити и начните собирать портфолио мечты.</p><div class="flex flex-col justify-center gap-4 sm:flex-row">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/auth/register",
        "as-child": ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_ui_button, {
              size: "lg",
              variant: "default",
              class: "bg-white text-black hover:bg-slate-200"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Создать аккаунт`);
                } else {
                  return [
                    createTextVNode("Создать аккаунт")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_ui_button, {
                size: "lg",
                variant: "default",
                class: "bg-white text-black hover:bg-slate-200"
              }, {
                default: withCtx(() => [
                  createTextVNode("Создать аккаунт")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/about/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-BCCOSqXv.mjs.map
