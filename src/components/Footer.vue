<template>
    <!-- <div class="hidden md:block">
        <div class="bg-white text-center fixed inset-x-0 bottom-0 z-10">
            <div class=" text-center py-2">
             <p class="text-gray-600">Artomoro</p>
            </div>
         </div>
    </div> -->

    <div class="block md:hidden lg:hidden" v-if="$route.name != 'cart'">
        <div class="bg-orange-500 text-center fixed inset-x-0 bottom-0 z-10 p-4 shadow-md mx-3 rounded-lg mb-5">
           <div class="w-full flex justify-between">
           
            <router-link v-if="$route.name == 'home'" :to="{name:'home'}" class="bg-white rounded-full py-1 text-orange-500 px-2 flex flex-col justify-center items-center focus:text-white hover:text-white" >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#F97316" fill-rule="evenodd" d="M5.274 10.126C5 10.723 5 11.402 5 12.76V17c0 1.887 0 2.83.586 3.415c.531.532 1.357.58 2.914.585v-5a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v5c1.557-.005 2.383-.054 2.914-.586C19 19.828 19 18.886 19 17v-4.24c0-1.358 0-2.037-.274-2.634c-.275-.597-.79-1.038-1.821-1.922l-1-.857C14.04 5.75 13.11 4.95 12 4.95c-1.11 0-2.041.799-3.905 2.396l-1 .857c-1.03.884-1.546 1.325-1.82 1.922M13.5 21v-5h-3v5z" clip-rule="evenodd"/></svg>
                <!-- <p class="text-xs focus:text-white hover:text-white">Home</p> -->
            </router-link>
            <router-link v-else :to="{name:'home'}" class="text-white hover:text-black px-2 flex flex-col justify-center items-center focus:text-white hover:text-white" >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#fff" fill-rule="evenodd" d="M5.274 10.126C5 10.723 5 11.402 5 12.76V17c0 1.887 0 2.83.586 3.415c.531.532 1.357.58 2.914.585v-5a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v5c1.557-.005 2.383-.054 2.914-.586C19 19.828 19 18.886 19 17v-4.24c0-1.358 0-2.037-.274-2.634c-.275-.597-.79-1.038-1.821-1.922l-1-.857C14.04 5.75 13.11 4.95 12 4.95c-1.11 0-2.041.799-3.905 2.396l-1 .857c-1.03.884-1.546 1.325-1.82 1.922M13.5 21v-5h-3v5z" clip-rule="evenodd"/></svg>
                <p class="text-xs focus:text-white hover:text-white">Home</p>
            </router-link>
            <router-link  v-if="$route.name == 'order'"  :to="{name:'order'}" href="#" class="bg-white rounded-full py-1 px-2 flex flex-col justify-center items-center focus:text-white hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#F97316" fill-rule="evenodd" d="M5.586 4.586C5 5.172 5 6.114 5 8v9c0 1.886 0 2.828.586 3.414C6.172 21 7.114 21 9 21h6c1.886 0 2.828 0 3.414-.586C19 19.828 19 18.886 19 17V8c0-1.886 0-2.828-.586-3.414C17.828 4 16.886 4 15 4H9c-1.886 0-2.828 0-3.414.586M9 8a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2zm0 4a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2zm0 4a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2z" clip-rule="evenodd"/></svg>
              
            </router-link>
            <router-link  v-else  :to="{name:'order'}" href="#" class="text-white hover:text-black px-2 flex flex-col items-center focus:text-white hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#fff" fill-rule="evenodd" d="M5.586 4.586C5 5.172 5 6.114 5 8v9c0 1.886 0 2.828.586 3.414C6.172 21 7.114 21 9 21h6c1.886 0 2.828 0 3.414-.586C19 19.828 19 18.886 19 17V8c0-1.886 0-2.828-.586-3.414C17.828 4 16.886 4 15 4H9c-1.886 0-2.828 0-3.414.586M9 8a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2zm0 4a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2zm0 4a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2z" clip-rule="evenodd"/></svg>
               <p class="text-xs focus:text-white hover:text-white">Order</p>
            </router-link>
            <router-link  :to="{name:'cart'}" class="relative px-2">
                <div class="absolute -top-8 -right-5 bg-white rounded-full p-1 text-orange-500"> 
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path fill="#F97316" fill-rule="evenodd" d="M8.418 3.25c.28-.59.884-1 1.582-1h4c.698 0 1.241.41 1.582 1c.683.006 1.216.037 1.692.223a3.25 3.25 0 0 1 1.426 1.09c.367.494.54 1.127.776 1.998l.742 2.722l.28.841l.024.03c.901 1.154.472 2.87-.386 6.241c-.546 2.183-.818 3.274-1.632 3.91c-.814.635-1.939.635-4.189.635h-4.63c-2.25 0-3.375 0-4.189-.635c-.814-.636-1.087-1.727-1.632-3.91c-.858-3.431-1.287-5.147-.386-6.241l.024-.03l.28-.841l.742-2.722c.237-.871.41-1.505.776-1.999a3.25 3.25 0 0 1 1.426-1.089c.476-.186 1.008-.217 1.692-.222m.002 1.502c-.662.007-.928.032-1.148.118a1.75 1.75 0 0 0-.768.587c-.176.237-.28.568-.57 1.635l-.57 2.089C6.384 9 7.778 9 9.684 9h4.631c1.907 0 3.3 0 4.32.18l-.569-2.089c-.29-1.067-.394-1.398-.57-1.635a1.75 1.75 0 0 0-.768-.587c-.22-.086-.486-.111-1.148-.118A1.75 1.75 0 0 1 14 5.75h-4a1.75 1.75 0 0 1-1.58-.998" clip-rule="evenodd"/></svg>
                   
                </div>
            </router-link>

            <router-link v-if="$route.name == 'transaksi'"  :to="{name:'transaksi'}" class="bg-white rounded-full py-1 px-2 flex flex-col items-center justify-center focus:text-white hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="#F97316" stroke-width="2" d="M2 7h18m-4-5l5 5l-5 5m6 5H4m4-5l-5 5l5 5"/></svg>
            </router-link>
            <router-link v-else  :to="{name:'transaksi'}" class="text-white hover:text-black px-2 flex flex-col items-center focus:text-white hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="#fff" stroke-width="2" d="M2 7h18m-4-5l5 5l-5 5m6 5H4m4-5l-5 5l5 5"/></svg>
                <p class="text-xs focus:text-white hover:text-white">Transaksi</p>
            </router-link>
            <span @click="logout" class="cursor-pointer text-white hover:text-black px-2 flex flex-col items-center focus:text-white hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 20"><path fill="#fff" fill-rule="evenodd" d="M3 3a1 1 0 0 0-1 1v12a1 1 0 1 0 2 0V4a1 1 0 0 0-1-1m10.293 9.293a1 1 0 0 0 1.414 1.414l3-3a1 1 0 0 0 0-1.414l-3-3a1 1 0 1 0-1.414 1.414L14.586 9H7a1 1 0 1 0 0 2h7.586z" clip-rule="evenodd"/></svg>
                <p class="text-xs focus:text-white hover:text-white">
                    Logout
                </p>
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
export default {
    name: 'FooterComponent',
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

const carts = computed(() => {
            return store.getters['cart/getCart']
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
    user,    
    carts   // <-- state user
}

}
}
</script>

<style>

</style>