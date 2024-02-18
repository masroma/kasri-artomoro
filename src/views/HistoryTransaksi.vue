<template>
    <div class="mx-auto max-w-6xl h-screen pt-16">
        <div class=" flex gap-x-3">
            <router-link :to="{ name: 'home' }" class="text-orange-500">Home</router-link>
            <span class="text-orange-500">></span>
            <router-link :to="{ name: 'transaksi' }" class="text-orange-500">History Transaksi</router-link>
        </div>

        <div class="my-5 flex w-3/4 gap-x-4 items-center">
            <div class="flex w-full flex-col gap-3">
                <label class="text-sm text-gray-500">Tanggal</label>
                <input v-model="data.date" type="date" class="border-1 px-2 py-3 bg-gray-100 rounded-lg"
                    @change="handleDateChange">
            </div>


            <!-- <div class="flex w-full flex-col gap-3">
            <label class="text-sm text-gray-500">Tanggal awal</label>
            <input type="date" class="border-1 px-2 py-3 bg-gray-100 rounded-lg ">
           </div> -->
            <div class="flex w-1/2 flex-col gap-3">

                <button class="bg-orange-500 mt-7 rounded-lg text-white py-3">Filter</button>
            </div>

        </div>

        <div class="py-5">
            <div>Total: Rp {{ moneyFormat(calculateTotal()) }}</div>
        </div>

        <div class="my-5">
            <table class="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th class="py-2 px-4 border-b">No</th>
                        <th class="py-2 px-4 border-b">Tanggal</th>
                        <th class="py-2 px-4 border-b">Status</th>
                        <th class="py-2 px-4 border-b">Jumlah</th>

                    </tr>
                </thead>
                <tbody>
                    <!-- Isi tabel bisa ditambahkan di sini -->
                    <tr v-for="(order, index) in orders" :key="order.id">
                        <td class="py-2 px-4 border-b text-center">{{ index + 1 }}</td>
                        <td class="py-2 px-4 border-b text-center">
                            {{
                                new Date(order.created_at).toLocaleString("id-ID", {
                                    timeZone: 'Asia/Jakarta',
                                    hourCycle: "h23",
                                    year: "numeric",
                                    month: "long",
                                    day: "2-digit",
                                })
                            }}
                        </td>
                        <td class="py-2 px-4 border-b text-center">
                            Toko Offline
                        </td>
                        <td class="py-2 px-4 border-b text-center">Rp {{ moneyFormat(order.grand_total) }}</td>

                    </tr>
                    <!-- Contoh data lainnya -->
                </tbody>
            </table>
        </div>
    </div>
</template>


<script>
//import customer menu component
import { computed, onMounted, reactive } from 'vue'
import { useStore } from 'vuex'


export default {

    name: 'OrderComponent',

    components: {
        //customer menu component

    },

    setup() {

        //store vuex
        const store = useStore()

        const data = reactive({
            date: new Date().toISOString().substr(0, 10) // Inisialisasi dengan tanggal hari ini
        });


        //mounted
        onMounted(() => {
            store.dispatch('order/getOrder')
            store.dispatch('auth/getUser')
        })

       



        //computed


        const orders = computed(() => {

            //panggil getter dengan nama "getOrder" di module "order" vuex 
            return store.getters['order/getOrder']

        })

        const calculateTotal = () => {
            let total = 0;
            orders.value.forEach(order => {
                
                total += order.grand_total;
            });
            return total;
        }

        const handleDateChange = async () => {
            const tanggal = data.date;

            await store.dispatch("order/getOrder", {dates:tanggal})
        }

      

        const user = computed(() => {
            //panggil getters dengan nama "currentUser" dari module "auth"
            return store.getters['auth/currentUser']
        })
        //return a state and function
        return {
            store,
            orders,
            user,
            data,
            handleDateChange,
            calculateTotal

        }

    }

}
</script>