// ARRAY

const canzoni = [
    { id: 1, artista: 'Deftones', titolo: 'Be Quiet and Drive (Far Away)', genere: 'Metal', voto: 4, cover: 'assets/img/deftones.jpg', preferito: false },
    { id: 2, artista: 'Deftones', titolo: 'My Own Summer (Shove It)', genere: 'Metal', voto: 4, cover: 'assets/img/deftones.jpg', preferito: false },
    { id: 3, artista: 'Deftones', titolo: 'Entombed', genere: 'Metal', voto: 3, cover: 'assets/img/deftones2.jpg', preferito: false },
    { id: 4, artista: 'Red Hot Chili Peppers', titolo: 'Snow (Hey Oh)', genere: 'Rock', voto: 5, cover: 'assets/img/rhcp1.jpg', preferito: false },
    { id: 5, artista: 'Red Hot Chili Peppers', titolo: 'Scar Tissue', genere: 'Rock', voto: 4, cover: 'assets/img/rhcp2.jpg', preferito: false },
    { id: 6, artista: 'Red Hot Chili Peppers', titolo: 'I Could Have Lied', genere: 'Rock', voto: 3, cover: 'assets/img/rhcp3.jpg', preferito: false },
    { id: 7, artista: 'TOOL', titolo: 'Sober', genere: 'Progressive Metal', voto: 5, cover: 'assets/img/tool3.jpg', preferito: false },
    { id: 8, artista: 'TOOL', titolo: 'Schism', genere: 'Progressive Metal', voto: 5, cover: 'assets/img/tool2.jpg', preferito: false },
    { id: 9, artista: 'TOOL', titolo: 'H.', genere: 'Progressive Metal', voto: 4, cover: 'assets/img/tool1.jpg', preferito: false }
];

//
const contenitore = document.getElementById('titles-container');
const inputRicerca = document.getElementById('search-input');
const selectGenere = document.getElementById('generi');
const bottonePreferiti = document.getElementById('favoritesButton');
const bottoneTema = document.getElementById('theme-button');


function mostraCanzoni(lista) {
    contenitore.innerHTML = '';

    lista.forEach(function (c) {
        //riga intera
        const canzone = document.createElement('div');
        canzone.className = 'canzone';

        //copertina
        const cover = document.createElement('div');
        cover.className = 'canzone-cover';

        const img = document.createElement('img');
        img.src = c.cover;
        img.alt = `Copertina di ${c.titolo}`;
        cover.appendChild(img);

        //titolo e artista
        const info = document.createElement('div');
        info.className = 'canzone-info';

        const titolo = document.createElement('h3');
        titolo.textContent = c.titolo;

        const artista = document.createElement('p');
        artista.textContent = c.artista;

        info.appendChild(titolo);
        info.appendChild(artista);

        //genere, stelle, cuore
        const extra = document.createElement('div');
        extra.className = 'canzone-extra';

        const badge = document.createElement('span');
        badge.className = 'badge';
        badge.textContent = c.genere;

        const bottone = document.createElement('button');
        bottone.className = 'preferito';
        bottone.type = 'button';
        bottone.dataset.id = c.id;
        bottone.setAttribute('aria-label', 'Aggiungi o rimuovi dai preferiti');

        const cuore = document.createElement('i');
        cuore.className = (c.preferito ? 'fa-solid' : 'fa-regular') + ' fa-heart';
        bottone.appendChild(cuore);

        extra.appendChild(badge);
        extra.appendChild(creaStelle(c.voto));
        extra.appendChild(bottone);

        canzone.appendChild(cover);
        canzone.appendChild(info);
        canzone.appendChild(extra);
        contenitore.appendChild(canzone);
    });
}

function creaStelle(voto) {
    const stelle = document.createElement('span');
    stelle.className = 'stelle';
    stelle.setAttribute('aria-label', `Voto: ${voto} stelle su 5`);

    for (let i = 1; i <= 5; i++) {
        const stella = document.createElement('i');
        stella.className = i <= voto ? 'fa-solid fa-star' : 'fa-regular fa-star';
        stelle.appendChild(stella);
    }

    return stelle;
}

let soloPreferiti = false;

function aggiorna() {
    const testo = inputRicerca.value.toLowerCase();
    const genere = selectGenere.value;

    const risultato = canzoni.filter(function (c) {
        const matchTesto = c.titolo.toLowerCase().includes(testo)
            || c.artista.toLowerCase().includes(testo);
        const matchGenere = genere === 'tutti i generi' || c.genere === genere;
        const matchPreferiti = !soloPreferiti || c.preferito;

        return matchTesto && matchGenere && matchPreferiti;
    });

    mostraCanzoni(risultato);
}

inputRicerca.addEventListener('input', aggiorna);
selectGenere.addEventListener('change', aggiorna);

bottonePreferiti.addEventListener('click', function () {
    soloPreferiti = !soloPreferiti;
    bottonePreferiti.classList.toggle('attivo');
    aggiorna();
});

contenitore.addEventListener('click', function (e) {
    const bottone = e.target.closest('.preferito');
    if (!bottone) return;

    const id = Number(bottone.dataset.id);
    const canzone = canzoni.find(function (c) {
        return c.id === id;
    });

    canzone.preferito = !canzone.preferito;
    aggiorna();
});

bottoneTema.addEventListener('click', function () {
    const icona = bottoneTema.querySelector('i');

    console.log('Clic ricevuto:', icona);

    document.documentElement.classList.toggle('scuro');

    const scuro = document.documentElement.classList.contains('scuro');
    icona.className = scuro ? 'fa-solid fa-sun' : 'fa-solid fa-moon';

});
mostraCanzoni(canzoni);