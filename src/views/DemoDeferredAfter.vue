<template>
  <div>
    <div>DemoDeferredAfter</div>
    <div>这里是一些其他不受影响的东西</div>
    <div v-if="defer(2)" >
      计算结果：{{ calc() }}
    </div>
    <div v-if="defer(3)" >
      计算结果2：{{ calc() }}
    </div>
  </div>
</template>

<script>
import { ref, reactive } from '@vue/composition-api'
import { useWorkerFunction } from 'ahooks-vue';
import md5 from 'md5'
import Defer from '../mixins/DeferMixins'

export default {
  name: 'DemoDeferredAfter',
  mixins: [
    Defer(),
  ],
  data () {
    return {
    }
  },
  methods: {
  },
  mounted () {
    console.log(md5('123'))
  },
  setup () {
    const calc = () => {
      let count =  0
      for(let i=0;i<0x5fffffff;i++) {
        count = i
      }
      return count
    }

    return {
      calc,
    }
  }
}
</script>

<style>
.move {
  position: absolute;
  animation: move 4s infinite linear;
  left: 0;
}

@keyframes move {
  0% {
    left: 0px;
  }
  50% {
    left: 100vw;
  }
  0% {
    left: 0px;
  }
}
</style>
