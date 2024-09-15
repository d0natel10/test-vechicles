<template>
  <div class="flex justify-start h-screen">
    <div class="leftSide">
      <div class="header">
          <h1 class="header-h">{{$t('title')}}</h1>
            <div class="mt-11 flex flex-col items-left pt-7">
              <div @click="CurrentMenuState('profile')" :class="{ borderClick: setMenu === 'profile', active: setMenu === 'profile' }" class="flex justify-start mb-7 gap-5 cursor-pointer pl-7">
                <img class="menu-icon" src="/public/user.svg" alt="user">
                <p :class="{menuTitle: setMenu === 'profile' }" class="menu-title">{{$t('menu.profile')}}</p>
              </div>
              <div @click="CurrentMenuState('vechicles')" :class="{ borderClick: setMenu === 'vechicles', active: setMenu === 'vechicles' }" class="flex justify-start mb-7 gap-5 cursor-pointer pl-7">
                <img class="menu-icon" src="/public/rim.svg" alt="rim">
                <p :class="{menuTitle: setMenu === 'vechicles' }" class="menu-title">{{$t('menu.vechicles')}}</p>
              </div>
              <div @click="CurrentMenuState('settings')" :class="{ borderClick: setMenu === 'settings', active: setMenu === 'settings' }" class="flex justify-start gap-5 cursor-pointer pl-7">
                <img class="menu-icon" src="/public/settings.svg" alt="settings">
                <p :class="{menuTitle: setMenu === 'settings' }" class="menu-title">{{$t('menu.settings')}}</p>
              </div>
            <img class="Vector-img" src="/public/Vector.svg">
          </div>
        </div>
      </div>
      <div class="rightPart flex-1 overflow-auto flex flex-col h-screen">
      <div class="flex justify-between mt-9 ml-7">
        <div class="flex justify-between gap-5 items-center">
          <h1 class="text-3xl font-sans font-bold">{{$t('PageTitle')}}</h1>
          <p class="pages-head border rounded-l text-center">{{sizeItems.total}}</p> 
        </div>
        <div class="flex items-center gap-3 mr-24">
          <div class="flex gap-11">
            <img class="img-add-button cursor-pointer hover:shadow-lg transition" src="/public/button-plus.svg" alt="button plus">
            <img class="" src="/public/Photo.svg" alt="user Photo">
          </div>
          <p class="userName">John</p>
        <div class="flex ml-7 gap-2">
          <img v-if="locale === 'en'" src="/public/uk.png" alt="uk">
          <img v-if="locale === 'us'" src="/public/usa.png" alt="uk">
          <img v-if="locale === 'de'" src="/public/germany.png" alt="uk">
          <img v-if="locale === 'pt'" src="/public/portugal.png" alt="uk">
          <select @change="OnChangeLang" class="border-none rounded-lg border-gray-200 focus:outline-none focus:border-gray-400">
            <option value="en"> En</option>
            <option value="us"> Us</option>
            <option value="de"> De</option>
            <option value="pt"> Pt</option>
          </select>
        </div>
        </div>
      </div>
      <div class="border border-slate-200 mt-7"></div>
      <div class="flex items-center justify-start relative">
        <input v-model="searchVin" type="text" class="search-input border rounded-lg pl-10 border-gray-200 focus:outline-none focus:border-gray-400" maxlength="17" :placeholder="$t('placeholder')">
        <img class="img-search absolute mt-7" src="/public/search.svg" alt="search pic">
      <div class="flex ml-7 mt-7 gap-3 items-center">
        <p>{{$t('SelectPP')}}</p>
        <select @change="OnChangePerPage" value="9" class="select px-3 border border-slate-300 focus:border-gray-400 rounded-md">
          <option value="6">6</option>
          <option value="9">9</option>
          <option value="12">12</option>
        </select>
        <button v-if="locale === 'de' || locale === 'pt'" class="button-add-vech-de-pt flex items-center py-4 px-4 gap-3.5 hover:shadow-xl transiton ">
            <img class="w-6 h-6" src="/public/plus.svg" alt="plus">{{$t('buttonAdd')}}
        </button>
        <button v-else class="button-add-vech flex items-center py-4 px-4 gap-3.5 hover:shadow-xl transiton">
          <img class="w-6 h-6" src="/public/plus.svg" alt="plus">{{$t('buttonAdd')}}
        </button>
      </div>
      </div>
      <div class="grid grid-cols-3 gap-2 mr-24 mb-7">
      <div v-for="car in cars" :key="car.id" class="cards py-10 relative hover:shadow-xl transition">
        <img class="w-6 h-6 absolute top-5 right-5 mb-5 cursor-pointer" src="/public/more_horizontal.svg" alt="options">
        <img class="w-64 h-32 ml-12" :src="car.photo ? car.photo : '/public/placeholder-image.jpg'" alt="vehicle picture">
        <h1 class="Card-title ml-6 mt-6">{{ car.vehicle_name ? car.vehicle_name : "tut bil null("}}</h1>
        <p class="Card-VIN ml-6 mt-3">{{ car.vin }}</p>
        <div class="flex justify-center ">
          <div class="border border-slate-200 mt-3 w-10/12"></div>
        </div>
        <div class="flex justify-between items-center mt-5">
          <p class="card-drob ml-6">17/30</p>
          <p class="card-days mr-7">{{ car.uploads }} {{ $t('CardDays') }}</p>
        </div>
      </div>
    </div>
    <div class="footer flex justify-between items-center mt-auto mb-8">
        <p class="footer-showing ml-7">{{$t('footer.footerShowing')}} {{sizeItems.to}} {{$t('footer.footerOutOf')}} {{sizeItems.total}}</p>
          <div class="flex gap-3 mr-20 items-center">
            <img v-if="page === 1" @click="prevPage" class="w-6 h-6 cursor-pointer opacity-30" src="/public/chevron.svg" alt="back-arrow">
            <img v-else @click="prevPage" class="w-6 h-6 cursor-pointer" src="/public/chevron.svg" alt="back-arrow">
              <div class="flex gap-3 items-center">
              <p class="footer-showing border w-8 h-8 rounded-lg text-center pt-1">{{ sizeItems.current_page }}</p>
              <span class="footer-text-page">{{$t('OfPages')}}</span>
            <p class="footer-pages border w-8 h-8 rounded-lg text-center pt-1">{{ sizeItems.last_page }}</p>
          </div>
          <img v-if="page === sizeItems.last_page" @click="prevPage" class=" rotate-180 w-6 h-6 cursor-pointer opacity-30" src="/public/chevron.svg" alt="next-arrow">
        <img v-else @click="nextPage" class="rotate-180 w-6 h-6 cursor-pointer" src="/public/chevron.svg" alt="next-arrow">
      </div>
    </div>
    </div>
  </div>
</template>

<script setup>
  import {useI18n} from 'vue-i18n'
  import {ref, onMounted, watch } from 'vue'
  import axios from 'axios'

  const { t, locale } = useI18n({useScope: 'global'})
  const setMenu = ref('vechicles');
  const cars = ref([]);
  const sizeItems = ref([]);
  const perPage = ref(9);
  const searchVin = ref('');
  const page = ref(1);

  function nextPage() {
    if (page.value < sizeItems.value.last_page){
      page.value++;
      fetchCars();
    }
  }

  function prevPage(){
    if (page.value > 1){
      page.value--;
      fetchCars();
    }
  }

  const CurrentMenuState = (state) => {
    setMenu.value = state;
  }
  
  const OnChangeLang = (event) => {
    locale.value = event.target.value;
    localStorage.setItem('lang', locale.value);
  }

  const OnChangePerPage = (event) => {
    perPage.value = event.target.value; 
    fetchCars();
  }
  
  async function fetchCars() {
    try {
      const response = await axios.get('https://api.caiman-app.de/api/cars-test', {
        params: {
          search: searchVin.value,
          per_page: perPage.value,
          page: page.value
        }
      });
      console.log(response.data);

      const carsData = response.data.data.map(car => {
        if (car.photo) {
          return {
            id: car.id,
            vehicle_name: car.vehicle_name,
            vin: car.vin,
            photo: car.photo.processed_url,
            uploads: car.uploads
          };
        } else {
          return {
            id: car.id,
            vehicle_name: car.vehicle_name,
            vin: car.vin,
            photo: null,
            uploads: car.uploads
          };
        }
      });

      const carsItemsPageInfo = response.data.meta;
      cars.value = carsData;
      sizeItems.value = carsItemsPageInfo;
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  }

  watch(searchVin, (newValue) => {
  page.value = 1;
  fetchCars();
});
  onMounted(fetchCars);
</script>