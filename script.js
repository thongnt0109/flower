let flowers = [];

let currentFilter = "Tất cả";

async function loadFlowers() {

    const res = await fetch("data/flowers.json");
    flowers = await res.json();

    updateDashboard();

    render();

}

function updateDashboard() {

    document.getElementById("totalFlowers").textContent = flowers.length;

    const members = new Set();

    flowers.forEach(f => {

        f.owners.forEach(o => members.add(o));

    });

    document.getElementById("totalMembers").textContent = members.size;

}

function render() {

    const cards = document.getElementById("cards");

    const keyword = document
        .getElementById("search")
        .value
        .toLowerCase();

    cards.innerHTML = "";

    const list = flowers.filter(f => {

        const searchMatch =

            f.name.toLowerCase().includes(keyword)

            ||

            f.owners.join(" ").toLowerCase().includes(keyword);

        const colorMatch =

            currentFilter === "Tất cả"

            ||

            f.color === currentFilter;

        return searchMatch && colorMatch;

    });

    list.forEach(f => {

        const owners = f.owners.map(owner =>

            `<span class="owner-chip">${owner}</span>`

        ).join("");

        cards.innerHTML += `

<div class="card">

<div class="image-box">

<img src="${f.image}" class="flower-img">

</div>

<div class="card-body">

<h3>${f.name}</h3>

<p class="flower-color">

🌸 ${f.color}

</p>

<p class="owner-count">

👥 ${f.owners.length} người sở hữu

</p>

<div class="owners">

${owners}

</div>

</div>

</div>

`;

    });

}
document.getElementById("search").addEventListener("input", render);

document.querySelectorAll(".filters button").forEach(btn => {

    btn.addEventListener("click", () => {

        document.querySelectorAll(".filters button")
            .forEach(b => b.classList.remove("active"));

        btn.classList.add("active");

        currentFilter = btn.dataset.filter;

        render();

    });

});

loadFlowers();
