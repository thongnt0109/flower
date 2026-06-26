```javascript
let flowers = [];
let currentFilter = "Tất cả";

async function loadFlowers() {

    flowers = await fetch("data/flowers.json").then(r => r.json());

    render();
    updateDashboard();

}

function render() {

    const cards = document.getElementById("cards");
    const keyword = document.getElementById("search").value.toLowerCase();

    cards.innerHTML = "";

    const list = flowers.filter(f => {

        const matchSearch =
            f.name.toLowerCase().includes(keyword) ||
            f.owner.toLowerCase().includes(keyword);

        const matchColor =
            currentFilter === "Tất cả" ||
            f.color === currentFilter;

        return matchSearch && matchColor;

    });

    list.forEach(f => {

        cards.innerHTML += `
        <div class="card">

            <div class="image-box">

                <img src="${f.image}" class="flower-img">

                <div class="favorite">❤</div>

                <div class="level">+${f.level}</div>

            </div>

            <div class="card-body">

                <h3>${f.name}</h3>

                <div class="info">
                    <span>🌸 ${f.color}</span>
                    <span>⭐ ${f.level}</span>
                </div>

                <div class="owner">
                    👤 ${f.owner}
                </div>

                <button class="view-btn">
                    Xem chi tiết
                </button>

            </div>

        </div>
        `;

    });

}

function updateDashboard() {

    document.getElementById("totalFlowers").innerText = flowers.length;

    document.getElementById("pinkCount").innerText =
        flowers.filter(f => f.color === "Đỏ Hồng").length;

    document.getElementById("purpleCount").innerText =
        flowers.filter(f => f.color === "Tím").length;

    document.getElementById("blueCount").innerText =
        flowers.filter(f => f.color === "Xanh Lam").length;

    document.getElementById("orangeCount").innerText =
        flowers.filter(f => f.color === "Cam").length;

}

document.getElementById("search").addEventListener("input", render);

document.querySelectorAll(".filters button").forEach(btn => {

    btn.onclick = () => {

        document.querySelectorAll(".filters button")
            .forEach(b => b.classList.remove("active"));

        btn.classList.add("active");

        currentFilter = btn.dataset.filter;

        render();

    }

});

loadFlowers();
```
