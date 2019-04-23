//RESET STAGE NEEDED

Vue.component('revenues-modal',{
  props: ['item-id', 'stage-name', 'item-log'],
  data () {
    return {
      chosenAccount: '',
      html: '',
      json: {},
      options: [],
      files: [],
      keywords: [
        '-- Choose Category --',
        'McaDepoWithdNames',
        'GenericDepositsKeywords',
        'OnlineKeywords',
        'WireKeywords',
        'OtherDeductableKeywords',
        'GenericWithdKeywords',
        'NsfKeywords',
        'McaKeywords',
        'ReturnKeywords',
        'OverdraftKeywords',
        'McaWithdNames'
      ],
      revenueCategories: [
        'DepositAdvance',
        'WireTransfers',
        'OnlineTransfers',
        'Returns',
        'WithdReturns',
        'OtherDeductables',
        'GenericDeposits',
        'GenericWithdrawals',
        'WithdrawalAdvance',
        'RepeatingFees',
        'Overdraft',
        'ZeroTransaction',
        'Check',
        'Fee',
        'NSF'
      ]
    }
  },
  watch: {
    itemId: function() {
      this.chooseAccount()
    }
  },
  methods: {
    hideModal() {
      this.$refs.revenuesModalRef.hide()
    },
    showModal() {
      this.$refs.revenuesModalRef.show()
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
      window.fetch('revenues.json')
      //  window.fetch('/files')
        .then(function (response) {
          if (response.status !== 200) {
            window.alert('not 200' + 'status is: ' + response.status + ' ' + response.statusText)
          }
          return response.json()
        })
        .then(function (myJson) {
          self.json = myJson
          self.options = $.makeArray(myJson)
        })
    },
    sendFiles: function () {
      console.log(this.json)
    },
    changeCat: function (categoryName, revenue) {
      console.log(categoryName)
      console.log(revenue)
    }
  },
  template: '<b-modal size="lg" ref="revenuesModalRef" :title="stageName" id="revenuesModal" >' +
  '<b-input-group class="mt" style="margin-bottom: 10px">' +
  '<b-form-select prepend v-model="keywords[0]" id="preselection">' +
  '<option v-for="key in keywords">{{key}}</option>' +
  '</b-form-select>' +
  '<b-form-input></b-form-input>' +
  '<b-button slot="append" variant="secondary">Add</b-button>' +
  '</b-input-group>' +



  '<div class="advDiv"><table class="table table-striped table-hover table-bordered advTable"  >' +
  '<th>Date</th><th>Description</th><th width="100">Amount</th><th width="220">Tags</th><th>Deducted</th>' +
  '<tr v-for="revenue in json">' +
  '<td>{{revenue.date}}</td><td onclick="addMcaLabel()">{{revenue.descr}}</td><td>{{revenue.amount}}</td><td>' +
  '<b-form-select v-model="revenue.tags[0]" v-on:change="changeCat($event, revenue)">' +
  '<template slot="first"><option>{{revenue.tags[0]}}</option></template>' +
  '<option v-for="revenueCat in revenueCategories" >{{revenueCat}}</option></b-form-select>' +
  '</td><td><div class="custom-control custom-checkbox ui-checkboxradio-disabled"><input type="checkbox" v-model="revenue.isDeducted"></div></td>' +
  '</tr></table></div>' +

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
