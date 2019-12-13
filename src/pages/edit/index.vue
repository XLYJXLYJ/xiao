<template>
  <div class="contain">
    <ul class="log-list">
      <li v-for="(item,index) in imgData" :key="index">
        <h1>{{item.text}}</h1>
        <img :src="item.src">
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      imgData: []
    }
  },
  mounted(){
    let that = this
    const db = wx.cloud.database()
    db.collection('emailList').get({
      success(res) {
        // res.data 包含该记录的数据
        that.imgData = res.data  
      }
    })
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
    justify-content: space-around;
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
        opacity: 0.7;
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
