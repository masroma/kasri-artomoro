<template>
    <div class="pb-20 pt-20">
        <div class="container mx-auto max-w-6xl">
            <div class="my-5">
                <router-link :to="{name:'home'}" class="text-orange-500">Dashboard</router-link>
            </div>
            <div class="shadow-md p-5 ">
                {{ user.name }}
            </div>

            <div class="grid grid-cols-3 gap-4 my-5">
                <div class="shadow-md border-1 flex py-5 px-4 justify-between items-center">
                    <div class="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24"><g fill="none"><path stroke="#008000" stroke-linecap="round" stroke-width="2" d="M3 9v6c0 2.828 0 4.243.879 5.121C4.757 21 6.172 21 9 21h6c2.828 0 4.243 0 5.121-.879C21 19.243 21 17.828 21 15V9c0-2.828 0-4.243-.879-5.121C19.243 3 17.828 3 15 3H9"/><path fill="#008000" d="M15 15v1h1v-1zM7.707 6.293a1 1 0 0 0-1.414 1.414zM14 8v7h2V8zm1 6H8v2h7zm.707.293l-8-8l-1.414 1.414l8 8z"/></g></svg>
                    </div>
                    <div class="flex flex-col text-end">
                        <p class="text-sm text-gray-500">Omzet hari ini</p>
                        <p class="text-lg font-bold text-orange-500">
                            Rp {{ moneyFormat(hariini) }}
                        </p>
                    </div>
                </div>
                <div class="shadow-md border-1 flex py-5 px-4 justify-between items-center">
                    <div class="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24"><g fill="none"><path stroke="#0000ff" stroke-linecap="round" stroke-width="2" d="M3 9v6c0 2.828 0 4.243.879 5.121C4.757 21 6.172 21 9 21h6c2.828 0 4.243 0 5.121-.879C21 19.243 21 17.828 21 15V9c0-2.828 0-4.243-.879-5.121C19.243 3 17.828 3 15 3H9"/><path fill="#0000ff" d="M15 15v1h1v-1zM7.707 6.293a1 1 0 0 0-1.414 1.414zM14 8v7h2V8zm1 6H8v2h7zm.707.293l-8-8l-1.414 1.414l8 8z"/></g></svg>
                    </div>
                    <div class="flex flex-col text-end">
                        <p class="text-sm text-gray-500">Omzet Kemarin</p>
                        <p class="text-lg font-bold text-orange-500">
                            Rp {{ moneyFormat(kemarin) }}
                        </p>
                    </div>
                </div>
                <div class="shadow-md border-1 flex py-5 px-4 justify-between items-center">
                    <div class="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24"><g fill="none"><path stroke="#ff8040" stroke-linecap="round" stroke-width="2" d="M3 9v6c0 2.828 0 4.243.879 5.121C4.757 21 6.172 21 9 21h6c2.828 0 4.243 0 5.121-.879C21 19.243 21 17.828 21 15V9c0-2.828 0-4.243-.879-5.121C19.243 3 17.828 3 15 3H9"/><path fill="#ff8040" d="M15 15v1h1v-1zM7.707 6.293a1 1 0 0 0-1.414 1.414zM14 8v7h2V8zm1 6H8v2h7zm.707.293l-8-8l-1.414 1.414l8 8z"/></g></svg>
                    </div>
                    <div class="flex flex-col text-end">
                        <p class="text-sm text-gray-500">Omzet Bulan ini</p>
                        <p class="text-lg font-bold text-orange-500">
                            Rp {{ moneyFormat(bulanini) }}
                        </p>
                    </div>
                </div>
              

            </div>
        </div>

    </div>
</template>

<script>

    //hook vuex
    import { useStore } from 'vuex'
    
    //hook vue
    import { computed, onMounted } from 'vue'

    export default {

        name: 'DashboardComponent',

        setup() {

            //store vuex
            const store = useStore()

            //mounted
            onMounted(() => {
                //panggil action "getUser" dari module "auth" vuex
                store.dispatch('auth/getUser')
                store.dispatch('order/getOmsetHariIni')
                store.dispatch('order/getOmsetKemarin')
                store.dispatch('order/getOmsetBulanIni')
            })

            //data user login
            const user = computed(() => {
                return store.state.auth.user
            })

            const hariini = computed(() => {
                return store.state.order.omsetHariIni
            })

            const kemarin = computed(() => {
                return store.state.order.omsetKemarin
            })

            const bulanini = computed(() => {
                return store.state.order.omsetBulanIni
            })

            //return a state and function
            return {
                user,
                hariini,
                kemarin,
                bulanini       // <-- state user
            }

        }
    }
</script>

<style>

</style>