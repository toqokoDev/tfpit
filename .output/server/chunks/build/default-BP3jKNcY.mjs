import { _ as __nuxt_component_0$1 } from './nuxt-link-TvooyZgq.mjs';
import { _ as __nuxt_component_1$1 } from './Logo-BfuZF7by.mjs';
import { _ as __nuxt_component_2 } from './Skeleton-DWaG_MEA.mjs';
import { _ as __nuxt_component_3 } from './Button-B-WuZDFb.mjs';
import { defineComponent, ref, withAsyncContext, computed, mergeProps, withCtx, createVNode, createTextVNode, unref, createBlock, createCommentVNode, openBlock, toValue, getCurrentInstance, onServerPrefetch, nextTick, toDisplayString, shallowRef, toRef, renderSlot, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderSlot } from 'vue/server-renderer';
import { useForwardPropsEmits, DropdownMenuRoot, useForwardProps, DropdownMenuTrigger, DropdownMenuPortal, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuGroup, DropdownMenuItem } from 'reka-ui';
import { _ as __nuxt_component_2$1, a as __nuxt_component_3$1, b as __nuxt_component_4$1 } from './AvatarFallback-DpUTFjBK.mjs';
import { reactiveOmit } from '@vueuse/core';
import { _ as __nuxt_component_5$1, i as useState, f as useNuxtApp, g as asyncDataDefaults, h as createError, n as navigateTo, c as cn } from './server.mjs';
import { SunDim, MoonStar, UserCircle2, BriefcaseBusiness, Megaphone, LogOut } from 'lucide-vue-next';
import { u as useSupabaseClient } from './useSupabaseClient-xv77-Kdn.mjs';
import { u as useCurrentUserStore } from './current-user-h5Lc7er2.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'class-variance-authority';
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

//#region src/index.ts
const DEBOUNCE_DEFAULTS = { trailing: true };
/**
Debounce functions
@param fn - Promise-returning/async function to debounce.
@param wait - Milliseconds to wait before calling `fn`. Default value is 25ms
@returns A function that delays calling `fn` until after `wait` milliseconds have elapsed since the last time it was called.
@example
```
import { debounce } from 'perfect-debounce';
const expensiveCall = async input => input;
const debouncedFn = debounce(expensiveCall, 200);
for (const number of [1, 2, 3]) {
console.log(await debouncedFn(number));
}
//=> 1
//=> 2
//=> 3
```
*/
function debounce(fn, wait = 25, options = {}) {
	options = {
		...DEBOUNCE_DEFAULTS,
		...options
	};
	if (!Number.isFinite(wait)) throw new TypeError("Expected `wait` to be a finite number");
	let leadingValue;
	let timeout;
	let resolveList = [];
	let currentPromise;
	let trailingArgs;
	const applyFn = (_this, args) => {
		currentPromise = _applyPromised(fn, _this, args);
		currentPromise.finally(() => {
			currentPromise = null;
			if (options.trailing && trailingArgs && !timeout) {
				const promise = applyFn(_this, trailingArgs);
				trailingArgs = null;
				return promise;
			}
		});
		return currentPromise;
	};
	const debounced = function(...args) {
		if (options.trailing) trailingArgs = args;
		if (currentPromise) return currentPromise;
		return new Promise((resolve) => {
			const shouldCallNow = !timeout && options.leading;
			clearTimeout(timeout);
			timeout = setTimeout(() => {
				timeout = null;
				const promise = options.leading ? leadingValue : applyFn(this, args);
				trailingArgs = null;
				for (const _resolve of resolveList) _resolve(promise);
				resolveList = [];
			}, wait);
			if (shouldCallNow) {
				leadingValue = applyFn(this, args);
				resolve(leadingValue);
			} else resolveList.push(resolve);
		});
	};
	const _clearTimeout = (timer) => {
		if (timer) {
			clearTimeout(timer);
			timeout = null;
		}
	};
	debounced.isPending = () => !!timeout;
	debounced.cancel = () => {
		_clearTimeout(timeout);
		resolveList = [];
		trailingArgs = null;
	};
	debounced.flush = () => {
		_clearTimeout(timeout);
		if (!trailingArgs || currentPromise) return;
		const args = trailingArgs;
		trailingArgs = null;
		return applyFn(this, args);
	};
	return debounced;
}
async function _applyPromised(fn, _this, args) {
	return await fn.apply(_this, args);
}

function useAsyncData(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (_isAutoKeyNeeded(args[0], args[1])) {
    args.unshift(autoKey);
  }
  let [_key, _handler, options = {}] = args;
  const key = computed(() => toValue(_key));
  if (typeof key.value !== "string") {
    throw new TypeError("[nuxt] [useAsyncData] key must be a string.");
  }
  if (typeof _handler !== "function") {
    throw new TypeError("[nuxt] [useAsyncData] handler must be a function.");
  }
  const nuxtApp = useNuxtApp();
  options.server ??= true;
  options.default ??= getDefault;
  options.getCachedData ??= getDefaultCachedData;
  options.lazy ??= false;
  options.immediate ??= true;
  options.deep ??= asyncDataDefaults.deep;
  options.dedupe ??= "cancel";
  options._functionName || "useAsyncData";
  nuxtApp._asyncData[key.value];
  function createInitialFetch() {
    const initialFetchOptions = { cause: "initial", dedupe: options.dedupe };
    if (!nuxtApp._asyncData[key.value]?._init) {
      initialFetchOptions.cachedData = options.getCachedData(key.value, nuxtApp, { cause: "initial" });
      nuxtApp._asyncData[key.value] = createAsyncData(nuxtApp, key.value, _handler, options, initialFetchOptions.cachedData);
    }
    return () => nuxtApp._asyncData[key.value].execute(initialFetchOptions);
  }
  const initialFetch = createInitialFetch();
  const asyncData = nuxtApp._asyncData[key.value];
  asyncData._deps++;
  const fetchOnServer = options.server !== false && nuxtApp.payload.serverRendered;
  if (fetchOnServer && options.immediate) {
    const promise = initialFetch();
    if (getCurrentInstance()) {
      onServerPrefetch(() => promise);
    } else {
      nuxtApp.hook("app:created", async () => {
        await promise;
      });
    }
  }
  const asyncReturn = {
    data: writableComputedRef(() => nuxtApp._asyncData[key.value]?.data),
    pending: writableComputedRef(() => nuxtApp._asyncData[key.value]?.pending),
    status: writableComputedRef(() => nuxtApp._asyncData[key.value]?.status),
    error: writableComputedRef(() => nuxtApp._asyncData[key.value]?.error),
    refresh: (...args2) => {
      if (!nuxtApp._asyncData[key.value]?._init) {
        const initialFetch2 = createInitialFetch();
        return initialFetch2();
      }
      return nuxtApp._asyncData[key.value].execute(...args2);
    },
    execute: (...args2) => asyncReturn.refresh(...args2),
    clear: () => {
      const entry = nuxtApp._asyncData[key.value];
      if (entry?._abortController) {
        try {
          entry._abortController.abort(new DOMException("AsyncData aborted by user.", "AbortError"));
        } finally {
          entry._abortController = void 0;
        }
      }
      clearNuxtDataByKey(nuxtApp, key.value);
    }
  };
  const asyncDataPromise = Promise.resolve(nuxtApp._asyncDataPromises[key.value]).then(() => asyncReturn);
  Object.assign(asyncDataPromise, asyncReturn);
  return asyncDataPromise;
}
function writableComputedRef(getter) {
  return computed({
    get() {
      return getter()?.value;
    },
    set(value) {
      const ref2 = getter();
      if (ref2) {
        ref2.value = value;
      }
    }
  });
}
function _isAutoKeyNeeded(keyOrFetcher, fetcher) {
  if (typeof keyOrFetcher === "string") {
    return false;
  }
  if (typeof keyOrFetcher === "object" && keyOrFetcher !== null) {
    return false;
  }
  if (typeof keyOrFetcher === "function" && typeof fetcher === "function") {
    return false;
  }
  return true;
}
function clearNuxtDataByKey(nuxtApp, key) {
  if (key in nuxtApp.payload.data) {
    nuxtApp.payload.data[key] = void 0;
  }
  if (key in nuxtApp.payload._errors) {
    nuxtApp.payload._errors[key] = void 0;
  }
  if (nuxtApp._asyncData[key]) {
    nuxtApp._asyncData[key].data.value = unref(nuxtApp._asyncData[key]._default());
    nuxtApp._asyncData[key].error.value = void 0;
    nuxtApp._asyncData[key].status.value = "idle";
  }
  if (key in nuxtApp._asyncDataPromises) {
    nuxtApp._asyncDataPromises[key] = void 0;
  }
}
function pick(obj, keys) {
  const newObj = {};
  for (const key of keys) {
    newObj[key] = obj[key];
  }
  return newObj;
}
function createAsyncData(nuxtApp, key, _handler, options, initialCachedData) {
  nuxtApp.payload._errors[key] ??= void 0;
  const hasCustomGetCachedData = options.getCachedData !== getDefaultCachedData;
  const handler = _handler ;
  const _ref = options.deep ? ref : shallowRef;
  const hasCachedData = initialCachedData !== void 0;
  const unsubRefreshAsyncData = nuxtApp.hook("app:data:refresh", async (keys) => {
    if (!keys || keys.includes(key)) {
      await asyncData.execute({ cause: "refresh:hook" });
    }
  });
  const asyncData = {
    data: _ref(hasCachedData ? initialCachedData : options.default()),
    pending: computed(() => asyncData.status.value === "pending"),
    error: toRef(nuxtApp.payload._errors, key),
    status: shallowRef("idle"),
    execute: (...args) => {
      const [_opts, newValue = void 0] = args;
      const opts = _opts && newValue === void 0 && typeof _opts === "object" ? _opts : {};
      if (nuxtApp._asyncDataPromises[key]) {
        if ((opts.dedupe ?? options.dedupe) === "defer") {
          return nuxtApp._asyncDataPromises[key];
        }
      }
      {
        const cachedData = "cachedData" in opts ? opts.cachedData : options.getCachedData(key, nuxtApp, { cause: opts.cause ?? "refresh:manual" });
        if (cachedData !== void 0) {
          nuxtApp.payload.data[key] = asyncData.data.value = cachedData;
          asyncData.error.value = void 0;
          asyncData.status.value = "success";
          return Promise.resolve(cachedData);
        }
      }
      if (asyncData._abortController) {
        asyncData._abortController.abort(new DOMException("AsyncData request cancelled by deduplication", "AbortError"));
      }
      asyncData._abortController = new AbortController();
      asyncData.status.value = "pending";
      const cleanupController = new AbortController();
      const promise = new Promise(
        (resolve, reject) => {
          try {
            const timeout = opts.timeout ?? options.timeout;
            const mergedSignal = mergeAbortSignals([asyncData._abortController?.signal, opts?.signal], cleanupController.signal, timeout);
            if (mergedSignal.aborted) {
              const reason = mergedSignal.reason;
              reject(reason instanceof Error ? reason : new DOMException(String(reason ?? "Aborted"), "AbortError"));
              return;
            }
            mergedSignal.addEventListener("abort", () => {
              const reason = mergedSignal.reason;
              reject(reason instanceof Error ? reason : new DOMException(String(reason ?? "Aborted"), "AbortError"));
            }, { once: true, signal: cleanupController.signal });
            return Promise.resolve(handler(nuxtApp, { signal: mergedSignal })).then(resolve, reject);
          } catch (err) {
            reject(err);
          }
        }
      ).then(async (_result) => {
        let result = _result;
        if (options.transform) {
          result = await options.transform(_result);
        }
        if (options.pick) {
          result = pick(result, options.pick);
        }
        nuxtApp.payload.data[key] = result;
        asyncData.data.value = result;
        asyncData.error.value = void 0;
        asyncData.status.value = "success";
      }).catch((error) => {
        if (nuxtApp._asyncDataPromises[key] && nuxtApp._asyncDataPromises[key] !== promise) {
          return nuxtApp._asyncDataPromises[key];
        }
        if (asyncData._abortController?.signal.aborted) {
          return nuxtApp._asyncDataPromises[key];
        }
        if (typeof DOMException !== "undefined" && error instanceof DOMException && error.name === "AbortError") {
          asyncData.status.value = "idle";
          return nuxtApp._asyncDataPromises[key];
        }
        asyncData.error.value = createError(error);
        asyncData.data.value = unref(options.default());
        asyncData.status.value = "error";
      }).finally(() => {
        cleanupController.abort();
        delete nuxtApp._asyncDataPromises[key];
      });
      nuxtApp._asyncDataPromises[key] = promise;
      return nuxtApp._asyncDataPromises[key];
    },
    _execute: debounce((...args) => asyncData.execute(...args), 0, { leading: true }),
    _default: options.default,
    _deps: 0,
    _init: true,
    _hash: void 0,
    _off: () => {
      unsubRefreshAsyncData();
      if (nuxtApp._asyncData[key]?._init) {
        nuxtApp._asyncData[key]._init = false;
      }
      if (!hasCustomGetCachedData) {
        nextTick(() => {
          if (!nuxtApp._asyncData[key]?._init) {
            clearNuxtDataByKey(nuxtApp, key);
            asyncData.execute = () => Promise.resolve();
          }
        });
      }
    }
  };
  return asyncData;
}
const getDefault = () => void 0;
const getDefaultCachedData = (key, nuxtApp, ctx) => {
  if (nuxtApp.isHydrating) {
    return nuxtApp.payload.data[key];
  }
  if (ctx.cause !== "refresh:manual" && ctx.cause !== "refresh:hook") {
    return nuxtApp.static.data[key];
  }
};
function mergeAbortSignals(signals, cleanupSignal, timeout) {
  const list = signals.filter((s) => !!s);
  if (typeof timeout === "number" && timeout >= 0) {
    const timeoutSignal = AbortSignal.timeout?.(timeout);
    if (timeoutSignal) {
      list.push(timeoutSignal);
    }
  }
  if (AbortSignal.any) {
    return AbortSignal.any(list);
  }
  const controller = new AbortController();
  for (const sig of list) {
    if (sig.aborted) {
      const reason = sig.reason ?? new DOMException("Aborted", "AbortError");
      try {
        controller.abort(reason);
      } catch {
        controller.abort();
      }
      return controller.signal;
    }
  }
  const onAbort = () => {
    const abortedSignal = list.find((s) => s.aborted);
    const reason = abortedSignal?.reason ?? new DOMException("Aborted", "AbortError");
    try {
      controller.abort(reason);
    } catch {
      controller.abort();
    }
  };
  for (const sig of list) {
    sig.addEventListener?.("abort", onAbort, { once: true, signal: cleanupSignal });
  }
  return controller.signal;
}
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "DropdownMenu",
  __ssrInlineRender: true,
  props: {
    defaultOpen: { type: Boolean },
    open: { type: Boolean },
    dir: {},
    modal: { type: Boolean }
  },
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const forwarded = useForwardPropsEmits(props, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DropdownMenuRoot), mergeProps({ "data-slot": "dropdown-menu" }, unref(forwarded), _attrs), {
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
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/dropdown-menu/DropdownMenu.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main$8, { __name: "UiDropdownMenu" });
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "DropdownMenuTrigger",
  __ssrInlineRender: true,
  props: {
    disabled: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    const forwardedProps = useForwardProps(props);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DropdownMenuTrigger), mergeProps({ "data-slot": "dropdown-menu-trigger" }, unref(forwardedProps), _attrs), {
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/dropdown-menu/DropdownMenuTrigger.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const __nuxt_component_1 = Object.assign(_sfc_main$7, { __name: "UiDropdownMenuTrigger" });
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "DropdownMenuContent",
  __ssrInlineRender: true,
  props: {
    forceMount: { type: Boolean },
    loop: { type: Boolean },
    side: {},
    sideOffset: { default: 4 },
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
    class: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "closeAutoFocus"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const delegatedProps = reactiveOmit(props, "class");
    const forwarded = useForwardPropsEmits(delegatedProps, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DropdownMenuPortal), _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(DropdownMenuContent), mergeProps({ "data-slot": "dropdown-menu-content" }, { ..._ctx.$attrs, ...unref(forwarded) }, {
              class: unref(cn)("bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--reka-dropdown-menu-content-available-height) min-w-[8rem] origin-(--reka-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md", props.class)
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
              createVNode(unref(DropdownMenuContent), mergeProps({ "data-slot": "dropdown-menu-content" }, { ..._ctx.$attrs, ...unref(forwarded) }, {
                class: unref(cn)("bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--reka-dropdown-menu-content-available-height) min-w-[8rem] origin-(--reka-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md", props.class)
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
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/dropdown-menu/DropdownMenuContent.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const __nuxt_component_5 = Object.assign(_sfc_main$6, { __name: "UiDropdownMenuContent" });
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "DropdownMenuLabel",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {},
    class: {},
    inset: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class", "inset");
    const forwardedProps = useForwardProps(delegatedProps);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DropdownMenuLabel), mergeProps({
        "data-slot": "dropdown-menu-label",
        "data-inset": __props.inset ? "" : void 0
      }, unref(forwardedProps), {
        class: unref(cn)("px-2 py-1.5 text-sm font-medium data-[inset]:pl-8", props.class)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/dropdown-menu/DropdownMenuLabel.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_6 = Object.assign(_sfc_main$5, { __name: "UiDropdownMenuLabel" });
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "DropdownMenuSeparator",
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
      _push(ssrRenderComponent(unref(DropdownMenuSeparator), mergeProps({ "data-slot": "dropdown-menu-separator" }, unref(delegatedProps), {
        class: unref(cn)("bg-border -mx-1 my-1 h-px", props.class)
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/dropdown-menu/DropdownMenuSeparator.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_7 = Object.assign(_sfc_main$4, { __name: "UiDropdownMenuSeparator" });
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "DropdownMenuGroup",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DropdownMenuGroup), mergeProps({ "data-slot": "dropdown-menu-group" }, props, _attrs), {
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
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/dropdown-menu/DropdownMenuGroup.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_8 = Object.assign(_sfc_main$3, { __name: "UiDropdownMenuGroup" });
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "DropdownMenuItem",
  __ssrInlineRender: true,
  props: {
    disabled: { type: Boolean },
    textValue: {},
    asChild: { type: Boolean },
    as: {},
    class: {},
    inset: { type: Boolean },
    variant: { default: "default" }
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "inset", "variant", "class");
    const forwardedProps = useForwardProps(delegatedProps);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DropdownMenuItem), mergeProps({
        "data-slot": "dropdown-menu-item",
        "data-inset": __props.inset ? "" : void 0,
        "data-variant": __props.variant
      }, unref(forwardedProps), {
        class: unref(cn)("focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", props.class)
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
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/dropdown-menu/DropdownMenuItem.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_9 = Object.assign(_sfc_main$2, { __name: "UiDropdownMenuItem" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Profile",
  __ssrInlineRender: true,
  props: {
    user: {}
  },
  setup(__props) {
    const props = __props;
    const client = useSupabaseClient();
    const initials = computed(() => {
      const first = props.user.first_name[0] || "";
      const last = props.user.last_name[0] || "";
      return (first + last).toUpperCase() || "?";
    });
    async function handleLogout() {
      await client.auth.signOut();
      navigateTo("/auth/login");
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ui_dropdown_menu = __nuxt_component_0;
      const _component_ui_dropdown_menu_trigger = __nuxt_component_1;
      const _component_ui_avatar = __nuxt_component_2$1;
      const _component_ui_avatar_image = __nuxt_component_3$1;
      const _component_ui_avatar_fallback = __nuxt_component_4$1;
      const _component_ui_dropdown_menu_content = __nuxt_component_5;
      const _component_ui_dropdown_menu_label = __nuxt_component_6;
      const _component_ui_dropdown_menu_separator = __nuxt_component_7;
      const _component_ui_dropdown_menu_group = __nuxt_component_8;
      const _component_ui_dropdown_menu_item = __nuxt_component_9;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(ssrRenderComponent(_component_ui_dropdown_menu, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_ui_dropdown_menu_trigger, { "as-child": "" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex items-center gap-2 p-1 rounded-lg hover:bg-accent cursor-pointer transition-colors duration-200 select-none"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_ui_avatar, { class: "h-8 w-8 rounded-full border" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_ui_avatar_image, {
                          src: __props.user.avatar_url || ""
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_ui_avatar_fallback, { class: "text-xs" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(unref(initials))}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(unref(initials)), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_ui_avatar_image, {
                            src: __props.user.avatar_url || ""
                          }, null, 8, ["src"]),
                          createVNode(_component_ui_avatar_fallback, { class: "text-xs" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unref(initials)), 1)
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="hidden sm:flex flex-col text-left mr-1"${_scopeId2}><span class="text-sm font-semibold leading-none"${_scopeId2}>${ssrInterpolate(__props.user.first_name || "Профиль")} ${ssrInterpolate(__props.user.last_name)}</span></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-center gap-2 p-1 rounded-lg hover:bg-accent cursor-pointer transition-colors duration-200 select-none" }, [
                      createVNode(_component_ui_avatar, { class: "h-8 w-8 rounded-full border" }, {
                        default: withCtx(() => [
                          createVNode(_component_ui_avatar_image, {
                            src: __props.user.avatar_url || ""
                          }, null, 8, ["src"]),
                          createVNode(_component_ui_avatar_fallback, { class: "text-xs" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unref(initials)), 1)
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "hidden sm:flex flex-col text-left mr-1" }, [
                        createVNode("span", { class: "text-sm font-semibold leading-none" }, toDisplayString(__props.user.first_name || "Профиль") + " " + toDisplayString(__props.user.last_name), 1)
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_ui_dropdown_menu_content, {
              class: "w-(--reka-dropdown-menu-trigger-width) min-w-56 rounded-lg",
              side: "bottom",
              "side-offset": 4
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_ui_dropdown_menu_label, { class: "p-0 font-normal" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_ui_avatar, { class: "h-8 w-8 rounded-lg" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_ui_avatar_image, {
                                src: __props.user.avatar_url || ""
                              }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_ui_avatar_fallback, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`${ssrInterpolate(unref(initials))}`);
                                  } else {
                                    return [
                                      createTextVNode(toDisplayString(unref(initials)), 1)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_ui_avatar_image, {
                                  src: __props.user.avatar_url || ""
                                }, null, 8, ["src"]),
                                createVNode(_component_ui_avatar_fallback, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(unref(initials)), 1)
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<div class="grid flex-1 text-left text-sm leading-tight"${_scopeId3}><span class="truncate font-medium"${_scopeId3}>${ssrInterpolate(__props.user.first_name)} ${ssrInterpolate(__props.user.last_name)}</span></div></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "flex items-center gap-2 px-1 py-1.5 text-left text-sm" }, [
                            createVNode(_component_ui_avatar, { class: "h-8 w-8 rounded-lg" }, {
                              default: withCtx(() => [
                                createVNode(_component_ui_avatar_image, {
                                  src: __props.user.avatar_url || ""
                                }, null, 8, ["src"]),
                                createVNode(_component_ui_avatar_fallback, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(unref(initials)), 1)
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode("div", { class: "grid flex-1 text-left text-sm leading-tight" }, [
                              createVNode("span", { class: "truncate font-medium" }, toDisplayString(__props.user.first_name) + " " + toDisplayString(__props.user.last_name), 1)
                            ])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_ui_dropdown_menu_separator, null, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_ui_dropdown_menu_group, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_ui_dropdown_menu_item, { "as-child": "" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_NuxtLink, { to: "/profile" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(UserCircle2), null, null, _parent6, _scopeId5));
                                    _push6(` Профиль `);
                                  } else {
                                    return [
                                      createVNode(unref(UserCircle2)),
                                      createTextVNode(" Профиль ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_NuxtLink, { to: "/profile" }, {
                                  default: withCtx(() => [
                                    createVNode(unref(UserCircle2)),
                                    createTextVNode(" Профиль ")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_ui_dropdown_menu_item, { "as-child": "" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_NuxtLink, { to: "/profile/portfolio" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(BriefcaseBusiness), null, null, _parent6, _scopeId5));
                                    _push6(` Портфолио `);
                                  } else {
                                    return [
                                      createVNode(unref(BriefcaseBusiness)),
                                      createTextVNode(" Портфолио ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_NuxtLink, { to: "/profile/portfolio" }, {
                                  default: withCtx(() => [
                                    createVNode(unref(BriefcaseBusiness)),
                                    createTextVNode(" Портфолио ")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_ui_dropdown_menu_item, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(Megaphone), null, null, _parent5, _scopeId4));
                              _push5(` Объявления `);
                            } else {
                              return [
                                createVNode(unref(Megaphone)),
                                createTextVNode(" Объявления ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_ui_dropdown_menu_item, { "as-child": "" }, {
                            default: withCtx(() => [
                              createVNode(_component_NuxtLink, { to: "/profile" }, {
                                default: withCtx(() => [
                                  createVNode(unref(UserCircle2)),
                                  createTextVNode(" Профиль ")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_ui_dropdown_menu_item, { "as-child": "" }, {
                            default: withCtx(() => [
                              createVNode(_component_NuxtLink, { to: "/profile/portfolio" }, {
                                default: withCtx(() => [
                                  createVNode(unref(BriefcaseBusiness)),
                                  createTextVNode(" Портфолио ")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_ui_dropdown_menu_item, null, {
                            default: withCtx(() => [
                              createVNode(unref(Megaphone)),
                              createTextVNode(" Объявления ")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_ui_dropdown_menu_separator, null, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_ui_dropdown_menu_item, {
                    onClick: ($event) => handleLogout()
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(LogOut), null, null, _parent4, _scopeId3));
                        _push4(` Выйти `);
                      } else {
                        return [
                          createVNode(unref(LogOut)),
                          createTextVNode(" Выйти ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_ui_dropdown_menu_label, { class: "p-0 font-normal" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex items-center gap-2 px-1 py-1.5 text-left text-sm" }, [
                          createVNode(_component_ui_avatar, { class: "h-8 w-8 rounded-lg" }, {
                            default: withCtx(() => [
                              createVNode(_component_ui_avatar_image, {
                                src: __props.user.avatar_url || ""
                              }, null, 8, ["src"]),
                              createVNode(_component_ui_avatar_fallback, null, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(unref(initials)), 1)
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode("div", { class: "grid flex-1 text-left text-sm leading-tight" }, [
                            createVNode("span", { class: "truncate font-medium" }, toDisplayString(__props.user.first_name) + " " + toDisplayString(__props.user.last_name), 1)
                          ])
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_ui_dropdown_menu_separator),
                    createVNode(_component_ui_dropdown_menu_group, null, {
                      default: withCtx(() => [
                        createVNode(_component_ui_dropdown_menu_item, { "as-child": "" }, {
                          default: withCtx(() => [
                            createVNode(_component_NuxtLink, { to: "/profile" }, {
                              default: withCtx(() => [
                                createVNode(unref(UserCircle2)),
                                createTextVNode(" Профиль ")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_ui_dropdown_menu_item, { "as-child": "" }, {
                          default: withCtx(() => [
                            createVNode(_component_NuxtLink, { to: "/profile/portfolio" }, {
                              default: withCtx(() => [
                                createVNode(unref(BriefcaseBusiness)),
                                createTextVNode(" Портфолио ")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_ui_dropdown_menu_item, null, {
                          default: withCtx(() => [
                            createVNode(unref(Megaphone)),
                            createTextVNode(" Объявления ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_ui_dropdown_menu_separator),
                    createVNode(_component_ui_dropdown_menu_item, {
                      onClick: ($event) => handleLogout()
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(LogOut)),
                        createTextVNode(" Выйти ")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_ui_dropdown_menu_trigger, { "as-child": "" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "flex items-center gap-2 p-1 rounded-lg hover:bg-accent cursor-pointer transition-colors duration-200 select-none" }, [
                    createVNode(_component_ui_avatar, { class: "h-8 w-8 rounded-full border" }, {
                      default: withCtx(() => [
                        createVNode(_component_ui_avatar_image, {
                          src: __props.user.avatar_url || ""
                        }, null, 8, ["src"]),
                        createVNode(_component_ui_avatar_fallback, { class: "text-xs" }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(unref(initials)), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "hidden sm:flex flex-col text-left mr-1" }, [
                      createVNode("span", { class: "text-sm font-semibold leading-none" }, toDisplayString(__props.user.first_name || "Профиль") + " " + toDisplayString(__props.user.last_name), 1)
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_ui_dropdown_menu_content, {
                class: "w-(--reka-dropdown-menu-trigger-width) min-w-56 rounded-lg",
                side: "bottom",
                "side-offset": 4
              }, {
                default: withCtx(() => [
                  createVNode(_component_ui_dropdown_menu_label, { class: "p-0 font-normal" }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "flex items-center gap-2 px-1 py-1.5 text-left text-sm" }, [
                        createVNode(_component_ui_avatar, { class: "h-8 w-8 rounded-lg" }, {
                          default: withCtx(() => [
                            createVNode(_component_ui_avatar_image, {
                              src: __props.user.avatar_url || ""
                            }, null, 8, ["src"]),
                            createVNode(_component_ui_avatar_fallback, null, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(unref(initials)), 1)
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode("div", { class: "grid flex-1 text-left text-sm leading-tight" }, [
                          createVNode("span", { class: "truncate font-medium" }, toDisplayString(__props.user.first_name) + " " + toDisplayString(__props.user.last_name), 1)
                        ])
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_ui_dropdown_menu_separator),
                  createVNode(_component_ui_dropdown_menu_group, null, {
                    default: withCtx(() => [
                      createVNode(_component_ui_dropdown_menu_item, { "as-child": "" }, {
                        default: withCtx(() => [
                          createVNode(_component_NuxtLink, { to: "/profile" }, {
                            default: withCtx(() => [
                              createVNode(unref(UserCircle2)),
                              createTextVNode(" Профиль ")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_ui_dropdown_menu_item, { "as-child": "" }, {
                        default: withCtx(() => [
                          createVNode(_component_NuxtLink, { to: "/profile/portfolio" }, {
                            default: withCtx(() => [
                              createVNode(unref(BriefcaseBusiness)),
                              createTextVNode(" Портфолио ")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_ui_dropdown_menu_item, null, {
                        default: withCtx(() => [
                          createVNode(unref(Megaphone)),
                          createTextVNode(" Объявления ")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_ui_dropdown_menu_separator),
                  createVNode(_component_ui_dropdown_menu_item, {
                    onClick: ($event) => handleLogout()
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(LogOut)),
                      createTextVNode(" Выйти ")
                    ]),
                    _: 1
                  }, 8, ["onClick"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/base/Profile.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_4 = Object.assign(_sfc_main$1, { __name: "BaseProfile" });
const useColorMode = () => {
  return useState("color-mode").value;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const colorMode = useColorMode();
    function toggleColor() {
      colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
    }
    const currentUserStore = useCurrentUserStore();
    const isDataloading = ref(true);
    const { data: loadedUser } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData("init-user", async () => {
      if (currentUserStore.isExist()) {
        await nextTick();
        setTimeout(() => {
          isDataloading.value = false;
        }, 100);
        return null;
      }
      const supabase = useSupabaseClient();
      const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();
      if (authError || authUser === null) {
        await nextTick();
        setTimeout(() => {
          isDataloading.value = false;
        }, 100);
        return null;
      }
      const { data: user, error: userFetchError } = await supabase.from("users").select("id, email, first_name, last_name, avatar_url").eq("id", authUser.id).limit(1).maybeSingle();
      if (userFetchError || user === null) {
        await nextTick();
        setTimeout(() => {
          isDataloading.value = false;
        }, 100);
        return null;
      }
      await nextTick();
      setTimeout(() => {
        isDataloading.value = false;
      }, 100);
      return {
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        avatar_url: user.avatar_url || void 0
      };
    }, {
      server: false
    })), __temp = await __temp, __restore(), __temp);
    const currentUser = computed(() => {
      if (currentUserStore.isExist()) {
        const user = currentUserStore.user;
        return {
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          avatar_url: user.avatar_url || void 0
        };
      }
      return loadedUser.value;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_base_logo = __nuxt_component_1$1;
      const _component_ui_skeleton = __nuxt_component_2;
      const _component_ui_button = __nuxt_component_3;
      const _component_base_profile = __nuxt_component_4;
      const _component_nuxt_page = __nuxt_component_5$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300" }, _attrs))}><header class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"><div class="container mx-auto flex h-16 items-center justify-between px-4">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "flex items-center gap-2 font-bold text-xl tracking-tighter"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_base_logo, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_base_logo)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<nav class="flex items-center gap-4">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/offer",
        class: "text-sm font-medium hover:text-primary transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Объявления`);
          } else {
            return [
              createTextVNode("Объявления")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/about",
        class: "hidden md:flex text-sm font-medium hover:text-primary transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`О сервисе`);
          } else {
            return [
              createTextVNode("О сервисе")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</nav>`);
      if (unref(isDataloading)) {
        _push(ssrRenderComponent(_component_ui_skeleton, { class: "w-[100px] h-[30px] md:w-[150px] rounded-full" }, null, _parent));
      } else {
        _push(`<div class="flex items-center gap-2">`);
        _push(ssrRenderComponent(_component_ui_button, {
          variant: "ghost",
          size: "icon",
          class: "rounded-full shadow-none",
          onClick: toggleColor
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (unref(colorMode).value === "light") {
                _push2(ssrRenderComponent(unref(SunDim), { class: "size-6" }, null, _parent2, _scopeId));
              } else if (unref(colorMode).value === "dark") {
                _push2(ssrRenderComponent(unref(MoonStar), { class: "size-6" }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                unref(colorMode).value === "light" ? (openBlock(), createBlock(unref(SunDim), {
                  key: 0,
                  class: "size-6"
                })) : unref(colorMode).value === "dark" ? (openBlock(), createBlock(unref(MoonStar), {
                  key: 1,
                  class: "size-6"
                })) : createCommentVNode("", true)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div class="h-6 w-[1px] bg-border mx-1 block"></div>`);
        if (unref(currentUser)) {
          _push(`<div>`);
          _push(ssrRenderComponent(_component_base_profile, { user: unref(currentUser) }, null, _parent));
          _push(`</div>`);
        } else {
          _push(`<div>`);
          _push(ssrRenderComponent(_component_NuxtLink, { to: "/auth/login" }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_ui_button, {
                  size: "sm",
                  class: "font-semibold shadow-md"
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
              } else {
                return [
                  createVNode(_component_ui_button, {
                    size: "sm",
                    class: "font-semibold shadow-md"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Войти ")
                    ]),
                    _: 1
                  })
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div>`);
        }
        _push(`</div>`);
      }
      _push(`</div></header><main class="flex-1">`);
      _push(ssrRenderComponent(_component_nuxt_page, { transition: {
        name: "page-vertical",
        mode: "out-in"
      } }, null, _parent));
      _push(`</main><footer class="border-t py-12 bg-muted/30"><div class="container mx-auto px-4"><div class="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-muted-foreground"><p>© 2026 TFP.BY Платформа для творческого взаимодействия.</p><div class="flex gap-6">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/about/rules",
        class: "hover:underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Правила`);
          } else {
            return [
              createTextVNode("Правила")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/about/help",
        class: "hover:underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Помощь`);
          } else {
            return [
              createTextVNode("Помощь")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/about/contacts",
        class: "hover:underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Контакты`);
          } else {
            return [
              createTextVNode("Контакты")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></footer></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=default-BP3jKNcY.mjs.map
