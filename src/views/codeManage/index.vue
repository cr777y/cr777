<template>
  <div class="app-container">
    <div class="head">

      <el-row>
        <el-col :span="8"><span>请选择查询范围： </span></el-col>
        <el-col :span="8">
          <el-date-picker
            v-model="value"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['00:00:00', '23:59:59']"
          />
        </el-col>
        <el-col :span="8">
          <router-link to="addCode">
            <el-button type="primary" size="small" icon="el-icon-plus">
              添加
            </el-button>
          </router-link>
        </el-col>
      </el-row>
    </div>
    <el-table v-loading="listLoading" :data="tableData" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="批次" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="所属企业">
        <template slot-scope="scope">
          <span>{{ scope.row.enterprise_id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="大码数量/个">
        <template slot-scope="scope">
          <span>{{ scope.row.big_code_num }}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px" align="center" label="小码数量/个">
        <template slot-scope="scope">
          <span>{{ scope.row.sub_code_num }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" align="center" label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.created_time }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="120">
        <template slot-scope="scope">
          <router-link :to="'/codeManage/edit/'+scope.row.id">
            <el-button type="primary" size="small" icon="el-icon-edit">
              查看
            </el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>

    <!--<pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />-->
  </div>
</template>

<script>
// import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import { queryCodeInfo } from '@/api/code'
export default {
  name: 'ArticleList',
  // components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      tableData: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      },
      value: ''
    }
  },
  created() {
    this.getTableInfo({})
  },
  methods: {
    getTableInfo(data) {
      queryCodeInfo(data).then(response => {
        if (response.data.error_msg) {
          this.$message({
            message: response.data.error_msg,
            type: 'error',
            duration: 5 * 1000
          })
        } else {
          this.tableData = response.data.data.infos
          this.listLoading = false
          console.log(response)
        }
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
