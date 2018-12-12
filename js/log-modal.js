//Vue.component('blog-post', {
Vue.component('log-modal',{
  props: ['item-id', 'stage-name'],
  methods: {
    hideModal() {
         this.$refs.logModalRef.hide()
       },
    showModal() {
      this.$refs.logModalRef.show()
    }
  },
  //   methods: {
  // showLogModal (item ,stageName) {
  //   this.item = item
  //   this.stageName = stageName + ' (Log)'
  //   this.$refs.logModalRef.show()
  // },
  // hideModal () {
  //   this.$refs.logModalRef.hide()
  // }
// },
  template: '<b-modal size="lg" ref="logModalRef" hide-footer :title="stageName" id="logModal"><div class="d-block text-center"><pre>{{itemId}}</pre></div><b-btn class="mt-3" variant="outline-danger" block @click="hideModal">Close Me</b-btn></b-modal>'
})