let data = JSON.parse(localStorage.getItem('data'));

const url = new URL(window.location.href);
const id = url.searchParams.get("id");

console.log(data[id]);

const naamInput = document.getElementById('naam');
naamInput.value = data[id].name;

const prijsInput = document.getElementById('prijs');
prijsInput.value = data[id].price.replace(',', '.');

const afbeeldingInput = document.getElementById('afbeelding');
afbeeldingInput.value = data[id].image;

const platformInput = document.getElementById('console');
platformInput.value = data[id].platform;

const genreInput = document.getElementById('genre');
genreInput.value = data[id].genre;

const datumInput = document.getElementById('datum');
const dateString = data[id].releaseDate;
const dateComponents = dateString.split("-");
const year = dateComponents[2];
const month = dateComponents[1];
const day = dateComponents[0];
const formattedDateString = `${year}-${month}-${day}`;
const date = new Date(formattedDateString);
datumInput.value = date.toISOString().substring(0, 10);

const knop = document.getElementById('knop');

const h1 = document.querySelector('h1');

knop.addEventListener("click", () => {
    const naam = naamInput.value;
    let prijs = prijsInput.value;
    prijs = prijs.toString().replace(".", ",");
    const afbeelding = afbeeldingInput.value;
    const platform = platformInput.value;
    const genre = genreInput.value;
    const datum = new Date(datumInput.value);
    const datumFormat = datum.toLocaleDateString('nl-NL', { day: '2-digit', month: '2-digit', year: 'numeric' });

    if (naam !== '') {
        data[id].name = naam;
    }

    if (afbeelding !== '') {
        data[id].image = afbeelding;
    }

    if (platform !== '') {
        data[id].platform = platform;
    }

    if (genre !== '') {
        data[id].genre = genre;
    }

    if (datumFormat !== '') {
        data[id].releaseDate = datumFormat;
    }

    if (prijs !== '') {
        data[id].price = prijs;
    }

    if (naam === '' || afbeelding === '' || platform === '' || genre === '' || datum === undefined || prijs === '') {
        h1.innerText = 'Lege input veld(en) gedetecteerd! Probeer opnieuw';
        console.log('bruh');
    } else if (prijs < 0) {
        h1.innerText = 'Negatieve prijs kan niet!'
    } else if (datum.getFullYear() < 1900 || datum.getFullYear() > 2023) {
        h1.innerText = 'Ongeldige datum!'
    } else {
        localStorage.setItem('data', JSON.stringify(data));
        console.log(localStorage.getItem('data'));
        window.location = '../admin.html';
    }
});