
const data = window.data = {
  items: [],//getItems(myJson.oppos),
  fields: [],//showHeaders(myJson)
  showModal: false,
  currentItemId: null,
  stageName: ''

}


new Vue({
  el: '#newApp',
  data: data,
  methods: {
   change: function (item, processName) {

     //  item._detailsItem = item[someData]
     this.$set(item, '_showDetails', item._detailsItemName === processName ? !item._showDetails : true)
     item._detailsItemName = processName
   },
    hidePopUp: function () {
      this.$refs.logModal.hideModal()
    },
    showPopUp: function (item, stageName) {

      console.log(item)
      this.currentItemId = item
      this.stageName = stageName
   //  console.log('item:', item, 'stageNme:', stageName)
      switch (stageName) {
        case 'DocumentsDownloaded': console.log('DD')
          break
        case 'FilesAttached': console.log('FA')
          break
        case 'AccountChosen': console.log('AC')
          break
        default: this.$refs.logModal.showModal()
      }
    }
    // },
    // showLogModal (stageName) {
    //   this.$refs.logModalRef.show()
    // },
    // hideModal () {
    //   this.$refs.logModalRef.hide()
    // },
    // showPopUp: function (item, stageName) {
    //   switch (stageName) {
    //     case 'DocumentsDownloaded': console.log('DD')
    //       break
    //     case 'FilesAttached': console.log('FA')
    //       break
    //     case 'AccountChosen': console.log('AC')
    //       break
    //     default: this.showLogModal(stageName)
    //   }
    // }
  }
})

 // function showLogModal() {
 //   $('#log-modal').show
 // }

function showHeaders(json) {
  var headers = ['id', {key: 'oppoName', label: 'Opportunity Name'}]
  for (var processName in json.processes){
    headers.push(processName)
  }
  return headers
}

setInterval(fetchData, 1000)

function fetchData() {
  window.fetch('data.json')
    .then(function (response) {
      if (response.status !== 200) {
        window.alert('Data fetch error, ' + 'status is: ' + response.status + ' ' + response.statusText)
      }
      return response.json()
    })
    .then(function (myJson) {
      // remember opened rows
       var openedDetails = data.items.filter(row => row._showDetails)
     // console.log(openedDetails)
      data.fields = showHeaders(myJson)
      // applying opened status to new rows
      data.items = getItems(myJson.oppos).map(newRow => {

        const row = openedDetails.find(o => o.id === newRow.id)
        if (row) {
          newRow._showDetails = row._showDetails
          newRow._detailsItemName = row._detailsItemName
         // newRow._detailsItem = row._detailsItem
        }

        return newRow
      })
    })
}

function getItems(oppos) {
  var items = []
  oppos.forEach(function (oppo) {
    var item = {id: oppo.id, oppoName: oppo.oppoName, crButton: {stageName: '', color: ''}, dpButton: {stageName: '', color: ''}}
    item = addButtonsToItem(oppo, item)
    item.dpButton = addLastDocProcessStageButton(oppo, 'Document Processing')
    item.crButton = addLastDocProcessStageButton(oppo, 'Credit Report')
    items.push(item)
  })
  return items
}

function addLastDocProcessStageButton(oppo, procc) {
  var dpButton = {}
  oppo.processes.forEach(function (process) {
    if (process.processName === procc) {
      var stage = process.stages[process.stages.length - 1]
      dpButton.stageName = stage.stageNameStr
      switch (stage.stageStatus.statusStr) {
        case 'CompletedStStatus':
          dpButton.color = 'btn-success2'
          break
        case 'ErrorStStatus':
          dpButton.color = 'btn-danger1'
          break
        case  'InProcessStStatus':
          dpButton.color = 'btn-warning'
          break
        case 'NotStartedStStatus':
          dpButton.color = 'btn-secondary'
          break
        case 'StoppedStStatus':
          dpButton.color = 'btn-info'
          break
        default:
          break
      }
    }
  })
  return dpButton
}

function addButtonsToItem(oppo, item) {
  oppo.processes.forEach(function (process) {
    if (process.processName === 'Credit Report') {
      var buttons = []
      process.stages.forEach(function (stage) {
        buttons.push({name: stage.stageNameStr, status: stage.stageStatus.statusStr, log: stage.stageStatus.log})
      })
      item[process.processName] = buttons
    } else if (process.processName === 'Document Processing') {
      var buttons = []
      process.stages.forEach(function (stage) {
        buttons.push({name: stage.stageNameStr, status: stage.stageStatus.statusStr, log: stage.stageStatus.log})
      })
      item[process.processName] = buttons
    }
  })
  return item
}

function setAppVersion () {
  window.fetch('data.json')
  //  window.fetch('/status')
    .then(function (response) {
      if (response.status !== 200) {
        window.alert('Data fetch error, ' + 'status is: ' + response.status + ' ' + response.statusText)
      }
      return response.json()
    })
    .then(function (myJson) {
      if (myJson.appVersion !== undefined) {
        setVersion(myJson.appVersion)
      }
    })
}

function setVersion (version) {
  $(document).ready(function () {
    $('#ocr-title').append('<span style="font-size: small; color: #737b81"> &nbsp;' + version + '</span>')
  })
}

setAppVersion()