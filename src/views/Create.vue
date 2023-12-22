<template>
    <div class="create">
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
            <button class="button-primary">Dodaj artykuł</button>
        </form>
    </div>
</template>

<script>
    import { ref } from 'vue'
    import { useRouter } from 'vue-router';
    import { db } from '@/firebase/config';
    import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

    export default{
        setup(){
            const router = useRouter();

            const title = ref("");
            const body = ref("");
            const tag = ref("");
            const tags = ref([]);

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
                const post = {
                    title: title.value,
                    body: body.value,
                    tags: tags.value,
                    createdAt: serverTimestamp()
                }

                await addDoc(collection (db, 'posts'), post)
                router.push({ name: 'Home' })
            }

            return {title, body, tag, addTag, tags, handleSubmit, onClickRemove}
        }

    }
</script>

<style>
    .create{
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

    .input-text, textarea {
        display: block;
        margin: 10px 0;
        width: 100%;
        box-sizing: border-box;
        padding: 10px;
        border: 1px solid #fff;
        box-shadow: 0 0 30px rgba(0,0,0,.1);
        outline: none;
        font-size: 16px;
    }

    textarea {
        height: 400px;
        resize: none;
        font-family: Avenir, Helvetica, Arial, sans-serif;
    }

    input:focus, textarea:focus {
        border-color: #0174be;
    }

    label {
        display: inline-block;
        margin-top: 30px;
        position: relative;
        font-size: 20px;
        color: white;
        margin-bottom: 10px;
        z-index: 1;
    }

    label::before {
        content: "";
        display: block;
        width: 100%;
        height: 100%;
        background: #0174be;
        position: absolute;
        z-index: -1;
        padding-right: 40px;
        left: -5px;
        border-radius: 5px;
        padding-top: 5px;
    }

    .button-primary {
        display: block;
        background: #0174be;
        color: #fff;
        border: none;
        padding: 8px 16px;
        font-size: 16px;
        margin-top: 30px;
    }

    .pill {
        display: inline-block;
        margin: 10px 10px 0 0;
        color: #aaa;
        background: #ddd;
        padding: 8px;
        border-radius: 20px;
        font-size: 14px;
        cursor: pointer;
    }
</style>