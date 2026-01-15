import { defineComponent, mergeProps, withCtx, createTextVNode, createVNode, toDisplayString, unref, renderSlot, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderSlot } from 'vue/server-renderer';
import { reactiveOmit } from '@vueuse/core';
import { Primitive } from 'reka-ui';
import { u as useHead, c as cn } from './server.mjs';
import { cva } from 'class-variance-authority';
import { _ as __nuxt_component_0$1 } from './nuxt-link-TvooyZgq.mjs';
import { _ as __nuxt_component_3$2 } from './Button-B-WuZDFb.mjs';
import { _ as __nuxt_component_0$2 } from './Card-q7WYGlaG.mjs';
import { _ as __nuxt_component_1, a as __nuxt_component_2 } from './CardDescription-B_0DNF2Z.mjs';
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

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive: "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "Badge",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {},
    variant: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class");
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        "data-slot": "badge",
        class: unref(cn)(unref(badgeVariants)({ variant: __props.variant }), props.class)
      }, unref(delegatedProps), _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/badge/Badge.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main$5, { __name: "UiBadge" });
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "CardTitle",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<h3${ssrRenderAttrs(mergeProps({
        "data-slot": "card-title",
        class: unref(cn)("leading-none font-semibold", props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</h3>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/card/CardTitle.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_3$1 = Object.assign(_sfc_main$4, { __name: "UiCardTitle" });
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "CardContent",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        "data-slot": "card-content",
        class: unref(cn)("px-6", props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/card/CardContent.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_5 = Object.assign(_sfc_main$3, { __name: "UiCardContent" });
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "CardFooter",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        "data-slot": "card-footer",
        class: unref(cn)("flex items-center px-6 [.border-t]:pt-6", props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/card/CardFooter.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_6 = Object.assign(_sfc_main$2, { __name: "UiCardFooter" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Offer",
  __ssrInlineRender: true,
  props: {
    offerType: { default: "Модель" },
    offerTitle: { default: "Съемка в стиле Vogue" },
    offerDescription: { default: "Ищу профессионального фотографа для реализации минималистичного образа. Студия оплачена, макияж мой." },
    place: { default: "Москва" },
    date: { default: "Завтра" },
    time: { default: "14:00" }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ui_card = __nuxt_component_0$2;
      const _component_ui_badge = __nuxt_component_0;
      const _component_ui_card_header = __nuxt_component_1;
      const _component_ui_card_title = __nuxt_component_3$1;
      const _component_ui_card_description = __nuxt_component_2;
      const _component_ui_card_content = __nuxt_component_5;
      const _component_ui_card_footer = __nuxt_component_6;
      const _component_ui_button = __nuxt_component_3$2;
      _push(ssrRenderComponent(_component_ui_card, mergeProps({ class: "pt-0 group overflow-hidden transition-all hover:shadow-lg" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="relative aspect-[4/5] overflow-hidden bg-muted"${_scopeId}><img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&amp;w=800&amp;auto=format&amp;fit=crop" alt="Preview" class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_ui_badge, { class: "absolute left-4 top-4 backdrop-blur" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(props.offerType)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(props.offerType), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_component_ui_card_header, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex items-center justify-between"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_ui_card_title, { class: "text-xl" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(props.offerTitle)}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(props.offerTitle), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(_component_ui_card_description, { class: "flex items-center gap-2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<span${_scopeId3}>📍 ${ssrInterpolate(props.place)}</span><span${_scopeId3}>•</span><span${_scopeId3}>${ssrInterpolate(props.date)}, ${ssrInterpolate(props.time)}</span>`);
                      } else {
                        return [
                          createVNode("span", null, "📍 " + toDisplayString(props.place), 1),
                          createVNode("span", null, "•"),
                          createVNode("span", null, toDisplayString(props.date) + ", " + toDisplayString(props.time), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode(_component_ui_card_title, { class: "text-xl" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(props.offerTitle), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode(_component_ui_card_description, { class: "flex items-center gap-2" }, {
                      default: withCtx(() => [
                        createVNode("span", null, "📍 " + toDisplayString(props.place), 1),
                        createVNode("span", null, "•"),
                        createVNode("span", null, toDisplayString(props.date) + ", " + toDisplayString(props.time), 1)
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_ui_card_content, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p class="line-clamp-2 text-sm text-muted-foreground"${_scopeId2}>${ssrInterpolate(props.offerDescription)}</p>`);
                } else {
                  return [
                    createVNode("p", { class: "line-clamp-2 text-sm text-muted-foreground" }, toDisplayString(props.offerDescription), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_ui_card_footer, { class: "flex gap-2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_ui_button, { class: "w-full" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Откликнуться`);
                      } else {
                        return [
                          createTextVNode("Откликнуться")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_ui_button, { class: "w-full" }, {
                      default: withCtx(() => [
                        createTextVNode("Откликнуться")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "relative aspect-[4/5] overflow-hidden bg-muted" }, [
                createVNode("img", {
                  src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop",
                  alt: "Preview",
                  class: "h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                }),
                createVNode(_component_ui_badge, { class: "absolute left-4 top-4 backdrop-blur" }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(props.offerType), 1)
                  ]),
                  _: 1
                })
              ]),
              createVNode(_component_ui_card_header, null, {
                default: withCtx(() => [
                  createVNode("div", { class: "flex items-center justify-between" }, [
                    createVNode(_component_ui_card_title, { class: "text-xl" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(props.offerTitle), 1)
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode(_component_ui_card_description, { class: "flex items-center gap-2" }, {
                    default: withCtx(() => [
                      createVNode("span", null, "📍 " + toDisplayString(props.place), 1),
                      createVNode("span", null, "•"),
                      createVNode("span", null, toDisplayString(props.date) + ", " + toDisplayString(props.time), 1)
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_ui_card_content, null, {
                default: withCtx(() => [
                  createVNode("p", { class: "line-clamp-2 text-sm text-muted-foreground" }, toDisplayString(props.offerDescription), 1)
                ]),
                _: 1
              }),
              createVNode(_component_ui_card_footer, { class: "flex gap-2" }, {
                default: withCtx(() => [
                  createVNode(_component_ui_button, { class: "w-full" }, {
                    default: withCtx(() => [
                      createTextVNode("Откликнуться")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/base/Offer.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_3 = Object.assign(_sfc_main$1, { __name: "BaseOffer" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const TAG_LIST = ["Fashion", "Portrait", "Street", "Studio", "Nude", "Cosplay"];
    useHead({ title: "Главная" });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ui_badge = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_ui_button = __nuxt_component_3$2;
      const _component_base_offer = __nuxt_component_3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-background text-foreground" }, _attrs))}><div class="relative overflow-hidden"><div class="absolute inset-0 bg-gradient-to-br from-primary/15 via-background to-primary/8"></div><div class="absolute inset-0 overflow-hidden pointer-events-none"><div class="absolute -top-20 -right-20 h-[600px] w-[600px] rounded-full bg-primary/30 blur-[120px] animate-pulse"></div><div class="absolute -bottom-20 -left-20 h-[600px] w-[600px] rounded-full bg-primary/25 blur-[120px] animate-pulse" style="${ssrRenderStyle({ "animation-delay": "1s" })}"></div><div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-primary/20 blur-[120px] animate-pulse" style="${ssrRenderStyle({ "animation-delay": "2s" })}"></div></div><section class="relative container mx-auto px-4 py-24 text-center lg:py-32"><div class="relative z-10">`);
      _push(ssrRenderComponent(_component_ui_badge, {
        variant: "outline",
        class: "mb-6 rounded-full px-4 py-1 text-sm font-normal"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` ✨ Новые съемки каждый час `);
          } else {
            return [
              createTextVNode(" ✨ Новые съемки каждый час ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<h1 class="mb-6 text-5xl font-extrabold tracking-tight lg:text-7xl"> Твоё идеальное <br><span class="text-primary">портфолио</span> начинается здесь </h1><p class="mx-auto mb-10 max-w-[700px] text-lg text-muted-foreground md:text-xl"> Найдите фотографов, моделей и визажистов для совместных творческих проектов на условиях Time for Print. </p><div class="flex flex-col justify-center gap-4 sm:flex-row">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/offer",
        "as-child": ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_ui_button, {
              size: "lg",
              class: "h-12 px-8 text-base"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Найти проект`);
                } else {
                  return [
                    createTextVNode("Найти проект")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_ui_button, {
                size: "lg",
                class: "h-12 px-8 text-base"
              }, {
                default: withCtx(() => [
                  createTextVNode("Найти проект")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/auth/register",
        "as-child": ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_ui_button, {
              size: "lg",
              variant: "outline",
              class: "h-12 px-8 text-base"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Присоединиться`);
                } else {
                  return [
                    createTextVNode("Присоединиться")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_ui_button, {
                size: "lg",
                variant: "outline",
                class: "h-12 px-8 text-base"
              }, {
                default: withCtx(() => [
                  createTextVNode("Присоединиться")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></section><section class="relative z-10 container mx-auto px-4 pb-16"><div class="flex flex-wrap justify-center gap-2"><!--[-->`);
      ssrRenderList(TAG_LIST, (tag) => {
        _push(ssrRenderComponent(_component_ui_button, {
          key: tag,
          variant: "secondary",
          size: "sm",
          class: "rounded-full"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` #${ssrInterpolate(tag)}`);
            } else {
              return [
                createTextVNode(" #" + toDisplayString(tag), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></section></div><section class="relative z-10 bg-slate-50/50 py-20 dark:bg-slate-900/10"><div class="container mx-auto px-4"><div class="mb-12 flex items-end justify-between"><div><h2 class="text-3xl font-bold tracking-tight">Актуальные предложения</h2><p class="text-muted-foreground">Люди, которые ищут команду прямо сейчас</p></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/offer",
        "as-child": ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_ui_button, {
              variant: "link",
              class: "hidden sm:flex"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Показать все`);
                } else {
                  return [
                    createTextVNode("Показать все")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_ui_button, {
                variant: "link",
                class: "hidden sm:flex"
              }, {
                default: withCtx(() => [
                  createTextVNode("Показать все")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"><!--[-->`);
      ssrRenderList(3, (i) => {
        _push(ssrRenderComponent(_component_base_offer, null, null, _parent));
      });
      _push(`<!--]--></div></div></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-4FQUW5ol.mjs.map
