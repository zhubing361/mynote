<template>
    <div>
        <el-tag
            :key="tag"
            v-for="tag in dynamicTags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
        >
            {{tag}}
        </el-tag>
        <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter="handleInputConfirm"
            @blur="handleInputConfirm"
        >
        </el-input>
        <el-button
            v-else
            class="button-new-tag"
            size="small"
            @click="showInput"
        >+ New Tag</el-button>
    </div>
</template>

<script>
export default {
    name: 'NoteTag',
    data() {
        return {
            dynamicTags: [],
            inputVisible: false,
            inputValue: '',
        };
    },
    props: {
        tags: {
            type: Array,
            default: () => {
                return [];
            },
        },
        updateTags: {
            type: Function,
            default: tags => {
                console.log(tags);
            },
        },
    },
    watch: {
        tags(val) {
            this.dynamicTags = val;
        },
    },
    methods: {
        handleClose(tag) {
            this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
            this.updateTags(this.dynamicTags);
        },

        showInput() {
            this.inputVisible = true;
            this.$nextTick(() => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },

        handleInputConfirm() {
            let inputValue = this.inputValue;
            if (inputValue) {
                this.dynamicTags.push(inputValue);
                this.updateTags(this.dynamicTags);
            }
            this.inputVisible = false;
            this.inputValue = '';
        },
    },
};
</script>

<style>
.el-tag + .el-tag {
    margin-left: 10px;
}
.button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
}
.input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
}
</style>