const socket=io();
const sendBtn=document.getElementById('sendBtn');
const messageInput=document.getElementById('message');
const allMessages=document.getElementById('messages');

const name=prompt("Enter your name to join : ");


socket.on('message', (message)=>{
    // console.log(message);
    const p=document.createElement('p');
    p.innerText=message;
    allMessages.appendChild(p);
})


sendBtn.addEventListener('click',()=>{
    const message=messageInput.value;
    console.log(message);
    socket.emit('user-message',message);
})