import App from '../App.vue'

export default [
    {
        path: '',
        component: App,
        children: [
            {
                path: '/',
                component: r => require.ensure([], () => r(require('../pages/hello')), 'hello')
            },
            {
                path: '/hello',
                component: r => require.ensure([], () => r(require('../pages/hello')), 'hello')
            }
        ]
    }
]
