let cart = JSON.parse(localStorage.getItem('cart'));
const container = document.querySelector('.container');
const aantal = document.querySelector('.aantal');
const h3 = document.createElement('h3');
const button = document.createElement('button');
const div = document.createElement('div');
const a = document.createElement('a');
let totaal = 0;

if (localStorage.getItem('aantal')) {
    aantal.innerText = localStorage.getItem('aantal');
}

for (let i = 0; i < cart.length; i++) {
    let tbody = document.querySelector('tbody');
    let tr = document.createElement('tr');
    const th = document.createElement('th');
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    const td3 = document.createElement('td');
    const td4 = document.createElement('td');
    th.innerText = i + 1;
    td1.innerText = cart[i].name;
    td2.innerText = cart[i].quantity;
    td3.innerText = '€' + cart[i].price;
    td4.innerText = '€' + (parseFloat(cart[i].price.replace(',', '.'))
        * parseInt(cart[i].quantity)).toLocaleString("nl-NL");
    tr.append(th, td1, td2, td3, td4);
    tbody.append(tr);
    totaal += parseFloat((parseFloat(cart[i].price.replace(',', '.'))
        * parseInt(cart[i].quantity)).toLocaleString("nl-NL").replace(",", "."));
}
container.append(div);
h3.innerText = '€' + totaal.toLocaleString("nl-NL");
button.innerText = 'Afrekenen';
button.classList.add("btn", "btn-primary");
div.classList.add("d-flex", "flex-column");
h3.classList.add('text-center', 'mt-3');
a.classList.add('text-center');
div.append(h3, a);
a.append(button);
a.href = '../index.html';

let bestelling;
if (localStorage.getItem('bestelling')) {
    bestelling = JSON.parse(localStorage.getItem('bestelling'));
} else {
    bestelling = [];
}

button.addEventListener('click', () => {
    localStorage.removeItem('cart');
    localStorage.removeItem('aantal');
    button.innerText = 'Danjewel voor je bestelling!';

    bestelling.push({
        totaal: totaal,
        datum: new Date().toLocaleDateString('nl-NL',
            {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            }),
    });

    localStorage.setItem('bestelling', JSON.stringify(bestelling));
});