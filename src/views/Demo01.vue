<template>
  <div class="home">
    console
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Demo01',
  data() {
    return {
      testVar: '单身狗'
    }
  },
  components: {
    HelloWorld
  },
  mounted() {
    let testvar = null

    console.time()
    for (let i = 0; i < 0xfffffff; i++) {
      testvar = this.testVar
    }
    console.timeEnd()

    console.time()
    const a = this.testVar
    for (let i = 0; i < 0xfffffff; i++) {
      testvar = a
    }
    console.timeEnd()
  }
}
</script>
