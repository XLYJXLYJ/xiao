<template>
  <div class="contain">
      <div class="middle-contain">
        <ul>
            <li v-for="(item,index) in videoData" :key='index'>
                <video :src="item.src"></video>
            </li>
        </ul>
      </div>
  </div>
</template>

<script>


export default {
  data () {
    return {
      videoData:[]
    }
  },
created(){
  let that = this
},
mounted() {
  let that = this
    wx.cloud.init({
      traceUser: true
    })
    wx.cloud.callFunction({
      name: 'video',
      complete: res => {
        that.videoData = JSON.parse(JSON.stringify(res.result.data))   
      }
    });
  },
  components: {

  },

  methods: {

  },

  created () {
    // let app = getApp()
  }
}
</script>

<style scoped lang="less">
.contain{
  width: 100%;
  .middle-contain{
    position: relative;
    width: 750rpx;
    height: auto;
    ul{
      position: absolute;
      width: 750rpx;
      height: 100%;
      li{
        width:100%;
        box-shadow: 0 0 10px #000;
        position: relative;
        video{
          width: 750rpx;
        }
      }
    }
  }
}
</style>