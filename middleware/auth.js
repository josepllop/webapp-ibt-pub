export default defineNuxtRouteMiddleware(async(to, from)=>{
    const { account } = useAppwrite()

    try {
      const res = await account.get()
      console.log('Logged in user', res)
    } catch (err) {
      console.log('Not logged in')
      return navigateTo('/')
    }
})