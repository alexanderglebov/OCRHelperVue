const items = [
  { id: 1, name: 'Dickerson', last_name: 'Macdonald' },
  { id: 2, name: 'Larsen', last_name: 'Shaw' },
  { id: 3, name: 'Geneva', last_name: 'Wilson' },
  { id: 4, name: 'Jami', last_name: 'Carney' }
]

window.onload = function () {
  new Vue({
    el: '#app',
    data () {
      return {
        items: items
      }
    }
  })
}



