<template>
  <div>
    <el-container>
      <el-header height="80px">
        <div class="header">
          <el-image :src="src"></el-image>
          <div style="float: right;margin-left: 20px;margin-top: 0;line-height: 25px">
            <span>One Start</span>
            <br/>
            <span>admin</span>
          </div>
        </div>
      </el-header>
      <el-main>
        <div class="menu">
          <el-menu
              ref="menu"
              @select="menuItemClick"
              :default-active="dfa"
          >
            <el-menu-item index="/note/workspace">
              <template slot="title">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-home" width="20" height="20"
                     viewBox="0 0 24 24" stroke-width="1.5" stroke="#00abfb" fill="none" stroke-linecap="round"
                     stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <polyline points="5 12 3 12 12 3 21 12 19 12"/>
                  <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"/>
                  <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"/>
                </svg>
                <span slot="title">主页</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/test">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-star" width="20" height="20"
                   viewBox="0 0 24 24" stroke-width="1.5" stroke="#00abfb" fill="none" stroke-linecap="round"
                   stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path
                    d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"/>
              </svg>
              <span slot="title">加星</span>
            </el-menu-item>
            <el-menu-item index="/note/files">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-folder-minus" width="20"
                   height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#00abfb" fill="none"
                   stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M5 4h4l3 3h7a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2"/>
                <line x1="9" y1="13" x2="15" y2="13"/>
              </svg>
              <span slot="title">我的文件夹</span>
            </el-menu-item>
          </el-menu>
          <div class="workspace">
            <el-tree
                v-show="workspace.length!==0"
                ref="workspace"
                :data="workspace"
                :props="defaultProps"
                :expand-on-click-node="false"
                node-key="id"
                @node-click="handleNodeClick">
               <span class="custom-tree-node" slot-scope="{ node, data }">
                  <span v-show="!node.data.edit">
                    <el-image :src="require('@/assets/images/' + node.data.icon + '.png')"
                              style="padding-right: 5px;padding-top: 5px"></el-image>
                    <div style="float: right;margin-top: 5px">
                      {{ node.label }}
                    </div>
                  </span>
                     <el-input
                         ref="labelInput"
                         type="text"
                         v-model="workspaceLabel"
                         v-show="node.data.edit"
                         @focus="editing(node)"
                         @blur="hiddenInput(node)"
                     >
                     </el-input>
                   <span>
                  <el-dropdown trigger="click" placement="bottom-start">
                  <span class="el-dropdown-link">
                   <i class="el-icon-plus"></i>
                  </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>
                     <el-button
                         style="padding-right: 0;padding-left: 0"
                         type="text"
                         @click="() => append(data,node,'path')">
                      新建目录
                    </el-button>
                      </el-dropdown-item>
                      <el-dropdown-item>
                     <el-button
                         style="padding-right: 0;padding-left: 0"
                         type="text"
                         @click="() => append(data,node,'note')">
                      新建笔记
                    </el-button>
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>

                 <el-dropdown trigger="click" placement="bottom-start">
                  <span class="el-dropdown-link">
                   <i class="el-icon-more"></i>
                  </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>
                        <el-button
                            style="padding-right: 0;padding-left: 0"
                            type="text"
                            size="mini"
                            @click="() => remove(node, data)">
                          <span style="font-size: 14px">删除</span>
                        </el-button>
                      </el-dropdown-item>
                      <el-dropdown-item>新建文档</el-dropdown-item>
                      <el-dropdown-item>
                        <el-button
                            style="padding-right: 0;padding-left: 0"
                            type="text"
                            size="mini"
                            @click="rename(node)">
                          <span style="font-size: 14px">重命名</span>
                        </el-button>
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                  </span>
               </span>
            </el-tree>

            <div class="addWorkspace">
              <el-button type="text" @click="addWorkSpace"><i class="el-icon-plus el-icon--left"></i>添加工作区</el-button>
            </div>
            <div class="addWorkspace">
              <el-button type="text" @click="restore"><i class="el-icon-plus el-icon--left"></i>恢复</el-button>
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  name: "Aside",
  data() {
    return {
      dfa: "/home",
      activeNames: ['1'],
      src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
      fits: 'fill',
      filterText: '',
      workspaceLabel: '',
      expand: false,
      //只用操作一个数据，但是每次添加和删除都需要修改数据库里的信息;
      workspace: [],
      deleteNode: {
        isRoot: false,
        nodeIndex: 0,
        nodeData: {},
        parNode: null
      },
      defaultProps: {
        children: 'children',
        create_time: null,
        label: 'label',
        type: 'type',
        id: '',
        isEdit: false,
        icon: '',
      }
    }
  },
  computed: {
    ...mapState("displayModel", ['isDark']),
    ...mapState("editorNode", ['note'])
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
    $route() {
      this.menuItemClick()
    },
    note(val) {
      console.log(val)
      console.log(this.$refs.workspace.getNode(val.id))
      // this.$refs.workspace.getNode(val.data.id).data.label = val.data.label;
    }
  },
  methods: {
    handleNodeClick(data, node) {
      //console.log(JSON.stringify(this.workspace))
      if (data.type === 'note') {
        this.$router.push({
          name: 'richText',
          params: {data: data}
        })
      }
      // this.dfa = "/";
    },

    menuItemClick(index) {
      this.$router.push(index);
    },

    append(data, node, type) {
      node.expanded = true;
      let newChild = null;
      if (type === 'note') {
        newChild = {label: '无标题笔记', children: null, id: null, isEdit: true, type: 'note', icon: 'color_notepad'};
        this.$store.dispatch("editorNode/setNode", newChild)
      } else {
        newChild = {label: '新建文件夹', children: [], id: null, isEdit: true, type: 'path', icon: 'notebook'};
      }
      if (!data.children) {
        this.$set(data, 'children', []);
      }
      data.children.push(newChild);
      setTimeout(() => {
        this.$refs.labelInput.focus()
      },1000)
    },

    remove(node, data) {
      //console.log(node)
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      if (node.level === 1) {
        this.deleteNode.isRoot = true;
      } else {
        this.deleteNode.isRoot = false;
        this.deleteNode.parNode = parent;
      }
      this.deleteNode.nodeIndex = index;
      this.deleteNode.nodeData = node.data;
      children.splice(index, 1);
      // this.$axios({
      //   url: "http://localhost:8005/node",
      //   method: 'post',
      //   data: {
      //     "parent": this.deleteNode.parent,
      //     "nodeData": this.deleteNode.nodeData
      //   }
      // })
    },

    restore() {
      if (this.deleteNode.isRoot) {
        this.workspace.splice(this.deleteNode.nodeIndex, 0, this.deleteNode.nodeData)
      } else {
        this.$refs.workspace.getNode(this.deleteNode.parNode.data.id).data.children.push(this.deleteNode.nodeData)
      }
    },

    addWorkSpace() {
      this.workspace.push({
        label: '',
        type: 'workspace',
        id: null,
        create_time: null,
        children: [],
        isEdit: true,
        icon: 'notebook',
      },)
      setTimeout(() => {
        this.$refs.labelInput.focus()
      })
    },

    editing(node) {
      if (node.data.label !== '') {
        this.workspaceLabel = node.data.label;
      } else {
        this.workspaceLabel = "新工作区"
      }
      setTimeout(() => {
        this.$refs.labelInput.select()
      })
    },

    hiddenInput(node) {
      if (this.workspaceLabel === '') {
        this.$msgbox.confirm('命名不能为空', '系统提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          type: 'error'
        }).then(() => {
          setTimeout(() => {
            this.$refs.labelInput.focus()
          }, 12)
        })
      } else if (/^ [\s]*$/.test(this.workspaceLabel)) {
        this.$msgbox.confirm('命名不能为空', '系统提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          type: 'error'
        }).then(() => {
          setTimeout(() => {
            this.$refs.labelInput.focus()
            this.$refs.labelInput.select()
          }, 12)
        })
      } else {
        node.data.label = this.workspaceLabel;
        node.data.isEdit = false;
        let src = ''
        if (node.data.type === 'note') {
          src = 'http://localhost:8005/node'
          this.$store.dispatch("editorNode/setLabel", this.workspaceLabel);
          this.$router.push({
            path: '/note/editor',
            params: {data: node}
          })
        } else if (node.data.type === 'path') {
          src = 'http://localhost:8005/node'
        } else if (node.data.rename){
          src = 'http://localhost:8005/rename'
        } else {
          src = 'http://localhost:8005/workspace'
        }
        console.log(src)
        this.$axios({
          url: src,
          method: 'post',
          data: {
            "id": null,
            "create_time": src,
            "label": node.data.label,
            "type": node.data.type,
            "icon": node.data.icon,
            "edit": node.data.isEdit,
            "parentId": node.parent.data.id
          }
        }).then(res => {
          this.workspace = res.data
          node.data.rename = false
        })
      }
    },

    rename(node) {
      node.data.edit = true;
      node.data.rename = true;
      setTimeout(() => {
        this.$refs.labelInput.focus()
      },100)
    }
  },
  created() {
    this.$axios({
      url: "http://localhost:8005/getTree",
      method: 'get',
    }).then(res => {
      //console.log(res.data)
      this.workspace = res.data
    })
  },
  mounted() {

  }
}
</script>

<style scoped lang="scss">
@import "../assets/scss/common/common";

html, body {
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}

::-webkit-scrollbar {
  display: none;
}

.el-header:hover {
  outline: 0 !important;
  border-radius: 0.8em;
  @include font_color("aside_text-color");
  @include background_color("hover_background_color");
}

.el-menu .el-menu-item:hover {
  outline: 0 !important;
  @include font_color("aside_text-color");
  border-radius: 0.8em;
  @include background_color("hover_background_color");
}

.el-menu .el-menu-item.is-active {
  @include font_color("aside_text-color");
  border-radius: 0.8em;
  @include background_color("hover_background_color");
}

.el-menu, .el-menu-item, .el-tree {
  @include background_color("aside_color");
  @include font_color("aside_text-color");
  transition: background 1s, color 0.6s;
}

.el-header {
  width: 220px;
  margin-left: 10px;
}

.header {
  .el-image {
    margin-left: 5px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  float: left;
  margin-top: 20px;
  margin-left: 20px
}

.el-menu-item {
  height: 50px;
  margin-left: 10px;
  width: 220px;
  margin-top: 5px;
}

.menu {
  margin-top: 10px;
  height: 87.3vh;
}

.el-menu {
  width: 240px;
}

.el-main, .el-header {
  padding: 0;
}

::v-deep .el-tree-node:focus > .el-tree-node__content {
  background: #e7ebed;
  border-radius: 0.8em;
}

::v-deep .el-tree-node__content:hover {
  border-radius: 0.8em;
  background: #e7ebed;
  transition: background 1s, color 0.6s;
}

::v-deep .el-tree-node__content {
  margin-top: 5px;
  margin-left: 10px;
  height: 50px;
}

.el-dropdown-menu {
  @include background_color("aside_color");
  @include font_color("aside_text-color");
}

.el-dropdown-menu__item:hover {
  @include font_color("aside_text-color");
  @include background_color("hover_background_color");
}

.el-tree {
  width: 95%;
}

.el-icon-plus:hover, .el-icon-more:hover {
  background-color: white;
  border-radius: 0.4em;
}

.el-icon-more, .el-icon-plus {
  padding: 5px;
}

.addWorkspace:hover {
  @include font_color("aside_text-color");
  border-radius: 0.8em;
  @include background_color("hover_background_color");
}

.addWorkspace {
  width: 220px;
  margin-left: 10px;
  transition: background 1s, color 0.6s;
}

.el-button--text {
  padding-left: 20px;
  padding-right: 20px;
  @include font_color("aside_text-color");
}

.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}

svg {
  padding-right: 10px;
}
</style>