<template>
    <header class="bg-white shadow-lg text-white p-4 sticky top-0 flex gap-x-2">
        <router-link :to="{name:'home'}" class="text-gray-500 ">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="22" viewBox="0 0 16 9"><path fill="gray" d="M12.5 5h-9c-.28 0-.5-.22-.5-.5s.22-.5.5-.5h9c.28 0 .5.22.5.5s-.22.5-.5.5"/><path fill="black" d="M6 8.5a.47.47 0 0 1-.35-.15l-3.5-3.5c-.2-.2-.2-.51 0-.71L5.65.65c.2-.2.51-.2.71 0c.2.2.2.51 0 .71L3.21 4.51l3.15 3.15c.2.2.2.51 0 .71c-.1.1-.23.15-.35.15Z"/></svg>
        </router-link>
        <p class="text-gray-500 text-sm">Keranjang Belanja</p>
    </header>
    <div class="pb-20" v-if="cartTotal != 0">
        <div class="block md:hidden lg:hidden px-5 " v-for="cart in carts" :key="cart.id">
            <div class="shadow-lg border-1 p-5 flex gap-x-3 my-3">
                <div class="flex items-center">
                    <img :src="cart.product.image" class="w-16 h-16 rounded-lg border-r-2">
                </div>
    
                <div class="flex flex-col  w-full">
                    <p class="capitalize text-sm text-gray-500 font-semibold">
                        {{ cart.product.title }}
                    </p>
                    <div class="flex justify-between items-center">
                        <div class="text-sm font-semibold">
                            Rp {{ moneyFormat((cart.product.price - (cart.product.price
                                * (cart.product.discount) / 100)) * cart.quantity) }}
                        </div>
                        <input v-model="cart.quantity" type="number" min="0" @input="updateDataQty(cart.id, $event)"
                        class="appearance-none text-gray-500 text-center justify-center max-w-[70px] py-2 ps-2 text-sm  max-h-8 border-2 border-gray-300 rounded">
                    </div>
                </div>
    
            </div>
          
        </div>
    </div>
    <div class="flex flex-col gap-y-5 justify-center items-center text-center h-full mx-5" v-else>
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 16 16"><path fill="orange" fill-rule="evenodd" d="m7.493.015l-.386.04c-1.873.187-3.76 1.153-5.036 2.579C.66 4.211-.057 6.168.009 8.253c.115 3.601 2.59 6.65 6.101 7.518a8.034 8.034 0 0 0 6.117-.98a8 8 0 0 0 3.544-4.904c.172-.701.212-1.058.212-1.887s-.04-1.186-.212-1.887C14.979 2.878 12.315.498 9 .064C8.716.027 7.683-.006 7.493.015m1.36 1.548a6.34 6.34 0 0 1 1.987.597c.698.34 1.18.686 1.747 1.253A5.956 5.956 0 0 1 13.84 5.16c.445.915.646 1.798.646 2.84a6.188 6.188 0 0 1-.66 2.867c-.172.351-.519.914-.681 1.105l-.055.065l-4.563-4.564L3.963 2.91l.065-.055c.191-.162.754-.509 1.105-.681a6.436 6.436 0 0 1 3.72-.611M7.48 8.534l4.56 4.561l-.067.053a7.66 7.66 0 0 1-1.106.68a6.76 6.76 0 0 1-1.987.616c-.424.065-1.336.065-1.76 0c-1.948-.296-3.592-1.359-4.627-2.993a7.502 7.502 0 0 1-.634-1.332a6.62 6.62 0 0 1-.189-3.584a6.767 6.767 0 0 1 1.096-2.388c.07-.095.133-.173.141-.173c.007 0 2.065 2.052 4.573 4.56"/></svg>
        <p class="text-sm text-gray-500 mb-40">Mohon maaf belum ada produk dikeranjang</p>
    </div>
    <div v-if="cartTotal != 0" class="flex fixed inset-x-0 bottom-0 z-10 mx-5 gap-x-3">
        <router-link :to="{name:'order'}" class="bg-white border-[1px] border-orange-500 text-center w-full p-3 shadow-md  rounded-lg mb-5  gap-x-3 cursor-pointer">
            <p class=" font-semibold text-sm text-orange-500">Order Yang Lain</p>
           
        </router-link>

            <div  @click.prevent="checkout" class="cursor-pointer bg-orange-500 text-center w-full p-3 shadow-md  rounded-lg mb-5 flex items-center justify-between gap-x-3">
                <p class="text-white font-semibold text-sm">Bayar</p>
                <p class="text-white font-semibold text-sm">Rp {{ moneyFormat((cartTotal)) }}</p>
                </div>
    </div>

    <div class="block md:hidden lg:hidden" v-else>
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

            await store.dispatch("product/getProducts", { search: pencarian })
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

       

        const updateDataQty = (cartId, event) => {
            console.log('Value:', event.target.value);
            // console.log('Cart ID:', cartId);
            // const qty = e.target.value;
            const cartItem = carts.value.find(item => item.id === cartId);
            const val = event.target.value;
            if (val >= 1) {
                const price = val * (cartItem.product.price - (cartItem.product.price * (cartItem.product.discount) / 100));
                const weight = val * cartItem.product.weight;

                let formData = new FormData();
                formData.append('quantity', val)
                formData.append('price', price)
                formData.append('weight', weight)

                formData.append("_method", "POST");

                store
                    .dispatch("cart/update", {
                        cartId: cartId,
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
            }else if (val < 1) {
                // alert(cartId)
                confirmDelete(cartId);
            }
          
        }


        const TambahQty = (itemId) => {
            const cartItem = carts.value.find(item => item.id === itemId);

            cartItem.quantity = parseInt(cartItem.quantity, 10);
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
            cartItem.quantity = parseInt(cartItem.quantity, 10);
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
            searchData,
            updateDataQty
        }

    }

}
</script>