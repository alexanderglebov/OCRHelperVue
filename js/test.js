
const data = window.data = {
  items: [],//getItems(myJson.oppos),
  fields: [],//showHeaders(myJson)
  processes: [],
  showModal: false,
  currentItemLog: null,
  currentItemId: '',
  stageName: ''

}

var processes

new Vue({
  el: '#newApp',
  data: data,
  methods: {
   change: function (item, processName) {

     //  item._detailsItem = item[someData]
     this.$set(item, '_showDetails', item._detailsItemName === processName ? !item._showDetails : true)
     item._detailsItemName = processName
   },
    // hidePopUp: function () {
    //   this.$refs.logModal.hideModal()
    // },
    showPopUp: function (log, stageName, id) {
      this.currentItemId = id
      this.stageName = stageName
      this.currentItemLog = log
      switch (stageName) {
        case 'DocumentsDownloaded': this.$refs.documentsDownloadModal.showModal()
          break
        case 'FilesAttached': this.$refs.filesAttachedModal.showModal()
          break
        case 'AccountChosen': this.$refs.accountChosenModal.showModal()
          break
        case 'AdvancesValidated': this.$refs.advancesModal.showModal()
          break
        case 'TrueRevenue': this.$refs.revenuesModal.showModal()
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

function showProcesses(json) {
  var processes = []
  for (var processName in json.processes){
    processes.push(processName)
  }
  return processes
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
      processes = myJson.processes

      // remember opened rows
       var openedDetails = data.items.filter(row => row._showDetails)
     // console.log(openedDetails)
      data.fields = showHeaders(myJson)
      data.processes = showProcesses(myJson)
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
  var processesNames = []
  for (var key in processes) {
    processesNames.push(key)
  }
  var items = []
  oppos.reverse().forEach(function (oppo) {
    var item = {id: oppo.id, oppoName: oppo.oppoName, crButton: {stageName: '', color: ''}, dpButton: {stageName: '', color: ''}}
    processesNames.forEach(function (processName) {
      item[processName + 'Button'] = addLastDocProcessStageButton(oppo, processName)
    })
    item = addButtonsToItem(oppo, item)
   // item.dpButton = addLastDocProcessStageButton(oppo, 'Document Processing')
   // item.crButton = addLastDocProcessStageButton(oppo, 'Credit Report')
    //console.log(item)
    items.push(item)
  })
  return items
}

function addLastDocProcessStageButton(oppo, procc) {
  var button = {}
  oppo.processes.forEach(function (process) {
    if (process.processName === procc) {
      var stage = process.stages[process.stages.length - 1]
      button.stageName = stage.stageNameStr
      switch (stage.stageStatus.statusStr) {
        case 'CompletedStStatus':
          button.color = 'btn-success2'
          break
        case 'ErrorStStatus':
          button.color = 'btn-danger1'
          break
        case  'InProcessStStatus':
          button.color = 'btn-warning'
          break
        case 'NotStartedStStatus':
          button.color = 'btn-secondary'
          break
        case 'StoppedStStatus':
          button.color = 'btn-info'
          break
        default:
          break
      }
    }
  })
  if (Object.entries(button).length === 0 && button.constructor === Object) {
    button.color = 'btn-secondary'
    button.stageName = 'Not Started'
    return button
  } else {
    return button
  }
}

function addButtonsToItem(oppo, item) {
  var processesNames = []
  for (var key in processes) {
    processesNames.push(key)
  }
  oppo.processes.forEach(function (process) {
   // if (processesNames.includes(process.processName)) {
   // if (process.processName === 'Credit Report') {
    //  console.log()
      var buttons = []
      processes[process.processName].forEach(function (stage) {
        let stageInOppo = process.stages.filter(oppoStage => oppoStage.stageNameStr === stage)
        if (stageInOppo[0] !== undefined) {
          buttons.push({name: stageInOppo[0].stageNameStr, status: stageInOppo[0].stageStatus.statusStr, log: stageInOppo[0].stageStatus.log})
        } else {
          buttons.push({name: stage, status: 'NotStartedStStatus', log: 'Not Started'})
        }
      })
      // process.stages.forEach(function (stage) {
      //   buttons.push({name: stage.stageNameStr, status: stage.stageStatus.statusStr, log: stage.stageStatus.log})
      // })
      item[process.processName] = buttons
 //   }
    // else if (process.processName === 'Document Processing') {
    //   var buttons = []
    //
    //   processes[process.processName].forEach(function (stage) {
    //     let stageInOppo = process.stages.filter(oppoStage => oppoStage.stageNameStr === stage)
    //     if (stageInOppo[0] !== undefined) {
    //       buttons.push({name: stageInOppo[0].stageNameStr, status: stageInOppo[0].stageStatus.statusStr, log: stageInOppo[0].stageStatus.log})
    //     } else {
    //       buttons.push({name: stage, status: 'NotStartedStStatus', log: 'Not Started'})
    //     }
    //   })
    //   // process.stages.forEach(function (stage) {
    //   //   buttons.push({name: stage.stageNameStr, status: stage.stageStatus.statusStr, log: stage.stageStatus.log})
    //   // })
    //   item[process.processName] = buttons
    // }
  })
  processesNames.forEach(function (processName) {
    if (item[processName] === undefined) {
      item[processName] = [{name: 'NotStarted', status: 'NotStartedStStatus', log: 'Not Started'}]
     // console.log(item)
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