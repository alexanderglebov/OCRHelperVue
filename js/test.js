
const data = window.data = {
  items: [],//getItems(myJson.oppos),
  fields: []//showHeaders(myJson)
}

new Vue({
  el: '#newApp',
  data: data,
  methods: {
    change: function (item, someData) {
      item._detailsItem = item[someData]
      this.$set(item, '_showDetails', item._detailsItemName === someData ? !item._showDetails : true)
      item._detailsItemName = someData
    }
  }
})



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
          newRow._detailsItem = row._detailsItem
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
   // console.log(items)
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
    var htmlButtons = ''
    process.stages.forEach(function (stage) {
      htmlButtons += addButton(stage) + ' '
    })

    item[process.processName] = htmlButtons
  })
  return item
}

function addButton(stage) {
  switch (stage.stageStatus.statusStr) {
    case 'CompletedStStatus':
      return '<input type="button" value="' + stage.stageNameStr + '" class="btn btn-success2 btn-sm">'
    case 'ErrorStStatus':
      return '<input type="button" value="' + stage.stageNameStr + '" class="btn btn-danger1 btn-sm">'
    case 'InProcessStStatus':
      return '<input type="button" value="' + stage.stageNameStr + '" class="btn btn-warning btn-sm">'
    case 'NotStartedStStatus':
      return '<input type="button" value="' + stage.stageNameStr + '" class="btn btn-secondary btn-sm">'
    case 'StoppedStStatus':
      return '<input type="button" value="' + stage.stageNameStr + '" class="btn btn-info btn-sm">'
    default:
      break
  }
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