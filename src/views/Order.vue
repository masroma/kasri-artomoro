<template>
    <div class="mx-auto flex h-screen pt-16">
        
        <div class="w-3/4 flex flex-col p-4 overflow-y-auto">
            <div class="px-5 flex gap-x-3">
                <router-link :to="{name:'home'}" class="text-orange-500">Home</router-link>
                <span class="text-orange-500">></span>
                <router-link :to="{name:'order'}" class="text-orange-500">Order</router-link>
            </div>
            <div class="flex px-5 py-5">
                
                <input type="text" placeholder="Cari Produk"
                    class=" px-2 py-3 w-1/2 bg-gray-100 border-orange-500 border-1 focus:outline-none text-base rounded-lg" v-model="data.search" @keypress.enter="searchData" >
                <span class="flex justify-center items-center bg-orange-500 px-3 rounded-lg" @click="searchData">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                        <path fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                            d="m21 21l-4.343-4.343m0 0A8 8 0 1 0 5.343 5.343a8 8 0 0 0 11.314 11.314" />
                    </svg>
                </span>
            </div>

            <div class="grid grid-cols-12 gap-x-3 px-5">
                <div v-for="product in products" :key="product.id"
                    class="col-span-3 shadow border-[1px] border-gray-200 my-2 coursor-pointer"
                    @click.prevent="addToCart(product.id, calculateDiscount(product), product.weight)">
                    <div class="w-full ">
                        <img :src="product.image" class="w-full mx-auto">
                    </div>

                    <div class="p-2">
                        <p class="text-sm font-semibold text-gray-500">
                            {{ product.title }}
                        </p>
                        <p v-if="product.discount" class="text-[10px] text-gray-500"><s>Rp. {{
                            moneyFormat(product.price) }}</s></p>

                        <p class="text-base font-semibold text-[#ff914d]">
                            Rp. {{ moneyFormat(calculateDiscount(product)) }}
                        </p>
                    </div>
                </div>


            </div>

            <div v-if="nextExists" class="w-full text-center mt-5">
                <button @click="loadMore"
                    class="bg-[#ff914d] w-fit rounded text-[12px] px-3 py-2 text-white font-semibold">Load
                    More</button>
            </div>
        </div>
        <div class="w-1/3 bg-white p-4 sticky top-0 h-screen pt-20 pb-10">
            <!-- Isi dari sidebar di sini -->
            <div class="flex flex-col justify-between h-full">
                <div class="scroll overflow-y-auto h-full pb-20">
                    <div v-for="cart in carts" :key="cart.id" class="flex gap-3 justify-between bg-white px-2 py-2 my-3">
                        <div class="flex gap-x-3">
                            <div class="w-16 flex justify-center items-center">
                                <img :src="cart.product.image" class="w-10 border-r-2">
                            </div>
                            <div class="flex flex-col gap-y-2">
                                <p class="capitalize text-sm text-gray-500 font-semibold">
                                    {{ cart.product.title }}
                                </p>
                                <div class="flex gap-x-5">
                                    <div class="text-sm font-semibold">
                                        Rp {{ moneyFormat((cart.product.price - (cart.product.price
                                            * (cart.product.discount) / 100)) * cart.quantity) }}
                                    </div>
                                    <div class="flex gap-x-1">
                                        <button @click="TambahQty(cart.id)" class="bg-[#ff914d] font-semibold text-white rounded max-h-8
                                                px-2 justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="18"
                                                height="18" viewBox="0 0 24 24">
                                                <path fill="white"
                                                    d="M18 10h-4V6a2 2 0 0 0-4 0l.071 4H6a2 2 0 0 0 0 4l4.071-.071L10 18a2 2 0 0 0 4 0v-4.071L18 14a2 2 0 0 0 0-4" />
                                            </svg></button>
                                        <input v-model="cart.quantity" type="number" min="1"
                                            class="appearance-none text-gray-500 text-center justify-center w-14 max-h-8 border-2 border-gray-300 rounded">
                                        <button @click="KuranginQty(cart.id)" class="bg-[#ff914d] font-semibold text-white rounded max-h-8
                                            px-2 justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="18"
                                                height="18" viewBox="0 0 24 24">
                                                <path fill="white" d="M18 11H6a2 2 0 0 0 0 4h12a2 2 0 0 0 0-4" />
                                            </svg></button>
                                    </div>

                                </div>


                            </div>
                        </div>
                    </div>
                </div>
                <div class="pembayaran fixed bottom-0 w-[365px] p-4 bg-white">
                    <div class="flex flex-col gap-y-3 border-left border-1">
                        <div class="flex justify-between text-base font-semibold text-gray-500">
                            <p>Total</p>
                            <p>Rp {{ moneyFormat((cartTotal)) }}</p>
                        </div>
                        <button v-if="cartTotal != 0" @click.prevent="checkout"
                            class="block w-full text-center py-3 bg-orange-500 font-semibold text-base text-white rounded">
                            Pembayaran
                        </button>
                    </div>
                </div>
            </div>
        </div>


        <!-- Main Content -->

    </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed, onMounted, reactive } from 'vue'
import { useToast } from "vue-toastification"
import Swal from 'sweetalert2';
import { useRoute, useRouter } from "vue-router";
export default {
    name: 'OrderComponent',

    setup() {

        const store = useStore()
        const toast = useToast()
        const router = useRouter();
        const route = useRoute();

        onMounted(() => {
            store.dispatch('product/getProducts')
        })

        //computed properti digunakan untuk get data products dari state di module product 
        const products = computed(() => {
            return store.state.product.products
        })

        const data = reactive({
            search: '',
        });

        onMounted(() => {

            //menjalankan beberapa actions di module cart
            store.dispatch('cart/cartCount')  // <-- untuk memanggil action "cartCount" di module "cart"
            store.dispatch('cart/cartTotal')  // <-- untuk memanggil action "cartTotal" di module "cart"
            store.dispatch('cart/cartWeight') // <-- untuk memanggil action "cartWeight" di module "cart"

        })

        //get data cart dari getters cart di module cart
        const carts = computed(() => {
            return store.getters['cart/getCart']
        })

        //get total cart dari state cartTotal di module cart
        const cartTotal = computed(() => {
            return store.state.cart.cartTotal
        })

        //get cart weight dari state cartWeight di module cart
        const cartWeight = computed(() => {
            return store.state.cart.cartWeight
        })

        const nextExists = computed(() => {
            return store.state.product.nextExists
        })

        //get nextPage
        const nextPage = computed(() => {
            return store.state.product.nextPage
        })

        const searchData = async () => {
            const pencarian = data.search;

            await store.dispatch("product/getProducts", {search:pencarian})
        }

        const state = reactive({
            name: '',     // <-- state name
            phone: '',     // <-- state phone  
            address: '',     // <-- state address  
            provinces: [],     // <-- state provinces
            province_id: '',     // <-- state ID province
            cities: [],     // <-- state cities
            city_id: '',     // <-- state ID City
            courier: false,  // <-- state pilihan kurir
            courier_type: '',     // <-- state jenis kurir 
            cost: false,  // <-- state cost kurir
            costs: '',     // <-- state costs kurir
            costService: '',     // <-- state get data cost dan service pengiriman
            courier_cost: 0,      // <-- state untuk menyimpan cost kurir
            courier_service: '',     // <- state untuk menyimpan service kurir        
            buttonCheckout: false,  // <-- state button checkout 
            grandTotal: 0,
            pembayaranlocal_id: ''     // <-- state untuk grand total 
        })

        function checkout() {



            //ceck apakah ada nama, phone, address dan berat produk ?
          

            //define variable
            let data = {
                name: state.name,
                phone: state.phone,
                province_id: state.province_id,
                city_id: state.city_id,
                courier_type: state.courier_type,
                courier_service: state.courier_service,
                courier_cost: state.courier_cost,
                weight: cartWeight.value,
                address: state.address,
                grandTotal: state.grandTotal,
                pembayaranlocal_id: state.pembayaranlocal_id
            }
            console.log('daia', data);
            store.dispatch('cart/checkout', data)
                .then(response => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Transaksi berhasil',
                    });

                    store.dispatch('cart/cartCount')  // <-- untuk memanggil action "cartCount" di module "cart"
                    store.dispatch('cart/cartTotal')  // <-- untuk memanggil action "cartTotal" di module "cart"
                    store.dispatch('cart/cartWeight')
                    //jika berhasil, arahakan ke detail order dengan parameter snap_token midtrans
                    router.push({ name: 'order' })


                }).catch(error => {
                    console.log(error)
                })





        }
        //loadMore function
        function loadMore() {
            store.dispatch('product/getLoadMore', nextPage.value)
        }


        function confirmDelete(id) {
            Swal.fire({
                title: 'Konfirmasi',
                text: 'Apakah Anda yakin ingin menghapus data?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Ya, hapus!',
                cancelButtonText: 'Batal',
            }).then((result) => {
                if (result.isConfirmed) {
                    store.dispatch('cart/removeCart', id)
                        .then(() => {

                            store.dispatch('cart/cartCount')  // <-- untuk memanggil action "cartCount" di module "cart"
                            store.dispatch('cart/cartTotal')  // <-- untuk memanggil action "cartTotal" di module "cart"
                            store.dispatch('cart/cartWeight')

                            router.push({ name: "order" });
                            //alert
                            Swal.fire({
                                title: 'BERHASIL!',
                                text: "Data Berhasil Dihapus!",
                                icon: 'success',
                                showConfirmButton: false,
                                timer: 2000
                            })



                        })
                }
            });
        }


        const TambahQty = (itemId) => {
            const cartItem = carts.value.find(item => item.id === itemId);

            // console.log(cartItem.product.price);
            if (cartItem) {
                cartItem.quantity += 1;

                const price = cartItem.quantity * (cartItem.product.price - (cartItem.product.price * (cartItem.product.discount) / 100));
                const weight = cartItem.quantity * cartItem.product.weight;


                let formData = new FormData();
                formData.append('quantity', cartItem.quantity)
                formData.append('price', price)
                formData.append('weight', weight)

                formData.append("_method", "POST");

                store
                    .dispatch("cart/update", {
                        cartId: itemId,
                        payload: formData,
                    })
                    .then(() => {
                        //redirect ke dashboard
                        // router.push({ name: "pos" });
                        store.dispatch('cart/cartCount')  // <-- untuk memanggil action "cartCount" di module "cart"
                        store.dispatch('cart/cartTotal')  // <-- untuk memanggil action "cartTotal" di module "cart"
                        store.dispatch('cart/cartWeight')


                        // toast.success("Tambah produk ke keranjang berhasil")
                    })
                    .catch((error) => {
                        //show validaation message
                        console.log(error);


                    });
            }



        };

        // Fungsi untuk mengurangkan kuantitas
        const KuranginQty = (itemId) => {

            const cartItem = carts.value.find(item => item.id === itemId);
            if (cartItem && cartItem.quantity > 1) {
                cartItem.quantity -= 1;
                const price = cartItem.quantity * (cartItem.product.price - (cartItem.product.price * (cartItem.product.discount) / 100));
                const weight = cartItem.quantity * cartItem.product.weight;

                let formData = new FormData();
                formData.append('quantity', cartItem.quantity)
                formData.append('price', price)
                formData.append('weight', weight)

                formData.append("_method", "POST");

                store
                    .dispatch("cart/update", {
                        cartId: itemId,
                        payload: formData,
                    })
                    .then(() => {
                        //redirect ke dashboard
                        // router.push({ name: "pos" });
                        store.dispatch('cart/cartCount')  // <-- untuk memanggil action "cartCount" di module "cart"
                        store.dispatch('cart/cartTotal')  // <-- untuk memanggil action "cartTotal" di module "cart"
                        store.dispatch('cart/cartWeight')


                        // toast.success("Tambah data berhasil")
                    })
                    .catch((error) => {
                        //show validaation message
                        console.log(error);


                    });
            } else if (cartItem && cartItem.quantity === 1) {
                // Kuantitas mencapai 0, konfirmasi penghapusan
                confirmDelete(itemId);
            }
        };



        function addToCart(product_id, price, weight) {

            //check token terlebih dahulu
            const token = store.state.auth.token

            if (!token) {
                return router.push({ name: 'login' })
            }

            //panggil action addToCart di module cart
            store.dispatch('cart/addToCart', {
                product_id: product_id,
                price: price,
                weight: weight,
                quantity: 1
            }).then(() => {
                //redirect ke dashboard
                router.push({ name: "order" });
                // router.push({ name: "cart" });
                store.dispatch('cart/cartCount')  // <-- untuk memanggil action "cartCount" di module "cart"
                store.dispatch('cart/cartTotal')  // <-- untuk memanggil action "cartTotal" di module "cart"
                store.dispatch('cart/cartWeight')


                // toast.success("Produk berhasil ditambahkan")
            })
                .catch((error) => {
                    //show validaation message
                    console.log(error);


                });

        }

        return {
            store,
            products,
            addToCart,
            carts,              // <-- state carts
            cartTotal,          // <-- state cartTotal
            cartWeight,
            confirmDelete,
            TambahQty,
            KuranginQty,
            nextExists,     // <-- return nextExists,
            nextPage,       // <-- return nextPage
            loadMore,
            state,
            checkout,
            data,
            searchData
        }

    }

}
</script>