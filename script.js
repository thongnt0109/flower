async function load() {
const data = await fetch('data/flowers.json').then(r => r.json());

```
const cards = document.getElementById('cards');

function render(q = '') {
    cards.innerHTML = '';

    data
        .filter(item =>
            JSON.stringify(item)
                .toLowerCase()
                .includes(q.toLowerCase())
        )
        .forEach(flower => {

            cards.innerHTML += `
            <div class="card">
                <img src="${flower.image || ''}" class="flower-img">

                <div class="card-body">
                    <h3>${flower.name}</h3>

                    <p>🌸 Màu: ${flower.color}</p>
                    <p>⭐ Cấp: ${flower.level}</p>
                    <p>👤 Chủ: ${flower.owner}</p>
                </div>
            </div>
            `;
        });
}

render();

document.getElementById('search').addEventListener('input', e => {
    render(e.target.value);
});
```

}

load();
