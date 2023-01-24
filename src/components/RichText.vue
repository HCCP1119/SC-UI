<template>
  <div class="editor">
    <div style="flex: auto">
      <el-input
          placeholder="请输入标题"
          v-model="title"
          @blur="saveTitle"
      >
      </el-input>
      <el-button style="position: fixed;right: 110px;margin-top: 2px" @click="save" size="medium" :loading="saveLoading">保存</el-button>
      <el-button style="position: fixed;right: 30px;margin-top: 2px" type="primary" size="medium">分享</el-button>
    </div>
    <Toolbar
        class="tool"
        style="border-bottom: 3px solid #f9fafb"
        :editor="editor"
        :defaultConfig="toolbarConfig"
        :mode="mode"
    />
    <Editor
        v-loading="loading"
        class="main"
        style="height: 550px; overflow-y: hidden;"
        v-model="html"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="onCreated"
    />
  </div>
</template>

<script>
import {Editor, Toolbar} from '@wangeditor/editor-for-vue'
import {Boot} from '@wangeditor/editor'
import markdownModule from '@wangeditor/plugin-md'
import axios from "axios";


Boot.registerModule(markdownModule);

export default {
  name: "richText",
  components: {
    Editor, Toolbar,
  },
  data() {
    return {
      editor: null,
      loading: true,
      saveLoading: false,
      noteId: '',
      title: '',
      html: '',
      toolbarConfig: {
        excludeKeys: [
          "fullScreen",
          "lineHeight",
          "group-indent",
          "group-video",
        ],
      },
      editorConfig: {
        placeholder: '请输入内容...',
        autoFocus: false,
        MENU_CONF: {
          uploadImage: {
            server: 'http://localhost:9200/file/noteImage',
            headers: {
              'satoken': localStorage.getItem("token")
            },
            fieldName: 'img',
            maxImgSize: 5 * 1024 * 1024,
            allowedFileTypes: ['image/*'],
            //自定义插入
            customInsert(res, insertFn) {
              if (res.code === 200) {
                insertFn(res.data)
              } else {
                this.$message({
                  message: '图片上传失败',
                  type: 'error'
                })
              }
            }
          }
        },
      },
      mode: 'default', // or 'simple',
      removeImgList: [],
    }
  },

  watch: {
    $route(to) {
      const id = (to.path).substring((to.path).lastIndexOf("/") + 1)
      this.$axios({
        url: `/note/getNote/${id}`,
        method: 'get'
      }).then(res => {
        this.title = res.data.data.title
        this.html = res.data.data.content
        this.noteId = res.data.data.id
      })
    },
    html(newVal, oldVal) {
      const reg = /(?<=img src=").*?(?=" alt=)/g
      if (oldVal.length > newVal.length) {
        const oldImgList = oldVal.match(reg) === null ? [] : oldVal.match(reg)
        const newImgList = newVal.match(reg) === null ? [] : newVal.match(reg)
        if (this._.difference(oldImgList, newImgList)[0] !== undefined) {
          this.removeImgList.push(this._.difference(oldImgList, newImgList)[0])
        }
      }
    }
  },

  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
    },
    saveTitle() {
      this.$axios({
        url: `/note/saveTitle/${this.noteId}/${this.title}`,
        method: 'post'
      }).then(() => {
        this.$bus.$emit("refreshAside")
      })
    },
    save() {
      this.saveLoading = true
      this.$axios.all([
        this.$axios({
          url: `/note/saveNote`,
          method: 'post',
          data: {
            "id": this.noteId,
            "content": this.html,
            "title": this.title,
            "uid": localStorage.getItem("uid")
          }
        }),
        this.$axios({
          url: `/file/removeNoteImg`,
          method: 'delete',
          data: {
            "removeImgList": this.removeImgList
          }
        })
      ]).then(axios.spread(() => {
        this.removeImgList = []
        this.saveLoading = false
      }))
    }
  },
  created() {
    const id = this.$route.path.substring((this.$route.path).lastIndexOf("/") + 1)
    this.noteId = id
    this.$axios({
      url: `/note/getNote/${id}`,
      method: 'get'
    }).then(res => {
      this.loading = false
      this.title = res.data.data.title
      this.html = res.data.data.content
    })
  },
  mounted() {
    this.$bus.$on("resetTitle", (title) => {
      this.title = title
    })
  },
  beforeDestroy() {
    this.save()
    const editor = this.editor
    if (editor == null) return
    editor.destroy() // 组件销毁时，及时销毁编辑器
  },
  beforeRouteUpdate(to, from, next) {
    this.save()
    next()
  }
}
</script>

<style lang="scss" scoped>
@import "~@wangeditor/editor/dist/css/style.css";
@import '../assets/scss/common/common.scss';

html.dark {
  --w-e-textarea-bg-color: #333;
  --w-e-textarea-color: #fff;
}

::v-deep .w-e-text-container {
  h1 {
    font-size: 2em !important;
  }
}

.tool {
  @include border-bottom_color("aside_color");
}

.editor {
  border: 3px solid rgb(249, 250, 251);
  border-radius: 0.3rem;

  ::v-deep .w-e-text-container {
    @include background_color("background_color");
    @include font_color("aside_text-color");
  }

  ::v-deep .w-e-bar {
    @include background_color("background_color");
  }

  .el-input {
    @include background_color("background_color");
    @include font_color("aside_text-color");
    @include border-bottom_color("aside_color")
  }

  ::v-deep .el-input__inner {
    @include background_color("background_color");
    @include font_color("aside_text-color");
  }

  ::v-deep .el-loading-mask {
    @include background_color("background_color");
  }

  ::v-deep .w-e-text-container [data-slate-editor] blockquote{
    @include background_color("editor_slight_bg_color");
  }

  ::v-deep .w-e-text-container [data-slate-editor] table th{
    @include background_color("editor_slight_bg_color");
  }

  ::v-deep .w-e-text-container [data-slate-editor] pre > code{
    @include background_color("editor_slight_bg_color");
    text-shadow: none;
  }
}

::v-deep .w-e-bar-item {
  padding: 2px;
}

::v-deep .el-input__inner {
  border: none;
  font-size: 20px;
  font-weight: 500;
  width: 210px;
}
</style>