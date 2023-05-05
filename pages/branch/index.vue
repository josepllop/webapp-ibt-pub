<template>
    <div class="container mx-auto px-5">
        <!-- HEADER -->
        <div class="h-64 w-full flex flex-col m-5">
            <h2 class="text-xl font-bold underline">Popular courses in McDonough School of Business</h2>
            <div class="mt-3">
                <button class="btn btn-primary">See the List</button>
            </div>
        </div>
        <!-- BRANCHES LIST -->
        <div class="flex flex-wrap">
            <NuxtLink to="/branches/OPIM" class="m-5 flex flex-col justify-center items-center">
                <div class=" bg-white h-32 w-32"></div>
                <img src="~/assets/images/opim.png" alt="">
                <p class="underline text-lg text-accent">OPIM</p>
            </NuxtLink>
            <NuxtLink to="/branches/OPIM" class="m-5 flex flex-col justify-center items-center">
                <div class=" bg-white h-32 w-32"></div>
                <p class="underline text-lg text-accent">OPIM</p>
            </NuxtLink>
            <NuxtLink to="/branches/OPIM" class="m-5 flex flex-col justify-center items-center">
                <div class=" bg-white h-32 w-32"></div>
                <p class="underline text-lg text-accent">OPIM</p>
            </NuxtLink>
            <NuxtLink to="/branches/OPIM" class="m-5 flex flex-col justify-center items-center">
                <div class=" bg-white h-32 w-32"></div>
                <p class="underline text-lg text-accent">OPIM</p>
            </NuxtLink>
            <NuxtLink to="/branches/OPIM" class="m-5 flex flex-col justify-center items-center">
                <div class=" bg-white h-32 w-32"></div>
                <p class="underline text-lg text-accent">OPIM</p>
            </NuxtLink>
            <NuxtLink to="/branches/OPIM" class="m-5 flex flex-col justify-center items-center">
                <div class=" bg-white h-32 w-32"></div>
                <p class="underline text-lg text-accent">OPIM</p>
            </NuxtLink>
        </div>
    </div>
</template>