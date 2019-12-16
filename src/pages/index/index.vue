<template>
  <div class="contain">
      <div class="home" v-show="love">
        <swiper class="swiper" :indicator-dots="indicatorDots" :vertical="true" :autoplay="autoplay" :interval="interval" :duration="duration">
            <block v-for="(item, index) in images" :key="index">
                <swiper-item>
                    <image :src="item.src" class="slide-image" mode="heightFix"/>
                </swiper-item>
            </block>
        </swiper>
        <heart></heart>
        <div class="timer">
          <div v-show="showOver">
            <h1 :style="'color:' + isStr">我们在一起已经</h1>
            <div class="user-img">
              <img :style="{boxShadow: '0 0 10px ' + isStr,color: isStr}" :src="headimages[0].src">
              <img :style="{boxShadow: '0 0 10px ' + isStr,color: isStr}" :src="headimages[1].src">
            </div>
            <span :style="{boxShadow: '0 0 10px ' + isStr,color: isStr}" class="days">{{ days }}</span>&nbsp;天 &nbsp;&nbsp;
            <span :style="{boxShadow: '0 0 10px ' + isStr,color: isStr}" class="hours">{{ hours }}</span>&nbsp;时 &nbsp;&nbsp;
            <span :style="{boxShadow: '0 0 10px ' + isStr,color: isStr}" class="minutes">{{ minutes }}</span>&nbsp;分 &nbsp;&nbsp;
            <span :style="{boxShadow: '0 0 10px ' + isStr,color: isStr}" class="seconds">{{ seconds }}</span>&nbsp;秒
          </div>
        </div>
        <!-- <main class="scene">
          <heart></heart>
          <div class="timer">
            <div v-show="showOver">
              <h1>我们在一起已经</h1>
              <span class="days">{{ days }}</span>天 &nbsp;&nbsp;
              <span class="hours">{{ hours }}</span>时 &nbsp;&nbsp;
              <span class="minutes">{{ minutes }}</span>分 &nbsp;&nbsp;
              <span class="seconds">{{ seconds }}</span>秒
            </div>
          </div>
        </main> -->
      </div>
  </div>
</template>

<script>
import heart from '@/components/heart'

export default {
  components: {
    heart
  },
  data () {
    return {
      imgData:[],
      love:true,
      timer: undefined,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      countdown:10,
      showOver:true,
      indicatorDots: true,
      autoplay: true,
      interval: 3000,
      duration: 500,
      images:[],
      isStr:'#',
      color:[0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'],
      windowHeight:'',
      headimages:[]
    }
  },
  created(){
    let that = this 
  },
  onShareAppMessage: function (res) {
    return {
      path: '/pages/index/main'
    }
  },
  mounted() {
    // env是你云开发的环境id
    let that = this
    const db = wx.cloud.database()
    db.collection('swipe').get({
      success(res) {
        that.images = res.data
      }
    })

    db.collection('headswipe').get({
      success(res) {
        console.log(res)
        that.headimages = res.data
      }
    })

    that.windowHeight =  wx.getSystemInfoSync().windowHeight
    wx.cloud.callFunction({
      name: 'user',
      complete: res => {
        wx.setStorage({
          key:"openid",
          data:res.result.openid
        })
      }
    })

    const loveDate = new Date('2019/7/28 03:31:00')
    this.timer = setInterval(() => {
      that.timeBetweenDates(loveDate)
    }, 1000)
    // setTimeout(function(){
    //   that.love = false
    // },10000)
    const myaudio = wx.createInnerAudioContext();
    myaudio.autoplay = true
    myaudio.src = "cloud://lynn-2opnz.6c79-lynn-2opnz/music/07b67175092cd3469767af51ff7cdceb.mp3"
    myaudio.onPlay(() => {
      console.log('开始播放')
    })
    setInterval(function(){
      that.isStr = '#'
      for(let j=0;j<6;j++){
        let z = Math.round( Math.random()*15 );
        that.isStr += that.color[z]
      }
    },3000)
    wx.cloud.init({
      traceUser: true
    })
    wx.cloud.callFunction({
      name: 'get',
      complete: res => {
        setInterval(function(){
          that.imgData = JSON.parse(JSON.stringify(res.result.data))   
          let height = wx.getSystemInfoSync().windowHeight
          let width = wx.getSystemInfoSync().windowWidth
          let left = [50,190,330,470];
          let top = [10,150,310,470,630,770,910,1050,1190];
          let randomLeft = [];
          for(let i = 0; i < that.imgData.length ; i ++) {
              let id = Math.ceil(Math.random()*4 - 1);
              randomLeft.push(left[id]);
          }
          let randomTop = [];
          for(let i = 0; i < that.imgData.length ; i ++) {
              let id = Math.ceil(Math.random()*9 - 1);
              randomTop.push(top[id]);
          }
          for(let i=0;i<that.imgData.length;i++){
            that.imgData[i].left = randomLeft[i] +"rpx";
            that.imgData[i].top = randomTop[i] +"rpx";
            that.imgData[i].transform = 'rotate(' + parseInt(360 * Math.random()) + 'deg)'
          }
        },5000)
      }
    });
  },
  components: {

  },
  methods: {
    timeOver(){
      let that = this
      that.showOver = false
      that.timerOver = setInterval(() => {
        that.countdown = that.countdown - 1
        if(that.countdown < 1){
          clearInterval(that.timerOver)
          that.love = false
        }
      }, 1000)
    },
    previewImg(index){
      let This = this;
      let arr = []
      arr.push(This.imgData[index].src)
      wx.previewImage({
          current:This.imgData[index].src,
          urls:arr
      });
    },
    prefixInteger (num, length) {
      return (Array(length).join('0') + num).slice(-length)
    },
    timeBetweenDates (loveDate) {
      const now = new Date()
      const difference = now.getTime() - loveDate.getTime()
      if (difference <= 0) {
        clearInterval(this.timer)
      } else {
        this.seconds = Math.floor(difference / 1000)
        this.minutes = Math.floor(this.seconds / 60)
        this.hours = Math.floor(this.minutes / 60)
        this.days = Math.floor(this.hours / 24)
        this.hours %= 24
        this.minutes %= 60
        this.seconds %= 60
        this.hours = this.prefixInteger(this.hours, 2)
        this.minutes = this.prefixInteger(this.minutes, 2)
        this.seconds = this.prefixInteger(this.seconds, 2)
      }
    }
  },
  created () {
    // let app = getApp()
  }
}
</script>

<style scoped lang="less">
// @font-face {
//     font-family: myFont;
//     src: url("../../common/font/DS-DIGIT.TTF");
// }
.contain{
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100%;
  height: 100%;
  transition: all 5s;
  .swiper{
    position: absolute;
    width: 100%;
    height: 100%;
    swiper-item{
      position: absolute;
      width: 100%;
      height: 100%;
      .slide-image{
        display:block;
        width:100vw;
        height:100vh;
      }
    }
  }
  .timer {
    position: absolute;
    bottom: 10%;
    width: 100%;
    text-align: center;
    color: #fff;
    font-size: 35rpx;
    transition: all 5s;
    font-family: 'digital';
    .user-img{
      display: flex;
      justify-content: space-around;
      padding: 50rpx;
    }
    h1{
      font-size: 50rpx;
      font-weight: bold;
      transition:all 3s;
    }
    span{
      font-size: 50rpx;
      font-weight: bold;
      padding:20rpx;
      box-shadow: 0 0 10px #000;
      border-radius: 20rpx;
      transition:all 3s;
    }
    img{
      display: inline-block;
      width: 100rpx;
      height: 100rpx;
      border-radius: 20rpx;
      box-shadow: 0 0 10px #000;
    }
    button{
      width:360rpx;
      color: #fff;
      background: #000;
      border-radius: 10rpx;
      box-shadow: 0 0 10px #000;
    }
  }
  .days, .hours, .minutes, .seconds {
    font-size: 50rpx;
    color: #fff;
    z-index: 999;
    font-family: 'digital';
    transition: all 5s;
  }

  .middle-contain{
    position: relative;
    width: auto;
    height: auto;
    transition: all 5s;
    ul{
      position: absolute;
      width: 100%;
      height: 100%;
      li{
        width:250rpx;
        height: 250rpx;
        box-shadow: 0 0 10px #000;
        position: absolute;
        transition: all 5s;
        left: 0rpx;
        top: 0rpx;
        transform: rotate(0);
        img{
          position: relative;
          width: 250rpx;
          height: 250rpx;
        }
      }
    }
  }
}
</style>