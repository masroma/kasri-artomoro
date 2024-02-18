<template>
    <div>
        <div class="w-full justify-between flex items-center bg-orange-500 py-4 fixed top-0 px-5 z-10">
            <div class="logo">
                <p class="text-base text-white"><span class="font-semibold">Artomoro</span> Kasir</p>
            </div>

            <div class="flex gap-x-10">
                <router-link :to="{name:'home'}" class="text-sm text-white items-center hover:text-white cursor-pointer flex gap-x-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="#fff" d="M4 13h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1m0 8h6c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1m10 0h6c.55 0 1-.45 1-1v-8c0-.55-.45-1-1-1h-6c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1M13 4v4c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1h-6c-.55 0-1 .45-1 1"/></svg>
                  
                    Dashboard
                </router-link>
                <router-link :to="{name:'order'}" class="text-sm text-white hover:text-white cursor-pointer flex gap-x-1 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 15 15"><path fill="#fff" d="M.979.356L.02.644L3.128 11H15V4.5A2.5 2.5 0 0 0 12.5 2H1.472z"/><path fill="#fff" fill-rule="evenodd" d="M5.5 12a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0-3M5 13.5a.5.5 0 1 1 1 0a.5.5 0 0 1-1 0m7.5-1.5a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0-3m-.5 1.5a.5.5 0 1 1 1 0a.5.5 0 0 1-1 0" clip-rule="evenodd"/></svg>
                    Order
                </router-link>
                <router-link :to="{name:'transaksi'}" class="text-sm text-white hover:text-white cursor-pointer flex items-center gap-x-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 48 48"><defs><mask id="ipSTransaction0"><g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"><path fill="#fff" stroke="#fff" d="M39 6H9a3 3 0 0 0-3 3v30a3 3 0 0 0 3 3h30a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3"/><path stroke="#000" d="m21 31l5 4l8-10M14 15h20m-20 8h8"/></g></mask></defs><path fill="#fff" d="M0 0h48v48H0z" mask="url(#ipSTransaction0)"/></svg>
                    Transaksi
                </router-link>
              

                <span @click="logout" class="text-sm text-white flex items-center gap-x-1 hover:text-white cursor-pointer items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 14 14"><path fill="#fff" fill-rule="evenodd" d="M0 1.5A1.5 1.5 0 0 1 1.5 0h7A1.5 1.5 0 0 1 10 1.5v1.939a2 2 0 0 0-.734 1.311H5.75a2.25 2.25 0 1 0 0 4.5h3.516A2 2 0 0 0 10 10.561V12.5A1.5 1.5 0 0 1 8.5 14h-7A1.5 1.5 0 0 1 0 12.5zm10.963 2.807A.75.75 0 0 0 10.5 5v1H5.75a1 1 0 0 0 0 2h4.75v1a.75.75 0 0 0 1.28.53l2-2a.75.75 0 0 0 0-1.06l-2-2a.75.75 0 0 0-.817-.163" clip-rule="evenodd"/></svg>
                   Logout
                </span>

                

            </div>
        </div>
    </div>
</template>

<script>

    //hook vuex
    import { useStore } from 'vuex'

    //hook vue router
    import { useRouter } from 'vue-router'
    
    //hook vue
    import { computed, onMounted } from 'vue'

    //hook Toast
  

    export default {

        name: 'HeaderComponent',

        setup() {

            //store vuex
            const store = useStore()

            //vue router
            const router = useRouter()

            // Same interface as this.$toast
          

            //mounted
            onMounted(() => {
                //panggil action "getUser" dari module "auth" vuex
                store.dispatch('auth/getUser')

            })

            //data user login
            const user = computed(() => {
                return store.state.auth.user
            })

            //method logout
            function logout() {

                //panggil action "logout" di dalam module "auth"
                store.dispatch('auth/logout')
                .then(() => {

                    //jika berhasil, akan di arahkan ke route login
                    router.push({
                        name: 'login'
                    })

                   

                })

            }

            //return a state and function
            return {
                logout,     // <-- method logout
                user,       // <-- state user
            }

        }
    }
</script>


