<template>
  <div>
    <el-container>
      <h2 style="padding-left: 20px;margin-bottom: 3px">回收站</h2>
      <el-header>
        <el-tabs value="first">
          <el-tab-pane label="删除列表" name="first"></el-tab-pane>
        </el-tabs>
      </el-header>
      <el-main v-loading="loading">
        <div style="margin-top: -20px">
          <div v-if="empty">
            <el-empty :image-size="200" description="暂无数据"></el-empty>
          </div>
          <div class="main-data">
            <el-row v-for="col in removeList" :key="col.id">
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
                          <i class="el-icon-refresh-left" style="color: #409EFF;"></i>
                          <el-button
                              style="padding-right: 0;padding-left: 0;"
                              type="text"
                              size="mini"
                              @click="() => restore(col.id)">
                            <span style="font-size: 14px">恢复</span>
                          </el-button>
                        </el-dropdown-item>
                        <el-dropdown-item>
                          <i class="el-icon-delete" style="color: #F56C6C;"></i>
                          <el-button
                              style="padding-right: 0;padding-left: 0;color: #F56C6C"
                              type="text"
                              size="mini"
                              @click="redayDelId=col.id;visible=true">
                            <span style="font-size: 14px">删除</span>
                          </el-button>
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                    <el-dialog
                        :visible.sync="visible"
                        width="30%"
                        :close-on-click-modal="false"
                    >
                      <span style="">永久删除的文件无法恢复，请谨慎操作</span>
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
                        <el-button type="danger" @click="remove(redayDelId)" size="medium">永久删除</el-button>
                         </span>
                    </el-dialog>
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
  name: "Trash",
  data() {
    return {
      visible:false,
      empty:false,
      removeList: [],
      loading:true,
      redayDelId:'',
    }
  },
  methods: {
    restore(id) {
      this.$axios({
        url: `/note/restore/${id}`,
        method: 'post'
      }).then(() => {
        this.getData()
        this.$bus.$emit("AsideRefresh")
      })
    },
    remove(id){
      this.$axios({
        url: `/note/delete/${id}`,
        method: 'delete'
      }).then(() => {
        this.getData()
        this.visible = false
        this.$bus.$emit("AsideRefresh")
      })
    },
    getData() {
      this.$axios({
        url: '/note/removeList',
        method: 'get',
      }).then(res => {
        this.loading = false
        this.removeList = res.data.data
        this.empty = this.removeList.length === 0;
      })
    }
  },
  created() {
    this.getData()
  },
  mounted() {
    this.$bus.$on("TrashRefresh", () => {
      this.getData()
    })
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/Trash";
</style>