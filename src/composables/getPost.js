import { ref } from 'vue'
import { db } from '@/firebase/config';
import { doc, getDoc } from 'firebase/firestore';

function getPost(id){
    const post = ref(null)
    const error = ref(null)

    async function load(){
      try{
        let docRef = doc(db, 'posts', id)
        let docSnap = await getDoc(docRef)
        if(!docSnap.exists(id)){
          throw Error("This post does not exists")
        }

        post.value = {...docSnap.data(), id:docSnap.id}
      }
      catch(err){
        error.value = err.message
      }
    }

    return { post, error, load}
}

export default getPost