<template>
  <div class="editor">
    <div style="flex: auto">
      <el-input
          placeholder="请输入标题"
          v-model="title"
      >
      </el-input>
      <el-button style="position: fixed;right: 110px" >保存</el-button>
      <el-button style="position: fixed;right: 30px" type="primary">分享</el-button>
    </div>
    <Toolbar
        style="border-bottom: 3px solid #f9fafb"
        :editor="editor"
        :defaultConfig="toolbarConfig"
        :mode="mode"
    />
    <Editor
        style="height: 500px; overflow-y: hidden;"
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

Boot.registerModule(markdownModule);

export default {
  name: "richText",
  components: {
    Editor, Toolbar,
  },

  data() {
    return {
      editor: null,
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
        MENU_CONF: {
          uploadImage:{
            server:'/api/upload',

          },
        }
      },
      mode: 'default', // or 'simple'
    }
  },

  watch: {
    html(val) {
      console.log(val);
      const json = this.editor.children;
      console.log(json)
    }
  },

  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
    },

  },

  mounted() {

  },

  beforeDestroy() {
    const editor = this.editor
    if (editor == null) return
    editor.destroy() // 组件销毁时，及时销毁编辑器
  }

}
</script>

<style lang="scss" scoped>
@import "~@wangeditor/editor/dist/css/style.css";

.editor {
  background-color: #FFF;
  border: 3px solid #f9fafb;
  border-radius: 0.75rem;
  border-bottom: none;
}

::v-deep .w-e-bar-item {
  padding: 2px;
}

::v-deep .el-input__inner {
  border: 1px solid #f9fafb;
  font-size: 20px;
  font-weight: 500;
  width: 200px;
}

</style>