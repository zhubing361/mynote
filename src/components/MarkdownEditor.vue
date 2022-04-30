<template>
    <div>
        <md-editor
            v-model="content"
            :pageFullScreen="pageFullScreen"
            preview="true"
            htmlPreview="true"
            :previewOnly="previewOnly"
            :toolbars="toobars"
            :toolbarsExclude="toolbarsExclude"
            language="zh-CN"
            highlightJs="https://unpkg.com/@highlightjs/cdn-assets@11.5.1/highlight.min.js"
            highlightCss="https://unpkg.com/browse/@highlightjs/cdn-assets@11.5.1/styles/vs2015.min.css"
            prettier="true"
            prettierCDN="https://unpkg.com/prettier@2.4.0/standalone.js"
            prettierMDCDN="https://unpkg.com/prettier@2.4.0/parser-markdown.js"
            Cropper=undefined
            cropperCss="https://unpkg.com/cropperjs@1.5.12/dist/cropper.min.css"
            cropperJs="https://unpkg.com/cropperjs@1.5.12/dist/cropper.min.js"
            iconfontJs="https://at.alicdn.com/t/font_2605852_ihjkm7wo1y.js"
            editorId="md-editor-v3"
            tabWidth="4"
            showCodeRowNumber="true"
            screenfull="null"
            screenfullJs="https://unpkg.com/screenfull@5.1.0/dist/screenfull.js"
            previewTheme="default"
            mermaid="undefined"
            mermaidJs="https://unpkg.com/mermaid@8.13.5/dist/mermaid.min.js"
            noMermaid="false"
            katex="undefined"
            katexJs="https://unpkg.com/katex@0.15.1/dist/katex.min.js"
            katexCss="https://unpkg.com/katex@0.15.1/dist/katex.min.css"
            noKatex="false"
        />
    </div>
</template>

<script>
// https://unpkg.com/
// https://imzbf.github.io/md-editor-v3/docs/index
// highlightJs="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.2.0/build/highlight.min.js"

import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

export default {
    name: 'MarkdownEditor',
    components: {
        'md-editor': MdEditor,
    },
    props: {
        updateContent: {
            type: Function,
            default: null,
        },
        md: {
            type: String,
            default: '',
        },
        previewOnly: {
            type: Boolean,
            default: false,
        },
        pageFullScreen: {
            type: Boolean,
            default: false,
        },
        previewTheme: {
            type: String,
            default: 'default',
        },
    },
    data() {
        return {
            content: '',
            toobars: [
                'bold',
                'underline',
                'italic',
                'strikeThrough',
                'sub',
                'sup',
                'quote',
                'unorderedList',
                'orderedList',
                'codeRow',
                'code',
                'link',
                'image',
                'table',
                'revoke',
                'next',
                'save',
                'pageFullscreen',
                // 'fullscreen',
                'preview',
                'htmlPreview',
            ],
            toolbarsExclude: ['github'],
        };
    },
    watch: {
        md: function (val) {
            this.content = val;
        },
        content: function (val) {
            if (typeof this.updateContent == 'function') {
                this.updateContent(val);
            }
        },
    },
};
</script>

<style>
</style>