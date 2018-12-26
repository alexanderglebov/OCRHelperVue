//RESET STAGE NEEDED


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
  template: '<b-modal size="lg" ref="logModalRef" :title="stageName" id="logModal"><div class="d-block"><pre>{{itemId}}</pre></div><div slot="modal-footer" class="w-100"><b-btn @click="hideModal" class="float-right">Reset Stage</b-btn></b-btn></div></b-modal>'
})