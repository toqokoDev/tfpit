import { a as __nuxt_component_9, d as __nuxt_component_10, e as __nuxt_component_12$1 } from './ProcessingButton-CFDNfXFc.mjs';
import { defineComponent, unref, mergeProps, withCtx, createTextVNode, toDisplayString, createVNode, createBlock, openBlock, Fragment, renderList, createCommentVNode, renderSlot, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderSlot } from 'vue/server-renderer';
import { useForwardPropsEmits, SelectRoot, useForwardProps, SelectTrigger, SelectIcon, SelectValue, SelectPortal, SelectContent, SelectViewport, SelectItem, SelectItemIndicator, SelectItemText, SelectScrollUpButton as SelectScrollUpButton$1, SelectScrollDownButton as SelectScrollDownButton$1, SelectGroup, SelectLabel, SelectSeparator } from 'reka-ui';
import { reactiveOmit } from '@vueuse/core';
import { ChevronDown, Check, ChevronUp } from 'lucide-vue-next';
import { c as cn } from './server.mjs';
import { Field } from 'vee-validate';

const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "Select",
  __ssrInlineRender: true,
  props: {
    open: { type: Boolean },
    defaultOpen: { type: Boolean },
    defaultValue: {},
    modelValue: {},
    by: { type: [String, Function] },
    dir: {},
    multiple: { type: Boolean },
    autocomplete: {},
    disabled: { type: Boolean },
    name: {},
    required: { type: Boolean }
  },
  emits: ["update:modelValue", "update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const forwarded = useForwardPropsEmits(props, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(SelectRoot), mergeProps({ "data-slot": "select" }, unref(forwarded), _attrs), {
        default: withCtx((slotProps, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", slotProps, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default", slotProps)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/select/Select.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const __nuxt_component_11 = Object.assign(_sfc_main$b, { __name: "UiSelect" });
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "SelectTrigger",
  __ssrInlineRender: true,
  props: {
    disabled: { type: Boolean },
    reference: {},
    asChild: { type: Boolean },
    as: {},
    class: {},
    size: { default: "default" }
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class", "size");
    const forwardedProps = useForwardProps(delegatedProps);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(SelectTrigger), mergeProps({
        "data-slot": "select-trigger",
        "data-size": __props.size
      }, unref(forwardedProps), {
        class: unref(cn)(
          "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
          props.class
        )
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            _push2(ssrRenderComponent(unref(SelectIcon), { "as-child": "" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(ChevronDown), { class: "size-4 opacity-50" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(ChevronDown), { class: "size-4 opacity-50" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              renderSlot(_ctx.$slots, "default"),
              createVNode(unref(SelectIcon), { "as-child": "" }, {
                default: withCtx(() => [
                  createVNode(unref(ChevronDown), { class: "size-4 opacity-50" })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/select/SelectTrigger.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const __nuxt_component_12 = Object.assign(_sfc_main$a, { __name: "UiSelectTrigger" });
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "SelectValue",
  __ssrInlineRender: true,
  props: {
    placeholder: {},
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(SelectValue), mergeProps({ "data-slot": "select-value" }, props, _attrs), {
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
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/select/SelectValue.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const __nuxt_component_13 = Object.assign(_sfc_main$9, { __name: "UiSelectValue" });
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "SelectGroup",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(SelectGroup), mergeProps({ "data-slot": "select-group" }, props, _attrs), {
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/select/SelectGroup.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
Object.assign(_sfc_main$8, { __name: "UiSelectGroup" });
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "SelectItem",
  __ssrInlineRender: true,
  props: {
    value: {},
    disabled: { type: Boolean },
    textValue: {},
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class");
    const forwardedProps = useForwardProps(delegatedProps);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(SelectItem), mergeProps({ "data-slot": "select-item" }, unref(forwardedProps), {
        class: unref(cn)(
          "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
          props.class
        )
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="absolute right-2 flex size-3.5 items-center justify-center"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(SelectItemIndicator), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  ssrRenderSlot(_ctx.$slots, "indicator-icon", {}, () => {
                    _push3(ssrRenderComponent(unref(Check), { class: "size-4" }, null, _parent3, _scopeId2));
                  }, _push3, _parent3, _scopeId2);
                } else {
                  return [
                    renderSlot(_ctx.$slots, "indicator-icon", {}, () => [
                      createVNode(unref(Check), { class: "size-4" })
                    ])
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
            _push2(`</span>`);
            _push2(ssrRenderComponent(unref(SelectItemText), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push3, _parent3, _scopeId2);
                } else {
                  return [
                    renderSlot(_ctx.$slots, "default")
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("span", { class: "absolute right-2 flex size-3.5 items-center justify-center" }, [
                createVNode(unref(SelectItemIndicator), null, {
                  default: withCtx(() => [
                    renderSlot(_ctx.$slots, "indicator-icon", {}, () => [
                      createVNode(unref(Check), { class: "size-4" })
                    ])
                  ]),
                  _: 3
                })
              ]),
              createVNode(unref(SelectItemText), null, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default")
                ]),
                _: 3
              })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/select/SelectItem.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const __nuxt_component_15 = Object.assign(_sfc_main$7, { __name: "UiSelectItem" });
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "SelectItemText",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(SelectItemText), mergeProps({ "data-slot": "select-item-text" }, props, _attrs), {
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
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/select/SelectItemText.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
Object.assign(_sfc_main$6, { __name: "UiSelectItemText" });
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "SelectLabel",
  __ssrInlineRender: true,
  props: {
    for: {},
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(SelectLabel), mergeProps({
        "data-slot": "select-label",
        class: unref(cn)("text-muted-foreground px-2 py-1.5 text-xs", props.class)
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
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/select/SelectLabel.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
Object.assign(_sfc_main$5, { __name: "UiSelectLabel" });
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "SelectScrollDownButton",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class");
    const forwardedProps = useForwardProps(delegatedProps);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(SelectScrollDownButton$1), mergeProps({ "data-slot": "select-scroll-down-button" }, unref(forwardedProps), {
        class: unref(cn)("flex cursor-default items-center justify-center py-1", props.class)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, () => {
              _push2(ssrRenderComponent(unref(ChevronDown), { class: "size-4" }, null, _parent2, _scopeId));
            }, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default", {}, () => [
                createVNode(unref(ChevronDown), { class: "size-4" })
              ])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/select/SelectScrollDownButton.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const SelectScrollDownButton = Object.assign(_sfc_main$4, { __name: "UiSelectScrollDownButton" });
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "SelectScrollUpButton",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class");
    const forwardedProps = useForwardProps(delegatedProps);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(SelectScrollUpButton$1), mergeProps({ "data-slot": "select-scroll-up-button" }, unref(forwardedProps), {
        class: unref(cn)("flex cursor-default items-center justify-center py-1", props.class)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, () => {
              _push2(ssrRenderComponent(unref(ChevronUp), { class: "size-4" }, null, _parent2, _scopeId));
            }, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default", {}, () => [
                createVNode(unref(ChevronUp), { class: "size-4" })
              ])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/select/SelectScrollUpButton.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const SelectScrollUpButton = Object.assign(_sfc_main$3, { __name: "UiSelectScrollUpButton" });
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "SelectSeparator",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class");
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(SelectSeparator), mergeProps({ "data-slot": "select-separator" }, unref(delegatedProps), {
        class: unref(cn)("bg-border pointer-events-none -mx-1 my-1 h-px", props.class)
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/select/SelectSeparator.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
Object.assign(_sfc_main$2, { __name: "UiSelectSeparator" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "SelectContent",
  __ssrInlineRender: true,
  props: {
    forceMount: { type: Boolean },
    position: { default: "popper" },
    bodyLock: { type: Boolean },
    side: {},
    sideOffset: {},
    sideFlip: { type: Boolean },
    align: {},
    alignOffset: {},
    alignFlip: { type: Boolean },
    avoidCollisions: { type: Boolean },
    collisionBoundary: {},
    collisionPadding: {},
    arrowPadding: {},
    sticky: {},
    hideWhenDetached: { type: Boolean },
    positionStrategy: {},
    updatePositionStrategy: {},
    disableUpdateOnLayoutShift: { type: Boolean },
    prioritizePosition: { type: Boolean },
    reference: {},
    asChild: { type: Boolean },
    as: {},
    disableOutsidePointerEvents: { type: Boolean },
    class: {}
  },
  emits: ["closeAutoFocus", "escapeKeyDown", "pointerDownOutside"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const delegatedProps = reactiveOmit(props, "class");
    const forwarded = useForwardPropsEmits(delegatedProps, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(SelectPortal), _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(SelectContent), mergeProps({ "data-slot": "select-content" }, { ..._ctx.$attrs, ...unref(forwarded) }, {
              class: unref(cn)(
                "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--reka-select-content-available-height) min-w-[8rem] overflow-x-hidden overflow-y-auto rounded-md border shadow-md",
                __props.position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
                props.class
              )
            }), {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(SelectScrollUpButton), null, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(SelectViewport), {
                    class: unref(cn)("p-1", __props.position === "popper" && "h-[var(--reka-select-trigger-height)] w-full min-w-[var(--reka-select-trigger-width)] scroll-my-1")
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push4, _parent4, _scopeId3);
                      } else {
                        return [
                          renderSlot(_ctx.$slots, "default")
                        ];
                      }
                    }),
                    _: 3
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(SelectScrollDownButton), null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(SelectScrollUpButton)),
                    createVNode(unref(SelectViewport), {
                      class: unref(cn)("p-1", __props.position === "popper" && "h-[var(--reka-select-trigger-height)] w-full min-w-[var(--reka-select-trigger-width)] scroll-my-1")
                    }, {
                      default: withCtx(() => [
                        renderSlot(_ctx.$slots, "default")
                      ]),
                      _: 3
                    }, 8, ["class"]),
                    createVNode(unref(SelectScrollDownButton))
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(SelectContent), mergeProps({ "data-slot": "select-content" }, { ..._ctx.$attrs, ...unref(forwarded) }, {
                class: unref(cn)(
                  "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--reka-select-content-available-height) min-w-[8rem] overflow-x-hidden overflow-y-auto rounded-md border shadow-md",
                  __props.position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
                  props.class
                )
              }), {
                default: withCtx(() => [
                  createVNode(unref(SelectScrollUpButton)),
                  createVNode(unref(SelectViewport), {
                    class: unref(cn)("p-1", __props.position === "popper" && "h-[var(--reka-select-trigger-height)] w-full min-w-[var(--reka-select-trigger-width)] scroll-my-1")
                  }, {
                    default: withCtx(() => [
                      renderSlot(_ctx.$slots, "default")
                    ]),
                    _: 3
                  }, 8, ["class"]),
                  createVNode(unref(SelectScrollDownButton))
                ]),
                _: 3
              }, 16, ["class"])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/select/SelectContent.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_14 = Object.assign(_sfc_main$1, { __name: "UiSelectContent" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Select",
  __ssrInlineRender: true,
  props: {
    name: {},
    label: {},
    placeholder: {},
    options: {},
    errorsToShow: { default: "first" }
  },
  setup(__props) {
    const props = __props;
    function getErrors(errors) {
      if (!errors.length) return [];
      return props.errorsToShow === "first" ? [errors[0] || ""] : errors;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ui_field = __nuxt_component_9;
      const _component_ui_field_label = __nuxt_component_10;
      const _component_ui_select = __nuxt_component_11;
      const _component_ui_select_trigger = __nuxt_component_12;
      const _component_ui_select_value = __nuxt_component_13;
      const _component_ui_select_content = __nuxt_component_14;
      const _component_ui_select_item = __nuxt_component_15;
      const _component_ui_field_error = __nuxt_component_12$1;
      _push(ssrRenderComponent(unref(Field), mergeProps({ name: __props.name }, _attrs), {
        default: withCtx(({ field, errors, setValue, setTouched }, _push2, _parent2, _scopeId) => {
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
                  _push3(ssrRenderComponent(_component_ui_select, {
                    id: __props.name,
                    "model-value": field.value || "",
                    "onUpdate:modelValue": (value) => {
                      const stringValue = value !== void 0 && value !== null ? String(value) : "";
                      if (stringValue) {
                        setValue(stringValue);
                        setTouched(true);
                      }
                    }
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_ui_select_trigger, {
                          "aria-invalid": !!errors.length
                        }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_ui_select_value, { placeholder: __props.placeholder }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_ui_select_value, { placeholder: __props.placeholder }, null, 8, ["placeholder"])
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_ui_select_content, null, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<!--[-->`);
                              ssrRenderList(__props.options, (opt) => {
                                _push5(ssrRenderComponent(_component_ui_select_item, {
                                  key: opt.value,
                                  value: opt.value
                                }, {
                                  default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`${ssrInterpolate(opt.label)}`);
                                    } else {
                                      return [
                                        createTextVNode(toDisplayString(opt.label), 1)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              });
                              _push5(`<!--]-->`);
                            } else {
                              return [
                                (openBlock(true), createBlock(Fragment, null, renderList(__props.options, (opt) => {
                                  return openBlock(), createBlock(_component_ui_select_item, {
                                    key: opt.value,
                                    value: opt.value
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(opt.label), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["value"]);
                                }), 128))
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_ui_select_trigger, {
                            "aria-invalid": !!errors.length
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_ui_select_value, { placeholder: __props.placeholder }, null, 8, ["placeholder"])
                            ]),
                            _: 1
                          }, 8, ["aria-invalid"]),
                          createVNode(_component_ui_select_content, null, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(__props.options, (opt) => {
                                return openBlock(), createBlock(_component_ui_select_item, {
                                  key: opt.value,
                                  value: opt.value
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(opt.label), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["value"]);
                              }), 128))
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
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
                    createVNode(_component_ui_select, {
                      id: __props.name,
                      "model-value": field.value || "",
                      "onUpdate:modelValue": (value) => {
                        const stringValue = value !== void 0 && value !== null ? String(value) : "";
                        if (stringValue) {
                          setValue(stringValue);
                          setTouched(true);
                        }
                      }
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_ui_select_trigger, {
                          "aria-invalid": !!errors.length
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_ui_select_value, { placeholder: __props.placeholder }, null, 8, ["placeholder"])
                          ]),
                          _: 1
                        }, 8, ["aria-invalid"]),
                        createVNode(_component_ui_select_content, null, {
                          default: withCtx(() => [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.options, (opt) => {
                              return openBlock(), createBlock(_component_ui_select_item, {
                                key: opt.value,
                                value: opt.value
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(opt.label), 1)
                                ]),
                                _: 2
                              }, 1032, ["value"]);
                            }), 128))
                          ]),
                          _: 1
                        })
                      ]),
                      _: 2
                    }, 1032, ["id", "model-value", "onUpdate:modelValue"]),
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
                  createVNode(_component_ui_select, {
                    id: __props.name,
                    "model-value": field.value || "",
                    "onUpdate:modelValue": (value) => {
                      const stringValue = value !== void 0 && value !== null ? String(value) : "";
                      if (stringValue) {
                        setValue(stringValue);
                        setTouched(true);
                      }
                    }
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_ui_select_trigger, {
                        "aria-invalid": !!errors.length
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_ui_select_value, { placeholder: __props.placeholder }, null, 8, ["placeholder"])
                        ]),
                        _: 1
                      }, 8, ["aria-invalid"]),
                      createVNode(_component_ui_select_content, null, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.options, (opt) => {
                            return openBlock(), createBlock(_component_ui_select_item, {
                              key: opt.value,
                              value: opt.value
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(opt.label), 1)
                              ]),
                              _: 2
                            }, 1032, ["value"]);
                          }), 128))
                        ]),
                        _: 1
                      })
                    ]),
                    _: 2
                  }, 1032, ["id", "model-value", "onUpdate:modelValue"]),
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/base/Select.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_8 = Object.assign(_sfc_main, { __name: "BaseSelect" });

export { __nuxt_component_8 as _, __nuxt_component_11 as a, __nuxt_component_12 as b, __nuxt_component_13 as c, __nuxt_component_14 as d, __nuxt_component_15 as e };
//# sourceMappingURL=Select-C3oCgH1Q.mjs.map
