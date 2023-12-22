<template>
    <div class="tag">
        <h1>{{ tag }}</h1>
        <div v-if="error"> 
            {{ error }} 
        </div>
        <div v-else>
            <div v-if="tagPosts.length" class="layout">
                <PostList :posts="tagPosts" />
                <TagCloud :posts="posts"/>
            </div>
            <div v-else>
                <Spinner />
            </div>
        </div>
    </div>    
</template>

<script>
    import PostList from '@/components/PostList.vue';
    import Spinner from "@/components/Spinner.vue";
    import TagCloud from '@/components/TagCloud.vue';
    import getPosts from '@/composables/getPosts';
    import { useRoute } from 'vue-router';
    import { computed, onUpdated, ref } from 'vue';
    
    export default {
        components: { PostList ,Spinner, TagCloud },

        setup(){
            const route = useRoute();
            const tag = ref("")

            onUpdated(()=>{
                tag.value = route.params.tag
            })

            const {posts, error, showPosts, load} = getPosts()
            
            load()
            
            const tagPosts = computed(() => {
                return posts.value.filter((post) => post.tags.includes(route.params.tag))
            })

            return { tagPosts, error, tag, posts }
        }
    }
</script>

<style>
    .tag{
        max-width: 1200px;
        margin: 0 auto;
        padding: 10px;    
        box-shadow: 0 0 30px rgba(0,0,0,.1);
        background-color: #fff;
        border-radius: 0 0 10px 10px;
    }
</style>