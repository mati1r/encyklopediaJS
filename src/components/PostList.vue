<template>
    <div class="post-list">
        <div v-for="post in posts" :key="post.id" class="single-post">
            <SinglePost :post="post"/>
        </div>
    </div>
</template>

<script>
import SinglePost from "@/components/SinglePost.vue";
    export default{
        props: ['posts'],
        components: { SinglePost},
        setup(props){
        }
    }
</script>

<style scoped>
    .post-list {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-auto-rows: 1fr;
        grid-column-gap: 5px;
        grid-row-gap: 5px;
    }

    .single-post{ 
        display: flex;
        padding: 10px;
        margin-bottom: 20px;
    }
</style>
