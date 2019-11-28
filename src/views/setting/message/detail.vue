<template>
  <div style="padding: 30px;">
    <div class="header">
      <router-link to="/setting/message">
        <i class="el-icon-back"></i>
      </router-link>
      <span>系统详情</span>
    </div>
    <el-form status-icon label-width="120px" class="demo-ruleForm">
      <el-form-item label="标题">
        <el-input v-model="title" readonly></el-input>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-input v-model="createTime" readonly></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="dec" type="textarea" :rows="3" readonly></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {queryMessage} from '@/api/systemSetting'
  import {parseTime} from '@/utils/index'

  export default {
    name: "detail",
    created() {
      const id = this.$route.params && this.$route.params.id;
      queryMessage({"id": parseInt(id)}).then((res) => {
        this.title = res.data.data.title;
        this.createTime = parseTime(new Date(res.data.data.send_time))
        this.dec = res.data.data.content
      })
    },
    data() {
      return {
        title: "",
        createTime: "",
        dec: "",

      }
    },
  }
</script>

<style lang="less" scoped>
  .header {
    height: 60px;
    border-bottom: 1px solid #888888;
    margin-bottom: 20px;

    span {
      font-size: 18px;
      color: #1b6d85;
    }

    i {
      cursor: pointer;
    }
  }

  .el-form {
    width: 70%;

    /deep/ .el-input__inner {
      border-radius: 30px;
    }
  }
</style>
