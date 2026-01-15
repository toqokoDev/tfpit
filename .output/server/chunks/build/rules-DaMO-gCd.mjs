import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs } from 'vue/server-renderer';
import { u as useHead } from './server.mjs';
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
import 'lucide-vue-next';
import 'vue-sonner';
import 'clsx';
import 'tailwind-merge';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "rules",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({ title: "Правила" });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-background text-foreground" }, _attrs))}><section class="container mx-auto px-4 py-20 lg:py-28"><div class="mx-auto max-w-3xl"><h1 class="mb-6 text-4xl font-extrabold tracking-tight lg:text-5xl"> Правила использования </h1><p class="mb-12 text-lg text-muted-foreground"> Чтобы наша платформа оставалась безопасным и комфортным местом для всех, пожалуйста, ознакомьтесь с правилами использования сервиса. </p><div class="space-y-8"><div class="space-y-4"><h2 class="text-2xl font-bold">1. Общие принципы</h2><div class="space-y-3 text-muted-foreground"><p> TFP.BY — это платформа для взаимовыгодного сотрудничества между фотографами, моделями, визажистами и другими творческими специалистами. Все участники должны относиться друг к другу с уважением и профессионализмом. </p></div></div><div class="space-y-4"><h2 class="text-2xl font-bold">2. Создание профиля</h2><div class="space-y-3 text-muted-foreground"><p>При создании профиля вы обязуетесь:</p><ul class="list-disc space-y-2 pl-6"><li>Указывать достоверную информацию о себе</li><li>Использовать реальные фотографии</li><li>Заполнять профиль полностью и актуально</li><li>Не создавать несколько аккаунтов для обхода ограничений</li></ul></div></div><div class="space-y-4"><h2 class="text-2xl font-bold">3. Публикация объявлений</h2><div class="space-y-3 text-muted-foreground"><p>Объявления должны соответствовать следующим требованиям:</p><ul class="list-disc space-y-2 pl-6"><li>Содержать четкое описание проекта и ожиданий</li><li>Указывать конкретные даты и сроки</li><li>Быть актуальными (удаляйте закрытые проекты)</li><li>Не нарушать законодательство и этические нормы</li></ul></div></div><div class="space-y-4"><h2 class="text-2xl font-bold">4. Взаимодействие между участниками</h2><div class="space-y-3 text-muted-foreground"><p>При общении с другими участниками:</p><ul class="list-disc space-y-2 pl-6"><li>Будьте вежливы и профессиональны</li><li>Соблюдайте договоренности и сроки</li><li>Уважайте границы и личное пространство</li><li>Не используйте платформу для спама или рекламы не по теме</li></ul></div></div><div class="space-y-4"><h2 class="text-2xl font-bold">5. Авторские права</h2><div class="space-y-3 text-muted-foreground"><p> Все материалы, опубликованные на платформе, защищены авторским правом. Использование фотографий и других работ без разрешения автора запрещено. Условия использования результатов съемки обсуждаются участниками проекта заранее. </p></div></div><div class="space-y-4"><h2 class="text-2xl font-bold">6. Безопасность</h2><div class="space-y-3 text-muted-foreground"><p>Для обеспечения безопасности:</p><ul class="list-disc space-y-2 pl-6"><li>Не сообщайте личные данные до установления доверия</li><li>Сообщайте о подозрительной активности администрации</li><li>Используйте систему рейтингов и отзывов</li><li>Проводите первые встречи в публичных местах</li></ul></div></div><div class="space-y-4"><h2 class="text-2xl font-bold">7. Нарушения и санкции</h2><div class="space-y-3 text-muted-foreground"><p> За нарушение правил администрация оставляет за собой право ограничить доступ к платформе или удалить аккаунт нарушителя. Решения принимаются после рассмотрения жалоб и доказательств. </p></div></div></div><div class="mt-12 rounded-xl border bg-muted/50 p-6"><p class="text-sm text-muted-foreground"> Правила могут обновляться. Мы уведомим вас о значимых изменениях. При использовании платформы вы соглашаетесь с текущей версией правил. </p></div></div></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/about/rules.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=rules-DaMO-gCd.mjs.map
