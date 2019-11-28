<template>
  <div style="padding: 30px;">
    <div class="header">
      <router-link to="/setting/message">
        <i class="el-icon-back"></i>
      </router-link>
      <span>添加系统消息</span>
    </div>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
      <el-form-item label="标题" prop="title">
        <el-input v-model="ruleForm.title" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input v-model="ruleForm.content" type="textarea" :rows="3" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="发送给所有企业" prop="selectName">
        <el-switch
          v-model="ruleForm.value"
          active-color="#13ce66"
          inactive-color="#888888">
        </el-switch>
        <el-select class="selectEnterprise" v-model="ruleForm.selectName" v-if="!ruleForm.value" filterable
                   placeholder="请选择企业名">
          <el-option
            v-for="item in enterpriseList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "addMessage",
    created() {
      this.$store.getters.allEnterprise.forEach((arr, index) => {
        let data = {
          "value": arr.id,
          "label": arr.name
        };
        this.enterpriseList.push(data)
      });
    },
    data() {
      var checkTitle = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('标题不能为空'));
        } else {
          callback();
        }
      };
      var checkContent = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('内容不能为空'));
        } else {
          callback();
        }
      };
      var checkName = (rule, value, callback) => {
        if (!value && !this.ruleForm.value) {
          return callback(new Error('企业不能为空'));
        } else {
          callback();
        }
      };
      return {
        enterpriseList: [],
        ruleForm: {
          title: "",
          content: '',
          value: false,
          selectName: "",
        },
        rules: {
          title: [
            {required: true, validator: checkTitle, trigger: 'blur'}
          ],
          content: [
            {required: true, validator: checkContent, trigger: 'blur'}
          ],
          selectName: [
            {required: true, validator: checkName, trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('是否确定添加系统消息?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$message({
                type: 'success',
                message: '添加成功!'
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

    .selectEnterprise {
      /deep/ .el-input__inner {
        height: 32px;
      }
    }
  }
</style>
