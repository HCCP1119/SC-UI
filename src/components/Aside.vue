<template>
  <div>
    <el-container>
      <el-header height="80px">
        <div class="header">
          <el-dropdown trigger="click" placement="bottom">
                  <span class="el-dropdown-link">
                    <el-image :src="userInfo.headImage">
                      <div slot="error">
                       <el-image :src="require('../assets/images/defaultHeadImg.png')"
                                 style="margin-left: 5px;width: 45px;height: 45px;border-radius: 50%;"></el-image>
                      </div>
                    </el-image>
                      <div class="header-text">
                        <span>{{user.nickname}}</span>
                        <br>
                        <span>{{user.email}}</span>
                      </div>
                  </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item style="width: 150px">
                <el-button
                    style="padding-right: 0;padding-left: 0"
                    type="text"
                    @click="()=> this.dialog = true">
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user" width="15"
                       height="15" viewBox="0 0 24 24" stroke-width="1.6" stroke="#000000" fill="none"
                       stroke-linecap="round" stroke-linejoin="round" style="padding-right: 5px">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <circle cx="12" cy="7" r="4"/>
                    <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"/>
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
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-palette" width="15"
                       height="15" viewBox="0 0 24 24" stroke-width="1.6" stroke="#000000" fill="none"
                       stroke-linecap="round" stroke-linejoin="round" style="padding-right: 5px">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path
                        d="M12 21a9 9 0 1 1 0 -18a9 8 0 0 1 9 8a4.5 4 0 0 1 -4.5 4h-2.5a2 2 0 0 0 -1 3.75a1.3 1.3 0 0 1 -1 2.25"/>
                    <circle cx="7.5" cy="10.5" r=".5" fill="currentColor"/>
                    <circle cx="12" cy="7.5" r=".5" fill="currentColor"/>
                    <circle cx="16.5" cy="10.5" r=".5" fill="currentColor"/>
                  </svg>
                  <span>切换主题</span>
                </el-button>
              </el-dropdown-item>
              <el-divider></el-divider>
              <el-dropdown-item style="width: 150px">
                <el-button
                    style="padding-right: 0;padding-left: 0"
                    type="text"
                    @click="()=>this.$router.push('/note/setting/info')"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-settings" width="15"
                       height="15" viewBox="0 0 24 24" stroke-width="1.6" stroke="#000000" fill="none"
                       stroke-linecap="round" stroke-linejoin="round" style="padding-right: 5px">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path
                        d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                  <span>设置</span>
                </el-button>
              </el-dropdown-item>
              <el-divider></el-divider>
              <el-dropdown-item>
                <el-button
                    style="padding-right: 0;padding-left: 0"
                    @click="logout"
                    type="text"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-logout" width="15"
                       height="15" viewBox="0 0 24 24" stroke-width="1.6" stroke="#000000" fill="none"
                       stroke-linecap="round" stroke-linejoin="round" style="padding-right: 5px">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"/>
                    <path d="M7 12h14l-3 -3m0 6l3 -3"/>
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
                  <el-image :src="require('../assets/images/defaultHeadImg.png')"
                            style="margin-left: 5px;width: 45px;height: 45px;border-radius: 50%;"></el-image>
                </div>
              </el-image>
              <el-upload
                  class="upload"
                  action="http://192.168.1.129:9200/file/headImage"
                  name="img"
                  :headers="headerObj"
                  accept=".jpg,.jpeg,.png"
                  :on-success="uploadSuccess"
                  :data="{'':this.user.id}"
                  :show-file-list="false">
                <el-button size="mini" round>上传新头像</el-button>
                <div slot="tip" class="el-upload__tip" style="font-size: 3px;margin-top: 4px">支持JPG、PNG、GIF格式</div>
              </el-upload>
            </div>
            <div style="margin-bottom: 25px;">
              <span>账号</span>
              <div class="account" style="float: right;margin-right: 43%">
                <el-input :value="user.email"></el-input>
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
          >
            <el-menu-item index="/note/workspace/list">
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
            <el-menu-item index="/note/starNote">
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
                  <div class="node-label" v-show="!node.data.isEdit">
                    <el-image :src="require('@/assets/images/' + node.data.icon + '.png')"
                              style="padding-right: 8px;padding-top: 5px;width: 20px;height: 20px"></el-image>
                      <span style="" v-if="!node.data.isEdit">{{ node.label }}</span>
                  </div>
                     <el-input
                         style="padding-left: 5px"
                         ref="labelInput"
                         type="text"
                         v-model="workspaceLabel"
                         v-if="node.data.isEdit"
                         @focus="editing(node)"
                         @blur="hiddenInput(node)"
                     >
                     </el-input>
                   <span>
                     <div class="dropdown">
                       <el-dropdown v-if="node.data.type!=='note'" trigger="hover" placement="bottom-start">
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
                      <el-dropdown-item v-if="node.data.type==='note'">
                        <el-button
                            style="padding-right: 0;padding-left: 0"
                            type="text"
                            size="mini"
                            @click="() => shared(data.id)">
                          <span style="font-size: 14px">分享</span>
                        </el-button>
                      </el-dropdown-item>
                      <el-dropdown-item v-if="node.data.type==='note'">
                        <el-button
                            style="padding-right: 0;padding-left: 0"
                            type="text"
                            size="mini"
                            @click="() => stared(data.id)">
                          <span style="font-size: 14px">加星</span>
                        </el-button>
                      </el-dropdown-item>
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
                     </div>
                  </span>
               </span>
            </el-tree>
            <div class="addWorkspace">
              <el-button type="text" @click="addWorkSpace"><i class="el-icon-plus el-icon--left"></i>添加工作区</el-button>
            </div>
          </div>
          <div class="aside-footer">
            <div>
              <el-menu
                  ref="menu"
                  @select="menuItemClick"
              >
                <el-menu-item index="/note/share">
                  <template slot="title">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-share" width="20"
                         height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#00abfb" fill="none"
                         stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                      <circle cx="6" cy="12" r="3"/>
                      <circle cx="18" cy="6" r="3"/>
                      <circle cx="18" cy="18" r="3"/>
                      <line x1="8.7" y1="10.7" x2="15.3" y2="7.3"/>
                      <line x1="8.7" y1="13.3" x2="15.3" y2="16.7"/>
                    </svg>
                    <span slot="title">分享</span>
                  </template>
                </el-menu-item>
                <el-menu-item index="/note/trash">
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-recycle" width="20"
                       height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#00abfb" fill="none"
                       stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M12 17l-2 2l2 2m-2 -2h9a2 2 0 0 0 1.75 -2.75l-.55 -1"/>
                    <path d="M12 17l-2 2l2 2m-2 -2h9a2 2 0 0 0 1.75 -2.75l-.55 -1" transform="rotate(120 12 13)"/>
                    <path d="M12 17l-2 2l2 2m-2 -2h9a2 2 0 0 0 1.75 -2.75l-.55 -1" transform="rotate(240 12 13)"/>
                  </svg>
                  <span slot="title">回收站</span>
                </el-menu-item>
                <el-menu-item index="/note/setting/info">
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-settings" width="20"
                       height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#00abfb" fill="none"
                       stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path
                        d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                  <span slot="title">设置</span>
                </el-menu-item>
              </el-menu>
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import axios from "axios";

export default {
  name: "Aside",
  data() {
    return {
      headerObj: {'satoken': localStorage.getItem('token')},
      workspaceLabel: '',
      expand: false,
      dialog: false,
      user: {},
      //个人信息
      userInfo: {},
      nickname: '',
      introduce: '',
      //工作区树形结构
      workspace: [],
      //树形数据默认属性
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
    $route(to) {
      this.menuItemClick(to)
    },
  },
  methods: {
    ...mapActions('displayModel', ['changeModel']),

    //树形节点点击事件
    handleNodeClick(data) {
      if (data.type === 'note') {
        const reg = RegExp(/null/);
        if (!reg.test(data.id)){
          this.$router.push({
            path: `/notes/${data.id}`,
          })
        }
      }
    },

    //菜单点击事件
    menuItemClick(index) {
      const reg = RegExp(/null/);
      if (!reg.test(index.fullPath)){
        this.$router.push(index);
      }
    },

    //添加子节点
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
      }, 12)
    },

    //删除树形节点
    remove(node, data) {
      //console.log(node)
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
      this.$axios({
        url: `/note/remove/${data.id}`,
        method: 'delete',
      }).then(() => {
        this.$bus.$emit("WorkspaceRefresh")
        this.$bus.$emit("TrashRefresh")
        this.$bus.$emit("ShareRefresh")
        if (data.type==='note'){
          this.$router.push('/note/trash')
        }
      })
    },

    //添加跟节点
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
      }, 12)
    },

    //节点重命名
    rename(node) {
      node.data.isEdit = true;
      node.data.rename = true;
      setTimeout(() => {
        this.$refs.labelInput.focus()
      }, 12)
    },

    //节点input获取焦点事件
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

    //节点input失去焦点事件
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
          data = {
            "id": null,
            "create_time": null,
            "label": node.data.label,
            "type": node.data.type,
            "icon": node.data.icon,
            "isEdit": node.data.isEdit,
            "parentId": node.parent.data.id,
            "uid": this.user.id
          }
        } else if (!node.data.rename) {
          src = '/note/addWorkspace'
          data = {
            "id": null,
            "create_time": null,
            "label": node.data.label,
            "type": node.data.type,
            "icon": node.data.icon,
            "isEdit": node.data.isEdit,
            "parentId": node.parent.data.id,
            "uid": this.user.id
          }
        } else if (node.data.rename) {
          src = "/note/rename"
          data = {
            "id": node.data.id,
            "label": node.data.label,
            "type": node.data.type
          }
        }
        this.$axios({
          url: src,
          method: 'post',
          data: data
        }).then(res => {
          node.data.id = res.data.data
          if (node.data.rename && node.data.type === 'note'){
              this.$bus.$emit("resetTitle", node.data.label)
          }
          node.data.rename = false
          this.$bus.$emit("WorkspaceRefresh")
          const reg = RegExp(/null/);
          if (node.data.type==='note' && !reg.test(node.data.id)){
            this.$router.push({
              path: `/notes/${res.data.data}`,
            })
          }
        })
      }
    },

    //笔记加星
    stared(id){
      this.$axios({
        url: `/note/star/stared/${id}`,
        method: 'post'
      }).then(() => {
        this.$bus.$emit("StarNoteRefresh")
      })
    },

    //分享
    shared(id){
      this.$axios({
        url: `/note/share/shared/${id}`,
        method: 'post'
      }).then(() => {
        this.$bus.$emit("ShareRefresh")
        this.$message({
          message: '分享成功',
          type: 'success'
        })
      })
    },

    //用户头像上传成功回调
    uploadSuccess(response, file, fileList) {
      this.userInfo.headImage = response.data
      console.log(response)
      console.log(file)
      console.log(fileList)
    },

    //保存用户信息
    saveInfo() {
      this.$axios({
        url: "/users/saveInfo",
        method: 'post',
        params: {
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
      }, () => {
        this.$message({
          message: '修改失败',
          type: 'error'
        })
      })
    },

    //用户信息对话框关闭前回调
    cancel() {
      this.dialog = false
      this.nickname = this.user.nickname
      this.introduce = this.userInfo.introduce
    },

    //退出登录
    logout(){
      this.$axios({
        url: '/logout',
        method: 'post'
      }).then(res => {
        if (res.data.code===200){
          localStorage.removeItem("token")
          localStorage.removeItem("uid")
          this.$router.push("/")
        }
      })
    }
  },
  created() {
    this.$axios.all([
      this.$axios({
        url: `/note/getTree`,
        method: 'get',
      }),
      this.$axios({
        url: `/users/getUser`,
        method: 'get',
      })
    ]).then(axios.spread((data1, data2) => {
      if (data1.data.code===200){
        this.workspace = data1.data.data
      }
      if (data2.data.code===200){
        this.user = data2.data.data.user
        this.userInfo = data2.data.data.userinfo
        this.nickname = data2.data.data.user.nickname
        this.introduce = data2.data.data.userinfo.introduce
      }
    }))
  },
  mounted() {
    this.$bus.$on("AsideRefresh", () => {
      this.$axios({
        url: `/note/getTree`,
        method: 'get',
      }).then(res => {
        this.workspace = res.data.data
      })
    })
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/Aside";
</style>
