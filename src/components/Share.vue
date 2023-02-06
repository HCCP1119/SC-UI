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
        <div v-if="empty">
          <el-empty :image-size="200" description="暂无数据"></el-empty>
        </div>
        <div class="main-data">
          <el-row v-for="col in shareList" :key="col.id">
            <div>
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
                        <i class="el-icon-link" style="color: #409EFF;"></i>
                        <el-button
                            style="padding-right: 0;padding-left: 0;"
                            type="text"
                            size="mini"
                            @click="() => copyAddr(col.id)">
                          <span style="font-size: 14px">复制地址</span>
                        </el-button>
                      </el-dropdown-item>
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
      empty: false,
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
        this.empty = this.shareList.length === 0;
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
    copyAddr(id){
      const addr = "http://192.168.1.129/#/scnotesShare/" + id;
      const input = document.createElement("input"); // 创建input对象
      input.value = addr; // 设置复制内容
      document.body.appendChild(input); // 添加临时实例
      input.select(); // 选择实例内容
      document.execCommand("Copy"); // 执行复制
      document.body.removeChild(input); // 删除临时实例
      this.$message.success('复制成功！');

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
@import "src/assets/styles/Share";
</style>