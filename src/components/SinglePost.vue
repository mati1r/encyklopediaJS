<template>
    <div class="post">
        <router-link :to="{ name: 'Details', params: { id: post.id }}">
            <div class="h3-container">
                <h3> {{ post.title }} </h3>
            </div>
        </router-link>
        <p class="pre"> {{ snippet }} </p>
        <div class="tags-wrapper">
            <span class="tags-content" v-for="tag in post.tags" :key="tag">
                <router-link :to="{ name: 'Tags', params: { tag: tag }}">
                    {{ tag }}
                </router-link>
            </span>
        </div>
    </div>
</template>

<script>
import { computed } from 'vue';

    export default{
    props: ['post'],
    setup(props) {
        const snippet = computed(() => {
            return props.post.body.substring(0, 200) + "...";
        });
        return { snippet };
    },
}
</script>

<style scoped>
    .post {
        margin: 0 5px;
        padding: 20px 5px 0px 10px;
        border-bottom: 1px solid #0174be;  
        border-top: 1px solid #0174be;  
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        box-shadow: 0 0 30px rgba(0,0,0,.2);
        display: flex;
        flex-direction: column;
        overflow: auto;
        max-height: 500px;
    }
    .post p{
        padding: 10px;
    }
    .post h3 {
        display: inline-block;
        font-size: 26px;
        color: #2d2d2d;
    }
    .h3-container {
        display: inline-block;
        position: relative;
        margin-bottom: 10px;
    }
    .post h3::before {
        content: "";
        display: block;
        width: 50px;
        height: 30px;
        background: #0174be;
        position: absolute;
        left: 0px;
        bottom: 100%;
        border-radius: 8px;
        transform: rotateZ(90deg);
    }
    .tags-wrapper{
        margin-top: auto;
        display: flex;
        flex-wrap: wrap;
        padding-bottom: 16px;
        row-gap: 16px;
    }
    .tags-content a{
        background: #ddd;
        margin-right: 5px;
        border-radius: 10px;
        padding: 8px;
        color: #aaa;
        text-decoration: none;
    }
    .tags-content a.router-link-active {
        color: #0174be;
        font-weight: bold;
    }
    .pre{
        white-space: pre-wrap;
    }
    
</style>