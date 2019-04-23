//RESET STAGE NEEDED

Vue.component('files-attached-modal',{
  props: ['item-id', 'stage-name'],
  data () {
    return {
      json: {},
      options: [],
      files: []
    }
  },
  methods: {
    hideModal() {
      this.$refs.filesAttachedModalRef.hide()
    },
    showModal() {
      this.$refs.filesAttachedModalRef.show()
      this.setJson()
    },
    setJson : function () {
      var self = this
  window.fetch('files.json')
  //  window.fetch('/files')
    .then(function (response) {
      if (response.status !== 200) {
        window.alert('not 200' + 'status is: ' + response.status + ' ' + response.statusText)
      }
      return response.json()
    })
    .then(function (myJson) {
      self.json = myJson
      self.options = $.makeArray(myJson.files)
      // myJson.files.forEach(function (fileName) {
      //   this.options.push(fileName)
      // })
     // showAttachedFiles(myJson.files, oppoId, stageName)
    })
    },
    sendFiles: function () {
      console.log(this.files)
    },
    filterFilesAttached: function() {
  var self = this
  var filterBy = $('#filesLabelFilter').val().toLowerCase()
  self.options = self.json.files.filter(fileName => fileName.toLowerCase().includes(filterBy))
},
    clearFilterFilesAttached: function() {
      var self = this
      $('#filesLabelFilter').val('')
      self.options = self.json.files
    }
},
  template: '<b-modal size="lg" ref="filesAttachedModalRef" :title="stageName" id="filesAttachedModal">' +
  '<div class="input-group mb-3">' +
  '<input type="text" class="form-control" aria-describedby="basic-addon2" id="filesLabelFilter">' +
    '<div class="input-group-append">' +
  '<button class="btn btn-outline-secondary" type="button" v-on:click="clearFilterFilesAttached">Clear</button><button class="btn btn-outline-secondary" type="button" v-on:click="filterFilesAttached">Filter</button></div></div>' +
  '<div class="advDiv"><div class="form-check border-bottom" v-for="file in options">' +
  '<input class="form-check-input" type="checkbox" :value="file" v-model="files"><label class="form-check-label">{{file}}</label>' +
  '</div></div>' +
  // '<div class="d-block">' +
  // '<pre><b-form-checkbox-group v-model="files" class="ml-1" stacked name="flavour2" :options="options"></b-form-checkbox-group></pre>' +
  // '</div>' +
  '<div slot="modal-footer" class="float-right"><b-btn @click="sendFiles()" class="mr-3" variant="outline-primary">Attach Selected Files</b-btn><b-btn variant="outline-secondary" @click="hideModal" class="mr-0">Reset Stage</b-btn></div>' +
  '</b-modal>'
})

// function filterFilesAttached() {
//   console.log($('#files-attached-modal').json)
//   var self = this
//   var filterBy = $('#filesLabelFilter').val()
//   self.json = self.json.filter(fileName => fileName.contains(filterBy))
// }