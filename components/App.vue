<template>
    <Layout class="content-layout">
        <keep-alive>
            <router-view v-if="this.$route.meta.keepAlive"></router-view>
            <!--这里是会被缓存的组件-->
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </Layout>
</template>

<script>
export default {
    name: 'app',
    data() {
        return {}

    }
};
</script>