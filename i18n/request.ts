// i18n/request.ts
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ requestLocale }) => {
  // لو ماكانش locale نستعمل "ar" كـ default
  const locale = (await requestLocale) ?? 'ar';

  return {
    locale, // لازم string
    messages: (await import(`../messages/${locale}/home.ts`)).default
  };
});
