//RESET STAGE NEEDED

Vue.component('advances-modal',{
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
      this.$refs.advancesModalRef.hide()
    },
    showModal() {
      this.$refs.advancesModalRef.show()
      this.setJson()
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
      window.fetch('advances.json')
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
      console.log(this.json)
    }
  },
  template: '<b-modal size="lg" ref="advancesModalRef" :title="stageName" id="advancesModal" >' +
  '<div class="input-group mb-3">' +
  '<input type="text" class="form-control" placeholder="MCA Name" aria-label="Recipient\\\'s username" aria-describedby="basic-addon2" id="advLabel">' +
  '<div class="input-group-append">' +
  '<button class="btn btn-outline-secondary" type="button" onclick="addNewMca()">Add New MCA</button></div>' +
  '</div><div class="advDiv"><table class="table table-striped table-hover table-bordered advTable"  v-for="advanceGroup in json"><th>Description</th><th width="100">Amount</th><tr v-for="advance in advanceGroup"><td onclick="addMcaLabel()">{{advance.descr}}</td><td>{{advance.amount}}</td></tr></table></div>' +

  '<div slot="modal-footer" class="float-right"><b-btn @click="advMarkAsFixed()" class="mr-3" variant="outline-primary">Mark As Fixed</b-btn><b-btn variant="outline-secondary" @click="hideModal" class="mr-0">Reset Stage</b-btn></div>' +
  '</b-modal>'
})

function setChosenAccount() {
  console.log('Smtj')
}

function addMcaLabel() {
  var textMci = window.getSelection().toString()
  $('#advLabel').val(textMci)
}

function addNewMca() {
  
}

function advMarkAsFixed() {
  
}
