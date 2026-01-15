import { _ as __nuxt_component_13 } from './Spinner-ChFHkN1o.mjs';
import { _ as __nuxt_component_3 } from './Button-B-WuZDFb.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-TvooyZgq.mjs';
import { defineComponent, watch, mergeProps, withCtx, unref, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { Home } from 'lucide-vue-next';
import { a as useSupabaseUser, b as useRoute, n as navigateTo } from './server.mjs';
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
import 'vue-sonner';
import 'clsx';
import 'tailwind-merge';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "confirm",
  __ssrInlineRender: true,
  setup(__props) {
    const user = useSupabaseUser();
    useSupabaseClient();
    useRoute();
    watch(user, () => {
      if (user.value) {
        return navigateTo("/");
      }
    }, { immediate: true });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ui_spinner = __nuxt_component_13;
      const _component_ui_button = __nuxt_component_3;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col items-center justify-center min-h-[400px] space-y-6" }, _attrs))}><div class="flex flex-col items-center gap-3">`);
      _push(ssrRenderComponent(_component_ui_spinner, null, null, _parent));
      _push(`<p class="text-muted-foreground animate-pulse"> Подтверждаем вашу почту, пожалуйста, подождите... </p></div>`);
      _push(ssrRenderComponent(_component_ui_button, {
        variant: "outline",
        "as-child": ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Home), { class: "mr-2 h-4 w-4" }, null, _parent3, _scopeId2));
                  _push3(` На главную `);
                } else {
                  return [
                    createVNode(unref(Home), { class: "mr-2 h-4 w-4" }),
                    createTextVNode(" На главную ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_NuxtLink, { to: "/" }, {
                default: withCtx(() => [
                  createVNode(unref(Home), { class: "mr-2 h-4 w-4" }),
                  createTextVNode(" На главную ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/auth/confirm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=confirm-CDHMx1pT.mjs.map
