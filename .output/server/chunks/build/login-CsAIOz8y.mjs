import { _ as __nuxt_component_1 } from './Logo-BfuZF7by.mjs';
import { _ as __nuxt_component_7, a as __nuxt_component_9, b as __nuxt_component_16 } from './ProcessingButton-CFDNfXFc.mjs';
import { _ as __nuxt_component_3, a as __nuxt_component_4 } from './Alert-Byz3EsW4.mjs';
import { _ as __nuxt_component_6 } from './Input-KWFPdyFn.mjs';
import { defineComponent, ref, resolveComponent, mergeProps, withCtx, unref, createVNode, toDisplayString, createTextVNode, createBlock, createCommentVNode, openBlock, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { AlertCircleIcon } from 'lucide-vue-next';
import { u as useSupabaseClient } from './useSupabaseClient-xv77-Kdn.mjs';
import { u as useHead, n as navigateTo } from './server.mjs';
import { l as loginSchema } from '../_/auth.mjs';
import '@vueuse/core';
import 'reka-ui';
import 'class-variance-authority';
import './Button-B-WuZDFb.mjs';
import './Spinner-ChFHkN1o.mjs';
import 'maska/vue';
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
import 'vue-sonner';
import 'clsx';
import 'tailwind-merge';
import 'zod';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    const supabase = useSupabaseClient();
    const isLoginProcessing = ref(false);
    const loginErrorMessageKey = ref(null);
    useHead({ title: "Вход" });
    const { handleSubmit } = useForm({
      validationSchema: toTypedSchema(loginSchema),
      initialValues: {
        email: "",
        password: ""
      }
    });
    handleSubmit(async (values) => {
      try {
        loginErrorMessageKey.value = null;
        isLoginProcessing.value = true;
        const { error: loginError } = await supabase.auth.signInWithPassword({ ...values });
        if (loginError) {
          if (loginError.code === "invalid_credentials") {
            loginErrorMessageKey.value = "Неверные логин или пароль";
            isLoginProcessing.value = false;
            return;
          }
          throw loginError;
        }
        return navigateTo("/profile");
      } catch (error) {
        loginErrorMessageKey.value = "Ошибка при входе";
        isLoginProcessing.value = false;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_base_logo = __nuxt_component_1;
      const _component_ui_field_group = __nuxt_component_7;
      const _component_ui_alert = __nuxt_component_3;
      const _component_ui_alert_title = __nuxt_component_4;
      const _component_base_input = __nuxt_component_6;
      const _component_ui_field = __nuxt_component_9;
      const _component_base_processing_button = __nuxt_component_16;
      const _component_router_link = resolveComponent("router-link");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10" }, _attrs))}><div class="flex w-full max-w-sm flex-col gap-6"><span class="flex items-center gap-2 self-center font-medium">`);
      _push(ssrRenderComponent(_component_base_logo, null, null, _parent));
      _push(`</span><div class="flex flex-1 items-center justify-center"><form class="flex flex-col gap-6 w-full max-w-xs">`);
      _push(ssrRenderComponent(_component_ui_field_group, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-col items-center gap-1 text-center"${_scopeId}><h1 class="text-2xl font-bold"${_scopeId}> Вход в аккаунт </h1><p class="text-muted-foreground text-sm text-balance"${_scopeId}> Авторизуйтесь, чтобы продолжить работу </p></div>`);
            if (unref(loginErrorMessageKey)) {
              _push2(ssrRenderComponent(_component_ui_alert, {
                variant: "destructive",
                class: "border-destructive"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(AlertCircleIcon), null, null, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_ui_alert_title, { class: "font-normal" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<p${_scopeId3}>${ssrInterpolate(unref(loginErrorMessageKey))}</p>`);
                        } else {
                          return [
                            createVNode("p", null, toDisplayString(unref(loginErrorMessageKey)), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(AlertCircleIcon)),
                      createVNode(_component_ui_alert_title, { class: "font-normal" }, {
                        default: withCtx(() => [
                          createVNode("p", null, toDisplayString(unref(loginErrorMessageKey)), 1)
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_component_base_input, {
              name: "email",
              type: "email",
              label: "Введите email",
              placeholder: "email@example.com",
              autocomplete: "email",
              "errors-to-show": "all"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_base_input, {
              name: "password",
              type: "password",
              label: "Введите пароль",
              placeholder: "********",
              autocomplete: "current-password",
              "errors-to-show": "all"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_ui_field, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_base_processing_button, {
                    type: "submit",
                    label: "Войти",
                    "is-processing": unref(isLoginProcessing)
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_base_processing_button, {
                      type: "submit",
                      label: "Войти",
                      "is-processing": unref(isLoginProcessing)
                    }, null, 8, ["is-processing"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="text-center text-sm"${_scopeId}> Ещё нет аккаунта? `);
            _push2(ssrRenderComponent(_component_router_link, {
              to: "/auth/register",
              class: "underline underline-offset-4 hover:text-primary"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Зарегистрироваться `);
                } else {
                  return [
                    createTextVNode(" Зарегистрироваться ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-col items-center gap-1 text-center" }, [
                createVNode("h1", { class: "text-2xl font-bold" }, " Вход в аккаунт "),
                createVNode("p", { class: "text-muted-foreground text-sm text-balance" }, " Авторизуйтесь, чтобы продолжить работу ")
              ]),
              unref(loginErrorMessageKey) ? (openBlock(), createBlock(_component_ui_alert, {
                key: 0,
                variant: "destructive",
                class: "border-destructive"
              }, {
                default: withCtx(() => [
                  createVNode(unref(AlertCircleIcon)),
                  createVNode(_component_ui_alert_title, { class: "font-normal" }, {
                    default: withCtx(() => [
                      createVNode("p", null, toDisplayString(unref(loginErrorMessageKey)), 1)
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })) : createCommentVNode("", true),
              createVNode(_component_base_input, {
                name: "email",
                type: "email",
                label: "Введите email",
                placeholder: "email@example.com",
                autocomplete: "email",
                "errors-to-show": "all"
              }),
              createVNode(_component_base_input, {
                name: "password",
                type: "password",
                label: "Введите пароль",
                placeholder: "********",
                autocomplete: "current-password",
                "errors-to-show": "all"
              }),
              createVNode(_component_ui_field, null, {
                default: withCtx(() => [
                  createVNode(_component_base_processing_button, {
                    type: "submit",
                    label: "Войти",
                    "is-processing": unref(isLoginProcessing)
                  }, null, 8, ["is-processing"])
                ]),
                _: 1
              }),
              createVNode("div", { class: "text-center text-sm" }, [
                createTextVNode(" Ещё нет аккаунта? "),
                createVNode(_component_router_link, {
                  to: "/auth/register",
                  class: "underline underline-offset-4 hover:text-primary"
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Зарегистрироваться ")
                  ]),
                  _: 1
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</form></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/auth/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=login-CsAIOz8y.mjs.map
