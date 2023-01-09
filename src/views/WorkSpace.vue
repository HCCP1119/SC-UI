<template>
  <div>
    <el-container>
      <h2 style="padding-left: 20px;margin-bottom: 3px">工作区</h2>
      <el-header>
        <el-tabs v-model="editableTabsValue" @tab-remove="removeTab" @tab-click="handleClick">
          <el-tab-pane label="工作区列表" name="1"></el-tab-pane>
          <el-tab-pane
              v-for="item in editableTabs"
              :key="item.name"
              closable
              :label="item.title"
              :name="item.name">
          </el-tab-pane>
        </el-tabs>
      </el-header>
      <el-main>
        <div style="margin-top: -20px">
          <el-row v-for="col in rolList" :key="col.id">
            <div @click="detail(col)">
              <el-col :span="1">
                <div>
                  <el-image :src="require('@/assets/images/' + col.icon + '.png')" style="width: 20px;height: 20px"></el-image>
                </div>
              </el-col>
              <el-col :span="5">
                <div>{{ col.label }}</div>
              </el-col>
              <el-col :span="5">
                <div>创建时间：{{ col.createTime }}</div>
              </el-col>
              <el-col :span="13">
                <div>
                  <el-dropdown trigger="hover" placement="bottom" style="margin-left: 90%">
                  <span class="el-dropdown-link">
                   <i class="el-icon-more"></i>
                  </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <i class="el-icon-search"></i>
                        <el-button
                            style="padding-right: 0;padding-left: 0;color: #2c2e33"
                            type="text"
                            size="mini"
                            @click="dialogVisible=true">
                          <span style="font-size: 14px">查看</span>
                        </el-button>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <i class="el-icon-delete"></i>
                        <el-button
                            style="padding-right: 0;padding-left: 0;color: #F56C6C"
                            type="text"
                            size="mini"
                            @click="() => remove(node, data)">
                          <span style="font-size: 14px">删除</span>
                        </el-button>
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
              </el-col>
            </div>
          </el-row>
          <el-dialog
              :visible.sync="dialogVisible"
              :close-on-click-modal="false"
              width="40%"
          >
            <template slot="title">
              <i class="el-icon-search" style="padding: 0 10px"></i>
              <el-input v-model="query"></el-input>
              <el-divider></el-divider>
            </template>
            <span>这是一段信息</span>
            <span slot="footer" class="dialog-footer">
            </span>
          </el-dialog>
        </div>
      </el-main>
      <el-footer style="margin-top: 10px;margin-left: 30%">
        <el-pagination
            background
            layout="prev, pager, next"
            :page-size="10"
            :total="70">
        </el-pagination>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "WorkSpace",
  data() {
    return {
      dialogVisible: false,
      query: '',
      workspaces: [],
      rolList: [],
      editableTabsValue: '1',
      editableTabs: [],
    }
  },
  watch: {
    $route(to) {
      const id = (to.path).substring((to.path).lastIndexOf("/") + 1)
      if (id === "1") {
        this.rolList = this.workspaces
      } else {
        this.$axios({
          url: `/note/getTree/${id}`,
          method: 'get',
        }).then(res => {
          console.log(res.data)
          if (res.data.data.tab!==null){
            this.detail(res.data.data.tab)
          }
          this.rolList = res.data.data.tree
        })
      }
      this.editableTabsValue = id
    }
  },
  methods: {
    detail(workspace) {
      if (workspace.type === 'note') {
        this.$router.push({
          path: `/notes/${workspace.id}`,
        })
      } else {
        this.$router.push({
          path: `/note/workspace/${workspace.id}`,
        }).then(() => {
          let isadd = true;
          this.editableTabs.forEach((tab) => {
            if (tab.title === workspace.label) {
              this.editableTabsValue = tab.name
              isadd = false;
            }
          })
          if (isadd) {
            this.editableTabs.push({
              title: workspace.label,
              name: workspace.id,
            })
            this.editableTabsValue = workspace.id
          }
        })
      }
    },
    removeTab(targetName) {
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }
      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter(tab => tab.name !== targetName);
      if (this.editableTabs.length === 0) {
        this.editableTabsValue = "1";
        this.$router.push({
          path: `/note/workspace/${this.editableTabsValue}`,
        })
        this.rolList = this.workspaces;
      } else {
        // this.$router.push({
        //   path: `/note/workspace/${activeName}`,
        // }).then(()=>{
        //   this.$axios({
        //     url: `/note/getTree/${activeName}`,
        //     method: 'get',
        //   }).then(res => {
        //     this.rolList = res.data.data
        //   })
        // })
      }
    },
    handleClick(tab) {
      if (tab.name === '1') {
        this.rolList = this.workspaces
        this.$router.push({
          path: `/note/workspace/${tab.name}`,
        })
      } else {
        this.$router.push({
          path: `/note/workspace/${tab.name}`,
        }).then(() => {
          // this.$axios({
          //   url: `/note/getTree/${tab.name}`,
          //   method: 'get',
          // }).then(res => {
          //   this.rolList = res.data.data
          // })
        })
      }
    }
  },
  created() {
    this.$axios({
      url: `/note/getTree`,
      method: 'get',
    }).then(res => {
      this.workspaces = res.data.data
      this.rolList = this.workspaces
    })
  }
}
</script>

<style scoped lang="scss">
@import "../assets/scss/common/common";

.el-row:hover {
  outline: 0 !important;
  @include font_color("aside_text-color");
  border-radius: 0.8em;
  @include background_color("hover_background_color");
}

.el-row {
  height: 50px;
  width: 100%;
}

.el-col {
  padding-top: 15px;
  padding-left: 15px;
}

.el-icon-delete {
  color: #F56C6C;
}

::v-deep .el-divider--horizontal {
  margin: 12px 0 0 0;
}

.el-input {
  width: 50%;
}

::v-deep .el-input__inner {
  border: 1px solid #f9fafb;
  padding: 0;
}

::v-deep .el-dialog__body {
  padding: 0 25px 5px !important;
}

::v-deep .el-dialog__header {
  padding: 10px 10px 5px !important;
}
.el-tabs{
  ::v-deep .el-tabs__item{
    @include font_color("aside_text-color");
  }
}
.el-icon-more:hover {
  background-color: white;
  border-radius: 0.4em;
}
.el-icon-more{
  padding: 5px;
}
</style>