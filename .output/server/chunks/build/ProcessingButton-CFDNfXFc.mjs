import { defineComponent, mergeProps, unref, withCtx, createBlock, openBlock, Fragment, createVNode, toDisplayString, renderSlot, computed, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderSlot, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { c as cn } from './server.mjs';
import { reactiveOmit } from '@vueuse/core';
import { Label, Separator as Separator$1 } from 'reka-ui';
import { cva } from 'class-variance-authority';
import { _ as __nuxt_component_3 } from './Button-B-WuZDFb.mjs';
import { _ as __nuxt_component_13 } from './Spinner-ChFHkN1o.mjs';

const _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "FieldGroup",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        "data-slot": "field-group",
        class: unref(cn)(
          "group/field-group @container/field-group flex w-full flex-col gap-7 data-[slot=checkbox-group]:gap-3 [&>[data-slot=field-group]]:gap-4",
          props.class
        )
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/field/FieldGroup.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const __nuxt_component_7 = Object.assign(_sfc_main$c, { __name: "UiFieldGroup" });
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "FieldContent",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        "data-slot": "field-content",
        class: unref(cn)(
          "group/field-content flex flex-1 flex-col gap-1.5 leading-snug",
          props.class
        )
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/field/FieldContent.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
Object.assign(_sfc_main$b, { __name: "UiFieldContent" });
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "FieldDescription",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<p${ssrRenderAttrs(mergeProps({
        "data-slot": "field-description",
        class: unref(cn)(
          "text-muted-foreground text-sm leading-normal font-normal group-has-[[data-orientation=horizontal]]/field:text-balance",
          "last:mt-0 nth-last-2:-mt-1 [[data-variant=legend]+&]:-mt-1.5",
          "[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4",
          props.class
        )
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</p>`);
    };
  }
});
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/field/FieldDescription.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
Object.assign(_sfc_main$a, { __name: "UiFieldDescription" });
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "FieldError",
  __ssrInlineRender: true,
  props: {
    class: {},
    errors: {}
  },
  setup(__props) {
    const props = __props;
    const content = computed(() => {
      if (!props.errors || props.errors.length === 0)
        return null;
      const uniqueErrors = [
        ...new Map(
          props.errors.filter(Boolean).map((error) => {
            const message = typeof error === "string" ? error : error?.message;
            return [message, error];
          })
        ).values()
      ];
      if (uniqueErrors.length === 1 && uniqueErrors[0]) {
        return typeof uniqueErrors[0] === "string" ? uniqueErrors[0] : uniqueErrors[0].message;
      }
      return uniqueErrors.map((error) => typeof error === "string" ? error : error?.message);
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (_ctx.$slots.default || content.value) {
        _push(`<div${ssrRenderAttrs(mergeProps({
          role: "alert",
          "data-slot": "field-error",
          class: unref(cn)("text-destructive text-sm font-normal", props.class)
        }, _attrs))}>`);
        if (_ctx.$slots.default) {
          ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
        } else if (typeof content.value === "string") {
          _push(`<!--[-->${ssrInterpolate(content.value)}<!--]-->`);
        } else if (Array.isArray(content.value)) {
          _push(`<ul class="ml-4 flex list-disc flex-col gap-1"><!--[-->`);
          ssrRenderList(content.value, (error, index) => {
            _push(`<li>${ssrInterpolate(error)}</li>`);
          });
          _push(`<!--]--></ul>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/field/FieldError.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const __nuxt_component_12 = Object.assign(_sfc_main$9, { __name: "UiFieldError" });
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "Label",
  __ssrInlineRender: true,
  props: {
    for: {},
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class");
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Label), mergeProps({ "data-slot": "label" }, unref(delegatedProps), {
        class: unref(cn)(
          "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
          props.class
        )
      }, _attrs), {
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
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/label/Label.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const __nuxt_component_1 = Object.assign(_sfc_main$8, { __name: "UiLabel" });
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "FieldLabel",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(__nuxt_component_1), mergeProps({
        "data-slot": "field-label",
        class: unref(cn)(
          "group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50",
          "has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col has-[>[data-slot=field]]:rounded-md has-[>[data-slot=field]]:border [&>*]:data-[slot=field]:p-4",
          "has-data-[state=checked]:bg-primary/5 has-data-[state=checked]:border-primary dark:has-data-[state=checked]:bg-primary/10",
          props.class
        )
      }, _attrs), {
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
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/field/FieldLabel.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const __nuxt_component_10 = Object.assign(_sfc_main$7, { __name: "UiFieldLabel" });
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "FieldLegend",
  __ssrInlineRender: true,
  props: {
    class: {},
    variant: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<legend${ssrRenderAttrs(mergeProps({
        "data-slot": "field-legend",
        "data-variant": __props.variant,
        class: unref(cn)(
          "mb-3 font-medium",
          "data-[variant=legend]:text-base",
          "data-[variant=label]:text-sm",
          props.class
        )
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</legend>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/field/FieldLegend.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
Object.assign(_sfc_main$6, { __name: "UiFieldLegend" });
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "Separator",
  __ssrInlineRender: true,
  props: {
    orientation: { default: "horizontal" },
    decorative: { type: Boolean, default: true },
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class");
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Separator$1), mergeProps({ "data-slot": "separator" }, unref(delegatedProps), {
        class: unref(cn)(
          "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
          props.class
        )
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/separator/Separator.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const Separator = Object.assign(_sfc_main$5, { __name: "UiSeparator" });
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "FieldSeparator",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        "data-slot": "field-separator",
        "data-content": !!_ctx.$slots.default,
        class: unref(cn)(
          "relative -my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2",
          props.class
        )
      }, _attrs))}>`);
      _push(ssrRenderComponent(unref(Separator), { class: "absolute inset-0 top-1/2" }, null, _parent));
      if (_ctx.$slots.default) {
        _push(`<span class="bg-background text-muted-foreground relative mx-auto block w-fit px-2" data-slot="field-separator-content">`);
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
        _push(`</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/field/FieldSeparator.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
Object.assign(_sfc_main$4, { __name: "UiFieldSeparator" });
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "FieldSet",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<fieldset${ssrRenderAttrs(mergeProps({
        "data-slot": "field-set",
        class: unref(cn)(
          "flex flex-col gap-6",
          "has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3",
          props.class
        )
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</fieldset>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/field/FieldSet.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
Object.assign(_sfc_main$3, { __name: "UiFieldSet" });
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "FieldTitle",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        "data-slot": "field-label",
        class: unref(cn)(
          "flex w-fit items-center gap-2 text-sm leading-snug font-medium group-data-[disabled=true]/field:opacity-50",
          props.class
        )
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/field/FieldTitle.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
Object.assign(_sfc_main$2, { __name: "UiFieldTitle" });
const fieldVariants = cva(
  "group/field flex w-full gap-3 data-[invalid=true]:text-destructive",
  {
    variants: {
      orientation: {
        vertical: ["flex-col [&>*]:w-full [&>.sr-only]:w-auto"],
        horizontal: [
          "flex-row items-center",
          "[&>[data-slot=field-label]]:flex-auto",
          "has-[>[data-slot=field-content]]:items-start has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px"
        ],
        responsive: [
          "flex-col [&>*]:w-full [&>.sr-only]:w-auto @md/field-group:flex-row @md/field-group:items-center @md/field-group:[&>*]:w-auto",
          "@md/field-group:[&>[data-slot=field-label]]:flex-auto",
          "@md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px"
        ]
      }
    },
    defaultVariants: {
      orientation: "vertical"
    }
  }
);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Field",
  __ssrInlineRender: true,
  props: {
    class: {},
    orientation: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        role: "group",
        "data-slot": "field",
        "data-orientation": __props.orientation,
        class: unref(cn)(
          unref(fieldVariants)({ orientation: __props.orientation }),
          props.class
        )
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/field/Field.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_9 = Object.assign(_sfc_main$1, { __name: "UiField" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ProcessingButton",
  __ssrInlineRender: true,
  props: {
    label: {},
    isProcessing: { type: Boolean }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ui_button = __nuxt_component_3;
      const _component_ui_spinner = __nuxt_component_13;
      _push(ssrRenderComponent(_component_ui_button, mergeProps({ disabled: __props.isProcessing }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (__props.isProcessing) {
              _push2(`<!--[-->`);
              _push2(ssrRenderComponent(_component_ui_spinner, null, null, _parent2, _scopeId));
              _push2(`<span${_scopeId}>Загрузка...</span><!--]-->`);
            } else {
              _push2(`<span${_scopeId}>${ssrInterpolate(__props.label)}</span>`);
            }
          } else {
            return [
              __props.isProcessing ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                createVNode(_component_ui_spinner),
                createVNode("span", null, "Загрузка...")
              ], 64)) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString(__props.label), 1))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/base/ProcessingButton.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_16 = Object.assign(_sfc_main, { __name: "BaseProcessingButton" });

export { __nuxt_component_7 as _, __nuxt_component_9 as a, __nuxt_component_16 as b, __nuxt_component_1 as c, __nuxt_component_10 as d, __nuxt_component_12 as e };
//# sourceMappingURL=ProcessingButton-CFDNfXFc.mjs.map
