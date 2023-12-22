<template>
    <header>
        <div class="header-container">
            <img class="book-logo" src="../assets/book-logo.svg"/>
            <h1>Encyklopedia</h1>
        </div>
        <nav>
            <router-link :to="{ name: 'Home'}">Strona główna</router-link>
            <span v-if="isLoggedIn">
                <router-link :to="{ name: 'Create'}">Stwórz artykuł</router-link>
                <span class="logout" @click="SignOut">Wyloguj</span>             
            </span>
            <span v-else>
                <router-link :to="{ name: 'Login'}">Zaloguj</router-link>
                <router-link :to="{ name: 'Register'}">Zarejestruj</router-link>
            </span>
        </nav>
    </header>
</template>

<script>
import { auth } from '@/firebase/config';
import { signOut, onAuthStateChanged } from "firebase/auth";
import { ref } from 'vue';
import { useRouter } from 'vue-router';

    export default{
        setup(){
            const router = useRouter();
            const isLoggedIn = ref(false)

            function SignOut(){
                signOut(auth)
                router.push('/')
            }

            onAuthStateChanged(auth, (user) => {
                if (user) {
                    isLoggedIn.value = true
                } else {
                    isLoggedIn.value = false
                }
            });

            return {isLoggedIn, SignOut}
        }
    }    
</script>

<style>
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 10px;
        margin-top: 0px;
        background-color: #0174be;
        border-radius: 10px 10px 0 0;
    }
    header h1 {
        margin-left: 10px;
        color: #fff;
        font-size: 48px;
        font-family: "Palatino", serif;
        text-shadow: 0px 2px 0px #333;
    }
    header a {
        color: black;
        text-decoration: none;
        margin-right: 20px;
        font-weight: 700;
    }
    .logout {
        color: black;
        text-decoration: none;
        margin-right: 20px;
        font-weight: 700;
        cursor: pointer;
    }
    header a.router-link-active {
        color: #fff;
        font-weight: bold;
    }
    .header-container {
        display: flex;
    }
    .book-logo{
        width: 60px;
        height: 60px;
        position: relative;
        top: 30px;
    }
</style>