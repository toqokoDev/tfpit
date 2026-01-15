import { _ as __nuxt_component_0, a as __nuxt_component_3$1, b as __nuxt_component_4, c as __nuxt_component_5, d as __nuxt_component_6, e as __nuxt_component_15 } from './DialogFooter-DZsTWHfU.mjs';
import { defineComponent, ref, computed, mergeProps, unref, withCtx, createVNode, createTextVNode, createBlock, createCommentVNode, openBlock, toDisplayString, Fragment, renderList, renderSlot, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderSlot } from 'vue/server-renderer';
import { DialogTrigger, useForwardPropsEmits, SwitchRoot, SwitchThumb } from 'reka-ui';
import { _ as __nuxt_component_3 } from './Button-B-WuZDFb.mjs';
import { _ as __nuxt_component_7, a as __nuxt_component_9, d as __nuxt_component_10, e as __nuxt_component_12, b as __nuxt_component_16 } from './ProcessingButton-CFDNfXFc.mjs';
import { _ as __nuxt_component_8 } from './Select-C3oCgH1Q.mjs';
import { useVModel, reactiveOmit } from '@vueuse/core';
import { u as useHead, c as cn } from './server.mjs';
import { _ as __nuxt_component_13 } from './Spinner-ChFHkN1o.mjs';
import { _ as __nuxt_component_2 } from './Skeleton-DWaG_MEA.mjs';
import { _ as __nuxt_component_0$1 } from './Card-q7WYGlaG.mjs';
import { _ as __nuxt_component_1$1, a as __nuxt_component_2$1 } from './CardDescription-B_0DNF2Z.mjs';
import { Plus, Upload, ChevronLeft, ChevronRight, Eye, Heart, Globe, Lock, Trash2, Pencil, AlertTriangle } from 'lucide-vue-next';
import { a as portfolioCreateSchema } from '../_/portfolio.mjs';
import { toTypedSchema } from '@vee-validate/zod';
import { Form, Field } from 'vee-validate';
import { toast } from 'vue-sonner';
import { u as useSupabaseClient } from './useSupabaseClient-xv77-Kdn.mjs';
import { u as useCurrentUserStore } from './current-user-h5Lc7er2.mjs';
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
import 'clsx';
import 'tailwind-merge';
import 'zod';

const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "DialogTrigger",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DialogTrigger), mergeProps({ "data-slot": "dialog-trigger" }, props, _attrs), {
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
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/dialog/DialogTrigger.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_1 = Object.assign(_sfc_main$4, { __name: "UiDialogTrigger" });
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "Textarea",
  __ssrInlineRender: true,
  props: {
    class: {},
    defaultValue: {},
    modelValue: {}
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
      _push(`<textarea${ssrRenderAttrs(mergeProps({
        "data-slot": "textarea",
        class: unref(cn)("border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", props.class)
      }, _attrs), "textarea")}>${ssrInterpolate(unref(modelValue))}</textarea>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/textarea/Textarea.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_11 = Object.assign(_sfc_main$3, { __name: "UiTextarea" });
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "Switch",
  __ssrInlineRender: true,
  props: {
    defaultValue: { type: Boolean },
    modelValue: { type: [Boolean, null] },
    disabled: { type: Boolean },
    id: {},
    value: {},
    asChild: { type: Boolean },
    as: {},
    name: {},
    required: { type: Boolean },
    class: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const delegatedProps = reactiveOmit(props, "class");
    const forwarded = useForwardPropsEmits(delegatedProps, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(SwitchRoot), mergeProps({ "data-slot": "switch" }, unref(forwarded), {
        class: unref(cn)(
          "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
          props.class
        )
      }, _attrs), {
        default: withCtx((slotProps, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(SwitchThumb), {
              "data-slot": "switch-thumb",
              class: unref(cn)("bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0")
            }, {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  ssrRenderSlot(_ctx.$slots, "thumb", slotProps, null, _push3, _parent3, _scopeId2);
                } else {
                  return [
                    renderSlot(_ctx.$slots, "thumb", slotProps)
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(SwitchThumb), {
                "data-slot": "switch-thumb",
                class: unref(cn)("bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0")
              }, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "thumb", slotProps)
                ]),
                _: 2
              }, 1032, ["class"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/switch/Switch.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_14 = Object.assign(_sfc_main$2, { __name: "UiSwitch" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Portfolio",
  __ssrInlineRender: true,
  props: {
    category: {},
    description: {},
    image_url: {},
    is_public: { type: Boolean, default: false },
    likes_count: { default: 0 },
    views_count: { default: 0 },
    created_at: {},
    updated_at: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ui_card = __nuxt_component_0$1;
      const _component_ui_card_header = __nuxt_component_1$1;
      const _component_ui_card_description = __nuxt_component_2$1;
      _push(ssrRenderComponent(_component_ui_card, mergeProps({ class: "pt-0 group overflow-hidden transition-all hover:shadow-lg border hover:border-primary/15 cursor-pointer" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-muted/40 to-muted"${_scopeId}><img${ssrRenderAttr("src", props.image_url[0] || "/placeholder.svg")}${ssrRenderAttr("alt", props.category)} class="h-full w-full object-cover transition-transform duration-400 group-hover:scale-[1.03]" loading="lazy"${_scopeId}>`);
            if (props.image_url.length > 1) {
              _push2(`<div class="absolute top-3 right-3 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium"${_scopeId}> +${ssrInterpolate(props.image_url.length - 1)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div class="flex items-center gap-4"${_scopeId}><div class="flex items-center gap-1.5"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Eye), { class: "w-4 h-4" }, null, _parent2, _scopeId));
            _push2(`<span class="text-sm font-medium"${_scopeId}>${ssrInterpolate(props.views_count)}</span></div></div></div></div></div>`);
            _push2(ssrRenderComponent(_component_ui_card_header, { class: "pb-3" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_ui_card_description, { class: "mt-2 line-clamp-2 text-sm" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(props.description)}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(props.description), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_ui_card_description, { class: "mt-2 line-clamp-2 text-sm" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(props.description), 1)
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
              createVNode("div", { class: "relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-muted/40 to-muted" }, [
                createVNode("img", {
                  src: props.image_url[0] || "/placeholder.svg",
                  alt: props.category,
                  class: "h-full w-full object-cover transition-transform duration-400 group-hover:scale-[1.03]",
                  loading: "lazy"
                }, null, 8, ["src", "alt"]),
                props.image_url.length > 1 ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "absolute top-3 right-3 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium"
                }, " +" + toDisplayString(props.image_url.length - 1), 1)) : createCommentVNode("", true),
                createVNode("div", { class: "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white" }, [
                  createVNode("div", { class: "flex items-center justify-between" }, [
                    createVNode("div", { class: "flex items-center gap-4" }, [
                      createVNode("div", { class: "flex items-center gap-1.5" }, [
                        createVNode(unref(Eye), { class: "w-4 h-4" }),
                        createVNode("span", { class: "text-sm font-medium" }, toDisplayString(props.views_count), 1)
                      ])
                    ])
                  ])
                ])
              ]),
              createVNode(_component_ui_card_header, { class: "pb-3" }, {
                default: withCtx(() => [
                  createVNode(_component_ui_card_description, { class: "mt-2 line-clamp-2 text-sm" }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(props.description), 1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/base/Portfolio.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_18 = Object.assign(_sfc_main$1, { __name: "BasePortfolio" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "portfolio",
  __ssrInlineRender: true,
  setup(__props) {
    const PORTFOLIO_CATEGORIES = [
      { label: "Портрет", value: "Портрет" },
      { label: "Свадьба", value: "Свадьба" },
      { label: "Love Story", value: "Love Story" },
      { label: "Семейная фотосессия", value: "Семейная фотосессия" },
      { label: "Детская фотосессия", value: "Детская фотосессия" },
      { label: "Fashion", value: "Fashion" },
      { label: "Коммерческая съемка", value: "Коммерческая съемка" },
      { label: "Студийная съемка", value: "Студийная съемка" },
      { label: "Свадебная прогулка", value: "Свадебная прогулка" },
      { label: "Другое", value: "Другое" }
    ];
    const supabase = useSupabaseClient();
    const userStore = useCurrentUserStore();
    const isAddDialogOpen = ref(false);
    const isViewDialogOpen = ref(false);
    const isEditDialogOpen = ref(false);
    const isCreatingPortfolio = ref(false);
    const isUpdatingPortfolio = ref(false);
    const isDeletingPortfolio = ref(false);
    const isLoadingPortfolio = ref(false);
    const isUploadingImage = ref(false);
    const deletedImageUrls = ref([]);
    const imageInput = ref(null);
    const editImageInput = ref(null);
    const selectedImageFiles = ref([]);
    const previewImageUrls = ref([]);
    const editingPortfolio = ref(null);
    const existingImageUrls = ref([]);
    const portfolio = computed(() => {
      const user = userStore.getUser();
      return user.portfolio || [];
    });
    const selectedPortfolio = ref(null);
    const currentImageIndex = ref(0);
    const editFormInitialValues = computed(() => {
      if (!editingPortfolio.value) {
        return {
          category: "",
          description: "",
          is_public: false
        };
      }
      return {
        category: editingPortfolio.value.category || "",
        description: editingPortfolio.value.description || "",
        is_public: Boolean(editingPortfolio.value.is_public)
      };
    });
    function nextImage() {
      if (selectedPortfolio.value && selectedPortfolio.value.image_url) {
        currentImageIndex.value = (currentImageIndex.value + 1) % selectedPortfolio.value.image_url.length;
      }
    }
    function prevImage() {
      if (selectedPortfolio.value && selectedPortfolio.value.image_url) {
        const length = selectedPortfolio.value.image_url.length;
        currentImageIndex.value = (currentImageIndex.value - 1 + length) % length;
      }
    }
    function formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString("ru-RU", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    }
    async function sharePortfolio() {
      if (!selectedPortfolio.value) return;
      const portfolioUrl = `${(void 0).location.origin}/portfolio/${selectedPortfolio.value.id}`;
      if (!selectedPortfolio.value.is_public) {
        toast.error("Поделиться можно только публичными портфолио");
        return;
      }
      await copyToClipboard(portfolioUrl);
    }
    async function copyToClipboard(text) {
      try {
        await (void 0).clipboard.writeText(text);
        toast.success("Ссылка скопирована в буфер обмена");
      } catch (error) {
        const textArea = (void 0).createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        (void 0).body.appendChild(textArea);
        textArea.select();
        try {
          (void 0).execCommand("copy");
          toast.success("Ссылка скопирована в буфер обмена");
        } catch (err) {
          toast.error("Не удалось скопировать ссылку");
        }
        (void 0).body.removeChild(textArea);
      }
    }
    const handleImageSelect = (event) => {
      const target = event.target;
      const files = Array.from(target.files || []);
      if (files.length === 0) return;
      const maxSize = 10 * 1024 * 1024;
      const validFiles = [];
      const newPreviews = [];
      for (const file of files) {
        if (!file.type.startsWith("image/")) {
          toast.error(`Файл ${file.name} не является изображением`);
          continue;
        }
        if (file.size > maxSize) {
          toast.error(`Файл ${file.name} слишком большой (макс. 10МБ)`);
          continue;
        }
        validFiles.push(file);
        const reader = new FileReader();
        reader.onload = (e) => {
          const url = e.target?.result;
          newPreviews.push({ url, file });
          if (newPreviews.length === validFiles.length) {
            previewImageUrls.value = [...previewImageUrls.value, ...newPreviews];
          }
        };
        reader.readAsDataURL(file);
      }
      selectedImageFiles.value = [...selectedImageFiles.value, ...validFiles];
    };
    const uploadImageToStorage = async (file, userId) => {
      try {
        isUploadingImage.value = true;
        const fileExt = file.name.split(".").pop();
        const fileName = `${userId}-${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `portfolios/${fileName}`;
        const { error: uploadError } = await supabase.storage.from("portfolios").upload(filePath, file, {
          upsert: false
        });
        if (uploadError) throw uploadError;
        const { data: { publicUrl } } = supabase.storage.from("portfolios").getPublicUrl(filePath);
        return publicUrl;
      } finally {
        isUploadingImage.value = false;
      }
    };
    const deleteImageFromStorage = async (imageUrl) => {
      try {
        const url = new URL(imageUrl);
        const pathParts = url.pathname.split("/");
        const bucketIndex = pathParts.findIndex((part) => part === "portfolios");
        if (bucketIndex === -1) {
          return;
        }
        const filePath = pathParts.slice(bucketIndex + 1).join("/");
        if (!filePath) {
          return;
        }
        const cleanPath = filePath.split("?")[0];
        const { error } = await supabase.storage.from("portfolios").remove([cleanPath]);
        if (error) {
          return;
        }
      } catch (error) {
        console.error("Ошибка при удалении изображения:", error);
      }
    };
    const createPortfolio = async (values) => {
      try {
        if (selectedImageFiles.value.length === 0) {
          toast.error("Выберите хотя бы одно изображение");
          return;
        }
        isCreatingPortfolio.value = true;
        const user = userStore.getUser();
        const imageUrls = [];
        for (const file of selectedImageFiles.value) {
          const imageUrl = await uploadImageToStorage(file, user.id);
          imageUrls.push(imageUrl);
        }
        if (imageUrls.length === 0 || !imageUrls[0]) {
          throw new Error("Не удалось загрузить изображения");
        }
        const imageUrlString = imageUrls.join("|");
        const { data: newPortfolio, error } = await supabase.from("portfolios").insert({
          user_id: user.id,
          category: values.category,
          description: values.description,
          image_url: imageUrlString,
          is_public: values.is_public,
          likes_count: 0,
          views_count: 0
        }).select().single();
        if (error) {
          throw error;
        }
        ;
        const portfolioItem = {
          id: newPortfolio.id,
          category: newPortfolio.category,
          description: newPortfolio.description,
          image_url: imageUrls,
          is_public: newPortfolio.is_public,
          likes_count: newPortfolio.likes_count,
          views_count: newPortfolio.views_count,
          created_at: newPortfolio.created_at,
          updated_at: newPortfolio.updated_at
        };
        const currentUser = userStore.getUser();
        const updatedPortfolio = [...currentUser.portfolio || [], portfolioItem];
        userStore.updateUser({ portfolio: updatedPortfolio });
        toast.success("Портфолио успешно добавлено");
        isAddDialogOpen.value = false;
        selectedImageFiles.value = [];
        previewImageUrls.value = [];
        if (imageInput.value) {
          imageInput.value.value = "";
        }
      } catch (error) {
        toast.error(error.message || "Ошибка при создании портфолио");
      } finally {
        isCreatingPortfolio.value = false;
      }
    };
    const handleImageInputClick = () => {
      imageInput.value?.click();
    };
    const handleRemoveImage = (index) => {
      selectedImageFiles.value.splice(index, 1);
      previewImageUrls.value.splice(index, 1);
    };
    const handleRemoveAllImages = () => {
      selectedImageFiles.value = [];
      previewImageUrls.value = [];
      if (imageInput.value) {
        imageInput.value.value = "";
      }
    };
    const handleDialogClose = (open) => {
      isAddDialogOpen.value = open;
      if (!open) {
        handleRemoveAllImages();
      }
    };
    function openEditDialog(item) {
      editingPortfolio.value = item;
      existingImageUrls.value = [...item.image_url];
      previewImageUrls.value = [];
      selectedImageFiles.value = [];
      deletedImageUrls.value = [];
      isViewDialogOpen.value = false;
      isEditDialogOpen.value = true;
    }
    const isDeleteDialogOpen = ref(false);
    const portfolioToDelete = ref(null);
    function openDeleteDialog(item) {
      portfolioToDelete.value = item;
      isDeleteDialogOpen.value = true;
    }
    async function deletePortfolio() {
      if (!portfolioToDelete.value) return;
      try {
        isDeletingPortfolio.value = true;
        if (portfolioToDelete.value.image_url && portfolioToDelete.value.image_url.length > 0) {
          try {
            await Promise.all(
              portfolioToDelete.value.image_url.map((url) => deleteImageFromStorage(url))
            );
          } catch (error2) {
            console.error("Ошибка при удалении изображений:", error2);
          }
        }
        const { error } = await supabase.from("portfolios").delete().eq("id", portfolioToDelete.value.id);
        if (error) throw error;
        const currentUser = userStore.getUser();
        const updatedPortfolio = (currentUser.portfolio || []).filter(
          (item) => item.id !== portfolioToDelete.value.id
        );
        userStore.updateUser({ portfolio: updatedPortfolio });
        toast.success("Портфолио успешно удалено");
        isDeleteDialogOpen.value = false;
        isViewDialogOpen.value = false;
        portfolioToDelete.value = null;
      } catch (error) {
        console.error("Ошибка удаления портфолио:", error);
        toast.error(error.message || "Ошибка при удалении портфолио");
      } finally {
        isDeletingPortfolio.value = false;
      }
    }
    const handleEditDialogClose = (open) => {
      isEditDialogOpen.value = open;
      if (!open) {
        editingPortfolio.value = null;
        existingImageUrls.value = [];
        deletedImageUrls.value = [];
        handleRemoveAllImages();
      }
    };
    const handleRemoveExistingImage = async (index) => {
      const imageUrl = existingImageUrls.value[index];
      if (!imageUrl) return;
      deletedImageUrls.value.push(imageUrl);
      existingImageUrls.value.splice(index, 1);
    };
    const handleEditImageSelect = (event) => {
      handleImageSelect(event);
    };
    const updatePortfolio = async (values) => {
      try {
        if (!editingPortfolio.value) return;
        if (existingImageUrls.value.length === 0 && selectedImageFiles.value.length === 0) {
          toast.error("Выберите хотя бы одно изображение");
          return;
        }
        isUpdatingPortfolio.value = true;
        const user = userStore.getUser();
        let imageUrls = [...existingImageUrls.value];
        if (selectedImageFiles.value.length > 0) {
          const newImageUrls = [];
          for (const file of selectedImageFiles.value) {
            const imageUrl = await uploadImageToStorage(file, user.id);
            newImageUrls.push(imageUrl);
          }
          imageUrls = [...imageUrls, ...newImageUrls];
        }
        if (imageUrls.length === 0 || !imageUrls[0]) {
          throw new Error("Не удалось загрузить изображения");
        }
        if (deletedImageUrls.value.length > 0) {
          try {
            await Promise.all(
              deletedImageUrls.value.map((url) => deleteImageFromStorage(url))
            );
          } catch (error2) {
            console.error("Ошибка при удалении старых изображений:", error2);
          }
        }
        const imageUrlString = imageUrls.join("|");
        const updatePayload = {
          category: values.category,
          description: values.description,
          image_url: imageUrlString,
          is_public: Boolean(values.is_public),
          updated_at: (/* @__PURE__ */ new Date()).toISOString()
        };
        const { data: updatedPortfolio, error } = await supabase.from("portfolios").update(updatePayload).eq("id", editingPortfolio.value.id).select().single();
        if (error) {
          console.error("Supabase update error:", error);
          throw error;
        }
        const portfolioItem = {
          id: updatedPortfolio.id,
          category: updatedPortfolio.category,
          description: updatedPortfolio.description,
          image_url: imageUrls,
          is_public: updatedPortfolio.is_public,
          likes_count: updatedPortfolio.likes_count,
          views_count: updatedPortfolio.views_count,
          created_at: updatedPortfolio.created_at,
          updated_at: updatedPortfolio.updated_at
        };
        const currentUser = userStore.getUser();
        const updatedPortfolioList = (currentUser.portfolio || []).map(
          (item) => item.id === editingPortfolio.value.id ? portfolioItem : item
        );
        userStore.updateUser({ portfolio: updatedPortfolioList });
        toast.success("Портфолио успешно обновлено");
        isEditDialogOpen.value = false;
        editingPortfolio.value = null;
        existingImageUrls.value = [];
        selectedImageFiles.value = [];
        previewImageUrls.value = [];
        if (editImageInput.value) editImageInput.value.value = "";
      } catch (error) {
        toast.error(error.message || "Ошибка при обновлении портфолио");
      } finally {
        isUpdatingPortfolio.value = false;
      }
    };
    useHead({ title: "Портфолио" });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ui_dialog = __nuxt_component_0;
      const _component_ui_dialog_trigger = __nuxt_component_1;
      const _component_ui_button = __nuxt_component_3;
      const _component_ui_dialog_content = __nuxt_component_3$1;
      const _component_ui_dialog_header = __nuxt_component_4;
      const _component_ui_dialog_title = __nuxt_component_5;
      const _component_ui_dialog_description = __nuxt_component_6;
      const _component_ui_field_group = __nuxt_component_7;
      const _component_base_select = __nuxt_component_8;
      const _component_ui_field = __nuxt_component_9;
      const _component_ui_field_label = __nuxt_component_10;
      const _component_ui_textarea = __nuxt_component_11;
      const _component_ui_field_error = __nuxt_component_12;
      const _component_ui_spinner = __nuxt_component_13;
      const _component_ui_switch = __nuxt_component_14;
      const _component_ui_dialog_footer = __nuxt_component_15;
      const _component_base_processing_button = __nuxt_component_16;
      const _component_ui_skeleton = __nuxt_component_2;
      const _component_base_portfolio = __nuxt_component_18;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container mx-auto px-4 py-8" }, _attrs))}><div class="mb-6 flex items-center justify-between"><div><h1 class="text-3xl font-bold">Моё портфолио</h1><p class="text-muted-foreground mt-1 text-sm"> Управляйте своими работами </p></div>`);
      _push(ssrRenderComponent(_component_ui_dialog, {
        open: unref(isAddDialogOpen),
        "onUpdate:open": handleDialogClose
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_ui_dialog_trigger, { "as-child": "" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_ui_button, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Plus), { class: "w-4 h-4" }, null, _parent4, _scopeId3));
                        _push4(` Добавить работу `);
                      } else {
                        return [
                          createVNode(unref(Plus), { class: "w-4 h-4" }),
                          createTextVNode(" Добавить работу ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_ui_button, null, {
                      default: withCtx(() => [
                        createVNode(unref(Plus), { class: "w-4 h-4" }),
                        createTextVNode(" Добавить работу ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_ui_dialog_content, { class: "sm:max-w-2xl" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_ui_dialog_header, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_ui_dialog_title, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Добавить работу в портфолио`);
                            } else {
                              return [
                                createTextVNode("Добавить работу в портфолио")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_ui_dialog_description, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Заполните информацию о вашей работе `);
                            } else {
                              return [
                                createTextVNode(" Заполните информацию о вашей работе ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_ui_dialog_title, null, {
                            default: withCtx(() => [
                              createTextVNode("Добавить работу в портфолио")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_ui_dialog_description, null, {
                            default: withCtx(() => [
                              createTextVNode(" Заполните информацию о вашей работе ")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  if (unref(isAddDialogOpen)) {
                    _push3(ssrRenderComponent(unref(Form), {
                      "validation-schema": unref(toTypedSchema)("portfolioCreateSchema" in _ctx ? _ctx.portfolioCreateSchema : unref(portfolioCreateSchema)),
                      "initial-values": { category: "", description: "", is_public: false },
                      onSubmit: createPortfolio
                    }, {
                      default: withCtx(({ resetForm: resetFormFn }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_ui_field_group, { class: "py-4" }, {
                            default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_base_select, {
                                  name: "category",
                                  label: "Категория",
                                  placeholder: "Выберите категорию",
                                  options: PORTFOLIO_CATEGORIES,
                                  "errors-to-show": "all"
                                }, null, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(unref(Field), { name: "description" }, {
                                  default: withCtx(({ field, errors }, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(_component_ui_field, {
                                        "data-invalid": !!errors.length
                                      }, {
                                        default: withCtx((_4, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(_component_ui_field_label, { for: "description" }, {
                                              default: withCtx((_5, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(` Описание `);
                                                } else {
                                                  return [
                                                    createTextVNode(" Описание ")
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(_component_ui_textarea, mergeProps({
                                              id: "description",
                                              placeholder: "Опишите вашу работу",
                                              "aria-invalid": !!errors.length
                                            }, field), null, _parent7, _scopeId6));
                                            if (errors.length) {
                                              _push7(ssrRenderComponent(_component_ui_field_error, { errors }, null, _parent7, _scopeId6));
                                            } else {
                                              _push7(`<!---->`);
                                            }
                                          } else {
                                            return [
                                              createVNode(_component_ui_field_label, { for: "description" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(" Описание ")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_ui_textarea, mergeProps({
                                                id: "description",
                                                placeholder: "Опишите вашу работу",
                                                "aria-invalid": !!errors.length
                                              }, field), null, 16, ["aria-invalid"]),
                                              errors.length ? (openBlock(), createBlock(_component_ui_field_error, {
                                                key: 0,
                                                errors
                                              }, null, 8, ["errors"])) : createCommentVNode("", true)
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(_component_ui_field, {
                                          "data-invalid": !!errors.length
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(_component_ui_field_label, { for: "description" }, {
                                              default: withCtx(() => [
                                                createTextVNode(" Описание ")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_ui_textarea, mergeProps({
                                              id: "description",
                                              placeholder: "Опишите вашу работу",
                                              "aria-invalid": !!errors.length
                                            }, field), null, 16, ["aria-invalid"]),
                                            errors.length ? (openBlock(), createBlock(_component_ui_field_error, {
                                              key: 0,
                                              errors
                                            }, null, 8, ["errors"])) : createCommentVNode("", true)
                                          ]),
                                          _: 2
                                        }, 1032, ["data-invalid"])
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(unref(Field), { name: "image_file" }, {
                                  default: withCtx(({ errors }, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(_component_ui_field, {
                                        "data-invalid": !!errors.length
                                      }, {
                                        default: withCtx((_4, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(_component_ui_field_label, null, {
                                              default: withCtx((_5, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(` Изображения `);
                                                } else {
                                                  return [
                                                    createTextVNode(" Изображения ")
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(`<div class="space-y-4"${_scopeId6}>`);
                                            if (unref(previewImageUrls).length > 0) {
                                              _push7(`<div class="grid grid-cols-4 gap-2"${_scopeId6}><!--[-->`);
                                              ssrRenderList(unref(previewImageUrls), (preview, index) => {
                                                _push7(`<div class="relative aspect-square w-full overflow-hidden rounded-lg bg-muted"${_scopeId6}><img${ssrRenderAttr("src", preview.url)}${ssrRenderAttr("alt", `Превью ${index + 1}`)} class="h-full w-full object-cover"${_scopeId6}><button type="button" class="absolute right-1 top-1 rounded-full bg-destructive p-1 text-destructive-foreground hover:bg-destructive/90"${_scopeId6}><svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId6}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"${_scopeId6}></path></svg></button></div>`);
                                              });
                                              _push7(`<!--]--></div>`);
                                            } else {
                                              _push7(`<!---->`);
                                            }
                                            _push7(`<div${_scopeId6}><input type="file" accept="image/*" multiple class="hidden"${_scopeId6}>`);
                                            _push7(ssrRenderComponent(_component_ui_button, {
                                              type: "button",
                                              variant: "outline",
                                              disabled: unref(isUploadingImage),
                                              onClick: handleImageInputClick,
                                              class: "w-full"
                                            }, {
                                              default: withCtx((_5, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  if (!unref(isUploadingImage)) {
                                                    _push8(ssrRenderComponent(unref(Upload), { class: "mr-2 h-4 w-4" }, null, _parent8, _scopeId7));
                                                  } else {
                                                    _push8(ssrRenderComponent(_component_ui_spinner, {
                                                      size: "sm",
                                                      class: "mr-2"
                                                    }, null, _parent8, _scopeId7));
                                                  }
                                                  _push8(` ${ssrInterpolate(unref(isUploadingImage) ? "Загрузка..." : unref(selectedImageFiles).length > 0 ? `Добавить ещё (${unref(selectedImageFiles).length} выбрано)` : "Выбрать изображения")}`);
                                                } else {
                                                  return [
                                                    !unref(isUploadingImage) ? (openBlock(), createBlock(unref(Upload), {
                                                      key: 0,
                                                      class: "mr-2 h-4 w-4"
                                                    })) : (openBlock(), createBlock(_component_ui_spinner, {
                                                      key: 1,
                                                      size: "sm",
                                                      class: "mr-2"
                                                    })),
                                                    createTextVNode(" " + toDisplayString(unref(isUploadingImage) ? "Загрузка..." : unref(selectedImageFiles).length > 0 ? `Добавить ещё (${unref(selectedImageFiles).length} выбрано)` : "Выбрать изображения"), 1)
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(`<p class="mt-1 text-xs text-muted-foreground"${_scopeId6}> Поддерживаемые форматы: JPG, PNG, GIF. Максимальный размер файла: 10МБ </p></div></div>`);
                                            if (errors.length) {
                                              _push7(ssrRenderComponent(_component_ui_field_error, { errors }, null, _parent7, _scopeId6));
                                            } else {
                                              _push7(`<!---->`);
                                            }
                                          } else {
                                            return [
                                              createVNode(_component_ui_field_label, null, {
                                                default: withCtx(() => [
                                                  createTextVNode(" Изображения ")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode("div", { class: "space-y-4" }, [
                                                unref(previewImageUrls).length > 0 ? (openBlock(), createBlock("div", {
                                                  key: 0,
                                                  class: "grid grid-cols-4 gap-2"
                                                }, [
                                                  (openBlock(true), createBlock(Fragment, null, renderList(unref(previewImageUrls), (preview, index) => {
                                                    return openBlock(), createBlock("div", {
                                                      key: index,
                                                      class: "relative aspect-square w-full overflow-hidden rounded-lg bg-muted"
                                                    }, [
                                                      createVNode("img", {
                                                        src: preview.url,
                                                        alt: `Превью ${index + 1}`,
                                                        class: "h-full w-full object-cover"
                                                      }, null, 8, ["src", "alt"]),
                                                      createVNode("button", {
                                                        type: "button",
                                                        onClick: () => handleRemoveImage(index),
                                                        class: "absolute right-1 top-1 rounded-full bg-destructive p-1 text-destructive-foreground hover:bg-destructive/90"
                                                      }, [
                                                        (openBlock(), createBlock("svg", {
                                                          class: "h-3 w-3",
                                                          fill: "none",
                                                          stroke: "currentColor",
                                                          viewBox: "0 0 24 24"
                                                        }, [
                                                          createVNode("path", {
                                                            "stroke-linecap": "round",
                                                            "stroke-linejoin": "round",
                                                            "stroke-width": "2",
                                                            d: "M6 18L18 6M6 6l12 12"
                                                          })
                                                        ]))
                                                      ], 8, ["onClick"])
                                                    ]);
                                                  }), 128))
                                                ])) : createCommentVNode("", true),
                                                createVNode("div", null, [
                                                  createVNode("input", {
                                                    ref_key: "imageInput",
                                                    ref: imageInput,
                                                    type: "file",
                                                    accept: "image/*",
                                                    multiple: "",
                                                    class: "hidden",
                                                    onChange: handleImageSelect
                                                  }, null, 544),
                                                  createVNode(_component_ui_button, {
                                                    type: "button",
                                                    variant: "outline",
                                                    disabled: unref(isUploadingImage),
                                                    onClick: handleImageInputClick,
                                                    class: "w-full"
                                                  }, {
                                                    default: withCtx(() => [
                                                      !unref(isUploadingImage) ? (openBlock(), createBlock(unref(Upload), {
                                                        key: 0,
                                                        class: "mr-2 h-4 w-4"
                                                      })) : (openBlock(), createBlock(_component_ui_spinner, {
                                                        key: 1,
                                                        size: "sm",
                                                        class: "mr-2"
                                                      })),
                                                      createTextVNode(" " + toDisplayString(unref(isUploadingImage) ? "Загрузка..." : unref(selectedImageFiles).length > 0 ? `Добавить ещё (${unref(selectedImageFiles).length} выбрано)` : "Выбрать изображения"), 1)
                                                    ]),
                                                    _: 1
                                                  }, 8, ["disabled"]),
                                                  createVNode("p", { class: "mt-1 text-xs text-muted-foreground" }, " Поддерживаемые форматы: JPG, PNG, GIF. Максимальный размер файла: 10МБ ")
                                                ])
                                              ]),
                                              errors.length ? (openBlock(), createBlock(_component_ui_field_error, {
                                                key: 0,
                                                errors
                                              }, null, 8, ["errors"])) : createCommentVNode("", true)
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(_component_ui_field, {
                                          "data-invalid": !!errors.length
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(_component_ui_field_label, null, {
                                              default: withCtx(() => [
                                                createTextVNode(" Изображения ")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode("div", { class: "space-y-4" }, [
                                              unref(previewImageUrls).length > 0 ? (openBlock(), createBlock("div", {
                                                key: 0,
                                                class: "grid grid-cols-4 gap-2"
                                              }, [
                                                (openBlock(true), createBlock(Fragment, null, renderList(unref(previewImageUrls), (preview, index) => {
                                                  return openBlock(), createBlock("div", {
                                                    key: index,
                                                    class: "relative aspect-square w-full overflow-hidden rounded-lg bg-muted"
                                                  }, [
                                                    createVNode("img", {
                                                      src: preview.url,
                                                      alt: `Превью ${index + 1}`,
                                                      class: "h-full w-full object-cover"
                                                    }, null, 8, ["src", "alt"]),
                                                    createVNode("button", {
                                                      type: "button",
                                                      onClick: () => handleRemoveImage(index),
                                                      class: "absolute right-1 top-1 rounded-full bg-destructive p-1 text-destructive-foreground hover:bg-destructive/90"
                                                    }, [
                                                      (openBlock(), createBlock("svg", {
                                                        class: "h-3 w-3",
                                                        fill: "none",
                                                        stroke: "currentColor",
                                                        viewBox: "0 0 24 24"
                                                      }, [
                                                        createVNode("path", {
                                                          "stroke-linecap": "round",
                                                          "stroke-linejoin": "round",
                                                          "stroke-width": "2",
                                                          d: "M6 18L18 6M6 6l12 12"
                                                        })
                                                      ]))
                                                    ], 8, ["onClick"])
                                                  ]);
                                                }), 128))
                                              ])) : createCommentVNode("", true),
                                              createVNode("div", null, [
                                                createVNode("input", {
                                                  ref_key: "imageInput",
                                                  ref: imageInput,
                                                  type: "file",
                                                  accept: "image/*",
                                                  multiple: "",
                                                  class: "hidden",
                                                  onChange: handleImageSelect
                                                }, null, 544),
                                                createVNode(_component_ui_button, {
                                                  type: "button",
                                                  variant: "outline",
                                                  disabled: unref(isUploadingImage),
                                                  onClick: handleImageInputClick,
                                                  class: "w-full"
                                                }, {
                                                  default: withCtx(() => [
                                                    !unref(isUploadingImage) ? (openBlock(), createBlock(unref(Upload), {
                                                      key: 0,
                                                      class: "mr-2 h-4 w-4"
                                                    })) : (openBlock(), createBlock(_component_ui_spinner, {
                                                      key: 1,
                                                      size: "sm",
                                                      class: "mr-2"
                                                    })),
                                                    createTextVNode(" " + toDisplayString(unref(isUploadingImage) ? "Загрузка..." : unref(selectedImageFiles).length > 0 ? `Добавить ещё (${unref(selectedImageFiles).length} выбрано)` : "Выбрать изображения"), 1)
                                                  ]),
                                                  _: 1
                                                }, 8, ["disabled"]),
                                                createVNode("p", { class: "mt-1 text-xs text-muted-foreground" }, " Поддерживаемые форматы: JPG, PNG, GIF. Максимальный размер файла: 10МБ ")
                                              ])
                                            ]),
                                            errors.length ? (openBlock(), createBlock(_component_ui_field_error, {
                                              key: 0,
                                              errors
                                            }, null, 8, ["errors"])) : createCommentVNode("", true)
                                          ]),
                                          _: 2
                                        }, 1032, ["data-invalid"])
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(unref(Field), { name: "is_public" }, {
                                  default: withCtx(({ field, errors, setValue }, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(_component_ui_field, {
                                        "data-invalid": !!errors.length,
                                        orientation: "horizontal"
                                      }, {
                                        default: withCtx((_4, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(_component_ui_field_label, {
                                              for: "is_public",
                                              class: "cursor-pointer flex-1"
                                            }, {
                                              default: withCtx((_5, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(` Сделать публичным `);
                                                } else {
                                                  return [
                                                    createTextVNode(" Сделать публичным ")
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(_component_ui_switch, {
                                              id: "is_public",
                                              checked: Boolean(field.value),
                                              "onUpdate:modelValue": setValue
                                            }, null, _parent7, _scopeId6));
                                            if (errors.length) {
                                              _push7(ssrRenderComponent(_component_ui_field_error, { errors }, null, _parent7, _scopeId6));
                                            } else {
                                              _push7(`<!---->`);
                                            }
                                          } else {
                                            return [
                                              createVNode(_component_ui_field_label, {
                                                for: "is_public",
                                                class: "cursor-pointer flex-1"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(" Сделать публичным ")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_ui_switch, {
                                                id: "is_public",
                                                checked: Boolean(field.value),
                                                "onUpdate:modelValue": setValue
                                              }, null, 8, ["checked", "onUpdate:modelValue"]),
                                              errors.length ? (openBlock(), createBlock(_component_ui_field_error, {
                                                key: 0,
                                                errors
                                              }, null, 8, ["errors"])) : createCommentVNode("", true)
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(_component_ui_field, {
                                          "data-invalid": !!errors.length,
                                          orientation: "horizontal"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(_component_ui_field_label, {
                                              for: "is_public",
                                              class: "cursor-pointer flex-1"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(" Сделать публичным ")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_ui_switch, {
                                              id: "is_public",
                                              checked: Boolean(field.value),
                                              "onUpdate:modelValue": setValue
                                            }, null, 8, ["checked", "onUpdate:modelValue"]),
                                            errors.length ? (openBlock(), createBlock(_component_ui_field_error, {
                                              key: 0,
                                              errors
                                            }, null, 8, ["errors"])) : createCommentVNode("", true)
                                          ]),
                                          _: 2
                                        }, 1032, ["data-invalid"])
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_base_select, {
                                    name: "category",
                                    label: "Категория",
                                    placeholder: "Выберите категорию",
                                    options: PORTFOLIO_CATEGORIES,
                                    "errors-to-show": "all"
                                  }),
                                  createVNode(unref(Field), { name: "description" }, {
                                    default: withCtx(({ field, errors }) => [
                                      createVNode(_component_ui_field, {
                                        "data-invalid": !!errors.length
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_component_ui_field_label, { for: "description" }, {
                                            default: withCtx(() => [
                                              createTextVNode(" Описание ")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_ui_textarea, mergeProps({
                                            id: "description",
                                            placeholder: "Опишите вашу работу",
                                            "aria-invalid": !!errors.length
                                          }, field), null, 16, ["aria-invalid"]),
                                          errors.length ? (openBlock(), createBlock(_component_ui_field_error, {
                                            key: 0,
                                            errors
                                          }, null, 8, ["errors"])) : createCommentVNode("", true)
                                        ]),
                                        _: 2
                                      }, 1032, ["data-invalid"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(Field), { name: "image_file" }, {
                                    default: withCtx(({ errors }) => [
                                      createVNode(_component_ui_field, {
                                        "data-invalid": !!errors.length
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_component_ui_field_label, null, {
                                            default: withCtx(() => [
                                              createTextVNode(" Изображения ")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode("div", { class: "space-y-4" }, [
                                            unref(previewImageUrls).length > 0 ? (openBlock(), createBlock("div", {
                                              key: 0,
                                              class: "grid grid-cols-4 gap-2"
                                            }, [
                                              (openBlock(true), createBlock(Fragment, null, renderList(unref(previewImageUrls), (preview, index) => {
                                                return openBlock(), createBlock("div", {
                                                  key: index,
                                                  class: "relative aspect-square w-full overflow-hidden rounded-lg bg-muted"
                                                }, [
                                                  createVNode("img", {
                                                    src: preview.url,
                                                    alt: `Превью ${index + 1}`,
                                                    class: "h-full w-full object-cover"
                                                  }, null, 8, ["src", "alt"]),
                                                  createVNode("button", {
                                                    type: "button",
                                                    onClick: () => handleRemoveImage(index),
                                                    class: "absolute right-1 top-1 rounded-full bg-destructive p-1 text-destructive-foreground hover:bg-destructive/90"
                                                  }, [
                                                    (openBlock(), createBlock("svg", {
                                                      class: "h-3 w-3",
                                                      fill: "none",
                                                      stroke: "currentColor",
                                                      viewBox: "0 0 24 24"
                                                    }, [
                                                      createVNode("path", {
                                                        "stroke-linecap": "round",
                                                        "stroke-linejoin": "round",
                                                        "stroke-width": "2",
                                                        d: "M6 18L18 6M6 6l12 12"
                                                      })
                                                    ]))
                                                  ], 8, ["onClick"])
                                                ]);
                                              }), 128))
                                            ])) : createCommentVNode("", true),
                                            createVNode("div", null, [
                                              createVNode("input", {
                                                ref_key: "imageInput",
                                                ref: imageInput,
                                                type: "file",
                                                accept: "image/*",
                                                multiple: "",
                                                class: "hidden",
                                                onChange: handleImageSelect
                                              }, null, 544),
                                              createVNode(_component_ui_button, {
                                                type: "button",
                                                variant: "outline",
                                                disabled: unref(isUploadingImage),
                                                onClick: handleImageInputClick,
                                                class: "w-full"
                                              }, {
                                                default: withCtx(() => [
                                                  !unref(isUploadingImage) ? (openBlock(), createBlock(unref(Upload), {
                                                    key: 0,
                                                    class: "mr-2 h-4 w-4"
                                                  })) : (openBlock(), createBlock(_component_ui_spinner, {
                                                    key: 1,
                                                    size: "sm",
                                                    class: "mr-2"
                                                  })),
                                                  createTextVNode(" " + toDisplayString(unref(isUploadingImage) ? "Загрузка..." : unref(selectedImageFiles).length > 0 ? `Добавить ещё (${unref(selectedImageFiles).length} выбрано)` : "Выбрать изображения"), 1)
                                                ]),
                                                _: 1
                                              }, 8, ["disabled"]),
                                              createVNode("p", { class: "mt-1 text-xs text-muted-foreground" }, " Поддерживаемые форматы: JPG, PNG, GIF. Максимальный размер файла: 10МБ ")
                                            ])
                                          ]),
                                          errors.length ? (openBlock(), createBlock(_component_ui_field_error, {
                                            key: 0,
                                            errors
                                          }, null, 8, ["errors"])) : createCommentVNode("", true)
                                        ]),
                                        _: 2
                                      }, 1032, ["data-invalid"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(Field), { name: "is_public" }, {
                                    default: withCtx(({ field, errors, setValue }) => [
                                      createVNode(_component_ui_field, {
                                        "data-invalid": !!errors.length,
                                        orientation: "horizontal"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_component_ui_field_label, {
                                            for: "is_public",
                                            class: "cursor-pointer flex-1"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(" Сделать публичным ")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_ui_switch, {
                                            id: "is_public",
                                            checked: Boolean(field.value),
                                            "onUpdate:modelValue": setValue
                                          }, null, 8, ["checked", "onUpdate:modelValue"]),
                                          errors.length ? (openBlock(), createBlock(_component_ui_field_error, {
                                            key: 0,
                                            errors
                                          }, null, 8, ["errors"])) : createCommentVNode("", true)
                                        ]),
                                        _: 2
                                      }, 1032, ["data-invalid"])
                                    ]),
                                    _: 1
                                  })
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_ui_dialog_footer, null, {
                            default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_ui_button, {
                                  type: "button",
                                  variant: "outline",
                                  onClick: ($event) => isAddDialogOpen.value = false,
                                  disabled: unref(isCreatingPortfolio)
                                }, {
                                  default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(` Отмена `);
                                    } else {
                                      return [
                                        createTextVNode(" Отмена ")
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(_component_base_processing_button, {
                                  type: "submit",
                                  label: "Добавить",
                                  "is-processing": unref(isCreatingPortfolio)
                                }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_ui_button, {
                                    type: "button",
                                    variant: "outline",
                                    onClick: ($event) => isAddDialogOpen.value = false,
                                    disabled: unref(isCreatingPortfolio)
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Отмена ")
                                    ]),
                                    _: 1
                                  }, 8, ["onClick", "disabled"]),
                                  createVNode(_component_base_processing_button, {
                                    type: "submit",
                                    label: "Добавить",
                                    "is-processing": unref(isCreatingPortfolio)
                                  }, null, 8, ["is-processing"])
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_ui_field_group, { class: "py-4" }, {
                              default: withCtx(() => [
                                createVNode(_component_base_select, {
                                  name: "category",
                                  label: "Категория",
                                  placeholder: "Выберите категорию",
                                  options: PORTFOLIO_CATEGORIES,
                                  "errors-to-show": "all"
                                }),
                                createVNode(unref(Field), { name: "description" }, {
                                  default: withCtx(({ field, errors }) => [
                                    createVNode(_component_ui_field, {
                                      "data-invalid": !!errors.length
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_ui_field_label, { for: "description" }, {
                                          default: withCtx(() => [
                                            createTextVNode(" Описание ")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_ui_textarea, mergeProps({
                                          id: "description",
                                          placeholder: "Опишите вашу работу",
                                          "aria-invalid": !!errors.length
                                        }, field), null, 16, ["aria-invalid"]),
                                        errors.length ? (openBlock(), createBlock(_component_ui_field_error, {
                                          key: 0,
                                          errors
                                        }, null, 8, ["errors"])) : createCommentVNode("", true)
                                      ]),
                                      _: 2
                                    }, 1032, ["data-invalid"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(Field), { name: "image_file" }, {
                                  default: withCtx(({ errors }) => [
                                    createVNode(_component_ui_field, {
                                      "data-invalid": !!errors.length
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_ui_field_label, null, {
                                          default: withCtx(() => [
                                            createTextVNode(" Изображения ")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode("div", { class: "space-y-4" }, [
                                          unref(previewImageUrls).length > 0 ? (openBlock(), createBlock("div", {
                                            key: 0,
                                            class: "grid grid-cols-4 gap-2"
                                          }, [
                                            (openBlock(true), createBlock(Fragment, null, renderList(unref(previewImageUrls), (preview, index) => {
                                              return openBlock(), createBlock("div", {
                                                key: index,
                                                class: "relative aspect-square w-full overflow-hidden rounded-lg bg-muted"
                                              }, [
                                                createVNode("img", {
                                                  src: preview.url,
                                                  alt: `Превью ${index + 1}`,
                                                  class: "h-full w-full object-cover"
                                                }, null, 8, ["src", "alt"]),
                                                createVNode("button", {
                                                  type: "button",
                                                  onClick: () => handleRemoveImage(index),
                                                  class: "absolute right-1 top-1 rounded-full bg-destructive p-1 text-destructive-foreground hover:bg-destructive/90"
                                                }, [
                                                  (openBlock(), createBlock("svg", {
                                                    class: "h-3 w-3",
                                                    fill: "none",
                                                    stroke: "currentColor",
                                                    viewBox: "0 0 24 24"
                                                  }, [
                                                    createVNode("path", {
                                                      "stroke-linecap": "round",
                                                      "stroke-linejoin": "round",
                                                      "stroke-width": "2",
                                                      d: "M6 18L18 6M6 6l12 12"
                                                    })
                                                  ]))
                                                ], 8, ["onClick"])
                                              ]);
                                            }), 128))
                                          ])) : createCommentVNode("", true),
                                          createVNode("div", null, [
                                            createVNode("input", {
                                              ref_key: "imageInput",
                                              ref: imageInput,
                                              type: "file",
                                              accept: "image/*",
                                              multiple: "",
                                              class: "hidden",
                                              onChange: handleImageSelect
                                            }, null, 544),
                                            createVNode(_component_ui_button, {
                                              type: "button",
                                              variant: "outline",
                                              disabled: unref(isUploadingImage),
                                              onClick: handleImageInputClick,
                                              class: "w-full"
                                            }, {
                                              default: withCtx(() => [
                                                !unref(isUploadingImage) ? (openBlock(), createBlock(unref(Upload), {
                                                  key: 0,
                                                  class: "mr-2 h-4 w-4"
                                                })) : (openBlock(), createBlock(_component_ui_spinner, {
                                                  key: 1,
                                                  size: "sm",
                                                  class: "mr-2"
                                                })),
                                                createTextVNode(" " + toDisplayString(unref(isUploadingImage) ? "Загрузка..." : unref(selectedImageFiles).length > 0 ? `Добавить ещё (${unref(selectedImageFiles).length} выбрано)` : "Выбрать изображения"), 1)
                                              ]),
                                              _: 1
                                            }, 8, ["disabled"]),
                                            createVNode("p", { class: "mt-1 text-xs text-muted-foreground" }, " Поддерживаемые форматы: JPG, PNG, GIF. Максимальный размер файла: 10МБ ")
                                          ])
                                        ]),
                                        errors.length ? (openBlock(), createBlock(_component_ui_field_error, {
                                          key: 0,
                                          errors
                                        }, null, 8, ["errors"])) : createCommentVNode("", true)
                                      ]),
                                      _: 2
                                    }, 1032, ["data-invalid"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(Field), { name: "is_public" }, {
                                  default: withCtx(({ field, errors, setValue }) => [
                                    createVNode(_component_ui_field, {
                                      "data-invalid": !!errors.length,
                                      orientation: "horizontal"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_ui_field_label, {
                                          for: "is_public",
                                          class: "cursor-pointer flex-1"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(" Сделать публичным ")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_ui_switch, {
                                          id: "is_public",
                                          checked: Boolean(field.value),
                                          "onUpdate:modelValue": setValue
                                        }, null, 8, ["checked", "onUpdate:modelValue"]),
                                        errors.length ? (openBlock(), createBlock(_component_ui_field_error, {
                                          key: 0,
                                          errors
                                        }, null, 8, ["errors"])) : createCommentVNode("", true)
                                      ]),
                                      _: 2
                                    }, 1032, ["data-invalid"])
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(_component_ui_dialog_footer, null, {
                              default: withCtx(() => [
                                createVNode(_component_ui_button, {
                                  type: "button",
                                  variant: "outline",
                                  onClick: ($event) => isAddDialogOpen.value = false,
                                  disabled: unref(isCreatingPortfolio)
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Отмена ")
                                  ]),
                                  _: 1
                                }, 8, ["onClick", "disabled"]),
                                createVNode(_component_base_processing_button, {
                                  type: "submit",
                                  label: "Добавить",
                                  "is-processing": unref(isCreatingPortfolio)
                                }, null, 8, ["is-processing"])
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    createVNode(_component_ui_dialog_header, null, {
                      default: withCtx(() => [
                        createVNode(_component_ui_dialog_title, null, {
                          default: withCtx(() => [
                            createTextVNode("Добавить работу в портфолио")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_ui_dialog_description, null, {
                          default: withCtx(() => [
                            createTextVNode(" Заполните информацию о вашей работе ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    unref(isAddDialogOpen) ? (openBlock(), createBlock(unref(Form), {
                      key: 0,
                      "validation-schema": unref(toTypedSchema)("portfolioCreateSchema" in _ctx ? _ctx.portfolioCreateSchema : unref(portfolioCreateSchema)),
                      "initial-values": { category: "", description: "", is_public: false },
                      onSubmit: createPortfolio
                    }, {
                      default: withCtx(({ resetForm: resetFormFn }) => [
                        createVNode(_component_ui_field_group, { class: "py-4" }, {
                          default: withCtx(() => [
                            createVNode(_component_base_select, {
                              name: "category",
                              label: "Категория",
                              placeholder: "Выберите категорию",
                              options: PORTFOLIO_CATEGORIES,
                              "errors-to-show": "all"
                            }),
                            createVNode(unref(Field), { name: "description" }, {
                              default: withCtx(({ field, errors }) => [
                                createVNode(_component_ui_field, {
                                  "data-invalid": !!errors.length
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_ui_field_label, { for: "description" }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Описание ")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_ui_textarea, mergeProps({
                                      id: "description",
                                      placeholder: "Опишите вашу работу",
                                      "aria-invalid": !!errors.length
                                    }, field), null, 16, ["aria-invalid"]),
                                    errors.length ? (openBlock(), createBlock(_component_ui_field_error, {
                                      key: 0,
                                      errors
                                    }, null, 8, ["errors"])) : createCommentVNode("", true)
                                  ]),
                                  _: 2
                                }, 1032, ["data-invalid"])
                              ]),
                              _: 1
                            }),
                            createVNode(unref(Field), { name: "image_file" }, {
                              default: withCtx(({ errors }) => [
                                createVNode(_component_ui_field, {
                                  "data-invalid": !!errors.length
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_ui_field_label, null, {
                                      default: withCtx(() => [
                                        createTextVNode(" Изображения ")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode("div", { class: "space-y-4" }, [
                                      unref(previewImageUrls).length > 0 ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "grid grid-cols-4 gap-2"
                                      }, [
                                        (openBlock(true), createBlock(Fragment, null, renderList(unref(previewImageUrls), (preview, index) => {
                                          return openBlock(), createBlock("div", {
                                            key: index,
                                            class: "relative aspect-square w-full overflow-hidden rounded-lg bg-muted"
                                          }, [
                                            createVNode("img", {
                                              src: preview.url,
                                              alt: `Превью ${index + 1}`,
                                              class: "h-full w-full object-cover"
                                            }, null, 8, ["src", "alt"]),
                                            createVNode("button", {
                                              type: "button",
                                              onClick: () => handleRemoveImage(index),
                                              class: "absolute right-1 top-1 rounded-full bg-destructive p-1 text-destructive-foreground hover:bg-destructive/90"
                                            }, [
                                              (openBlock(), createBlock("svg", {
                                                class: "h-3 w-3",
                                                fill: "none",
                                                stroke: "currentColor",
                                                viewBox: "0 0 24 24"
                                              }, [
                                                createVNode("path", {
                                                  "stroke-linecap": "round",
                                                  "stroke-linejoin": "round",
                                                  "stroke-width": "2",
                                                  d: "M6 18L18 6M6 6l12 12"
                                                })
                                              ]))
                                            ], 8, ["onClick"])
                                          ]);
                                        }), 128))
                                      ])) : createCommentVNode("", true),
                                      createVNode("div", null, [
                                        createVNode("input", {
                                          ref_key: "imageInput",
                                          ref: imageInput,
                                          type: "file",
                                          accept: "image/*",
                                          multiple: "",
                                          class: "hidden",
                                          onChange: handleImageSelect
                                        }, null, 544),
                                        createVNode(_component_ui_button, {
                                          type: "button",
                                          variant: "outline",
                                          disabled: unref(isUploadingImage),
                                          onClick: handleImageInputClick,
                                          class: "w-full"
                                        }, {
                                          default: withCtx(() => [
                                            !unref(isUploadingImage) ? (openBlock(), createBlock(unref(Upload), {
                                              key: 0,
                                              class: "mr-2 h-4 w-4"
                                            })) : (openBlock(), createBlock(_component_ui_spinner, {
                                              key: 1,
                                              size: "sm",
                                              class: "mr-2"
                                            })),
                                            createTextVNode(" " + toDisplayString(unref(isUploadingImage) ? "Загрузка..." : unref(selectedImageFiles).length > 0 ? `Добавить ещё (${unref(selectedImageFiles).length} выбрано)` : "Выбрать изображения"), 1)
                                          ]),
                                          _: 1
                                        }, 8, ["disabled"]),
                                        createVNode("p", { class: "mt-1 text-xs text-muted-foreground" }, " Поддерживаемые форматы: JPG, PNG, GIF. Максимальный размер файла: 10МБ ")
                                      ])
                                    ]),
                                    errors.length ? (openBlock(), createBlock(_component_ui_field_error, {
                                      key: 0,
                                      errors
                                    }, null, 8, ["errors"])) : createCommentVNode("", true)
                                  ]),
                                  _: 2
                                }, 1032, ["data-invalid"])
                              ]),
                              _: 1
                            }),
                            createVNode(unref(Field), { name: "is_public" }, {
                              default: withCtx(({ field, errors, setValue }) => [
                                createVNode(_component_ui_field, {
                                  "data-invalid": !!errors.length,
                                  orientation: "horizontal"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_ui_field_label, {
                                      for: "is_public",
                                      class: "cursor-pointer flex-1"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Сделать публичным ")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_ui_switch, {
                                      id: "is_public",
                                      checked: Boolean(field.value),
                                      "onUpdate:modelValue": setValue
                                    }, null, 8, ["checked", "onUpdate:modelValue"]),
                                    errors.length ? (openBlock(), createBlock(_component_ui_field_error, {
                                      key: 0,
                                      errors
                                    }, null, 8, ["errors"])) : createCommentVNode("", true)
                                  ]),
                                  _: 2
                                }, 1032, ["data-invalid"])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_ui_dialog_footer, null, {
                          default: withCtx(() => [
                            createVNode(_component_ui_button, {
                              type: "button",
                              variant: "outline",
                              onClick: ($event) => isAddDialogOpen.value = false,
                              disabled: unref(isCreatingPortfolio)
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Отмена ")
                              ]),
                              _: 1
                            }, 8, ["onClick", "disabled"]),
                            createVNode(_component_base_processing_button, {
                              type: "submit",
                              label: "Добавить",
                              "is-processing": unref(isCreatingPortfolio)
                            }, null, 8, ["is-processing"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["validation-schema"])) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_ui_dialog_trigger, { "as-child": "" }, {
                default: withCtx(() => [
                  createVNode(_component_ui_button, null, {
                    default: withCtx(() => [
                      createVNode(unref(Plus), { class: "w-4 h-4" }),
                      createTextVNode(" Добавить работу ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_ui_dialog_content, { class: "sm:max-w-2xl" }, {
                default: withCtx(() => [
                  createVNode(_component_ui_dialog_header, null, {
                    default: withCtx(() => [
                      createVNode(_component_ui_dialog_title, null, {
                        default: withCtx(() => [
                          createTextVNode("Добавить работу в портфолио")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_ui_dialog_description, null, {
                        default: withCtx(() => [
                          createTextVNode(" Заполните информацию о вашей работе ")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  unref(isAddDialogOpen) ? (openBlock(), createBlock(unref(Form), {
                    key: 0,
                    "validation-schema": unref(toTypedSchema)("portfolioCreateSchema" in _ctx ? _ctx.portfolioCreateSchema : unref(portfolioCreateSchema)),
                    "initial-values": { category: "", description: "", is_public: false },
                    onSubmit: createPortfolio
                  }, {
                    default: withCtx(({ resetForm: resetFormFn }) => [
                      createVNode(_component_ui_field_group, { class: "py-4" }, {
                        default: withCtx(() => [
                          createVNode(_component_base_select, {
                            name: "category",
                            label: "Категория",
                            placeholder: "Выберите категорию",
                            options: PORTFOLIO_CATEGORIES,
                            "errors-to-show": "all"
                          }),
                          createVNode(unref(Field), { name: "description" }, {
                            default: withCtx(({ field, errors }) => [
                              createVNode(_component_ui_field, {
                                "data-invalid": !!errors.length
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_ui_field_label, { for: "description" }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Описание ")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_ui_textarea, mergeProps({
                                    id: "description",
                                    placeholder: "Опишите вашу работу",
                                    "aria-invalid": !!errors.length
                                  }, field), null, 16, ["aria-invalid"]),
                                  errors.length ? (openBlock(), createBlock(_component_ui_field_error, {
                                    key: 0,
                                    errors
                                  }, null, 8, ["errors"])) : createCommentVNode("", true)
                                ]),
                                _: 2
                              }, 1032, ["data-invalid"])
                            ]),
                            _: 1
                          }),
                          createVNode(unref(Field), { name: "image_file" }, {
                            default: withCtx(({ errors }) => [
                              createVNode(_component_ui_field, {
                                "data-invalid": !!errors.length
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_ui_field_label, null, {
                                    default: withCtx(() => [
                                      createTextVNode(" Изображения ")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode("div", { class: "space-y-4" }, [
                                    unref(previewImageUrls).length > 0 ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "grid grid-cols-4 gap-2"
                                    }, [
                                      (openBlock(true), createBlock(Fragment, null, renderList(unref(previewImageUrls), (preview, index) => {
                                        return openBlock(), createBlock("div", {
                                          key: index,
                                          class: "relative aspect-square w-full overflow-hidden rounded-lg bg-muted"
                                        }, [
                                          createVNode("img", {
                                            src: preview.url,
                                            alt: `Превью ${index + 1}`,
                                            class: "h-full w-full object-cover"
                                          }, null, 8, ["src", "alt"]),
                                          createVNode("button", {
                                            type: "button",
                                            onClick: () => handleRemoveImage(index),
                                            class: "absolute right-1 top-1 rounded-full bg-destructive p-1 text-destructive-foreground hover:bg-destructive/90"
                                          }, [
                                            (openBlock(), createBlock("svg", {
                                              class: "h-3 w-3",
                                              fill: "none",
                                              stroke: "currentColor",
                                              viewBox: "0 0 24 24"
                                            }, [
                                              createVNode("path", {
                                                "stroke-linecap": "round",
                                                "stroke-linejoin": "round",
                                                "stroke-width": "2",
                                                d: "M6 18L18 6M6 6l12 12"
                                              })
                                            ]))
                                          ], 8, ["onClick"])
                                        ]);
                                      }), 128))
                                    ])) : createCommentVNode("", true),
                                    createVNode("div", null, [
                                      createVNode("input", {
                                        ref_key: "imageInput",
                                        ref: imageInput,
                                        type: "file",
                                        accept: "image/*",
                                        multiple: "",
                                        class: "hidden",
                                        onChange: handleImageSelect
                                      }, null, 544),
                                      createVNode(_component_ui_button, {
                                        type: "button",
                                        variant: "outline",
                                        disabled: unref(isUploadingImage),
                                        onClick: handleImageInputClick,
                                        class: "w-full"
                                      }, {
                                        default: withCtx(() => [
                                          !unref(isUploadingImage) ? (openBlock(), createBlock(unref(Upload), {
                                            key: 0,
                                            class: "mr-2 h-4 w-4"
                                          })) : (openBlock(), createBlock(_component_ui_spinner, {
                                            key: 1,
                                            size: "sm",
                                            class: "mr-2"
                                          })),
                                          createTextVNode(" " + toDisplayString(unref(isUploadingImage) ? "Загрузка..." : unref(selectedImageFiles).length > 0 ? `Добавить ещё (${unref(selectedImageFiles).length} выбрано)` : "Выбрать изображения"), 1)
                                        ]),
                                        _: 1
                                      }, 8, ["disabled"]),
                                      createVNode("p", { class: "mt-1 text-xs text-muted-foreground" }, " Поддерживаемые форматы: JPG, PNG, GIF. Максимальный размер файла: 10МБ ")
                                    ])
                                  ]),
                                  errors.length ? (openBlock(), createBlock(_component_ui_field_error, {
                                    key: 0,
                                    errors
                                  }, null, 8, ["errors"])) : createCommentVNode("", true)
                                ]),
                                _: 2
                              }, 1032, ["data-invalid"])
                            ]),
                            _: 1
                          }),
                          createVNode(unref(Field), { name: "is_public" }, {
                            default: withCtx(({ field, errors, setValue }) => [
                              createVNode(_component_ui_field, {
                                "data-invalid": !!errors.length,
                                orientation: "horizontal"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_ui_field_label, {
                                    for: "is_public",
                                    class: "cursor-pointer flex-1"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Сделать публичным ")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_ui_switch, {
                                    id: "is_public",
                                    checked: Boolean(field.value),
                                    "onUpdate:modelValue": setValue
                                  }, null, 8, ["checked", "onUpdate:modelValue"]),
                                  errors.length ? (openBlock(), createBlock(_component_ui_field_error, {
                                    key: 0,
                                    errors
                                  }, null, 8, ["errors"])) : createCommentVNode("", true)
                                ]),
                                _: 2
                              }, 1032, ["data-invalid"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_ui_dialog_footer, null, {
                        default: withCtx(() => [
                          createVNode(_component_ui_button, {
                            type: "button",
                            variant: "outline",
                            onClick: ($event) => isAddDialogOpen.value = false,
                            disabled: unref(isCreatingPortfolio)
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Отмена ")
                            ]),
                            _: 1
                          }, 8, ["onClick", "disabled"]),
                          createVNode(_component_base_processing_button, {
                            type: "submit",
                            label: "Добавить",
                            "is-processing": unref(isCreatingPortfolio)
                          }, null, 8, ["is-processing"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["validation-schema"])) : createCommentVNode("", true)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (unref(isLoadingPortfolio)) {
        _push(`<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">`);
        _push(ssrRenderComponent(_component_ui_skeleton, { class: "aspect-[3/4] w-full rounded-lg" }, null, _parent));
        _push(ssrRenderComponent(_component_ui_skeleton, { class: "aspect-[3/4] w-full rounded-lg" }, null, _parent));
        _push(ssrRenderComponent(_component_ui_skeleton, { class: "aspect-[3/4] w-full rounded-lg" }, null, _parent));
        _push(ssrRenderComponent(_component_ui_skeleton, { class: "aspect-[3/4] w-full rounded-lg" }, null, _parent));
        _push(`</div>`);
      } else if (!unref(portfolio) || unref(portfolio).length === 0) {
        _push(`<div class="flex flex-col items-center justify-center py-16"><div class="text-center"><p class="text-muted-foreground mb-4 text-lg">У вас пока нет работ в портфолио</p>`);
        _push(ssrRenderComponent(_component_ui_button, {
          onClick: ($event) => isAddDialogOpen.value = true
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(Plus), { class: "w-4 h-4" }, null, _parent2, _scopeId));
              _push2(` Добавить первую работу `);
            } else {
              return [
                createVNode(unref(Plus), { class: "w-4 h-4" }),
                createTextVNode(" Добавить первую работу ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"><!--[-->`);
        ssrRenderList(unref(portfolio), (item) => {
          _push(`<div class="cursor-pointer">`);
          _push(ssrRenderComponent(_component_base_portfolio, {
            category: item.category,
            description: item.description,
            image_url: item.image_url,
            is_public: item.is_public,
            likes_count: item.likes_count,
            views_count: item.views_count,
            created_at: item.created_at,
            updated_at: item.updated_at
          }, null, _parent));
          _push(`</div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(ssrRenderComponent(_component_ui_dialog, {
        open: unref(isViewDialogOpen),
        "onUpdate:open": (open) => {
          isViewDialogOpen.value = open;
          if (!open) currentImageIndex.value = 0;
        }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_ui_dialog_content, { class: "sm:max-w-md" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (unref(selectedPortfolio)) {
                    _push3(ssrRenderComponent(_component_ui_dialog_header, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_ui_dialog_title, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(unref(selectedPortfolio).category)}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(unref(selectedPortfolio).category), 1)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_ui_dialog_description, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(unref(selectedPortfolio).description)}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(unref(selectedPortfolio).description), 1)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_ui_dialog_title, null, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(unref(selectedPortfolio).category), 1)
                              ]),
                              _: 1
                            }),
                            createVNode(_component_ui_dialog_description, null, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(unref(selectedPortfolio).description), 1)
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(selectedPortfolio)) {
                    _push3(`<div class="py-4"${_scopeId2}>`);
                    if (unref(selectedPortfolio).image_url && unref(selectedPortfolio).image_url.length > 0) {
                      _push3(`<div class="mb-6 flex justify-center"${_scopeId2}><div class="relative aspect-[3/4] w-full max-w-xs overflow-hidden rounded-lg bg-muted"${_scopeId2}><img${ssrRenderAttr("src", unref(selectedPortfolio).image_url[unref(currentImageIndex)])}${ssrRenderAttr("alt", `${unref(selectedPortfolio).category} - ${unref(currentImageIndex) + 1}`)} class="h-full w-full object-cover transition-opacity duration-300" loading="lazy"${_scopeId2}>`);
                      if (unref(selectedPortfolio).image_url.length > 1) {
                        _push3(ssrRenderComponent(_component_ui_button, {
                          onClick: prevImage,
                          type: "button",
                          class: "absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm p-2 text-foreground shadow-lg transition-all hover:bg-background/90 disabled:opacity-50",
                          disabled: unref(selectedPortfolio).image_url.length <= 1
                        }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(ssrRenderComponent(unref(ChevronLeft), { class: "h-5 w-5" }, null, _parent4, _scopeId3));
                            } else {
                              return [
                                createVNode(unref(ChevronLeft), { class: "h-5 w-5" })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent3, _scopeId2));
                      } else {
                        _push3(`<!---->`);
                      }
                      if (unref(selectedPortfolio).image_url.length > 1) {
                        _push3(ssrRenderComponent(_component_ui_button, {
                          onClick: nextImage,
                          type: "button",
                          class: "absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm p-2 text-foreground shadow-lg transition-all hover:bg-background/90 disabled:opacity-50",
                          disabled: unref(selectedPortfolio).image_url.length <= 1
                        }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(ssrRenderComponent(unref(ChevronRight), { class: "h-5 w-5" }, null, _parent4, _scopeId3));
                            } else {
                              return [
                                createVNode(unref(ChevronRight), { class: "h-5 w-5" })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent3, _scopeId2));
                      } else {
                        _push3(`<!---->`);
                      }
                      if (unref(selectedPortfolio).image_url.length > 1) {
                        _push3(`<div class="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-background/80 backdrop-blur-sm px-3 py-1 text-xs font-medium"${_scopeId2}>${ssrInterpolate(unref(currentImageIndex) + 1)} / ${ssrInterpolate(unref(selectedPortfolio).image_url.length)}</div>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      if (unref(selectedPortfolio).image_url.length > 1) {
                        _push3(`<div class="absolute bottom-2 right-2 flex gap-1"${_scopeId2}><!--[-->`);
                        ssrRenderList(unref(selectedPortfolio).image_url, (image, index) => {
                          _push3(ssrRenderComponent(_component_ui_button, {
                            key: index,
                            onClick: ($event) => currentImageIndex.value = index,
                            type: "button",
                            class: [
                              "h-2 w-2 rounded-full transition-all",
                              index === unref(currentImageIndex) ? "bg-primary w-6" : "bg-background/60 hover:bg-background/80"
                            ],
                            "aria-label": `Перейти к изображению ${index + 1}`
                          }, null, _parent3, _scopeId2));
                        });
                        _push3(`<!--]--></div>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`</div></div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`<div class="flex flex-wrap gap-4 text-sm text-muted-foreground"${_scopeId2}><div class="flex items-center gap-2"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(Eye), { class: "w-4 h-4" }, null, _parent3, _scopeId2));
                    _push3(`<span${_scopeId2}>${ssrInterpolate(unref(selectedPortfolio).views_count)} просмотров</span></div><div class="flex items-center gap-2"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(Heart), { class: "w-4 h-4" }, null, _parent3, _scopeId2));
                    _push3(`<span${_scopeId2}>${ssrInterpolate(unref(selectedPortfolio).likes_count)} лайков</span></div>`);
                    if (unref(selectedPortfolio).is_public) {
                      _push3(`<div class="flex items-center gap-2"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(Globe), { class: "w-4 h-4" }, null, _parent3, _scopeId2));
                      _push3(`<span${_scopeId2}>Публичное</span></div>`);
                    } else {
                      _push3(`<div class="flex items-center gap-2"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(Lock), { class: "w-4 h-4" }, null, _parent3, _scopeId2));
                      _push3(`<span${_scopeId2}>Приватное</span></div>`);
                    }
                    _push3(`</div><div class="mt-4 text-sm text-muted-foreground"${_scopeId2}><p${_scopeId2}>Создано: ${ssrInterpolate(formatDate(unref(selectedPortfolio).created_at))}</p>`);
                    if (unref(selectedPortfolio).updated_at !== unref(selectedPortfolio).created_at) {
                      _push3(`<p${_scopeId2}> Обновлено: ${ssrInterpolate(formatDate(unref(selectedPortfolio).updated_at))}</p>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(ssrRenderComponent(_component_ui_dialog_footer, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_ui_button, {
                          variant: "outline",
                          onClick: ($event) => isViewDialogOpen.value = false
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Закрыть `);
                            } else {
                              return [
                                createTextVNode(" Закрыть ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        if (unref(selectedPortfolio)?.is_public) {
                          _push4(ssrRenderComponent(_component_ui_button, {
                            variant: "outline",
                            onClick: sharePortfolio,
                            size: "icon"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId4}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"${_scopeId4}></path></svg>`);
                              } else {
                                return [
                                  (openBlock(), createBlock("svg", {
                                    class: "w-4 h-4",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24"
                                  }, [
                                    createVNode("path", {
                                      "stroke-linecap": "round",
                                      "stroke-linejoin": "round",
                                      "stroke-width": "2",
                                      d: "M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                                    })
                                  ]))
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(ssrRenderComponent(_component_ui_button, {
                          variant: "destructive",
                          onClick: ($event) => openDeleteDialog(unref(selectedPortfolio)),
                          size: "icon"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(Trash2), { class: "w-4 h-4" }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(Trash2), { class: "w-4 h-4" })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_ui_button, {
                          onClick: ($event) => openEditDialog(unref(selectedPortfolio))
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(Pencil), { class: "w-4 h-4 mr-2" }, null, _parent5, _scopeId4));
                              _push5(` Редактировать `);
                            } else {
                              return [
                                createVNode(unref(Pencil), { class: "w-4 h-4 mr-2" }),
                                createTextVNode(" Редактировать ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_ui_button, {
                            variant: "outline",
                            onClick: ($event) => isViewDialogOpen.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Закрыть ")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          unref(selectedPortfolio)?.is_public ? (openBlock(), createBlock(_component_ui_button, {
                            key: 0,
                            variant: "outline",
                            onClick: sharePortfolio,
                            size: "icon"
                          }, {
                            default: withCtx(() => [
                              (openBlock(), createBlock("svg", {
                                class: "w-4 h-4",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24"
                              }, [
                                createVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  "stroke-width": "2",
                                  d: "M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                                })
                              ]))
                            ]),
                            _: 1
                          })) : createCommentVNode("", true),
                          createVNode(_component_ui_button, {
                            variant: "destructive",
                            onClick: ($event) => openDeleteDialog(unref(selectedPortfolio)),
                            size: "icon"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Trash2), { class: "w-4 h-4" })
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(_component_ui_button, {
                            onClick: ($event) => openEditDialog(unref(selectedPortfolio))
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Pencil), { class: "w-4 h-4 mr-2" }),
                              createTextVNode(" Редактировать ")
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    unref(selectedPortfolio) ? (openBlock(), createBlock(_component_ui_dialog_header, { key: 0 }, {
                      default: withCtx(() => [
                        createVNode(_component_ui_dialog_title, null, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(unref(selectedPortfolio).category), 1)
                          ]),
                          _: 1
                        }),
                        createVNode(_component_ui_dialog_description, null, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(unref(selectedPortfolio).description), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    unref(selectedPortfolio) ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "py-4"
                    }, [
                      unref(selectedPortfolio).image_url && unref(selectedPortfolio).image_url.length > 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "mb-6 flex justify-center"
                      }, [
                        createVNode("div", { class: "relative aspect-[3/4] w-full max-w-xs overflow-hidden rounded-lg bg-muted" }, [
                          createVNode("img", {
                            src: unref(selectedPortfolio).image_url[unref(currentImageIndex)],
                            alt: `${unref(selectedPortfolio).category} - ${unref(currentImageIndex) + 1}`,
                            class: "h-full w-full object-cover transition-opacity duration-300",
                            loading: "lazy"
                          }, null, 8, ["src", "alt"]),
                          unref(selectedPortfolio).image_url.length > 1 ? (openBlock(), createBlock(_component_ui_button, {
                            key: 0,
                            onClick: prevImage,
                            type: "button",
                            class: "absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm p-2 text-foreground shadow-lg transition-all hover:bg-background/90 disabled:opacity-50",
                            disabled: unref(selectedPortfolio).image_url.length <= 1
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(ChevronLeft), { class: "h-5 w-5" })
                            ]),
                            _: 1
                          }, 8, ["disabled"])) : createCommentVNode("", true),
                          unref(selectedPortfolio).image_url.length > 1 ? (openBlock(), createBlock(_component_ui_button, {
                            key: 1,
                            onClick: nextImage,
                            type: "button",
                            class: "absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm p-2 text-foreground shadow-lg transition-all hover:bg-background/90 disabled:opacity-50",
                            disabled: unref(selectedPortfolio).image_url.length <= 1
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(ChevronRight), { class: "h-5 w-5" })
                            ]),
                            _: 1
                          }, 8, ["disabled"])) : createCommentVNode("", true),
                          unref(selectedPortfolio).image_url.length > 1 ? (openBlock(), createBlock("div", {
                            key: 2,
                            class: "absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-background/80 backdrop-blur-sm px-3 py-1 text-xs font-medium"
                          }, toDisplayString(unref(currentImageIndex) + 1) + " / " + toDisplayString(unref(selectedPortfolio).image_url.length), 1)) : createCommentVNode("", true),
                          unref(selectedPortfolio).image_url.length > 1 ? (openBlock(), createBlock("div", {
                            key: 3,
                            class: "absolute bottom-2 right-2 flex gap-1"
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(selectedPortfolio).image_url, (image, index) => {
                              return openBlock(), createBlock(_component_ui_button, {
                                key: index,
                                onClick: ($event) => currentImageIndex.value = index,
                                type: "button",
                                class: [
                                  "h-2 w-2 rounded-full transition-all",
                                  index === unref(currentImageIndex) ? "bg-primary w-6" : "bg-background/60 hover:bg-background/80"
                                ],
                                "aria-label": `Перейти к изображению ${index + 1}`
                              }, null, 8, ["onClick", "class", "aria-label"]);
                            }), 128))
                          ])) : createCommentVNode("", true)
                        ])
                      ])) : createCommentVNode("", true),
                      createVNode("div", { class: "flex flex-wrap gap-4 text-sm text-muted-foreground" }, [
                        createVNode("div", { class: "flex items-center gap-2" }, [
                          createVNode(unref(Eye), { class: "w-4 h-4" }),
                          createVNode("span", null, toDisplayString(unref(selectedPortfolio).views_count) + " просмотров", 1)
                        ]),
                        createVNode("div", { class: "flex items-center gap-2" }, [
                          createVNode(unref(Heart), { class: "w-4 h-4" }),
                          createVNode("span", null, toDisplayString(unref(selectedPortfolio).likes_count) + " лайков", 1)
                        ]),
                        unref(selectedPortfolio).is_public ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "flex items-center gap-2"
                        }, [
                          createVNode(unref(Globe), { class: "w-4 h-4" }),
                          createVNode("span", null, "Публичное")
                        ])) : (openBlock(), createBlock("div", {
                          key: 1,
                          class: "flex items-center gap-2"
                        }, [
                          createVNode(unref(Lock), { class: "w-4 h-4" }),
                          createVNode("span", null, "Приватное")
                        ]))
                      ]),
                      createVNode("div", { class: "mt-4 text-sm text-muted-foreground" }, [
                        createVNode("p", null, "Создано: " + toDisplayString(formatDate(unref(selectedPortfolio).created_at)), 1),
                        unref(selectedPortfolio).updated_at !== unref(selectedPortfolio).created_at ? (openBlock(), createBlock("p", { key: 0 }, " Обновлено: " + toDisplayString(formatDate(unref(selectedPortfolio).updated_at)), 1)) : createCommentVNode("", true)
                      ])
                    ])) : createCommentVNode("", true),
                    createVNode(_component_ui_dialog_footer, null, {
                      default: withCtx(() => [
                        createVNode(_component_ui_button, {
                          variant: "outline",
                          onClick: ($event) => isViewDialogOpen.value = false
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Закрыть ")
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        unref(selectedPortfolio)?.is_public ? (openBlock(), createBlock(_component_ui_button, {
                          key: 0,
                          variant: "outline",
                          onClick: sharePortfolio,
                          size: "icon"
                        }, {
                          default: withCtx(() => [
                            (openBlock(), createBlock("svg", {
                              class: "w-4 h-4",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                              })
                            ]))
                          ]),
                          _: 1
                        })) : createCommentVNode("", true),
                        createVNode(_component_ui_button, {
                          variant: "destructive",
                          onClick: ($event) => openDeleteDialog(unref(selectedPortfolio)),
                          size: "icon"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Trash2), { class: "w-4 h-4" })
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(_component_ui_button, {
                          onClick: ($event) => openEditDialog(unref(selectedPortfolio))
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Pencil), { class: "w-4 h-4 mr-2" }),
                            createTextVNode(" Редактировать ")
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
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_ui_dialog_content, { class: "sm:max-w-md" }, {
                default: withCtx(() => [
                  unref(selectedPortfolio) ? (openBlock(), createBlock(_component_ui_dialog_header, { key: 0 }, {
                    default: withCtx(() => [
                      createVNode(_component_ui_dialog_title, null, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(selectedPortfolio).category), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_ui_dialog_description, null, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(selectedPortfolio).description), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  unref(selectedPortfolio) ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "py-4"
                  }, [
                    unref(selectedPortfolio).image_url && unref(selectedPortfolio).image_url.length > 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "mb-6 flex justify-center"
                    }, [
                      createVNode("div", { class: "relative aspect-[3/4] w-full max-w-xs overflow-hidden rounded-lg bg-muted" }, [
                        createVNode("img", {
                          src: unref(selectedPortfolio).image_url[unref(currentImageIndex)],
                          alt: `${unref(selectedPortfolio).category} - ${unref(currentImageIndex) + 1}`,
                          class: "h-full w-full object-cover transition-opacity duration-300",
                          loading: "lazy"
                        }, null, 8, ["src", "alt"]),
                        unref(selectedPortfolio).image_url.length > 1 ? (openBlock(), createBlock(_component_ui_button, {
                          key: 0,
                          onClick: prevImage,
                          type: "button",
                          class: "absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm p-2 text-foreground shadow-lg transition-all hover:bg-background/90 disabled:opacity-50",
                          disabled: unref(selectedPortfolio).image_url.length <= 1
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(ChevronLeft), { class: "h-5 w-5" })
                          ]),
                          _: 1
                        }, 8, ["disabled"])) : createCommentVNode("", true),
                        unref(selectedPortfolio).image_url.length > 1 ? (openBlock(), createBlock(_component_ui_button, {
                          key: 1,
                          onClick: nextImage,
                          type: "button",
                          class: "absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm p-2 text-foreground shadow-lg transition-all hover:bg-background/90 disabled:opacity-50",
                          disabled: unref(selectedPortfolio).image_url.length <= 1
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(ChevronRight), { class: "h-5 w-5" })
                          ]),
                          _: 1
                        }, 8, ["disabled"])) : createCommentVNode("", true),
                        unref(selectedPortfolio).image_url.length > 1 ? (openBlock(), createBlock("div", {
                          key: 2,
                          class: "absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-background/80 backdrop-blur-sm px-3 py-1 text-xs font-medium"
                        }, toDisplayString(unref(currentImageIndex) + 1) + " / " + toDisplayString(unref(selectedPortfolio).image_url.length), 1)) : createCommentVNode("", true),
                        unref(selectedPortfolio).image_url.length > 1 ? (openBlock(), createBlock("div", {
                          key: 3,
                          class: "absolute bottom-2 right-2 flex gap-1"
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(selectedPortfolio).image_url, (image, index) => {
                            return openBlock(), createBlock(_component_ui_button, {
                              key: index,
                              onClick: ($event) => currentImageIndex.value = index,
                              type: "button",
                              class: [
                                "h-2 w-2 rounded-full transition-all",
                                index === unref(currentImageIndex) ? "bg-primary w-6" : "bg-background/60 hover:bg-background/80"
                              ],
                              "aria-label": `Перейти к изображению ${index + 1}`
                            }, null, 8, ["onClick", "class", "aria-label"]);
                          }), 128))
                        ])) : createCommentVNode("", true)
                      ])
                    ])) : createCommentVNode("", true),
                    createVNode("div", { class: "flex flex-wrap gap-4 text-sm text-muted-foreground" }, [
                      createVNode("div", { class: "flex items-center gap-2" }, [
                        createVNode(unref(Eye), { class: "w-4 h-4" }),
                        createVNode("span", null, toDisplayString(unref(selectedPortfolio).views_count) + " просмотров", 1)
                      ]),
                      createVNode("div", { class: "flex items-center gap-2" }, [
                        createVNode(unref(Heart), { class: "w-4 h-4" }),
                        createVNode("span", null, toDisplayString(unref(selectedPortfolio).likes_count) + " лайков", 1)
                      ]),
                      unref(selectedPortfolio).is_public ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "flex items-center gap-2"
                      }, [
                        createVNode(unref(Globe), { class: "w-4 h-4" }),
                        createVNode("span", null, "Публичное")
                      ])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "flex items-center gap-2"
                      }, [
                        createVNode(unref(Lock), { class: "w-4 h-4" }),
                        createVNode("span", null, "Приватное")
                      ]))
                    ]),
                    createVNode("div", { class: "mt-4 text-sm text-muted-foreground" }, [
                      createVNode("p", null, "Создано: " + toDisplayString(formatDate(unref(selectedPortfolio).created_at)), 1),
                      unref(selectedPortfolio).updated_at !== unref(selectedPortfolio).created_at ? (openBlock(), createBlock("p", { key: 0 }, " Обновлено: " + toDisplayString(formatDate(unref(selectedPortfolio).updated_at)), 1)) : createCommentVNode("", true)
                    ])
                  ])) : createCommentVNode("", true),
                  createVNode(_component_ui_dialog_footer, null, {
                    default: withCtx(() => [
                      createVNode(_component_ui_button, {
                        variant: "outline",
                        onClick: ($event) => isViewDialogOpen.value = false
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Закрыть ")
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
                      unref(selectedPortfolio)?.is_public ? (openBlock(), createBlock(_component_ui_button, {
                        key: 0,
                        variant: "outline",
                        onClick: sharePortfolio,
                        size: "icon"
                      }, {
                        default: withCtx(() => [
                          (openBlock(), createBlock("svg", {
                            class: "w-4 h-4",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "2",
                              d: "M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                            })
                          ]))
                        ]),
                        _: 1
                      })) : createCommentVNode("", true),
                      createVNode(_component_ui_button, {
                        variant: "destructive",
                        onClick: ($event) => openDeleteDialog(unref(selectedPortfolio)),
                        size: "icon"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(Trash2), { class: "w-4 h-4" })
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
                      createVNode(_component_ui_button, {
                        onClick: ($event) => openEditDialog(unref(selectedPortfolio))
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(Pencil), { class: "w-4 h-4 mr-2" }),
                          createTextVNode(" Редактировать ")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
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
      _push(ssrRenderComponent(_component_ui_dialog, {
        open: unref(isEditDialogOpen),
        "onUpdate:open": handleEditDialogClose
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_ui_dialog_content, { class: "sm:max-w-2xl" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_ui_dialog_header, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_ui_dialog_title, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Редактировать портфолио`);
                            } else {
                              return [
                                createTextVNode("Редактировать портфолио")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_ui_dialog_description, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Измените информацию о вашей работе `);
                            } else {
                              return [
                                createTextVNode(" Измените информацию о вашей работе ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_ui_dialog_title, null, {
                            default: withCtx(() => [
                              createTextVNode("Редактировать портфолио")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_ui_dialog_description, null, {
                            default: withCtx(() => [
                              createTextVNode(" Измените информацию о вашей работе ")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  if (unref(isEditDialogOpen) && unref(editingPortfolio)) {
                    _push3(ssrRenderComponent(unref(Form), {
                      key: `edit-${unref(editingPortfolio).id}`,
                      "validation-schema": unref(toTypedSchema)("portfolioCreateSchema" in _ctx ? _ctx.portfolioCreateSchema : unref(portfolioCreateSchema)),
                      "initial-values": unref(editFormInitialValues),
                      onSubmit: updatePortfolio
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_ui_field_group, { class: "py-4" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_base_select, {
                                  name: "category",
                                  label: "Категория",
                                  placeholder: "Выберите категорию",
                                  options: PORTFOLIO_CATEGORIES,
                                  "errors-to-show": "all"
                                }, null, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(unref(Field), { name: "description" }, {
                                  default: withCtx(({ field, errors, setValue }, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(_component_ui_field, {
                                        "data-invalid": !!errors.length
                                      }, {
                                        default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(_component_ui_field_label, { for: "description" }, {
                                              default: withCtx((_6, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(` Описание `);
                                                } else {
                                                  return [
                                                    createTextVNode(" Описание ")
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(_component_ui_textarea, {
                                              id: "description",
                                              placeholder: "Опишите вашу работу",
                                              "aria-invalid": !!errors.length,
                                              modelValue: field.value,
                                              "onUpdate:modelValue": setValue
                                            }, null, _parent7, _scopeId6));
                                            if (errors.length) {
                                              _push7(ssrRenderComponent(_component_ui_field_error, { errors }, null, _parent7, _scopeId6));
                                            } else {
                                              _push7(`<!---->`);
                                            }
                                          } else {
                                            return [
                                              createVNode(_component_ui_field_label, { for: "description" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(" Описание ")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_ui_textarea, {
                                                id: "description",
                                                placeholder: "Опишите вашу работу",
                                                "aria-invalid": !!errors.length,
                                                modelValue: field.value,
                                                "onUpdate:modelValue": setValue
                                              }, null, 8, ["aria-invalid", "modelValue", "onUpdate:modelValue"]),
                                              errors.length ? (openBlock(), createBlock(_component_ui_field_error, {
                                                key: 0,
                                                errors
                                              }, null, 8, ["errors"])) : createCommentVNode("", true)
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(_component_ui_field, {
                                          "data-invalid": !!errors.length
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(_component_ui_field_label, { for: "description" }, {
                                              default: withCtx(() => [
                                                createTextVNode(" Описание ")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_ui_textarea, {
                                              id: "description",
                                              placeholder: "Опишите вашу работу",
                                              "aria-invalid": !!errors.length,
                                              modelValue: field.value,
                                              "onUpdate:modelValue": setValue
                                            }, null, 8, ["aria-invalid", "modelValue", "onUpdate:modelValue"]),
                                            errors.length ? (openBlock(), createBlock(_component_ui_field_error, {
                                              key: 0,
                                              errors
                                            }, null, 8, ["errors"])) : createCommentVNode("", true)
                                          ]),
                                          _: 2
                                        }, 1032, ["data-invalid"])
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(unref(Field), { name: "image_file" }, {
                                  default: withCtx(({ errors }, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(_component_ui_field, {
                                        "data-invalid": !!errors.length
                                      }, {
                                        default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(_component_ui_field_label, null, {
                                              default: withCtx((_6, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(` Изображения `);
                                                } else {
                                                  return [
                                                    createTextVNode(" Изображения ")
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(`<div class="space-y-4"${_scopeId6}>`);
                                            if (unref(existingImageUrls).length > 0) {
                                              _push7(`<div class="grid grid-cols-4 gap-2"${_scopeId6}><!--[-->`);
                                              ssrRenderList(unref(existingImageUrls), (imageUrl, index) => {
                                                _push7(`<div class="relative aspect-square w-full overflow-hidden rounded-lg bg-muted"${_scopeId6}><img${ssrRenderAttr("src", imageUrl)}${ssrRenderAttr("alt", `Изображение ${index + 1}`)} class="h-full w-full object-cover"${_scopeId6}><button type="button" class="absolute right-1 top-1 rounded-full bg-destructive p-1 text-destructive-foreground hover:bg-destructive/90"${_scopeId6}><svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId6}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"${_scopeId6}></path></svg></button></div>`);
                                              });
                                              _push7(`<!--]--></div>`);
                                            } else {
                                              _push7(`<!---->`);
                                            }
                                            if (unref(previewImageUrls).length > 0) {
                                              _push7(`<div class="grid grid-cols-4 gap-2"${_scopeId6}><!--[-->`);
                                              ssrRenderList(unref(previewImageUrls), (preview, index) => {
                                                _push7(`<div class="relative aspect-square w-full overflow-hidden rounded-lg bg-muted"${_scopeId6}><img${ssrRenderAttr("src", preview.url)}${ssrRenderAttr("alt", `Превью ${index + 1}`)} class="h-full w-full object-cover"${_scopeId6}><button type="button" class="absolute right-1 top-1 rounded-full bg-destructive p-1 text-destructive-foreground hover:bg-destructive/90"${_scopeId6}><svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId6}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"${_scopeId6}></path></svg></button></div>`);
                                              });
                                              _push7(`<!--]--></div>`);
                                            } else {
                                              _push7(`<!---->`);
                                            }
                                            _push7(`<div${_scopeId6}><input type="file" accept="image/*" multiple class="hidden"${_scopeId6}>`);
                                            _push7(ssrRenderComponent(_component_ui_button, {
                                              type: "button",
                                              variant: "outline",
                                              disabled: unref(isUploadingImage),
                                              onClick: ($event) => unref(editImageInput)?.click(),
                                              class: "w-full"
                                            }, {
                                              default: withCtx((_6, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  if (!unref(isUploadingImage)) {
                                                    _push8(ssrRenderComponent(unref(Upload), { class: "mr-2 h-4 w-4" }, null, _parent8, _scopeId7));
                                                  } else {
                                                    _push8(ssrRenderComponent(_component_ui_spinner, {
                                                      size: "sm",
                                                      class: "mr-2"
                                                    }, null, _parent8, _scopeId7));
                                                  }
                                                  _push8(` ${ssrInterpolate(unref(isUploadingImage) ? "Загрузка..." : unref(selectedImageFiles).length > 0 ? `Добавить ещё (${unref(selectedImageFiles).length} выбрано)` : "Добавить изображения")}`);
                                                } else {
                                                  return [
                                                    !unref(isUploadingImage) ? (openBlock(), createBlock(unref(Upload), {
                                                      key: 0,
                                                      class: "mr-2 h-4 w-4"
                                                    })) : (openBlock(), createBlock(_component_ui_spinner, {
                                                      key: 1,
                                                      size: "sm",
                                                      class: "mr-2"
                                                    })),
                                                    createTextVNode(" " + toDisplayString(unref(isUploadingImage) ? "Загрузка..." : unref(selectedImageFiles).length > 0 ? `Добавить ещё (${unref(selectedImageFiles).length} выбрано)` : "Добавить изображения"), 1)
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(`<p class="mt-1 text-xs text-muted-foreground"${_scopeId6}> Поддерживаемые форматы: JPG, PNG, GIF. Максимальный размер файла: 10МБ </p></div></div>`);
                                            if (errors.length) {
                                              _push7(ssrRenderComponent(_component_ui_field_error, { errors }, null, _parent7, _scopeId6));
                                            } else {
                                              _push7(`<!---->`);
                                            }
                                          } else {
                                            return [
                                              createVNode(_component_ui_field_label, null, {
                                                default: withCtx(() => [
                                                  createTextVNode(" Изображения ")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode("div", { class: "space-y-4" }, [
                                                unref(existingImageUrls).length > 0 ? (openBlock(), createBlock("div", {
                                                  key: 0,
                                                  class: "grid grid-cols-4 gap-2"
                                                }, [
                                                  (openBlock(true), createBlock(Fragment, null, renderList(unref(existingImageUrls), (imageUrl, index) => {
                                                    return openBlock(), createBlock("div", {
                                                      key: index,
                                                      class: "relative aspect-square w-full overflow-hidden rounded-lg bg-muted"
                                                    }, [
                                                      createVNode("img", {
                                                        src: imageUrl,
                                                        alt: `Изображение ${index + 1}`,
                                                        class: "h-full w-full object-cover"
                                                      }, null, 8, ["src", "alt"]),
                                                      createVNode("button", {
                                                        type: "button",
                                                        onClick: () => handleRemoveExistingImage(index),
                                                        class: "absolute right-1 top-1 rounded-full bg-destructive p-1 text-destructive-foreground hover:bg-destructive/90"
                                                      }, [
                                                        (openBlock(), createBlock("svg", {
                                                          class: "h-3 w-3",
                                                          fill: "none",
                                                          stroke: "currentColor",
                                                          viewBox: "0 0 24 24"
                                                        }, [
                                                          createVNode("path", {
                                                            "stroke-linecap": "round",
                                                            "stroke-linejoin": "round",
                                                            "stroke-width": "2",
                                                            d: "M6 18L18 6M6 6l12 12"
                                                          })
                                                        ]))
                                                      ], 8, ["onClick"])
                                                    ]);
                                                  }), 128))
                                                ])) : createCommentVNode("", true),
                                                unref(previewImageUrls).length > 0 ? (openBlock(), createBlock("div", {
                                                  key: 1,
                                                  class: "grid grid-cols-4 gap-2"
                                                }, [
                                                  (openBlock(true), createBlock(Fragment, null, renderList(unref(previewImageUrls), (preview, index) => {
                                                    return openBlock(), createBlock("div", {
                                                      key: index,
                                                      class: "relative aspect-square w-full overflow-hidden rounded-lg bg-muted"
                                                    }, [
                                                      createVNode("img", {
                                                        src: preview.url,
                                                        alt: `Превью ${index + 1}`,
                                                        class: "h-full w-full object-cover"
                                                      }, null, 8, ["src", "alt"]),
                                                      createVNode("button", {
                                                        type: "button",
                                                        onClick: () => handleRemoveImage(index),
                                                        class: "absolute right-1 top-1 rounded-full bg-destructive p-1 text-destructive-foreground hover:bg-destructive/90"
                                                      }, [
                                                        (openBlock(), createBlock("svg", {
                                                          class: "h-3 w-3",
                                                          fill: "none",
                                                          stroke: "currentColor",
                                                          viewBox: "0 0 24 24"
                                                        }, [
                                                          createVNode("path", {
                                                            "stroke-linecap": "round",
                                                            "stroke-linejoin": "round",
                                                            "stroke-width": "2",
                                                            d: "M6 18L18 6M6 6l12 12"
                                                          })
                                                        ]))
                                                      ], 8, ["onClick"])
                                                    ]);
                                                  }), 128))
                                                ])) : createCommentVNode("", true),
                                                createVNode("div", null, [
                                                  createVNode("input", {
                                                    ref_key: "editImageInput",
                                                    ref: editImageInput,
                                                    type: "file",
                                                    accept: "image/*",
                                                    multiple: "",
                                                    class: "hidden",
                                                    onChange: handleEditImageSelect
                                                  }, null, 544),
                                                  createVNode(_component_ui_button, {
                                                    type: "button",
                                                    variant: "outline",
                                                    disabled: unref(isUploadingImage),
                                                    onClick: ($event) => unref(editImageInput)?.click(),
                                                    class: "w-full"
                                                  }, {
                                                    default: withCtx(() => [
                                                      !unref(isUploadingImage) ? (openBlock(), createBlock(unref(Upload), {
                                                        key: 0,
                                                        class: "mr-2 h-4 w-4"
                                                      })) : (openBlock(), createBlock(_component_ui_spinner, {
                                                        key: 1,
                                                        size: "sm",
                                                        class: "mr-2"
                                                      })),
                                                      createTextVNode(" " + toDisplayString(unref(isUploadingImage) ? "Загрузка..." : unref(selectedImageFiles).length > 0 ? `Добавить ещё (${unref(selectedImageFiles).length} выбрано)` : "Добавить изображения"), 1)
                                                    ]),
                                                    _: 1
                                                  }, 8, ["disabled", "onClick"]),
                                                  createVNode("p", { class: "mt-1 text-xs text-muted-foreground" }, " Поддерживаемые форматы: JPG, PNG, GIF. Максимальный размер файла: 10МБ ")
                                                ])
                                              ]),
                                              errors.length ? (openBlock(), createBlock(_component_ui_field_error, {
                                                key: 0,
                                                errors
                                              }, null, 8, ["errors"])) : createCommentVNode("", true)
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(_component_ui_field, {
                                          "data-invalid": !!errors.length
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(_component_ui_field_label, null, {
                                              default: withCtx(() => [
                                                createTextVNode(" Изображения ")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode("div", { class: "space-y-4" }, [
                                              unref(existingImageUrls).length > 0 ? (openBlock(), createBlock("div", {
                                                key: 0,
                                                class: "grid grid-cols-4 gap-2"
                                              }, [
                                                (openBlock(true), createBlock(Fragment, null, renderList(unref(existingImageUrls), (imageUrl, index) => {
                                                  return openBlock(), createBlock("div", {
                                                    key: index,
                                                    class: "relative aspect-square w-full overflow-hidden rounded-lg bg-muted"
                                                  }, [
                                                    createVNode("img", {
                                                      src: imageUrl,
                                                      alt: `Изображение ${index + 1}`,
                                                      class: "h-full w-full object-cover"
                                                    }, null, 8, ["src", "alt"]),
                                                    createVNode("button", {
                                                      type: "button",
                                                      onClick: () => handleRemoveExistingImage(index),
                                                      class: "absolute right-1 top-1 rounded-full bg-destructive p-1 text-destructive-foreground hover:bg-destructive/90"
                                                    }, [
                                                      (openBlock(), createBlock("svg", {
                                                        class: "h-3 w-3",
                                                        fill: "none",
                                                        stroke: "currentColor",
                                                        viewBox: "0 0 24 24"
                                                      }, [
                                                        createVNode("path", {
                                                          "stroke-linecap": "round",
                                                          "stroke-linejoin": "round",
                                                          "stroke-width": "2",
                                                          d: "M6 18L18 6M6 6l12 12"
                                                        })
                                                      ]))
                                                    ], 8, ["onClick"])
                                                  ]);
                                                }), 128))
                                              ])) : createCommentVNode("", true),
                                              unref(previewImageUrls).length > 0 ? (openBlock(), createBlock("div", {
                                                key: 1,
                                                class: "grid grid-cols-4 gap-2"
                                              }, [
                                                (openBlock(true), createBlock(Fragment, null, renderList(unref(previewImageUrls), (preview, index) => {
                                                  return openBlock(), createBlock("div", {
                                                    key: index,
                                                    class: "relative aspect-square w-full overflow-hidden rounded-lg bg-muted"
                                                  }, [
                                                    createVNode("img", {
                                                      src: preview.url,
                                                      alt: `Превью ${index + 1}`,
                                                      class: "h-full w-full object-cover"
                                                    }, null, 8, ["src", "alt"]),
                                                    createVNode("button", {
                                                      type: "button",
                                                      onClick: () => handleRemoveImage(index),
                                                      class: "absolute right-1 top-1 rounded-full bg-destructive p-1 text-destructive-foreground hover:bg-destructive/90"
                                                    }, [
                                                      (openBlock(), createBlock("svg", {
                                                        class: "h-3 w-3",
                                                        fill: "none",
                                                        stroke: "currentColor",
                                                        viewBox: "0 0 24 24"
                                                      }, [
                                                        createVNode("path", {
                                                          "stroke-linecap": "round",
                                                          "stroke-linejoin": "round",
                                                          "stroke-width": "2",
                                                          d: "M6 18L18 6M6 6l12 12"
                                                        })
                                                      ]))
                                                    ], 8, ["onClick"])
                                                  ]);
                                                }), 128))
                                              ])) : createCommentVNode("", true),
                                              createVNode("div", null, [
                                                createVNode("input", {
                                                  ref_key: "editImageInput",
                                                  ref: editImageInput,
                                                  type: "file",
                                                  accept: "image/*",
                                                  multiple: "",
                                                  class: "hidden",
                                                  onChange: handleEditImageSelect
                                                }, null, 544),
                                                createVNode(_component_ui_button, {
                                                  type: "button",
                                                  variant: "outline",
                                                  disabled: unref(isUploadingImage),
                                                  onClick: ($event) => unref(editImageInput)?.click(),
                                                  class: "w-full"
                                                }, {
                                                  default: withCtx(() => [
                                                    !unref(isUploadingImage) ? (openBlock(), createBlock(unref(Upload), {
                                                      key: 0,
                                                      class: "mr-2 h-4 w-4"
                                                    })) : (openBlock(), createBlock(_component_ui_spinner, {
                                                      key: 1,
                                                      size: "sm",
                                                      class: "mr-2"
                                                    })),
                                                    createTextVNode(" " + toDisplayString(unref(isUploadingImage) ? "Загрузка..." : unref(selectedImageFiles).length > 0 ? `Добавить ещё (${unref(selectedImageFiles).length} выбрано)` : "Добавить изображения"), 1)
                                                  ]),
                                                  _: 1
                                                }, 8, ["disabled", "onClick"]),
                                                createVNode("p", { class: "mt-1 text-xs text-muted-foreground" }, " Поддерживаемые форматы: JPG, PNG, GIF. Максимальный размер файла: 10МБ ")
                                              ])
                                            ]),
                                            errors.length ? (openBlock(), createBlock(_component_ui_field_error, {
                                              key: 0,
                                              errors
                                            }, null, 8, ["errors"])) : createCommentVNode("", true)
                                          ]),
                                          _: 2
                                        }, 1032, ["data-invalid"])
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(unref(Field), { name: "is_public" }, {
                                  default: withCtx(({ field, errors, setValue }, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(_component_ui_field, {
                                        "data-invalid": !!errors.length,
                                        orientation: "horizontal"
                                      }, {
                                        default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(_component_ui_field_label, {
                                              for: "is_public",
                                              class: "cursor-pointer flex-1"
                                            }, {
                                              default: withCtx((_6, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(` Сделать публичным `);
                                                } else {
                                                  return [
                                                    createTextVNode(" Сделать публичным ")
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(_component_ui_switch, {
                                              id: "is_public",
                                              "model-value": field.value,
                                              "onUpdate:modelValue": setValue,
                                              "aria-invalid": !!errors.length
                                            }, null, _parent7, _scopeId6));
                                            if (errors.length) {
                                              _push7(ssrRenderComponent(_component_ui_field_error, { errors }, null, _parent7, _scopeId6));
                                            } else {
                                              _push7(`<!---->`);
                                            }
                                          } else {
                                            return [
                                              createVNode(_component_ui_field_label, {
                                                for: "is_public",
                                                class: "cursor-pointer flex-1"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(" Сделать публичным ")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_ui_switch, {
                                                id: "is_public",
                                                "model-value": field.value,
                                                "onUpdate:modelValue": setValue,
                                                "aria-invalid": !!errors.length
                                              }, null, 8, ["model-value", "onUpdate:modelValue", "aria-invalid"]),
                                              errors.length ? (openBlock(), createBlock(_component_ui_field_error, {
                                                key: 0,
                                                errors
                                              }, null, 8, ["errors"])) : createCommentVNode("", true)
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(_component_ui_field, {
                                          "data-invalid": !!errors.length,
                                          orientation: "horizontal"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(_component_ui_field_label, {
                                              for: "is_public",
                                              class: "cursor-pointer flex-1"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(" Сделать публичным ")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_ui_switch, {
                                              id: "is_public",
                                              "model-value": field.value,
                                              "onUpdate:modelValue": setValue,
                                              "aria-invalid": !!errors.length
                                            }, null, 8, ["model-value", "onUpdate:modelValue", "aria-invalid"]),
                                            errors.length ? (openBlock(), createBlock(_component_ui_field_error, {
                                              key: 0,
                                              errors
                                            }, null, 8, ["errors"])) : createCommentVNode("", true)
                                          ]),
                                          _: 2
                                        }, 1032, ["data-invalid"])
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_base_select, {
                                    name: "category",
                                    label: "Категория",
                                    placeholder: "Выберите категорию",
                                    options: PORTFOLIO_CATEGORIES,
                                    "errors-to-show": "all"
                                  }),
                                  createVNode(unref(Field), { name: "description" }, {
                                    default: withCtx(({ field, errors, setValue }) => [
                                      createVNode(_component_ui_field, {
                                        "data-invalid": !!errors.length
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_component_ui_field_label, { for: "description" }, {
                                            default: withCtx(() => [
                                              createTextVNode(" Описание ")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_ui_textarea, {
                                            id: "description",
                                            placeholder: "Опишите вашу работу",
                                            "aria-invalid": !!errors.length,
                                            modelValue: field.value,
                                            "onUpdate:modelValue": setValue
                                          }, null, 8, ["aria-invalid", "modelValue", "onUpdate:modelValue"]),
                                          errors.length ? (openBlock(), createBlock(_component_ui_field_error, {
                                            key: 0,
                                            errors
                                          }, null, 8, ["errors"])) : createCommentVNode("", true)
                                        ]),
                                        _: 2
                                      }, 1032, ["data-invalid"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(Field), { name: "image_file" }, {
                                    default: withCtx(({ errors }) => [
                                      createVNode(_component_ui_field, {
                                        "data-invalid": !!errors.length
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_component_ui_field_label, null, {
                                            default: withCtx(() => [
                                              createTextVNode(" Изображения ")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode("div", { class: "space-y-4" }, [
                                            unref(existingImageUrls).length > 0 ? (openBlock(), createBlock("div", {
                                              key: 0,
                                              class: "grid grid-cols-4 gap-2"
                                            }, [
                                              (openBlock(true), createBlock(Fragment, null, renderList(unref(existingImageUrls), (imageUrl, index) => {
                                                return openBlock(), createBlock("div", {
                                                  key: index,
                                                  class: "relative aspect-square w-full overflow-hidden rounded-lg bg-muted"
                                                }, [
                                                  createVNode("img", {
                                                    src: imageUrl,
                                                    alt: `Изображение ${index + 1}`,
                                                    class: "h-full w-full object-cover"
                                                  }, null, 8, ["src", "alt"]),
                                                  createVNode("button", {
                                                    type: "button",
                                                    onClick: () => handleRemoveExistingImage(index),
                                                    class: "absolute right-1 top-1 rounded-full bg-destructive p-1 text-destructive-foreground hover:bg-destructive/90"
                                                  }, [
                                                    (openBlock(), createBlock("svg", {
                                                      class: "h-3 w-3",
                                                      fill: "none",
                                                      stroke: "currentColor",
                                                      viewBox: "0 0 24 24"
                                                    }, [
                                                      createVNode("path", {
                                                        "stroke-linecap": "round",
                                                        "stroke-linejoin": "round",
                                                        "stroke-width": "2",
                                                        d: "M6 18L18 6M6 6l12 12"
                                                      })
                                                    ]))
                                                  ], 8, ["onClick"])
                                                ]);
                                              }), 128))
                                            ])) : createCommentVNode("", true),
                                            unref(previewImageUrls).length > 0 ? (openBlock(), createBlock("div", {
                                              key: 1,
                                              class: "grid grid-cols-4 gap-2"
                                            }, [
                                              (openBlock(true), createBlock(Fragment, null, renderList(unref(previewImageUrls), (preview, index) => {
                                                return openBlock(), createBlock("div", {
                                                  key: index,
                                                  class: "relative aspect-square w-full overflow-hidden rounded-lg bg-muted"
                                                }, [
                                                  createVNode("img", {
                                                    src: preview.url,
                                                    alt: `Превью ${index + 1}`,
                                                    class: "h-full w-full object-cover"
                                                  }, null, 8, ["src", "alt"]),
                                                  createVNode("button", {
                                                    type: "button",
                                                    onClick: () => handleRemoveImage(index),
                                                    class: "absolute right-1 top-1 rounded-full bg-destructive p-1 text-destructive-foreground hover:bg-destructive/90"
                                                  }, [
                                                    (openBlock(), createBlock("svg", {
                                                      class: "h-3 w-3",
                                                      fill: "none",
                                                      stroke: "currentColor",
                                                      viewBox: "0 0 24 24"
                                                    }, [
                                                      createVNode("path", {
                                                        "stroke-linecap": "round",
                                                        "stroke-linejoin": "round",
                                                        "stroke-width": "2",
                                                        d: "M6 18L18 6M6 6l12 12"
                                                      })
                                                    ]))
                                                  ], 8, ["onClick"])
                                                ]);
                                              }), 128))
                                            ])) : createCommentVNode("", true),
                                            createVNode("div", null, [
                                              createVNode("input", {
                                                ref_key: "editImageInput",
                                                ref: editImageInput,
                                                type: "file",
                                                accept: "image/*",
                                                multiple: "",
                                                class: "hidden",
                                                onChange: handleEditImageSelect
                                              }, null, 544),
                                              createVNode(_component_ui_button, {
                                                type: "button",
                                                variant: "outline",
                                                disabled: unref(isUploadingImage),
                                                onClick: ($event) => unref(editImageInput)?.click(),
                                                class: "w-full"
                                              }, {
                                                default: withCtx(() => [
                                                  !unref(isUploadingImage) ? (openBlock(), createBlock(unref(Upload), {
                                                    key: 0,
                                                    class: "mr-2 h-4 w-4"
                                                  })) : (openBlock(), createBlock(_component_ui_spinner, {
                                                    key: 1,
                                                    size: "sm",
                                                    class: "mr-2"
                                                  })),
                                                  createTextVNode(" " + toDisplayString(unref(isUploadingImage) ? "Загрузка..." : unref(selectedImageFiles).length > 0 ? `Добавить ещё (${unref(selectedImageFiles).length} выбрано)` : "Добавить изображения"), 1)
                                                ]),
                                                _: 1
                                              }, 8, ["disabled", "onClick"]),
                                              createVNode("p", { class: "mt-1 text-xs text-muted-foreground" }, " Поддерживаемые форматы: JPG, PNG, GIF. Максимальный размер файла: 10МБ ")
                                            ])
                                          ]),
                                          errors.length ? (openBlock(), createBlock(_component_ui_field_error, {
                                            key: 0,
                                            errors
                                          }, null, 8, ["errors"])) : createCommentVNode("", true)
                                        ]),
                                        _: 2
                                      }, 1032, ["data-invalid"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(Field), { name: "is_public" }, {
                                    default: withCtx(({ field, errors, setValue }) => [
                                      createVNode(_component_ui_field, {
                                        "data-invalid": !!errors.length,
                                        orientation: "horizontal"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_component_ui_field_label, {
                                            for: "is_public",
                                            class: "cursor-pointer flex-1"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(" Сделать публичным ")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_ui_switch, {
                                            id: "is_public",
                                            "model-value": field.value,
                                            "onUpdate:modelValue": setValue,
                                            "aria-invalid": !!errors.length
                                          }, null, 8, ["model-value", "onUpdate:modelValue", "aria-invalid"]),
                                          errors.length ? (openBlock(), createBlock(_component_ui_field_error, {
                                            key: 0,
                                            errors
                                          }, null, 8, ["errors"])) : createCommentVNode("", true)
                                        ]),
                                        _: 2
                                      }, 1032, ["data-invalid"])
                                    ]),
                                    _: 1
                                  })
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_ui_dialog_footer, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_ui_button, {
                                  type: "button",
                                  variant: "outline",
                                  onClick: ($event) => isEditDialogOpen.value = false,
                                  disabled: unref(isUpdatingPortfolio)
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(` Отмена `);
                                    } else {
                                      return [
                                        createTextVNode(" Отмена ")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(_component_base_processing_button, {
                                  type: "submit",
                                  label: "Сохранить",
                                  "is-processing": unref(isUpdatingPortfolio)
                                }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_ui_button, {
                                    type: "button",
                                    variant: "outline",
                                    onClick: ($event) => isEditDialogOpen.value = false,
                                    disabled: unref(isUpdatingPortfolio)
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Отмена ")
                                    ]),
                                    _: 1
                                  }, 8, ["onClick", "disabled"]),
                                  createVNode(_component_base_processing_button, {
                                    type: "submit",
                                    label: "Сохранить",
                                    "is-processing": unref(isUpdatingPortfolio)
                                  }, null, 8, ["is-processing"])
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_ui_field_group, { class: "py-4" }, {
                              default: withCtx(() => [
                                createVNode(_component_base_select, {
                                  name: "category",
                                  label: "Категория",
                                  placeholder: "Выберите категорию",
                                  options: PORTFOLIO_CATEGORIES,
                                  "errors-to-show": "all"
                                }),
                                createVNode(unref(Field), { name: "description" }, {
                                  default: withCtx(({ field, errors, setValue }) => [
                                    createVNode(_component_ui_field, {
                                      "data-invalid": !!errors.length
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_ui_field_label, { for: "description" }, {
                                          default: withCtx(() => [
                                            createTextVNode(" Описание ")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_ui_textarea, {
                                          id: "description",
                                          placeholder: "Опишите вашу работу",
                                          "aria-invalid": !!errors.length,
                                          modelValue: field.value,
                                          "onUpdate:modelValue": setValue
                                        }, null, 8, ["aria-invalid", "modelValue", "onUpdate:modelValue"]),
                                        errors.length ? (openBlock(), createBlock(_component_ui_field_error, {
                                          key: 0,
                                          errors
                                        }, null, 8, ["errors"])) : createCommentVNode("", true)
                                      ]),
                                      _: 2
                                    }, 1032, ["data-invalid"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(Field), { name: "image_file" }, {
                                  default: withCtx(({ errors }) => [
                                    createVNode(_component_ui_field, {
                                      "data-invalid": !!errors.length
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_ui_field_label, null, {
                                          default: withCtx(() => [
                                            createTextVNode(" Изображения ")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode("div", { class: "space-y-4" }, [
                                          unref(existingImageUrls).length > 0 ? (openBlock(), createBlock("div", {
                                            key: 0,
                                            class: "grid grid-cols-4 gap-2"
                                          }, [
                                            (openBlock(true), createBlock(Fragment, null, renderList(unref(existingImageUrls), (imageUrl, index) => {
                                              return openBlock(), createBlock("div", {
                                                key: index,
                                                class: "relative aspect-square w-full overflow-hidden rounded-lg bg-muted"
                                              }, [
                                                createVNode("img", {
                                                  src: imageUrl,
                                                  alt: `Изображение ${index + 1}`,
                                                  class: "h-full w-full object-cover"
                                                }, null, 8, ["src", "alt"]),
                                                createVNode("button", {
                                                  type: "button",
                                                  onClick: () => handleRemoveExistingImage(index),
                                                  class: "absolute right-1 top-1 rounded-full bg-destructive p-1 text-destructive-foreground hover:bg-destructive/90"
                                                }, [
                                                  (openBlock(), createBlock("svg", {
                                                    class: "h-3 w-3",
                                                    fill: "none",
                                                    stroke: "currentColor",
                                                    viewBox: "0 0 24 24"
                                                  }, [
                                                    createVNode("path", {
                                                      "stroke-linecap": "round",
                                                      "stroke-linejoin": "round",
                                                      "stroke-width": "2",
                                                      d: "M6 18L18 6M6 6l12 12"
                                                    })
                                                  ]))
                                                ], 8, ["onClick"])
                                              ]);
                                            }), 128))
                                          ])) : createCommentVNode("", true),
                                          unref(previewImageUrls).length > 0 ? (openBlock(), createBlock("div", {
                                            key: 1,
                                            class: "grid grid-cols-4 gap-2"
                                          }, [
                                            (openBlock(true), createBlock(Fragment, null, renderList(unref(previewImageUrls), (preview, index) => {
                                              return openBlock(), createBlock("div", {
                                                key: index,
                                                class: "relative aspect-square w-full overflow-hidden rounded-lg bg-muted"
                                              }, [
                                                createVNode("img", {
                                                  src: preview.url,
                                                  alt: `Превью ${index + 1}`,
                                                  class: "h-full w-full object-cover"
                                                }, null, 8, ["src", "alt"]),
                                                createVNode("button", {
                                                  type: "button",
                                                  onClick: () => handleRemoveImage(index),
                                                  class: "absolute right-1 top-1 rounded-full bg-destructive p-1 text-destructive-foreground hover:bg-destructive/90"
                                                }, [
                                                  (openBlock(), createBlock("svg", {
                                                    class: "h-3 w-3",
                                                    fill: "none",
                                                    stroke: "currentColor",
                                                    viewBox: "0 0 24 24"
                                                  }, [
                                                    createVNode("path", {
                                                      "stroke-linecap": "round",
                                                      "stroke-linejoin": "round",
                                                      "stroke-width": "2",
                                                      d: "M6 18L18 6M6 6l12 12"
                                                    })
                                                  ]))
                                                ], 8, ["onClick"])
                                              ]);
                                            }), 128))
                                          ])) : createCommentVNode("", true),
                                          createVNode("div", null, [
                                            createVNode("input", {
                                              ref_key: "editImageInput",
                                              ref: editImageInput,
                                              type: "file",
                                              accept: "image/*",
                                              multiple: "",
                                              class: "hidden",
                                              onChange: handleEditImageSelect
                                            }, null, 544),
                                            createVNode(_component_ui_button, {
                                              type: "button",
                                              variant: "outline",
                                              disabled: unref(isUploadingImage),
                                              onClick: ($event) => unref(editImageInput)?.click(),
                                              class: "w-full"
                                            }, {
                                              default: withCtx(() => [
                                                !unref(isUploadingImage) ? (openBlock(), createBlock(unref(Upload), {
                                                  key: 0,
                                                  class: "mr-2 h-4 w-4"
                                                })) : (openBlock(), createBlock(_component_ui_spinner, {
                                                  key: 1,
                                                  size: "sm",
                                                  class: "mr-2"
                                                })),
                                                createTextVNode(" " + toDisplayString(unref(isUploadingImage) ? "Загрузка..." : unref(selectedImageFiles).length > 0 ? `Добавить ещё (${unref(selectedImageFiles).length} выбрано)` : "Добавить изображения"), 1)
                                              ]),
                                              _: 1
                                            }, 8, ["disabled", "onClick"]),
                                            createVNode("p", { class: "mt-1 text-xs text-muted-foreground" }, " Поддерживаемые форматы: JPG, PNG, GIF. Максимальный размер файла: 10МБ ")
                                          ])
                                        ]),
                                        errors.length ? (openBlock(), createBlock(_component_ui_field_error, {
                                          key: 0,
                                          errors
                                        }, null, 8, ["errors"])) : createCommentVNode("", true)
                                      ]),
                                      _: 2
                                    }, 1032, ["data-invalid"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(Field), { name: "is_public" }, {
                                  default: withCtx(({ field, errors, setValue }) => [
                                    createVNode(_component_ui_field, {
                                      "data-invalid": !!errors.length,
                                      orientation: "horizontal"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_ui_field_label, {
                                          for: "is_public",
                                          class: "cursor-pointer flex-1"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(" Сделать публичным ")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_ui_switch, {
                                          id: "is_public",
                                          "model-value": field.value,
                                          "onUpdate:modelValue": setValue,
                                          "aria-invalid": !!errors.length
                                        }, null, 8, ["model-value", "onUpdate:modelValue", "aria-invalid"]),
                                        errors.length ? (openBlock(), createBlock(_component_ui_field_error, {
                                          key: 0,
                                          errors
                                        }, null, 8, ["errors"])) : createCommentVNode("", true)
                                      ]),
                                      _: 2
                                    }, 1032, ["data-invalid"])
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(_component_ui_dialog_footer, null, {
                              default: withCtx(() => [
                                createVNode(_component_ui_button, {
                                  type: "button",
                                  variant: "outline",
                                  onClick: ($event) => isEditDialogOpen.value = false,
                                  disabled: unref(isUpdatingPortfolio)
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Отмена ")
                                  ]),
                                  _: 1
                                }, 8, ["onClick", "disabled"]),
                                createVNode(_component_base_processing_button, {
                                  type: "submit",
                                  label: "Сохранить",
                                  "is-processing": unref(isUpdatingPortfolio)
                                }, null, 8, ["is-processing"])
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    createVNode(_component_ui_dialog_header, null, {
                      default: withCtx(() => [
                        createVNode(_component_ui_dialog_title, null, {
                          default: withCtx(() => [
                            createTextVNode("Редактировать портфолио")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_ui_dialog_description, null, {
                          default: withCtx(() => [
                            createTextVNode(" Измените информацию о вашей работе ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    unref(isEditDialogOpen) && unref(editingPortfolio) ? (openBlock(), createBlock(unref(Form), {
                      key: `edit-${unref(editingPortfolio).id}`,
                      "validation-schema": unref(toTypedSchema)("portfolioCreateSchema" in _ctx ? _ctx.portfolioCreateSchema : unref(portfolioCreateSchema)),
                      "initial-values": unref(editFormInitialValues),
                      onSubmit: updatePortfolio
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_ui_field_group, { class: "py-4" }, {
                          default: withCtx(() => [
                            createVNode(_component_base_select, {
                              name: "category",
                              label: "Категория",
                              placeholder: "Выберите категорию",
                              options: PORTFOLIO_CATEGORIES,
                              "errors-to-show": "all"
                            }),
                            createVNode(unref(Field), { name: "description" }, {
                              default: withCtx(({ field, errors, setValue }) => [
                                createVNode(_component_ui_field, {
                                  "data-invalid": !!errors.length
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_ui_field_label, { for: "description" }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Описание ")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_ui_textarea, {
                                      id: "description",
                                      placeholder: "Опишите вашу работу",
                                      "aria-invalid": !!errors.length,
                                      modelValue: field.value,
                                      "onUpdate:modelValue": setValue
                                    }, null, 8, ["aria-invalid", "modelValue", "onUpdate:modelValue"]),
                                    errors.length ? (openBlock(), createBlock(_component_ui_field_error, {
                                      key: 0,
                                      errors
                                    }, null, 8, ["errors"])) : createCommentVNode("", true)
                                  ]),
                                  _: 2
                                }, 1032, ["data-invalid"])
                              ]),
                              _: 1
                            }),
                            createVNode(unref(Field), { name: "image_file" }, {
                              default: withCtx(({ errors }) => [
                                createVNode(_component_ui_field, {
                                  "data-invalid": !!errors.length
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_ui_field_label, null, {
                                      default: withCtx(() => [
                                        createTextVNode(" Изображения ")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode("div", { class: "space-y-4" }, [
                                      unref(existingImageUrls).length > 0 ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "grid grid-cols-4 gap-2"
                                      }, [
                                        (openBlock(true), createBlock(Fragment, null, renderList(unref(existingImageUrls), (imageUrl, index) => {
                                          return openBlock(), createBlock("div", {
                                            key: index,
                                            class: "relative aspect-square w-full overflow-hidden rounded-lg bg-muted"
                                          }, [
                                            createVNode("img", {
                                              src: imageUrl,
                                              alt: `Изображение ${index + 1}`,
                                              class: "h-full w-full object-cover"
                                            }, null, 8, ["src", "alt"]),
                                            createVNode("button", {
                                              type: "button",
                                              onClick: () => handleRemoveExistingImage(index),
                                              class: "absolute right-1 top-1 rounded-full bg-destructive p-1 text-destructive-foreground hover:bg-destructive/90"
                                            }, [
                                              (openBlock(), createBlock("svg", {
                                                class: "h-3 w-3",
                                                fill: "none",
                                                stroke: "currentColor",
                                                viewBox: "0 0 24 24"
                                              }, [
                                                createVNode("path", {
                                                  "stroke-linecap": "round",
                                                  "stroke-linejoin": "round",
                                                  "stroke-width": "2",
                                                  d: "M6 18L18 6M6 6l12 12"
                                                })
                                              ]))
                                            ], 8, ["onClick"])
                                          ]);
                                        }), 128))
                                      ])) : createCommentVNode("", true),
                                      unref(previewImageUrls).length > 0 ? (openBlock(), createBlock("div", {
                                        key: 1,
                                        class: "grid grid-cols-4 gap-2"
                                      }, [
                                        (openBlock(true), createBlock(Fragment, null, renderList(unref(previewImageUrls), (preview, index) => {
                                          return openBlock(), createBlock("div", {
                                            key: index,
                                            class: "relative aspect-square w-full overflow-hidden rounded-lg bg-muted"
                                          }, [
                                            createVNode("img", {
                                              src: preview.url,
                                              alt: `Превью ${index + 1}`,
                                              class: "h-full w-full object-cover"
                                            }, null, 8, ["src", "alt"]),
                                            createVNode("button", {
                                              type: "button",
                                              onClick: () => handleRemoveImage(index),
                                              class: "absolute right-1 top-1 rounded-full bg-destructive p-1 text-destructive-foreground hover:bg-destructive/90"
                                            }, [
                                              (openBlock(), createBlock("svg", {
                                                class: "h-3 w-3",
                                                fill: "none",
                                                stroke: "currentColor",
                                                viewBox: "0 0 24 24"
                                              }, [
                                                createVNode("path", {
                                                  "stroke-linecap": "round",
                                                  "stroke-linejoin": "round",
                                                  "stroke-width": "2",
                                                  d: "M6 18L18 6M6 6l12 12"
                                                })
                                              ]))
                                            ], 8, ["onClick"])
                                          ]);
                                        }), 128))
                                      ])) : createCommentVNode("", true),
                                      createVNode("div", null, [
                                        createVNode("input", {
                                          ref_key: "editImageInput",
                                          ref: editImageInput,
                                          type: "file",
                                          accept: "image/*",
                                          multiple: "",
                                          class: "hidden",
                                          onChange: handleEditImageSelect
                                        }, null, 544),
                                        createVNode(_component_ui_button, {
                                          type: "button",
                                          variant: "outline",
                                          disabled: unref(isUploadingImage),
                                          onClick: ($event) => unref(editImageInput)?.click(),
                                          class: "w-full"
                                        }, {
                                          default: withCtx(() => [
                                            !unref(isUploadingImage) ? (openBlock(), createBlock(unref(Upload), {
                                              key: 0,
                                              class: "mr-2 h-4 w-4"
                                            })) : (openBlock(), createBlock(_component_ui_spinner, {
                                              key: 1,
                                              size: "sm",
                                              class: "mr-2"
                                            })),
                                            createTextVNode(" " + toDisplayString(unref(isUploadingImage) ? "Загрузка..." : unref(selectedImageFiles).length > 0 ? `Добавить ещё (${unref(selectedImageFiles).length} выбрано)` : "Добавить изображения"), 1)
                                          ]),
                                          _: 1
                                        }, 8, ["disabled", "onClick"]),
                                        createVNode("p", { class: "mt-1 text-xs text-muted-foreground" }, " Поддерживаемые форматы: JPG, PNG, GIF. Максимальный размер файла: 10МБ ")
                                      ])
                                    ]),
                                    errors.length ? (openBlock(), createBlock(_component_ui_field_error, {
                                      key: 0,
                                      errors
                                    }, null, 8, ["errors"])) : createCommentVNode("", true)
                                  ]),
                                  _: 2
                                }, 1032, ["data-invalid"])
                              ]),
                              _: 1
                            }),
                            createVNode(unref(Field), { name: "is_public" }, {
                              default: withCtx(({ field, errors, setValue }) => [
                                createVNode(_component_ui_field, {
                                  "data-invalid": !!errors.length,
                                  orientation: "horizontal"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_ui_field_label, {
                                      for: "is_public",
                                      class: "cursor-pointer flex-1"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Сделать публичным ")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_ui_switch, {
                                      id: "is_public",
                                      "model-value": field.value,
                                      "onUpdate:modelValue": setValue,
                                      "aria-invalid": !!errors.length
                                    }, null, 8, ["model-value", "onUpdate:modelValue", "aria-invalid"]),
                                    errors.length ? (openBlock(), createBlock(_component_ui_field_error, {
                                      key: 0,
                                      errors
                                    }, null, 8, ["errors"])) : createCommentVNode("", true)
                                  ]),
                                  _: 2
                                }, 1032, ["data-invalid"])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_ui_dialog_footer, null, {
                          default: withCtx(() => [
                            createVNode(_component_ui_button, {
                              type: "button",
                              variant: "outline",
                              onClick: ($event) => isEditDialogOpen.value = false,
                              disabled: unref(isUpdatingPortfolio)
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Отмена ")
                              ]),
                              _: 1
                            }, 8, ["onClick", "disabled"]),
                            createVNode(_component_base_processing_button, {
                              type: "submit",
                              label: "Сохранить",
                              "is-processing": unref(isUpdatingPortfolio)
                            }, null, 8, ["is-processing"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["validation-schema", "initial-values"])) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_ui_dialog_content, { class: "sm:max-w-2xl" }, {
                default: withCtx(() => [
                  createVNode(_component_ui_dialog_header, null, {
                    default: withCtx(() => [
                      createVNode(_component_ui_dialog_title, null, {
                        default: withCtx(() => [
                          createTextVNode("Редактировать портфолио")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_ui_dialog_description, null, {
                        default: withCtx(() => [
                          createTextVNode(" Измените информацию о вашей работе ")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  unref(isEditDialogOpen) && unref(editingPortfolio) ? (openBlock(), createBlock(unref(Form), {
                    key: `edit-${unref(editingPortfolio).id}`,
                    "validation-schema": unref(toTypedSchema)("portfolioCreateSchema" in _ctx ? _ctx.portfolioCreateSchema : unref(portfolioCreateSchema)),
                    "initial-values": unref(editFormInitialValues),
                    onSubmit: updatePortfolio
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_ui_field_group, { class: "py-4" }, {
                        default: withCtx(() => [
                          createVNode(_component_base_select, {
                            name: "category",
                            label: "Категория",
                            placeholder: "Выберите категорию",
                            options: PORTFOLIO_CATEGORIES,
                            "errors-to-show": "all"
                          }),
                          createVNode(unref(Field), { name: "description" }, {
                            default: withCtx(({ field, errors, setValue }) => [
                              createVNode(_component_ui_field, {
                                "data-invalid": !!errors.length
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_ui_field_label, { for: "description" }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Описание ")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_ui_textarea, {
                                    id: "description",
                                    placeholder: "Опишите вашу работу",
                                    "aria-invalid": !!errors.length,
                                    modelValue: field.value,
                                    "onUpdate:modelValue": setValue
                                  }, null, 8, ["aria-invalid", "modelValue", "onUpdate:modelValue"]),
                                  errors.length ? (openBlock(), createBlock(_component_ui_field_error, {
                                    key: 0,
                                    errors
                                  }, null, 8, ["errors"])) : createCommentVNode("", true)
                                ]),
                                _: 2
                              }, 1032, ["data-invalid"])
                            ]),
                            _: 1
                          }),
                          createVNode(unref(Field), { name: "image_file" }, {
                            default: withCtx(({ errors }) => [
                              createVNode(_component_ui_field, {
                                "data-invalid": !!errors.length
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_ui_field_label, null, {
                                    default: withCtx(() => [
                                      createTextVNode(" Изображения ")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode("div", { class: "space-y-4" }, [
                                    unref(existingImageUrls).length > 0 ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "grid grid-cols-4 gap-2"
                                    }, [
                                      (openBlock(true), createBlock(Fragment, null, renderList(unref(existingImageUrls), (imageUrl, index) => {
                                        return openBlock(), createBlock("div", {
                                          key: index,
                                          class: "relative aspect-square w-full overflow-hidden rounded-lg bg-muted"
                                        }, [
                                          createVNode("img", {
                                            src: imageUrl,
                                            alt: `Изображение ${index + 1}`,
                                            class: "h-full w-full object-cover"
                                          }, null, 8, ["src", "alt"]),
                                          createVNode("button", {
                                            type: "button",
                                            onClick: () => handleRemoveExistingImage(index),
                                            class: "absolute right-1 top-1 rounded-full bg-destructive p-1 text-destructive-foreground hover:bg-destructive/90"
                                          }, [
                                            (openBlock(), createBlock("svg", {
                                              class: "h-3 w-3",
                                              fill: "none",
                                              stroke: "currentColor",
                                              viewBox: "0 0 24 24"
                                            }, [
                                              createVNode("path", {
                                                "stroke-linecap": "round",
                                                "stroke-linejoin": "round",
                                                "stroke-width": "2",
                                                d: "M6 18L18 6M6 6l12 12"
                                              })
                                            ]))
                                          ], 8, ["onClick"])
                                        ]);
                                      }), 128))
                                    ])) : createCommentVNode("", true),
                                    unref(previewImageUrls).length > 0 ? (openBlock(), createBlock("div", {
                                      key: 1,
                                      class: "grid grid-cols-4 gap-2"
                                    }, [
                                      (openBlock(true), createBlock(Fragment, null, renderList(unref(previewImageUrls), (preview, index) => {
                                        return openBlock(), createBlock("div", {
                                          key: index,
                                          class: "relative aspect-square w-full overflow-hidden rounded-lg bg-muted"
                                        }, [
                                          createVNode("img", {
                                            src: preview.url,
                                            alt: `Превью ${index + 1}`,
                                            class: "h-full w-full object-cover"
                                          }, null, 8, ["src", "alt"]),
                                          createVNode("button", {
                                            type: "button",
                                            onClick: () => handleRemoveImage(index),
                                            class: "absolute right-1 top-1 rounded-full bg-destructive p-1 text-destructive-foreground hover:bg-destructive/90"
                                          }, [
                                            (openBlock(), createBlock("svg", {
                                              class: "h-3 w-3",
                                              fill: "none",
                                              stroke: "currentColor",
                                              viewBox: "0 0 24 24"
                                            }, [
                                              createVNode("path", {
                                                "stroke-linecap": "round",
                                                "stroke-linejoin": "round",
                                                "stroke-width": "2",
                                                d: "M6 18L18 6M6 6l12 12"
                                              })
                                            ]))
                                          ], 8, ["onClick"])
                                        ]);
                                      }), 128))
                                    ])) : createCommentVNode("", true),
                                    createVNode("div", null, [
                                      createVNode("input", {
                                        ref_key: "editImageInput",
                                        ref: editImageInput,
                                        type: "file",
                                        accept: "image/*",
                                        multiple: "",
                                        class: "hidden",
                                        onChange: handleEditImageSelect
                                      }, null, 544),
                                      createVNode(_component_ui_button, {
                                        type: "button",
                                        variant: "outline",
                                        disabled: unref(isUploadingImage),
                                        onClick: ($event) => unref(editImageInput)?.click(),
                                        class: "w-full"
                                      }, {
                                        default: withCtx(() => [
                                          !unref(isUploadingImage) ? (openBlock(), createBlock(unref(Upload), {
                                            key: 0,
                                            class: "mr-2 h-4 w-4"
                                          })) : (openBlock(), createBlock(_component_ui_spinner, {
                                            key: 1,
                                            size: "sm",
                                            class: "mr-2"
                                          })),
                                          createTextVNode(" " + toDisplayString(unref(isUploadingImage) ? "Загрузка..." : unref(selectedImageFiles).length > 0 ? `Добавить ещё (${unref(selectedImageFiles).length} выбрано)` : "Добавить изображения"), 1)
                                        ]),
                                        _: 1
                                      }, 8, ["disabled", "onClick"]),
                                      createVNode("p", { class: "mt-1 text-xs text-muted-foreground" }, " Поддерживаемые форматы: JPG, PNG, GIF. Максимальный размер файла: 10МБ ")
                                    ])
                                  ]),
                                  errors.length ? (openBlock(), createBlock(_component_ui_field_error, {
                                    key: 0,
                                    errors
                                  }, null, 8, ["errors"])) : createCommentVNode("", true)
                                ]),
                                _: 2
                              }, 1032, ["data-invalid"])
                            ]),
                            _: 1
                          }),
                          createVNode(unref(Field), { name: "is_public" }, {
                            default: withCtx(({ field, errors, setValue }) => [
                              createVNode(_component_ui_field, {
                                "data-invalid": !!errors.length,
                                orientation: "horizontal"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_ui_field_label, {
                                    for: "is_public",
                                    class: "cursor-pointer flex-1"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Сделать публичным ")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_ui_switch, {
                                    id: "is_public",
                                    "model-value": field.value,
                                    "onUpdate:modelValue": setValue,
                                    "aria-invalid": !!errors.length
                                  }, null, 8, ["model-value", "onUpdate:modelValue", "aria-invalid"]),
                                  errors.length ? (openBlock(), createBlock(_component_ui_field_error, {
                                    key: 0,
                                    errors
                                  }, null, 8, ["errors"])) : createCommentVNode("", true)
                                ]),
                                _: 2
                              }, 1032, ["data-invalid"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_ui_dialog_footer, null, {
                        default: withCtx(() => [
                          createVNode(_component_ui_button, {
                            type: "button",
                            variant: "outline",
                            onClick: ($event) => isEditDialogOpen.value = false,
                            disabled: unref(isUpdatingPortfolio)
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Отмена ")
                            ]),
                            _: 1
                          }, 8, ["onClick", "disabled"]),
                          createVNode(_component_base_processing_button, {
                            type: "submit",
                            label: "Сохранить",
                            "is-processing": unref(isUpdatingPortfolio)
                          }, null, 8, ["is-processing"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["validation-schema", "initial-values"])) : createCommentVNode("", true)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_ui_dialog, {
        open: unref(isDeleteDialogOpen),
        "onUpdate:open": ($event) => isDeleteDialogOpen.value = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_ui_dialog_content, { class: "sm:max-w-md" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_ui_dialog_header, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_ui_dialog_title, { class: "flex items-center gap-2" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(AlertTriangle), { class: "h-5 w-5 text-destructive" }, null, _parent5, _scopeId4));
                              _push5(` Удалить портфолио `);
                            } else {
                              return [
                                createVNode(unref(AlertTriangle), { class: "h-5 w-5 text-destructive" }),
                                createTextVNode(" Удалить портфолио ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_ui_dialog_description, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Вы уверены, что хотите удалить это портфолио? Это действие нельзя отменить. Все изображения также будут удалены. `);
                            } else {
                              return [
                                createTextVNode(" Вы уверены, что хотите удалить это портфолио? Это действие нельзя отменить. Все изображения также будут удалены. ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_ui_dialog_title, { class: "flex items-center gap-2" }, {
                            default: withCtx(() => [
                              createVNode(unref(AlertTriangle), { class: "h-5 w-5 text-destructive" }),
                              createTextVNode(" Удалить портфолио ")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_ui_dialog_description, null, {
                            default: withCtx(() => [
                              createTextVNode(" Вы уверены, что хотите удалить это портфолио? Это действие нельзя отменить. Все изображения также будут удалены. ")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_ui_dialog_footer, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_ui_button, {
                          variant: "outline",
                          onClick: ($event) => isDeleteDialogOpen.value = false,
                          disabled: unref(isDeletingPortfolio)
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Отмена `);
                            } else {
                              return [
                                createTextVNode(" Отмена ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_ui_button, {
                          variant: "destructive",
                          onClick: deletePortfolio,
                          disabled: unref(isDeletingPortfolio)
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              if (!unref(isDeletingPortfolio)) {
                                _push5(ssrRenderComponent(unref(Trash2), { class: "w-4 h-4 mr-2" }, null, _parent5, _scopeId4));
                              } else {
                                _push5(ssrRenderComponent(_component_ui_spinner, {
                                  size: "sm",
                                  class: "mr-2"
                                }, null, _parent5, _scopeId4));
                              }
                              _push5(` ${ssrInterpolate(unref(isDeletingPortfolio) ? "Удаление..." : "Удалить")}`);
                            } else {
                              return [
                                !unref(isDeletingPortfolio) ? (openBlock(), createBlock(unref(Trash2), {
                                  key: 0,
                                  class: "w-4 h-4 mr-2"
                                })) : (openBlock(), createBlock(_component_ui_spinner, {
                                  key: 1,
                                  size: "sm",
                                  class: "mr-2"
                                })),
                                createTextVNode(" " + toDisplayString(unref(isDeletingPortfolio) ? "Удаление..." : "Удалить"), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_ui_button, {
                            variant: "outline",
                            onClick: ($event) => isDeleteDialogOpen.value = false,
                            disabled: unref(isDeletingPortfolio)
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Отмена ")
                            ]),
                            _: 1
                          }, 8, ["onClick", "disabled"]),
                          createVNode(_component_ui_button, {
                            variant: "destructive",
                            onClick: deletePortfolio,
                            disabled: unref(isDeletingPortfolio)
                          }, {
                            default: withCtx(() => [
                              !unref(isDeletingPortfolio) ? (openBlock(), createBlock(unref(Trash2), {
                                key: 0,
                                class: "w-4 h-4 mr-2"
                              })) : (openBlock(), createBlock(_component_ui_spinner, {
                                key: 1,
                                size: "sm",
                                class: "mr-2"
                              })),
                              createTextVNode(" " + toDisplayString(unref(isDeletingPortfolio) ? "Удаление..." : "Удалить"), 1)
                            ]),
                            _: 1
                          }, 8, ["disabled"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_ui_dialog_header, null, {
                      default: withCtx(() => [
                        createVNode(_component_ui_dialog_title, { class: "flex items-center gap-2" }, {
                          default: withCtx(() => [
                            createVNode(unref(AlertTriangle), { class: "h-5 w-5 text-destructive" }),
                            createTextVNode(" Удалить портфолио ")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_ui_dialog_description, null, {
                          default: withCtx(() => [
                            createTextVNode(" Вы уверены, что хотите удалить это портфолио? Это действие нельзя отменить. Все изображения также будут удалены. ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_ui_dialog_footer, null, {
                      default: withCtx(() => [
                        createVNode(_component_ui_button, {
                          variant: "outline",
                          onClick: ($event) => isDeleteDialogOpen.value = false,
                          disabled: unref(isDeletingPortfolio)
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Отмена ")
                          ]),
                          _: 1
                        }, 8, ["onClick", "disabled"]),
                        createVNode(_component_ui_button, {
                          variant: "destructive",
                          onClick: deletePortfolio,
                          disabled: unref(isDeletingPortfolio)
                        }, {
                          default: withCtx(() => [
                            !unref(isDeletingPortfolio) ? (openBlock(), createBlock(unref(Trash2), {
                              key: 0,
                              class: "w-4 h-4 mr-2"
                            })) : (openBlock(), createBlock(_component_ui_spinner, {
                              key: 1,
                              size: "sm",
                              class: "mr-2"
                            })),
                            createTextVNode(" " + toDisplayString(unref(isDeletingPortfolio) ? "Удаление..." : "Удалить"), 1)
                          ]),
                          _: 1
                        }, 8, ["disabled"])
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
                      createVNode(_component_ui_dialog_title, { class: "flex items-center gap-2" }, {
                        default: withCtx(() => [
                          createVNode(unref(AlertTriangle), { class: "h-5 w-5 text-destructive" }),
                          createTextVNode(" Удалить портфолио ")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_ui_dialog_description, null, {
                        default: withCtx(() => [
                          createTextVNode(" Вы уверены, что хотите удалить это портфолио? Это действие нельзя отменить. Все изображения также будут удалены. ")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_ui_dialog_footer, null, {
                    default: withCtx(() => [
                      createVNode(_component_ui_button, {
                        variant: "outline",
                        onClick: ($event) => isDeleteDialogOpen.value = false,
                        disabled: unref(isDeletingPortfolio)
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Отмена ")
                        ]),
                        _: 1
                      }, 8, ["onClick", "disabled"]),
                      createVNode(_component_ui_button, {
                        variant: "destructive",
                        onClick: deletePortfolio,
                        disabled: unref(isDeletingPortfolio)
                      }, {
                        default: withCtx(() => [
                          !unref(isDeletingPortfolio) ? (openBlock(), createBlock(unref(Trash2), {
                            key: 0,
                            class: "w-4 h-4 mr-2"
                          })) : (openBlock(), createBlock(_component_ui_spinner, {
                            key: 1,
                            size: "sm",
                            class: "mr-2"
                          })),
                          createTextVNode(" " + toDisplayString(unref(isDeletingPortfolio) ? "Удаление..." : "Удалить"), 1)
                        ]),
                        _: 1
                      }, 8, ["disabled"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/profile/portfolio.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=portfolio-DBpQHCGv.mjs.map
