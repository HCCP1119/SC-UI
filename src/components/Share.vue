<template>
<div>
  <el-container>
    <h2 style="padding-left: 20px;margin-bottom: 3px">分享</h2>
    <el-header>
      <div style="position: fixed;top: 5px;right: 70px">
        <div style="float: left;margin-right: 10px">
          <el-input v-model="fileName" prefix-icon="el-icon-search" style="height: 20px"
                    placeholder="搜索文件"></el-input>
        </div>
      </div>
      <el-tabs value="first">
        <el-tab-pane label="分享列表" name="first"></el-tab-pane>
      </el-tabs>
    </el-header>
    <el-main v-loading="loading">
      <div style="margin-top: -20px">
        <div class="main-data">
          <el-row v-for="col in shareList" :key="col.id">
            <div @click="detail(col)">
              <el-col :span="1">
                <div style="width: 40px;height: 40px;background-color: #e7f5ff;border-radius: 5px">
                  <el-image :src="require('@/assets/images/' + col.icon + '.png')"
                            style="width: 20px;height: 20px;padding-left: 10px;padding-top: 10px;"></el-image>
                </div>
              </el-col>
              <el-col :span="20" style="margin-top: -3px">
                <div style="font-size: 20px">{{ col.label }}</div>
                <div>
                  <span style="font-size: 10px;padding-right: 15px">创建时间：{{ col.createTime }}</span>
                  <span style="font-size: 10px" v-if="col.updateTime!==null">修改时间：{{ col.updateTime }}</span>
                </div>
              </el-col>
              <el-col :span="2">
                <div>
                  <el-dropdown trigger="hover" placement="bottom" style="margin-left: 90%;padding-top: 10px">
                  <span class="el-dropdown-link">
                   <i class="el-icon-more"></i>
                  </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>
                        <i class="el-icon-star-off" style="color: #409EFF;"></i>
                        <el-button
                            style="padding-right: 0;padding-left: 0;"
                            type="text"
                            size="mini"
                            @click="() => unShare(col.id)">
                          <span style="font-size: 14px">取消分享</span>
                        </el-button>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <i class="el-icon-delete" style="color: #F56C6C;"></i>
                        <el-button
                            style="padding-right: 0;padding-left: 0;color: #F56C6C"
                            type="text"
                            size="mini"
                            @click="() => remove(col.id)">
                          <span style="font-size: 14px">删除</span>
                        </el-button>
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
              </el-col>
            </div>
          </el-row>
        </div>
      </div>
    </el-main>
  </el-container>
</div>
</template>

<script>
export default {
  name: "Share",
  data() {
    return {
      fileName: "",
      shareList: [],
      bkList: [],
      loading: true,
    };
  },
  watch:{
    fileName(val) {
      this.shareList = this.filesFilter(val)
    },
  },
  methods:{
    getData() {
      this.$axios({
        url: '/note/shareList',
        method: 'get',
      }).then(res => {
        this.loading = false
        this.bkList = res.data.data
        this.shareList = res.data.data
      })
    },
    unShare(id){
      this.$axios({
        url: `/note/share/unShare/${id}`,
        method: 'post'
      }).then(() => {
        this.getData()
      })
    },
    remove(id){
      this.$axios({
        url:`/note/remove/${id}`,
        method:"delete"
      }).then(() => {
        this.getData()
        this.$bus.$emit("AsideRefresh")
      })
    },
    filesFilter(val) {
      if (val === "") {
        return this.bkList
      } else {
        return this.bkList.filter(file => {
          return (file.label).includes(val)
        })
      }
    },
  },
  created() {
    this.getData()
  },
  mounted() {
    this.$bus.$on("ShareRefresh",()=>{
      this.getData()
    })
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/scss/common/common";

.main-data {
  max-height: 500px;
  overflow-y: auto;

.el-row:hover {
  outline: 0 !important;
  @include font_color("aside_text-color");
  border-radius: 0.8em;
  @include background_color("hover_background_color");
}

.el-row {
  height: 70px;
  width: 100%;
}

.el-col {
  padding-top: 15px;
  padding-left: 15px;
}
}

.el-icon-more:hover {
  background-color: white;
  border-radius: 0.4em;
}

.el-icon-more {
  padding: 5px;
}

.el-dropdown-menu {
  @include background_color("aside_color");
  @include font_color("aside_text-color");
}

.el-dropdown-menu__item:hover {
  @include font_color("aside_text-color");
  @include background_color("hover_background_color");
}

::v-deep .el-input__inner {
  height: 32px;
}

::v-deep .el-input__icon {
  line-height: 32px;
}
</style>