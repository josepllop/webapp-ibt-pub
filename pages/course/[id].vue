<template>
    <div v-if="course">
        <div class="w-full h-36 bg-blue-700 text-white px-5 py-3">
            <p class="text-2xl uppercase">
            {{ course.crs }}
        </p>
        <p class="text-2xl uppercase">
            {{ course.title }}
        </p>
        <p>
            {{ course.instructor }}
        </p>
        </div>
        <div v-if="opinions">
            <p class="my-3">
                Hours spent studying per week (listed in hours)
            </p>
            <div class="form-control w-full max-w-xs">
                <label class="label">
                    <span class="label-text">Average</span>
                </label>
                <input type="text" class="input input-bordered w-full max-w-xs"
                    :value="avgQuestion1" disabled
                />
            </div>
            <div class="form-control w-full max-w-xs">
                <label class="label">
                    <span class="label-text">Your Opinion</span>
                </label>
                <input type="text" class="input input-bordered w-full max-w-xs"
                    placeholder="1 - 10" :value="myOpinion1" :disabled="opinionsSent"
                />            
            </div>
            <p class="my-3">
                How much did you learn in course (out of 10)
            </p>
            <div class="form-control w-full max-w-xs">
                <label class="label">
                    <span class="label-text">Average</span>
                </label>
                <input type="text" class="input input-bordered w-full max-w-xs"
                    :value="avgQuestion2" disabled
                />
            </div>
            <div class="form-control w-full max-w-xs">
                <label class="label">
                    <span class="label-text">Your Opinion</span>
                </label>
                <input type="text" class="input input-bordered w-full max-w-xs"
                    placeholder="1 - 10" :value="myOpinion2" :disabled="opinionsSent"
                />            
            </div>
            <p class="my-3">
                Overall Evaluation (out of 10)
            </p>
            <div class="form-control w-full max-w-xs">
                <label class="label">
                    <span class="label-text">Average</span>
                </label>
                <input type="text" class="input input-bordered w-full max-w-xs"
                    :value="avgQuestion3" disabled
                />
            </div>
            <div class="form-control w-full max-w-xs">
                <label class="label">
                    <span class="label-text">Your Opinion</span>
                </label>
                <input type="text" class="input input-bordered w-full max-w-xs"
                    placeholder="1 - 10" :value="myOpinion3" :disabled="opinionsSent"
                />            
            </div>

            <div class="mt-5">
                <button class="btn btn-primary mr-3" :disabled="opinionsSent" @click="sendOpinions">Submit</button>
            <NuxtLink class="btn" :to="'/branch/'+course.branch">Return</NuxtLink>
            </div>
        </div>
    </div>
    <div v-else>
        Loading...
    </div>

</template>

<script setup>
    definePageMeta({
        middleware:['auth']
    })
    const opinionsSent = ref(false)
    const myOpinion1 = ref('')
    const myOpinion2 = ref('')
    const myOpinion3 = ref('')

    const route = useRoute()
    const {account, database, Query} = useAppwrite()
    const acc = await account.get()

    const course = await database.getDocument('main','courses',route.params.id)
    const opinions = await database.listDocuments('main','opinions',[
        Query.equal('course',route.params.id)
    ])
    let avgQuestion1,avgQuestion2,avgQuestion3
    const q1 = opinions.documents.filter(o=>{
        return o.question == '1'
    }).map(o=>o.opinion)
    const q2 = opinions.documents.filter(o=>{
        return o.question == '2'
    }).map(o=>o.opinion)
    const q3 = opinions.documents.filter(o=>{
        return o.question == '3'
    }).map(o=>o.opinion)

    avgQuestion1 = q1.reduce((p,c)=>p+c) / q1.length
    avgQuestion2 = q2.reduce((p,c)=>p+c) / q2.length
    avgQuestion3 = q3.reduce((p,c)=>p+c) / q3.length

    // Define if I already sent my opinion
    console.log(acc)
    const myOpinions = await database.listDocuments('main','opinions',[
        Query.equal('course',route.params.id),
        Query.equal('user', acc.$id)
    ])
    if(myOpinions.documents.length){
        opinionsSent=true
    }
</script>