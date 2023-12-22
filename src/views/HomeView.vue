<template>
  <div class="home">
    <Slider/>
    <div class="layout">
      <h1> {{ displaySearch }} </h1>
      <SearchBar @search="handleSearch"/>
    </div>
    <div v-if="error"> 
      {{ error }} 
    </div>
    <div v-else>
        <div v-if="posts.length" class="layout">
          <PostList v-if="showPosts" :posts="posts" />
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
import getPosts from '@/composables/getPosts';
import Spinner from '@/components/Spinner.vue';
import { ref, watch } from 'vue';
import TagCloud from '@/components/TagCloud.vue';
import SearchBar from '@/components/Searchbar.vue';
import Slider from '@/components/Slider.vue';


export default {
  name: 'HomeView',
  emits: ['search'],
  components: { PostList, Spinner, TagCloud, SearchBar, Slider},
  setup() {
    const {posts: allPosts, error, showPosts, load} = getPosts()
    let currentSearchCriteria = ""

    load()

    const posts = ref([]);
    const displaySearch = ref("Przykładowe artykuły")

    function updateDisplayedPosts() {
      handleSearch(currentSearchCriteria, 10)
    }

    watch(allPosts, updateDisplayedPosts);

    function handleSearch(searchCriteria, sliceAmount){

      currentSearchCriteria = searchCriteria
      const filteredPosts = allPosts.value.filter(post =>
        post.title.toLowerCase().includes(searchCriteria.toLowerCase())
      );

      posts.value = filteredPosts;

      if(sliceAmount > 0)
      {
        posts.value = posts.value.slice(0, sliceAmount);
      }

      if(searchCriteria !== ""){
        displaySearch.value = "Kryterium wyszukiwania: " + searchCriteria
      }else{
        displaySearch.value = "Przykładowe artykuły"
      }
    }
    
    return { posts, showPosts, error, displaySearch, handleSearch }
  }
}
</script>

<style>
  .home {
    max-width: 1200px;
    margin: 0 auto;
    padding: 10px;
    box-shadow: 0 0 30px rgba(0,0,0,.3);
    background-color: #fff;
    border-radius: 0 0 10px 10px;
  }
  .layout {
    display: grid;
    grid-template-columns: 3fr 1fr;
    gap: 20px;
  }
</style>
