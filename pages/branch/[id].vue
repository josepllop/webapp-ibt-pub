<template>
<div>
    <p class="text-2xl my-5 underline">
        5 Most Popular Courses of <span class="capitalize">{{ $route.params.id }}</span>
    </p>
    <div v-if="list">
        <div class="overflow-x-auto">
  <table class="table w-full">
    <!-- head -->
    <thead>
      <tr>
        <th>RANK</th>
        <th>CRS#</th>
        <th>TITLE</th>
        <th>INSTRUCTOR</th>
      </tr>
    </thead>
    <tbody>
      <tr class="cursor-pointer hover" v-for="course in list.documents" @click="goToCourse(course.$id)">
        <th>{{ course.rank }}</th>
        <td>{{ course.crs }}</td>
        <td>{{ course.title }}</td>
        <td>{{ course.instructor }}</td>
      </tr>
      
    </tbody>
  </table>
</div>
    </div>
    <div v-else>
        Loading...
    </div>
    <div class="mt-5">
        <NuxtLink to="/branch" class="btn btn-secondary">Back</NuxtLink>
    </div>
</div>
</template>

<script setup>
definePageMeta({
    middleware:['auth']
})
const route = useRoute()
const {account, database, Query} = useAppwrite()

const list = await database.listDocuments('main','courses',[
    Query.equal('branch',route.params.id),
    Query.orderAsc('rank')
])

console.log(list)

const goToCourse = async (id)=>{
    return navigateTo('/course/'+id)
}
</script>