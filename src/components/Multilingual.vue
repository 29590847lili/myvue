<template>
    <div class="language">
        <el-select v-model="value"  @change="switchLanguage(value)" class="el-select">
        <el-option
                v-for="item in language"
                :key="item.value"
                :label="item.label"
                :value="item.value">
        </el-option>
        </el-select>
    </div>
</template>

<script>
export default {
    data() {
        return {
        value: this.$i18n.locale, //为了把下拉框的默认值和全局变量的值一致，以此实现载入页面时显示的语言和数据配置一致
        language: [
            {
            value: "en-US",
            label: "English"
            },
            {
            value: "zh-CN",
            label: "中文简体"
            },
        ]
        };
    },
    mounted(){
    },
    methods: {
        switchLanguage(value) {
        if (value == "zh-CN") {
            this.$i18n.locale = "zh-CN";
        } else if (value == "en-US") {
            this.$i18n.locale = "en-US";
        }
        //在选择了显示的语言后，将配置保存到Cookie中
        this.$cookie.set(                     
            "DefaultLanguage",                
            value,        //
            {                     //
            expires: "30m"        //默认cookie有效时间为30分钟
            }                    
        );                    
        }
    }
}
</script>
<style lang="less" scoped>
.language{
    float: right;
    margin-top: -22px;
}
</style>
