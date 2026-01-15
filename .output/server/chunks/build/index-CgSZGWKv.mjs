import { _ as __nuxt_component_0$1 } from './Card-q7WYGlaG.mjs';
import { defineComponent, ref, mergeProps, withCtx, unref, isRef, createTextVNode, createVNode, renderSlot, computed, watch, createBlock, openBlock, toDisplayString, createCommentVNode, Fragment, renderList, toRaw, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrRenderClass, ssrRenderAttr, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { reactiveOmit, useVModel, createReusableTemplate } from '@vueuse/core';
import { useForwardPropsEmits, TabsRoot, TabsList, useForwardProps, TabsTrigger, TabsContent, TagsInputRoot, TagsInputItem, TagsInputItemText, TagsInputItemDelete, TagsInputInput, PopoverRoot, PopoverTrigger, PopoverPortal, PopoverContent, useDateFormatter, CalendarRoot, CalendarHeader as CalendarHeader$1, CalendarPrev, CalendarNext, CalendarHeading as CalendarHeading$1, CalendarGrid as CalendarGrid$1, CalendarGridHead as CalendarGridHead$1, CalendarGridRow as CalendarGridRow$1, CalendarHeadCell as CalendarHeadCell$1, CalendarGridBody as CalendarGridBody$1, CalendarCell as CalendarCell$1, CalendarCellTrigger as CalendarCellTrigger$1 } from 'reka-ui';
import { u as useHead, c as cn } from './server.mjs';
import { _ as __nuxt_component_3$3, b as buttonVariants } from './Button-B-WuZDFb.mjs';
import { _ as __nuxt_component_13 } from './Spinner-ChFHkN1o.mjs';
import { _ as __nuxt_component_2$3, a as __nuxt_component_3$4, b as __nuxt_component_4$3 } from './AvatarFallback-DpUTFjBK.mjs';
import { _ as __nuxt_component_7, a as __nuxt_component_9$1, b as __nuxt_component_16, c as __nuxt_component_1$2, d as __nuxt_component_10, e as __nuxt_component_12$1 } from './ProcessingButton-CFDNfXFc.mjs';
import { _ as __nuxt_component_3$5, a as __nuxt_component_4$4 } from './Alert-Byz3EsW4.mjs';
import { _ as __nuxt_component_6$2 } from './Input-KWFPdyFn.mjs';
import { parseDate, DateFormatter, getLocalTimeZone, today } from '@internationalized/date';
import { createYearRange, toDate, createYear } from 'reka-ui/date';
import { Camera, AlertCircleIcon, Calendar, X, ChevronDownIcon, ChevronLeft, ChevronRight } from 'lucide-vue-next';
import { useForm, Field } from 'vee-validate';
import { _ as __nuxt_component_8$1, a as __nuxt_component_11, b as __nuxt_component_12, c as __nuxt_component_13$1, d as __nuxt_component_14, e as __nuxt_component_15 } from './Select-C3oCgH1Q.mjs';
import { toTypedSchema } from '@vee-validate/zod';
import { toast } from 'vue-sonner';
import { u as useSupabaseClient } from './useSupabaseClient-xv77-Kdn.mjs';
import { u as useCurrentUserStore } from './current-user-h5Lc7er2.mjs';
import * as zod from 'zod';
import { p as portfolioSchema } from '../_/portfolio.mjs';
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
import 'class-variance-authority';
import 'maska/vue';

const userRoleSchema = zod.object({
  id: zod.string().uuid(),
  title: zod.string(),
  description: zod.string()
}).strict();
zod.object({
  id: zod.string().uuid(),
  email: zod.string().email(),
  phone: zod.string().optional(),
  city: zod.string().optional(),
  bio: zod.string().optional(),
  gender: zod.string().optional(),
  birth_date: zod.union([zod.string(), zod.any()]).optional(),
  first_name: zod.string().max(50, "\u0418\u043C\u044F \u0441\u043B\u0438\u0448\u043A\u043E\u043C \u0434\u043B\u0438\u043D\u043D\u043E\u0435"),
  last_name: zod.string().max(50, "\u0424\u0430\u043C\u0438\u043B\u0438\u044F \u0441\u043B\u0438\u0448\u043A\u043E\u043C \u0434\u043B\u0438\u043D\u043D\u0430\u044F"),
  avatar_url: zod.string().url().optional(),
  cover_url: zod.string().url().optional(),
  role: userRoleSchema.optional(),
  portfolio: zod.array(portfolioSchema).optional(),
  created_at: zod.string().optional(),
  updated_at: zod.string().optional()
}).strict();
const userUpdateSchema = zod.object({
  email: zod.string().email(),
  phone: zod.string().optional(),
  city: zod.string().optional(),
  bio: zod.string().optional(),
  gender: zod.string().optional(),
  birth_date: zod.union([zod.string(), zod.any()]).optional(),
  first_name: zod.string().max(50, "\u0418\u043C\u044F \u0441\u043B\u0438\u0448\u043A\u043E\u043C \u0434\u043B\u0438\u043D\u043D\u043E\u0435"),
  last_name: zod.string().max(50, "\u0424\u0430\u043C\u0438\u043B\u0438\u044F \u0441\u043B\u0438\u0448\u043A\u043E\u043C \u0434\u043B\u0438\u043D\u043D\u0430\u044F")
}).strict();

const modelProfileSchema = zod.object({
  height: zod.number({ required_error: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0440\u043E\u0441\u0442" }).min(100, "\u0420\u043E\u0441\u0442 \u0434\u043E\u043B\u0436\u0435\u043D \u0431\u044B\u0442\u044C \u043D\u0435 \u043C\u0435\u043D\u0435\u0435 100 \u0441\u043C").max(250, "\u0420\u043E\u0441\u0442 \u0434\u043E\u043B\u0436\u0435\u043D \u0431\u044B\u0442\u044C \u043D\u0435 \u0431\u043E\u043B\u0435\u0435 250 \u0441\u043C"),
  weight: zod.number({ required_error: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0432\u0435\u0441" }).min(30, "\u0412\u0435\u0441 \u0434\u043E\u043B\u0436\u0435\u043D \u0431\u044B\u0442\u044C \u043D\u0435 \u043C\u0435\u043D\u0435\u0435 30 \u043A\u0433").max(200, "\u0412\u0435\u0441 \u0434\u043E\u043B\u0436\u0435\u043D \u0431\u044B\u0442\u044C \u043D\u0435 \u0431\u043E\u043B\u0435\u0435 200 \u043A\u0433"),
  bust: zod.number({ required_error: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043E\u0431\u0445\u0432\u0430\u0442 \u0433\u0440\u0443\u0434\u0438" }).min(60, "\u041E\u0431\u0445\u0432\u0430\u0442 \u0433\u0440\u0443\u0434\u0438 \u0434\u043E\u043B\u0436\u0435\u043D \u0431\u044B\u0442\u044C \u043D\u0435 \u043C\u0435\u043D\u0435\u0435 60 \u0441\u043C").max(150, "\u041E\u0431\u0445\u0432\u0430\u0442 \u0433\u0440\u0443\u0434\u0438 \u0434\u043E\u043B\u0436\u0435\u043D \u0431\u044B\u0442\u044C \u043D\u0435 \u0431\u043E\u043B\u0435\u0435 150 \u0441\u043C"),
  waist: zod.number({ required_error: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043E\u0431\u0445\u0432\u0430\u0442 \u0442\u0430\u043B\u0438\u0438" }).min(50, "\u041E\u0431\u0445\u0432\u0430\u0442 \u0442\u0430\u043B\u0438\u0438 \u0434\u043E\u043B\u0436\u0435\u043D \u0431\u044B\u0442\u044C \u043D\u0435 \u043C\u0435\u043D\u0435\u0435 50 \u0441\u043C").max(150, "\u041E\u0431\u0445\u0432\u0430\u0442 \u0442\u0430\u043B\u0438\u0438 \u0434\u043E\u043B\u0436\u0435\u043D \u0431\u044B\u0442\u044C \u043D\u0435 \u0431\u043E\u043B\u0435\u0435 150 \u0441\u043C"),
  hips: zod.number({ required_error: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043E\u0431\u0445\u0432\u0430\u0442 \u0431\u0435\u0434\u0435\u0440" }).min(60, "\u041E\u0431\u0445\u0432\u0430\u0442 \u0431\u0435\u0434\u0435\u0440 \u0434\u043E\u043B\u0436\u0435\u043D \u0431\u044B\u0442\u044C \u043D\u0435 \u043C\u0435\u043D\u0435\u0435 60 \u0441\u043C").max(150, "\u041E\u0431\u0445\u0432\u0430\u0442 \u0431\u0435\u0434\u0435\u0440 \u0434\u043E\u043B\u0436\u0435\u043D \u0431\u044B\u0442\u044C \u043D\u0435 \u0431\u043E\u043B\u0435\u0435 150 \u0441\u043C"),
  shoe_size: zod.number({ required_error: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0440\u0430\u0437\u043C\u0435\u0440 \u043E\u0431\u0443\u0432\u0438" }).min(30, "\u0420\u0430\u0437\u043C\u0435\u0440 \u043E\u0431\u0443\u0432\u0438 \u0434\u043E\u043B\u0436\u0435\u043D \u0431\u044B\u0442\u044C \u043D\u0435 \u043C\u0435\u043D\u0435\u0435 30").max(50, "\u0420\u0430\u0437\u043C\u0435\u0440 \u043E\u0431\u0443\u0432\u0438 \u0434\u043E\u043B\u0436\u0435\u043D \u0431\u044B\u0442\u044C \u043D\u0435 \u0431\u043E\u043B\u0435\u0435 50"),
  eye_color: zod.string({ required_error: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0446\u0432\u0435\u0442 \u0433\u043B\u0430\u0437" }).min(1, "\u0426\u0432\u0435\u0442 \u0433\u043B\u0430\u0437 \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u0435\u043D"),
  hair_color: zod.string({ required_error: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0446\u0432\u0435\u0442 \u0432\u043E\u043B\u043E\u0441" }).min(1, "\u0426\u0432\u0435\u0442 \u0432\u043E\u043B\u043E\u0441 \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u0435\u043D"),
  hair_length: zod.string({ required_error: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0434\u043B\u0438\u043D\u0443 \u0432\u043E\u043B\u043E\u0441" }).min(1, "\u0414\u043B\u0438\u043D\u0430 \u0432\u043E\u043B\u043E\u0441 \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u0430"),
  clothing_sizes: zod.array(zod.string()).optional(),
  has_tattoos: zod.boolean().nullable().optional(),
  has_piercings: zod.boolean().nullable().optional(),
  has_scars: zod.boolean().nullable().optional(),
  additional_info: zod.array(zod.string()).nullable().optional()
}).strict();
const photographerProfileSchema = zod.object({
  camera: zod.string({ required_error: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043C\u043E\u0434\u0435\u043B\u044C \u043A\u0430\u043C\u0435\u0440\u044B" }).min(1, "\u041C\u043E\u0434\u0435\u043B\u044C \u043A\u0430\u043C\u0435\u0440\u044B \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u0430"),
  lenses: zod.array(zod.string()).optional(),
  additional_info: zod.array(zod.string()).nullable().optional()
}).strict();
const hairdresserProfileSchema = zod.object({
  equipment: zod.array(zod.string()).nullable().optional(),
  specialties: zod.array(zod.string()).nullable().optional(),
  additional_info: zod.array(zod.string()).nullable().optional()
}).strict();
const stylistProfileSchema = zod.object({
  skills: zod.array(zod.string()).nullable().optional(),
  additional_info: zod.array(zod.string()).nullable().optional()
}).strict();
function getRoleProfileSchema(tableName) {
  switch (tableName) {
    case "models":
      return modelProfileSchema;
    case "photographers":
      return photographerProfileSchema;
    case "hairdressers":
      return hairdresserProfileSchema;
    case "stylists":
      return stylistProfileSchema;
    default:
      return zod.object({});
  }
}

const _sfc_main$w = /* @__PURE__ */ defineComponent({
  __name: "Tabs",
  __ssrInlineRender: true,
  props: {
    defaultValue: {},
    orientation: {},
    dir: {},
    activationMode: {},
    modelValue: {},
    unmountOnHide: { type: Boolean },
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const delegatedProps = reactiveOmit(props, "class");
    const forwarded = useForwardPropsEmits(delegatedProps, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(TabsRoot), mergeProps({ "data-slot": "tabs" }, unref(forwarded), {
        class: unref(cn)("flex flex-col gap-2", props.class)
      }, _attrs), {
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
const _sfc_setup$w = _sfc_main$w.setup;
_sfc_main$w.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/tabs/Tabs.vue");
  return _sfc_setup$w ? _sfc_setup$w(props, ctx) : void 0;
};
const __nuxt_component_1$1 = Object.assign(_sfc_main$w, { __name: "UiTabs" });
const _sfc_main$v = /* @__PURE__ */ defineComponent({
  __name: "TabsList",
  __ssrInlineRender: true,
  props: {
    loop: { type: Boolean },
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class");
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(TabsList), mergeProps({ "data-slot": "tabs-list" }, unref(delegatedProps), {
        class: unref(cn)(
          "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
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
const _sfc_setup$v = _sfc_main$v.setup;
_sfc_main$v.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/tabs/TabsList.vue");
  return _sfc_setup$v ? _sfc_setup$v(props, ctx) : void 0;
};
const __nuxt_component_2$2 = Object.assign(_sfc_main$v, { __name: "UiTabsList" });
const _sfc_main$u = /* @__PURE__ */ defineComponent({
  __name: "TabsTrigger",
  __ssrInlineRender: true,
  props: {
    value: {},
    disabled: { type: Boolean },
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class");
    const forwardedProps = useForwardProps(delegatedProps);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(TabsTrigger), mergeProps({
        "data-slot": "tabs-trigger",
        class: unref(cn)(
          "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
          props.class
        )
      }, unref(forwardedProps), _attrs), {
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
const _sfc_setup$u = _sfc_main$u.setup;
_sfc_main$u.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/tabs/TabsTrigger.vue");
  return _sfc_setup$u ? _sfc_setup$u(props, ctx) : void 0;
};
const __nuxt_component_3$2 = Object.assign(_sfc_main$u, { __name: "UiTabsTrigger" });
const _sfc_main$t = /* @__PURE__ */ defineComponent({
  __name: "TabsContent",
  __ssrInlineRender: true,
  props: {
    value: {},
    forceMount: { type: Boolean },
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class");
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(TabsContent), mergeProps({
        "data-slot": "tabs-content",
        class: unref(cn)("flex-1 outline-none", props.class)
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
const _sfc_setup$t = _sfc_main$t.setup;
_sfc_main$t.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/tabs/TabsContent.vue");
  return _sfc_setup$t ? _sfc_setup$t(props, ctx) : void 0;
};
const __nuxt_component_4$2 = Object.assign(_sfc_main$t, { __name: "UiTabsContent" });
const _sfc_main$s = /* @__PURE__ */ defineComponent({
  __name: "Popover",
  __ssrInlineRender: true,
  props: {
    defaultOpen: { type: Boolean },
    open: { type: Boolean },
    modal: { type: Boolean }
  },
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const forwarded = useForwardPropsEmits(props, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(PopoverRoot), mergeProps({ "data-slot": "popover" }, unref(forwarded), _attrs), {
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
const _sfc_setup$s = _sfc_main$s.setup;
_sfc_main$s.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/popover/Popover.vue");
  return _sfc_setup$s ? _sfc_setup$s(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main$s, { __name: "UiPopover" });
const _sfc_main$r = /* @__PURE__ */ defineComponent({
  __name: "PopoverTrigger",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(PopoverTrigger), mergeProps({ "data-slot": "popover-trigger" }, props, _attrs), {
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
const _sfc_setup$r = _sfc_main$r.setup;
_sfc_main$r.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/popover/PopoverTrigger.vue");
  return _sfc_setup$r ? _sfc_setup$r(props, ctx) : void 0;
};
const __nuxt_component_1 = Object.assign(_sfc_main$r, { __name: "UiPopoverTrigger" });
const _sfc_main$q = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "PopoverContent",
  __ssrInlineRender: true,
  props: {
    forceMount: { type: Boolean },
    side: {},
    sideOffset: { default: 4 },
    sideFlip: { type: Boolean },
    align: { default: "center" },
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
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "openAutoFocus", "closeAutoFocus"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const delegatedProps = reactiveOmit(props, "class");
    const forwarded = useForwardPropsEmits(delegatedProps, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(PopoverPortal), _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(PopoverContent), mergeProps({ "data-slot": "popover-content" }, { ..._ctx.$attrs, ...unref(forwarded) }, {
              class: unref(cn)(
                "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 rounded-md border p-4 shadow-md origin-(--reka-popover-content-transform-origin) outline-hidden",
                props.class
              )
            }), {
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
              createVNode(unref(PopoverContent), mergeProps({ "data-slot": "popover-content" }, { ..._ctx.$attrs, ...unref(forwarded) }, {
                class: unref(cn)(
                  "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 rounded-md border p-4 shadow-md origin-(--reka-popover-content-transform-origin) outline-hidden",
                  props.class
                )
              }), {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default")
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
const _sfc_setup$q = _sfc_main$q.setup;
_sfc_main$q.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/popover/PopoverContent.vue");
  return _sfc_setup$q ? _sfc_setup$q(props, ctx) : void 0;
};
const __nuxt_component_3$1 = Object.assign(_sfc_main$q, { __name: "UiPopoverContent" });
const _sfc_main$p = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "NativeSelect",
  __ssrInlineRender: true,
  props: {
    modelValue: {},
    class: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    useVModel(props, "modelValue", emit, {
      passive: true,
      defaultValue: ""
    });
    const delegatedProps = reactiveOmit(props, "class");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "group/native-select relative w-fit has-[select:disabled]:opacity-50",
        "data-slot": "native-select-wrapper"
      }, _attrs))}><select${ssrRenderAttrs(mergeProps({ ..._ctx.$attrs, ...unref(delegatedProps) }, {
        "data-slot": "native-select",
        class: unref(cn)(
          "border-input placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 dark:hover:bg-input/50 h-9 w-full min-w-0 appearance-none rounded-md border bg-transparent px-3 py-2 pr-9 text-sm shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          props.class
        )
      }))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</select>`);
      _push(ssrRenderComponent(unref(ChevronDownIcon), {
        class: "text-muted-foreground pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 opacity-50 select-none",
        "aria-hidden": "true",
        "data-slot": "native-select-icon"
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$p = _sfc_main$p.setup;
_sfc_main$p.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/native-select/NativeSelect.vue");
  return _sfc_setup$p ? _sfc_setup$p(props, ctx) : void 0;
};
const NativeSelect = Object.assign(_sfc_main$p, { __name: "UiNativeSelect" });
const _sfc_main$o = /* @__PURE__ */ defineComponent({
  __name: "NativeSelectOptGroup",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<optgroup${ssrRenderAttrs(mergeProps({
        "data-slot": "native-select-optgroup",
        class: unref(cn)("bg-popover text-popover-foreground", props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</optgroup>`);
    };
  }
});
const _sfc_setup$o = _sfc_main$o.setup;
_sfc_main$o.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/native-select/NativeSelectOptGroup.vue");
  return _sfc_setup$o ? _sfc_setup$o(props, ctx) : void 0;
};
Object.assign(_sfc_main$o, { __name: "UiNativeSelectOptGroup" });
const _sfc_main$n = /* @__PURE__ */ defineComponent({
  __name: "NativeSelectOption",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<option${ssrRenderAttrs(mergeProps({
        "data-slot": "native-select-option",
        class: unref(cn)("bg-popover text-popover-foreground", props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</option>`);
    };
  }
});
const _sfc_setup$n = _sfc_main$n.setup;
_sfc_main$n.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/native-select/NativeSelectOption.vue");
  return _sfc_setup$n ? _sfc_setup$n(props, ctx) : void 0;
};
const NativeSelectOption = Object.assign(_sfc_main$n, { __name: "UiNativeSelectOption" });
const _sfc_main$m = /* @__PURE__ */ defineComponent({
  __name: "CalendarCell",
  __ssrInlineRender: true,
  props: {
    date: {},
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class");
    const forwardedProps = useForwardProps(delegatedProps);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(CalendarCell$1), mergeProps({
        "data-slot": "calendar-cell",
        class: unref(cn)("relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([data-selected])]:rounded-md [&:has([data-selected])]:bg-accent", props.class)
      }, unref(forwardedProps), _attrs), {
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
const _sfc_setup$m = _sfc_main$m.setup;
_sfc_main$m.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/calendar/CalendarCell.vue");
  return _sfc_setup$m ? _sfc_setup$m(props, ctx) : void 0;
};
const CalendarCell = Object.assign(_sfc_main$m, { __name: "UiCalendarCell" });
const _sfc_main$l = /* @__PURE__ */ defineComponent({
  __name: "CalendarCellTrigger",
  __ssrInlineRender: true,
  props: {
    day: {},
    month: {},
    asChild: { type: Boolean },
    as: { default: "button" },
    class: {}
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class");
    const forwardedProps = useForwardProps(delegatedProps);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(CalendarCellTrigger$1), mergeProps({
        "data-slot": "calendar-cell-trigger",
        class: unref(cn)(
          unref(buttonVariants)({ variant: "ghost" }),
          "size-8 p-0 font-normal aria-selected:opacity-100 cursor-default",
          "[&[data-today]:not([data-selected])]:bg-accent [&[data-today]:not([data-selected])]:text-accent-foreground",
          // Selected
          "data-[selected]:bg-primary data-[selected]:text-primary-foreground data-[selected]:opacity-100 data-[selected]:hover:bg-primary data-[selected]:hover:text-primary-foreground data-[selected]:focus:bg-primary data-[selected]:focus:text-primary-foreground",
          // Disabled
          "data-[disabled]:text-muted-foreground data-[disabled]:opacity-50",
          // Unavailable
          "data-[unavailable]:text-destructive-foreground data-[unavailable]:line-through",
          // Outside months
          "data-[outside-view]:text-muted-foreground",
          props.class
        )
      }, unref(forwardedProps), _attrs), {
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
const _sfc_setup$l = _sfc_main$l.setup;
_sfc_main$l.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/calendar/CalendarCellTrigger.vue");
  return _sfc_setup$l ? _sfc_setup$l(props, ctx) : void 0;
};
const CalendarCellTrigger = Object.assign(_sfc_main$l, { __name: "UiCalendarCellTrigger" });
const _sfc_main$k = /* @__PURE__ */ defineComponent({
  __name: "CalendarGrid",
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
      _push(ssrRenderComponent(unref(CalendarGrid$1), mergeProps({
        "data-slot": "calendar-grid",
        class: unref(cn)("w-full border-collapse space-x-1", props.class)
      }, unref(forwardedProps), _attrs), {
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
const _sfc_setup$k = _sfc_main$k.setup;
_sfc_main$k.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/calendar/CalendarGrid.vue");
  return _sfc_setup$k ? _sfc_setup$k(props, ctx) : void 0;
};
const CalendarGrid = Object.assign(_sfc_main$k, { __name: "UiCalendarGrid" });
const _sfc_main$j = /* @__PURE__ */ defineComponent({
  __name: "CalendarGridBody",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(CalendarGridBody$1), mergeProps({ "data-slot": "calendar-grid-body" }, props, _attrs), {
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
const _sfc_setup$j = _sfc_main$j.setup;
_sfc_main$j.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/calendar/CalendarGridBody.vue");
  return _sfc_setup$j ? _sfc_setup$j(props, ctx) : void 0;
};
const CalendarGridBody = Object.assign(_sfc_main$j, { __name: "UiCalendarGridBody" });
const _sfc_main$i = /* @__PURE__ */ defineComponent({
  __name: "CalendarGridHead",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(CalendarGridHead$1), mergeProps({ "data-slot": "calendar-grid-head" }, props, _attrs), {
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
const _sfc_setup$i = _sfc_main$i.setup;
_sfc_main$i.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/calendar/CalendarGridHead.vue");
  return _sfc_setup$i ? _sfc_setup$i(props, ctx) : void 0;
};
const CalendarGridHead = Object.assign(_sfc_main$i, { __name: "UiCalendarGridHead" });
const _sfc_main$h = /* @__PURE__ */ defineComponent({
  __name: "CalendarGridRow",
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
      _push(ssrRenderComponent(unref(CalendarGridRow$1), mergeProps({
        "data-slot": "calendar-grid-row",
        class: unref(cn)("flex", props.class)
      }, unref(forwardedProps), _attrs), {
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
const _sfc_setup$h = _sfc_main$h.setup;
_sfc_main$h.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/calendar/CalendarGridRow.vue");
  return _sfc_setup$h ? _sfc_setup$h(props, ctx) : void 0;
};
const CalendarGridRow = Object.assign(_sfc_main$h, { __name: "UiCalendarGridRow" });
const _sfc_main$g = /* @__PURE__ */ defineComponent({
  __name: "CalendarHeadCell",
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
      _push(ssrRenderComponent(unref(CalendarHeadCell$1), mergeProps({
        "data-slot": "calendar-head-cell",
        class: unref(cn)("text-muted-foreground rounded-md flex-1 font-normal text-[0.8rem]", props.class)
      }, unref(forwardedProps), _attrs), {
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
const _sfc_setup$g = _sfc_main$g.setup;
_sfc_main$g.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/calendar/CalendarHeadCell.vue");
  return _sfc_setup$g ? _sfc_setup$g(props, ctx) : void 0;
};
const CalendarHeadCell = Object.assign(_sfc_main$g, { __name: "UiCalendarHeadCell" });
const _sfc_main$f = /* @__PURE__ */ defineComponent({
  __name: "CalendarHeader",
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
      _push(ssrRenderComponent(unref(CalendarHeader$1), mergeProps({
        "data-slot": "calendar-header",
        class: unref(cn)("flex justify-center pt-1 relative items-center w-full px-8", props.class)
      }, unref(forwardedProps), _attrs), {
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
const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/calendar/CalendarHeader.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};
const CalendarHeader = Object.assign(_sfc_main$f, { __name: "UiCalendarHeader" });
const _sfc_main$e = /* @__PURE__ */ defineComponent({
  __name: "CalendarHeading",
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
      _push(ssrRenderComponent(unref(CalendarHeading$1), mergeProps({
        "data-slot": "calendar-heading",
        class: unref(cn)("text-sm font-medium", props.class)
      }, unref(forwardedProps), _attrs), {
        default: withCtx(({ headingValue }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", { headingValue }, () => {
              _push2(`${ssrInterpolate(headingValue)}`);
            }, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default", { headingValue }, () => [
                createTextVNode(toDisplayString(headingValue), 1)
              ])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/calendar/CalendarHeading.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const CalendarHeading = Object.assign(_sfc_main$e, { __name: "UiCalendarHeading" });
const _sfc_main$d = /* @__PURE__ */ defineComponent({
  __name: "CalendarNextButton",
  __ssrInlineRender: true,
  props: {
    nextPage: { type: Function },
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class");
    const forwardedProps = useForwardProps(delegatedProps);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(CalendarNext), mergeProps({
        "data-slot": "calendar-next-button",
        class: unref(cn)(
          unref(buttonVariants)({ variant: "outline" }),
          "size-7 bg-transparent p-0 opacity-50 hover:opacity-100",
          props.class
        )
      }, unref(forwardedProps), _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, () => {
              _push2(ssrRenderComponent(unref(ChevronRight), { class: "size-4" }, null, _parent2, _scopeId));
            }, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default", {}, () => [
                createVNode(unref(ChevronRight), { class: "size-4" })
              ])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/calendar/CalendarNextButton.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const CalendarNextButton = Object.assign(_sfc_main$d, { __name: "UiCalendarNextButton" });
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "CalendarPrevButton",
  __ssrInlineRender: true,
  props: {
    prevPage: { type: Function },
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class");
    const forwardedProps = useForwardProps(delegatedProps);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(CalendarPrev), mergeProps({
        "data-slot": "calendar-prev-button",
        class: unref(cn)(
          unref(buttonVariants)({ variant: "outline" }),
          "size-7 bg-transparent p-0 opacity-50 hover:opacity-100",
          props.class
        )
      }, unref(forwardedProps), _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, () => {
              _push2(ssrRenderComponent(unref(ChevronLeft), { class: "size-4" }, null, _parent2, _scopeId));
            }, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default", {}, () => [
                createVNode(unref(ChevronLeft), { class: "size-4" })
              ])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/calendar/CalendarPrevButton.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const CalendarPrevButton = Object.assign(_sfc_main$c, { __name: "UiCalendarPrevButton" });
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "Calendar",
  __ssrInlineRender: true,
  props: {
    defaultValue: {},
    defaultPlaceholder: {},
    placeholder: {},
    pagedNavigation: { type: Boolean },
    preventDeselect: { type: Boolean },
    weekStartsOn: {},
    weekdayFormat: {},
    calendarLabel: {},
    fixedWeeks: { type: Boolean },
    maxValue: {},
    minValue: {},
    locale: {},
    numberOfMonths: {},
    disabled: { type: Boolean },
    readonly: { type: Boolean },
    initialFocus: { type: Boolean },
    isDateDisabled: {},
    isDateUnavailable: {},
    dir: {},
    nextPage: {},
    prevPage: {},
    modelValue: { default: void 0 },
    multiple: { type: Boolean },
    disableDaysOutsideCurrentView: { type: Boolean },
    asChild: { type: Boolean },
    as: {},
    class: {},
    layout: { default: void 0 },
    yearRange: {}
  },
  emits: ["update:modelValue", "update:placeholder"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const delegatedProps = reactiveOmit(props, "class", "layout", "placeholder");
    const placeholder = useVModel(props, "placeholder", emits, {
      passive: true,
      defaultValue: props.defaultPlaceholder ?? today(getLocalTimeZone())
    });
    const formatter = useDateFormatter(props.locale ?? "en");
    const yearRange = computed(() => {
      return props.yearRange ?? createYearRange({
        start: props?.minValue ?? (toRaw(props.placeholder) ?? props.defaultPlaceholder ?? today(getLocalTimeZone())).cycle("year", -100),
        end: props?.maxValue ?? (toRaw(props.placeholder) ?? props.defaultPlaceholder ?? today(getLocalTimeZone())).cycle("year", 10)
      });
    });
    const [DefineMonthTemplate, ReuseMonthTemplate] = createReusableTemplate();
    const [DefineYearTemplate, ReuseYearTemplate] = createReusableTemplate();
    const forwarded = useForwardPropsEmits(delegatedProps, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(DefineMonthTemplate), null, {
        default: withCtx(({ date }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="**:data-[slot=native-select-icon]:right-1"${_scopeId}><div class="relative"${_scopeId}><div class="absolute inset-0 flex h-full items-center text-sm pl-2 pointer-events-none"${_scopeId}>${ssrInterpolate(unref(formatter).custom(unref(toDate)(date), { month: "short" }))}</div>`);
            _push2(ssrRenderComponent(unref(NativeSelect), {
              class: "text-xs h-8 pr-6 pl-2 text-transparent relative",
              onChange: (e) => {
                placeholder.value = unref(placeholder).set({
                  month: Number(e?.target?.value)
                });
              }
            }, {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(unref(createYear)({ dateObj: date }), (month) => {
                    _push3(ssrRenderComponent(unref(NativeSelectOption), {
                      key: month.toString(),
                      value: month.month,
                      selected: date.month === month.month
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(unref(formatter).custom(unref(toDate)(month), { month: "short" }))}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(unref(formatter).custom(unref(toDate)(month), { month: "short" })), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(createYear)({ dateObj: date }), (month) => {
                      return openBlock(), createBlock(unref(NativeSelectOption), {
                        key: month.toString(),
                        value: month.month,
                        selected: date.month === month.month
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(formatter).custom(unref(toDate)(month), { month: "short" })), 1)
                        ]),
                        _: 2
                      }, 1032, ["value", "selected"]);
                    }), 128))
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "**:data-[slot=native-select-icon]:right-1" }, [
                createVNode("div", { class: "relative" }, [
                  createVNode("div", { class: "absolute inset-0 flex h-full items-center text-sm pl-2 pointer-events-none" }, toDisplayString(unref(formatter).custom(unref(toDate)(date), { month: "short" })), 1),
                  createVNode(unref(NativeSelect), {
                    class: "text-xs h-8 pr-6 pl-2 text-transparent relative",
                    onChange: (e) => {
                      placeholder.value = unref(placeholder).set({
                        month: Number(e?.target?.value)
                      });
                    }
                  }, {
                    default: withCtx(() => [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(createYear)({ dateObj: date }), (month) => {
                        return openBlock(), createBlock(unref(NativeSelectOption), {
                          key: month.toString(),
                          value: month.month,
                          selected: date.month === month.month
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(unref(formatter).custom(unref(toDate)(month), { month: "short" })), 1)
                          ]),
                          _: 2
                        }, 1032, ["value", "selected"]);
                      }), 128))
                    ]),
                    _: 2
                  }, 1032, ["onChange"])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(DefineYearTemplate), null, {
        default: withCtx(({ date }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="**:data-[slot=native-select-icon]:right-1"${_scopeId}><div class="relative"${_scopeId}><div class="absolute inset-0 flex h-full items-center text-sm pl-2 pointer-events-none"${_scopeId}>${ssrInterpolate(unref(formatter).custom(unref(toDate)(date), { year: "numeric" }))}</div>`);
            _push2(ssrRenderComponent(unref(NativeSelect), {
              class: "text-xs h-8 pr-6 pl-2 text-transparent relative",
              onChange: (e) => {
                placeholder.value = unref(placeholder).set({
                  year: Number(e?.target?.value)
                });
              }
            }, {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(yearRange.value, (year) => {
                    _push3(ssrRenderComponent(unref(NativeSelectOption), {
                      key: year.toString(),
                      value: year.year,
                      selected: date.year === year.year
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(unref(formatter).custom(unref(toDate)(year), { year: "numeric" }))}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(unref(formatter).custom(unref(toDate)(year), { year: "numeric" })), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(yearRange.value, (year) => {
                      return openBlock(), createBlock(unref(NativeSelectOption), {
                        key: year.toString(),
                        value: year.year,
                        selected: date.year === year.year
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(formatter).custom(unref(toDate)(year), { year: "numeric" })), 1)
                        ]),
                        _: 2
                      }, 1032, ["value", "selected"]);
                    }), 128))
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "**:data-[slot=native-select-icon]:right-1" }, [
                createVNode("div", { class: "relative" }, [
                  createVNode("div", { class: "absolute inset-0 flex h-full items-center text-sm pl-2 pointer-events-none" }, toDisplayString(unref(formatter).custom(unref(toDate)(date), { year: "numeric" })), 1),
                  createVNode(unref(NativeSelect), {
                    class: "text-xs h-8 pr-6 pl-2 text-transparent relative",
                    onChange: (e) => {
                      placeholder.value = unref(placeholder).set({
                        year: Number(e?.target?.value)
                      });
                    }
                  }, {
                    default: withCtx(() => [
                      (openBlock(true), createBlock(Fragment, null, renderList(yearRange.value, (year) => {
                        return openBlock(), createBlock(unref(NativeSelectOption), {
                          key: year.toString(),
                          value: year.year,
                          selected: date.year === year.year
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(unref(formatter).custom(unref(toDate)(year), { year: "numeric" })), 1)
                          ]),
                          _: 2
                        }, 1032, ["value", "selected"]);
                      }), 128))
                    ]),
                    _: 2
                  }, 1032, ["onChange"])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(CalendarRoot), mergeProps(unref(forwarded), {
        placeholder: unref(placeholder),
        "onUpdate:placeholder": ($event) => isRef(placeholder) ? placeholder.value = $event : null,
        "data-slot": "calendar",
        class: unref(cn)("p-3", props.class)
      }), {
        default: withCtx(({ grid, weekDays, date }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(CalendarHeader), { class: "pt-0" }, {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<nav class="flex items-center gap-1 absolute top-0 inset-x-0 justify-between"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(CalendarPrevButton), null, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        ssrRenderSlot(_ctx.$slots, "calendar-prev-icon", {}, null, _push4, _parent4, _scopeId3);
                      } else {
                        return [
                          renderSlot(_ctx.$slots, "calendar-prev-icon")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(CalendarNextButton), null, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        ssrRenderSlot(_ctx.$slots, "calendar-next-icon", {}, null, _push4, _parent4, _scopeId3);
                      } else {
                        return [
                          renderSlot(_ctx.$slots, "calendar-next-icon")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(`</nav>`);
                  ssrRenderSlot(_ctx.$slots, "calendar-heading", {
                    date,
                    month: unref(ReuseMonthTemplate),
                    year: unref(ReuseYearTemplate)
                  }, () => {
                    if (__props.layout === "month-and-year") {
                      _push3(`<div class="flex items-center justify-center gap-1"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(ReuseMonthTemplate), { date }, null, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(unref(ReuseYearTemplate), { date }, null, _parent3, _scopeId2));
                      _push3(`</div>`);
                    } else if (__props.layout === "month-only") {
                      _push3(`<div class="flex items-center justify-center gap-1"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(ReuseMonthTemplate), { date }, null, _parent3, _scopeId2));
                      _push3(` ${ssrInterpolate(unref(formatter).custom(unref(toDate)(date), { year: "numeric" }))}</div>`);
                    } else if (__props.layout === "year-only") {
                      _push3(`<div class="flex items-center justify-center gap-1"${_scopeId2}>${ssrInterpolate(unref(formatter).custom(unref(toDate)(date), { month: "short" }))} `);
                      _push3(ssrRenderComponent(unref(ReuseYearTemplate), { date }, null, _parent3, _scopeId2));
                      _push3(`</div>`);
                    } else {
                      _push3(ssrRenderComponent(unref(CalendarHeading), null, null, _parent3, _scopeId2));
                    }
                  }, _push3, _parent3, _scopeId2);
                } else {
                  return [
                    createVNode("nav", { class: "flex items-center gap-1 absolute top-0 inset-x-0 justify-between" }, [
                      createVNode(unref(CalendarPrevButton), null, {
                        default: withCtx(() => [
                          renderSlot(_ctx.$slots, "calendar-prev-icon")
                        ]),
                        _: 3
                      }),
                      createVNode(unref(CalendarNextButton), null, {
                        default: withCtx(() => [
                          renderSlot(_ctx.$slots, "calendar-next-icon")
                        ]),
                        _: 3
                      })
                    ]),
                    renderSlot(_ctx.$slots, "calendar-heading", {
                      date,
                      month: unref(ReuseMonthTemplate),
                      year: unref(ReuseYearTemplate)
                    }, () => [
                      __props.layout === "month-and-year" ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "flex items-center justify-center gap-1"
                      }, [
                        createVNode(unref(ReuseMonthTemplate), { date }, null, 8, ["date"]),
                        createVNode(unref(ReuseYearTemplate), { date }, null, 8, ["date"])
                      ])) : __props.layout === "month-only" ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "flex items-center justify-center gap-1"
                      }, [
                        createVNode(unref(ReuseMonthTemplate), { date }, null, 8, ["date"]),
                        createTextVNode(" " + toDisplayString(unref(formatter).custom(unref(toDate)(date), { year: "numeric" })), 1)
                      ])) : __props.layout === "year-only" ? (openBlock(), createBlock("div", {
                        key: 2,
                        class: "flex items-center justify-center gap-1"
                      }, [
                        createTextVNode(toDisplayString(unref(formatter).custom(unref(toDate)(date), { month: "short" })) + " ", 1),
                        createVNode(unref(ReuseYearTemplate), { date }, null, 8, ["date"])
                      ])) : (openBlock(), createBlock(unref(CalendarHeading), { key: 3 }))
                    ])
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(`<div class="flex flex-col gap-y-4 mt-4 sm:flex-row sm:gap-x-4 sm:gap-y-0"${_scopeId}><!--[-->`);
            ssrRenderList(grid, (month) => {
              _push2(ssrRenderComponent(unref(CalendarGrid), {
                key: month.value.toString()
              }, {
                default: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(CalendarGridHead), null, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(CalendarGridRow), null, {
                            default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<!--[-->`);
                                ssrRenderList(weekDays, (day) => {
                                  _push5(ssrRenderComponent(unref(CalendarHeadCell), { key: day }, {
                                    default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(day)}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(day), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                });
                                _push5(`<!--]-->`);
                              } else {
                                return [
                                  (openBlock(true), createBlock(Fragment, null, renderList(weekDays, (day) => {
                                    return openBlock(), createBlock(unref(CalendarHeadCell), { key: day }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(day), 1)
                                      ]),
                                      _: 2
                                    }, 1024);
                                  }), 128))
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(CalendarGridRow), null, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(weekDays, (day) => {
                                  return openBlock(), createBlock(unref(CalendarHeadCell), { key: day }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(day), 1)
                                    ]),
                                    _: 2
                                  }, 1024);
                                }), 128))
                              ]),
                              _: 2
                            }, 1024)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(CalendarGridBody), null, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<!--[-->`);
                          ssrRenderList(month.rows, (weekDates, index) => {
                            _push4(ssrRenderComponent(unref(CalendarGridRow), {
                              key: `weekDate-${index}`,
                              class: "mt-2 w-full"
                            }, {
                              default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`<!--[-->`);
                                  ssrRenderList(weekDates, (weekDate) => {
                                    _push5(ssrRenderComponent(unref(CalendarCell), {
                                      key: weekDate.toString(),
                                      date: weekDate
                                    }, {
                                      default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                        if (_push6) {
                                          _push6(ssrRenderComponent(unref(CalendarCellTrigger), {
                                            day: weekDate,
                                            month: month.value
                                          }, null, _parent6, _scopeId5));
                                        } else {
                                          return [
                                            createVNode(unref(CalendarCellTrigger), {
                                              day: weekDate,
                                              month: month.value
                                            }, null, 8, ["day", "month"])
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent5, _scopeId4));
                                  });
                                  _push5(`<!--]-->`);
                                } else {
                                  return [
                                    (openBlock(true), createBlock(Fragment, null, renderList(weekDates, (weekDate) => {
                                      return openBlock(), createBlock(unref(CalendarCell), {
                                        key: weekDate.toString(),
                                        date: weekDate
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(unref(CalendarCellTrigger), {
                                            day: weekDate,
                                            month: month.value
                                          }, null, 8, ["day", "month"])
                                        ]),
                                        _: 2
                                      }, 1032, ["date"]);
                                    }), 128))
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          });
                          _push4(`<!--]-->`);
                        } else {
                          return [
                            (openBlock(true), createBlock(Fragment, null, renderList(month.rows, (weekDates, index) => {
                              return openBlock(), createBlock(unref(CalendarGridRow), {
                                key: `weekDate-${index}`,
                                class: "mt-2 w-full"
                              }, {
                                default: withCtx(() => [
                                  (openBlock(true), createBlock(Fragment, null, renderList(weekDates, (weekDate) => {
                                    return openBlock(), createBlock(unref(CalendarCell), {
                                      key: weekDate.toString(),
                                      date: weekDate
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(CalendarCellTrigger), {
                                          day: weekDate,
                                          month: month.value
                                        }, null, 8, ["day", "month"])
                                      ]),
                                      _: 2
                                    }, 1032, ["date"]);
                                  }), 128))
                                ]),
                                _: 2
                              }, 1024);
                            }), 128))
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(CalendarGridHead), null, {
                        default: withCtx(() => [
                          createVNode(unref(CalendarGridRow), null, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(weekDays, (day) => {
                                return openBlock(), createBlock(unref(CalendarHeadCell), { key: day }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(day), 1)
                                  ]),
                                  _: 2
                                }, 1024);
                              }), 128))
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1024),
                      createVNode(unref(CalendarGridBody), null, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(month.rows, (weekDates, index) => {
                            return openBlock(), createBlock(unref(CalendarGridRow), {
                              key: `weekDate-${index}`,
                              class: "mt-2 w-full"
                            }, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(weekDates, (weekDate) => {
                                  return openBlock(), createBlock(unref(CalendarCell), {
                                    key: weekDate.toString(),
                                    date: weekDate
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(CalendarCellTrigger), {
                                        day: weekDate,
                                        month: month.value
                                      }, null, 8, ["day", "month"])
                                    ]),
                                    _: 2
                                  }, 1032, ["date"]);
                                }), 128))
                              ]),
                              _: 2
                            }, 1024);
                          }), 128))
                        ]),
                        _: 2
                      }, 1024)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode(unref(CalendarHeader), { class: "pt-0" }, {
                default: withCtx(() => [
                  createVNode("nav", { class: "flex items-center gap-1 absolute top-0 inset-x-0 justify-between" }, [
                    createVNode(unref(CalendarPrevButton), null, {
                      default: withCtx(() => [
                        renderSlot(_ctx.$slots, "calendar-prev-icon")
                      ]),
                      _: 3
                    }),
                    createVNode(unref(CalendarNextButton), null, {
                      default: withCtx(() => [
                        renderSlot(_ctx.$slots, "calendar-next-icon")
                      ]),
                      _: 3
                    })
                  ]),
                  renderSlot(_ctx.$slots, "calendar-heading", {
                    date,
                    month: unref(ReuseMonthTemplate),
                    year: unref(ReuseYearTemplate)
                  }, () => [
                    __props.layout === "month-and-year" ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "flex items-center justify-center gap-1"
                    }, [
                      createVNode(unref(ReuseMonthTemplate), { date }, null, 8, ["date"]),
                      createVNode(unref(ReuseYearTemplate), { date }, null, 8, ["date"])
                    ])) : __props.layout === "month-only" ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "flex items-center justify-center gap-1"
                    }, [
                      createVNode(unref(ReuseMonthTemplate), { date }, null, 8, ["date"]),
                      createTextVNode(" " + toDisplayString(unref(formatter).custom(unref(toDate)(date), { year: "numeric" })), 1)
                    ])) : __props.layout === "year-only" ? (openBlock(), createBlock("div", {
                      key: 2,
                      class: "flex items-center justify-center gap-1"
                    }, [
                      createTextVNode(toDisplayString(unref(formatter).custom(unref(toDate)(date), { month: "short" })) + " ", 1),
                      createVNode(unref(ReuseYearTemplate), { date }, null, 8, ["date"])
                    ])) : (openBlock(), createBlock(unref(CalendarHeading), { key: 3 }))
                  ])
                ]),
                _: 2
              }, 1024),
              createVNode("div", { class: "flex flex-col gap-y-4 mt-4 sm:flex-row sm:gap-x-4 sm:gap-y-0" }, [
                (openBlock(true), createBlock(Fragment, null, renderList(grid, (month) => {
                  return openBlock(), createBlock(unref(CalendarGrid), {
                    key: month.value.toString()
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(CalendarGridHead), null, {
                        default: withCtx(() => [
                          createVNode(unref(CalendarGridRow), null, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(weekDays, (day) => {
                                return openBlock(), createBlock(unref(CalendarHeadCell), { key: day }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(day), 1)
                                  ]),
                                  _: 2
                                }, 1024);
                              }), 128))
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1024),
                      createVNode(unref(CalendarGridBody), null, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(month.rows, (weekDates, index) => {
                            return openBlock(), createBlock(unref(CalendarGridRow), {
                              key: `weekDate-${index}`,
                              class: "mt-2 w-full"
                            }, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(weekDates, (weekDate) => {
                                  return openBlock(), createBlock(unref(CalendarCell), {
                                    key: weekDate.toString(),
                                    date: weekDate
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(CalendarCellTrigger), {
                                        day: weekDate,
                                        month: month.value
                                      }, null, 8, ["day", "month"])
                                    ]),
                                    _: 2
                                  }, 1032, ["date"]);
                                }), 128))
                              ]),
                              _: 2
                            }, 1024);
                          }), 128))
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    _: 2
                  }, 1024);
                }), 128))
              ])
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/calendar/Calendar.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const __nuxt_component_4$1 = Object.assign(_sfc_main$b, { __name: "UiCalendar" });
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "DatePicker",
  __ssrInlineRender: true,
  props: {
    modelValue: {},
    placeholder: { default: "Pick a date" },
    disabled: { type: Boolean, default: false }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const value = computed({
      get: () => props.modelValue,
      set: (val) => emit("update:modelValue", val)
    });
    const df = new DateFormatter("ru-RU", {
      dateStyle: "short"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ui_popover = __nuxt_component_0;
      const _component_ui_popover_trigger = __nuxt_component_1;
      const _component_ui_button = __nuxt_component_3$3;
      const _component_ui_popover_content = __nuxt_component_3$1;
      const _component_ui_calendar = __nuxt_component_4$1;
      _push(ssrRenderComponent(_component_ui_popover, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_ui_popover_trigger, { "as-child": "" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_ui_button, {
                    variant: "outline",
                    disabled: __props.disabled,
                    class: unref(cn)(
                      "justify-start text-left font-normal",
                      !unref(value) && "text-muted-foreground"
                    )
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Calendar), { class: "mr-2 h-4 w-4" }, null, _parent4, _scopeId3));
                        _push4(` ${ssrInterpolate(unref(value) ? unref(df).format(unref(value).toDate(unref(getLocalTimeZone)())) : __props.placeholder)}`);
                      } else {
                        return [
                          createVNode(unref(Calendar), { class: "mr-2 h-4 w-4" }),
                          createTextVNode(" " + toDisplayString(unref(value) ? unref(df).format(unref(value).toDate(unref(getLocalTimeZone)())) : __props.placeholder), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_ui_button, {
                      variant: "outline",
                      disabled: __props.disabled,
                      class: unref(cn)(
                        "justify-start text-left font-normal",
                        !unref(value) && "text-muted-foreground"
                      )
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Calendar), { class: "mr-2 h-4 w-4" }),
                        createTextVNode(" " + toDisplayString(unref(value) ? unref(df).format(unref(value).toDate(unref(getLocalTimeZone)())) : __props.placeholder), 1)
                      ]),
                      _: 1
                    }, 8, ["disabled", "class"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_ui_popover_content, { class: "w-auto p-0" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_ui_calendar, {
                    modelValue: unref(value),
                    "onUpdate:modelValue": ($event) => isRef(value) ? value.value = $event : null,
                    "initial-focus": ""
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_ui_calendar, {
                      modelValue: unref(value),
                      "onUpdate:modelValue": ($event) => isRef(value) ? value.value = $event : null,
                      "initial-focus": ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_ui_popover_trigger, { "as-child": "" }, {
                default: withCtx(() => [
                  createVNode(_component_ui_button, {
                    variant: "outline",
                    disabled: __props.disabled,
                    class: unref(cn)(
                      "justify-start text-left font-normal",
                      !unref(value) && "text-muted-foreground"
                    )
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Calendar), { class: "mr-2 h-4 w-4" }),
                      createTextVNode(" " + toDisplayString(unref(value) ? unref(df).format(unref(value).toDate(unref(getLocalTimeZone)())) : __props.placeholder), 1)
                    ]),
                    _: 1
                  }, 8, ["disabled", "class"])
                ]),
                _: 1
              }),
              createVNode(_component_ui_popover_content, { class: "w-auto p-0" }, {
                default: withCtx(() => [
                  createVNode(_component_ui_calendar, {
                    modelValue: unref(value),
                    "onUpdate:modelValue": ($event) => isRef(value) ? value.value = $event : null,
                    "initial-focus": ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/date-picker/DatePicker.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const __nuxt_component_2$1 = Object.assign(_sfc_main$a, { __name: "UiDatePicker" });
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "DatePicker",
  __ssrInlineRender: true,
  props: {
    name: {},
    label: {},
    placeholder: {},
    errorsToShow: { default: "first" }
  },
  setup(__props) {
    const props = __props;
    function getErrors(errors) {
      if (!errors.length) return [];
      return props.errorsToShow === "first" ? [errors[0] || ""] : errors;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ui_field = __nuxt_component_9$1;
      const _component_ui_field_label = __nuxt_component_10;
      const _component_ui_date_picker = __nuxt_component_2$1;
      const _component_ui_field_error = __nuxt_component_12$1;
      _push(ssrRenderComponent(unref(Field), mergeProps({ name: __props.name }, _attrs), {
        default: withCtx(({ field, errors, setValue }, _push2, _parent2, _scopeId) => {
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
                  _push3(ssrRenderComponent(_component_ui_date_picker, {
                    id: __props.name,
                    "model-value": field.value,
                    placeholder: __props.placeholder,
                    "onUpdate:modelValue": setValue
                  }, null, _parent3, _scopeId2));
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
                    createVNode(_component_ui_date_picker, {
                      id: __props.name,
                      "model-value": field.value,
                      placeholder: __props.placeholder,
                      "onUpdate:modelValue": setValue
                    }, null, 8, ["id", "model-value", "placeholder", "onUpdate:modelValue"]),
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
                  createVNode(_component_ui_date_picker, {
                    id: __props.name,
                    "model-value": field.value,
                    placeholder: __props.placeholder,
                    "onUpdate:modelValue": setValue
                  }, null, 8, ["id", "model-value", "placeholder", "onUpdate:modelValue"]),
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
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/base/DatePicker.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const __nuxt_component_9 = Object.assign(_sfc_main$9, { __name: "BaseDatePicker" });
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "Profile",
  __ssrInlineRender: true,
  props: {
    activeTab: {}
  },
  setup(__props) {
    const props = __props;
    const gender = [
      { value: "none", label: "Не указан" },
      { value: "men", label: "Мужской" },
      { value: "women", label: "Женский" }
    ];
    const supabase = useSupabaseClient();
    const currentUserStore = useCurrentUserStore();
    const currentUser = computed(() => currentUserStore.getUser());
    ref(null);
    const coverInput = ref(null);
    const isDataloading = ref(false);
    const isAvatarUploading = ref(false);
    const isCoverUploading = ref(false);
    const isUpdateProcessing = ref(false);
    const updateErrorMessage = ref(null);
    const birthDate = ref(
      currentUser.value.birth_date ? parseDate(currentUser.value.birth_date) : null
    );
    const { handleSubmit, setValues } = useForm({
      validationSchema: toTypedSchema(userUpdateSchema),
      keepValuesOnUnmount: true,
      initialValues: {
        email: currentUser.value.email,
        first_name: currentUser.value.first_name,
        last_name: currentUser.value.last_name,
        phone: currentUser.value.phone,
        city: currentUser.value.city,
        gender: currentUser.value.gender || "none"
      }
    });
    const refreshFormData = () => {
      isDataloading.value = true;
      const user = currentUserStore.getUser();
      if (!user) return;
      setValues({
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        phone: user.phone,
        city: user.city,
        gender: user.gender || "none"
      });
      birthDate.value = user.birth_date ? parseDate(user.birth_date) : null;
      isDataloading.value = false;
    };
    watch(() => props.activeTab, (newTab) => {
      if (newTab === "profile") {
        refreshFormData();
      }
    });
    const handleCoverButtonClick = () => coverInput.value?.click();
    handleSubmit(async (values) => {
      try {
        updateErrorMessage.value = null;
        isUpdateProcessing.value = true;
        const payload = {
          ...values,
          birth_date: birthDate.value?.toString() ?? null
        };
        const { error } = await supabase.from("users").update(payload).eq("id", currentUser.value.id);
        if (error) throw error;
        currentUserStore.updateUser(payload);
        toast.success("Данные успешно обновлены");
      } catch (error) {
        updateErrorMessage.value = "Ошибка при обновлении данных";
        console.error("Ошибка обновления данных:", error);
      } finally {
        isUpdateProcessing.value = false;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ui_button = __nuxt_component_3$3;
      const _component_ui_spinner = __nuxt_component_13;
      const _component_ui_avatar = __nuxt_component_2$3;
      const _component_ui_avatar_image = __nuxt_component_3$4;
      const _component_ui_avatar_fallback = __nuxt_component_4$3;
      const _component_ui_field_group = __nuxt_component_7;
      const _component_ui_alert = __nuxt_component_3$5;
      const _component_ui_alert_title = __nuxt_component_4$4;
      const _component_base_input = __nuxt_component_6$2;
      const _component_base_date_picker = __nuxt_component_9;
      const _component_base_select = __nuxt_component_8$1;
      const _component_ui_field = __nuxt_component_9$1;
      const _component_base_processing_button = __nuxt_component_16;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="relative mb-12"><div class="${ssrRenderClass([{ "opacity-50": unref(isCoverUploading) }, "relative h-36 w-full overflow-hidden rounded-lg bg-muted transition-all"])}">`);
      if (unref(currentUser)?.cover_url) {
        _push(`<img${ssrRenderAttr("src", unref(currentUser).cover_url)} class="h-full w-full object-cover">`);
      } else {
        _push(`<div class="h-full w-full bg-gradient-to-r from-blue-500 to-purple-600"></div>`);
      }
      _push(`<div class="absolute right-4 top-4 z-10">`);
      _push(ssrRenderComponent(_component_ui_button, {
        variant: "secondary",
        size: "sm",
        class: "backdrop-blur-sm",
        disabled: unref(isCoverUploading),
        onClick: handleCoverButtonClick
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(isCoverUploading)) {
              _push2(ssrRenderComponent(_component_ui_spinner, {
                size: "sm",
                class: "mr-2"
              }, null, _parent2, _scopeId));
            } else {
              _push2(ssrRenderComponent(unref(Camera), { class: "mr-2 h-4 w-4" }, null, _parent2, _scopeId));
            }
            _push2(` ${ssrInterpolate(unref(isCoverUploading) ? "Загрузка..." : "Изменить обложку")}`);
          } else {
            return [
              unref(isCoverUploading) ? (openBlock(), createBlock(_component_ui_spinner, {
                key: 0,
                size: "sm",
                class: "mr-2"
              })) : (openBlock(), createBlock(unref(Camera), {
                key: 1,
                class: "mr-2 h-4 w-4"
              })),
              createTextVNode(" " + toDisplayString(unref(isCoverUploading) ? "Загрузка..." : "Изменить обложку"), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><input type="file" accept="image/*" class="hidden"></div><div class="absolute -bottom-10 left-1/2 z-20 -translate-x-1/2 transform"><div class="relative cursor-pointer group">`);
      _push(ssrRenderComponent(_component_ui_avatar, { class: "h-32 w-32 rounded-full backdrop-blur-sm transition-opacity group-hover:opacity-80" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_ui_avatar_image, {
              src: unref(currentUser).avatar_url || "",
              alt: unref(currentUser).first_name
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_ui_avatar_fallback, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(currentUser).first_name.charAt(0) + unref(currentUser).last_name.charAt(0))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(currentUser).first_name.charAt(0) + unref(currentUser).last_name.charAt(0)), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_ui_avatar_image, {
                src: unref(currentUser).avatar_url || "",
                alt: unref(currentUser).first_name
              }, null, 8, ["src", "alt"]),
              createVNode(_component_ui_avatar_fallback, null, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(currentUser).first_name.charAt(0) + unref(currentUser).last_name.charAt(0)), 1)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(isAvatarUploading)) {
        _push(`<div class="absolute inset-0 z-30 flex items-center justify-center bg-black/50 rounded-full">`);
        _push(ssrRenderComponent(_component_ui_spinner, { class: "text-white" }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 rounded-full">`);
        _push(ssrRenderComponent(unref(Camera), { class: "text-white" }, null, _parent));
        _push(`</div>`);
      }
      _push(`<input type="file" accept="image/*" class="hidden"></div></div></div><form class="flex flex-col gap-4">`);
      _push(ssrRenderComponent(_component_ui_field_group, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(updateErrorMessage)) {
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
                          _push4(`<p${_scopeId3}>${ssrInterpolate(unref(updateErrorMessage))}</p>`);
                        } else {
                          return [
                            createVNode("p", null, toDisplayString(unref(updateErrorMessage)), 1)
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
                          createVNode("p", null, toDisplayString(unref(updateErrorMessage)), 1)
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
            _push2(`<div class="grid grid-cols-2 gap-2"${_scopeId}>`);
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
              placeholder: "Петров"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="grid grid-cols-2 gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_base_date_picker, {
              name: "birth_date",
              label: "Дата рождения",
              placeholder: "Выберите дату",
              modelValue: unref(birthDate),
              "onUpdate:modelValue": ($event) => isRef(birthDate) ? birthDate.value = $event : null
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_base_select, {
              name: "gender",
              label: "Пол",
              placeholder: "Выберите пол",
              options: gender
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="grid grid-cols-2 gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_base_input, {
              name: "email",
              type: "text",
              label: "Электронная почта",
              placeholder: "email@example.com",
              disabled: true
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_base_input, {
              name: "phone",
              type: "text",
              label: "Номер телефона",
              placeholder: "+375 (11) 222-33-44",
              mask: "+375 (##) ###-##-##"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_component_base_input, {
              name: "city",
              type: "text",
              label: "Город",
              placeholder: "Минск"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_ui_field, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_base_processing_button, {
                    type: "submit",
                    label: "Сохранить",
                    "is-processing": unref(isUpdateProcessing)
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_base_processing_button, {
                      type: "submit",
                      label: "Сохранить",
                      "is-processing": unref(isUpdateProcessing)
                    }, null, 8, ["is-processing"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              unref(updateErrorMessage) ? (openBlock(), createBlock(_component_ui_alert, {
                key: 0,
                variant: "destructive",
                class: "border-destructive"
              }, {
                default: withCtx(() => [
                  createVNode(unref(AlertCircleIcon)),
                  createVNode(_component_ui_alert_title, { class: "font-normal" }, {
                    default: withCtx(() => [
                      createVNode("p", null, toDisplayString(unref(updateErrorMessage)), 1)
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })) : createCommentVNode("", true),
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
                  placeholder: "Петров"
                })
              ]),
              createVNode("div", { class: "grid grid-cols-2 gap-2" }, [
                createVNode(_component_base_date_picker, {
                  name: "birth_date",
                  label: "Дата рождения",
                  placeholder: "Выберите дату",
                  modelValue: unref(birthDate),
                  "onUpdate:modelValue": ($event) => isRef(birthDate) ? birthDate.value = $event : null
                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                createVNode(_component_base_select, {
                  name: "gender",
                  label: "Пол",
                  placeholder: "Выберите пол",
                  options: gender
                })
              ]),
              createVNode("div", { class: "grid grid-cols-2 gap-2" }, [
                createVNode(_component_base_input, {
                  name: "email",
                  type: "text",
                  label: "Электронная почта",
                  placeholder: "email@example.com",
                  disabled: true
                }),
                createVNode(_component_base_input, {
                  name: "phone",
                  type: "text",
                  label: "Номер телефона",
                  placeholder: "+375 (11) 222-33-44",
                  mask: "+375 (##) ###-##-##"
                })
              ]),
              createVNode(_component_base_input, {
                name: "city",
                type: "text",
                label: "Город",
                placeholder: "Минск"
              }),
              createVNode(_component_ui_field, null, {
                default: withCtx(() => [
                  createVNode(_component_base_processing_button, {
                    type: "submit",
                    label: "Сохранить",
                    "is-processing": unref(isUpdateProcessing)
                  }, null, 8, ["is-processing"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</form></div>`);
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/profile/Profile.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const __nuxt_component_5$1 = Object.assign(_sfc_main$8, { __name: "Profile" });
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "TagsInput",
  __ssrInlineRender: true,
  props: {
    modelValue: {},
    defaultValue: {},
    addOnPaste: { type: Boolean },
    addOnTab: { type: Boolean },
    addOnBlur: { type: Boolean },
    duplicate: { type: Boolean },
    disabled: { type: Boolean },
    delimiter: {},
    dir: {},
    max: {},
    id: {},
    convertValue: { type: Function },
    displayValue: { type: Function },
    asChild: { type: Boolean },
    as: {},
    name: {},
    required: { type: Boolean },
    class: {}
  },
  emits: ["update:modelValue", "invalid", "addTag", "removeTag"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const delegatedProps = reactiveOmit(props, "class");
    const forwarded = useForwardPropsEmits(delegatedProps, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(TagsInputRoot), mergeProps(unref(forwarded), {
        class: unref(cn)(
          "flex flex-wrap gap-2 items-center rounded-md border border-input bg-background px-2 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none",
          "focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          props.class
        )
      }, _attrs), {
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
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/tags-input/TagsInput.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const __nuxt_component_2 = Object.assign(_sfc_main$7, { __name: "UiTagsInput" });
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "TagsInputItem",
  __ssrInlineRender: true,
  props: {
    value: {},
    disabled: { type: Boolean },
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class");
    const forwardedProps = useForwardProps(delegatedProps);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(TagsInputItem), mergeProps(unref(forwardedProps), {
        class: unref(cn)("flex h-5 items-center rounded-md bg-secondary data-[state=active]:ring-ring data-[state=active]:ring-2 data-[state=active]:ring-offset-2 ring-offset-background", props.class)
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
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/tags-input/TagsInputItem.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const __nuxt_component_3 = Object.assign(_sfc_main$6, { __name: "UiTagsInputItem" });
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "TagsInputItemText",
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
      _push(ssrRenderComponent(unref(TagsInputItemText), mergeProps(unref(forwardedProps), {
        class: unref(cn)("py-0.5 px-2 text-sm rounded bg-transparent", props.class)
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/tags-input/TagsInputItemText.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_4 = Object.assign(_sfc_main$5, { __name: "UiTagsInputItemText" });
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "TagsInputItemDelete",
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
      _push(ssrRenderComponent(unref(TagsInputItemDelete), mergeProps(unref(forwardedProps), {
        class: unref(cn)("flex rounded bg-transparent mr-1", props.class)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, () => {
              _push2(ssrRenderComponent(unref(X), { class: "w-4 h-4" }, null, _parent2, _scopeId));
            }, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default", {}, () => [
                createVNode(unref(X), { class: "w-4 h-4" })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/tags-input/TagsInputItemDelete.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_5 = Object.assign(_sfc_main$4, { __name: "UiTagsInputItemDelete" });
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "TagsInputInput",
  __ssrInlineRender: true,
  props: {
    placeholder: {},
    autoFocus: { type: Boolean },
    maxLength: {},
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class");
    const forwardedProps = useForwardProps(delegatedProps);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(TagsInputInput), mergeProps(unref(forwardedProps), {
        class: unref(cn)("text-sm min-h-5 focus:outline-none flex-1 bg-transparent px-1", props.class)
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/tags-input/TagsInputInput.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_6$1 = Object.assign(_sfc_main$3, { __name: "UiTagsInputInput" });
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "TagsInput",
  __ssrInlineRender: true,
  props: {
    name: {},
    label: {},
    placeholder: { default: "Введите значение и нажмите Enter" },
    errorsToShow: { default: "first" }
  },
  setup(__props) {
    const props = __props;
    function getErrors(errors) {
      if (!errors.length) return [];
      return props.errorsToShow === "first" ? [errors[0] || ""] : errors;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ui_field = __nuxt_component_9$1;
      const _component_ui_field_label = __nuxt_component_10;
      const _component_ui_tags_input = __nuxt_component_2;
      const _component_ui_tags_input_item = __nuxt_component_3;
      const _component_ui_tags_input_item_text = __nuxt_component_4;
      const _component_ui_tags_input_item_delete = __nuxt_component_5;
      const _component_ui_tags_input_input = __nuxt_component_6$1;
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
                  _push3(ssrRenderComponent(_component_ui_tags_input, {
                    id: __props.name,
                    "model-value": Array.isArray(field.value) ? field.value : field.value ? [field.value] : [],
                    "onUpdate:modelValue": (value) => {
                      setValue(value);
                      setTouched(true);
                    },
                    "aria-invalid": !!errors.length
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(Array.isArray(field.value) ? field.value : [], (tag, index) => {
                          _push4(ssrRenderComponent(_component_ui_tags_input_item, {
                            key: `${tag}-${index}`,
                            value: tag
                          }, {
                            default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_ui_tags_input_item_text, null, {
                                  default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`${ssrInterpolate(tag)}`);
                                    } else {
                                      return [
                                        createTextVNode(toDisplayString(tag), 1)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(_component_ui_tags_input_item_delete, null, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_ui_tags_input_item_text, null, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(tag), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_ui_tags_input_item_delete)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                        _push4(ssrRenderComponent(_component_ui_tags_input_input, { placeholder: __props.placeholder }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          (openBlock(true), createBlock(Fragment, null, renderList(Array.isArray(field.value) ? field.value : [], (tag, index) => {
                            return openBlock(), createBlock(_component_ui_tags_input_item, {
                              key: `${tag}-${index}`,
                              value: tag
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_ui_tags_input_item_text, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(tag), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_ui_tags_input_item_delete)
                              ]),
                              _: 2
                            }, 1032, ["value"]);
                          }), 128)),
                          createVNode(_component_ui_tags_input_input, { placeholder: __props.placeholder }, null, 8, ["placeholder"])
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
                    createVNode(_component_ui_tags_input, {
                      id: __props.name,
                      "model-value": Array.isArray(field.value) ? field.value : field.value ? [field.value] : [],
                      "onUpdate:modelValue": (value) => {
                        setValue(value);
                        setTouched(true);
                      },
                      "aria-invalid": !!errors.length
                    }, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(Array.isArray(field.value) ? field.value : [], (tag, index) => {
                          return openBlock(), createBlock(_component_ui_tags_input_item, {
                            key: `${tag}-${index}`,
                            value: tag
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_ui_tags_input_item_text, null, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(tag), 1)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(_component_ui_tags_input_item_delete)
                            ]),
                            _: 2
                          }, 1032, ["value"]);
                        }), 128)),
                        createVNode(_component_ui_tags_input_input, { placeholder: __props.placeholder }, null, 8, ["placeholder"])
                      ]),
                      _: 2
                    }, 1032, ["id", "model-value", "onUpdate:modelValue", "aria-invalid"]),
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
                  createVNode(_component_ui_tags_input, {
                    id: __props.name,
                    "model-value": Array.isArray(field.value) ? field.value : field.value ? [field.value] : [],
                    "onUpdate:modelValue": (value) => {
                      setValue(value);
                      setTouched(true);
                    },
                    "aria-invalid": !!errors.length
                  }, {
                    default: withCtx(() => [
                      (openBlock(true), createBlock(Fragment, null, renderList(Array.isArray(field.value) ? field.value : [], (tag, index) => {
                        return openBlock(), createBlock(_component_ui_tags_input_item, {
                          key: `${tag}-${index}`,
                          value: tag
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_ui_tags_input_item_text, null, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(tag), 1)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(_component_ui_tags_input_item_delete)
                          ]),
                          _: 2
                        }, 1032, ["value"]);
                      }), 128)),
                      createVNode(_component_ui_tags_input_input, { placeholder: __props.placeholder }, null, 8, ["placeholder"])
                    ]),
                    _: 2
                  }, 1032, ["id", "model-value", "onUpdate:modelValue", "aria-invalid"]),
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
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/base/TagsInput.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_8 = Object.assign(_sfc_main$2, { __name: "BaseTagsInput" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Additionally",
  __ssrInlineRender: true,
  setup(__props) {
    const supabase = useSupabaseClient();
    const currentUserStore = useCurrentUserStore();
    const currentUser = computed(() => currentUserStore.getUser());
    const roles = ref([]);
    const selectedRoleId = ref(null);
    const isFetching = ref(true);
    const isSaving = ref(false);
    const roleData = ref(null);
    const getTableNameByRole = (roleTitle) => {
      const titleLower = roleTitle.toLowerCase();
      if (titleLower.includes("модель") || titleLower.includes("model")) return "models";
      if (titleLower.includes("фотограф") || titleLower.includes("photographer")) return "photographers";
      if (titleLower.includes("парикмахер") || titleLower.includes("hairdresser")) return "hairdressers";
      if (titleLower.includes("стилист") || titleLower.includes("stylist")) return "stylists";
      return null;
    };
    const selectedRole = computed(() => {
      return roles.value.find((role) => role.id === selectedRoleId.value);
    });
    const currentTableName = computed(() => {
      return selectedRole.value ? getTableNameByRole(selectedRole.value.title) : null;
    });
    const { handleSubmit, setValues, resetForm, errors } = useForm({
      validationSchema: computed(() => {
        if (!selectedRole.value) return toTypedSchema(zod.object({}));
        const tableName = getTableNameByRole(selectedRole.value.title);
        return toTypedSchema(tableName ? getRoleProfileSchema(tableName) : zod.object({}));
      })
    });
    async function loadRoleData() {
      if (!selectedRoleId.value || !selectedRole.value) return;
      const tableName = getTableNameByRole(selectedRole.value.title);
      if (!tableName) return;
      try {
        const { data, error } = await supabase.from(tableName).select("*").eq("user_id", currentUser.value.id).maybeSingle();
        if (error) throw error;
        roleData.value = data;
        if (data) {
          const formData = { ...data };
          if (formData.clothing_sizes) {
            formData.clothing_sizes = Array.isArray(formData.clothing_sizes) ? formData.clothing_sizes : typeof formData.clothing_sizes === "string" ? formData.clothing_sizes.split(",").map((s) => s.trim()).filter(Boolean) : [];
          } else {
            formData.clothing_sizes = [];
          }
          if (formData.lenses) {
            formData.lenses = Array.isArray(formData.lenses) ? formData.lenses : typeof formData.lenses === "string" ? formData.lenses.split(",").map((s) => s.trim()).filter(Boolean) : [];
          } else {
            formData.lenses = [];
          }
          if (formData.equipment) {
            formData.equipment = Array.isArray(formData.equipment) ? formData.equipment : typeof formData.equipment === "string" ? formData.equipment.split(",").map((s) => s.trim()).filter(Boolean) : [];
          } else {
            formData.equipment = [];
          }
          if (formData.specialties) {
            formData.specialties = Array.isArray(formData.specialties) ? formData.specialties : typeof formData.specialties === "string" ? formData.specialties.split(",").map((s) => s.trim()).filter(Boolean) : [];
          } else {
            formData.specialties = [];
          }
          if (formData.skills) {
            formData.skills = Array.isArray(formData.skills) ? formData.skills : typeof formData.skills === "string" ? formData.skills.split(",").map((s) => s.trim()).filter(Boolean) : [];
          } else {
            formData.skills = [];
          }
          if (formData.additional_info) {
            formData.additional_info = Array.isArray(formData.additional_info) ? formData.additional_info : typeof formData.additional_info === "string" ? formData.additional_info.split(",").map((s) => s.trim()).filter(Boolean) : [];
          } else {
            formData.additional_info = [];
          }
          setValues(formData);
        } else {
          resetForm();
        }
      } catch (error) {
        console.error("Ошибка загрузки данных роли:", error);
        toast.error("Не удалось загрузить данные роли");
      }
    }
    watch(selectedRoleId, async () => {
      if (selectedRoleId.value) {
        await loadRoleData();
      }
    });
    handleSubmit(
      async (values) => {
        console.log("saveRoleData called with values:", values);
        if (!selectedRoleId.value || !selectedRole.value) {
          console.error("No role selected");
          return;
        }
        const tableName = getTableNameByRole(selectedRole.value.title);
        if (!tableName) {
          console.error("No table name found for role:", selectedRole.value.title);
          return;
        }
        try {
          isSaving.value = true;
          const dataToSave = { ...values };
          if (dataToSave.height !== void 0) dataToSave.height = Number(dataToSave.height);
          if (dataToSave.weight !== void 0) dataToSave.weight = Number(dataToSave.weight);
          if (dataToSave.bust !== void 0) dataToSave.bust = Number(dataToSave.bust);
          if (dataToSave.waist !== void 0) dataToSave.waist = Number(dataToSave.waist);
          if (dataToSave.hips !== void 0) dataToSave.hips = Number(dataToSave.hips);
          if (dataToSave.shoe_size !== void 0) dataToSave.shoe_size = Number(dataToSave.shoe_size);
          if (Array.isArray(dataToSave.clothing_sizes)) {
            const filtered = dataToSave.clothing_sizes.filter(Boolean);
            dataToSave.clothing_sizes = filtered.length > 0 ? filtered.join(",") : null;
          }
          if (Array.isArray(dataToSave.lenses)) {
            const filtered = dataToSave.lenses.filter(Boolean);
            dataToSave.lenses = filtered.length > 0 ? filtered.join(",") : null;
          }
          if (Array.isArray(dataToSave.equipment)) {
            const filtered = dataToSave.equipment.filter(Boolean);
            dataToSave.equipment = filtered.length > 0 ? filtered.join(",") : null;
          }
          if (Array.isArray(dataToSave.specialties)) {
            const filtered = dataToSave.specialties.filter(Boolean);
            dataToSave.specialties = filtered.length > 0 ? filtered.join(",") : null;
          }
          if (Array.isArray(dataToSave.skills)) {
            const filtered = dataToSave.skills.filter(Boolean);
            dataToSave.skills = filtered.length > 0 ? filtered.join(",") : null;
          }
          if (Array.isArray(dataToSave.additional_info)) {
            const filtered = dataToSave.additional_info.filter(Boolean);
            dataToSave.additional_info = filtered.length > 0 ? filtered.join(",") : null;
          }
          console.log("Data to save:", dataToSave);
          if (roleData.value?.id) {
            const { error } = await supabase.from(tableName).update(dataToSave).eq("id", roleData.value.id);
            if (error) throw error;
          } else {
            const { error } = await supabase.from(tableName).insert({
              ...dataToSave,
              user_id: currentUser.value.id
            });
            if (error) throw error;
          }
          toast.success("Данные успешно сохранены");
          await loadRoleData();
        } catch (error) {
          console.error("Ошибка сохранения данных роли:", error);
          toast.error(error.message || "Не удалось сохранить данные");
        } finally {
          isSaving.value = false;
        }
      },
      (errors2) => {
        console.error("Validation errors:", errors2);
        toast.error("Пожалуйста, заполните все обязательные поля");
      }
    );
    const hairLengthOptions = [
      { value: "короткие", label: "Короткие" },
      { value: "средние", label: "Средние" },
      { value: "длинные", label: "Длинные" }
    ];
    const eyeColorOptions = [
      { value: "карие", label: "Карие" },
      { value: "голубые", label: "Голубые" },
      { value: "зеленые", label: "Зеленые" },
      { value: "серые", label: "Серые" },
      { value: "черные", label: "Черные" }
    ];
    const hairColorOptions = [
      { value: "черные", label: "Черные" },
      { value: "каштановые", label: "Каштановые" },
      { value: "русые", label: "Русые" },
      { value: "блонд", label: "Блонд" },
      { value: "рыжие", label: "Рыжие" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ui_spinner = __nuxt_component_13;
      const _component_ui_label = __nuxt_component_1$2;
      const _component_ui_button = __nuxt_component_3$3;
      const _component_ui_alert = __nuxt_component_3$5;
      const _component_ui_alert_title = __nuxt_component_4$4;
      const _component_ui_field_group = __nuxt_component_7;
      const _component_base_input = __nuxt_component_6$2;
      const _component_base_select = __nuxt_component_8$1;
      const _component_base_tags_input = __nuxt_component_8;
      const _component_ui_field = __nuxt_component_9$1;
      const _component_ui_field_label = __nuxt_component_10;
      const _component_ui_select = __nuxt_component_11;
      const _component_ui_select_trigger = __nuxt_component_12;
      const _component_ui_select_value = __nuxt_component_13$1;
      const _component_ui_select_content = __nuxt_component_14;
      const _component_ui_select_item = __nuxt_component_15;
      const _component_base_processing_button = __nuxt_component_16;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}>`);
      if (unref(isFetching)) {
        _push(`<div class="flex justify-center py-8">`);
        _push(ssrRenderComponent(_component_ui_spinner, null, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<div class="space-y-6"><div class="space-y-3">`);
        _push(ssrRenderComponent(_component_ui_label, { class: "text-sm font-medium" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Выберите роль`);
            } else {
              return [
                createTextVNode("Выберите роль")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div class="flex flex-wrap gap-2"><!--[-->`);
        ssrRenderList(unref(roles), (role) => {
          _push(ssrRenderComponent(_component_ui_button, {
            key: role.id,
            variant: unref(selectedRoleId) === role.id ? "default" : "outline",
            onClick: ($event) => selectedRoleId.value = role.id,
            class: "flex-1 min-w-[120px]"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(role.title)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(role.title), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div></div>`);
        if (unref(selectedRole) && unref(currentTableName)) {
          _push(`<form class="space-y-4"><div class="border-t pt-4">`);
          if (Object.keys(unref(errors)).length > 0) {
            _push(ssrRenderComponent(_component_ui_alert, {
              variant: "destructive",
              class: "mb-4"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(ssrRenderComponent(unref(AlertCircleIcon), null, null, _parent2, _scopeId));
                  _push2(ssrRenderComponent(_component_ui_alert_title, { class: "font-normal" }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`<p${_scopeId2}>Пожалуйста, исправьте ошибки в форме</p>`);
                      } else {
                        return [
                          createVNode("p", null, "Пожалуйста, исправьте ошибки в форме")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent2, _scopeId));
                } else {
                  return [
                    createVNode(unref(AlertCircleIcon)),
                    createVNode(_component_ui_alert_title, { class: "font-normal" }, {
                      default: withCtx(() => [
                        createVNode("p", null, "Пожалуйста, исправьте ошибки в форме")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(ssrRenderComponent(_component_ui_field_group, null, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                if (unref(currentTableName) === "models") {
                  _push2(`<!--[--><div class="grid grid-cols-2 gap-4"${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_base_input, {
                    name: "height",
                    type: "number",
                    label: "Рост (см)",
                    placeholder: "170"
                  }, null, _parent2, _scopeId));
                  _push2(ssrRenderComponent(_component_base_input, {
                    name: "weight",
                    type: "number",
                    label: "Вес (кг)",
                    placeholder: "60"
                  }, null, _parent2, _scopeId));
                  _push2(ssrRenderComponent(_component_base_input, {
                    name: "bust",
                    type: "number",
                    label: "Обхват груди (см)",
                    placeholder: "90"
                  }, null, _parent2, _scopeId));
                  _push2(ssrRenderComponent(_component_base_input, {
                    name: "waist",
                    type: "number",
                    label: "Обхват талии (см)",
                    placeholder: "70"
                  }, null, _parent2, _scopeId));
                  _push2(ssrRenderComponent(_component_base_input, {
                    name: "hips",
                    type: "number",
                    label: "Обхват бедер (см)",
                    placeholder: "95"
                  }, null, _parent2, _scopeId));
                  _push2(ssrRenderComponent(_component_base_input, {
                    name: "shoe_size",
                    type: "number",
                    label: "Размер обуви",
                    placeholder: "38"
                  }, null, _parent2, _scopeId));
                  _push2(`</div>`);
                  _push2(ssrRenderComponent(_component_base_select, {
                    name: "eye_color",
                    label: "Цвет глаз",
                    placeholder: "Выберите цвет глаз",
                    options: eyeColorOptions
                  }, null, _parent2, _scopeId));
                  _push2(ssrRenderComponent(_component_base_select, {
                    name: "hair_color",
                    label: "Цвет волос",
                    placeholder: "Выберите цвет волос",
                    options: hairColorOptions
                  }, null, _parent2, _scopeId));
                  _push2(ssrRenderComponent(_component_base_select, {
                    name: "hair_length",
                    label: "Длина волос",
                    placeholder: "Выберите длину волос",
                    options: hairLengthOptions
                  }, null, _parent2, _scopeId));
                  _push2(ssrRenderComponent(_component_base_tags_input, {
                    name: "clothing_sizes",
                    label: "Размеры одежды",
                    placeholder: "Введите размер и нажмите Enter"
                  }, null, _parent2, _scopeId));
                  _push2(`<div class="grid grid-cols-3 gap-4"${_scopeId}>`);
                  _push2(ssrRenderComponent(unref(Field), { name: "has_tattoos" }, {
                    default: withCtx(({ field, setValue }, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(ssrRenderComponent(_component_ui_field, null, {
                          default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(ssrRenderComponent(_component_ui_field_label, null, {
                                default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                                  if (_push5) {
                                    _push5(`Татуировки`);
                                  } else {
                                    return [
                                      createTextVNode("Татуировки")
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent4, _scopeId3));
                              _push4(ssrRenderComponent(_component_ui_select, {
                                "model-value": field.value === true ? "yes" : field.value === false ? "no" : "unknown",
                                "onUpdate:modelValue": (val) => {
                                  if (val === "yes") setValue(true);
                                  else if (val === "no") setValue(false);
                                  else setValue(null);
                                }
                              }, {
                                default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                                  if (_push5) {
                                    _push5(ssrRenderComponent(_component_ui_select_trigger, null, {
                                      default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                        if (_push6) {
                                          _push6(ssrRenderComponent(_component_ui_select_value, null, null, _parent6, _scopeId5));
                                        } else {
                                          return [
                                            createVNode(_component_ui_select_value)
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent5, _scopeId4));
                                    _push5(ssrRenderComponent(_component_ui_select_content, null, {
                                      default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                        if (_push6) {
                                          _push6(ssrRenderComponent(_component_ui_select_item, { value: "unknown" }, {
                                            default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                              if (_push7) {
                                                _push7(`Не указано`);
                                              } else {
                                                return [
                                                  createTextVNode("Не указано")
                                                ];
                                              }
                                            }),
                                            _: 2
                                          }, _parent6, _scopeId5));
                                          _push6(ssrRenderComponent(_component_ui_select_item, { value: "yes" }, {
                                            default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                              if (_push7) {
                                                _push7(`Есть`);
                                              } else {
                                                return [
                                                  createTextVNode("Есть")
                                                ];
                                              }
                                            }),
                                            _: 2
                                          }, _parent6, _scopeId5));
                                          _push6(ssrRenderComponent(_component_ui_select_item, { value: "no" }, {
                                            default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                              if (_push7) {
                                                _push7(`Нет`);
                                              } else {
                                                return [
                                                  createTextVNode("Нет")
                                                ];
                                              }
                                            }),
                                            _: 2
                                          }, _parent6, _scopeId5));
                                        } else {
                                          return [
                                            createVNode(_component_ui_select_item, { value: "unknown" }, {
                                              default: withCtx(() => [
                                                createTextVNode("Не указано")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_ui_select_item, { value: "yes" }, {
                                              default: withCtx(() => [
                                                createTextVNode("Есть")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_ui_select_item, { value: "no" }, {
                                              default: withCtx(() => [
                                                createTextVNode("Нет")
                                              ]),
                                              _: 1
                                            })
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent5, _scopeId4));
                                  } else {
                                    return [
                                      createVNode(_component_ui_select_trigger, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_ui_select_value)
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_ui_select_content, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_ui_select_item, { value: "unknown" }, {
                                            default: withCtx(() => [
                                              createTextVNode("Не указано")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_ui_select_item, { value: "yes" }, {
                                            default: withCtx(() => [
                                              createTextVNode("Есть")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_ui_select_item, { value: "no" }, {
                                            default: withCtx(() => [
                                              createTextVNode("Нет")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent4, _scopeId3));
                            } else {
                              return [
                                createVNode(_component_ui_field_label, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Татуировки")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_ui_select, {
                                  "model-value": field.value === true ? "yes" : field.value === false ? "no" : "unknown",
                                  "onUpdate:modelValue": (val) => {
                                    if (val === "yes") setValue(true);
                                    else if (val === "no") setValue(false);
                                    else setValue(null);
                                  }
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_ui_select_trigger, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_ui_select_value)
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_ui_select_content, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_ui_select_item, { value: "unknown" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Не указано")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_ui_select_item, { value: "yes" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Есть")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_ui_select_item, { value: "no" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Нет")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }, 8, ["model-value", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                      } else {
                        return [
                          createVNode(_component_ui_field, null, {
                            default: withCtx(() => [
                              createVNode(_component_ui_field_label, null, {
                                default: withCtx(() => [
                                  createTextVNode("Татуировки")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_ui_select, {
                                "model-value": field.value === true ? "yes" : field.value === false ? "no" : "unknown",
                                "onUpdate:modelValue": (val) => {
                                  if (val === "yes") setValue(true);
                                  else if (val === "no") setValue(false);
                                  else setValue(null);
                                }
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_ui_select_trigger, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_ui_select_value)
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_ui_select_content, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_ui_select_item, { value: "unknown" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Не указано")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_ui_select_item, { value: "yes" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Есть")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_ui_select_item, { value: "no" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Нет")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }, 8, ["model-value", "onUpdate:modelValue"])
                            ]),
                            _: 2
                          }, 1024)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent2, _scopeId));
                  _push2(ssrRenderComponent(unref(Field), { name: "has_piercings" }, {
                    default: withCtx(({ field, setValue }, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(ssrRenderComponent(_component_ui_field, null, {
                          default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(ssrRenderComponent(_component_ui_field_label, null, {
                                default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                                  if (_push5) {
                                    _push5(`Пирсинг`);
                                  } else {
                                    return [
                                      createTextVNode("Пирсинг")
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent4, _scopeId3));
                              _push4(ssrRenderComponent(_component_ui_select, {
                                "model-value": field.value === true ? "yes" : field.value === false ? "no" : "unknown",
                                "onUpdate:modelValue": (val) => {
                                  if (val === "yes") setValue(true);
                                  else if (val === "no") setValue(false);
                                  else setValue(null);
                                }
                              }, {
                                default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                                  if (_push5) {
                                    _push5(ssrRenderComponent(_component_ui_select_trigger, null, {
                                      default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                        if (_push6) {
                                          _push6(ssrRenderComponent(_component_ui_select_value, null, null, _parent6, _scopeId5));
                                        } else {
                                          return [
                                            createVNode(_component_ui_select_value)
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent5, _scopeId4));
                                    _push5(ssrRenderComponent(_component_ui_select_content, null, {
                                      default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                        if (_push6) {
                                          _push6(ssrRenderComponent(_component_ui_select_item, { value: "unknown" }, {
                                            default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                              if (_push7) {
                                                _push7(`Не указано`);
                                              } else {
                                                return [
                                                  createTextVNode("Не указано")
                                                ];
                                              }
                                            }),
                                            _: 2
                                          }, _parent6, _scopeId5));
                                          _push6(ssrRenderComponent(_component_ui_select_item, { value: "yes" }, {
                                            default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                              if (_push7) {
                                                _push7(`Есть`);
                                              } else {
                                                return [
                                                  createTextVNode("Есть")
                                                ];
                                              }
                                            }),
                                            _: 2
                                          }, _parent6, _scopeId5));
                                          _push6(ssrRenderComponent(_component_ui_select_item, { value: "no" }, {
                                            default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                              if (_push7) {
                                                _push7(`Нет`);
                                              } else {
                                                return [
                                                  createTextVNode("Нет")
                                                ];
                                              }
                                            }),
                                            _: 2
                                          }, _parent6, _scopeId5));
                                        } else {
                                          return [
                                            createVNode(_component_ui_select_item, { value: "unknown" }, {
                                              default: withCtx(() => [
                                                createTextVNode("Не указано")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_ui_select_item, { value: "yes" }, {
                                              default: withCtx(() => [
                                                createTextVNode("Есть")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_ui_select_item, { value: "no" }, {
                                              default: withCtx(() => [
                                                createTextVNode("Нет")
                                              ]),
                                              _: 1
                                            })
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent5, _scopeId4));
                                  } else {
                                    return [
                                      createVNode(_component_ui_select_trigger, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_ui_select_value)
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_ui_select_content, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_ui_select_item, { value: "unknown" }, {
                                            default: withCtx(() => [
                                              createTextVNode("Не указано")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_ui_select_item, { value: "yes" }, {
                                            default: withCtx(() => [
                                              createTextVNode("Есть")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_ui_select_item, { value: "no" }, {
                                            default: withCtx(() => [
                                              createTextVNode("Нет")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent4, _scopeId3));
                            } else {
                              return [
                                createVNode(_component_ui_field_label, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Пирсинг")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_ui_select, {
                                  "model-value": field.value === true ? "yes" : field.value === false ? "no" : "unknown",
                                  "onUpdate:modelValue": (val) => {
                                    if (val === "yes") setValue(true);
                                    else if (val === "no") setValue(false);
                                    else setValue(null);
                                  }
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_ui_select_trigger, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_ui_select_value)
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_ui_select_content, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_ui_select_item, { value: "unknown" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Не указано")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_ui_select_item, { value: "yes" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Есть")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_ui_select_item, { value: "no" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Нет")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }, 8, ["model-value", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                      } else {
                        return [
                          createVNode(_component_ui_field, null, {
                            default: withCtx(() => [
                              createVNode(_component_ui_field_label, null, {
                                default: withCtx(() => [
                                  createTextVNode("Пирсинг")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_ui_select, {
                                "model-value": field.value === true ? "yes" : field.value === false ? "no" : "unknown",
                                "onUpdate:modelValue": (val) => {
                                  if (val === "yes") setValue(true);
                                  else if (val === "no") setValue(false);
                                  else setValue(null);
                                }
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_ui_select_trigger, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_ui_select_value)
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_ui_select_content, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_ui_select_item, { value: "unknown" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Не указано")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_ui_select_item, { value: "yes" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Есть")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_ui_select_item, { value: "no" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Нет")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }, 8, ["model-value", "onUpdate:modelValue"])
                            ]),
                            _: 2
                          }, 1024)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent2, _scopeId));
                  _push2(ssrRenderComponent(unref(Field), { name: "has_scars" }, {
                    default: withCtx(({ field, setValue }, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(ssrRenderComponent(_component_ui_field, null, {
                          default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(ssrRenderComponent(_component_ui_field_label, null, {
                                default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                                  if (_push5) {
                                    _push5(`Шрамы`);
                                  } else {
                                    return [
                                      createTextVNode("Шрамы")
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent4, _scopeId3));
                              _push4(ssrRenderComponent(_component_ui_select, {
                                "model-value": field.value === true ? "yes" : field.value === false ? "no" : "unknown",
                                "onUpdate:modelValue": (val) => {
                                  if (val === "yes") setValue(true);
                                  else if (val === "no") setValue(false);
                                  else setValue(null);
                                }
                              }, {
                                default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                                  if (_push5) {
                                    _push5(ssrRenderComponent(_component_ui_select_trigger, null, {
                                      default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                        if (_push6) {
                                          _push6(ssrRenderComponent(_component_ui_select_value, null, null, _parent6, _scopeId5));
                                        } else {
                                          return [
                                            createVNode(_component_ui_select_value)
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent5, _scopeId4));
                                    _push5(ssrRenderComponent(_component_ui_select_content, null, {
                                      default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                        if (_push6) {
                                          _push6(ssrRenderComponent(_component_ui_select_item, { value: "unknown" }, {
                                            default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                              if (_push7) {
                                                _push7(`Не указано`);
                                              } else {
                                                return [
                                                  createTextVNode("Не указано")
                                                ];
                                              }
                                            }),
                                            _: 2
                                          }, _parent6, _scopeId5));
                                          _push6(ssrRenderComponent(_component_ui_select_item, { value: "yes" }, {
                                            default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                              if (_push7) {
                                                _push7(`Есть`);
                                              } else {
                                                return [
                                                  createTextVNode("Есть")
                                                ];
                                              }
                                            }),
                                            _: 2
                                          }, _parent6, _scopeId5));
                                          _push6(ssrRenderComponent(_component_ui_select_item, { value: "no" }, {
                                            default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                              if (_push7) {
                                                _push7(`Нет`);
                                              } else {
                                                return [
                                                  createTextVNode("Нет")
                                                ];
                                              }
                                            }),
                                            _: 2
                                          }, _parent6, _scopeId5));
                                        } else {
                                          return [
                                            createVNode(_component_ui_select_item, { value: "unknown" }, {
                                              default: withCtx(() => [
                                                createTextVNode("Не указано")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_ui_select_item, { value: "yes" }, {
                                              default: withCtx(() => [
                                                createTextVNode("Есть")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_ui_select_item, { value: "no" }, {
                                              default: withCtx(() => [
                                                createTextVNode("Нет")
                                              ]),
                                              _: 1
                                            })
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent5, _scopeId4));
                                  } else {
                                    return [
                                      createVNode(_component_ui_select_trigger, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_ui_select_value)
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_ui_select_content, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_ui_select_item, { value: "unknown" }, {
                                            default: withCtx(() => [
                                              createTextVNode("Не указано")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_ui_select_item, { value: "yes" }, {
                                            default: withCtx(() => [
                                              createTextVNode("Есть")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_ui_select_item, { value: "no" }, {
                                            default: withCtx(() => [
                                              createTextVNode("Нет")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent4, _scopeId3));
                            } else {
                              return [
                                createVNode(_component_ui_field_label, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Шрамы")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_ui_select, {
                                  "model-value": field.value === true ? "yes" : field.value === false ? "no" : "unknown",
                                  "onUpdate:modelValue": (val) => {
                                    if (val === "yes") setValue(true);
                                    else if (val === "no") setValue(false);
                                    else setValue(null);
                                  }
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_ui_select_trigger, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_ui_select_value)
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_ui_select_content, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_ui_select_item, { value: "unknown" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Не указано")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_ui_select_item, { value: "yes" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Есть")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_ui_select_item, { value: "no" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Нет")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }, 8, ["model-value", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                      } else {
                        return [
                          createVNode(_component_ui_field, null, {
                            default: withCtx(() => [
                              createVNode(_component_ui_field_label, null, {
                                default: withCtx(() => [
                                  createTextVNode("Шрамы")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_ui_select, {
                                "model-value": field.value === true ? "yes" : field.value === false ? "no" : "unknown",
                                "onUpdate:modelValue": (val) => {
                                  if (val === "yes") setValue(true);
                                  else if (val === "no") setValue(false);
                                  else setValue(null);
                                }
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_ui_select_trigger, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_ui_select_value)
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_ui_select_content, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_ui_select_item, { value: "unknown" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Не указано")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_ui_select_item, { value: "yes" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Есть")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_ui_select_item, { value: "no" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Нет")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }, 8, ["model-value", "onUpdate:modelValue"])
                            ]),
                            _: 2
                          }, 1024)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent2, _scopeId));
                  _push2(`</div>`);
                  _push2(ssrRenderComponent(_component_base_tags_input, {
                    name: "additional_info",
                    label: "Дополнительная информация",
                    placeholder: "Введите информацию и нажмите Enter"
                  }, null, _parent2, _scopeId));
                  _push2(`<!--]-->`);
                } else if (unref(currentTableName) === "photographers") {
                  _push2(`<!--[-->`);
                  _push2(ssrRenderComponent(_component_base_input, {
                    name: "camera",
                    type: "text",
                    label: "Камера",
                    placeholder: "Canon EOS 5D Mark IV"
                  }, null, _parent2, _scopeId));
                  _push2(ssrRenderComponent(_component_base_tags_input, {
                    name: "lenses",
                    label: "Объективы",
                    placeholder: "Введите объектив и нажмите Enter"
                  }, null, _parent2, _scopeId));
                  _push2(ssrRenderComponent(_component_base_tags_input, {
                    name: "additional_info",
                    label: "Дополнительная информация",
                    placeholder: "Введите информацию и нажмите Enter"
                  }, null, _parent2, _scopeId));
                  _push2(`<!--]-->`);
                } else if (unref(currentTableName) === "hairdressers") {
                  _push2(`<!--[-->`);
                  _push2(ssrRenderComponent(_component_base_tags_input, {
                    name: "equipment",
                    label: "Оборудование",
                    placeholder: "Введите оборудование и нажмите Enter"
                  }, null, _parent2, _scopeId));
                  _push2(ssrRenderComponent(_component_base_tags_input, {
                    name: "specialties",
                    label: "Специализации",
                    placeholder: "Введите специализацию и нажмите Enter"
                  }, null, _parent2, _scopeId));
                  _push2(ssrRenderComponent(_component_base_tags_input, {
                    name: "additional_info",
                    label: "Дополнительная информация",
                    placeholder: "Введите информацию и нажмите Enter"
                  }, null, _parent2, _scopeId));
                  _push2(`<!--]-->`);
                } else if (unref(currentTableName) === "stylists") {
                  _push2(`<!--[-->`);
                  _push2(ssrRenderComponent(_component_base_tags_input, {
                    name: "skills",
                    label: "Навыки",
                    placeholder: "Введите навык и нажмите Enter"
                  }, null, _parent2, _scopeId));
                  _push2(ssrRenderComponent(_component_base_tags_input, {
                    name: "additional_info",
                    label: "Дополнительная информация",
                    placeholder: "Введите информацию и нажмите Enter"
                  }, null, _parent2, _scopeId));
                  _push2(`<!--]-->`);
                } else {
                  _push2(`<!---->`);
                }
              } else {
                return [
                  unref(currentTableName) === "models" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                    createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                      createVNode(_component_base_input, {
                        name: "height",
                        type: "number",
                        label: "Рост (см)",
                        placeholder: "170"
                      }),
                      createVNode(_component_base_input, {
                        name: "weight",
                        type: "number",
                        label: "Вес (кг)",
                        placeholder: "60"
                      }),
                      createVNode(_component_base_input, {
                        name: "bust",
                        type: "number",
                        label: "Обхват груди (см)",
                        placeholder: "90"
                      }),
                      createVNode(_component_base_input, {
                        name: "waist",
                        type: "number",
                        label: "Обхват талии (см)",
                        placeholder: "70"
                      }),
                      createVNode(_component_base_input, {
                        name: "hips",
                        type: "number",
                        label: "Обхват бедер (см)",
                        placeholder: "95"
                      }),
                      createVNode(_component_base_input, {
                        name: "shoe_size",
                        type: "number",
                        label: "Размер обуви",
                        placeholder: "38"
                      })
                    ]),
                    createVNode(_component_base_select, {
                      name: "eye_color",
                      label: "Цвет глаз",
                      placeholder: "Выберите цвет глаз",
                      options: eyeColorOptions
                    }),
                    createVNode(_component_base_select, {
                      name: "hair_color",
                      label: "Цвет волос",
                      placeholder: "Выберите цвет волос",
                      options: hairColorOptions
                    }),
                    createVNode(_component_base_select, {
                      name: "hair_length",
                      label: "Длина волос",
                      placeholder: "Выберите длину волос",
                      options: hairLengthOptions
                    }),
                    createVNode(_component_base_tags_input, {
                      name: "clothing_sizes",
                      label: "Размеры одежды",
                      placeholder: "Введите размер и нажмите Enter"
                    }),
                    createVNode("div", { class: "grid grid-cols-3 gap-4" }, [
                      createVNode(unref(Field), { name: "has_tattoos" }, {
                        default: withCtx(({ field, setValue }) => [
                          createVNode(_component_ui_field, null, {
                            default: withCtx(() => [
                              createVNode(_component_ui_field_label, null, {
                                default: withCtx(() => [
                                  createTextVNode("Татуировки")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_ui_select, {
                                "model-value": field.value === true ? "yes" : field.value === false ? "no" : "unknown",
                                "onUpdate:modelValue": (val) => {
                                  if (val === "yes") setValue(true);
                                  else if (val === "no") setValue(false);
                                  else setValue(null);
                                }
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_ui_select_trigger, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_ui_select_value)
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_ui_select_content, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_ui_select_item, { value: "unknown" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Не указано")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_ui_select_item, { value: "yes" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Есть")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_ui_select_item, { value: "no" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Нет")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }, 8, ["model-value", "onUpdate:modelValue"])
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 1
                      }),
                      createVNode(unref(Field), { name: "has_piercings" }, {
                        default: withCtx(({ field, setValue }) => [
                          createVNode(_component_ui_field, null, {
                            default: withCtx(() => [
                              createVNode(_component_ui_field_label, null, {
                                default: withCtx(() => [
                                  createTextVNode("Пирсинг")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_ui_select, {
                                "model-value": field.value === true ? "yes" : field.value === false ? "no" : "unknown",
                                "onUpdate:modelValue": (val) => {
                                  if (val === "yes") setValue(true);
                                  else if (val === "no") setValue(false);
                                  else setValue(null);
                                }
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_ui_select_trigger, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_ui_select_value)
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_ui_select_content, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_ui_select_item, { value: "unknown" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Не указано")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_ui_select_item, { value: "yes" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Есть")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_ui_select_item, { value: "no" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Нет")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }, 8, ["model-value", "onUpdate:modelValue"])
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 1
                      }),
                      createVNode(unref(Field), { name: "has_scars" }, {
                        default: withCtx(({ field, setValue }) => [
                          createVNode(_component_ui_field, null, {
                            default: withCtx(() => [
                              createVNode(_component_ui_field_label, null, {
                                default: withCtx(() => [
                                  createTextVNode("Шрамы")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_ui_select, {
                                "model-value": field.value === true ? "yes" : field.value === false ? "no" : "unknown",
                                "onUpdate:modelValue": (val) => {
                                  if (val === "yes") setValue(true);
                                  else if (val === "no") setValue(false);
                                  else setValue(null);
                                }
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_ui_select_trigger, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_ui_select_value)
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_ui_select_content, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_ui_select_item, { value: "unknown" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Не указано")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_ui_select_item, { value: "yes" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Есть")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_ui_select_item, { value: "no" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Нет")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }, 8, ["model-value", "onUpdate:modelValue"])
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode(_component_base_tags_input, {
                      name: "additional_info",
                      label: "Дополнительная информация",
                      placeholder: "Введите информацию и нажмите Enter"
                    })
                  ], 64)) : unref(currentTableName) === "photographers" ? (openBlock(), createBlock(Fragment, { key: 1 }, [
                    createVNode(_component_base_input, {
                      name: "camera",
                      type: "text",
                      label: "Камера",
                      placeholder: "Canon EOS 5D Mark IV"
                    }),
                    createVNode(_component_base_tags_input, {
                      name: "lenses",
                      label: "Объективы",
                      placeholder: "Введите объектив и нажмите Enter"
                    }),
                    createVNode(_component_base_tags_input, {
                      name: "additional_info",
                      label: "Дополнительная информация",
                      placeholder: "Введите информацию и нажмите Enter"
                    })
                  ], 64)) : unref(currentTableName) === "hairdressers" ? (openBlock(), createBlock(Fragment, { key: 2 }, [
                    createVNode(_component_base_tags_input, {
                      name: "equipment",
                      label: "Оборудование",
                      placeholder: "Введите оборудование и нажмите Enter"
                    }),
                    createVNode(_component_base_tags_input, {
                      name: "specialties",
                      label: "Специализации",
                      placeholder: "Введите специализацию и нажмите Enter"
                    }),
                    createVNode(_component_base_tags_input, {
                      name: "additional_info",
                      label: "Дополнительная информация",
                      placeholder: "Введите информацию и нажмите Enter"
                    })
                  ], 64)) : unref(currentTableName) === "stylists" ? (openBlock(), createBlock(Fragment, { key: 3 }, [
                    createVNode(_component_base_tags_input, {
                      name: "skills",
                      label: "Навыки",
                      placeholder: "Введите навык и нажмите Enter"
                    }),
                    createVNode(_component_base_tags_input, {
                      name: "additional_info",
                      label: "Дополнительная информация",
                      placeholder: "Введите информацию и нажмите Enter"
                    })
                  ], 64)) : createCommentVNode("", true)
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(ssrRenderComponent(_component_ui_field, { class: "pt-4" }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_base_processing_button, {
                  type: "submit",
                  label: "Сохранить",
                  "is-processing": unref(isSaving)
                }, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(_component_base_processing_button, {
                    type: "submit",
                    label: "Сохранить",
                    "is-processing": unref(isSaving)
                  }, null, 8, ["is-processing"])
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div></form>`);
        } else if (unref(selectedRole) && !unref(currentTableName)) {
          _push(`<div class="text-sm text-muted-foreground border-t pt-4"> Для роли &quot;${ssrInterpolate(unref(selectedRole).title)}&quot; нет специальных полей </div>`);
        } else {
          _push(`<div class="text-sm text-muted-foreground"> Выберите роль, чтобы увидеть доступные поля </div>`);
        }
        _push(`</div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/profile/Additionally.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_6 = Object.assign(_sfc_main$1, { __name: "ProfileAdditionally" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const activeTab = ref("profile");
    useHead({ title: "Профиль" });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ui_card = __nuxt_component_0$1;
      const _component_ui_tabs = __nuxt_component_1$1;
      const _component_ui_tabs_list = __nuxt_component_2$2;
      const _component_ui_tabs_trigger = __nuxt_component_3$2;
      const _component_ui_tabs_content = __nuxt_component_4$2;
      const _component_profile = __nuxt_component_5$1;
      const _component_profile_additionally = __nuxt_component_6;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center justify-center min-h-[calc(100vh-80px)] bg-muted/40 p-4" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_ui_card, { class: "w-full max-w-4xl overflow-hidden" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_ui_tabs, {
              modelValue: unref(activeTab),
              "onUpdate:modelValue": ($event) => isRef(activeTab) ? activeTab.value = $event : null,
              class: "flex flex-col md:flex-row"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<aside class="w-full md:w-64 border-b md:border-b-0 md:border-r p-4 order-1 md:order-none"${_scopeId2}><div class="flex flex-col space-y-4"${_scopeId2}><div class="px-2 py-2 hidden md:block"${_scopeId2}><h2 class="text-lg font-semibold tracking-tight"${_scopeId2}>Настройки</h2><p class="text-sm text-muted-foreground"${_scopeId2}>Управление аккаунтом</p></div>`);
                  _push3(ssrRenderComponent(_component_ui_tabs_list, { class: "flex flex-row md:flex-col flex-wrap md:flex-nowrap h-auto bg-transparent gap-1 items-stretch justify-start overflow-x-visible pb-2 md:pb-0" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_ui_tabs_trigger, {
                          value: "profile",
                          class: "flex-1 md:flex-none justify-center md:justify-start px-2 md:px-4 py-2 text-sm md:text-base min-w-0"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Профиль `);
                            } else {
                              return [
                                createTextVNode(" Профиль ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_ui_tabs_trigger, {
                          value: "additionally",
                          class: "flex-1 md:flex-none justify-center md:justify-start px-2 md:px-4 py-2 text-sm md:text-base min-w-0"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Дополнительно `);
                            } else {
                              return [
                                createTextVNode(" Дополнительно ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_ui_tabs_trigger, {
                            value: "profile",
                            class: "flex-1 md:flex-none justify-center md:justify-start px-2 md:px-4 py-2 text-sm md:text-base min-w-0"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Профиль ")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_ui_tabs_trigger, {
                            value: "additionally",
                            class: "flex-1 md:flex-none justify-center md:justify-start px-2 md:px-4 py-2 text-sm md:text-base min-w-0"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Дополнительно ")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></aside><div class="flex-1 p-6 md:p-8 order-2 md:order-none"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_ui_tabs_content, {
                    value: "profile",
                    class: "mt-0 border-none p-0 outline-none"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_profile, { "active-tab": unref(activeTab) }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_profile, { "active-tab": unref(activeTab) }, null, 8, ["active-tab"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_ui_tabs_content, {
                    value: "additionally",
                    class: "mt-0 border-none p-0 outline-none"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_profile_additionally, null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_profile_additionally)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("aside", { class: "w-full md:w-64 border-b md:border-b-0 md:border-r p-4 order-1 md:order-none" }, [
                      createVNode("div", { class: "flex flex-col space-y-4" }, [
                        createVNode("div", { class: "px-2 py-2 hidden md:block" }, [
                          createVNode("h2", { class: "text-lg font-semibold tracking-tight" }, "Настройки"),
                          createVNode("p", { class: "text-sm text-muted-foreground" }, "Управление аккаунтом")
                        ]),
                        createVNode(_component_ui_tabs_list, { class: "flex flex-row md:flex-col flex-wrap md:flex-nowrap h-auto bg-transparent gap-1 items-stretch justify-start overflow-x-visible pb-2 md:pb-0" }, {
                          default: withCtx(() => [
                            createVNode(_component_ui_tabs_trigger, {
                              value: "profile",
                              class: "flex-1 md:flex-none justify-center md:justify-start px-2 md:px-4 py-2 text-sm md:text-base min-w-0"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Профиль ")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_ui_tabs_trigger, {
                              value: "additionally",
                              class: "flex-1 md:flex-none justify-center md:justify-start px-2 md:px-4 py-2 text-sm md:text-base min-w-0"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Дополнительно ")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ])
                    ]),
                    createVNode("div", { class: "flex-1 p-6 md:p-8 order-2 md:order-none" }, [
                      createVNode(_component_ui_tabs_content, {
                        value: "profile",
                        class: "mt-0 border-none p-0 outline-none"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_profile, { "active-tab": unref(activeTab) }, null, 8, ["active-tab"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_ui_tabs_content, {
                        value: "additionally",
                        class: "mt-0 border-none p-0 outline-none"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_profile_additionally)
                        ]),
                        _: 1
                      })
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_ui_tabs, {
                modelValue: unref(activeTab),
                "onUpdate:modelValue": ($event) => isRef(activeTab) ? activeTab.value = $event : null,
                class: "flex flex-col md:flex-row"
              }, {
                default: withCtx(() => [
                  createVNode("aside", { class: "w-full md:w-64 border-b md:border-b-0 md:border-r p-4 order-1 md:order-none" }, [
                    createVNode("div", { class: "flex flex-col space-y-4" }, [
                      createVNode("div", { class: "px-2 py-2 hidden md:block" }, [
                        createVNode("h2", { class: "text-lg font-semibold tracking-tight" }, "Настройки"),
                        createVNode("p", { class: "text-sm text-muted-foreground" }, "Управление аккаунтом")
                      ]),
                      createVNode(_component_ui_tabs_list, { class: "flex flex-row md:flex-col flex-wrap md:flex-nowrap h-auto bg-transparent gap-1 items-stretch justify-start overflow-x-visible pb-2 md:pb-0" }, {
                        default: withCtx(() => [
                          createVNode(_component_ui_tabs_trigger, {
                            value: "profile",
                            class: "flex-1 md:flex-none justify-center md:justify-start px-2 md:px-4 py-2 text-sm md:text-base min-w-0"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Профиль ")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_ui_tabs_trigger, {
                            value: "additionally",
                            class: "flex-1 md:flex-none justify-center md:justify-start px-2 md:px-4 py-2 text-sm md:text-base min-w-0"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Дополнительно ")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  createVNode("div", { class: "flex-1 p-6 md:p-8 order-2 md:order-none" }, [
                    createVNode(_component_ui_tabs_content, {
                      value: "profile",
                      class: "mt-0 border-none p-0 outline-none"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_profile, { "active-tab": unref(activeTab) }, null, 8, ["active-tab"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_ui_tabs_content, {
                      value: "additionally",
                      class: "mt-0 border-none p-0 outline-none"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_profile_additionally)
                      ]),
                      _: 1
                    })
                  ])
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/profile/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-CgSZGWKv.mjs.map
