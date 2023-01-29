<template>
  <div class="noteshare">
    <el-container>
      <el-header>
        <div class="header">
          <div class="back">
            <el-image :src="require('@/assets/images/logo.png')"></el-image>
            <div class="text">
              <span>SC-note</span>
              <span v-if="note.id!==undefined"> | {{ note.title }}</span>
            </div>
          </div>
          <div class="author" v-if="author!==''">
            <span><span style="color: #8a8a8a">{{author}}</span> 的分享</span>
          </div>
        </div>
      </el-header>
      <el-main>
        <div class="main">
          <div v-if="empty">
            <el-empty :image-size="200" description="失效的分享地址">
              <span slot="default">对方已停止分享或分享不存在</span>
            </el-empty>
          </div>
          <div v-if="note.id!==undefined">
            <Editor
                class="editor"
                style=""
                v-model="html"
                :defaultConfig="editorConfig"
            />
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import {Editor} from '@wangeditor/editor-for-vue'
export default {
  name: "ShareView",
  components: {
    Editor,
  },
  data(){
    return{
      note:{},
      empty:false,
      author:"",
      html:"",
      editorConfig:{
        readOnly: true
      }
    }
  },
  methods:{

  },
  created() {
    const id = this.$route.path.substring((this.$route.path).lastIndexOf("/") + 1)
    this.$axios({
      url: `/note/share/getNote/${id}`,
      method: 'get'
    }).then(res => {
      if (res.data.code===200){
        this.note = res.data.data.note
        this.html = this.note.content
        this.author = res.data.data.user
      }else {
        this.empty = true
      }
    })
  }
}
</script>

<style scoped lang="scss">
.noteshare{
  width: 100%;
  height: 100%;
  background-color: #f9fafb;
}
.el-header {
  padding: 0;
  width: 100%;
  height: 50px;
  background-color: white;

  .header {
    height: 25px;
    margin: 15px 0 0 10px;
    font-size: 18px;
    line-height: 25px;
    .back{
      position: absolute;
      left: 15px;
      top: 5px;
      .el-image{
        width: 70%;
        height: 40%;
        float: left;
      }
      .text{
        width: 200px;
        position: absolute;
        float: right;
        left: 50px;
        top: 8px;
      }
    }
    .author{
      position: absolute;
      top: 15px;
      font-size: 15px;
      right: 20px;
    }
  }
}

.el-main{
  .editor{
    width: 800px;
    margin-left: 25%;
  }
}
</style>