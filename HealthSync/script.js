function next(){
  let spec = document.getElementById("spec").value;
  localStorage.setItem("spec", spec);
  window.location = "doctor.html";
}

function nextDoctor(){
  let doc = document.getElementById("doc").value;
  localStorage.setItem("doc", doc);
  window.location = "time.html";
}

function nextTime(){
  let time = document.getElementById("time").value;
  localStorage.setItem("time", time);
  window.location = "confirm.html";
}

function logout(){
  localStorage.removeItem("login");
  window.location = "login.html";
}

if(localStorage.getItem("login") !== "true"){
  window.location = "login.html";
}

function finish(){
  let s = localStorage.getItem("spec");
  let d = localStorage.getItem("doc");
  let date = localStorage.getItem("date");
  let t = localStorage.getItem("time");

  let record = s + " - " + d + " - " + date + " - " + t;

  let history = JSON.parse(localStorage.getItem("history")) || [];
  history.push(record);
  localStorage.setItem("history", JSON.stringify(history));

  window.location = "history.html";
}

function selectSpecialty(spec){
  localStorage.setItem("spec", spec);
  window.location = "doctor.html";
}

function selectDoctor(doc){
  localStorage.setItem("doc", doc);
  window.location = "calendar.html";
}

const doctors = {
  "Cardiologist":[
    {name:"Dr. Jadaone", desc:"10 yrs experience | Top rated"},
    {name:"Dr. Habac", desc:"Trusted doctor | Patient-focused"}
  ],
  "Dentist":[
    {name:"Dr. Villamor", desc:"Gentle dental care"},
    {name:"Dr. Santos", desc:"Top rated dentist"}
  ],
  "Dermatologist":[
    {name:"Dr. Garcia", desc:"Skin care expert"},
    {name:"Dr. Villegas", desc:"Top rated | Trusted"}
  ],
  "OB-GYN":[
    {name:"Dr. Lopez", desc:"Women’s care expert"},
    {name:"Dr. Ramos", desc:"Trusted OB doctor"}
  ],
  "Pediatrician":[
    {name:"Dr. Aquino", desc:"Child-friendly care"},
    {name:"Dr. Bautista", desc:"Trusted pediatrician"}
  ],
  "General Physician":[
    {name:"Dr. Katigbak", desc:"Primary care expert"},
    {name:"Dr. Gallaga", desc:"Top rated | Trusted family doctor"}
  ],
  "Ophthalmologist":[
    {name:"Dr. Reyes", desc:"Experienced | Eye care expert"},
    {name:"Dr. Castaneda", desc:"10 yrs experience | Vision specialist"}
  ],
  "Psychiatrist":[
    {name:"Dr. Lamangan", desc:"Mental health expert"},
    {name:"Dr. Guillen", desc:"Trusted mental health doctor"}
  ],
  "Neurologist":[
    {name:"Dr. Rivera", desc:"Brain and nerve expert"},
    {name:"Dr. Lamasan", desc:"Neurological care specialist"}
  ]
};

window.onload = function () {
  let doctorList = document.getElementById("doctorList");
  if(doctorList){
    let specialty = localStorage.getItem("spec");
    if(!specialty || !doctors[specialty]){
      doctorList.innerHTML = "<p>No doctors available</p>";
      return;
    }
    let title = document.getElementById("selectedSpec");
    if(title){
      title.innerText = specialty + " Doctors";
    }
    doctorList.innerHTML = doctors[specialty].map(doc => `
      <div class="card" onclick="selectDoctor('${doc.name}')">
        <h2>${doc.name}</h2>
        <p>${doc.desc}</p>
      </div>
    `).join("");
  }

  let historyContainer = document.getElementById("history");
  if(historyContainer){
    let history = JSON.parse(localStorage.getItem("history")) || [];
    if(history.length === 0){
      historyContainer.innerHTML = "<p>No past bookings</p>";
    } else {
      historyContainer.innerHTML = history.map(record => `
        <div class="card">${record}</div>
      `).join("");
    }
  }
};

let selectedTime = "";
const takenSlots = {
  "2026-04-05": ["9:00 AM", "1:00 PM"],
  "2026-04-06": ["10:00 AM"]
};

function loadSlots(){
  let date = document.getElementById("date").value;
  let container = document.getElementById("slots");
  container.innerHTML = "";
  let times = ["9:00 AM","10:00 AM","1:00 PM","3:00 PM"];
  times.forEach(time => {
    let div = document.createElement("div");
    div.classList.add("slot");
    div.innerText = time;
    if(takenSlots[date] && takenSlots[date].includes(time)){
      div.classList.add("taken");
    } else {
      div.onclick = () => selectTime(div, time);
    }
    container.appendChild(div);
  });
}

function selectTime(el, time){
  document.querySelectorAll(".slot").forEach(s => s.classList.remove("selected"));
  el.classList.add("selected");
  selectedTime = time;
}

function confirmBooking(){
  let date = document.getElementById("date").value;
  if(date === "" || selectedTime === ""){
    alert("Select date and time!");
    return;
  }
  localStorage.setItem("date", date);
  localStorage.setItem("time", selectedTime);
  window.location = "confirm.html";
}