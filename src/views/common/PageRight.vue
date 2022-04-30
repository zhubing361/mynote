<template>
    <div v-show="show">
        <el-row>
            <el-col>
                <el-card>
                    <div>
                        右边内容
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: 'PageRight',
    data() {
        return {
            show: false,
        };
    },
};
</script>

<style scoped>
</style>