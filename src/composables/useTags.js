import { ref } from 'vue'

function useTags(posts){
    const tags = ref([])
    //Set przyjmuje tylko unikalne wartosci
    const tagSet = new Set()

    posts.forEach(item => {
        item.tags.forEach(tag => {
            tagSet.add(tag)
        })
    });

    //spred syntax
    tags.value = [...tagSet]

    return { tags }
}

export default useTags