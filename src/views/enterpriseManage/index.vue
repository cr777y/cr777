<template>
  <div style="padding: 30px; font-size: 12px">
    <div class="header">
      <span>企业管理</span>
    </div>
    <div class="search">
      <div>
        <h3>企业名</h3>
        <el-select v-model="enterpriseName" :disabled="inputAble" filterable clearable placeholder="请选择">
          <el-option
            v-for="item in enterpriseList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div>
        <h3>选择企业状态</h3>
        <el-select v-model="auditNum" :disabled="inputAble" filterable clearable placeholder="请选择">
          <el-option
            v-for="item in auditList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div>
        <h3>按账号搜索企业</h3>
        <el-select v-model="enterpriseAccount" filterable clearable placeholder="请选择">
          <el-option
            v-for="item in enterpriseAccountList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <el-button type="primary" size="small" icon="el-icon-search" round style="height: 32px; margin-top: 68px;margin-left: 20px"
                 @click="search"
      >搜索
      </el-button>
      <el-button type="primary" size="small" round style="height: 32px; margin-top: 68px;margin-left: 20px"
                 @click="searchAll"
      >搜索全部
      </el-button>
    </div>
    <el-table
      class="table"
      :data="tableData"
      element-loading-text="Loading"
      fit
      border
      highlight-current-row
      style="width: 100%">
      <el-table-column label="企业名称" align="center" width="150">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="注册账号" align="center">
        <template slot-scope="scope">
          {{ scope.row.super_admin }}
        </template>
      </el-table-column>
      <el-table-column label="认证日期" align="center">
        <template slot-scope="scope">
          {{ scope.row.audited_time }}
        </template>
      </el-table-column>
      <el-table-column label="注册日期" align="center">
        <template slot-scope="scope">
          {{ scope.row.created_time }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="认证状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.ban ===false && scope.row.audit === 0" type="info">
            等待提交
          </el-tag>
          <el-tag v-if="scope.row.ban ===false && scope.row.audit === 1">
            等待审核
          </el-tag>
          <el-tag v-if="scope.row.ban ===false && scope.row.audit === 2" type="warning">
            审核未通过
          </el-tag>
          <el-tag v-if="scope.row.ban ===false && scope.row.audit === 3" type="success">
            审核通过
          </el-tag>
          <el-tag v-if="scope.row.ban === true" type="danger">
            停用
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" class="edit" align="center" width="290">
        <template slot-scope="scope">
          <div>
            <router-link :to="'/enterpriseManage/config/'+ scope.row.id+'?type=detail'">
              <el-button type="primary" size="small" plain round>详情</el-button>
            </router-link>
            <el-button type="info" size="small" plain round @click="delete1(scope)">删除</el-button>
            <el-button style="margin-left: 0" type="primary" v-if="!scope.row.ban" size="small" plain round
                       @click="stop(scope)">停用
            </el-button>
            <router-link :to="'/enterpriseManage/config/'+ scope.row.id+'?type=config'">
              <el-button type="primary" v-if="!scope.row.ban" size="small" plain round>配置</el-button>
            </router-link>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>

<script>
  import {queryEnterpriseInfo} from '@/api/enterprise'
  import {parseTime} from '@/utils/index'
  export default {
    name: "index",
    computed: {
      inputAble() {
        if (this.enterpriseAccount) {
          return true
        } else {
          return false
        }
      }
    },
    created() {
      let enterpriseData = this.$store.getters.allEnterprise;
      enterpriseData.forEach((arr, index) => {
        let data = {
          "value": arr.name,
          "label": arr.name
        };
        let data1 = {
          "value": arr.super_admin,
          "label": arr.super_admin
        };
        this.enterpriseList.push(data);
        this.enterpriseAccountList.push(data1);
      });
      this.dealData(enterpriseData)
    },
    data() {
      return {
        enterpriseList: [],
        enterpriseName: "",
        auditList: [{
          value: 0,
          label: '等待提交'
        }, {
          value: 1,
          label: '等待审核'
        }, {
          value: 2,
          label: '审核未通过'
        }, {
          value: 3,
          label: '审核通过'
        }],
        enterpriseAccountList: [],
        tableData: [],
        auditNum: "",
        enterpriseAccount: "",
      }
    },
    methods: {
      fetchEnterprise(data) {
        queryEnterpriseInfo(data).then((res) => {
          this.dealData(res.data.data.enterprises)
        })
      },
      dealData(enterpriseData) {
        if (enterpriseData) {
          enterpriseData.forEach((arr, index) => {
            arr.audited_time = parseTime(new Date(arr.audited_time));
            arr.created_time = parseTime(new Date(arr.created_time));
          });
        }
        this.tableData = enterpriseData
      },
      search() {
        let data = {};
        if (!this.enterpriseAccount) {
          if (this.enterpriseName) {
            data["like_name"] = this.enterpriseName
          }
          if (this.auditNum || this.auditNum === 0) {
            data["audit"] = parseInt(this.auditNum)
          } else {
            data["audit"] = 4
          }
        } else {
          data["enterprise_sa"] = this.enterpriseAccount
        }
        this.fetchEnterprise(data)
        // console.log(data)
      },
      searchAll() {
        this.fetchEnterprise({"audit": 4});
        this.auditNum = "";
        this.enterpriseName = "";
        this.enterpriseAccount = "";
      },
      stop(data) {
        this.$confirm('是否停用<strong>' + data.row.name + '</strong>？', '提示', {
          dangerouslyUseHTMLString: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '停用成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      delete1(data) {
        this.$confirm('确定删除<strong>' + data.row.name + '</strong>的纪录吗？', '提示', {
          dangerouslyUseHTMLString: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    }
  }
</script>

<style lang="less" scoped>
  .header {
    height: 60px;
    border-bottom: 1px solid #888888;

    span {
      font-size: 18px;
      color: #1b6d85;
    }

    i {
      cursor: pointer;
    }
  }

  .search {
    height: 100px;
    margin-bottom: 40px;
    display: flex;

    div {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-right: 8px;

      /deep/ .el-input__inner {
        border-radius: 30px;
        height: 30px;
      }

      h3 {
        color: #888888;
        font-weight: normal;
        font-size: 14px;
      }
    }

  }
</style>
