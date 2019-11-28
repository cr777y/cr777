<template>
  <div style="padding: 30px;font-size: 12px">
    <div class="header">
      <router-link to="/enterpriseManage">
        <i class="el-icon-back"></i>
      </router-link>
      <span>企业配置/详情</span>
    </div>
    <div class="body">
      <div class="content">
        <div class="info">
          <span>信息更新时间</span>
          <el-input v-model="enterpriseInfo.updated_time" :disabled="true"></el-input>
        </div>
        <div class="info">
          <span>处理器前缀</span>
          <el-input v-model="enterpriseInfo.agency_prefix" :disabled="true"></el-input>
        </div>
      </div>
      <div class="content">
        <div class="info">
          <span>代理商前缀</span>
          <el-input v-model="enterpriseInfo.processor_prefix" :disabled="true"></el-input>
        </div>
        <div class="info">
          <span>超管账号</span>
          <el-input v-model="enterpriseInfo.super_admin_account" :disabled="true"></el-input>
        </div>
      </div>
      <div class="content">
        <div class="info">
          <span>超管电话</span>
          <el-input v-model="enterpriseInfo.super_admin_phone" :disabled="true"></el-input>
        </div>
        <div class="info">
          <span>创建时间</span>
          <el-input v-model="enterpriseInfo.created_time" :disabled="true"></el-input>
        </div>
      </div>
      <div class="content">
        <div class="info">
          <span>被停用时间</span>
          <el-input v-model="enterpriseInfo.banned_time" :disabled="true"></el-input>
        </div>
        <div class="info">
          <span>审核时间</span>
          <el-input v-model="enterpriseInfo.audited_time" :disabled="true"></el-input>
        </div>
      </div>
      <div class="content">
        <div class="info">
          <span>提交审核时间</span>
          <el-input v-model="enterpriseInfo.req_audited_time" :disabled="true"></el-input>
        </div>
        <div class="info">
          <span>代理商上限</span>
          <el-input v-model="enterpriseInfo.agency_limit" :disabled="onlyRead"></el-input>
        </div>
      </div>
      <div class="content">
        <div class="info">
          <span>处理器上限</span>
          <el-input v-model="enterpriseInfo.processor_limit" :disabled="onlyRead"></el-input>
        </div>
        <div class="info">
          <span>商品上限</span>
          <el-input v-model="enterpriseInfo.product_limit" :disabled="onlyRead"></el-input>
        </div>
      </div>
      <div class="content">
        <div class="info">
          <span>商品上限1</span>
          <el-input v-model="enterpriseInfo.production_limit" :disabled="onlyRead"></el-input>
        </div>
        <div class="info">
          <span>企业状态</span>
          <el-input v-model="enterpriseInfo.audit" :disabled="true"></el-input>
        </div>
      </div>
      <div class="content">
        <div class="info">
          <span>防伪码地址</span>
          <el-input v-model="enterpriseInfo.sweep_code_address" :disabled="onlyRead"></el-input>
        </div>
        <div class="info">
          <span>流通上限</span>
          <el-input v-model="enterpriseInfo.circulate_limit" :disabled="onlyRead"></el-input>
        </div>
      </div>
      <div class="content">
        <div class="info">
          <span>普管上限</span>
          <el-input v-model="enterpriseInfo.normal_admin_limit" :disabled="onlyRead"></el-input>
        </div>
        <div class="info">
          <span>名称</span>
          <el-input v-model="enterpriseInfo.name" :disabled="true"></el-input>
        </div>
      </div>
      <div class="content">
        <div class="info">
          <span>企业网站</span>
          <el-input v-model="input" :disabled="true"></el-input>
        </div>
        <div class="info">
          <span>企业邮箱</span>
          <el-input v-model="input" :disabled="true"></el-input>
        </div>
      </div>
      <div class="content">
        <div class="info">
          <span>联系电话</span>
          <el-input v-model="input" :disabled="true"></el-input>
        </div>
        <div class="info">
          <span>企业QQ</span>
          <el-input v-model="input" :disabled="true"></el-input>
        </div>
      </div>
      <div class="content">
        <div class="info">
          <span>企业微信</span>
          <el-input v-model="input" :disabled="true"></el-input>
        </div>
        <div class="info">
          <span>企业公众号</span>
          <el-input v-model="input" :disabled="true"></el-input>
        </div>
      </div>
      <div style="margin-bottom: 20px">
        <span>企业简介</span>
        <el-input
          type="textarea"
          :rows="5"
          :disabled="true"
          v-model="textarea">
        </el-input>
      </div>
      <div style="margin-bottom: 20px">
        <span style="display: block">营业执照图片</span>
        <img :src="imageUrl" alt="" style="width: 100px;height: 100px">
        <el-button v-if="!onlyRead" size="small" plain>上传图片</el-button>
      </div>
      <div style="width: 100%;text-align: center">
        <el-button v-if="!onlyRead" type="primary" size="small">更新配置</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import {queryEnterpriseBaseInfo, queryEnterprise} from "@/api/enterprise"
  import {parseTime} from '@/utils/index'

  export default {
    name: "config",
    created() {
      const id = this.$route.params && this.$route.params.id;
      this.getData({"id": parseInt(id)});
      console.log(this.$route.query);
      if (this.$route.query.type === "config") {
        this.onlyRead = false
      }

    },
    methods: {
      getData(data) {
        queryEnterpriseBaseInfo(data).then((res) => {
          this.enterpriseBaseInfo = res.data.data;
          this.imageUrl = this.enterpriseBaseInfo.infos[0].info;
        });
        queryEnterprise(data).then((res) => {
          this.enterpriseInfo = res.data.data;
          this.enterpriseInfo.created_time=parseTime(new Date(this.enterpriseInfo.created_time));
          this.enterpriseInfo.banned_time=parseTime(new Date(this.enterpriseInfo.banned_time));
          this.enterpriseInfo.audited_time=parseTime(new Date(this.enterpriseInfo.audited_time));
          this.enterpriseInfo.req_audited_time=parseTime(new Date(this.enterpriseInfo.req_audited_time));
        })
      }
    },
    data() {
      return {
        enterpriseBaseInfo: {},
        enterpriseInfo: {},
        input: "",
        textarea: "",
        imageUrl: "",
        onlyRead: true
      }
    }
  }
</script>

<style lang="less" scoped>
  .header {
    height: 60px;
    border-bottom: 1px solid #888888;
    margin-bottom: 30px;

    span {
      font-size: 18px;
      color: #1b6d85;
    }

    i {
      cursor: pointer;
      font-size: 16px;
    }
  }

  .body {
    text-align: left;
    font-size: 13px;
    color: #515a6e;

    /deep/ .el-textarea__inner {
      width: 80%;
      margin-top: 5px;

    }

    .content {
      height: 50px;
      display: flex;
      justify-content: space-between;


      .info {
        width: 50%;
        margin-bottom: 30px;
      }

      span {
        display: inline-block;

        width: 100px;
      }

      .el-input {
        width: 70%;

        /deep/ .el-input__inner {
          height: 29px;
          border-radius: 30px;
          font-size: 12px;
        }
      }
    }
  }
</style>
