<template>
  <div>
    <div>
      测试云函数
      <button>添加函数</button>
      <button>删除函数</button>
      <button>修改函数</button>
      <button>查看函数</button>
    </div>
  </div>
</template>

<script>


export default {
  data () {
    return {
      motto: 'Hello miniprograme',
      userInfo: {
        nickName: 'mpvue',
        avatarUrl: 'http://mpvue.com/assets/logo.png'
      }
    }
  },
mounted() {
  // env是你云开发的环境id。
  console.log('666')
  const db = wx.cloud.database()
  console.log(db)
  console.log(db.collection('list'))
  db.collection('list').add({
    // data 字段表示需新增的 JSON 数据
    data: {
      // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
      description: "learn cloud database",
      due: new Date("2018-09-01"),
    },
    success: function(res) {
      // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
      console.log(res)
    }
  })


  console.log(db)
  db.collection('list').get({
      success(res) {
        // res.data 包含该记录的数据
        console.log(res.data)
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

<style scoped>
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 150px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}
.all{
  width:7.5rem;
  height:1rem;
  background-color:blue;
}
.all:after{
  display:block;
  content:'';
  clear:both;
}
.left{
  float:left;
  width:3rem;
  height:1rem;
  background-color:red;
}

.right{
  float:left;
  width:4.5rem;
  height:1rem;
  background-color:green;
}
</style>
