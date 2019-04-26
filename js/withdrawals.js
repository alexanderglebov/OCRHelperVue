//RESET STAGE NEEDED

Vue.component('withdrawals-modal',{
  props: ['item-id', 'stage-name', 'item-log'],
  data () {
    return {
      chosenAccount: '',
      html: '',
      json: {},
      sortedJson: {},
      options: [],
      files: [],
      keywordForSend: '',
      keywords: [
        'WithdrawalAdvance',
        'WithdrawalAdvance',
        'WithdReturns',
        'GenericWithdrawals',
        'RepeatingFees',
        'NSF',
        'Check',
        'Fee'
      ],
      withdrawalsCategories: [
        'WithdReturns',
        'GenericWithdrawals',
        'WithdrawalAdvance',
        'RepeatingFees',
        'NSF',
        'Check',
        'Fee'
      ]
    }
  },
  methods: {
    hideModal() {
      this.$refs.withdrawalsModalRef.hide()
    },
    showModal() {
      this.$refs.withdrawalsModalRef.show()
      this.setJson()
    },
    setJson : function () {
      var self = this
      window.fetch('withdrawals.json')
      //  window.fetch('/files')
        .then(function (response) {
          if (response.status !== 200) {
            window.alert('not 200' + 'status is: ' + response.status + ' ' + response.statusText)
          }
          return response.json()
        })
        .then(function (myJson) {
          self.json = myJson
          self.sortedJson = myJson
          self.sortDescending()
          self.options = $.makeArray(myJson)
        })
    },
    sendFiles: function () {
      console.log(this.json)
    },
    changeCat: function (categoryName, revenue) {
      console.log(categoryName)
      console.log(revenue)
    },
    changeWithdrawalFilter(keyword){
      tagName = keyword
      this.sortDescending()
    },
    sortAscending () {

      if (tagName === '') {
        tagName = 'WithdrawalAdvance'
      }
      this.sortedJson = this.json.filter(withdrawal => withdrawal.tags[0] === tagName).sort(function (a, b) { return getDay(a.date) - getDay(b.date) })
      this.sortedJson = this.json.filter(withdrawal => withdrawal.tags[0] === tagName).sort(function (a, b) { return getMonth(a.date) - getMonth(b.date) })
//  showWithdrawalsBlock(json)
      // sortedJson = sortedJson.sort(function (a, b) {
      //   console.log('here')
      //   return getMonth(a.date) - getMonth(b.date)
      // })
      // showWithdrawalsBlock(sortedJson)
      $('#ascending-button').attr('class', 'btn btn-primary')
      $('#descending-button').attr('class', 'btn btn-secondary')
    //  changeWithdrawalLabel()
    },
    sortDescending () {
      console.log(tagName)
  if (tagName === '') {
    tagName = 'WithdrawalAdvance'
  }
      this.sortedJson = this.json.filter(withdrawal => withdrawal.tags[0] === tagName).sort(function (a, b) { return getDay(b.date) - getDay(a.date) })
      this.sortedJson = this.json.filter(withdrawal => withdrawal.tags[0] === tagName).sort(function (a, b) { return getMonth(b.date) - getMonth(a.date) })
  // showWithdrawalsBlock(sortedJson)
  $('#ascending-button').attr('class', 'btn btn-secondary')
  $('#descending-button').attr('class', 'btn btn-primary')
}

  },
  template: '<b-modal size="lg" ref="withdrawalsModalRef" :title="stageName" id="withdrawalsModal" >' +
  '<b-input-group class="mt-3" style="margin-bottom: 10px">' +
  '<b-form-select prepend v-model="keywords[0]" v-on:change="changeWithdrawalFilter($event)" id="withdrawalsKeywordOptionLabel">' +
  '<option v-for="key in keywords">{{key}}</option>' +
  '</b-form-select>' +
  '<b-input-group-append>' +
  '<b-button variant="secondary" v-on:click="sortAscending()" id="ascending-button">Dates ascending</b-button>' +
  '<b-button variant="secondary" v-on:click="sortDescending()" id="descending-button">Dates descending</b-button>' +
  '</b-input-group-append>' +
  '</b-input-group>' +



  '<div class="advDiv"><table class="table table-striped table-hover table-bordered advTable"  >' +
  '<th>Date</th><th>Description</th><th width="100">Amount</th><th width="220">Tags</th>' +
  '<tr v-for="revenue in sortedJson">' +
  '<td>{{revenue.date}}</td><td onclick="addRevDescr()">{{revenue.descr}}</td><td>{{revenue.amount}}</td><td>' +
  '<b-form-select v-model="revenue.tags[0]" v-on:change="changeCat($event, revenue)">' +
  '<template slot="first"><option>{{revenue.tags[0]}}</option></template>' +
  '<option v-for="withdrawalsCat in withdrawalsCategories" >{{withdrawalsCat}}</option></b-form-select>' +
  '</td>' +
  '</tr></table></div>' +

  '<div slot="modal-footer" class="float-right"><b-btn @click="advMarkAsFixed()" class="mr-3" variant="outline-primary">Mark As Fixed</b-btn><b-btn variant="outline-secondary" @click="hideModal" class="mr-0">Reset Stage</b-btn></div>' +
  '</b-modal>'
})

function setChosenAccount() {
  console.log('Smtj')
}

function addRevDescr() {
  var textMci = window.getSelection().toString()
  $('#revenue-label').val(textMci)
}

function changeWithdrawalLabel() {

}

function getMonth (str) {
  return str.split('-')[1]
}
function getDay (str) {
  return str.split('-')[2]
}

var tagName = ''

