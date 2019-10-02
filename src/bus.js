import Vue from 'vue'

Vue.prototype.$bus = new Vue()

// message
// this.$bus.$emit('message:push', response.data.message, 'danger')
