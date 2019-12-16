<template>
<div class="contain">
    <div class="button">    
      <button @click="dono" :class="{'select':istrue}">未完成的事</button>
      <button @click="done" :class="{'select':!istrue}">已完成的事</button>
    </div>

    <div v-if="thing" class="thing">
      <ul>
        <li v-for="(item,index) in noDone" :key="index" :style="'background:' + item.color">
          <h1>{{item.thing}}</h1>
        </li>
      </ul>
    </div>

    <div v-if="!thing" class="thing">
      <ul>
        <li v-for="(item,index) in isDone" :key="index" :style="'background:' + item.color">
          <h1>{{item.thing}}</h1>
          <img :src="item.img" @click="previewImg(index)" v-show="item.img">
          <video :src="item.video" v-show="item.video"></video>
        </li>
      </ul>
    </div>
</div>

</template>
<script>
export default {
    data(){
      return{
        thing:true,
        istrue:false,
        isDone:'',
        noDone:'',
        color:[0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f']
      }
    },
    mounted(){
      let that = this

      wx.cloud.init({
        traceUser: true
      })
      wx.cloud.callFunction({
        name: 'isDone',
        complete: res => {
          let colorString = []

          for(let i=0;i<res.result.data.length;i++){
            var isStr = '#'
            for(let j=0;j<6;j++){
              let z = Math.round( Math.random()*15 );
              isStr += that.color[z]
            }
            colorString.push(isStr);
        }
        res.result.data.map(function(item,index){
          item['color'] = colorString[index]
        })
        that.isDone = JSON.parse(JSON.stringify(res.result.data)) 
        }
      });
      wx.cloud.callFunction({
        name: 'noDone',
        complete: res => {
          let colorString = []
          for(let i=0;i<res.result.data.length;i++){
              var noStr = '#'
              for(let j=0;j<6;j++){
                let z = Math.round( Math.random()*15 );
                noStr += that.color[z]
            }
            colorString.push(noStr);
          }
          res.result.data.map(function(item,index){
            item['color'] = colorString[index]
          })
          that.noDone = JSON.parse(JSON.stringify(res.result.data)) 
        }
      });
    },
    methods:{
      dono(){
        this.thing = true
        this.istrue = false
      },
      done(){
        this.thing = false
        this.istrue = true
      },
      previewImg(index){
        let This = this;
        let arr = []
        arr.push(This.isDone[index].img)
        wx.previewImage({
            current:This.isDone[index].img,
            urls:arr
        });
      },
    }
}
</script>
<style scoped lang="less">
.contain{
  margin-top: 200rpx;
  .button{
    display: flex;
    justify-content: space-around;
    button{
      width: 300rpx;
      color: #fff;
      background: #bd1521;
    }
    .select{
      color: #000;
      background: #fff;
    }
  }
  .thing{
    padding:20rpx;
    ul{
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      li{
        box-shadow: 0 0 10px #000;
        border-radius: 30rpx;
        width: 600rpx;
        height: auto;
        padding:30rpx;
        color: #fff;
        margin: 0 auto;
        margin-bottom: 10rpx;
        img{
          width:100%;
          height: 300rpx;
          margin-top: 20rpx;
          border-radius: 20rpx;
        }
        video{
          width:100%;
          height: 300rpx;
          border-radius: 20rpx;
        }
      }
    }
  }
}
</style>