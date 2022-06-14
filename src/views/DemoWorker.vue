<template>
  <div>
    <div style="width: 100vw; height: 20px; position: relative">
      <div
        style="width: 10px; height: 10px; background: #666"
        class="move"
      ></div>
    </div>
    <div>DemoWorker</div>
    {{ count }}
    <div>
      <button @click="normal">
        没有优化的耗时任务
      </button>
      <button @click="inWorker">
        优化的耗时任务
      </button>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from '@vue/composition-api'
import { useWorkerFunction } from 'ahooks-vue';
import md5 from 'md5'

export default {
  name: 'DemoWorker',
  data () {
    return {
    }
  },
  methods: {
  },
  mounted () {
    // console.log(md5('123'))
  },
  setup () {
    const count = ref(0)

    const calc = () => {
      let count =  0
      for(let i=0;i<0x2fffffff;i++) {
        count = i
      }
      return count
    }

    const normal = () => {
      count.value = calc()
    }

    const { callWokerFn, status } = useWorkerFunction(calc, {autoTerminate: false});

    const inWorker = () => {
      count.value = 0
      callWokerFn().then(res=>{
        count.value = res
      })
    }

    return {
      inWorker,
      count,
      calc,
      normal
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
