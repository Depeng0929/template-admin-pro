<script setup lang="ts">
import lottie from 'lottie-web'

onMounted(() => {
  const element = document.querySelector('#lottie')!
  lottie.loadAnimation({
    container: element, // the dom element that will contain the animation
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: '/login.json', // the path to the animation json
  })
})
</script>

<template>
  <div id="lottie" />
</template>
