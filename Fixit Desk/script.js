function login() {
    const user = document.getElementById("user").value;
    const pass = document.getElementById("pass").value;

    if (user && pass) {
        window.location.href = "index.html";
    } else {
        alert("ACCESS DENIED");
    }
}

function logout() {
    window.location.href = "login.html";
}

let tickets = [];
let currentTicket = null;

function newTicket() {
    const id = tickets.length + 1;

    const ticket = {
        id: id,
        messages: []
    };

    tickets.push(ticket);
    renderTickets();
}

function renderTickets() {
    const list = document.getElementById("ticketList");
    list.innerHTML = "";

    tickets.forEach(t => {
        const div = document.createElement("div");
        div.textContent = "#00" + t.id + " - OPEN";
        div.onclick = () => openTicket(t.id);
        list.appendChild(div);
    });
}

function openTicket(id) {
    currentTicket = tickets.find(t => t.id === id);
    renderChat();
}

function sendMessage() {
    const msg = document.getElementById("message").value;
    const file = document.getElementById("fileUpload").files[0];
    const category = document.getElementById("category").value;

    if (!currentTicket) {
        alert("Open a ticket first!");
        return;
    }

    let messageText = "> USER: " + msg + " [" + category + "]";

    if (file) {
        messageText += " (Screenshot Attached)";
    }

    currentTicket.messages.push(messageText);
    currentTicket.messages.push("> AGENT: Please wait, checking issue...");

    document.getElementById("message").value = "";
    document.getElementById("fileUpload").value = "";

    renderChat();
}

function renderChat() {
    const chat = document.getElementById("chatBox");
    chat.innerHTML = "";

    currentTicket.messages.forEach(m => {
        const p = document.createElement("p");
        p.textContent = m;
        chat.appendChild(p);
    });
}