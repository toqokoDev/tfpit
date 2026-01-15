import { defineComponent, unref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { Loader2Icon } from 'lucide-vue-next';
import { c as cn } from './server.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Spinner",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Loader2Icon), mergeProps({
        role: "status",
        "aria-label": "Loading",
        class: unref(cn)("size-4 animate-spin", props.class)
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/spinner/Spinner.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_13 = Object.assign(_sfc_main, { __name: "UiSpinner" });

export { __nuxt_component_13 as _ };
//# sourceMappingURL=Spinner-ChFHkN1o.mjs.map
