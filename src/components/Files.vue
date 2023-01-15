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
                    <div>
                      <el-button type="text" @click="downloadFile(file.disk)">下载</el-button>
                      <el-button slot="reference" type="text" style="color: #F56C6C;padding-left: 10px" @click="visible = true">删除
                      </el-button>
                    </div>
                    <el-dialog
                        :visible.sync="visible"
                        width="30%"
                        :close-on-click-modal="false"
                    >
                      <span style="margin-left: 25px;">文件删除后将不能恢复</span>
                      <template slot="title">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-alert-circle"
                             width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ff9300" fill="none"
                             stroke-linecap="round" stroke-linejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                          <circle cx="12" cy="12" r="9"/>
                          <line x1="12" y1="8" x2="12" y2="12"/>
                          <line x1="12" y1="16" x2="12.01" y2="16"/>
                        </svg>
                        <div style="position: absolute;left: 50px;top: 20px">
                          <span style="font-weight: 500;color: black">确认删除？</span>
                        </div>
                      </template>
                      <span slot="footer" class="dialog-footer">
                        <el-button @click="visible = false" size="medium">取消</el-button>
                        <el-button type="primary" @click="removeFile(file.disk)" size="medium">删除</el-button>
                      </span>
                    </el-dialog>
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
  computed: {},
  data() {
    return {
      files: [],
      bkFiles: [],
      fileName: '',
      sequence: 'ASC',
      currentPage: 1,
      visible: false,
      total: 0,
      basis: 'upload_time',
      uid: localStorage.getItem("uid"),
    }
  },
  watch: {
    sequence() {
      this.$axios({
        url: `http://localhost:8004/file/getFiles/${this.basis}/${this.sequence}/${this.uid}`,
        method: 'get',
      }).then(res => {
        this.bkFiles = res.data.data
        this.total = this.bkFiles.length
        this.files = this.bkFiles.slice((this.currentPage - 1) * 10, this.currentPage * 10)
      })
    },
    basis() {
      this.$axios({
        url: `http://localhost:8004/file/getFiles/${this.basis}/${this.sequence}/${this.uid}`,
        method: 'get',
      }).then(res => {
        this.bkFiles = res.data.data
        this.total = this.bkFiles.length
        this.files = this.bkFiles.slice((this.currentPage - 1) * 10, this.currentPage * 10)
      })
    },
    fileName(val) {
      const list = this.filesFilter(val)
      this.total = list.length
      this.files = list.slice((this.currentPage - 1) * 10, this.currentPage * 10)
    },
  },
  methods: {
    uploadSuccess(response) {
      this.files = response.data
    },
    handleCurrentChange(val) {
      this.currentPage = val
      const list = this.filesFilter(this.fileName)
      this.files = list.slice((this.currentPage - 1) * 10, this.currentPage * 10)
    },

    filesFilter(val) {
      if (val === "") {
        return this.bkFiles
      } else {
        return this.bkFiles.filter(file => {
          return (file.name).includes(val)
        })
      }
    },
    downloadFile(disk) {
      this.$axios({
        url: `http://localhost:8004/file/download`,
        method: 'get',
        params: {
          'id': this.uid,
          'disk': disk
        },
        responseType: 'blob'
      }).then(res => {
        let blob = new Blob([res.data], {type: res.headers['content-type']});
        let link = document.createElement('a')
        link.style.display = 'none'
        link.url = URL.createObjectURL(blob);
        link.href = link.url
        link.download = disk.substr(disk.lastIndexOf('/') + 1);
        document.body.appendChild(link);
        link.click()
        document.body.removeChild(link) //下载完成移除元素
        window.URL.revokeObjectURL(link.href);
      })
    },
    removeFile(disk) {
      this.$axios({
        url: `http://localhost:8004/file/remove`,
        method: 'delete',
        params: {
          'id': this.uid,
          'disk': disk
        },
      }).then(res => {
        this.bkFiles = res.data.data
        this.total = this.bkFiles.length
        this.files = this.bkFiles.slice((this.currentPage - 1) * 10, this.currentPage * 10)
        this.visible = false
      })
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
@import "src/assets/scss/common/common";

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

.footer {
  padding: 14px;
  @include background_color("background_color");

  ::v-deep .el-input__inner {
    border: 0 solid #f9fafb;
    padding-left: 0;
    height: 21px;
    font-weight: 400;
    font-size: 18px;
    @include font_color("aside_text-color");
    @include background_color("background_color");
  }

  ::v-deep .el-dialog{
    position: absolute;
    top: 151px;
    left: 568px;
    width: 400px !important;
    height: 130px!important;
    box-shadow: none;
    border-radius: 6px;

    ::v-deep .el-button{
      padding-top: 8px!important;
      padding-bottom: 8px!important;
    }
  }

  ::v-deep .el-dialog__body {
    padding-top: 0!important;
  }
  ::v-deep .el-dialog__footer{
    height: 32px!important;
    padding-top: 0;
    padding-bottom: 0;
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