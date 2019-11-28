<template>
  <div style="padding: 30px;">
    <div class="header">
      <router-link to="/setting/database">
        <i class="el-icon-back"></i>
      </router-link>
      <span>修改数据库配置</span>
    </div>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="名称" prop="name">
        <el-input v-model="ruleForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="端口" prop="port">
        <el-input v-model.number="ruleForm.port" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="数据库域名" prop="databaseIP">
        <el-input v-model="ruleForm.databaseIP" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="数据库名称" prop="databaseName">
        <el-input v-model="ruleForm.databaseName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="数据库账号" prop="databaseAccount">
        <el-input v-model="ruleForm.databaseAccount" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="限制" prop="limit">
        <el-input v-model.number="ruleForm.limit" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="dec">
        <el-input v-model="ruleForm.dec" type="textarea" :rows="2" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {queryDatabase} from '@/api/systemSetting'

  export default {
    name: "edit",
    created() {
      const id = this.$route.params && this.$route.params.id;
      queryDatabase().then(res => {
        let info = res.data.data.infos;
        const result = info.filter(function (item) {
          return item.db_id === parseInt(id)
        });
        console.log(info);
        this.ruleForm.name = info[0].name;
        this.ruleForm.port = info[0].db_port;
        this.ruleForm.databaseIP = info[0].db_addr;
        this.ruleForm.databaseName = info[0].db_name;
        this.ruleForm.databaseAccount = info[0].db_user;
        this.ruleForm.limit = info[0].use_limit;
        this.ruleForm.dec = info[0].db_desc;
      })
    },
    data() {
      var checkName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('名称不能为空'));
        } else {
          callback();
        }
      };
      var checkPort = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('端口不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            callback();
          }
        }, 1000);
      };
      var checkDatabaseIP = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('数据库域名不能为空'));
        } else {
          callback();
        }
      };
      var checkDatabaseName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('数据库名称不能为空'));
        } else {
          callback();
        }
      };
      var checkDatabaseAccount = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('数据库账号不能为空'));
        } else {
          callback();
        }
      };
      var checkLimit = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            callback();
          }
        }, 1000);
      };

      var checkDec = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('描述不能为空'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          name: "",
          port: "",
          databaseIP: "",
          databaseName: "",
          databaseAccount: "",
          limit: "",
          dec: ''
        },
        rules: {
          name: [
            {required: true, validator: checkName, trigger: 'blur'}
          ],
          port: [
            {required: true, validator: checkPort, trigger: 'blur'}
          ],
          databaseIP: [
            {required: true, validator: checkDatabaseIP, trigger: 'blur'}
          ],
          databaseName: [
            {required: true, validator: checkDatabaseName, trigger: 'blur'}
          ],
          databaseAccount: [
            {required: true, validator: checkDatabaseAccount, trigger: 'blur'}
          ],
          limit: [
            {required: true, validator: checkLimit, trigger: 'blur'}
          ],
          dec: [
            {required: true, validator: checkDec, trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('是否确定修改此数据库?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$message({
                type: 'success',
                message: '修改成功!'
              });
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消'
              });
            });
            // alert('submit!');
          } else {
            this.$message.error('请正确填写表单');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
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
