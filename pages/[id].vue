<template>
  <div v-auto-animate>    
    <div class="flex align-items-center justify-content-around flex-column " style="height: 100dvh;font-family: var(--font);">
      <div></div>
      <img src="/imgs/logo.png">
      <div class="text-4xl px-8 text-justify" id="type">
        {{ text }}
      </div>
      <div></div>
      <div>${{ $t('footer') }}</div>
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