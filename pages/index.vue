<template>
  <div>

    <div class="fixed hidePrint" v-auto-animate style="right:1rem;top:1rem;z-index: 99;">
      <select v-model="language" class="p-1">
        <option v-for="(language, i) in languages" :value="language">{{ languages_icons[i] }} {{ language }}</option>
      </select>
    </div>
    <div class="grid grid-nogutter" style="height: 100dvh;font-family: var(--font);" >
      <div class="col-6 bg-center bg-no-repeat bg-black "
        style="background-image: url('/imgs/santa.jpeg');background-color: black;background-size: 100% auto;"></div>
      <div class="col flex align-items-center justify-content-around flex-column ">
        <div></div>
        <img src="/imgs/logo.png">

        <div class="px-4">
          <div class="text-4xl text-red-500 text-justify" id="type"></div>
        </div>
        <button class="button border-round-3xl hidePrint" type="button" @click="generate()" v-if="!is_generated">{{
          $t('generate_evowish')
        }}</button>
        <button class="button border-round-3xl hidePrint" type="button" @click="share()" v-if="is_generated && is_done">{{
          $t('share')
        }}</button>
        <div class="px-6 text-xs hidePrint" style="font-family: Arial, Helvetica, sans-serif;" >
          <div v-if="is_generated">
            {{ $t('footer') }}
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script lang="ts">
//@ts-nocheck
import theaterJS from 'theaterjs'
import { ofetch, FetchError } from "ofetch"
import 'share-api-polyfill'

export default {
  data() {
    return {
      languages_icons: ['🇺🇸', '🇩🇪', '🇧🇷'],
      languages: ['en', 'de', 'pt'],
      language: 'en',
      theaterjs: null,
      message: '',
      old_message: '',
      interval: null,
      is_generated: false,
      is_done: false,
      uid: null,
    }
  },
  watch: {
    async language() {
      this.$i18n.locale = this.language
      if (this.is_generated)
        await this.generate()
      this.old_message = null
    }
  },
  methods: {
    async generate() {
      try {
        this.is_generated = true
        this.message = 'loading'
        var { response, id } = await ofetch('/api/generate?language=' + this.language)
        this.message = response
        this.uid = id
        this.is_done = true
      } catch (error) {
        this.is_done = false
        if (error instanceof FetchError)
          console.error(error.data.error)
        this.message = 'error'
      }
    },
    async share() {
      navigator.share({
        title: 'EvoWish',
        text: this.message,
        url: location.href + this.uid,
      })
    }
  },
  mounted() {
    this.type = theaterJS({
      minSpeed: {
        erase: 10,
        type: 30
      }
    })
    this.type.addActor('type', {
      accuracy: 1,
      speed: 0.95
    })
    this.message = 'your_evowish_will_apper_here'
    this.interval = setInterval(() => {
      if (this.old_message == this.message) return
      var v1 = this.$t(this.message)
      this.old_message = this.message
      this.type.addScene("type:" + v1)
    }, 100)
  },
  unmounted() {
    clearInterval(this.interval)
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

.button {
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

@media print {
  @page {
    margin: 0;
  }

  body {
    margin: 1.6cm;
  }

  .hidePrint {
    display: none;
    opacity: 0;
  }
}
</style>