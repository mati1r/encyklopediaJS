<template>
    <div class="searchbar">
        <input class="search-input" v-model="searchCriteria" placeholder="Wyszukaj" type="text" />
        <button class="search-click" @click="handleSearchClick">
            <img class="search-icon" src="../assets/search.svg"/>
        </button>
    </div>
</template>

<script>
import {ref} from 'vue';
    export default {
        setup(_,{ emit }) {

            const searchCriteria = ref("")

            const handleSearchClick = () => {
                emit('search', searchCriteria.value, 0);
            };

            return {searchCriteria, handleSearchClick };
        },
    };
</script>

<style scoped>
    .searchbar {
        display: flex;
        margin: 20px 0 20px 0px;
    }

    .search-click {
        display: block;
        background: #0174be;
        color: white;
        border: none;
        padding: 8px 16px;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
    }
    .search-input {
        display: block;
        width: 100%;
        color: #444;
        border: 1px solid #eee;
        box-shadow: 0 0 30px rgba(0,0,0,.2);
        outline: none;
        font-size: 16px;      
        font-weight: 500;
        padding-left: 10px;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
    }

    .search-input:focus{
        border: 1px solid #0174be;
    }
</style>