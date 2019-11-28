<template>
  <div style="padding: 30px;font-size: 12px">
    <div class="header">
      <span>系统消息</span>
      <router-link to="/setting/message/add">
        <el-button type="primary" round size="small" style="height: 32px">+ 添加</el-button>
      </router-link>
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
        <h3>选择批次</h3>
        <el-select v-model="batchValue" filterable placeholder="请选择">
          <el-option
            v-for="item in batchList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <el-button type="primary" size="small" icon="el-icon-search" round style="height: 32px; margin-top: 68px;margin-left: 20px"
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
      <el-table-column label="标题" align="center">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.send_time }}
        </template>
      </el-table-column>
      <el-table-column label="操作" class="edit" align="center">
        <template slot-scope="scope">
          <div>
            <router-link :to="'/setting/message/detail/'+ scope.row.id">
              <el-button type="primary" size="small" plain round>详情</el-button>
            </router-link>
            <el-button type="info" size="small" plain round @click="delete1(scope)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {queryMessageList} from '@/api/systemSetting'
  import {parseTime} from '@/utils/index'

  export default {
    name: "index",
    created() {
      let data = {
        "batch": true
      };
      this.queryMessageList(data);
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
        batchList: [{
          value: true,
          label: "查询同批次"
        }, {
          value: false,
          label: "查询不同批次"
        }],
        enterpriseID: "",
        batchValue: true
      }
    },
    methods: {
      search() {
        let data = {};
        if (this.enterpriseID) {
          data["enterprise_id"] = this.enterpriseID
        }
        if (this.batchValue === true) {
          data["batch"] = true
        }
        if (this.batchValue === false) {
          data["batch"] = false
        }
        this.queryMessageList(data)
      },
      searchAll() {
        this.queryMessageList({"batch": true});
        this.enterpriseID = '';
        this.batchValue =true
      },
      queryMessageList(data) {
        queryMessageList(data).then((res) => {
          if (res.data.data.messages) {
            res.data.data.messages.forEach((arr, index) => {
              // arr.send_time = this.formatTime(new Date(arr.send_time));
              arr.send_time = parseTime(new Date(arr.send_time));

            });
          }
          this.tableData = res.data.data.messages
        })
      },
      delete1(data) {
        this.$confirm('确定删除标题为<strong>' + data.row.title + '</strong>系统消息吗？', '提示', {
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
