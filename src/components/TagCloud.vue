<template>
    <div class="tag-cloud">
        <h3>Dziedziny</h3>
        <div v-for="tag in tags" :key="tag">
            <router-link :to="{ name: 'Tags', params: {tag: tag} }">
                {{ tag }}
            </router-link>
        </div>
    </div>
</template>

<script>
    import useTags from '../composables/useTags'
    import { ref } from 'vue';
    
    export default {
        props: ['posts'],
        setup(props){

        let tagsData = useTags(props.posts);

        const tags = ref([]);

        tagsData = useTags(props.posts);
        tags.value = tagsData.tags.value;
        
        tags.value.sort((a, b) => a.localeCompare(b));

        return { tags };
        }
    }
</script>

<style>
    .tag-cloud {
        padding: 10px;
    }
    .tag-cloud h3 {
        border-bottom: 1px solid #aaa;
        padding: 16px 8px;
        color: #2d2d2d;
    }
    .tag-cloud div {
        display: inline-block;
        padding: 10px;
    }
    .tag-cloud a {
        color: #aaa;
        text-decoration: none;
    }
    .tag-cloud a.router-link-active {
        color: #0174be;
        font-weight: bold;
    }
</style>