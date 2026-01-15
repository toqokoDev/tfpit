import { _ as __nuxt_component_1 } from './Logo-BfuZF7by.mjs';
import { _ as __nuxt_component_13 } from './Spinner-ChFHkN1o.mjs';
import { _ as __nuxt_component_7, a as __nuxt_component_9, b as __nuxt_component_16 } from './ProcessingButton-CFDNfXFc.mjs';
import { _ as __nuxt_component_6 } from './Input-KWFPdyFn.mjs';
import { _ as __nuxt_component_8 } from './Select-C3oCgH1Q.mjs';
import { _ as __nuxt_component_0, a as __nuxt_component_3, b as __nuxt_component_4, c as __nuxt_component_5, d as __nuxt_component_6$1, e as __nuxt_component_15 } from './DialogFooter-DZsTWHfU.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-TvooyZgq.mjs';
import { _ as __nuxt_component_3$1 } from './Button-B-WuZDFb.mjs';
import { defineComponent, ref, computed, resolveComponent, mergeProps, unref, withCtx, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { toTypedSchema } from '@vee-validate/zod';
import { Mail } from 'lucide-vue-next';
import { useForm } from 'vee-validate';
import { toast } from 'vue-sonner';
import { u as useSupabaseClient } from './useSupabaseClient-xv77-Kdn.mjs';
import { r as registerSchema } from '../_/auth.mjs';
import { u as useHead } from './server.mjs';
import '@vueuse/core';
import 'reka-ui';
import 'class-variance-authority';
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
import 'zod';
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
  __name: "register",
  __ssrInlineRender: true,
  setup(__props) {
    const supabase = useSupabaseClient();
    const roles = ref([]);
    const isFetching = ref(true);
    const isRegisterProcessing = ref(false);
    const isConfirmDialogOpen = ref(false);
    const registerErrorMessageKey = ref(null);
    const rolesOptions = computed(
      () => roles.value.map((role) => ({
        label: role.title,
        value: role.id
      }))
    );
    const { handleSubmit } = useForm({
      validationSchema: toTypedSchema(registerSchema),
      initialValues: {
        role: "",
        first_name: "",
        last_name: "",
        email: "",
        password: ""
      }
    });
    handleSubmit(async (values) => {
      try {
        registerErrorMessageKey.value = null;
        isRegisterProcessing.value = true;
        const { error } = await supabase.auth.signUp({
          email: values.email,
          password: values.password,
          options: {
            emailRedirectTo: `${(void 0).location.origin}/auth/confirm`,
            data: {
              first_name: values.first_name,
              last_name: values.last_name,
              role: values.role
            }
          }
        });
        if (error) throw error;
        isConfirmDialogOpen.value = true;
      } catch (error) {
        registerErrorMessageKey.value = error.message || "errors.somethingWentWrong";
        toast.error("Ошибка при регистрации");
      } finally {
        isRegisterProcessing.value = false;
      }
    });
    useHead({ title: "Регистрация" });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_base_logo = __nuxt_component_1;
      const _component_ui_spinner = __nuxt_component_13;
      const _component_ui_field_group = __nuxt_component_7;
      const _component_base_input = __nuxt_component_6;
      const _component_base_select = __nuxt_component_8;
      const _component_ui_field = __nuxt_component_9;
      const _component_base_processing_button = __nuxt_component_16;
      const _component_router_link = resolveComponent("router-link");
      const _component_ui_dialog = __nuxt_component_0;
      const _component_ui_dialog_content = __nuxt_component_3;
      const _component_ui_dialog_header = __nuxt_component_4;
      const _component_ui_dialog_title = __nuxt_component_5;
      const _component_ui_dialog_description = __nuxt_component_6$1;
      const _component_ui_dialog_footer = __nuxt_component_15;
      const _component_nuxt_link = __nuxt_component_0$1;
      const _component_ui_button = __nuxt_component_3$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10" }, _attrs))}><div class="flex w-full max-w-sm flex-col gap-6"><span class="flex items-center gap-2 self-center font-medium">`);
      _push(ssrRenderComponent(_component_base_logo, null, null, _parent));
      _push(`</span><div class="flex flex-1 items-center justify-center">`);
      if (unref(isFetching)) {
        _push(`<div class="flex justify-center">`);
        _push(ssrRenderComponent(_component_ui_spinner, null, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<form class="flex flex-col gap-6 w-full max-w-xs">`);
        _push(ssrRenderComponent(_component_ui_field_group, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex flex-col items-center gap-1 text-center"${_scopeId}><h1 class="text-2xl font-bold"${_scopeId}>Создать аккаунт</h1><p class="text-muted-foreground text-sm text-balance"${_scopeId}> Заполните данные для регистрации в TFP сообществе </p></div><div class="grid grid-cols-2 gap-2"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_base_input, {
                name: "first_name",
                type: "text",
                label: "Имя",
                placeholder: "Иван"
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_base_input, {
                name: "last_name",
                type: "text",
                label: "Фамилия",
                placeholder: "Иванов"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
              _push2(ssrRenderComponent(_component_base_select, {
                name: "role",
                label: "Выберите роль",
                placeholder: "Кто вы?",
                options: unref(rolesOptions)
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_base_input, {
                name: "email",
                type: "email",
                label: "Email",
                placeholder: "email@example.com",
                autocomplete: "email"
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_base_input, {
                name: "password",
                type: "password",
                label: "Пароль",
                placeholder: "********",
                autocomplete: "new-password"
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_ui_field, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_base_processing_button, {
                      type: "submit",
                      label: "Создать аккаунт",
                      "is-processing": unref(isRegisterProcessing)
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_base_processing_button, {
                        type: "submit",
                        label: "Создать аккаунт",
                        "is-processing": unref(isRegisterProcessing)
                      }, null, 8, ["is-processing"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<div class="text-center text-sm"${_scopeId}> Уже есть аккаунта? `);
              _push2(ssrRenderComponent(_component_router_link, {
                to: "/auth/login",
                class: "underline underline-offset-4 hover:text-primary"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Войти `);
                  } else {
                    return [
                      createTextVNode(" Войти ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              return [
                createVNode("div", { class: "flex flex-col items-center gap-1 text-center" }, [
                  createVNode("h1", { class: "text-2xl font-bold" }, "Создать аккаунт"),
                  createVNode("p", { class: "text-muted-foreground text-sm text-balance" }, " Заполните данные для регистрации в TFP сообществе ")
                ]),
                createVNode("div", { class: "grid grid-cols-2 gap-2" }, [
                  createVNode(_component_base_input, {
                    name: "first_name",
                    type: "text",
                    label: "Имя",
                    placeholder: "Иван"
                  }),
                  createVNode(_component_base_input, {
                    name: "last_name",
                    type: "text",
                    label: "Фамилия",
                    placeholder: "Иванов"
                  })
                ]),
                createVNode(_component_base_select, {
                  name: "role",
                  label: "Выберите роль",
                  placeholder: "Кто вы?",
                  options: unref(rolesOptions)
                }, null, 8, ["options"]),
                createVNode(_component_base_input, {
                  name: "email",
                  type: "email",
                  label: "Email",
                  placeholder: "email@example.com",
                  autocomplete: "email"
                }),
                createVNode(_component_base_input, {
                  name: "password",
                  type: "password",
                  label: "Пароль",
                  placeholder: "********",
                  autocomplete: "new-password"
                }),
                createVNode(_component_ui_field, null, {
                  default: withCtx(() => [
                    createVNode(_component_base_processing_button, {
                      type: "submit",
                      label: "Создать аккаунт",
                      "is-processing": unref(isRegisterProcessing)
                    }, null, 8, ["is-processing"])
                  ]),
                  _: 1
                }),
                createVNode("div", { class: "text-center text-sm" }, [
                  createTextVNode(" Уже есть аккаунта? "),
                  createVNode(_component_router_link, {
                    to: "/auth/login",
                    class: "underline underline-offset-4 hover:text-primary"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Войти ")
                    ]),
                    _: 1
                  })
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</form>`);
      }
      _push(`</div></div>`);
      _push(ssrRenderComponent(_component_ui_dialog, {
        open: unref(isConfirmDialogOpen),
        "onUpdate:open": ($event) => isConfirmDialogOpen.value = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_ui_dialog_content, { class: "sm:max-w-md" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_ui_dialog_header, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_ui_dialog_title, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Проверьте почту`);
                            } else {
                              return [
                                createTextVNode("Проверьте почту")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_ui_dialog_description, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Мы отправили письмо со ссылкой для подтверждения на ваш адрес. `);
                            } else {
                              return [
                                createTextVNode(" Мы отправили письмо со ссылкой для подтверждения на ваш адрес. ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_ui_dialog_title, null, {
                            default: withCtx(() => [
                              createTextVNode("Проверьте почту")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_ui_dialog_description, null, {
                            default: withCtx(() => [
                              createTextVNode(" Мы отправили письмо со ссылкой для подтверждения на ваш адрес. ")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="flex flex-col items-center justify-center py-4"${_scopeId2}><div class="bg-primary/10 p-3 rounded-full mb-4"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Mail), { class: "h-10 w-10 text-primary" }, null, _parent3, _scopeId2));
                  _push3(`</div><p class="text-sm text-center text-muted-foreground"${_scopeId2}> Пожалуйста, перейдите по ссылке в письме, чтобы завершить регистрацию и войти в аккаунт. </p></div>`);
                  _push3(ssrRenderComponent(_component_ui_dialog_footer, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_nuxt_link, {
                          to: "/",
                          "as-child": ""
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_ui_button, {
                                type: "button",
                                variant: "secondary"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Хорошо `);
                                  } else {
                                    return [
                                      createTextVNode(" Хорошо ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_ui_button, {
                                  type: "button",
                                  variant: "secondary"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Хорошо ")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_nuxt_link, {
                            to: "/",
                            "as-child": ""
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_ui_button, {
                                type: "button",
                                variant: "secondary"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Хорошо ")
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
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_ui_dialog_header, null, {
                      default: withCtx(() => [
                        createVNode(_component_ui_dialog_title, null, {
                          default: withCtx(() => [
                            createTextVNode("Проверьте почту")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_ui_dialog_description, null, {
                          default: withCtx(() => [
                            createTextVNode(" Мы отправили письмо со ссылкой для подтверждения на ваш адрес. ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "flex flex-col items-center justify-center py-4" }, [
                      createVNode("div", { class: "bg-primary/10 p-3 rounded-full mb-4" }, [
                        createVNode(unref(Mail), { class: "h-10 w-10 text-primary" })
                      ]),
                      createVNode("p", { class: "text-sm text-center text-muted-foreground" }, " Пожалуйста, перейдите по ссылке в письме, чтобы завершить регистрацию и войти в аккаунт. ")
                    ]),
                    createVNode(_component_ui_dialog_footer, null, {
                      default: withCtx(() => [
                        createVNode(_component_nuxt_link, {
                          to: "/",
                          "as-child": ""
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_ui_button, {
                              type: "button",
                              variant: "secondary"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Хорошо ")
                              ]),
                              _: 1
                            })
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
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_ui_dialog_content, { class: "sm:max-w-md" }, {
                default: withCtx(() => [
                  createVNode(_component_ui_dialog_header, null, {
                    default: withCtx(() => [
                      createVNode(_component_ui_dialog_title, null, {
                        default: withCtx(() => [
                          createTextVNode("Проверьте почту")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_ui_dialog_description, null, {
                        default: withCtx(() => [
                          createTextVNode(" Мы отправили письмо со ссылкой для подтверждения на ваш адрес. ")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "flex flex-col items-center justify-center py-4" }, [
                    createVNode("div", { class: "bg-primary/10 p-3 rounded-full mb-4" }, [
                      createVNode(unref(Mail), { class: "h-10 w-10 text-primary" })
                    ]),
                    createVNode("p", { class: "text-sm text-center text-muted-foreground" }, " Пожалуйста, перейдите по ссылке в письме, чтобы завершить регистрацию и войти в аккаунт. ")
                  ]),
                  createVNode(_component_ui_dialog_footer, null, {
                    default: withCtx(() => [
                      createVNode(_component_nuxt_link, {
                        to: "/",
                        "as-child": ""
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_ui_button, {
                            type: "button",
                            variant: "secondary"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Хорошо ")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
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
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/auth/register.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=register-lLT2SI_0.mjs.map
