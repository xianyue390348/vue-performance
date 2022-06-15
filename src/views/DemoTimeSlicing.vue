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
        时间切片优化的耗时任务
      </button>
    </div>
  </div>
</template>

<script>
import { ref, reactive, getCurrentInstance } from '@vue/composition-api'
import { useWorkerFunction } from 'ahooks-vue';
import md5 from 'md5'
import { JobQueue, splitArray } from '@/utils'

export default {
  name: 'DemoTimeSlicing',
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

    const { proxy, ctx } = getCurrentInstance()

    const inWorker = () => {
      const queue = new JobQueue()
      const size = 0xffffff
      for(let i=0;i<0x2fffffff / size;i++) {
        const start = i * size
        const end = (i + 1) * size
        queue.addJob(done => {
          // 分时间片提交数据
          requestAnimationFrame(() => {
            let tmp =  0
            for(let i=start;i<end;i++) {
              tmp = i
            }
            count.value = tmp
            console.log(count)
            done()
          })
        })
      }
      queue.start()
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
