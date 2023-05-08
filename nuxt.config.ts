// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['@nuxtjs/tailwindcss','nuxt-appwrite'],
    appwrite: {
        endpoint: 'https://cloud.appwrite.io/v1',
        project: 'josep-console'
    },
    ssr: false
})
