<template>
  <div>
    <el-container>
      <el-header height="80px">
        <div class="header">
          <el-dropdown trigger="click" placement="bottom">
                  <span class="el-dropdown-link">
                    <el-image :src="userInfo.headImage">
                      <div slot="error">
                       <el-image :src="require('../assets/images/defaultHeadImg.png')" style="margin-left: 5px;width: 45px;height: 45px;border-radius: 50%;"></el-image>
                      </div>
                    </el-image>
                      <div class="header-text" style="float: right;margin-left: 20px;margin-top: 0;line-height: 25px">
                        <span>{{user.nickname}}</span>
                        <br/>
                        <span>{{ user.email }}</span>
                      </div>
                  </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item style="width: 150px">
                <el-button
                    style="padding-right: 0;padding-left: 0"
                    type="text"
                    >
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-home" width="15" height="15" viewBox="0 0 24 24" stroke-width="1.6" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round" style="padding-right: 5px">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <polyline points="5 12 3 12 12 3 21 12 19 12" />
                    <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                    <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
                  </svg>
                 <span>个人主页</span>
                </el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button
                    style="padding-right: 0;padding-left: 0"
                    type="text"
                    >
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-settings" width="15" height="15" viewBox="0 0 24 24" stroke-width="1.6" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round" style="padding-right: 5px">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  <span>设置</span>
                </el-button>
              </el-dropdown-item>
              <el-divider></el-divider>
              <el-dropdown-item>
                <el-button
                    style="padding-right: 0;padding-left: 0"
                    type="text"
                    @click="()=> this.dialog = true">
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user" width="15" height="15" viewBox="0 0 24 24" stroke-width="1.6" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round" style="padding-right: 5px">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <circle cx="12" cy="7" r="4" />
                    <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                  </svg>
                  <span>个人信息</span>
                </el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button
                    style="padding-right: 0;padding-left: 0"
                    type="text"
                    @click="changeModel(!isDark)"
                    >
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-palette" width="15" height="15" viewBox="0 0 24 24" stroke-width="1.6" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round" style="padding-right: 5px">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <path d="M12 21a9 9 0 1 1 0 -18a9 8 0 0 1 9 8a4.5 4 0 0 1 -4.5 4h-2.5a2 2 0 0 0 -1 3.75a1.3 1.3 0 0 1 -1 2.25" />
                  <circle cx="7.5" cy="10.5" r=".5" fill="currentColor" />
                  <circle cx="12" cy="7.5" r=".5" fill="currentColor" />
                  <circle cx="16.5" cy="10.5" r=".5" fill="currentColor" />
                </svg>
                  <span>切换主题</span>
                </el-button>
              </el-dropdown-item>
              <el-divider></el-divider>
              <el-dropdown-item>
                <el-button
                    style="padding-right: 0;padding-left: 0"
                    type="text"
                    >
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-logout" width="15" height="15" viewBox="0 0 24 24" stroke-width="1.6" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round" style="padding-right: 5px">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                    <path d="M7 12h14l-3 -3m0 6l3 -3" />
                  </svg>
                  <span>退出登录</span>
                </el-button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-dialog
              title="个人信息"
              :visible.sync="dialog"
              :close-on-click-modal="false"
              :before-close="cancel"
              width="30%">
            <div style="margin-bottom: 25px">
              <span style="position: absolute;top: 22%">头像</span>
              <el-image :src="userInfo.headImage" style="margin-left: 40px">
                <div slot="error">
                  <el-image :src="require('../assets/images/defaultHeadImg.png')" style="margin-left: 5px;width: 45px;height: 45px;border-radius: 50%;"></el-image>
                </div>
              </el-image>
              <el-upload
                  class="upload"
                  action="http://localhost:9200/file/headImage"
                  name="img"
                  :headers="headerObj"
                  accept=".jpg,.jpeg,.png"
                  :on-success="uploadSuccess"
                  :data="{'uid':this.user.id}"
                  :show-file-list="false">
                <el-button size="mini" round>上传新头像</el-button>
                <div slot="tip" class="el-upload__tip" style="font-size: 3px;margin-top: 4px">支持JPG、PNG、GIF格式</div>
              </el-upload>
            </div>
            <div style="margin-bottom: 25px;">
              <span>账号</span>
              <div style="float: right;margin-right: 65%">
                <span>{{user.email}}</span>
              </div>
            </div>
            <el-form label-position="left" label-width="80px" :model="userInfo">
              <el-form-item label="昵称">
                <el-input v-model="nickname"></el-input>
              </el-form-item>
              <el-form-item label="简介">
                <el-input
                    type="textarea"
                    placeholder="最多可输入50个字"
                    v-model="introduce"
                    maxlength="50"
                    show-word-limit
                    resize="none"
                ></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="cancel">取 消</el-button>
              <el-button type="primary" @click="saveInfo">保 存</el-button>
            </span>
          </el-dialog>
        </div>
      </el-header>
      <el-main>
        <div class="menu">
          <el-menu
              ref="menu"
              @select="menuItemClick"
              :default-active="dfa"
          >
            <el-menu-item index="/note/workspace/1">
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
            <el-menu-item index="/note/starFile">
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
                :highlight-current="true"
                :expand-on-click-node="true"
                node-key="id"
                @node-click="handleNodeClick">
               <span class="custom-tree-node" slot-scope="{ node, data }">
                  <span v-show="!node.data.edit">
                    <el-image :src="require('@/assets/images/' + node.data.icon + '.png')"
                              style="padding-right: 5px;padding-top: 5px;width: 20px;height: 20px"></el-image>
                    <div style="float: right;margin-top: 5px" v-if="!node.data.isEdit">
                      {{ node.label }}
                    </div>
                  </span>
                     <el-input
                         ref="labelInput"
                         type="text"
                         v-model="workspaceLabel"
                         v-if="node.data.isEdit"
                         @focus="editing(node)"
                         @blur="hiddenInput(node)"
                     >
                     </el-input>
                   <span>
                  <el-dropdown trigger="hover" placement="bottom-start">
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

                 <el-dropdown trigger="hover" placement="bottom-start">
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
          </div>
          <div class="aside-footer">
            <div class="addWorkspace">
              <el-button type="text" @click="restore">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-share" width="15" height="15" viewBox="0 0 24 24" stroke-width="1.5" stroke="#00abfb" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="6" r="3" />
                <circle cx="18" cy="18" r="3" />
                <line x1="8.7" y1="10.7" x2="15.3" y2="7.3" />
                <line x1="8.7" y1="13.3" x2="15.3" y2="16.7" />
              </svg>
                <span>分享</span>
              </el-button>
            </div>
            <div class="addWorkspace">
              <el-button type="text" @click="restore">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-recycle" width="15" height="15" viewBox="0 0 24 24" stroke-width="1.5" stroke="#00abfb" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <path d="M12 17l-2 2l2 2m-2 -2h9a2 2 0 0 0 1.75 -2.75l-.55 -1" />
                  <path d="M12 17l-2 2l2 2m-2 -2h9a2 2 0 0 0 1.75 -2.75l-.55 -1" transform="rotate(120 12 13)" />
                  <path d="M12 17l-2 2l2 2m-2 -2h9a2 2 0 0 0 1.75 -2.75l-.55 -1" transform="rotate(240 12 13)" />
                </svg>
                <span>回收站</span>
              </el-button>
            </div>
            <div class="addWorkspace">
              <el-button type="text">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-settings" width="15" height="15" viewBox="0 0 24 24" stroke-width="1.5" stroke="#00abfb" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                <span>设置</span>
              </el-button>
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import {mapState,mapActions} from 'vuex';
import axios from "axios";

export default {
  name: "Aside",
  data() {
    return {
      dfa: "/note/workspace",
      activeNames: ['1'],
      src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
      headerObj:{'Authorization':localStorage.getItem('token')},
      fits: 'fill',
      filterText: '',
      workspaceLabel: '',
      expand: false,
      dialog: false,
      user:{},
      userInfo:{},
      nickname:'',
      introduce:'',
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
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
    $route(to) {
      this.menuItemClick(to)
    },
  },
  methods: {
    ...mapActions('displayModel',['changeModel']),

    handleNodeClick(data, node) {
      this.dfa = '/'
      if (data.type === 'note') {
        this.$router.push({
          path: `/notes/${data.id}`,
          params: {"id":data.id}
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
        newChild = {label: '新建文件夹', children: [], id: null, isEdit: true, type: 'folder', icon: 'notebook'};
      }
      if (!data.children) {
        this.$set(data, 'children', []);
      }
      data.children.push(newChild);
      setTimeout(() => {
        this.$refs.labelInput.focus()
      },12)
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
      this.$axios({
        url: `/note/remove/${data.id}`,
        method: 'delete',
      }).then(()=>{
        this.$bus.$emit("refresh")
      })
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
      },12)
    },

    rename(node) {
      node.data.isEdit = true;
      node.data.rename = true;
      setTimeout(() => {
        this.$refs.labelInput.focus()
      },12)
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
        let src = '';
        let data = {};
        if (node.data.type === 'note' && !node.data.rename) {
          src = '/note/addNote'
          data={
            "id": null,
            "create_time": null,
            "label": node.data.label,
            "type": node.data.type,
            "icon": node.data.icon,
            "isEdit": node.data.isEdit,
            "parentId": node.parent.data.id,
            "uid": localStorage.getItem("uid")
          }
        } else if (!node.data.rename) {
          src = '/note/addWorkspace'
          data={
            "id": null,
            "create_time": null,
            "label": node.data.label,
            "type": node.data.type,
            "icon": node.data.icon,
            "isEdit": node.data.isEdit,
            "parentId": node.parent.data.id,
            "uid": localStorage.getItem("uid")
          }
        } else if (node.data.rename){
          src = "/note/rename"
          data={
            "id": node.data.id,
            "label": node.data.label,
          }
        }
        this.$axios({
          url: src,
          method: 'post',
          data: data
        }).then(res => {
          node.data.rename = false
          this.$bus.$emit("refresh")
          if (node.data.type==='note'){
            this.$bus.$emit("resetTitle",node.data.label)
          }
        })
      }
    },

    uploadSuccess(response,file,fileList){
      this.userInfo.headImage = response.data
      console.log(response)
      console.log(file)
      console.log(fileList)
    },

    saveInfo(){
      this.$axios({
        url: "/auth/saveInfo",
        method: 'post',
        params:{
          "uid": Number(localStorage.getItem("uid")),
          "nickname": this.nickname,
          "introduce": this.introduce
        }
      }).then(res => {
        this.user = res.data.data.user
        this.userInfo = res.data.data.userinfo
        this.dialog = false;
        this.$message({
          message: '修改成功',
          type: 'success'
        })
      },() => {
        this.$message({
          message: '修改失败',
          type: 'error'
        })
      })
    },
    cancel(){
      this.dialog = false
      this.nickname = this.user.nickname
      this.introduce = this.userInfo.introduce
    }
  },
  created() {
    this.$axios.all([
        this.$axios({
          url: `/note/getTree`,
          method: 'get',
          params:{
            "uid": Number(localStorage.getItem("uid"))
          }
        }),
        this.$axios({
          url: `/auth/getUser`,
          method: 'post',
          params:{
            "uid": Number(localStorage.getItem("uid"))
          }
        })
    ]).then(axios.spread((data1,data2)=>{
      this.workspace = data1.data.data
      this.user = data2.data.data.user
      this.userInfo = data2.data.data.userinfo
      this.nickname = data2.data.data.user.nickname
      this.introduce = data2.data.data.userinfo.introduce
    }))
  },
  mounted() {
    this.$bus.$on("refreshAside",()=>{
      this.$axios({
        url: `/note/getTree`,
        method: 'get',
        params:{
          "uid": Number(localStorage.getItem("uid"))
        }
      }).then(res=>{
        this.workspace = res.data.data
      })
    })
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
  //@include font_color("aside_text-color");
  //border-radius: 0.8em;
  //@include background_color("hover_background_color");
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

//::v-deep .el-tree-node:focus > .el-tree-node__content {
//  background: #e7ebed;
//  border-radius: 0.8em;
//}

.workspace{
  ::v-deep .el-tree-node__content:hover {
    border-radius: 0.8em;
    @include background_color("hover_background_color");
    transition: background 1s, color 0.6s;
  }
}

::v-deep .el-tree-node__content {
  margin-top: 5px;
  margin-left: 10px;
  height: 50px;
}

.workspace{
  ::v-deep .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content{
    @include background_color("hover_background_color");
    border-radius: 0.8em;
    transition: background 1s, color 0.6s;
  }
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

.aside-footer{
  position: absolute;
  top: 80%;
}
.workspace{
  height: 300px;
  display: block;
  overflow-y: scroll;
}
::v-deep .el-divider--horizontal{
  margin: 0;
}
.upload{
  position: absolute;
  left: 28%;
  top: 15%;
}
::v-deep .el-form-item__content{
  line-height: 25px;
  margin-left: 40px!important;
}
::v-deep .el-form-item__label{
  width: 40px!important;
}
::v-deep .el-textarea__inner{
  min-height: 80px!important;
}
.header-text{
  @include font_color("aside_text-color");
}
.el-dropdown-menu__item{
  svg{
    @include svg_color("text-color")
  }
}
</style>
