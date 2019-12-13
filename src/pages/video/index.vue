<template>
  <div class="contain">
      <div class="middle-contain">
        <video :src="src" enable-danmu :danmu-list="sayList"></video>
        <div class="button">
          <img @click="goBack()" src="/static/images/go.png" alt="">
          <img @click="goNext()" src="/static/images/back.png" alt="">
        </div>

        <div class="sent">
          <input type="text" v-model="whatSay">
          <button class="lovebutton" @click="sentLove()">送上祝福</button>
        </div>
      </div>

      <div class="greet">
        <scroll-view scroll-y class="box">
          <div class="item" v-for="(item, index) in userList" :key="index">
            <image :src="item.user.avatarUrl"/>
            <p>{{item.user.nickName}}</p>
          </div>
        </scroll-view>
        <p class="count">已收到{{userList.length}}位好友送来的祝福</p>
        <div class="bottom">
          <button class="left" lang="zh_CN" open-type="getUserInfo" @getuserinfo="sendGreet">点赞</button>
          <button class="right" open-type="share">分享</button> 
        </div>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      videoData:[],
      src:'',
      indexSrc:0,
      sayList:[],
      userList: [],
      openId: '',
      userInfo: '',
      whatSay:''
    }
  },
  created(){
    let that = this
  },
  mounted() {
    let that = this

    that.getUserList()

    wx.cloud.init({
      traceUser: true
    })
    wx.cloud.callFunction({
      name: 'video',
      complete: res => {
        that.videoData = JSON.parse(JSON.stringify(res.result.data))   
        that.src = that.videoData[0].src
      }
    });

    wx.cloud.callFunction({
      name: 'say',
      complete: res => {
        console.log(res)
        let arr = res.result.data
        for(let i=0;i<arr.length;i++){
          console.log(arr[i])
          that.sayList.push(arr[i])
        }
        console.log(that.sayList)
      }
    });
  },
  components: {

  },
  methods: {
    sentLove(){
      const that = this
      that.sayList.push({
        text: that.whatSay,
        color:'#fff',
        time:10
      })
      const db = wx.cloud.database()
      const user = db.collection('sayList')
      user.add({
        data: {
          text: that.whatSay,
          color:'#fff',
          time:3
        }
      }).then(res => {
        // that.getUserList()
      })
    },
    sendGreet (e) {
      const that = this
      console.log(e)
      if (e.target.errMsg === 'getUserInfo:ok') {
        wx.getUserInfo({
          success: function (res) {
            console.log(res)
            that.userInfo = res.userInfo
            that.getOpenId()
          }
        })
      }
    },

    addUser () {
      const that = this
      const db = wx.cloud.database()
      const user = db.collection('user')
      user.add({
        data: {
          user: that.userInfo
        }
      }).then(res => {
        that.getUserList()
      })
    },

    getOpenId () {
      const that = this
      wx.cloud.callFunction({
        name: 'user',
        data: {}
      }).then(res => {
        console.log(res)
        that.openId = res.result.openid
        that.getIsExist()
      })
    },

    getIsExist () {
      const that = this
      const db = wx.cloud.database()
      const user = db.collection('user')
      user.where({
        _openid: that.openId
      }).get().then(res => {
        if (res.data.length === 0) {
          that.addUser()
        } else {
          tools.showToast('您已经送过祝福了~')
        }
      })
    },

    getUserList () {
      const that = this
      wx.cloud.callFunction({
        name: 'userList',
        data: {}
      }).then(res => {
        that.userList = res.result.data.reverse()
      })
    },

    goBack(){
      if(this.indexSrc == -1 || this.indexSrc == 0){
        this.indexSrc = this.videoData.length - 1
      }
      this.src = this.videoData[this.indexSrc].src
      this.indexSrc = this.indexSrc - 1
    },
    goNext(){
      if(this.indexSrc == this.videoData.length){
        this.indexSrc = 0
      }
      if(this.indexSrc == 0){
        this.indexSrc = this.indexSrc + 1
      }
      this.src = this.videoData[this.indexSrc].src
      this.indexSrc = this.indexSrc + 1
    }
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
    video {
      width: 750rpx;
      height: 400rpx;
      margin-top: 150rpx;
    }
    .button{
      display: flex;
      justify-content: space-around;
      background: #000;
      margin-top: -14rpx;
      z-index: 999;
      img{
        width: 100rpx;
        height: 100rpx;
        border-radius: 10rpx;
      }
    }
    .sent{
      width: 750rpx;
      height: 100rpx;
      // margin-bottom: 50rpx;
      margin-top: 10rpx;
      position: relative;
      input{
        width: 460rpx;
        height: 70rpx;
        box-shadow: 0 0 10px #000;
        display:inline-block;
        position: absolute;
        left: 20rpx;
        top: 0;
        border-radius: 20rpx;
        padding-left: 30rpx;
      }
      button{
        width: 200rpx;
        height: 70rpx;
        border-radius: 10rpx;
        box-shadow: 0 0 10px #000;
        background: #bd1521;
        color: #fff;
        position: absolute;
        right: 20rpx;
        // top: -48rpx;
        font-size: 28rpx;
      }
    }
    // .lovebutton{
    //   width: 400rpx;
    //   height: auto;
    //   border-radius: 10rpx;
    //   box-shadow: 0 0 10px #000;
    //   margin-top: 50rpx;
    //   background: #000;
    //   color: #fff;
    // }
  }

  .greet{
    width: 100%;
    height: 100%;
    .head{
      height: 150rpx;
      width: 200rpx;
      margin: 0 auto;
    }
    .box{
      height: 700rpx;
      width: 690rpx;
      margin-left: 30rpx;
      border-radius: 16rpx;
      box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1);
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      flex-wrap: wrap;
      .item{
        width: 120rpx;
        display: flex;
        flex-direction: column;
        justify-content :flex-start;
        align-items: center;
        padding: 25rpx;
        float: left;
        image{
          width: 100rpx;
          height: 100rpx;
          border-radius: 50rpx;
        }
        p{
          height: 50rpx;
          line-height: 50rpx;
          font-size: 24rpx;
          color: #444;
          width: 100rpx;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          text-align: center;
        }
      }
    }
    .bottom{
      height: 140rpx;
      position: fixed;
      bottom: 0;
      left: 0;
      background: rgba(255, 255, 255, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      .left{
        height: 80rpx;
        line-height: 80rpx;
        font-size: 28rpx;
        width: 300rpx;
        color: #fff;
        background: #bd1521;
        margin-right: 20rpx;
      }
      .right{
        height: 80rpx;
        line-height: 80rpx;
        font-size: 28rpx;
        color: #fff;
        width: 300rpx;
        background: rgb(3, 68, 110);
      }
    }
    .count{
      height: 60rpx;
      line-height: 60rpx;
      background: rgba(255, 255, 255, 0.5);
      position: fixed;
      bottom: 140rpx;
      left: 0;
      font-size: 28rpx;
      color: #444;
      text-align: center;
      width: 100%;
    }
  }
}
</style>