<template>
    <div>
        <base-dialog :show="isLoading" fixed title="Authenticating..."></base-dialog>
        <base-dialog :show="success" fixed title="Ngày mới vui vẻ nhé bạn!"></base-dialog>
        <base-dialog :show="!!error" title="An error occurred" @close="handleError">
            <p>Đang gặp lỗi làm lại đê!</p>
        </base-dialog>
        <base-card>
            <form @submit.prevent="submitForm(confirmName)" v-if="!isLoginName">
                <div class="form-group" v-if="mode !== 'login'">
                    <label for="userName">Name</label>
                    <input type="text" class="form-control" id="userName" placeholder="Enter user" v-model.trim="userName">
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" v-model.trim="email">
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model.trim="password">
                </div>
                <p v-if="!formIsValid" class="errors">Nhập tử tế hộ bạn cái (-_-)</p>
                <base-button>{{ submitButtonCaption }}</base-button>
                <base-button type="button" mode="flat" @click="switchAuthMode">{{ switchModeButtonCaption }}</base-button>
            </form>
        </base-card>
    </div>
</template>
<script>
import firebase from 'firebase';
var firebaseConfig = {
    apiKey: "AIzaSyDQFehzdEuRumzKzzzrtM7cFDqrBzEI1Pg",
    authDomain: "doanminhduc97-2c799.firebaseapp.com",
    databaseURL: "https://doanminhduc97-2c799-default-rtdb.firebaseio.com",
    projectId: "doanminhduc97-2c799",
    storageBucket: "doanminhduc97-2c799.appspot.com",
    messagingSenderId: "218819549098",
    appId: "1:218819549098:web:6c0db31485d8e774477dd3",
    measurementId: "G-GBLV4VBHZ0"
};
export default {
    data() {
        return {
            email: '',
            password: '',
            formIsValid: true,
            mode: 'login',
            isLoginName: false,
            isLoading: false,
            error: null,
            userName: '',
            res: null,
            imageBase64: null,
        }
    },
    computed: {
        submitButtonCaption() {
            if(this.mode === 'login') {
                return 'Login'
            } else {
                return 'Signup'
            }
        },
        switchModeButtonCaption() {
            if(this.mode === 'login') {
                return 'Signup instead'
            } else {
                return 'Login instead'
            }
        }
    },
    async created() {
        if (!firebase.apps.length) {
			firebase.initializeApp(firebaseConfig);
		}else {
			firebase.app(); // if already initialized, use that one
		}
        firebase.auth().onAuthStateChanged(user => {
			if(user) {
				var userr = {...firebase.auth().currentUser }
				if(userr) {
                    // this.isLoginName = true
                    this.$router.push('/HomeMessage')
				}
			}else {
				console.log('logined')
			}
		})
    },
    methods: {
        async submitForm(confirmName) {
            if(this.email === '' || !this.email.includes('@') || this.password === '') {
                this.formIsValid = false
                return;
            }
            this.isLoading = true
            const params = {
                email: this.email,
                password: this.password
            }
            if(this.mode === 'login') {
                //....
                try {
                    await this.$store.dispatch('auth/login', params).then(res => {
                        this.res = res
                        this.isLoginName = true
                    })
                } catch (err) {
                    this.error = err.message || 'Failed to authentication. Check your login data!'
                    return 
                }

            } else {
                await this.$store.dispatch('auth/signUp', params).then(res => {
                    this.res = res
                    this.isLoginName = true
                }).catch(error => {
                    this.error = error.message || 'Failed to authentication. Check your login data!'
                    return
                })
                confirmName()
            }
            firebase.auth().signInWithEmailAndPassword(this.email, this.password).catch(function(error) {
                var errorCode = error.code
                console.log('errorCode', errorCode)
                this.error = error.message
            })
            this.isLoading = false
        },
        switchAuthMode() {
            if(this.mode === 'login') {
                this.mode = 'signup'
            } else {
                this.mode = 'login'
            }
        },
        handleError() {
            this.error = null
        },
        async confirmName() {
            // this.isLoading = true
            // if(this.imageBase64) {
                const params = {
                    bodyRequest: {
                        userName: this.userName,
                        userId: this.res.localId
                        // base64: this.imageBase64
                    },
                    token: this.res.idToken
                }
                // console.log('params image', params)
                await this.$store.dispatch('auth/setImage', params)
            // }
            // this.isLoading = false
            console.log('vào confirmName')
            this.$router.push('/HomeMessage')
        },
        // async setImage(event) {
        //     let data = event.target.files[0]
        //     this.imageBase64 =  await this.toBase64(data)
        // },
        // toBase64(file) {
        //     return new Promise((resolve, reject) => {
        //         const reader = new FileReader();
        //         reader.readAsDataURL(file);
        //         reader.onload = () => resolve(reader.result);
        //         reader.onerror = error => reject(error)
        //     })
        // }
    }
}
</script>
<style scoped>
.form-control {
  margin: 0.5rem 0;
}
input {
  width: 90%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus{
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
.errors {
  font-weight: bold;
  color: red;
}
</style>