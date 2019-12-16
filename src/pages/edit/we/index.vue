<template>
  <div class="contain">
    <ul class="log-list">
      <li v-for="(item,index) in usData" :key="index">
        <img :src="item.src" v-if="item.sort == 'img'" @click="previewImg(index)">
        <video :src="item.src" v-if="item.sort == 'video'"></video>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      usData: []
    }
  },
  mounted(){
    let that = this
    const db = wx.cloud.database()
    db.collection('usList').get({
      success(res) {
        // res.data 包含该记录的数据
        that.usData = res.data  
      }
    })
  },
  methods:{
    previewImg(index){
      let This = this;
      let arr = []
      arr.push(This.usData[index].src)
      wx.previewImage({
          current:This.usData[index].src,
          urls:arr
      });
    },
  }
}
</script>

<style scoped lang="less">
.contain{
  position: absolute;
  width: 100%;
  height: 90%;
  top: 10%;
  .log-list {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: flex-start;
    li{
      width: 670rpx;
      height: 300rpx;
      margin-bottom: 20rpx;
      border-radius: 20rpx;
      box-shadow: 0 10rpx  10rpx 10rpx rgb(75, 72, 72);
      display: flex;
      align-items: center;
      justify-content: center;
      img{
        position: absolute;
        left: 40rpx;
        width:670rpx;
        height: 300rpx;
        border-radius: 20rpx;
      }
      video{
        width:670rpx;
        height: 300rpx;
        border-radius: 20rpx;
      }
      h1{
        font-weight: bold;
        font-size: 40rpx;
        opacity: 1;
        color: #000;
        border-radius: 15rpx;
        padding: 10rpx;
        box-shadow: 0 5rpx 5rpx 5rpx #000;
      }
    }
  }
}

</style>
