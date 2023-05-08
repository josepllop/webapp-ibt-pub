<template>
    <div class="container mx-auto px-5">
        <!-- HEADER -->
        <div class="h-64 w-full flex flex-col m-5 bg-[url('~/assets/images/back1.png')] bg-contain p-10">
            <h2 class="text-3xl font-bold underline text-gray-900">Popular courses in McDonough School of Business</h2>
            <div class="mt-3">
                <!-- <button class="btn btn-primary">See the List</button> -->
            </div>
        </div>
        <!-- BRANCHES LIST -->
        <div class="flex flex-wrap">
            <NuxtLink to="/branch/opim" class="m-5 flex flex-col justify-center items-center">
                <img src="~/assets/images/opim.png" alt="" class="w-32 h-32">
                <p class="underline text-lg text-accent">OPIM</p>
            </NuxtLink>
            <NuxtLink to="/branch/acct" class="m-5 flex flex-col justify-center items-center">
                <img src="~/assets/images/acc.png" alt="" class="w-32 h-32">
                <p class="underline text-lg text-accent">ACCT</p>
            </NuxtLink>
            <NuxtLink to="/branch/finc" class="m-5 flex flex-col justify-center items-center">
                <img src="~/assets/images/finance.png" alt="" class="w-32 h-32">
                <p class="underline text-lg text-accent">FINC</p>
            </NuxtLink>
            <NuxtLink to="/branch/strt" class="m-5 flex flex-col justify-center items-center">
                <img src="~/assets/images/strat.png" alt="" class="w-32 h-32">
                <p class="underline text-lg text-accent">STRT</p>
            </NuxtLink>
            <NuxtLink to="/branch/mark" class="m-5 flex flex-col justify-center items-center">
                <img src="~/assets/images/mark.png" alt="" class="w-32 h-32">
                <p class="underline text-lg text-accent">MARK</p>
            </NuxtLink>
            <NuxtLink to="/branch/mgmt" class="m-5 flex flex-col justify-center items-center">
                <img src="~/assets/images/mgmt.png" alt="" class="w-32 h-32">
                <p class="underline text-lg text-accent">MGMT</p>
            </NuxtLink>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    middleware:['auth']
})
</script>