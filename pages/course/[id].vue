<template>
    <div v-if="course" class="pb-10">
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
                    placeholder="1 - 10" v-model="myOpinion1" :disabled="opinionsSent"
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
                    placeholder="1 - 10" v-model="myOpinion2" :disabled="opinionsSent"
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
                    placeholder="1 - 10" v-model="myOpinion3" :disabled="opinionsSent"
                />            
            </div>

            <div class="mt-5">
                <button class="btn btn-primary mr-3"
                :class="{'loading':sendingData}"
                :disabled="opinionsSent" @click="sendOpinions">
                
                <span v-if="opinionsSent">Already Answered</span>
                <span v-else>Submit Answers</span>
            </button>
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
    const sendingData = ref(false)

    const avgQuestion1 = ref(0)
    const avgQuestion2 = ref(0)
    const avgQuestion3 = ref(0)

    const route = useRoute()
    const {account, database, Query} = useAppwrite()
    const acc = await account.get()

    const course = await database.getDocument('main','courses',route.params.id)
    const opinions = await database.listDocuments('main','opinions',[
        Query.equal('course',route.params.id)
    ])
    
    let q1 = opinions.documents.filter(o=>{
        return o.question == '1'
    }).map(o=>o.opinion)
    let q2 = opinions.documents.filter(o=>{
        return o.question == '2'
    }).map(o=>o.opinion)
    let q3 = opinions.documents.filter(o=>{
        return o.question == '3'
    }).map(o=>o.opinion)

    if(q1.length == 0){q1 = [0]}
    if(q2.length == 0){q2 = [0]}
    if(q3.length == 0){q3 = [0]}

    avgQuestion1.value = q1.reduce((p,c)=>p+c) / q1.length
    avgQuestion2.value = q2.reduce((p,c)=>p+c) / q2.length
    avgQuestion3.value = q3.reduce((p,c)=>p+c) / q3.length

    // Define if I already sent my opinion
    console.log(acc)
    const myOpinions = await database.listDocuments('main','opinions',[
        Query.equal('course',route.params.id),
        Query.equal('user', acc.$id)
    ])
    if(myOpinions.documents.length){
        opinionsSent.value=true
    }

    const sendOpinions = async()=>{
        if(
            myOpinion1.value == '' ||  myOpinion2.value == '' ||  myOpinion3.value == ''
        ){
            return
        }
        sendingData.value = true
        const sendRequestOpinion1 = await database.createDocument(
            'main',
            'opinions',
            'unique()',
            {
                question:'1',
                opinion: myOpinion1.value,
                user: acc.$id,
                course: route.params.id
            }
        )
        console.log('Question 1 Sent:::>', sendRequestOpinion1)

        const sendRequestOpinion2 = await database.createDocument(
            'main',
            'opinions',
            'unique()',
            {
                question:'2',
                opinion: myOpinion2.value,
                user: acc.$id,
                course: route.params.id
            }
        )
        console.log('Question 2 Sent:::>', sendRequestOpinion2)

        const sendRequestOpinion3 = await database.createDocument(
            'main',
            'opinions',
            'unique()',
            {
                question:'3',
                opinion: myOpinion3.value,
                user: acc.$id,
                course: route.params.id
            }
        )
        console.log('Question 3 Sent:::>', sendRequestOpinion3)

        sendingData.value = false
        opinionsSent.value = true

        const opinions2 = await database.listDocuments('main','opinions',[
        Query.equal('course',route.params.id)
        ])
        
        let q1 = opinions2.documents.filter(o=>{
            return o.question == '1'
        }).map(o=>o.opinion)
        let q2 = opinions2.documents.filter(o=>{
            return o.question == '2'
        }).map(o=>o.opinion)
        let q3 = opinions2.documents.filter(o=>{
            return o.question == '3'
        }).map(o=>o.opinion)

        avgQuestion1.value = q1.reduce((p,c)=>p+c) / q1.length
        avgQuestion2.value = q2.reduce((p,c)=>p+c) / q2.length
        avgQuestion3.value = q3.reduce((p,c)=>p+c) / q3.length

    }
</script>