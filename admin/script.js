let bestelling = JSON.parse(localStorage.getItem('bestelling'));
let tbody = document.querySelector('tbody');
for (let i = 0; i < bestelling.length; i++) {
    let tr = document.createElement('tr');
    const th = document.createElement('th');
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    const td3 = document.createElement('td');
    th.innerText = i;
    td1.innerText = bestelling[i].totaal;
    td2.innerText = bestelling[i].datum;
    tr.append(th, td1, td2, td3);
    tbody.append(tr);
}

console.log(bestelling);