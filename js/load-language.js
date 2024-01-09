import cookies from "cookie";
const lang = cookies.getCookie('lang') || localStorage.getItem('lang') || "zh-CN";

const languageJson = require('../locale/lang/' + lang + '.js').default || {};

export default languageJson;