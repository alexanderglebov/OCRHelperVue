//RESET STAGE NEEDED

Vue.component('documents-download-modal',{
  props: ['item-id', 'stage-name'],
  data () {
    return {
      json: {},
      layouts: [],
      options: [],
      bankName: '',
      layoutName: '',
      files: []
    }
  },
  methods: {
    hideModal() {
      this.$refs.documentsDownloadModalRef.hide()
    },
    showModal() {
      this.$refs.documentsDownloadModalRef.show()
      this.setJson()
      this.setLayouts()
    },
    setJson : function () {
      var self = this
      window.fetch('layout-connection.json')
      //  window.fetch('/files')
        .then(function (response) {
          if (response.status !== 200) {
            window.alert('not 200' + 'status is: ' + response.status + ' ' + response.statusText)
          }
          return response.json()
        })
        .then(function (myJson) {
          self.bankName = myJson.bankName
          self.layoutName = myJson.layoutName
          self.json = myJson
          self.options = $.makeArray(myJson.files)
        })
    },
    setLayouts : function () {
      var self = this
      window.fetch('layouts.json')
      //  window.fetch('/files')
        .then(function (response) {
          if (response.status !== 200) {
            window.alert('not 200' + 'status is: ' + response.status + ' ' + response.statusText)
          }
          return response.json()
        })
        .then(function (myJson) {
          self.layouts = $.makeArray(myJson)
        })
    },
    sendLayoutConnection: function () {
      console.log(this.layoutName)
    }
  },
  template:
      '<b-modal ref="documentsDownloadModalRef" :title="stageName" id="docsDownloadModal">' +
      '<label for="bank-input">Bank Name</label><b-form-input id="bank-input" :value="bankName"></b-form-input><br />' +
      '<label for="layout-input">Layout Name</label><b-form-input list="datalist" id="layout-input" :value="layoutName"></b-form-input><br />' +
      '<datalist id="datalist">' +
      '<option v-for="layout in layouts">{{ layout }}</option>' +
      '</datalist>' +
      '<label for="proposed-input">Proposed Layout Name</label><b-form-input id="proposed-input" disabled></b-form-input>' +
      '<div slot="modal-footer" class="float-right"><b-btn @click="sendLayoutConnection()" class="mr-3" variant="outline-primary">Add Layout Connection</b-btn><b-btn variant="outline-secondary" @click="hideModal" class="mr-0">Reset Stage</b-btn></div>' +
      '</b-modal>'


  //
  // '<div slot="modal-footer" class="float-right"><b-btn @click="sendFiles()" class="mr-3" variant="outline-primary">Attach Selected Files</b-btn><b-btn variant="outline-secondary" @click="hideModal" class="mr-0">Reset Stage</b-btn></div>' +
  // '</b-modal>'
})







