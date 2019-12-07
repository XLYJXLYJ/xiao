<template>
  <div class="contain">
      <img src="cloud://lynn-2opnz.6c79-lynn-2opnz/other/wave.gif">
      <!-- <img src="/static/images/girl2.jpg">
      <img src="/static/images/girl3.jpg"> -->
      <div class="middle-contain">
        <span>1</span>
        <span>1</span>
        <span>1</span>
        <span>1</span>
        <span>1</span>
        <span>1</span>
      </div>
      <i-button>这是一个按钮</i-button>
  </div>
</template>

<script>


export default {
  data () {
    return {
      motto: 'Hello miniprograme',
      list:[],
      userInfo: {
        nickName: 'mpvue',
        avatarUrl: 'http://mpvue.com/assets/logo.png'
      }
    }
  },
mounted() {
  // env是你云开发的环境id。
  let that = this
  const db = wx.cloud.database()
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


  console.log(db)
  db.collection('list').get({
      success(res) {
        // res.data 包含该记录的数据
        console.log(res.data)
        that.list = res.data
      }
    })
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
  display: flex;
  flex-direction: column;
  width: 100%;
  img{
    width: 750rpx;
    height: 200rpx;
  }
  .middle-contain{
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    width: 750rpx;
    height: auto;
    span{
      width: 300rpx;
      height: 300rpx;
      background: red;
      margin: 20rpx;
    }
  }
}
</style>
