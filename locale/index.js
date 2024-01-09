import Vue from "vue";
import VueI18n from 'vue-i18n';
import cookies from "cookie";
import { locale } from 'view-design';

import zhCnLocale from 'view-design/src/locale/lang/zh-CN';
import enUsLocale from 'view-design/src/locale/lang/en-US';
import arSaLocale from 'view-design/src/locale/lang/ar-SA';

import customZhCn from '../locale/lang/zh-CN';
import customUsCn from '../locale/lang/en-US';
import customArCn from '../locale/lang/ar-SA';

Vue.use(VueI18n);

// 自动根据浏览器系统语言设置语言
const navLang = navigator.language;
const localLang = (navLang === 'zh-CN' || navLang === 'en-US') ? navLang : false;
let lang = cookies.getCookie('lang') ||  localStorage.getItem('lang') || localLang || 'zh-CN';

Vue.config.lang = lang;

const messages = {
    'zh-CN': Object.assign(zhCnLocale, customZhCn),
    'en-US': Object.assign(enUsLocale, customUsCn),
    'ar-SA': Object.assign(arSaLocale, customArCn),
}

locale(messages[lang || 'zh-CN']);

const i18n = new VueI18n({
    locale: lang,
    fallbackLocale: 'zh-CN',
    messages,
});

export default i18n;