<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <el-container>
          <el-header height="80px">
            <div style="float: left;margin-top: 20px;">
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
                  default-active="1"
              >
                <el-menu-item index="1">
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

                  <el-dropdown trigger="click" placement="bottom-start">
                  <span class="el-dropdown-link">
                   <i class="el-icon-more"></i>
                  </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>新建文件夹</el-dropdown-item>
                      <el-dropdown-item>新建文档</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </el-menu-item>
              </el-menu>
            </div>
          </el-main>
        </el-container>
      </el-aside>
      <el-main>
        <div class="secondAside">
          <el-input
              placeholder="输入关键字进行过滤"
              style="width: 180px;margin-top: 10px"
              v-model="filterText">
          </el-input>
          <el-tree
              :data="data"
              node-key="id"
              :filter-node-method="filterNode"
              :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button
              type="text"
              size="mini"
              @click="() => append(data)">
            Append
          </el-button>
          <el-button
              type="text"
              size="mini"
              @click="() => remove(node, data)">
            Delete
          </el-button>
        </span>
      </span>
          </el-tree>
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
      activeNames: ['1'],
      src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
      fits: 'fill',
      filterText: '',
      dist:'Docker/Docker.doc',
      data: [{
        id: 1,
        label: '一级 1',
        type:'folder',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }, {
            label: '三级 1-1-2'
          }]
        }]
      },],
      defaultProps: {
        children: 'children',
        label: 'label',
        type:'type',
      }
    }
  },
  computed: {...mapState("displayModel", ['isDark'])},
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
    $route(){
      this.menuItemClick()
    }
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    menuItemClick(index) {
      this.$router.replace(index);
    },
    append(data) {
      const newChild = { id: id++, label: 'testtest', children: [] };
      if (!data.children) {
        this.$set(data, 'children', []);
      }
      data.children.push(newChild);
    },

    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    },
  },
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

.el-menu .el-menu-item:hover {
  outline: 0 !important;
  color: #5b89fe !important;
  background: #C0C4CC !important;
}

::v-deep .el-menu .el-menu-item.is-active {
  color: #5b89fe !important;
  background: #C0C4CC !important;
}

.el-menu, .el-menu-item, {
  @include background_color("aside_color");
  @include font_color("aside_text-color");
  transition: background 1s, color 0.6s;
}

.secondAside {
  border-right: 2px solid #e4e8ec;
  text-align: center;
  background-color: white;
  position: absolute;
  left: 200px;
  width: 200px;
  height: 713px;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  @include background_color("background_color");
  @include font_color("aside_text-color");
  transition: background 1s, color 0.6s;
}

.filter-tree {
  padding-left: 15px;
  width: 180px;
  margin-top: 20px;
  @include background_color("background_color");
  @include font_color("aside_text-color");
  transition: background 1s, color 0.6s;
}

.filter-tree::v-deep .el-tree-node__content:hover {
  outline: 0 !important;
  color: #5b89fe !important;
  background: #C0C4CC !important;
}

.menu {
  height: 88.8vh;
}

.el-menu {
  width: 200px;
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

.el-submenu__title {
  padding-left: 30px !important;
}

.el-menu-item:last-child:hover{
  .el-dropdown{
    visibility: visible;
    float: right;
  }
}

.el-dropdown{
  visibility: hidden;
  float: right;
}

.el-icon-more:hover{
  background-color: #e1e6ed;
  border-radius: 0.4em;
}
</style>