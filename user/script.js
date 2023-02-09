fetch('../games.json')
    .then((response) => response.json())
    .then((data) => {
        const wagentje = document.querySelector('.wagentje');
        if (localStorage.getItem('data')) {
            data = JSON.parse(localStorage.getItem('data'));
        }
        console.log(data);

        const div = document.createElement('div');
        div.classList.add("row");
        const container = document.querySelector('.container');
        const aantal = document.querySelector('.aantal');
        container.append(div);

        if (localStorage.getItem('aantal')) {
            aantal.innerText = localStorage.getItem('aantal');
        }

        let winkelwagen;
        if (localStorage.getItem('cart')) {
            winkelwagen = JSON.parse(localStorage.getItem('cart'));
        } else {
            winkelwagen = [];
        }


        function addToCart(game) {
            let existingGame = winkelwagen.find(g => g.name === game.name);

            if (existingGame) {
                existingGame.quantity++;
            } else {
                game.quantity = 1;
                winkelwagen.push(game);
            }

            localStorage.setItem('cart', JSON.stringify(winkelwagen));
            
            wagentje.classList.add("btn-success");
            wagentje.classList.remove("btn-dark");
            setTimeout(function () {
                wagentje.classList.remove("btn-success");
                wagentje.classList.add("btn-dark");
            }, 2000);

        }

        for (let i = 0; i < data.length; i++) {
            const div2 = document.createElement('div');
            div2.classList.add("col-xs-12", "col-sm-4", "col-md-4", "col-lg-4", "border", "text-center");
            div.append(div2);

            const h5 = document.createElement('h5');
            const img = document.createElement('img');
            const platform = document.createElement('p');
            const genre = document.createElement('p');
            const releaseDatum = document.createElement('p');
            const prijs = document.createElement('p');
            const button = document.createElement('button');

            img.classList.add("img-fluid", "same-height");
            h5.classList.add("my-3");
            platform.classList.add("mt-3");
            prijs.classList.add("fw-bold", "mt-3");
            button.classList.add("btn", "btn-primary", "mb-3");

            h5.innerText = data[i].name;
            img.src = data[i].image;
            platform.innerText = `Platform: ${data[i].platform}`;
            releaseDatum.innerText = `Releasedatum: ${data[i].releaseDate}`;
            prijs.innerText = `€${data[i].price}`;
            button.innerText = 'Bestel nu!';
            genre.innerText = `Genre: ${data[i].genre}`;
            div2.append(h5, img, prijs, button, genre, platform, releaseDatum);

            button.addEventListener("click", function () {
                aantal.innerText = parseInt(aantal.innerText) + 1;
                localStorage.setItem('aantal', aantal.innerText);
                addToCart(data[i]);
            });
        }

        localStorage.setItem('data', JSON.stringify(data));
    });