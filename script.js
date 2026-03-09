const API="https://phi-lab-server.vercel.app/api/v1/lab"
let allIssues=[]

function login(){
  const user=document.getElementById("username").value
  const pass=document.getElementById("password").value

  if(user==="admin" && pass==="admin123"){
    document.getElementById("loginPage").classList.add("hidden")
    document.getElementById("mainPage").classList.remove("hidden")
    loadIssues()
  }else{
    alert("Invalid credentials")
  }
}

async function loadIssues(){
  document.getElementById("loading").classList.remove("hidden")
  const res=await fetch(`${API}/issues`)
  const data=await res.json()
  allIssues=data.data
  displayIssues(allIssues)
  document.getElementById("loading").classList.add("hidden")
}

function displayIssues(list){
  const container=document.getElementById("issueContainer")
  container.innerHTML=""
  document.getElementById("issueCount").innerText=list.length+" Issues"

  list.forEach(issue=>{
    const isOpen=issue.status.toLowerCase()==="open"
    const border=isOpen ? "border-t-4 border-green-500" : "border-t-4 border-purple-500"

    const card=document.createElement("div")
    card.className=`issue-card bg-white border ${border} rounded-lg p-4 shadow-sm relative`

    // Status logo
    let statusLogo = isOpen ? "Open-Status.png" : "Closed- Status .png"; 

    const statusBadge = `<img src="${statusLogo}" alt="${isOpen ? 'Open' : 'Closed'} status" class="status-badge w-5 h-5">`;

    // Priority badge
    let priorityColor="bg-gray-400"
    if(issue.priority){
      if(issue.priority.toLowerCase()==="high") priorityColor="bg-red-500"
      else if(issue.priority.toLowerCase()==="medium") priorityColor="bg-yellow-500"
      else if(issue.priority.toLowerCase()==="low") priorityColor="bg-gray-400"
    }

    const priorityBadge=`<span class="priority-badge ${priorityColor}">${issue.priority || "HIGH"}</span>`

    // Generate labels from API
    let labelsHTML=""

    if(issue.labels && issue.labels.length){
      issue.labels.forEach(label=>{

        let labelClass="bg-red-100 text-red-600"

        if(label==="enhancement"){
          labelClass="bg-[#BBF7D0] text-[#00A96E]"
        }
        else if(label==="good first issue"){
          labelClass="bg-sky-100 text-blue-600"
        }
        else if(label==="documentation"){
          labelClass="bg-gray-200 text-black"
        }
        else if(label==="help wanted"){
          labelClass="bg-yellow-100 text-yellow-700"
        }

        labelsHTML+=`
          <span class="${labelClass} text-xs px-3 py-1 rounded-full">
            ${label.toUpperCase()}
          </span>
        `
      })
    }

    card.innerHTML=`
      ${statusBadge}
      ${priorityBadge}

      <h3 class="font-semibold text-sm mb-2 mt-6">
        ${issue.title}
      </h3>

      <!-- DESCRIPTION -->
      <p class="text-xs text-gray-600 mb-3 line-clamp-3">
        ${issue.description}
      </p>

      <!-- LABEL BUTTONS -->
      <div class="flex gap-2 mb-3">
        ${labelsHTML}
      </div>

      <!-- AUTHOR & DATE -->
      <div class="text-xs space-y-1 text-gray-500">
        <p>Author: ${issue.author}</p>
        <p>Date: ${issue.createdAt || "N/A"}</p>
      </div>
    `

    card.onclick=()=>loadSingleIssue(issue.id)
    container.appendChild(card)
  })
}

function filterIssues(type, btn){

  document.querySelectorAll(".tabBtn").forEach(b=>{
    b.classList.remove("bg-[#4A00FF]","text-white")
  })

  btn.classList.add("bg-[#4A00FF]","text-white")

  const filtered =
    type === "all"
      ? allIssues
      : allIssues.filter(issue => issue.status.toLowerCase() === type)

  displayIssues(filtered)
}

async function loadSingleIssue(id) {
  const res = await fetch(`${API}/issue/${id}`);
  const data = await res.json();
  const issue = data.data;

  document.getElementById("modalTitle").innerText = issue.title;
  document.getElementById("modalDesc").innerText = issue.description;
  document.getElementById("modalAuthor").innerText = issue.author;
  document.getElementById("modalAssignee").innerText = issue.assignee || "Unassigned";
  document.getElementById("modalDate").innerText = new Date(issue.createdAt).toLocaleDateString();
  document.getElementById("modalPriority").innerText = issue.priority || "HIGH";

  const labelContainer = document.getElementById("modalLabel");
labelContainer.innerHTML = "";

if (issue.labels && issue.labels.length) {

  issue.labels.forEach(label => {

    const span = document.createElement("span");
    span.innerText = label.toUpperCase();

    let labelClass = "text-xs px-3 py-1 rounded-full mr-2 ";

    if (label.toLowerCase() === "enhancement") {
      labelClass += "bg-[#BBF7D0] text-[#00A96E]";
    }
    else if (label.toLowerCase() === "good first issue") {
      labelClass += "bg-sky-100 text-blue-600";
    }
    else if (label.toLowerCase() === "documentation") {
      labelClass += "bg-gray-200 text-black";
    }
    else if (label.toLowerCase() === "help wanted") {
      labelClass += "bg-yellow-100 text-yellow-700";
    }
    else {
      labelClass += "bg-red-100 text-red-600";
    }

    span.className = labelClass;
    labelContainer.appendChild(span);

  });

} 
else {

  const span = document.createElement("span");
  span.innerText = "BUG";
  span.className = "text-xs px-3 py-1 rounded-full bg-red-100 text-red-600";
  labelContainer.appendChild(span);

}  const statusColor = issue.status.toLowerCase() === "open" ? "bg-green-500" : "bg-purple-500";
  const statusElem = document.getElementById("modalStatusText");
  statusElem.innerText = issue.status;
  statusElem.className = `px-2 py-0.5 text-white text-xs rounded-full ${statusColor}`;

  document.getElementById("modal").classList.remove("hidden");
}

function closeModal(){
  document.getElementById("modal").classList.add("hidden")
}