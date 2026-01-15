import { _ as __nuxt_component_0 } from './nuxt-link-TvooyZgq.mjs';
import { _ as __nuxt_component_3 } from './Button-B-WuZDFb.mjs';
import { defineComponent, mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "help",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({ title: "Помощь" });
    const FAQ_ITEMS = [
      {
        question: "Что такое TFP?",
        answer: "TFP (Time for Print) — это формат сотрудничества, при котором фотограф, модель и другие участники работают бесплатно, получая в обмен готовые фотографии для портфолио."
      },
      {
        question: "Как создать объявление?",
        answer: 'Войдите в свой аккаунт, перейдите в раздел "Объявления" и нажмите "Создать объявление". Заполните все необходимые поля, укажите дату и требования к участникам.'
      },
      {
        question: "Как связаться с автором объявления?",
        answer: 'На странице объявления нажмите кнопку "Связаться". Вы сможете отправить сообщение автору через внутреннюю систему платформы.'
      },
      {
        question: "Как работает система рейтингов?",
        answer: "После завершения проекта все участники могут оставить отзыв и оценку друг другу. Рейтинг помогает другим пользователям оценить профессионализм и надежность партнера."
      },
      {
        question: "Можно ли использовать фотографии для коммерческих целей?",
        answer: "Условия использования фотографий обсуждаются между участниками проекта заранее. По умолчанию фотографии предназначены для портфолио, коммерческое использование требует отдельной договоренности."
      },
      {
        question: "Что делать, если партнер нарушил договоренности?",
        answer: "Вы можете оставить отрицательный отзыв и сообщить о проблеме администрации через форму обратной связи. Мы рассмотрим ситуацию и при необходимости примем меры."
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_ui_button = __nuxt_component_3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-background text-foreground" }, _attrs))}><section class="container mx-auto px-4 py-20 lg:py-28"><div class="mx-auto max-w-3xl"><h1 class="mb-6 text-4xl font-extrabold tracking-tight lg:text-5xl"> Помощь и поддержка </h1><p class="mb-12 text-lg text-muted-foreground"> Здесь вы найдете ответы на самые частые вопросы и полезную информацию о работе с платформой. </p><div class="space-y-6"><!--[-->`);
      ssrRenderList(FAQ_ITEMS, (item, index) => {
        _push(`<div class="rounded-xl border bg-card p-6"><h3 class="mb-3 text-xl font-semibold">${ssrInterpolate(item.question)}</h3><p class="text-muted-foreground">${ssrInterpolate(item.answer)}</p></div>`);
      });
      _push(`<!--]--></div><div class="mt-12 space-y-6"><h2 class="text-2xl font-bold">Полезные разделы</h2><div class="grid gap-4 sm:grid-cols-2">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/about/rules",
        class: "group rounded-xl border bg-card p-6 transition-colors hover:bg-muted"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 class="mb-2 font-semibold group-hover:text-primary transition-colors"${_scopeId}> Правила использования </h3><p class="text-sm text-muted-foreground"${_scopeId}> Ознакомьтесь с правилами платформы перед началом работы </p>`);
          } else {
            return [
              createVNode("h3", { class: "mb-2 font-semibold group-hover:text-primary transition-colors" }, " Правила использования "),
              createVNode("p", { class: "text-sm text-muted-foreground" }, " Ознакомьтесь с правилами платформы перед началом работы ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/about/contacts",
        class: "group rounded-xl border bg-card p-6 transition-colors hover:bg-muted"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 class="mb-2 font-semibold group-hover:text-primary transition-colors"${_scopeId}> Связаться с нами </h3><p class="text-sm text-muted-foreground"${_scopeId}> Есть вопросы? Свяжитесь с нашей службой поддержки </p>`);
          } else {
            return [
              createVNode("h3", { class: "mb-2 font-semibold group-hover:text-primary transition-colors" }, " Связаться с нами "),
              createVNode("p", { class: "text-sm text-muted-foreground" }, " Есть вопросы? Свяжитесь с нашей службой поддержки ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="mt-12 rounded-xl border bg-muted/50 p-6"><h3 class="mb-3 font-semibold">Не нашли ответ на свой вопрос?</h3><p class="mb-4 text-sm text-muted-foreground"> Свяжитесь с нами через форму обратной связи, и мы обязательно поможем вам. </p>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/about/contacts",
        "as-child": ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_ui_button, { variant: "outline" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Связаться с поддержкой `);
                } else {
                  return [
                    createTextVNode(" Связаться с поддержкой ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_ui_button, { variant: "outline" }, {
                default: withCtx(() => [
                  createTextVNode(" Связаться с поддержкой ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/about/help.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=help-BN7f3tYQ.mjs.map
