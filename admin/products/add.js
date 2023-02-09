let data = JSON.parse(localStorage.getItem('data'));
console.log(data);

const knop = document.getElementById('knop');

knop.addEventListener("click", () => {
    const naam = document.getElementById('naam').value;
    let prijs = document.getElementById('prijs').value;
    prijs = prijs.toString().replace(".", ",");
    const afbeelding = document.getElementById('afbeelding').value;
    const platform = document.getElementById('console').value;
    const genre = document.getElementById('genre').value;
    const datum = new Date(document.getElementById('datum').value);
    const datumFRMT = datum.toLocaleDateString('nl-NL', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const h1 = document.querySelector('h1');

    console.log(datum.value);

    if (naam === '' || afbeelding === '' || platform === '' || genre === '' || datum.value === undefined || prijs === '') {
        h1.innerText = 'Lege input veld(en) gedetecteerd! Probeer opnieuw';
    } else if (prijs < 0) {
        h1.innerText = 'Negatieve prijs kan niet!'
    } else if (datum.getFullYear() < 1900 || datum.getFullYear() > 2023) {
        h1.innerText = 'Ongeldige datum!'
    } else {
        data.push({
            name: naam, image: afbeelding, platform: platform, genre: genre, releaseDate: datumFRMT, price: prijs,
        },
        );
        localStorage.setItem('data', JSON.stringify(data),
        );
        console.log(localStorage.getItem('data'));
        window.location = 'index.html';
    }
});