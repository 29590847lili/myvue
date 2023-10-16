<template>
    <div class="wang-editor-box">
      <div class="disabled" v-if="disabled"></div>
      <Toolbar
        style="border-bottom: 1px solid #ccc"
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
        @input="returnValue()"
        :disabled="true"
      />
    </div>
</template>

<script>
import Vue from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

export default Vue.extend({
  components: { Editor, Toolbar },
  data () {
    return {
      editor: null, // 编辑器实例
      html: '',
      toolbarConfig: {},
      editorConfig: {
        placeholder: '请输入内容...',
        MENU_CONF: {
          uploadImage: {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('Authorization')
            },
            fieldName: 'file', // FormData name
            maxFileSize: 10 * 1024 * 1024, // 文件大小限制
            server: '/api/permission/file/uploadFile',
            customInsert (res, insertFn) {
              insertFn(res.data[0])
            }
          },
          uploadVideo: {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('Authorization')
            },
            fieldName: 'file', // FormData name
            maxFileSize: 100 * 1024 * 1024, // 文件大小限制
            timeout: 60 * 1000, // 5 秒
            server: '/api/permission/file/uploadFile',
            customInsert (res, insertFn) {
              insertFn(res.data[0])
            }
          }
        }
      },
      mode: 'default' // or 'simple'
    }
  },
  props: {
    value: {
      default: ''
    },
    disabled: {
      default: false
    }
  },
  watch: {
    value: {
      handler (value) {
        this.html = value
      },
      immediate: true
    }
  },
  model: {
    prop: 'value',
    event: 'returnValue'
  },
  methods: {
    returnValue () {
      this.$emit('returnValue', this.html)
    },
    onCreated (editor) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
    }
  },
  beforeDestroy () {
    const editor = this.editor
    if (editor == null) return
    editor.destroy() // 组件销毁时，及时销毁编辑器
  }
})
</script>
<style src="@wangeditor/editor/dist/css/style.css"></style>

<style lang="less" scoped>
.wang-editor-box{border:1px solid #ccc;position:relative;
  .disabled{position:absolute;top:0;right:0;bottom:0;left:0;z-index:1;background-color:rgba(255,255,255,0.5);background:#fff\9;filter:alpha(opacity=50);cursor:not-allowed}
}
</style>
