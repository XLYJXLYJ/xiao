<template>
  <div class="contain">
      <div class="middle-contain">
        <ul>
            <li v-for="(item,index) in imgData" :key='index' :style="{left:item.left,top:item.top,transform:item.transform}">
                <img @click="previewImg(index)" :src="item.src" >
            </li>
        </ul>
      </div>
  </div>
</template>

<script>


export default {
  data () {
    return {
      imgData:[]
    }
  },
created(){
  let that = this
  for(let i=0;i<26;i++){
    that.imgData.push({'src':'cloud://lynn-2opnz.6c79-lynn-2opnz-1300452706/you/y' + i + '.jpg'})
  }
},
mounted() {
  // env是你云开发的环境id。
  let that = this
  const myaudio = wx.createInnerAudioContext();
  myaudio.autoplay = true
  myaudio.src = "cloud://lynn-2opnz.6c79-lynn-2opnz/music/07b67175092cd3469767af51ff7cdceb.mp3"
  myaudio.onPlay(() => {
    console.log('开始播放')
  })

  // const db = wx.cloud.database()
  // db.collection('list').add({
  //   // data 字段表示需新增的 JSON 数据
  //   data: {
  //     // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
  //     description: "learn cloud database",
  //     due: new Date("2018-09-01"),
  //   },
  //   success: function(res) {
  //     // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
  //     console.log(res)
  //   }
  // })

   //查询附近拼单
      wx.cloud.init({
        traceUser: true
      })
      wx.cloud.callFunction({
        name: 'get',
        complete: res => {

 
          console.log(res)
          setInterval(function(){
            that.imgData = JSON.parse(JSON.stringify(res.result.data))   
            let height = wx.getSystemInfoSync().windowHeight
            let width = wx.getSystemInfoSync().windowWidth
            let left = [50,190,330,470];
            let top = [10,150,310,470,630,height*2-100];
            let randomLeft = [];
            for(let i = 0; i < that.imgData.length ; i ++) {
                let id = Math.ceil(Math.random()*4 - 1);
                randomLeft.push(left[id]);
            }
            let randomTop = [];
            for(let i = 0; i < that.imgData.length ; i ++) {
                let id = Math.ceil(Math.random()*6 - 1);
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
    // env是你云开发的环境id。
    // const db = wx.cloud.database()
    // db.collection('list').add({
    //   // data 字段表示需新增的 JSON 数据
    //   data: {
    //     // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
    //     description: "learn cloud database",
    //     due: new Date("2018-09-01"),
    //   },
    //   success: function(res) {
    //     // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
    //     console.log(res)
    //   }
    // })

    // setInterval(function(){
    //   db.collection('youImgList').get({
    //     success(res) {
    //       // res.data 包含该记录的数据
    //       that.imgData = res.data  
    //       let height = wx.getSystemInfoSync().windowHeight
    //       let width = wx.getSystemInfoSync().windowWidth
    //       let left = [50,190,330,470];
    //       let top = [10,150,310,470,630,height*2-100];
    //       let randomLeft = [];
    //       for(let i = 0; i < 20 ; i ++) {
    //           let id = Math.ceil(Math.random()*4 - 1);
    //           randomLeft.push(left[id]);
    //       }
    //       let randomTop = [];
    //       for(let i = 0; i < 20 ; i ++) {
    //           let id = Math.ceil(Math.random()*6 - 1);
    //           randomTop.push(top[id]);
    //       }
    //       for(let i=0;i<that.imgData.length;i++){
    //         that.imgData[i].left = randomLeft[i] +"rpx";
    //         that.imgData[i].top = randomTop[i] +"rpx";
    //         that.imgData[i].transform = 'rotate(' + parseInt(360 * Math.random()) + 'deg)'
    //       }
    //     }
    //   })
    // },5000)

  },
  components: {

  },

  methods: {
      previewImg(index){
          let This = this;
          let arr = []
          arr.push(This.imgData[index].src)
          wx.previewImage({
              current:This.imgData[index].src,
              urls:arr
          });
          // const myaudio = wx.createInnerAudioContext();
          // myaudio.autoplay = true
          // myaudio.src = "cloud://lynn-2opnz.6c79-lynn-2opnz/music/07b67175092cd3469767af51ff7cdceb.mp3"
          // myaudio.onPlay(() => {
          //   console.log('开始播放')
          // })
          // myaudio.onError((res) => {
          //   console.log(res)
          // })
      },
  },

  created () {
    // let app = getApp()
  }
}
</script>

<style scoped lang="less">
.contain{
  display: flex;
  flex-direction: column;
  width: 100%;
  .middle-contain{
    position: relative;
    width: auto;
    height: auto;
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