document.addEventListener('DOMContentLoaded', function () {
    var userName = prompt("please enter your name");

    var messageInput = document.getElementById("messageInp");

    var groupNameInput = document.getElementById("groupNameInp");


    var messageToGroupInput = document.getElementById("messageToGroupInp");

    messageInput.focus();

    var proxyConnection = new signalR.HubConnectionBuilder().withUrl("/chat").build();

    proxyConnection.start().then(function () {
        document.getElementById("sendMessageBtn").addEventListener("click", function (e) {
            e.preventDefault();
            proxyConnection.invoke("Send", userName, messageInput.value);
        });


        document.getElementById("joinGroupBtn").addEventListener("click", function (e) {
            e.preventDefault();
            proxyConnection.invoke("JoinGroup", groupNameInput.value, userName);
        });


        document.getElementById("sendMessageToGroupBtn").addEventListener("click", function (e) {
            e.preventDefault();
            proxyConnection.invoke("SendMessageToGroup", groupNameInput.value, userName, messageToGroupInput.value);
        });


    }).catch(function (error) {
        console.log(error);
    });

    proxyConnection.on("ReceiveMessage", function (userName, message) {
        var listElement = document.createElement('li');
        listElement.innerHTML = `<strong>${userName}: </strong> ${message}`;
        document.getElementById("conversation").appendChild(listElement)
    })


    proxyConnection.on("NewMemberJoin", function (userName, groupName) {
        var listElement = document.createElement('li');
        listElement.innerHTML = `<strong>${userName} has joined ${groupName} </strong>`;
        document.getElementById("groupConversationUL").appendChild(listElement)
    })


    proxyConnection.on("ReceiveMessageFromGroup", function (sender, message) {
        var listElement = document.createElement('li');
        listElement.innerHTML = `<strong>${sender}: </strong> ${message}`;
        document.getElementById("groupConversationUL").appendChild(listElement)
    })

})