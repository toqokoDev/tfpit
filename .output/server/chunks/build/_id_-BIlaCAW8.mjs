import { _ as __nuxt_component_13 } from './Spinner-ChFHkN1o.mjs';
import { _ as __nuxt_component_3 } from './Button-B-WuZDFb.mjs';
import { defineComponent, ref, watch, mergeProps, unref, withCtx, createVNode, createTextVNode, createBlock, openBlock, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import { ArrowLeft, ChevronLeft, ChevronRight, Eye, Heart, Globe } from 'lucide-vue-next';
import { toast } from 'vue-sonner';
import { b as useRoute, d as useRouter, u as useHead } from './server.mjs';
import { u as useSupabaseClient } from './useSupabaseClient-xv77-Kdn.mjs';
import 'reka-ui';
import 'class-variance-authority';
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
import 'clsx';
import 'tailwind-merge';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const router = useRouter();
    useSupabaseClient();
    route.params.id;
    const portfolio = ref(null);
    const isLoading = ref(true);
    const currentImageIndex = ref(0);
    const userInfo = ref(null);
    function nextImage() {
      if (portfolio.value && portfolio.value.image_url) {
        currentImageIndex.value = (currentImageIndex.value + 1) % portfolio.value.image_url.length;
      }
    }
    function prevImage() {
      if (portfolio.value && portfolio.value.image_url) {
        const length = portfolio.value.image_url.length;
        currentImageIndex.value = (currentImageIndex.value - 1 + length) % length;
      }
    }
    function formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString("ru-RU", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    }
    async function sharePortfolio() {
      const url = (void 0).location.href;
      await copyToClipboard(url);
    }
    async function copyToClipboard(text) {
      try {
        await (void 0).clipboard.writeText(text);
        toast.success("Ссылка скопирована в буфер обмена");
      } catch (error) {
        const textArea = (void 0).createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        (void 0).body.appendChild(textArea);
        textArea.select();
        try {
          (void 0).execCommand("copy");
          toast.success("Ссылка скопирована в буфер обмена");
        } catch (err) {
          toast.error("Не удалось скопировать ссылку");
        }
        (void 0).body.removeChild(textArea);
      }
    }
    watch(portfolio, (newPortfolio) => {
      if (newPortfolio) {
        useHead({
          title: `${newPortfolio.category} - Портфолио`,
          meta: [
            {
              name: "description",
              content: newPortfolio.description || "Просмотр портфолио"
            }
          ]
        });
      }
    }, { immediate: true });
    useHead({
      title: "Портфолио",
      meta: [
        {
          name: "description",
          content: "Просмотр портфолио"
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ui_spinner = __nuxt_component_13;
      const _component_ui_button = __nuxt_component_3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container mx-auto px-4 py-8" }, _attrs))}>`);
      if (unref(isLoading)) {
        _push(`<div class="flex items-center justify-center min-h-[60vh]">`);
        _push(ssrRenderComponent(_component_ui_spinner, { size: "lg" }, null, _parent));
        _push(`</div>`);
      } else if (!unref(portfolio)) {
        _push(`<div class="flex flex-col items-center justify-center min-h-[60vh]"><div class="text-center"><p class="text-muted-foreground mb-4 text-lg">Портфолио не найдено или недоступно</p>`);
        _push(ssrRenderComponent(_component_ui_button, {
          onClick: ($event) => unref(router).push("/")
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(ArrowLeft), { class: "w-4 h-4 mr-2" }, null, _parent2, _scopeId));
              _push2(` Вернуться на главную `);
            } else {
              return [
                createVNode(unref(ArrowLeft), { class: "w-4 h-4 mr-2" }),
                createTextVNode(" Вернуться на главную ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<div class="max-w-4xl mx-auto"><div class="mb-6 flex items-center justify-between">`);
        _push(ssrRenderComponent(_component_ui_button, {
          variant: "ghost",
          onClick: ($event) => unref(router).back()
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(ArrowLeft), { class: "w-4 h-4 mr-2" }, null, _parent2, _scopeId));
              _push2(` Назад `);
            } else {
              return [
                createVNode(unref(ArrowLeft), { class: "w-4 h-4 mr-2" }),
                createTextVNode(" Назад ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_ui_button, {
          onClick: sharePortfolio,
          size: "icon"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"${_scopeId}></path></svg>`);
            } else {
              return [
                (openBlock(), createBlock("svg", {
                  class: "w-4 h-4",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  })
                ]))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="space-y-6">`);
        if (unref(userInfo)) {
          _push(`<div class="flex items-center gap-4 pb-4 border-b">`);
          if (unref(userInfo).avatar_url) {
            _push(`<div class="w-12 h-12 rounded-full overflow-hidden"><img${ssrRenderAttr("src", unref(userInfo).avatar_url)}${ssrRenderAttr("alt", `${unref(userInfo).first_name} ${unref(userInfo).last_name}`)} class="w-full h-full object-cover"></div>`);
          } else {
            _push(`<div class="w-12 h-12 rounded-full bg-muted flex items-center justify-center"><span class="text-lg font-medium">${ssrInterpolate((unref(userInfo).first_name?.[0] || "") + (unref(userInfo).last_name?.[0] || ""))}</span></div>`);
          }
          _push(`<div><p class="font-medium">${ssrInterpolate(unref(userInfo).first_name)} ${ssrInterpolate(unref(userInfo).last_name)}</p><p class="text-sm text-muted-foreground">Автор портфолио</p></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div><h1 class="text-3xl font-bold mb-2">${ssrInterpolate(unref(portfolio).category)}</h1><p class="text-muted-foreground text-lg">${ssrInterpolate(unref(portfolio).description)}</p></div>`);
        if (unref(portfolio).image_url && unref(portfolio).image_url.length > 0) {
          _push(`<div class="space-y-4"><div class="relative aspect-[3/4] w-full max-w-md mx-auto overflow-hidden rounded-lg bg-muted"><img${ssrRenderAttr("src", unref(portfolio).image_url[unref(currentImageIndex)])}${ssrRenderAttr("alt", `${unref(portfolio).category} - ${unref(currentImageIndex) + 1}`)} class="h-full w-full object-cover transition-opacity duration-300" loading="lazy">`);
          if (unref(portfolio).image_url.length > 1) {
            _push(ssrRenderComponent(_component_ui_button, {
              onClick: prevImage,
              type: "button",
              class: "absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm p-2 text-foreground shadow-lg transition-all hover:bg-background/90 disabled:opacity-50",
              disabled: unref(portfolio).image_url.length <= 1
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(ssrRenderComponent(unref(ChevronLeft), { class: "h-5 w-5" }, null, _parent2, _scopeId));
                } else {
                  return [
                    createVNode(unref(ChevronLeft), { class: "h-5 w-5" })
                  ];
                }
              }),
              _: 1
            }, _parent));
          } else {
            _push(`<!---->`);
          }
          if (unref(portfolio).image_url.length > 1) {
            _push(ssrRenderComponent(_component_ui_button, {
              onClick: nextImage,
              type: "button",
              class: "absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm p-2 text-foreground shadow-lg transition-all hover:bg-background/90 disabled:opacity-50",
              disabled: unref(portfolio).image_url.length <= 1
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(ssrRenderComponent(unref(ChevronRight), { class: "h-5 w-5" }, null, _parent2, _scopeId));
                } else {
                  return [
                    createVNode(unref(ChevronRight), { class: "h-5 w-5" })
                  ];
                }
              }),
              _: 1
            }, _parent));
          } else {
            _push(`<!---->`);
          }
          if (unref(portfolio).image_url.length > 1) {
            _push(`<div class="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-background/80 backdrop-blur-sm px-3 py-1 text-xs font-medium">${ssrInterpolate(unref(currentImageIndex) + 1)} / ${ssrInterpolate(unref(portfolio).image_url.length)}</div>`);
          } else {
            _push(`<!---->`);
          }
          if (unref(portfolio).image_url.length > 1) {
            _push(`<div class="absolute bottom-2 right-2 flex gap-1"><!--[-->`);
            ssrRenderList(unref(portfolio).image_url, (image, index) => {
              _push(ssrRenderComponent(_component_ui_button, {
                key: index,
                onClick: ($event) => currentImageIndex.value = index,
                type: "button",
                class: [
                  "h-2 w-2 rounded-full transition-all",
                  index === unref(currentImageIndex) ? "bg-primary w-6" : "bg-background/60 hover:bg-background/80"
                ],
                "aria-label": `Перейти к изображению ${index + 1}`
              }, null, _parent));
            });
            _push(`<!--]--></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
          if (unref(portfolio).image_url.length > 1) {
            _push(`<div class="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2"><!--[-->`);
            ssrRenderList(unref(portfolio).image_url, (image, index) => {
              _push(`<button type="button" class="${ssrRenderClass([
                "relative aspect-square overflow-hidden rounded-lg border-2 transition-all",
                index === unref(currentImageIndex) ? "border-primary" : "border-transparent hover:border-primary/50"
              ])}"><img${ssrRenderAttr("src", image)}${ssrRenderAttr("alt", `Миниатюра ${index + 1}`)} class="h-full w-full object-cover"></button>`);
            });
            _push(`<!--]--></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="flex flex-wrap gap-4 text-sm text-muted-foreground pt-4 border-t"><div class="flex items-center gap-2">`);
        _push(ssrRenderComponent(unref(Eye), { class: "w-4 h-4" }, null, _parent));
        _push(`<span>${ssrInterpolate(unref(portfolio).views_count)} просмотров</span></div><div class="flex items-center gap-2">`);
        _push(ssrRenderComponent(unref(Heart), { class: "w-4 h-4" }, null, _parent));
        _push(`<span>${ssrInterpolate(unref(portfolio).likes_count)} лайков</span></div><div class="flex items-center gap-2">`);
        _push(ssrRenderComponent(unref(Globe), { class: "w-4 h-4" }, null, _parent));
        _push(`<span>Публичное</span></div></div><div class="text-sm text-muted-foreground"><p>Создано: ${ssrInterpolate(formatDate(unref(portfolio).created_at))}</p>`);
        if (unref(portfolio).updated_at !== unref(portfolio).created_at) {
          _push(`<p> Обновлено: ${ssrInterpolate(formatDate(unref(portfolio).updated_at))}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/portfolio/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-BIlaCAW8.mjs.map
