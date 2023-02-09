

const knop = document.querySelector('.resetknop');

knop.addEventListener("click", () => {
    localStorage.removeItem('data');
    window.location.reload();
});

fetch('../../games.json')
    .then((response) => response.json())
    .then((data) => {
        if (localStorage.getItem('data')) {
            data = JSON.parse(localStorage.getItem('data'));
        }

        console.log(data);
        let tbody = document.querySelector('tbody');

        for (let i = 0; i < data.length; i++) {
            let tr = document.createElement('tr');
            const th = document.createElement('th');
            const td1 = document.createElement('td');
            const td2 = document.createElement('td');
            const td3 = document.createElement('td');
            const td4 = document.createElement('td');
            const td5 = document.createElement('td');
            const td6 = document.createElement('td');
            const button = document.createElement('button');
            button.classList.add("btn", "btn-primary", "mx-1");
            button.innerText = 'Edit';
            button.addEventListener("click", () => {
                window.location.href = `edit.html?id=${i}`;
            });


            const button2 = document.createElement('button');
            button2.classList.add("btn", "btn-danger", "mx-1");
            button2.innerText = 'Remove';
            button2.href = '#';

            th.innerText = i;
            td1.innerText = data[i].name;
            td2.innerText = data[i].price;
            td3.innerText = data[i].genre;
            td4.innerText = data[i].platform;
            td5.innerText = data[i].releaseDate;
            td6.append(button, button2);
            tr.append(th, td1, td2, td3, td4, td5, td6);
            tbody.append(tr);

            button2.addEventListener("click", function () {
                const iVerwijder = i;
                data.splice(iVerwijder, 1);
                localStorage.setItem('data', JSON.stringify(data));
                window.location.reload();
            });
        }
    });