<template>
    <div class="edit">
        <form @submit.prevent="handleSubmit">
            <label>Title:</label>
            <input class="input-text" v-model="title" type="text" required/>
            <label>Zawartość:</label>
            <textarea v-model="body" required></textarea>
            <label>Dziedziny (Naciśnij enter aby dodać)</label>
            <input 
                class="input-text"
                v-model="tag" 
                type="text"
                @keydown.enter.prevent="addTag"/>
            <div v-for="tag in tags" :key="tag" class="pill" @click="onClickRemove(tag)">
                {{ tag }}
            </div>
            <button class="button-primary">Edytuj artykuł</button>
        </form>
    </div>
</template>

<script>
    import { ref, onMounted } from 'vue'
    import getPost from "@/composables/getPost"
    import { useRoute, useRouter } from 'vue-router';
    import { db } from '@/firebase/config';
    import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';

    export default{
        setup(){
            const route = useRoute();
            const router = useRouter();
            console.log(route.params.id)
            const { post, error, load } = getPost(route.params.id)

            const title = ref("");
            const body = ref("");
            const tag = ref("");
            const tags = ref([]);

            onMounted(async () => {
                await load();

                if (post.value) {
                    title.value = post.value.title
                    body.value = post.value.body
                    tags.value = post.value.tags
                }
            });

            function addTag(){
                if(!tags.value.includes(tag.value)){
                    //removes all withespaces
                    tag.value = tag.value.replace(/\s/, "")
                    tags.value.push(tag.value)
                }
                tag.value = ""
            }

            function onClickRemove(clickedTag){
                tags.value = tags.value.filter(tag => tag !== clickedTag);
            }
            

            async function handleSubmit(){
                const updatedPost = {
                    title: title.value,
                    body: body.value,
                    tags: tags.value,
                    updatedAt: serverTimestamp()
                }

                await updateDoc(doc (db, 'posts', route.params.id), updatedPost)
                router.push({ name: 'Home' })
            }

            return {title, body, tag, addTag, tags, handleSubmit, onClickRemove}
        }

    }
</script>

<style scoped>
    .edit{
        max-width: 1200px;
        margin: 0 auto;
        padding: 10px;
        padding-bottom: 100px;
        box-shadow: 0 0 30px rgba(0,0,0,.1);
        background-color: #fff;
        border-radius: 0 0 10px 10px;
    }

    form {
        max-width: 700px;
        margin: 0 auto;
        text-align: left;
    }

</style>