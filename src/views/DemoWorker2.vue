<template>
  <div>
    <div style="width: 100vw; height: 20px; position: relative">
      <div
        style="width: 10px; height: 10px; background: #666"
        class="move"
      ></div>
    </div>
    目标md5:<input v-model="targetMd5" style="width: 300px; margin-bottom: 50px;">
    <div>
      <button @click="normal">
        没有优化的计算md5
      </button>
      <button @click="inWorker">
        优化的计算md5
      </button>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from '@vue/composition-api'
import { useWorkerFunction } from 'ahooks-vue';
// import SparkMD5 from 'spark-md5'

export default {
  name: 'DemoWorker2',
  data () {
    return {

    }
  },
  methods: {
  },
  mounted () {
    // console.log(SparkMD5.hash('1'))
  },
  setup () {
    const count = ref(0)
    const targetDistance = 100000000
    const targetMd5 = ref(SparkMD5.hash((100000000-1).toString())) //  9999999

    const calc = (begin=0, length=targetDistance, targetMd5) => {
      for(let i=begin;i<length;i++) {
        if(SparkMD5.hash(i.toString()) === targetMd5) {
          console.log('find')
          return i
        }
      }
      console.log('end')
      return null
    }

    const normal = () => {
      console.time()
      alert(calc(0, targetDistance, targetMd5.value))
      console.timeEnd()
    }

    const { callWokerFn: callWokerFn2, status: status2 } = useWorkerFunction(calc, {autoTerminate: false, remoteDependencies:['https://cdn.jsdelivr.net/npm/spark-md5@3.0.2/spark-md5.min.js']});
    const { callWokerFn: callWokerFn3, status: status3 } = useWorkerFunction(calc, {autoTerminate: false, remoteDependencies:['https://cdn.jsdelivr.net/npm/spark-md5@3.0.2/spark-md5.min.js']});
    const { callWokerFn: callWokerFn4, status: status4 } = useWorkerFunction(calc, {autoTerminate: false, remoteDependencies:['https://cdn.jsdelivr.net/npm/spark-md5@3.0.2/spark-md5.min.js']});

    const inWorker = () => {
      console.time()
      const maxCount = 8
      for(let i=0;i<maxCount;i++) {
      const { callWokerFn: callWokerFn1, status: status1 } = useWorkerFunction(calc, {autoTerminate: false, remoteDependencies:['https://cdn.jsdelivr.net/npm/spark-md5@3.0.2/spark-md5.min.js']});
        callWokerFn1(targetDistance / maxCount * i, targetDistance / maxCount * (i + 1), targetMd5.value).then(res=>{
          if(res) {
            alert(res)
            console.timeEnd()
          }
        })
      }
    }

    return {
      inWorker,
      count,
      calc,
      normal,
      targetMd5
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
