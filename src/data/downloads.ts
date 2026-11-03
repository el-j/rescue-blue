import type { Locale } from "../i18n";

export type DownloadCategory = "poster" | "sticker" | "flyer" | "stencil";

export interface DownloadTemplate {
  id: string;
  category: DownloadCategory;
  formatLabel: string;
  title: string;
  description: string;
  fileUrl: string;
  fileName: string;
}

const DOWNLOADS_BY_LOCALE: Record<Locale, DownloadTemplate[]> = {
  de: [
    {
      id: "poster-harmony",
      category: "poster",
      formatLabel: "DIN A4 / A3 Plakat (SVG/Vektor)",
      title: "Plakat: »Blau ist unser Planet, der Himmel & der Frieden«",
      description:
        "Einladendes Fenster- und Vereinsplakat für ein herzliches Miteinander, Freiheit und den Schutz unserer Lebensgrundlagen.",
      fileUrl: "downloads/poster-blau-harmonie.svg",
      fileName: "rette-blau-plakat-harmonie.svg",
    },
    {
      id: "sticker-vector",
      category: "sticker",
      formatLabel: "DIN A7 / Druck-PDF",
      title: "Druckvorlage: Antifa Peng & Blaues Band (Vektor-PDF)",
      description:
        "Hochauflösende Druckdatei mit Schnittmarken für eigene Stickerbögen, Buttons oder Vereinsdrucke vor Ort.",
      fileUrl: "antifa-peng.pdf",
      fileName: "antifa-peng-vektor-vorlage.pdf",
    },
    {
      id: "flyer-neighborhood",
      category: "flyer",
      formatLabel: "DIN A4 Aushang mit Abriss-Zetteln",
      title: "Hausflur- & Schwarzes-Brett-Aushang: »Schön, dass du hier bist«",
      description:
        "Freundlicher Nachbarschafts-Aushang für Supermärkte, Bibliotheken, Hochschulen und Gemeindezentren mit Abriss-Streifen.",
      fileUrl: "downloads/flyer-nachbarschaft.svg",
      fileName: "rette-blau-nachbarschafts-aushang.svg",
    },
    {
      id: "stencil-peace",
      category: "stencil",
      formatLabel: "Schablone / Stencil (DIN A4)",
      title: "Kreativ-Schablone für Straßenkreide & Fensterbilder",
      description:
        "Zum einfachen Ausschneiden aus Pappe für Kinderfeste, abwaschbare Straßenkreide-Kunst oder kreative Banner.",
      fileUrl: "downloads/stencil-rette-blau.svg",
      fileName: "rette-blau-kreativ-schablone.svg",
    },
  ],
  en: [
    {
      id: "poster-harmony",
      category: "poster",
      formatLabel: "A4 / A3 Poster (SVG Vector)",
      title: "Poster: 'Blue is Our Planet, the Sky & Peace'",
      description:
        "Welcoming window and community poster celebrating harmony, freedom, human dignity, and our shared Blue Planet.",
      fileUrl: "downloads/poster-blau-harmonie.svg",
      fileName: "rescue-blue-poster-harmony.svg",
    },
    {
      id: "sticker-vector",
      category: "sticker",
      formatLabel: "A7 / Print PDF",
      title: "Print Template: Antifa Peng & Blue Ribbon (Vector PDF)",
      description:
        "High-resolution print file with crop marks for DIY sticker sheets, buttons, or local community printing.",
      fileUrl: "antifa-peng.pdf",
      fileName: "antifa-peng-vector-template.pdf",
    },
    {
      id: "flyer-neighborhood",
      category: "flyer",
      formatLabel: "A4 Notice Board Tear-off Flyer",
      title: "Community Board Flyer: 'Glad You Are Here'",
      description:
        "Warm neighborhood flyer for libraries, cafés, universities, and community centers with handy tear-off tabs.",
      fileUrl: "downloads/flyer-nachbarschaft.svg",
      fileName: "rescue-blue-neighborhood-flyer.svg",
    },
    {
      id: "stencil-peace",
      category: "stencil",
      formatLabel: "Craft Stencil (A4)",
      title: "Creative Stencil for Sidewalk Chalk & Window Art",
      description:
        "Easy-to-cut cardboard stencil template for washable chalk art, community festivals, and banners.",
      fileUrl: "downloads/stencil-rette-blau.svg",
      fileName: "rescue-blue-creative-stencil.svg",
    },
  ],
  fr: [
    {
      id: "poster-harmony",
      category: "poster",
      formatLabel: "Affiche A4 / A3 (Vecteur SVG)",
      title: "Affiche : « Le bleu est notre planète, le ciel et la paix »",
      description:
        "Affiche accueillante pour fenêtres et associations en faveur de la paix, de la liberté et du vivre-ensemble.",
      fileUrl: "downloads/poster-blau-harmonie.svg",
      fileName: "rette-blau-affiche-harmonie.svg",
    },
    {
      id: "sticker-vector",
      category: "sticker",
      formatLabel: "PDF d'impression A7",
      title: "Modèle d'impression : Antifa Peng & Ruban Bleu (PDF)",
      description:
        "Fichier haute résolution pour imprimer vos propres planches d'autocollants ou badges.",
      fileUrl: "antifa-peng.pdf",
      fileName: "antifa-peng-modele-vecteur.pdf",
    },
    {
      id: "flyer-neighborhood",
      category: "flyer",
      formatLabel: "Affichette A4 à languettes",
      title: "Affichette de quartier : « Heureux de vous voir ici »",
      description:
        "Affichette conviviale pour bibliothèques, cafés et tableaux d'affichage avec languettes détachables.",
      fileUrl: "downloads/flyer-nachbarschaft.svg",
      fileName: "rette-blau-affichette-quartier.svg",
    },
    {
      id: "stencil-peace",
      category: "stencil",
      formatLabel: "Pochoir créatif (A4)",
      title: "Pochoir pour craie de trottoir et décoration de fenêtres",
      description:
        "Modèle facile à découper pour la craie lavable, les fêtes de quartier et les ateliers créatifs.",
      fileUrl: "downloads/stencil-rette-blau.svg",
      fileName: "rette-blau-pochoir-creatif.svg",
    },
  ],
  es: [
    {
      id: "poster-harmony",
      category: "poster",
      formatLabel: "Póster A4 / A3 (Vector SVG)",
      title: "Póster: «El azul es nuestro planeta, el cielo y la paz»",
      description:
        "Cartel acogedor para ventanas y centros vecinales por la armonía, la libertad y el cuidado del planeta.",
      fileUrl: "downloads/poster-blau-harmonie.svg",
      fileName: "rette-blau-poster-armonia.svg",
    },
    {
      id: "sticker-vector",
      category: "sticker",
      formatLabel: "PDF de impresión A7",
      title: "Plantilla de impresión: Antifa Peng y Lazo Azul (PDF)",
      description:
        "Archivo vectorial de alta resolución para imprimir pegatinas, chapas o materiales comunitarios.",
      fileUrl: "antifa-peng.pdf",
      fileName: "antifa-peng-plantilla-vector.pdf",
    },
    {
      id: "flyer-neighborhood",
      category: "flyer",
      formatLabel: "Cartel A4 con tiras recortables",
      title: "Cartel para tablón vecinal: «Qué alegría que estés aquí»",
      description:
        "Cartel cercano para bibliotecas, comercios, universidades y centros cívicos con tiras informativas.",
      fileUrl: "downloads/flyer-nachbarschaft.svg",
      fileName: "rette-blau-cartel-vecinal.svg",
    },
    {
      id: "stencil-peace",
      category: "stencil",
      formatLabel: "Plantilla creativa (A4)",
      title: "Plantilla para tiza lavable y decoración comunitaria",
      description:
        "Fácil de recortar en cartón para fiestas infantiles, arte con tiza en la acera y pancartas.",
      fileUrl: "downloads/stencil-rette-blau.svg",
      fileName: "rette-blau-plantilla-creativa.svg",
    },
  ],
  tr: [
    {
      id: "poster-harmony",
      category: "poster",
      formatLabel: "A4 / A3 Afiş (SVG Vektör)",
      title: "Afiş: «Mavi Gezegenimiz, Gökyüzü ve Barıştır»",
      description:
        "Uyum, özgürlük, barış ve ortak yaşam alanlarımızı korumak için sıcak bir pencere ve mahalle afişi.",
      fileUrl: "downloads/poster-blau-harmonie.svg",
      fileName: "rette-blau-afis-uyum.svg",
    },
    {
      id: "sticker-vector",
      category: "sticker",
      formatLabel: "A7 / Baskı PDF",
      title: "Baskı Şablonu: Antifa Peng ve Mavi Kurdele (Vektör PDF)",
      description:
        "Kendi çıkartma sayfalarınız, rozetleriniz veya yerel etkinlikleriniz için yüksek çözünürlüklü baskı dosyası.",
      fileUrl: "antifa-peng.pdf",
      fileName: "antifa-peng-vektor-sablon.pdf",
    },
    {
      id: "flyer-neighborhood",
      category: "flyer",
      formatLabel: "Koparmalı A4 Duyuru Panosu Afişi",
      title: "Mahalle Panosu Duyurusu: «Burada Olman Ne Güzel»",
      description:
        "Kütüphaneler, kültür merkezleri ve apartman girişleri için koparmalı bilgi şeritleri içeren dostane afiş.",
      fileUrl: "downloads/flyer-nachbarschaft.svg",
      fileName: "rette-blau-mahalle-duyurusu.svg",
    },
    {
      id: "stencil-peace",
      category: "stencil",
      formatLabel: "Yaratıcı Şablon (A4)",
      title: "Sokak Tebeşiri ve Pencere Sanatı İçin Şablon",
      description:
        "Mahalle şenlikleri ve yıkanabilir tebeşir sanatı için kartondan kolayca kesilebilen şablon.",
      fileUrl: "downloads/stencil-rette-blau.svg",
      fileName: "rette-blau-yaratici-sablon.svg",
    },
  ],
  uk: [
    {
      id: "poster-harmony",
      category: "poster",
      formatLabel: "Плакат A4 / A3 (SVG вектор)",
      title: "Плакат: «Синій — це наша планета, небо і мир»",
      description:
        "Доброзичливий плакат для вікон та громадських просторів на підтримку миру, свободи та взаємоповаги.",
      fileUrl: "downloads/poster-blau-harmonie.svg",
      fileName: "rette-blau-poster-harmony.svg",
    },
    {
      id: "sticker-vector",
      category: "sticker",
      formatLabel: "A7 / PDF для друку",
      title: "Шаблон для друку: Antifa Peng та Синя Стрічка (PDF)",
      description:
        "Векторний файл високої якості для друку власних стікерів або значків.",
      fileUrl: "antifa-peng.pdf",
      fileName: "antifa-peng-vector-template.pdf",
    },
    {
      id: "flyer-neighborhood",
      category: "flyer",
      formatLabel: "Оголошення A4 з відривними смужками",
      title: "Сусідське оголошення: «Раді, що ти тут»",
      description:
        "Тепле оголошення для бібліотек, університетів та дошок оголошень із контактами підтримки.",
      fileUrl: "downloads/flyer-nachbarschaft.svg",
      fileName: "rette-blau-neighborhood-flyer.svg",
    },
    {
      id: "stencil-peace",
      category: "stencil",
      formatLabel: "Трафарет для творчості (A4)",
      title: "Трафарет для крейди та віконних малюнків",
      description:
        "Легкий шаблон для вирізання з картону для дитячих свят та малюнків крейдою.",
      fileUrl: "downloads/stencil-rette-blau.svg",
      fileName: "rette-blau-creative-stencil.svg",
    },
  ],
  pl: [
    {
      id: "poster-harmony",
      category: "poster",
      formatLabel: "Plakat A4 / A3 (Wektor SVG)",
      title: "Plakat: „Błękit to nasza planeta, niebo i pokój”",
      description:
        "Przyjazny plakat do okna lub świetlicy promujący harmonię, wolność, pokój i szacunek.",
      fileUrl: "downloads/poster-blau-harmonie.svg",
      fileName: "rette-blau-plakat-harmonia.svg",
    },
    {
      id: "sticker-vector",
      category: "sticker",
      formatLabel: "PDF do druku A7",
      title: "Szablon do druku: Antifa Peng i Niebieska Wstążka (PDF)",
      description:
        "Plik wektorowy wysokiej rozdzielczości do druku własnych arkuszy naklejek i przypinek.",
      fileUrl: "antifa-peng.pdf",
      fileName: "antifa-peng-szablon-wektor.pdf",
    },
    {
      id: "flyer-neighborhood",
      category: "flyer",
      formatLabel: "Ogłoszenie A4 z odrywanymi paskami",
      title: "Plakat sąsiedzki: „Dobrze, że tu jesteś”",
      description:
        "Życzliwe ogłoszenie na tablice w bibliotekach, uczelniach i centrach lokalnych.",
      fileUrl: "downloads/flyer-nachbarschaft.svg",
      fileName: "rette-blau-ogloszenie-sasiedzkie.svg",
    },
    {
      id: "stencil-peace",
      category: "stencil",
      formatLabel: "Szablon kreatywny (A4)",
      title: "Szablon do kredy chodnikowej i dekoracji okien",
      description:
        "Prosty szablon do wycięcia z kartonu na festyny sąsiedzkie i zmywalne rysunki kredą.",
      fileUrl: "downloads/stencil-rette-blau.svg",
      fileName: "rette-blau-szablon-kreatywny.svg",
    },
  ],
  it: [
    {
      id: "poster-harmony",
      category: "poster",
      formatLabel: "Poster A4 / A3 (Vettoriale SVG)",
      title: "Poster: «Il blu è il nostro pianeta, il cielo e la pace»",
      description:
        "Locandina accogliente per finestre e circoli dedicata all'armonia, alla libertà e alla cura del pianeta.",
      fileUrl: "downloads/poster-blau-harmonie.svg",
      fileName: "rette-blau-poster-armonia.svg",
    },
    {
      id: "sticker-vector",
      category: "sticker",
      formatLabel: "PDF di stampa A7",
      title: "Modello di stampa: Antifa Peng e Nastro Blu (PDF)",
      description:
        "File vettoriale ad alta risoluzione per stampare fogli di adesivi o spille.",
      fileUrl: "antifa-peng.pdf",
      fileName: "antifa-peng-modello-vettoriale.pdf",
    },
    {
      id: "flyer-neighborhood",
      category: "flyer",
      formatLabel: "Volantino A4 da bacheca",
      title: "Locandina di quartiere: «Che bello averti qui»",
      description:
        "Volantino cordiale per biblioteche, università e bacheche di quartiere con tagliandi staccabili.",
      fileUrl: "downloads/flyer-nachbarschaft.svg",
      fileName: "rette-blau-volantino-quartiere.svg",
    },
    {
      id: "stencil-peace",
      category: "stencil",
      formatLabel: "Stencil creativo (A4)",
      title: "Stencil per gessetti da marciapiede e vetrofanie",
      description:
        "Modello facile da ritagliare nel cartone per feste di quartiere e disegni con gessetti lavabili.",
      fileUrl: "downloads/stencil-rette-blau.svg",
      fileName: "rette-blau-stencil-creativo.svg",
    },
  ],
  ru: [
    {
      id: "poster-harmony",
      category: "poster",
      formatLabel: "Плакат A4 / A3 (SVG вектор)",
      title: "Плакат: «Синий — это наша планета, небо и мир»",
      description:
        "Тёплый плакат для окон и общественных пространств в поддержку гармонии, свободы и мира.",
      fileUrl: "downloads/poster-blau-harmonie.svg",
      fileName: "rette-blau-poster-harmony.svg",
    },
    {
      id: "sticker-vector",
      category: "sticker",
      formatLabel: "A7 / PDF для печати",
      title: "Макет для печати: Antifa Peng и Синяя Лента (PDF)",
      description:
        "Векторный файл высокого разрешения для печати собственных стикеров и значков.",
      fileUrl: "antifa-peng.pdf",
      fileName: "antifa-peng-vector-template.pdf",
    },
    {
      id: "flyer-neighborhood",
      category: "flyer",
      formatLabel: "Объявление A4 с отрывными листками",
      title: "Соседское объявление: «Рады, что вы здесь»",
      description:
        "Доброжелательное объявление для библиотек, кафе и досок объявлений с полезными контактами.",
      fileUrl: "downloads/flyer-nachbarschaft.svg",
      fileName: "rette-blau-neighborhood-flyer.svg",
    },
    {
      id: "stencil-peace",
      category: "stencil",
      formatLabel: "Трафарет для творчества (A4)",
      title: "Трафарет для уличного мела и оконных рисунков",
      description:
        "Удобный шаблон для вырезания из картона для детских праздников и рисунков смываемым мелом.",
      fileUrl: "downloads/stencil-rette-blau.svg",
      fileName: "rette-blau-creative-stencil.svg",
    },
  ],
};

export function getDownloadTemplates(lang: Locale): DownloadTemplate[] {
  return DOWNLOADS_BY_LOCALE[lang] ?? DOWNLOADS_BY_LOCALE.de;
}
