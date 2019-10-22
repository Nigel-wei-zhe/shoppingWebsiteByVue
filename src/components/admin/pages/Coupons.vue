<template>
  <div>
    <loading :active.sync="isLoading" ></loading>
    <div class="text-right mt-4">
      <button class="btn btn-primary" @click="openModel(true)"> 建立新的優惠劵</button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>優惠劵名稱</th>
          <th width="">折扣%</th>
          <th width="">截止日期</th>
          <th width="">是否啟用</th>
          <th width="">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in coupons" :key="item.id">
          <td>{{ item.title }}</td>
          <td class="text-right">
            {{ item.percent }}
          </td>
          <td>{{ item.due_date}}</td>
          <td>
            <span v-if="item.is_enabled === 1" class="text-success">啟用</span>
            <span v-else class="text-right">未啟用</span>
          </td>
          <td class="btn-group">
            <button type="button" class="btn btn-outline-primary btn-sm" @click="openModel(false, item)">編輯</button>
            <button type="button" class="btn btn-outline-danger btn-sm" @click="openDelProductModal(item)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <pagination @changePage="getCoupons" :page="pagination"></pagination>
    <!-- add/edit modal -->
    <div class="modal fade bd-example-modal-sm" id="couponModal" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-sm modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">新增\編輯 優惠劵</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="title">標題</label>
              <input type="text" class="form-control" id="title" placeholder="請輸入標題" v-model="tempCoupon.title">
            </div>
            <div class="form-group">
              <label for="title">折扣</label>
              <div class="input-group">
                <input type="number" class="form-control" id="title" placeholder="請輸入折扣" v-model="tempCoupon.percent">
                <div class="input-group-append">
                  <span class="input-group-text">%</span>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label for="title">截止日期</label>
              <input type="date" class="form-control" id="title" placeholder="請輸入截止日期" v-model="tempCoupon.due_date">
            </div>
            <div class="form-group">
              <label for="title">優惠代碼</label>
              <input type="text" class="form-control" id="title" placeholder="請輸入優惠碼" v-model="tempCoupon.code">
            </div>
            <div class="form-group">
              <label for="title">狀態</label>
              <div class="custom-control custom-switch d-flex justify-content-center">
                <input type="checkbox" class="custom-control-input" id="customSwitch1" v-model="tempCoupon.is_enabled" :true-value="1" :false-value="0">
                <label class="custom-control-label" for="customSwitch1">是否啟用</label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">確認</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
import pagination from '../../pagination'

export default {
  components: {
    pagination
  },
  data () {
    return {
      coupons: [],
      pagination: {},
      tempCoupon: {},
      isNew: false,
      isLoading: false
    }
  },
  methods: {
    getCoupons (page = 1) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupons?page=${page}`
      const vm = this
      vm.isLoading = true
      this.$http.get(api).then((response) => {
        console.log(response.data)
        vm.isLoading = false
        vm.coupons = response.data.coupons
        vm.pagination = response.data.pagination
      })
    },
    openModel (isNew, item) {
      $('#couponModal').modal('show')
    }
  }
}
</script>
