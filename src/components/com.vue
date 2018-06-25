<template>
    <div class="hello">
        <h1>{{ data }}</h1>
    </div>
</template>

<script type="es6">
    export default {
        name: 'com',
        props: ['data'],
        data() {
            return {

            }
        }
    }
</script>

<style scoped>
    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
