<template>
    <div
        class="fullpage-editor"
        v-show="content"
    >
        <el-drawer
            v-model="drawer"
            direction="rtl"
            size="100%"
        >
            <div class="fullpage-editor-content">
                <div>
                    <el-input
                        ref="fullpage-editor"
                        type="textarea"
                        v-model="content"
                        autosize
                        class="fullpage-md-editor"
                    />
                </div>
            </div>
        </el-drawer>
    </div>
</template>

<script>
export default {
    name: 'MarkdownFullPageEditor',
    data() {
        return {
            drawer: false,
            content: '',
        };
    },
    props: {
        updateContent: {
            type: Function,
            default: null,
        },
    },
    watch: {
        content(val) {
            this.updateContent(val);
        },
    },
};
</script>

<style>
.fullpage-md-editor textarea {
    background-color: #1e1e1e;
    color: #dcdcdc;
}
</style>