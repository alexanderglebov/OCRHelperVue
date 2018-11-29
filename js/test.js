

const data = {
  items: [],//getItems(myJson.oppos),
  fields: []//showHeaders(myJson)
}

var app2 = new Vue({
  el: '#newApp',
  data: data,
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
      var openedIds = data.items.filter(row => row._showDetails).map(row => row.id)
      data.fields = showHeaders(myJson)
      // applying opened status to new rows
      data.items = getItems(myJson.oppos).map(row => {
        if (openedIds.includes(row.id)) {
          row._showDetails = true
        }
        return row
      })
    })
}

function getItems(oppos) {
  var items = []
  oppos.forEach(function (oppo) {
    var item = {id: oppo.id, oppoName: oppo.oppoName, dpButton: {stageName: '', color: ''}}
    item = addButtonsToItem(oppo, item)
    item.dpButton = addLastDocProcessStageButton(oppo)
    items.push(item)
  })
  return items
}

function addLastDocProcessStageButton(oppo) {
  var dpButton = {}
  oppo.processes.forEach(function (process) {
   var stage = process.stages[process.stages.length - 1]
    dpButton.stageName = stage.stageNameStr
    switch (stage.stageStatus.statusStr)  {
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
