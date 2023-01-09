<template>
  <div>
    <el-container>
      <h2 style="padding-left: 20px;margin-bottom: 3px">文件</h2>
      <el-header>
        <div style="position: fixed;top: 5px;right: 70px">
          <div style="float: left;margin-right: 10px">
            <el-radio-group v-model="basis" size="small" fill="#409EFF" text-color="#ffffff">
              <el-radio-button label="name">文件名称</el-radio-button>
              <el-radio-button label="size">文件大小</el-radio-button>
              <el-radio-button label="content_type">文件类型</el-radio-button>
              <el-radio-button label="upload_time">上传时间</el-radio-button>
            </el-radio-group>
          </div>
          <div style="float: left;margin-right: 10px">
            <el-radio-group v-model="sequence" size="small">
              <el-radio-button label="ASC">升序</el-radio-button>
              <el-radio-button label="DESC">降序</el-radio-button>
            </el-radio-group>
          </div>
          <div style="float: left;margin-right: 10px">
            <el-input v-model="fileName" prefix-icon="el-icon-search" style="height: 20px"
                      placeholder="搜索文件"></el-input>
          </div>
          <div style="float: left">
            <el-upload
                class="upload-demo"
                action="http://localhost:8004/file/uploadFile"
                name="file"
                :data="{'uid':this.uid}"
                :on-success="uploadSuccess"
                :show-file-list="false"
            >
              <el-button slot="trigger" size="small" type="primary">上传</el-button>
            </el-upload>
          </div>
        </div>
        <el-tabs value="first">
          <el-tab-pane label="文件列表" name="first"></el-tab-pane>
        </el-tabs>
      </el-header>
      <el-main>
        <div style="margin-left: -30px;margin-top: -35px">
          <el-row :gutter="20">
            <el-col :span="4" v-for="(file, index) in files" :key="file.id" :offset="index > 0 ? 0 : 0"
                    style="width: 200px;padding-top: 15px;margin-left: 30px">
              <el-card :body-style="{ padding: '0px'}" class="bottomLayer">
                <div class="imageLayer">
                  <el-image :src="file.disk" class="image">
                    <div slot="error">
                      <el-image :src="require('../assets/images/file-unknown.png')"
                                style="margin-left: 36px;margin-top: 12px"></el-image>
                    </div>
                  </el-image>
                </div>
                <div class="footer">
                  <div>
                    <div style="font-weight: bold">
                      <el-input :value="file.name"></el-input>
                    </div>
                    <div style="padding-top: 5px">
                      <span>{{ file.contentType }}</span>
                      <span style="padding-left: 20px">{{ file.size }}</span>
                    </div>
                    <el-button type="text">下载</el-button>
                    <el-button type="text">编辑</el-button>
                    <el-button type="text" style="color: #F56C6C">删除</el-button>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </el-main>
      <el-footer style="margin-top: 10px;margin-left: 40%" v-show="total > 10">
        <el-pagination
            background
            layout="prev, pager, next"
            :hide-on-single-page="total < 11"
            :page-size="10"
            :current-page="currentPage"
            @current-change="handleCurrentChange"
            :total="total">
        </el-pagination>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Files",
  computed:{},
  data() {
    return {
      files: [],
      bkFiles:[],
      fileName: '',
      sequence: 'ASC',
      currentPage: 1,
      total: 0,
      basis: 'upload_time',
      uid: localStorage.getItem("uid"),
    }
  },
  watch:{
    sequence(){
      this.$axios({
        url: `http://localhost:8004/file/getFiles/${this.basis}/${this.sequence}/${this.uid}`,
        method: 'get',
      }).then(res => {
        this.bkFiles = res.data.data
        this.total = this.bkFiles.length
        this.files = this.bkFiles.slice((this.currentPage - 1) * 10, this.currentPage * 10)
      })
    },
    basis(){
      this.$axios({
        url: `http://localhost:8004/file/getFiles/${this.basis}/${this.sequence}/${this.uid}`,
        method: 'get',
      }).then(res => {
        this.bkFiles = res.data.data
        this.total = this.bkFiles.length
        this.files = this.bkFiles.slice((this.currentPage - 1) * 10, this.currentPage * 10)
      })
    },
    fileName(val){
      const list = this.filesFilter(val)
      this.total = list.length
      this.files = list.slice ((this.currentPage - 1) * 10, this.currentPage * 10)
    }
  },
  methods:{
    uploadSuccess(response){
      this.files = response.data
    },
    handleCurrentChange(val){
      this.currentPage = val
      const list = this.filesFilter(this.fileName)
      this.files = list.slice((this.currentPage - 1) * 10, this.currentPage * 10)
    },

    filesFilter(val){
      if (val===""){
        return this.bkFiles
      }else {
        return this.bkFiles.filter(file =>{
          return (file.name).includes(val)
        })
      }
    }
  },
  created() {
    this.$axios({
      url: "http://localhost:8004/file/getFiles",
      method: 'get',
      params: {
        "uid": this.uid
      }
    }).then(res => {
      this.bkFiles = res.data.data
      this.total = this.bkFiles.length
      this.files = this.bkFiles.slice((this.currentPage - 1) * 10, this.currentPage * 10)
    })
  }
}
</script>

<style scoped lang="scss">
@import "../assets/scss/common/common";

.imageLayer {
  width: 200px;
  height: 150px;
  @include background_color("hover_background_color");
}

.bottomLayer {
  width: 200px;
  height: 250px;
  @include font_color("aside_text-color");
  @include background_color("hover_background_color");
}

.image {
  width: 200px;
  height: 150px;
  //display: block;
}

.footer{
  padding: 14px;
  @include background_color("background_color");
  ::v-deep .el-input__inner{
    border: 0 solid #f9fafb;
    padding-left: 0;
    height: 21px;
    font-weight: 400;
    font-size: 18px;
    @include font_color("aside_text-color");
    @include background_color("background_color");
  }
}


::v-deep .el-input__inner {
  height: 32px;
}

::v-deep .el-input__icon {
  line-height: 32px;
}

//.el-radio-group{
//  ::v-deep .el-radio-button__inner{
//    @include background_color("background_color");
//    @include font_color("text-color")
//  }
//}
</style>