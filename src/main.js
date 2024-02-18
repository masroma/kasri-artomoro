import { createApp } from 'vue'
import App from './App.vue'

import './style.css'
import router from './router';
import store from './store'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const app = createApp(App)

//define mixins for global function
app.mixin({

    methods: {

        //money thousands
        moneyFormat(number) {
             let val = (number/1).toFixed(0).replace('.', ',')
                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")

        },

       

        //calculate discount
        calculateDiscount(product) {
            return product.price - (product.price *(product.discount)/100)
        }

    }
})

app.use(router)
app.use(store)
app.use(Toast)

app.mount('#app')

