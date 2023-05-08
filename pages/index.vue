<template>
        <div class="flex flex-col justify-center w-full items-center pt-10">
            <p class=" text-2xl font-semibold">
                Welcome to Hoya Evaluation
            </p>
            <p>
                There's so much to explore. Let's get started!
            </p>
            <img src="~/assets/images/bulldog.png" alt="" class="w-36 mt-5">
            <button class="btn btn-primary btn-wide mt-10" @click="login">Continue with Google</button>
        </div>
</template>

<script setup>
const {account} = useAppwrite()

const login = async ()=>{
    // const res = await account.get()
    //   console.log('Logged in user', res)
    account.createOAuth2Session('google','https://webapp-ibt-pub.pages.dev/branch',
    'https://webapp-ibt-pub.pages.dev')
}
</script>