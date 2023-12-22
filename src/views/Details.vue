<template>
    <div v-if="error">
        {{ error }}
    </div>
    <div v-else>
        <div v-if="post" class="post">
            <h3>{{ post.title }}</h3>
            <p class="pre"> {{ post.body }}</p>
            <span v-for="tag in post.tags" :key="tag">
                <router-link :to="{ name: 'Tags', params: { tag: tag }}">
                    {{ tag }}
                </router-link>
            </span>
            <div v-if="isLoggedIn" class="button-container">
                <button class="button-primary" @click="handleDelete">Usuń artykuł</button>
                <button class="button-primary">
                    <router-link :to="{ name: 'Edit', params: { id: post.id }}">Edytuj</router-link>
                </button>
            </div>
        </div>
        <div v-else>
            <Spinner />
        </div>
    </div>
</template>

<script>
import getPost from "@/composables/getPost"
import Spinner from "@/components/Spinner.vue";

import { ref } from "vue";
import { useRoute, useRouter } from 'vue-router';
import { db, auth } from '@/firebase/config';
import { onAuthStateChanged } from "firebase/auth";
import { doc, deleteDoc } from 'firebase/firestore';

export default{
    components: { Spinner },
    setup(){
        const route = useRoute();
        const router = useRouter();
        const { post, error, load } = getPost(route.params.id)
        const isLoggedIn = ref(false)

        onAuthStateChanged(auth, (user) => {
                if (user) {
                    isLoggedIn.value = true
                } else {
                    isLoggedIn.value = false
                }
            });

        load()

        async function handleDelete(){
            await deleteDoc(doc(db, 'posts', route.params.id))

            router.push('/')
        }

        return {post, error, isLoggedIn, handleDelete}
    }
}
</script>

<style scoped>

    .post {
        padding-bottom: 30px;
        max-width: 1200px;
        margin: 0 auto;
        padding: 10px; 
        box-shadow: 0 0 30px rgba(0,0,0,.1);
        background-color: #fff;
        color: black;
        border-radius: 0 0 10px 10px;
    }
    .button-container {
        display: flex;
        gap: 10px;
    }
    .post button {
        margin-top: 20px;
        cursor: pointer;
    }
    .post a {
        text-decoration: none;
        color: #fff;
    }
    .post p{
        color: black;
        line-height: 1.5em;
        margin-top: 40px;
        margin-bottom: 100px;
    }
    .post h3 {
        display: inline-block;
        position: relative;
        font-size: 26px;
        color: #fff;
        margin-bottom: 10px;
        max-width: 400px;
        z-index: 1;
    }
    .post h3::before {
        content: "";
        display: block;
        width: 100%;
        height: 100%;
        background: #0174be;
        position: absolute;
        z-index: -1;
        padding-right: 400px;
        left: -30px;
        border-radius: 10px;
    }
    .post span a{
        background: #ddd;
        display: inline-block;
        margin-right: 5px;
        border-radius: 10px;
        padding: 8px;
        color: #aaa;
        text-decoration: none;
    }
    .post span a.router-link-active {
        color: #0174be;
        font-weight: bold;
    }
    .pre{
        white-space: pre-wrap;
    }
</style>