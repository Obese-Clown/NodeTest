const messageContainer = document.getElementById('messageContainer')
const messageField = document.getElementById('messageField')
const sendButton = document.getElementById('sendButton')

var socket = io.connect('/')

sendButton.addEventListener('click', () => {
  if (messageField.value !== "")
  {
    let data = {
      author: localStorage.getItem("username"),
      body: messageField.value,
      timestamp: ""
    } 
    
    sendMessage(data)

    messageField.value = ""

    messageField.focus()
  } 
})

socket.on('sendMessage', (data) => {
  var h3 = document.createElement('h3');
  
  h3.appendChild(document.createTextNode(data.author + ": " + data.body));
  
  h3.classList.add("message");

  messageContainer.appendChild(h3)

  messageContainer.scrollTop = messageContainer.scrollHeight
})

document.addEventListener('keydown', event => {
  if (event.keyCode === 13 && messageField.value !== "")
  {
    let data = {
      author: localStorage.getItem("username"),
      body: messageField.value,
      timestamp: ""
    } 
  
    sendMessage(data)

    messageField.value = ""
  }
})

function sendMessage(data)
{
  var h3 = document.createElement('h3');
  
  h3.appendChild(document.createTextNode(localStorage.getItem("username") + ": " + data.body));
  
  h3.classList.add("message");

  messageContainer.appendChild(h3)

  messageContainer.scrollTop = messageContainer.scrollHeight

  socket.emit('message', data)
}

socket.emit("join server", localStorage.getItem("username"))

messageField.focus()