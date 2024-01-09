<template>
    <div class="change">
        <Icon type="cus-change" title="切换区域"></Icon>
        <div class="change-list">
            <ul>
                <li @click="changeLang(item)" v-for="item in langList" :key="item.value" :class="{active: lang === item.value}">{{item.name}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
import cookies from "cookie";

export default {
    name: "lang-select",
    data() {
        return {
            langList: [
                {name: this.$t('zhongwen'), value: 'zh-CN'},
                {name: this.$t('yingyu'), value: 'en-US'},
                {name: this.$t('alaboyu'), value: 'ar-SA'},
            ],
            lang: cookies.getCookie('lang') || localStorage.getItem('lang') || "zh-CN"
        }
    },
    mounted() {
       this.$nextTick(() => {
           this.setElementLang();
       });
    },
    methods: {
        // 设置html标签，为css提供标识
        setElementLang() {
            // 设置语言标签
            const element = document.getElementsByTagName("html")[0];
            element.setAttribute("lang", this.lang);
            element.setAttribute("dir", this.lang === 'ar-SA'? 'rtl':'');
        },
        
        // 切换语言
        changeLang(item) {
            this.lang = item.value;
            // this.$i18n.locale = item.value;
            localStorage.setItem('lang', item.value);
            cookies.setCookie("lang", item.value);
            this.setElementLang();

            // 阿文的时候重新加载页面样式
            // if (item.value === 'ar-SA') {
                window.location.reload();
            // }
        }
    },
}
</script>

<style scoped>

</style>