<template>
    <div>
        <lsx-com :data="msg"></lsx-com>
    </div>
</template>

<script>
    import uuCom from '../components/com.vue'
    export default {
        name: 'hello',
        props: [],
        components: {
            lsxCom
        },
        data() {

            return {
                msg: "hello lsx-cli template-pc"
            }
        },
        methods: {},
        created() {

        }
    }
</script>

<style scoped>

</style>    