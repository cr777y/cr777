<template>
  <div style="padding: 30px;font-size: 12px">
    <div class="header">
      <span>数据库配置</span>
      <router-link to="/setting/database/add">
        <el-button type="primary" round size="small" style="height: 32px">+ 添加</el-button>
      </router-link>
    </div>
    <el-table
      class="table"
      :data="tableData"
      element-loading-text="Loading"
      fit
      border
      highlight-current-row
      style="width: 100%">
      <el-table-column label="名称" align="center" width="125">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="数据库地址" align="center">
        <template slot-scope="scope">
          {{ scope.row.db_addr }}
        </template>
      </el-table-column>
      <el-table-column label="数据库端口" align="center" width="100">
        <template slot-scope="scope">
          {{ scope.row.db_port }}
        </template>
      </el-table-column>
      <el-table-column label="数据库名称" align="center" width="120">
        <template slot-scope="scope">
          {{ scope.row.db_name }}
        </template>
      </el-table-column>
      <el-table-column label="数据库用户" align="center" width="100">
        <template slot-scope="scope">
          {{ scope.row.db_user }}
        </template>
      </el-table-column>
      <el-table-column label="数据库描述" align="center" >
        <template slot-scope="scope">
          {{ scope.row.db_desc }}
        </template>
      </el-table-column>
      <el-table-column label="上限" align="center" width="80">
        <template slot-scope="scope">
          {{ scope.row.use_limit }}
        </template>
      </el-table-column>
      <el-table-column label="已被使用次数" align="center" width="130">
        <template slot-scope="scope">
          {{ scope.row.use_num }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180" class="edit" align="center">
        <template slot-scope="scope">
          <div>
            <router-link :to="'/setting/database/edit/'+ scope.row.db_id">
              <el-button type="primary" size="small" plain round>编辑</el-button>
            </router-link>
            <el-button type="info" size="small" plain round @click="open(scope)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {queryDatabase} from '@/api/systemSetting'

  export default {
    name: "index.vue",
    created() {
      queryDatabase().then(res => {
        this.tableData = res.data.data.infos;
      })
    },
    data() {
      return {
        tableData: [],
      }
    },
    methods: {
      open(data) {
        this.$confirm('确定删除<strong>' + data.row.name + '</strong>数据库吗？', '提示', {
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
    .edit {
      div {
        display: flex;
        justify-content: space-between;
      }
    }
  }
</style>
