<template>
  <div>
    <el-container>
      <div style="position: fixed;top: 5px;right: 70px">
        <el-button
            size="small"
            type="primary"
            @click="queryDig = true;">
          <i class="el-icon-search"></i>
          搜索笔记
        </el-button>
      </div>
      <h2 style="padding-left: 20px;margin-bottom: 3px">工作区</h2>
      <el-header>
        <el-tabs v-model="editableTabsValue" @tab-remove="removeTab" @tab-click="handleClick">
          <el-tab-pane label="工作区列表" name="list"></el-tab-pane>
          <el-tab-pane
              v-for="item in editableTabs"
              :key="item.name"
              closable
              :label="item.title"
              :name="item.name">
          </el-tab-pane>
        </el-tabs>
      </el-header>
      <el-main v-loading="loading">
        <div style="margin-top: -20px">
          <div class="main-data">
            <el-row v-for="col in rolList" :key="col.id">
              <div @click="detail(col)">
                <el-col :span="1">
                  <div style="width: 40px;height: 40px;background-color: #e7f5ff;border-radius: 5px">
                    <el-image :src="require('@/assets/images/' + col.icon + '.png')" style="width: 20px;height: 20px;padding-left: 10px;padding-top: 10px;"></el-image>
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
                        </el-dropdown-item>
                        <el-dropdown-item>

                        </el-dropdown-item>
                        <el-dropdown-item>
                          <i class="el-icon-delete"></i>
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
            <el-dialog
                :visible.sync="queryDig"
                :before-close="dialogClose"
                :close-on-click-modal="false"
                width="40%"
            >
              <div slot="title" class="header">
                <i class="el-icon-search" style="padding: 0 10px"></i>
                <el-input v-model="query"></el-input>
                <el-divider></el-divider>
              </div>
              <div class="body">
                <div class="col-1">
                  <el-select v-model="searchType" disabled placeholder="请选择" size="medium" style="margin-top: 5px;">
                  </el-select>

                  <el-select v-model="sortType" placeholder="请选择" size="medium" style="margin-top: 5px;margin-left: 10px">
                    <el-option
                        v-for="item in sortBasis"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                  </el-select>
                  <el-button @click="search" style="margin-left: 8px" type="primary" size="medium" icon="el-icon-s-operation">过滤器</el-button>
                </div>

                <div class="col-2" style="margin-top: 15px">
                  <label>创建时间（起始）</label>
                  <label style="margin-left: 16%">创建时间（结束）</label>
                </div>

                <div class="col-3" style="margin-top: 15px">
                  <el-date-picker
                      v-model="createTime"
                      type="daterange"
                      value-format="yyyy-MM-dd"
                      unlink-panels
                      :editable="false"
                      range-separator="至"
                      start-placeholder="选择一个时间"
                      end-placeholder="选择一个时间"
                  >
                  </el-date-picker>
                </div>
                <div class="col-4" style="margin-top: 15px">
                  <label>最后修改时间（起始）</label>
                  <label style="margin-left: 11%">最后修改时间（结束）</label>
                </div>
                <div class="col-5" style="margin-top: 15px">
                  <el-date-picker
                      v-model="updateTime"
                      type="daterange"
                      value-format="yyyy-MM-dd"
                      unlink-panels
                      :editable="false"
                      range-separator="至"
                      start-placeholder="选择一个时间"
                      end-placeholder="选择一个时间"
                  >
                  </el-date-picker>
                </div>
              </div>
              <div slot="footer" class="footer">
                <el-row :gutter="20" v-for="note in searchResult" :key="note.id">
                  <div @click="pushNote(note.id)">
                    <el-col :span="2">
                      <div>
                        <el-image :src="require('@/assets/images/color_notepad.png')" style="width: 20px;height: 20px"></el-image>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div style="text-align: left">{{ note.title }}</div>
                    </el-col>
                    <el-col :span="14">
                      <div>上一次修改：{{ note.updateTime }}</div>
                    </el-col>
                  </div>
                </el-row>
              </div>
            </el-dialog>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "WorkSpace",
  data() {
    return {
      queryDig: false,
      query: null,
      loading: true,
      workspaces: [],
      rolList: [],
      editableTabsValue: 'list',
      editableTabs: [],
      searchType:'笔记名称',
      sortBasis:[{
        value: 'ASC',
        label: '升序'
      },{
        value: 'DESC',
        label: '降序'
      }],
      sortType:'ASC',
      createTime:[],
      updateTime:[],
      searchResult:[],
    }
  },
  watch: {
    $route(to) {
      const id = (to.path).substring((to.path).lastIndexOf("/") + 1)
      if (id === "list") {
        this.rolList = this.workspaces
      } else {
        this.$axios({
          url: `/note/getTree/${id}`,
          method: 'get',
        }).then(res => {
          if (res.data.data.tab!==null){
            this.detail(res.data.data.tab)
          }
          this.rolList = res.data.data.tree
        })
      }
      this.editableTabsValue = id
    },
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
    remove(id){
      this.$axios({
        url:`/note/remove/${id}`,
        method:"delete"
      }).then(() => {
        this.getData()
        this.$bus.$emit("AsideRefresh")
      })
    },
    pushNote(id){
      this.$router.push({
        path: `/notes/${id}`,
      })
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
        this.editableTabsValue = "list";
        this.$router.push({
          path: `/note/workspace/${this.editableTabsValue}`,
        })
        this.rolList = this.workspaces;
      } else {
        this.$router.push({
          path: `/note/workspace/${activeName}`,
        })
      }
    },
    handleClick(tab) {
      if (tab.name === 'list') {
        this.rolList = this.workspaces
        this.$router.push({
          path: `/note/workspace/${tab.name}`,
        })
      } else {
        this.$router.push({
          path: `/note/workspace/${tab.name}`,
        })
      }
    },
    search(){
      const createStart = ((this.createTime.length))===0 ? null : ((this.createTime)[0])
      const createEnd = ((this.createTime.length))===0 ? null : ((this.createTime)[1])
      const updateStart = ((this.updateTime.length))===0 ? null : ((this.updateTime)[0])
      const updateEnd = ((this.updateTime.length))===0 ? null : ((this.updateTime)[1])
      this.$axios({
        url: '/note/search',
        method: 'post',
        data:{
          "value": this.query,
          "searchType": this.searchType,
          "sortType": this.sortType,
          "createStart": createStart,
          "createEnd": createEnd,
          "updateStart": updateStart,
          "updateEnd": updateEnd,
          "userId":localStorage.getItem("uid")
        }
      }).then(res => {
        this.searchResult = res.data.data
      })
    },
    dialogClose(){
      this.queryDig = false
      this.query = null
      this.createTime.splice(0)
      this.updateTime.splice(0)
      this.searchResult.splice(0);
    },

    getData(){
      this.$axios({
        url: `/note/getTree`,
        method: 'get',
      }).then(res => {
        this.loading = false
        this.workspaces = res.data.data
        this.rolList = this.workspaces
      })
    },

  },
  created() {
    this.getData()
  },
  mounted() {
    this.$bus.$on("WorkspaceRefresh",()=>{
      this.getData()
    })
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/scss/workspace";

</style>