import { a as __nuxt_component_9, d as __nuxt_component_10, e as __nuxt_component_12 } from './ProcessingButton-CFDNfXFc.mjs';
import { defineComponent, unref, mergeProps, withCtx, createTextVNode, toDisplayString, createVNode, withDirectives, createBlock, createCommentVNode, openBlock, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrGetDirectiveProps, ssrRenderAttrs, ssrGetDynamicModelProps } from 'vue/server-renderer';
import { useVModel } from '@vueuse/core';
import { c as cn } from './server.mjs';
import { Field } from 'vee-validate';
import { vMaska } from 'maska/vue';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Input",
  __ssrInlineRender: true,
  props: {
    defaultValue: {},
    modelValue: {},
    class: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const modelValue = useVModel(props, "modelValue", emits, {
      passive: true,
      defaultValue: props.defaultValue
    });
    return (_ctx, _push, _parent, _attrs) => {
      let _temp0;
      _push(`<input${ssrRenderAttrs((_temp0 = mergeProps({
        "data-slot": "input",
        class: unref(cn)(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          props.class
        )
      }, _attrs), mergeProps(_temp0, ssrGetDynamicModelProps(_temp0, unref(modelValue)))))}>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/input/Input.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = Object.assign(_sfc_main$1, { __name: "UiInput" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Input",
  __ssrInlineRender: true,
  props: {
    name: {},
    type: {},
    label: {},
    placeholder: {},
    autocomplete: { default: "off" },
    errorsToShow: { default: "first" },
    mask: { default: "" },
    disabled: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    function getErrors(errors) {
      if (!errors.length) {
        return [];
      }
      if (props.errorsToShow === "first") {
        return [errors[0] || ""];
      }
      return errors;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ui_field = __nuxt_component_9;
      const _component_ui_field_label = __nuxt_component_10;
      const _component_ui_input = __nuxt_component_2;
      const _component_ui_field_error = __nuxt_component_12;
      _push(ssrRenderComponent(unref(Field), mergeProps({ name: __props.name }, _attrs), {
        default: withCtx(({ field, errors }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_ui_field, {
              "data-invalid": !!errors.length
            }, {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_ui_field_label, { for: __props.name }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(__props.label)}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(__props.label), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_ui_input, mergeProps({
                    id: __props.name,
                    type: __props.type,
                    disabled: __props.disabled,
                    placeholder: __props.placeholder,
                    autocomplete: __props.autocomplete,
                    "aria-invalid": !!errors.length
                  }, field, ssrGetDirectiveProps(_ctx, unref(vMaska), __props.mask)), null, _parent3, _scopeId2));
                  if (errors.length) {
                    _push3(ssrRenderComponent(_component_ui_field_error, {
                      errors: getErrors(errors)
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    createVNode(_component_ui_field_label, { for: __props.name }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(__props.label), 1)
                      ]),
                      _: 1
                    }, 8, ["for"]),
                    withDirectives(createVNode(_component_ui_input, mergeProps({
                      id: __props.name,
                      type: __props.type,
                      disabled: __props.disabled,
                      placeholder: __props.placeholder,
                      autocomplete: __props.autocomplete,
                      "aria-invalid": !!errors.length
                    }, field), null, 16, ["id", "type", "disabled", "placeholder", "autocomplete", "aria-invalid"]), [
                      [unref(vMaska), __props.mask]
                    ]),
                    errors.length ? (openBlock(), createBlock(_component_ui_field_error, {
                      key: 0,
                      errors: getErrors(errors)
                    }, null, 8, ["errors"])) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_ui_field, {
                "data-invalid": !!errors.length
              }, {
                default: withCtx(() => [
                  createVNode(_component_ui_field_label, { for: __props.name }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(__props.label), 1)
                    ]),
                    _: 1
                  }, 8, ["for"]),
                  withDirectives(createVNode(_component_ui_input, mergeProps({
                    id: __props.name,
                    type: __props.type,
                    disabled: __props.disabled,
                    placeholder: __props.placeholder,
                    autocomplete: __props.autocomplete,
                    "aria-invalid": !!errors.length
                  }, field), null, 16, ["id", "type", "disabled", "placeholder", "autocomplete", "aria-invalid"]), [
                    [unref(vMaska), __props.mask]
                  ]),
                  errors.length ? (openBlock(), createBlock(_component_ui_field_error, {
                    key: 0,
                    errors: getErrors(errors)
                  }, null, 8, ["errors"])) : createCommentVNode("", true)
                ]),
                _: 2
              }, 1032, ["data-invalid"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/base/Input.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_6 = Object.assign(_sfc_main, { __name: "BaseInput" });

export { __nuxt_component_6 as _ };
//# sourceMappingURL=Input-KWFPdyFn.mjs.map
