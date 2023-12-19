<template>
  <div v-auto-animate>    
  <div class="grid grid-nogutter" style="height: 100dvh;font-family: var(--font);" >
        <div class="col-6 bg-center bg-no-repeat bg-black "
          style="background-image: url('/imgs/santa.jpeg');background-color: black;background-size: 100% auto;"></div>
        <div class="col flex align-items-center justify-content-around flex-column ">
          <div></div>
          <img src="/imgs/logo.png">

          <div class="px-4">
            <div class="text-4xl text-red-500 text-justify" >{{ text }}</div>
          </div>
     
          <div class="px-6 text-xs hidePrint" style="font-family: Arial, Helvetica, sans-serif;" >
            <div >
              {{ $t('footer') }}
            </div>
          </div>
        </div>
      </div>

  </div>
</template>
<script lang="ts">
import { ofetch } from 'ofetch';

//@ts-nocheck

export default {
  data() {
    return {
      uid:null,
      text:''
    }
  },

  methods: {

  },
  async mounted() {
    
    var {response} = await ofetch('/api/message?uid='+this.$route.params.id)
    this.text = response
  },
  unmounted() {
  },
  setup() {

  },

}
</script>
<style>
:root {
  /* --font:'Great Vibes'; */
  --font: 'Dancing Script';
}

button {
  font-family: var(--font);
  border: 0;
  padding: 3rem;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  cursor: pointer;
  font-size: 2rem;
  font-weight: 500;
  color: white;
  background-color: #eb5445;
}

body,
html {
  margin: 0;
  height: 100%;
}
</style>