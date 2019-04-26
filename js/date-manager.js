function normalizeDate(str) {
  var date = getDateFrom(str)
  return date.getDate() + '/' + (date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/' + date.getFullYear() + '\n' + date.getHours() + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':' + (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
}

function getDateFrom(str) {
    if (str.includes('Some')) {
      str = str.substr(5, (str.length - 1))
      str = str.substr(0, (str.length - 1))
    }
    var dateArray = str.split(' ')
    var strDate = dateArray[0] + ', ' + dateArray[2] + ' ' + dateArray[1] + ' ' + dateArray[5] + ' ' + dateArray[3]
    var dateInMs = Date.parse(strDate)
    var date = new Date(dateInMs)
    return date
}