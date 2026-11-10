# Portfolio — Andrea Mariotti

Sito portfolio statico (HTML + CSS + JavaScript, nessun framework, nessuna build).
Mantiene l'identità del sito Webflow originale — nero `#161515`, blob neon magenta/verde/blu,
titoli condensati maiuscoli — con layout, tipografia e interazioni rifatti da zero e
completamente responsive.

## Struttura

```
index.html                  → tutte le sezioni del sito
assets/css/style.css        → stile completo (variabili colore in cima al file)
assets/js/data.js           → ⬅ I TUOI CONTENUTI: reel/post e siti web
assets/js/main.js           → logica (menu, filtri, animazioni) — non serve toccarlo
assets/img/                 → la tua foto del ritratto (da aggiungere)
assets/img/reel/            → copertine dei reel/post (formato verticale 9:16)
assets/img/web/             → screenshot dei siti (formato orizzontale 16:10)
```

## Come aggiungere contenuti

Apri **`assets/js/data.js`**: ci sono due liste, `CONTENUTI` (reel e post) e
`SITI` (siti web). Copia un blocco esistente, modifica i campi e salva. Il sito si aggiorna
da solo — i filtri "Tutti / Reel / Post" si generano in automatico dalle categorie usate.

Se un'immagine manca o il percorso è sbagliato, al suo posto compare un segnaposto neon
coerente con il brand: il sito non si rompe mai.

### Contenuti già caricati

I 5 reel e i 4 post vengono dal deck Figma del portfolio. Le copertine sono state
convertite in WebP: **452 KB in totale** partendo da 24 MB di originali.

⚠️  I link delle card puntano per ora al **profilo** Instagram (cinelab.torino e
ftcitaly), non al singolo post. Per sistemarli apri `assets/js/data.js` e sostituisci
il campo `link` di ogni contenuto con l'URL che Instagram ti dà con "Copia link".

### Immagini consigliate
| Dove | Formato | Dimensione |
|---|---|---|
| Reel / post | verticale 9:16 | 720 × 1280 px |
| Siti web | orizzontale 16:10 | 1440 × 900 px |
| Ritratto | quadrato 1:1 | 800 × 800 px |

## Da personalizzare prima di pubblicare

1. **Foto** → salva il ritratto in `assets/img/` e scrivi il percorso nella costante `FOTO`
   in cima a `assets/js/data.js` (se resta vuoto compare il monogramma "AM")
2. **Link social** → in `index.html`, sezione contatti: sostituisci gli `href="#"` di
   Instagram, TikTok e LinkedIn con i tuoi profili
3. **Numeri della sezione "Chi sono"** → in `index.html` cerca `data-count` e metti i valori reali
4. **Metriche dei reel** → in `data.js`, campi `views` e `likes` (lascia `""` per nasconderli)
5. **Dominio** → in `index.html`, il `<link rel="canonical">` e l'`og:url`

## La palette

Sette colori, tutti su gradiente, nella gamma fredda-calda senza viola né rosa:

| Nome | Colore | Dove si usa |
|---|---|---|
| Verde | `#2BE88C` | palline, inizio del gradiente del brand |
| Teal | `#14C8A6` | palline |
| Ciano | `#22D3EE` | palline, centro del gradiente, icone |
| Blu | `#2B6BFF` | palline, ritratto, fine del gradiente |
| Lime | `#A3E635` | palline |
| Ambra | `#FFC53D` | palline piccole |
| Arancio | `#FF7A2B` | palline piccole |

Si cambiano tutti in cima a `assets/css/style.css`, nel blocco `:root`.
Il gradiente del brand (`--grad-brand`) va da verde a ciano a blu e si vede nei titoli
in evidenza, nel bottone principale e nella barra di avanzamento.

## La hero: sequenza 3D a scorrimento

All'apertura il nome **ANDREA MARIOTTI** resta fermo al centro mentre palline,
preview dei contenuti e parole chiave salgono verso l'alto su piani di profondità
diversi, passando dietro (e qualcuna davanti) alle lettere. Dura **220vh di
scorrimento** su desktop e **200vh** su mobile, poi il nome si allontana e si va
dritti al Chi sono.

- **Prospettiva vera**: tutto vive in uno spazio 3D (`perspective: 1150px`). Gli
  elementi lontani sono più piccoli, più sfocati, più spenti e si muovono di meno —
  non è un effetto finto, è la prospettiva che fa il suo lavoro.
- **Mouse**: su desktop il piano si inclina di un paio di gradi seguendo il cursore.
- **Velo dietro al titolo**: un alone scuro sfumato (`.hero__center::before`) smorza
  lo sfondo sotto il nome senza spegnere il resto della scena. Si regola allargando
  il raggio del `radial-gradient` o alzandone le opacità.
- **Morbidezza**: la posizione insegue lo scorrimento con un'interpolazione, così
  anche uno scatto della rotellina si trasforma in un movimento fluido.
- **Mobile**: stessa animazione, con una selezione ridotta di elementi (19 invece
  di 25) e dimensioni al 60%, per non appesantire il telefono.
- **Entrata al caricamento**: aloni e barra di navigazione entrano in dissolvenza,
  poi gli elementi si accendono uno dopo l'altro avvicinandosi dal fondo, infine
  compare l'invito a scorrere. Se la pagina si apre in una scheda in secondo piano
  l'animazione aspetta e parte quando la guardi.

### Cambiare quello che vola

Tutto è definito in `assets/js/main.js`, nella tabella `HERO_LAYOUT`:

| Campo | Cosa fa |
|---|---|
| `k` | tipo: `ball` (pallina), `card` (preview), `word` (parola) |
| `x` | posizione orizzontale, in % dal centro |
| `z` | profondità di partenza (negativo = lontano, positivo = davanti al nome) |
| `zt` | di quanto si avvicina durante il viaggio |
| `st` | quando entra in scena (0 = inizio, 1 = fine); negativo = già visibile all'apertura |
| `m` | `1` se deve comparire anche su mobile |

Le **parole** sono in `HERO_WORDS`, le **preview** arrivano da sole dai primi 4
contenuti e dai primi 2 siti di `data.js`: appena metti un'immagine vera lì, compare
anche qui dentro. Finché non c'è, resta un segnaposto sfumato con il titolo.

## Le altre animazioni

| Dove | Cosa fa | Dove si regola |
|---|---|---|
| Nome in hero | Entra lettera per lettera da dietro una maschera | `style.css` → `@keyframes charUp` |
| Titoli di sezione | Allo scroll ogni parola sale da dietro una maschera | `style.css` → `[data-anim="rise"]` |
| Paragrafi | Allo scroll ogni parola si schiarisce e mette a fuoco | `style.css` → `[data-anim="fade"]` |
| Bottoni magnetici | Si inclinano verso il cursore | attributo `data-magnet` |
| Card | Si sollevano al passaggio del mouse | `style.css` sez. 11 e 12 |
| Voce di menu attiva | Pillola chiara + barretta in gradiente sotto l'etichetta | `style.css` → `.nav__link.is-active` |

Per animare il testo di un nuovo elemento basta aggiungergli `data-anim="rise"`
(titoli) o `data-anim="fade"` (paragrafi): la divisione in parole avviene da sola e
il testo resta leggibile dagli screen reader grazie a un `aria-label` automatico.

Tutto si disattiva da solo se il sistema ha attivo "riduci movimento": in quel caso
la hero diventa una schermata singola, ferma.

## Vedere il sito in locale

```bash
cd ~/Desktop/PORTFOLIO && python3 -m http.server 4321
```

Poi apri <http://localhost:4321>.

## Il sito online

Il sito è pubblicato su GitHub Pages:

**https://andreamario04040-ship-it.github.io/portfolio/**

Repository: https://github.com/andreamario04040-ship-it/portfolio (pubblico)

Per aggiornarlo dopo una modifica bastano tre comandi:

```bash
cd ~/Desktop/PORTFOLIO && git add -A && git commit -m "aggiorno i contenuti" && git push
```

GitHub rigenera il sito da solo in un paio di minuti.

## Altri modi per pubblicarlo## Altri modi per pubblicarlo

Essendo un sito statico puoi caricarlo ovunque. Il modo più rapido: trascina la cartella
su [app.netlify.com/drop](https://app.netlify.com/drop) — online in pochi secondi, gratis,
con HTTPS incluso. In alternativa Vercel, GitHub Pages o il tuo hosting via FTP.
