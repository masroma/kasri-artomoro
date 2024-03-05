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
        omsetBulanIni:{},
        nextExists: false,
        nextPage: 0,

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

        SET_NEXTEXISTS(state, nextExists) {
            state.nextExists = nextExists
        },

        //set state nextPage
        SET_NEXTPAGE(state, nextPage) {
            state.nextPage = nextPage
        },

        SET_LOADMORE(state, data) {
            data.forEach(row => {
                state.orders.push(row);
            });
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
                // console.log('dada',response.data.data.data)
                //commit ke mutation GET_ORDER
                commit('GET_ORDER', response.data.data.data)

                if (response.data.data.current_page < response.data.data.last_page) {
                    
                    //commit ke mutation SET_NEXTEXISTS dengan true
                    commit('SET_NEXTEXISTS', true)
                    
                    //commit ke mutation SET_NEXTPAGE dengan current page + 1
                    commit('SET_NEXTPAGE', response.data.data.current_page + 1)

                } else {

                    //commit ke mutation SET_NEXTEXISTS dengan false
                    commit('SET_NEXTEXISTS', false)
                }

            })

        },

        getLoadMore({ commit }, nextPage) {

            //get data campaign dengan page ke server
            Api.get(`/api-admin/order?page=${nextPage}`)
            .then(response => {

                //commit ke mutation SET_LOADMORE dengan response data
                commit('SET_LOADMORE', response.data.data.data)

                //console.log(response.data.data.data)

                if (response.data.data.current_page < response.data.data.last_page) {
                    
                    //commit ke mutation SET_NEXTEXISTS dengan true
                    commit('SET_NEXTEXISTS', true)
                    
                    //commit ke mutation SET_NEXTPAGE dengan current page + 1
                    commit('SET_NEXTPAGE', response.data.data.current_page + 1)

                } else {

                    //commit ke mutation SET_NEXTEXISTS dengan false
                    commit('SET_NEXTEXISTS', false)
                }

            }).catch(error => {

                //show error log dari response
                console.log(error)

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