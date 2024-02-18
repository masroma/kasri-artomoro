//import vuex
import { createStore } from 'vuex'
import auth from './module/auth'
import product from './module/product'
import cart from './module/cart'
import order from './module/order'
//create store vuex
export default createStore({

    modules: {
        auth,
        product,
        cart,
        order
    }

})