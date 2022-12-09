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
            <el-menu-item index="/home">
              <template slot="title">
                <i class="el-icon-s-home"></i>
                <span slot="title">主页</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/test">
              <i class="el-icon-star-off"></i>
              <span slot="title">加星</span>
            </el-menu-item>
            <el-menu-item index="editor">
              <i class="el-icon-folder"></i>
              <span slot="title">我的文件夹</span>
            </el-menu-item>
          </el-menu>
          <div class="workspace">
            <el-tree
                ref="workspace"
                :data="workspace"
                :props="defaultProps"
                :expand-on-click-node="false"
                node-key="tag"
                @node-click="handleNodeClick">
               <span class="custom-tree-node" slot-scope="{ node, data }">
                  <span>{{ node.label }}</span>
                   <span>
                    <el-button
                        style="padding-right: 0;padding-left: 0"
                        type="text"
                        @click="() => append(data,node.parent)">
                      <i class="el-icon-plus el-icon--left"></i>
                    </el-button>
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
                    </el-dropdown-menu>
                  </el-dropdown>
                  </span>
               </span>
            </el-tree>

            <div class="addWorkspace">
              <el-button type="text" @click="addWorkSpace"><i class="el-icon-plus el-icon--left"></i>添加工作区</el-button>
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

let id = 1000;
export default {
  name: "Aside",
  data() {
    return {
      dfa: "/home",
      activeNames: ['1'],
      src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
      fits: 'fill',
      filterText: '',
      dist: 'Docker/Docker.doc',
      //只用操作一个数据，但是每次添加和删除都需要修改数据库里的信息;
      workspace: [],
      deleteNode: {
        parent: {},
        nodeData: {}
      },
      defaultProps: {
        children: 'children',
        label: 'label',
        type: 'type',
        tag: ''
      }
    }
  },
  computed: {...mapState("displayModel", ['isDark'])},
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
    $route() {
      this.menuItemClick()
    }
  },
  methods: {
    handleNodeClick(data, node) {
      this.dfa = "/";
      // console.log(this.$refs.workspace.getCurrentKey())
      // console.log(data.tag)
      // console.log(data);
      //console.log(node);
      // console.log(this.$refs.workspace.getCurrentNode().type)
      // console.log(JSON.stringify(this.workspace))
    },
    menuItemClick(index) {
      this.$router.replace(index);
    },
    append(data, parentNode) {
      console.log(data)
      const uuid = Math.random().toString()
      const newChild = {label: '新页面', children: [], nodeKey: uuid};
      if (!data.children) {
        this.$set(data, 'children', []);
      }
      data.children.push(newChild);
    },

    remove(node, data) {
      const parent = node.parent;
      this.deleteNode.parent = node.parent.data;
      this.deleteNode.nodeData = node.data;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
      //console.log(this.deleteNode)
      //console.log(this.$refs.workspace.getCurrentKey())
      this.$axios({
        url: "http://localhost:8005/node",
        method: 'post',
        data: {
          "parent": this.deleteNode.parent,
          "nodeData": this.deleteNode.nodeData
        }
      })
    },

    restore() {
      const resParent = this.deleteNode.parent;
      const resData = this.deleteNode.nodeData;
      console.log(resParent)
      // console.log(this.$refs.workspace.getNode(resParent).data.children)
      this.$refs.workspace.getNode(resParent).data.children.push(resData)
    },

    addWorkSpace() {
      this.workspace.push({
        label: 'workspace1',
        children: []
      },)
      console.log(this.workspace)
    }
  },
  created() {
    this.workspace = [
      {
        label: 'workspace1',
        type: 'path',
        tag: '5231',
        children: [{
          label: "新页面",
          type: 'path',
          tag: '5813',
          children: [{
            label: "新页面",
            type: 'note',
            tag: '8521',
          }]
        }]
      },
    ]
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
  background: #e7ebed !important;
}

.el-menu .el-menu-item:hover {
  outline: 0 !important;
  @include font_color("aside_text-color");
  border-radius: 0.8em;
  background: #e7ebed !important;
}

::v-deep .el-menu .el-menu-item.is-active {
  @include font_color("aside_text-color");
  border-radius: 0.8em;
  background: #e7ebed !important;
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

.el-image {
  margin-left: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.el-main, .el-header {
  padding: 0;
}

::v-deep .el-tree-node:focus > .el-tree-node__content {
  .el-menu .el-menu-item.is-active {
    @include font_color("aside_text-color");
    @include background_color("aside_color");
  }

  @include font_color("aside_text-color");
  border-radius: 0.8em !important;
  background: #e7ebed !important;
}

::v-deep .el-tree-node__content:hover {
  @include font_color("aside_text-color");
  border-radius: 0.8em !important;
  background: #e7ebed !important;
  transition: background 1s, color 0.6s;
}

::v-deep .el-tree-node__content {
  margin-left: 10px;
  height: 50px !important;
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
  background: #e7ebed !important;
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
</style>