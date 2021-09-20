import { createApp } from 'vue';
import  router  from './router.js';
import App from './App.vue';
import store from './store'

// var firebaseConfig = {
//     apiKey: "AIzaSyDQFehzdEuRumzKzzzrtM7cFDqrBzEI1Pg",
//     authDomain: "doanminhduc97-2c799.firebaseapp.com",
//     databaseURL: "https://doanminhduc97-2c799-default-rtdb.firebaseio.com",
//     projectId: "doanminhduc97-2c799",
//     storageBucket: "doanminhduc97-2c799.appspot.com",
//     messagingSenderId: "218819549098",
//     appId: "1:218819549098:web:6c0db31485d8e774477dd3",
//     measurementId: "G-GBLV4VBHZ0"
//   };
  // Initialize Firebase

const app = createApp(App)
// const BaseCard = defineAsyncComponent(() => import('../src/components/ui/BaseCard.vue'))
// const BaseButton = defineAsyncComponent(() => import('../src/components/ui/BaseButton.vue'))
// const BaseBadge = defineAsyncComponent(() => import('../src/components/ui/BaseBadge.vue'))
// const BaseDialog = defineAsyncComponent(() => import('../src/components/ui/BaseDialog.vue'))
app.use(router)
app.use(store)
// app.use(fireBase)
// app.component('base-card', BaseCard)
// app.component('base-button', BaseButton)
// app.component('base-badge', BaseBadge)
// app.component('base-dialog', BaseDialog)

app.mount('#app')