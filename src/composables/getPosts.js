import { ref, watchEffect } from 'vue';
import { db } from '@/firebase/config';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

function getPosts(){
    const posts = ref([])
    const error = ref(null);
    const showPosts = ref(true)

    async function load(){
        const docRef = collection(db,'posts');
        const q = query(docRef, orderBy("createdAt", "desc"));

        //Pobieranie danych poprzez snapshot (dane w czasie rzeczywistym)
        
        const unsub = onSnapshot(q, (docSnap) =>{
          console.log("snapshot")
          posts.value = docSnap.docs.map(doc => {
            return { ...doc.data(), id: doc.id}
          })
        }, (err) => {
          error.value = err.message
        })

      watchEffect((onInvalidate) => {
        //unsubscibe from previous collection when watcher is topped (unmounted)
        onInvalidate(() => unsub())
      })
    }

    return { posts, error, showPosts, load}
}

export default getPosts