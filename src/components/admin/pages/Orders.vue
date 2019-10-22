<template>
    <div>
        <loading :active.sync="isLoading" ></loading>
        <table class="table mt-4">
        <thead>
            <tr>
            <th width="120">訂單ID</th>
            <th width="120">姓名</th>
            <th width="120">電話</th>
            <th width="120">Email</th>
            <th width="120">付款狀態</th>
            <th width="120">金額</th>
            <th width="">留言</th>
            <th width="100">編輯</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in orders" :key="item.id">
            <td></td>
            <td></td>
            <td class="text-right">
            </td>
            <td class="text-right">
            </td>
            <td>
                <span  class="text-right">未啟用</span>
            </td>
            <td class="btn-group">
                <button type="button" class="btn btn-outline-primary btn-sm" >編輯</button>
                <button type="button" class="btn btn-outline-danger btn-sm" >刪除</button>
            </td>
            </tr>
        </tbody>
        </table>
    </div>
</template>
<script>
export default {
  data () {
    return {
      orders: [],
      isLoading: true
    }
  },
  methods: {
    getOrders (page = 1) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/orders?page=${page}`
      const vm = this
      vm.isLoading = true
      this.$http.get(api).then((response) => {
        console.log(response.data)
        vm.isLoading = false
        vm.orders = response.data.orders
      })
    }
  },
  created () {
    this.getOrders()
  }
}
</script>
