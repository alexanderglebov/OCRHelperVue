//RESET STAGE NEEDED

Vue.component('account-chosen-modal',{
  props: ['item-id', 'stage-name', 'item-log'],
  data () {
    return {
      chosenAccount: '',
      html: '',
      json: {},
      options: [],
      files: []
    }
  },
  watch: {
    itemId: function() {
      this.chooseAccount()
    }
  },
  methods: {
    hideModal() {
      this.$refs.accountChosenModalRef.hide()
    },
    showModal() {
      this.$refs.accountChosenModalRef.show()
    },
    chooseAccount: function() {
      this.html = '<button style="margin-left: 5px" type="button" class="list-group-item list-group-item-action">Dapibus ac facilisis in</button>' +
      '<button type="button"style="margin-left: 5px"  class="list-group-item list-group-item-action">Morbi leo risus</button>' +
      '<button type="button"style="margin-left: 5px"  class="list-group-item list-group-item-action">Porta ac consectetur ac</button>' +
      '<button type="button"style="margin-left: 5px"  class="list-group-item list-group-item-action">Vestibulum at eros</button>'
    //  this.html = '<a onclick="setChosenAccount()">' + this.itemId + '</a>'
    //  console.log(chosenAccount)
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
        })
    },
    sendFiles: function () {
      console.log(this.files)
    }
  },
  template: '<b-modal size="lg" ref="accountChosenModalRef" :title="stageName" id="accountChosenModal" >' +
    '<div class="row"><div class="col-md-5 list-group" id="accounts-field" v-html="html"></div>' +
    '<div class="col-md-7" id="account-chosen-log" style="margin-top: 5px"><pre>Log: {{itemLog}}</pre></div>' +
    '</div>' +

  '<div slot="modal-footer" class="float-right"><b-btn @click="sendFiles()" class="mr-3" variant="outline-primary">Attach Selected Files</b-btn><b-btn variant="outline-secondary" @click="hideModal" class="mr-0">Reset Stage</b-btn></div>' +
  '</b-modal>'
})

function setChosenAccount() {
  console.log('Smtj')
}
