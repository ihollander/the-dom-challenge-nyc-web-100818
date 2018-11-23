// global timer object
let timer = {
  time: 0,
  running: true,
  likes: {},
  interval: function(callback) {
    return setInterval(callback, 1000)
  }
}

document.addEventListener('DOMContentLoaded', function(event) {
  // set counter element and start running
  const counter = document.getElementById('counter')
  function incrementTimer() {
    counter.innerHTML = ++timer.time
  }
  function decrementTimer() {
    counter.innerHTML = --timer.time
  }

  // save the setInterval to a variable for clearInterval
  let timerInterval = timer.interval(incrementTimer)

  // increment manually
  const plusser = document.getElementById('+')
  plusser.addEventListener('click', incrementTimer)

  // decrement manually
  const minuser = document.getElementById('-')
  minuser.addEventListener('click', decrementTimer)

  // like a number
  const likes = document.querySelector('.likes')
  const liker = document.getElementById('<3')
  liker.addEventListener('click', function(event) {
    if (timer.likes[timer.time]) {
      timer.likes[timer.time]++
    } else {
      timer.likes[timer.time] = 1
    }
    // display likes
    likes.innerHTML = ""
    for (const number in timer.likes) {
      likes.innerHTML += `<li>${number} has ${timer.likes[number]} like(s)</li>`  
    }
  })

  // pause timer and disable other buttons
  const buttons = document.querySelectorAll('button')
  const pauser = document.getElementById('pause')
  pauser.addEventListener('click', function(event) {
    timer.running = !timer.running // toggle timer
    if (timer.running) {
      event.target.innerText = 'pause'
      timerInterval = timer.interval(incrementTimer)
    } else {
      event.target.innerText = 'resume'
      clearInterval(timerInterval)
    }
    // toggle button states
    Array.from(buttons).forEach(function(button){
      if (button != event.target)
        button.disabled = !timer.running // button is disabled if timer is off
    })
  })

  // leave a comment
  const commentForm = document.getElementById('comment-form')
  const commentList = document.getElementById('list')
  commentForm.addEventListener('submit', function(event) {
    event.preventDefault()
    const comment = event.target.querySelector('input').value
    commentList.innerHTML += `<p>${comment}</p>`
  })

})