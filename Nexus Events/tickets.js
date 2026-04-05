function generateQR() {
let name = document.getElementById("name").value;
let event = document.getElementById("event").value;
let tier = document.getElementById("tier").value;

document.getElementById("qr").innerHTML =
"<div class='card'>QR<br>" + name + "<br>" + event + "<br>" + tier + "</div>";
}