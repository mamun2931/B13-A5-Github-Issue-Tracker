const btnContainer = document.getElementById("btn-container");
const allBtn = document.getElementById("allBtn");
const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("search-btn");

    const loadDetails = async (id) => {
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);
    const data = await res.json();

    displayLoadDetail(data.data);
};

const displayLoadDetail = (load) => {
    const detailBox = document.getElementById("modal-container");


         let priorityColorClass = "";
        const priorityColor = load.priority.toLowerCase();

        if (priorityColor === "high") {
            priorityColorClass = "bg-[#EF444499] text-[#EF4444]"; 
        } else if (priorityColor === "medium") {
            priorityColorClass = "bg-[#F59E0B99] text-[#F59E0B]"; 
        } else {
            priorityColorClass = "bg-[#9CA3AF99] text-[#9CA3AF]"; 
        }

        const openColor = load.status.toLowerCase() === "open" ? "bg-[#00A96E]"  : "bg-[#A855F7]";

    detailBox.innerHTML = `
        <div class="space-y-5">
                   <h3 class="font-semibold text-lg">${load.title}</h3>
                  <div class="flex gap-1 items-center">
                    <p class="${openColor} px-1 rounded-full">${load.status}</p>
                     <p class= "text-[#64748B] text-sm">. Opened by ${load.assignee} . ${load.createdAt}</p>
                    
                  </div>
                    <div>
                        <p class="text-sm text-[#64748B] my-3 line-clamp-2">${load.description}</p>
                        <button class="">${createElement(load.labels)}</button>
                    </div>

                    <div class="grid grid-cols-3 bg-gray-100 p-2 rounded-lg">
                        <div>
                          <p class="text-[#64748B]">Assignee:</p>
                          <h3 class="text-[#1F2937] font-semibold">${load.assignee ? load.assignee : "Not assignee"}</h3>
                        </div>
                        <div>
                          <p class="text-[#64748B]">Priority</p>
                            <span class="text-xs font-bold ${priorityColorClass} px-3 py-1 rounded-full uppercase">${load.priority}</span>
                        </div>
                    </div>
        </div>
    `;

    document.getElementById("my_modal_5").showModal();
};


const createElement = (arr) => {

    const htmlElements = arr.map((label) => {

        let labelsColorClass = "";

        const labelLower = label.toLowerCase();

        if (labelLower === "bug") {
            labelsColorClass = "bg-[#EF444420] text-[#EF4444]";
        } 
        else if (labelLower === "enhancement") {
            labelsColorClass = "bg-[#00A96E20] text-[#00A96E]";
        } 
        else if (labelLower === "help wanted") {
            labelsColorClass = "bg-[#F59E0B20] text-[#F59E0B]";
        } 
        else if (labelLower === "documentation") {
            labelsColorClass = "bg-[#0000FF99] text-[#0000FF]";
        } 
        else {
            labelsColorClass = "bg-[#80800090] text-[#808000]";
        }

        return `<span class="btn btn-xs ${labelsColorClass}">${label}</span>`;
    });

    return htmlElements.join(" ");
};

async function loadContainer() {
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();

    const Status = [...new Set(data.data.map(issue => issue.status))];

    Status.forEach(status => {
        const btn = document.createElement("button");
        btn.className = "btn btn-soft px-10 ml-1";
        btn.innerText = status;
        btn.onclick = () => selectBtn(status, btn);
        btnContainer.appendChild(btn);
    });
}
const selectBtn = async (status, btn) => {
    showSpinner();
    
    const allButtons = document.querySelectorAll("#btn-container button");
    allButtons.forEach(b => {
        b.classList.remove("btn-primary");
        b.classList.add("btn-soft");
    });
    btn.classList.add("btn-primary");
    btn.classList.remove("btn-soft");

    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();

    const filtered = data.data.filter(issue => issue.status === status);
    
    hiddenSpinner();
    displayData(filtered);
};
searchBtn.onclick = async () => {
    const input = searchInput.value.toLowerCase();


    showSpinner();
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();

    const searched = data.data.filter(issue => 
        issue.title.toLowerCase().includes(input)
    );

    hiddenSpinner();
    displayData(searched);
};

allBtn.onclick = () => {
    const allButtons = document.querySelectorAll("#btn-container button");
    allButtons.forEach(b => {
        b.classList.remove("btn-primary");
        b.classList.add("btn-soft");
    });
    allBtn.classList.add("btn-primary");
    allBtn.classList.remove("btn-soft");
    loadData();
};

const showSpinner = () => {
    document.getElementById("loading_Spinner").classList.remove("hidden");
    document.getElementById("all_Container").innerHTML = '';
};

const hiddenSpinner = () => {
    document.getElementById("loading_Spinner").classList.add("hidden");
};
const loadData = async () => {
    showSpinner();
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    hiddenSpinner();
    displayData(data.data);
};
                            
                        

const displayData = (loads) => {
    const allContainer = document.getElementById("all_Container");
    const countElement = document.getElementById("count");
    
    allContainer.innerHTML = "";
    countElement.innerText = loads.length;

    loads.forEach(load => {



         let priorityColorClass = "";
        const priorityColor = load.priority.toLowerCase();

        if (priorityColor === "high") {
            priorityColorClass = "bg-[#EF444499] text-[#EF4444]"; 
        } else if (priorityColor === "medium") {
            priorityColorClass = "bg-[#F59E0B99] text-[#F59E0B]"; 
        } else {
            priorityColorClass = "bg-[#9CA3AF99] text-[#9CA3AF]"; 
        }




        const borderColor = load.status.toLowerCase() === "open" ? "border-t-4 border-t-[#00A96E]"  : "border-t-4 border-t-[#A855F7]";
        const imgColor = load.status.toLowerCase () === "open" ? `<img src="./assets/Open-Status.png" alt="Open-Status">` : `<img src="./assets/Closed- Status .png" alt="Closed- Status">`;

        const div = document.createElement("div");


        div.innerHTML = `
        <div onclick="loadDetails(${load.id})" class="card bg-base-100 shadow-sm space-y-5 p-4 border border-gray-100 ${borderColor} h-full">
          <figure class="justify-between flex">
            <div>${imgColor}</div>
            <button class="text-xs font-bold ${priorityColorClass} px-3 py-1 rounded-full uppercase">${load.priority}</button>
          </figure>

          <div>
            <h3 class="font-semibold text-lg">${load.title}</h3>
            <p class="text-sm text-[#64748B] my-3 line-clamp-2">${load.description}</p>
            <button class="">${createElement(load.labels)}</button>
          </div>

          <div class="pt-4 border-t text-xs text-gray-500 space-y-2">
            <p>#${load.id} by <b>${load.author}</b></p>
            <p>${load.createdAt}</p>
          </div>
        </div>
        `;
        allContainer.appendChild(div);
    });
};

loadContainer();
loadData();