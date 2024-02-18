//import global API
import Api from '../../api/Api'

const order = {

    //set namespace true
    namespaced: true,

    //state
    state: {
        
        //define state orders
        orders: [],
        omsetHariIni:{},
        omsetKemarin:{},
        omsetBulanIni:{}

    },

    //mutations
    mutations: {

        //GET ORDER
        GET_ORDER(state, orders) {
            state.orders = orders // <-- assign state orders dari hasil response
        },

        GET_OMSET_HARIINI(state, omsetHariIni) {
            state.omsetHariIni = omsetHariIni // <-- assign state orders dari hasil response
        },

        GET_OMSET_KEMARIN(state, omsetKemarin) {
            state.omsetKemarin = omsetKemarin // <-- assign state orders dari hasil response
        },

        GET_OMSET_BULANINI(state, omsetBulanIni) {
            state.omsetBulanIni = omsetBulanIni // <-- assign state orders dari hasil response
        },

    },

    //actions
    actions: {

        //action getOrder
        getOrder({ commit }, payload) {
            let tanggal = payload ? payload.dates : ''
            //define variable token
            const token = localStorage.getItem('token')

            Api.defaults.headers.common['Authorization'] = "Bearer " +token
            Api.get(`/api-admin/order?tanggal=${tanggal}`)
            .then(response => {
                console.log('dada',response.data.data)
                //commit ke mutation GET_ORDER
                commit('GET_ORDER', response.data.data)

            })

        },

        getOmsetHariIni({ commit }) {
           
            //define variable token
            const token = localStorage.getItem('token')

            Api.defaults.headers.common['Authorization'] = "Bearer " +token
            Api.get(`/api-admin/omsethariini`)
            .then(response => {
               
                //commit ke mutation GET_ORDER
                commit('GET_OMSET_HARIINI', response.data.totalOmset)

            })

        },

        getOmsetKemarin({ commit }) {
           
            //define variable token
            const token = localStorage.getItem('token')

            Api.defaults.headers.common['Authorization'] = "Bearer " +token
            Api.get(`/api-admin/omsetkemarin`)
            .then(response => {
               
                
                //commit ke mutation GET_ORDER
                commit('GET_OMSET_KEMARIN', response.data.totalOmset)

            })

        },

        getOmsetBulanIni({ commit }) {
           
            //define variable token
            const token = localStorage.getItem('token')

            Api.defaults.headers.common['Authorization'] = "Bearer " +token
            Api.get(`/api-admin/omsetbulanini`)
            .then(response => {
                console.log(response)
                //commit ke mutation GET_ORDER
                commit('GET_OMSET_BULANINI', response.data.totalOmset)

            })

        },

    },

    //getters
    getters: {

        //getter getOrder
        getOrder(state) {
            return state.orders
        },

        getOmsetHariIni(state){
            return state.omsetHariIni
        },

        getOmsetKemarin(state){
            return state.omsetKemarin
        },

        getOmsetBulanIni(state){
            return state.omsetBulanIni
        }

    }

}

export default order