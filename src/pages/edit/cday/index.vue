<template>
  <div class="contain">
    <ul class="log-list">
      <li v-for="(item,index) in dayData" :key="index" :style="'background:' + item.color">
        <h1>{{item.time}}</h1>
        <h1>{{item.text}}</h1>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dayData: [],
      color:[0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f']
    }
  },
  mounted(){
    let that = this
    const db = wx.cloud.database()
    db.collection('dayList').get({
      success(res) {
          let colorString = []
          for(let i=0;i<res.data.length;i++){
            var isStr = '#'
            for(let j=0;j<6;j++){
              let z = Math.round( Math.random()*15 );
              isStr += that.color[z]
            }
            colorString.push(isStr);
        }
        res.data.map(function(item,index){
          item['color'] = colorString[index]
        })
        // res.data 包含该记录的数据
        that.dayData = res.data  
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
    justify-content: flex-start;
    li{
      width: 670rpx;
      height: 100rpx;
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
        color: #fff;
        border-radius: 15rpx;
        padding: 10rpx;
        box-shadow: 0 5rpx 5rpx 5rpx #000;
      }
    }
  }
}

</style>
