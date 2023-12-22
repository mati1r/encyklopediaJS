<template>
    <div class="register">
        <form @submit.prevent="handleSubmit">
            <label>E-mail:</label>
            <input class="input-text" v-model="email" type="text" placeholder="E-mail" required/>
            <label>Hasło:</label>
            <input class="input-text" v-model="password" type="password" placeholder="Hasło" required/>
            <label>Powtórz hasło:</label>
            <input class="input-text" v-model="passwordRepeat" type="password" placeholder="Powtórz hasło" required/>

            <button class="button-full">Zarejestruj</button>

            <div class="error" v-if="errMsg"> {{ errMsg }}</div>
        </form>
    </div>
</template>

<script>
    import { ref} from 'vue'
    import { useRouter } from 'vue-router';
    import { auth } from '@/firebase/config';
    import { createUserWithEmailAndPassword } from "firebase/auth";

    export default{
        setup(){
            const router = useRouter();

            const email = ref("")
            const password = ref("")
            const passwordRepeat = ref("")
            const errMsg = ref("")

            function handleSubmit(){

                if(password.value != passwordRepeat.value){
                    errMsg.value = "Hasła nie są takie same"
                }else{
                    createUserWithEmailAndPassword(auth, email.value, password.value)
                    .then(() => {
                        alert('Zarejestrowano poprawnie');
                        router.push({ name: 'Home' })
                    })
                    .catch((error) => {
                        switch (error.code) {
                        case 'auth/email-already-in-use':
                            errMsg.value = 'Istneje już konto powiązane z tym adresem e-mail'
                            break
                        case 'auth/invalid-email':
                            errMsg.value = 'Niepoprawny adres e-mail'
                            break
                        case 'auth/operation-not-allowed':
                            errMsg.value = 'Operacja niedozwolona'
                            break
                        case 'auth/weak-password':
                            errMsg.value = "Hasło musi składać się conajmniej z 6 znaków"
                            break
                        default:
                            errMsg.value = 'Wystąpił błąd'
                            break
                        }
                    });
                }
            }

            return{email, password, passwordRepeat, errMsg, handleSubmit}
        }

    }
</script>

<style scoped>
    .register{
        max-width: 1200px;
        margin: 0 auto;
        padding: 10px;
        padding-bottom: 100px;
        box-shadow: 0 0 30px rgba(0,0,0,.1);
        background-color: #fff;
        border-radius: 0 0 10px 10px;
    }

    form {
        max-width: 400px;
        margin: 0 auto;
        text-align: left;
    }

    .error {
        margin-top: 20px;
        color: red;
    }

    .button-full{
        display: block;
        width: 100%;
        background: #0174be;
        color: #fff;
        border: none;
        border-radius: 10px;
        padding: 12px 16px;
        font-size: 16px;
        margin-top: 30px;
    }

</style>