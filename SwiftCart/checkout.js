let statusText = document.getElementById("status");

let steps = [
    "Preparing your package...",
    "Shipped!",
    "Out for delivery!",
    "Delivered!"
];

let i = 0;

setInterval(() => {
    if(i < steps.length){
        statusText.innerText = steps[i];
        i++;
    }
}, 3000);