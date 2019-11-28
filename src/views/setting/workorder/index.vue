<template>
  <div style="padding: 30px;font-size: 12px" v-if="reFresh">
    <div class="header">
      <span>工单管理</span>

      <el-button @click="add" type="primary" round size="small" style="height: 32px">+ 添加</el-button>

    </div>
    <div class="search">
      <div>
        <h3>选择企业</h3>
        <el-select v-model="enterpriseID" filterable placeholder="请选择">
          <el-option
            v-for="item in enterpriseList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div>
        <h3>选择工单状态</h3>
        <el-select v-model="statusID" filterable placeholder="请选择">
          <el-option
            v-for="item in statusList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div>
        <h3>选择工单类型</h3>
        <el-select v-model="typeID" filterable placeholder="请选择">
          <el-option
            v-for="item in typeList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div>
        <h3>更新状态</h3>
        <el-select v-model="updateID" filterable placeholder="请选择">
          <el-option
            v-for="item in updateStatus"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <el-button type="primary" size="small"  icon="el-icon-search" round style="height: 32px; margin-top: 68px;margin-left: 20px"
                 @click="search">搜索
      </el-button>
      <el-button type="primary" size="small" round style="height: 32px; margin-top: 68px;margin-left: 20px"
                 @click="searchAll">搜索全部
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
      <el-table-column label="企业" align="center" width="100">
        <template slot-scope="scope">
          {{ scope.row.enterprise_name }}
        </template>
      </el-table-column>
      <el-table-column label="标题" align="center" width="130">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>

      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          {{ scope.row.status }}
        </template>
      </el-table-column>
      <el-table-column label="工单类型" align="center">
        <template slot-scope="scope">
          {{ scope.row.type }}
        </template>
      </el-table-column>
      <el-table-column label="针对特定人群更新状态" align="center">
        <template slot-scope="scope">
          {{ scope.row.new_detail }}
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.created_time }}
        </template>
      </el-table-column>
      <el-table-column label="更新时间	" align="center">
        <template slot-scope="scope">
          {{ scope.row.updated_time }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180" class="edit" align="center">
        <template slot-scope="scope">
          <div>
            <router-link :to="'/setting/workorder/detail/'+ scope.row.id">
              <el-button type="primary" size="small" plain round>详情</el-button>
            </router-link>
            <el-button type="info" size="small" plain round @click="delete1(scope.row.id)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {queryTicketList} from '@/api/systemSetting'
  import {parseTime} from '@/utils/index'

  export default {
    name: "index",
    created() {
      this.queryTicketList({});
      this.$store.getters.allEnterprise.forEach((arr, index) => {
        let data = {
          "value": arr.id,
          "label": arr.name
        };
        this.enterpriseList.push(data)
      });
    },
    data() {
      return {
        tableData: [],
        enterpriseList: [],
        typeList: [{
          value: 1,
          label: '平台使用问题'
        }, {
          value: 2,
          label: '需要生成防伪码标签'
        }, {
          value: 3,
          label: '系统bug汇报'
        }, {
          value: 4,
          label: '其他问题'
        }],
        statusList: [{
          value: 1,
          label: '平台处理中'
        }, {
          value: 2,
          label: '企业处理中'
        }, {
          value: 3,
          label: '正常结束'
        }, {
          value: 4,
          label: '强制结束'
        }],
        updateStatus: [{
          value: 0,
          label: '无更新'
        }, {
          value: 1,
          label: '针对平台有更新'
        }, {
          value: 2,
          label: '针对企业有更新'
        }],
        enterpriseID: "",
        typeID: "",
        statusID: "",
        updateID: "",
        reFresh: true
      }
    },
    methods: {
      search() {
        let data = {};
        if (this.enterpriseID) {
          data["enterprise_id"] = parseInt(this.enterpriseID)
        }
        if (this.typeID) {
          data["type"] = parseInt(this.typeID)
        }
        if (this.statusID) {
          data["status"] = parseInt(this.statusID)
        }
        if (this.updateID || this.updateID === 0) {
          data["new_detail"] = parseInt(this.updateID)
        }
        this.queryTicketList(data)
      },
      searchAll() {
        this.queryTicketList({});
        this.enterpriseID = "";
        this.typeID = "";
        this.statusID = "";
        this.updateID = ""
      },
      queryTicketList(data) {
        // console.log(this.$store.getters.allEnterprise);
        queryTicketList(data).then(res => {
          let ticketList = res.data.data.tickets;
          if (ticketList) {
            ticketList.forEach((arr, index) => {
              this.$store.getters.allEnterprise.forEach((arr2, index2) => {
                if (arr.enterprise_id === arr2.id) {
                  arr["enterprise_name"] = arr2.name
                }
              });
              if (parseInt(arr.status) === 1) {
                arr.status = "平台处理中"
              } else if (parseInt(arr.status) === 2) {
                arr.status = "企业处理中"
              } else if (parseInt(arr.status) === 3) {
                arr.status = "正常结束"
              } else if (parseInt(arr.status) === 4) {
                arr.status = "强制结束"
              }
              if (parseInt(arr.type) === 1) {
                arr.type = "平台使用问题"
              } else if (parseInt(arr.type) === 2) {
                arr.type = "需要生成防伪码标签"
              } else if (parseInt(arr.type) === 3) {
                arr.type = "系统bug汇报"
              } else if (parseInt(arr.type) === 4) {
                arr.type = "其他问题"
              }
              if (parseInt(arr.new_detail) === 0) {
                arr.new_detail = "无更新"
              } else if (parseInt(arr.new_detail) === 1) {
                arr.new_detail = "针对平台有更新"
              } else if (parseInt(arr.new_detail) === 2) {
                arr.new_detail = "针对企业有更新"
              }
              arr.created_time = parseTime(new Date(arr.created_time));
              if (arr.updated_time) {
                arr.updated_time = parseTime(new Date(arr.updated_time))
              } else {
                arr.updated_time = "--"
              }
            });
          }
          this.tableData = ticketList


        });
      },
      add() {
        this.$message({
          message: '该功能仅企业管理员可用',
          type: 'warning',
          center: true
        });
      },
      delete1(data) {
        this.$confirm('确定删除该条工单？', '提示', {
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
    display: flex;
    justify-content: space-between;

    span {
      font-size: 18px;
      color: #1b6d85;
    }
  }

  .table {
    border-top: 1px solid #d9d9d9;

    .edit {
      div {
        display: flex;
        justify-content: space-between;
      }
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
      }
    }

  }
</style>
