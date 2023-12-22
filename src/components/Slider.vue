<template>
    <div class="wrap">
        <transition-group name="fade" tag="div" class="slider">
            <div v-for="i in [currentIndex]" :key="i">
                <img :src="currentSlide.img" />
                <div> 
                  <p class="trivia-header">{{ currentSlide.triviaHeader }}</p>
                  <p class="trivia-body">{{ currentSlide.triviaBody }}</p>
                </div>
            </div>
        </transition-group>
    </div>
</template>

<script>
    import { computed, onMounted, ref} from 'vue';
    import chemImage from "@/assets/chem.jpg";
    import phyImage from "@/assets/phy.jpg";
    import histImage from "@/assets/hist.jpg";
    import geoImage from "@/assets/geo.jpg";

    export default {
      name: 'Slider',
      setup() {

        const slides = ref([
          {
            img: chemImage,
            triviaHeader: "What is Lorem Ipsum",
            triviaBody: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
          },
          {
            img: phyImage,
            triviaHeader: "Why do we use it",
            triviaBody: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
          },
          {
            img: histImage,
            triviaHeader: "Where does it come from",
            triviaBody: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
          },
          {
            img: geoImage,
            triviaHeader: "The standard Lorem Ipsum passage, used since the 1500s",
            triviaBody: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          },
        ]);

        const timer = ref(null);
        const currentIndex = ref(0);

        const startSlide = () => {
          timer.value = setInterval(next, 10000);
        };

        const next = () => {
          currentIndex.value += 1;
        };

        const currentSlide = computed(() => slides.value[Math.abs(currentIndex.value) % slides.value.length]);

        onMounted(() => {
          startSlide();
        });

        return { timer, currentIndex, startSlide, next, currentSlide };
      },
    };
</script>

<style scoped>

.wrap {
    overflow: hidden;
    border-radius: 5px;
}
.fade-enter-active, .fade-leave-active {
    transform: translateX(100%);
    transition: transform 1.5s ease, opacity 2s ease;
}

.fade-leave-to {
    transform: translateX(-100%);
    opacity: 0;
}

.fade-enter-to {
    transform: translateX(0);
}

.slider {
    position: relative;
    height: 500px;  
}

.slider img {
    position: absolute;
    height:500px;
    width: 100%;
}

.trivia-header {
    position: absolute;
    top: 280px;
    left: 20px;
    background: rgba(1, 116, 190, 0.7);
    padding: 10px;
    color: rgba(255,255,255, 0.9);
}

.trivia-body {
    position: absolute;
    top: 330px;
    left: 20px;
    right: 100px;
    background: rgba(0, 0, 0, 0.7);
    padding: 10px;
    color: rgba(255,255,255, 0.9);
}


</style>