import * as zod from 'zod';

const portfolioSchema = zod.object({
  id: zod.string().uuid(),
  image_url: zod.array(zod.string().url()),
  category: zod.string(),
  description: zod.string(),
  is_public: zod.boolean(),
  likes_count: zod.number(),
  views_count: zod.number(),
  created_at: zod.string(),
  updated_at: zod.string()
}).strict();
const portfolioCreateSchema = zod.object({
  category: zod.string({ required_error: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044E" }).min(1, "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u0430").max(100, "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F \u0441\u043B\u0438\u0448\u043A\u043E\u043C \u0434\u043B\u0438\u043D\u043D\u0430\u044F"),
  description: zod.string({ required_error: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435" }).min(1, "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E").max(1e3, "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u0441\u043B\u0438\u0448\u043A\u043E\u043C \u0434\u043B\u0438\u043D\u043D\u043E\u0435"),
  is_public: zod.boolean().default(false)
}).passthrough();

export { portfolioCreateSchema as a, portfolioSchema as p };
//# sourceMappingURL=portfolio.mjs.map
