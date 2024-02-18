//import global API
import Api from '../../api/Api'

const cart = {

    //set namespace true
    namespaced: true,

    //state
    state: {

        //cart
        cart: [],

        //total cart
        cartTotal: 0,

        //cart weight
        cartWeight: 0

    },

    //mutations
    mutations: {

        //get data cart
        GET_CART(state, product) {
            state.cart = product
        },

        //get total cart
        TOTAL_CART(state, total) {
            state.cartTotal = total
        },

        //get cart weight
        CART_WEIGHT(state, weight) {
            state.cartWeight = weight
        },

    },

    //actions
    actions: {

        //action addToCart
        addToCart({ commit }, { product_id, price, quantity, weight }) {

            //get data token dan user
            const token = localStorage.getItem('token')
            const user = JSON.parse(localStorage.getItem('user'))

            //set axios header dengan type Authorization + Bearer token
            Api.defaults.headers.common['Authorization'] = "Bearer " + token

            //send data cart ke server
            Api.post('/api-admin/cart', {
                product_id: product_id,
                price: price,
                quantity: quantity,
                weight: weight,
                customer_id: user.id
            })
                .then(() => {

                    //get dat cart
                    Api.get('/api-admin/cart')
                        .then(response => {

                            //commit mutation GET_CART
                            commit('GET_CART', response.data.cart)

                        })

                    //get total cart
                    Api.get('/api-admin/cart/total')
                        .then(response => {

                            //commit mutation TOTAL_CART
                            commit('TOTAL_CART', response.data.total)

                        })

                })
        },

        update({ commit }, { cartId, payload }) {



            //define callback promise
            return new Promise((resolve, reject) => {

                const token = localStorage.getItem('token')

                //set axios header dengan type Authorization + Bearer token
                Api.defaults.headers.common['Authorization'] = `Bearer ${token}`


                Api.post(`/api-admin/cart/update/${cartId}`, payload)

                    .then(response => {

                        Api.get('/api-admin/cart')
                            .then(response => {

                                //commit mutation GET_CART
                                commit('GET_CART', response.data.cart)

                            })

                        //get total cart
                        Api.get('/api-admin/cart/total')
                            .then(response => {

                                //commit mutation TOTAL_CART
                                commit('TOTAL_CART', response.data.total)

                            })

                        // commit('')
                        resolve(response)

                    }).catch(error => {


                        //reject ke component dengan hasil response
                        reject(error.response.data)

                    })

            })
        },

        //cart count
        cartCount({ commit }) {

            //get data token dan user
            const token = localStorage.getItem('token')

            //set axios header dengan type Authorization + Bearer token
            Api.defaults.headers.common['Authorization'] = "Bearer " + token

            //get dat cart
            Api.get('/api-admin/cart')
                .then(response => {

                    //commit mutation GET_CART
                    commit('GET_CART', response.data.cart)

                })

        },

        //cart total
        cartTotal({ commit }) {

            //get data token dan user
            const token = localStorage.getItem('token')

            //set axios header dengan type Authorization + Bearer token
            Api.defaults.headers.common['Authorization'] = "Bearer " + token

            //get dat cart
            Api.get('/api-admin/cart/total')
                .then(response => {

                    //commit mutation GET_CART
                    commit('TOTAL_CART', response.data.total)

                })

        },

        //cart weight
        cartWeight({ commit }) {

            //get data token dan user
            const token = localStorage.getItem('token')

            //set axios header dengan type Authorization + Bearer token
            Api.defaults.headers.common['Authorization'] = "Bearer " + token

            Api.get('/api-admin/cart/totalWeight')
                .then(response => {

                    //commit mutation CART_WEIGHT
                    commit('CART_WEIGHT', response.data.total)

                })

        },

        removeCart({ commit }, cart_id) {

            //get data token dan user
            const token = localStorage.getItem('token')

            //set axios header dengan type Authorization + Bearer token
            Api.defaults.headers.common['Authorization'] = "Bearer " + token

            Api.post('/api-admin/cart/remove', {
                cart_id: cart_id
            })
                .then(() => {


                    //get cart
                    Api.get('/api-admin/cart')
                        .then(response => {

                            commit('GET_CART', response.data.cart)

                        })

                    //get total cart
                    Api.get('/api-admin/cart/total')
                        .then(response => {

                            commit('TOTAL_CART', response.data.total)

                        })

                    //get total cart weight
                    Api.get('/api-admin/cart/totalWeight')
                        .then(response => {

                            commit('CART_WEIGHT', response.data.total)

                        })

                })

        },

        checkout({ commit }, data) {

            return new Promise((resolve, reject) => {

                Api.post('/api-admin/checkout', {

                    courier: data.courier_type,
                    service: data.courier_service,
                    cost: data.courier_cost,
                    weight: data.weight,
                    name: data.name,
                    phone: data.phone,
                    province: data.province_id,
                    city: data.city_id,
                    address: data.address,
                    grand_total: data.grandTotal,
                    pembayaranlocal_id: data.pembayaranlocal_id


                })
                    .then(response => {

                        resolve(response.data)

                        //remove all Cart  on database
                        Api.post('/api-admin/cart/removeAll')
                            .then(() => {

                                //clear  cart
                                commit('CLEAR_CART')

                            })
                            .catch(error => {
                                console.log(error)
                            })

                    })
                    .catch(error => {
                        reject(error)
                    })

            })

        }


    },

    //getters
    getters: {

        //get cart
        getCart(state) {
            return state.cart
        },

        //count cart
        cartCount(state) {
            return state.cart.length
        },

        //cart total
        cartTotal(state) {
            return state.cartTotal
        }

    }

}

export default cart