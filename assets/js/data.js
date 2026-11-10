/* =========================================================
   DATI DEL SITO — questo è l'unico file che devi modificare
   per aggiungere/togliere contenuti. Nessun altro file va toccato.
   ========================================================= */

/* ---------------------------------------------------------
   0) LA TUA FOTO (sezione "Chi sono")
   ---------------------------------------------------------
   Salva il ritratto in assets/img/ e scrivi qui il percorso.
   Se resta vuoto compare il monogramma "AM" sul cerchio neon.
--------------------------------------------------------- */
const FOTO = "assets/img/andrea.webp";


/* ---------------------------------------------------------
   1) CONTENUTI SOCIAL — reel e post
   ---------------------------------------------------------
   categoria  : "reel" | "post"   (usata dai filtri)
   formato    : "reel" (verticale 9:16) | "post" (quadrato/4:5)
   piattaforma: "instagram" | "tiktok" | "youtube" | "linkedin"
   img        : copertina, es. "assets/img/reel/nome.webp"
   link       : URL del contenuto online
   views/likes: metriche mostrate sulla card (lascia "" per nasconderle)

   I 5 reel puntano al singolo contenuto su Instagram.
   ⚠️  I 4 post puntano ancora al profilo @ftcitaly: Instagram mostra solo
       pochi post a chi non ha l'accesso, quindi non e' stato possibile
       risalire ai link diretti. Incollali qui quando li hai sottomano
       (su Instagram: apri il post -> ... -> "Copia link").
--------------------------------------------------------- */
const CONTENUTI = [
  {
    titolo: "Recitazione — «Quanto ci credevamo?»",
    cliente: "Ass. CineLAB",
    categoria: "reel",
    formato: "reel",
    piattaforma: "instagram",
    img: "assets/img/reel/recitazione.webp",
    link: "https://www.instagram.com/reel/DUV669hiAGA/",
    views: "",
    likes: "251"
  },
  {
    titolo: "Cortometraggio — cosa significa oggi",
    cliente: "Ass. CineLAB",
    categoria: "reel",
    formato: "reel",
    piattaforma: "instagram",
    img: "assets/img/reel/cortometraggio.webp",
    link: "https://www.instagram.com/reel/DVWZu6TCM4R/",
    views: "",
    likes: "169"
  },
  {
    titolo: "Scrittura — «Quante volte hai provato a scrivere»",
    cliente: "Ass. CineLAB",
    categoria: "reel",
    formato: "reel",
    piattaforma: "instagram",
    img: "assets/img/reel/scrittura.webp",
    link: "https://www.instagram.com/reel/DWJ4kZgiFif/",
    views: "",
    likes: "210"
  },
  {
    titolo: "Trailer dell'evento",
    cliente: "FTC Italy",
    categoria: "reel",
    formato: "reel",
    piattaforma: "instagram",
    img: "assets/img/reel/trailer-evento.webp",
    link: "https://www.instagram.com/reel/DXW_H2GghFy/",
    views: "",
    likes: "244"
  },
  {
    titolo: "I robot in gara",
    cliente: "FTC Italy",
    categoria: "reel",
    formato: "reel",
    piattaforma: "instagram",
    img: "assets/img/reel/robot.webp",
    link: "https://www.instagram.com/reel/DXt2tIOh5rN/",
    views: "",
    likes: "102"
  },
  {
    titolo: "Imagine if FTC Euros were real",
    cliente: "FTC Italy",
    categoria: "post",
    formato: "post",
    piattaforma: "instagram",
    img: "assets/img/reel/post-ftc-euros.webp",
    link: "https://www.instagram.com/ftcitaly/",
    views: "",
    likes: ""
  },
  {
    titolo: "Winner of the FTC Judge's Choice Award",
    cliente: "FTC Italy",
    categoria: "post",
    formato: "post",
    piattaforma: "instagram",
    img: "assets/img/reel/post-winner.webp",
    link: "https://www.instagram.com/ftcitaly/",
    views: "",
    likes: ""
  },
  {
    titolo: "Il villaggio della competizione",
    cliente: "FTC Italy",
    categoria: "post",
    formato: "post",
    piattaforma: "instagram",
    img: "assets/img/reel/post-collage.webp",
    link: "https://www.instagram.com/ftcitaly/",
    views: "",
    likes: ""
  },
  {
    titolo: "Join the FTC Group",
    cliente: "FTC Italy",
    categoria: "post",
    formato: "post",
    piattaforma: "instagram",
    img: "assets/img/reel/post-join-ftc.webp",
    link: "https://www.instagram.com/ftcitaly/",
    views: "",
    likes: ""
  }
];

/* ---------------------------------------------------------
   2) SITI WEB
   ---------------------------------------------------------
   stato  : "online" | "in corso" | "archiviato"
   wide   : true  → la card occupa tutta la larghezza (in evidenza)
   img    : screenshot del sito, es. "assets/img/web/nome.jpg"
   link   : URL del sito ("#" se non ancora pubblico)
--------------------------------------------------------- */
const SITI = [
  {
    titolo: "Stadio del Nuoto",
    anno: "2022",
    descrizione: "Il mio primo sito professionale: presentazione dell'impianto, orari dei corsi e contatti. Struttura chiara e navigazione pensata per chi cerca un'informazione in pochi secondi.",
    tags: ["Webflow", "UI Design", "Responsive", "SEO base"],
    url: "stadiodelnuoto.it",
    link: "#",
    img: "",   // <- percorso immagine, es. "assets/img/web/stadio-del-nuoto.jpg"
    stato: "online",
    wide: true
  },
  {
    titolo: "Alla scoperta del Giappone",
    anno: "2023",
    descrizione: "Sito editoriale realizzato per Roll Cloud durante il PCTO 2022/2023. Racconto visivo con sezioni tematiche, gallery e identità grafica dedicata.",
    tags: ["Webflow", "Art Direction", "Storytelling"],
    url: "rollcloud.it/giappone",
    link: "#",
    img: "",   // <- percorso immagine, es. "assets/img/web/giappone.jpg"
    stato: "archiviato",
    wide: false
  },
  {
    titolo: "Nuovo progetto",
    anno: "2026",
    descrizione: "Sito in costruzione per un nuovo cliente. Design system su misura, animazioni leggere e massima attenzione alle performance mobile.",
    tags: ["HTML/CSS", "JavaScript", "Design System"],
    url: "coming-soon.it",
    link: "#",
    img: "",   // <- percorso immagine, es. "assets/img/web/progetto-in-corso.jpg"
    stato: "in corso",
    wide: false
  }
];
