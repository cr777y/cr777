<template>
  <div style="padding: 30px;font-size: 12px">
    <div class="header">
      <router-link to="/setting/workorder">
        <i class="el-icon-back"></i>
      </router-link>
      <span>工单详情</span>
    </div>
    <el-table
      class="table"
      :data="tableData"
      element-loading-text="Loading"
      fit
      border
      highlight-current-row
      style="width: 100%">
      <el-table-column label="状态" align="center" width="180">
        <template slot-scope="scope">
          {{ scope.row.status }}
        </template>
      </el-table-column>
      <el-table-column label="最后更新时间" align="center" width="250">
        <template slot-scope="scope">
          {{ scope.row.last_time }}
        </template>

      </el-table-column>
      <el-table-column label="内容" align="center">
        <template slot-scope="scope">
          {{ scope.row.content }}
        </template>
      </el-table-column>
      <el-table-column label="操作" class="edit" align="center" width="150">
        <template slot-scope="scope">
          <div>
            <el-button type="primary" v-if="scope.row.replyButton" size="small" plain round
                       @click="reply(tableData[1])">回复
            </el-button>
            <el-button type="info" v-if="scope.row.editButton" size="small" plain round @click="dialogVisible = true">
              编辑
            </el-button>
            <el-dialog
              title="工单编辑"
              :visible.sync="dialogVisible"
              :close-on-click-modal=false
              width="30%">
              <el-input
                type="textarea"
                :rows="5"
                placeholder="请输入内容"
                v-model="textarea">
              </el-input>
              <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
            </el-dialog>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {queryTicket} from '@/api/systemSetting'
  import {parseTime} from '@/utils/index'

  export default {
    name: "detail",
    created() {
      const id = this.$route.params && this.$route.params.id;
      this.queryTicket({"id": parseInt(id)})
    },
    data() {
      return {
        tableData: [],
        dialogVisible: false,
        textarea: ""
      }
    },
    methods: {
      queryTicket(data) {
        queryTicket(data).then(res => {

          let detailList = res.data.data.Details;
          if (detailList) {
            detailList.forEach((arr, index) => {
              if (parseInt(arr.status) === 1) {
                arr.status = "平台处理中"
              } else if (parseInt(arr.status) === 2) {
                arr.status = "企业处理中"
              } else if (parseInt(arr.status) === 3) {
                arr.status = "正常结束"
              } else if (parseInt(arr.status) === 4) {
                arr.status = "强制结束"
              }
              if (index === 0) {
                arr["editButton"] = false;
                arr["replyButton"] = true;
              }
              if (index === 1) {
                arr["editButton"] = true;
                arr["replyButton"] = false;
              }
              console.log(arr);
              this.textarea = arr.content;
              arr.last_time = parseTime(new Date(arr.last_time));
            })
          }
          this.tableData = detailList
        })
      },
      reply(data) {
        if (data) {
          this.$message({
            type: 'warning',
            message: '不能重复回复!'
          });
        } else {
          this.dialogVisible = true;
          this.textarea = ""
        }
      },

    }
  }
</script>

<style lang="less" scoped>
  .header {
    height: 60px;
    border-bottom: 1px solid #888888;
    display: flex;

    span {
      font-size: 18px;
      color: #1b6d85;
      margin-left: 3px;
    }

    i {
      font-size: 16px;
      cursor: pointer;
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
