<template>
    <div>
        <uu-com :data="msg"></uu-com>
    </div>
</template>

<script>
    import uuCom from '../components/com.vue'
    export default {
        name: 'hello',
        props: [],
        components: {
            uuCom
        },
        data() {

            return {
                msg: "hello uu-cli template_pc_bp"
            }
        },
        methods: {},
        created() {

        }
    }
</script>

<style scoped>

</style>    