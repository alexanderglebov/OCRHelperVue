var app = new Vue({
  el: '#app',
  data () {
    return {
      items: [],
      fields: []
    }
  },
  created: fetchData,
  updated: fetchData,
})

function showHeaders(json) {
  var headers = ['id', {key: 'oppoName', label: 'Opportunity Name'}]
  for (var processName in json.processes){
    headers.push(processName)
  }
  return headers
}

function fetchData() {
  var self = this
  window.fetch('data.json')
    .then(function (response) {
      if (response.status !== 200) {
        window.alert('Data fetch error, ' + 'status is: ' + response.status + ' ' + response.statusText)
      }
      return response.json()
    })
    .then(function (myJson) {
      self.fields = showHeaders(myJson)
      self.items = getItems(myJson.oppos)
    })
}

function getItems(oppos) {
  var items = []
  oppos.forEach(function (oppo) {
    var item = {id: oppo.id, oppoName: oppo.oppoName}
    item = addButtonsToItem(oppo, item)
    // console.log(item)
    items.push(item)
  })
  //console.log(items)
  return items
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

