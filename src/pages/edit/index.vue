<template>
  <div class="contain">
    <ul class="log-list">
      <li v-for="(item,index) in imgData" :key="index" @click="gowhere(item.load)">
        <button open-type="getUserInfo" @getuserinfo="go">
          <img :src="item.src">
          {{item.text}}
        </button>
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
  created(){
    let that = this
    const db = wx.cloud.database()
    db.collection('emailList').get({
      success(res) {
        // res.data 包含该记录的数据
        that.imgData = res.data  
      }
    })
  },
  methods:{
    gowhere(src){
      wx.getStorage({
        key: 'openid',
        success (res) {
          console.log(res)
          if( res.data == 'opnYe0S8F_OXJ3UJi2r4VZOHObkU' || res.data == 'opnYe0bLvTrgICjmWG4ZqRyaMx10'){
            wx.navigateTo({
              url: src
            })
          }else{
            wx.showModal({
              title: '提示',
              content: '抱歉，该模块比较隐私，作者尚未对外开放',
              success (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
            return;

          }
        }
      })
    },
    go(e){
      console.log(e.mp.detail.signature)
    }
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
    // display: flex;
    // flex-direction: column;
    width: 100%;
    height: 100%;
    // align-items: center;
    // justify-content: space-around;

      li{
        width: 670rpx;
        height: 300rpx;

        border-radius: 20rpx;
        box-shadow: 0 10rpx  10rpx 10rpx rgb(75, 72, 72);
        border-radius: 20rpx;
        margin:0 auto;
        margin-bottom: 20rpx;
        // display: flex;
        // align-items: center;
        // justify-content: center;

        button{
          border:none;
          outline: none;
          width: 670rpx;
          height: 300rpx;
          position: relative;
          color: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 20rpx;
          img{
            position: absolute;
            width:670rpx;
            height: 300rpx;
            border-radius: 20rpx;
            opacity: 0.7;
            left: 0;
          }
          h1{
            font-weight: bold;
            font-size: 40rpx;
            opacity: 1; 
            color: #000;
            border-radius: 15rpx;
            padding: 10rpx;
            box-shadow: 0 5rpx 5rpx 5rpx #000;
            position: absolute;
          }
        }

      }

  }
}

</style>
