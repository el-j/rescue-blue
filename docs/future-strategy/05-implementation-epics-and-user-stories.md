# 05. Epics & User Stories: Umsetzungs-Backlog für Rette Blau 2.0

> **Status:** Vollständiger agiler Implementierungsplan  
> **Projekt:** Rette Blau (`rescue-blue`)  
> **Branch:** `strategy/future-evolution-plan`  
> **Tech-Stack:** React 19, TypeScript, Tailwind CSS v4, Lucide Icons, Vite, Vitest, Playwright, SSG-Prerender  

---

## Übersicht der Epics

| Epic-ID | Titel | Priorität | Ziel | Story Points |
| :--- | :--- | :--- | :--- | :--- |
| **EPIC-1** | **Re-Framing, neue Seitenarchitektur & Navigation** | 🔴 P0 (Höchste) | Transformation von reiner Petitionsseite zum zivilgesellschaftlichen Movement-Hub; neue Modul-Navigation, Re-Framing des Hero-Bereichs. | 13 SP |
| **EPIC-2** | **Street-Team & Physischer Aktions-Hub (Sticker & Patches)** | 🔴 P0 (Höchste) | Bestell- und Soli-Strecke für Patches & Sticker, Print-at-Home Download-Center (Open-Source-Stencils, Plakate, Flyer). | 21 SP |
| **EPIC-3** | **Alltags-Antifa Toolkit (Fact-Cards & Gegenrede)** | 🟡 P1 (Hoch) | Interaktive Wissenskarten für Stammtisch, Familie und Betrieb basierend auf den Fakten-Dossiers; Mobile-Quick-Cards & Social-Shareables. | 21 SP |
| **EPIC-4** | **Schnittstelle „Blauer Planet“ (Klima & Antifaschismus)** | 🟡 P1 (Hoch) | Visuelle Kampagnen-Sektion: Warum Klimagerechtigkeit Antifaschismus braucht und warum Rechtsextreme die Biosphäre opfern. | 13 SP |
| **EPIC-5** | **Solidaritäts- & Aktions-Radar (Connect Antifascists)** | 🔵 P2 (Mittel) | Datenschutzfreundliche interaktive Karte/Filter für Bündnisse vor Ort, Beratungsstellen für Betroffene (VBRG) und Demos. | 34 SP |
| **EPIC-6** | **Sichere Vernetzung & Dezentrale Kanäle (Signal & Bluesky)** | 🔵 P2 (Mittel) | Anbindung an Signal-Broadcasts, Bluesky/Fediverse-Feed, Leitfaden für digitale Hygiene und Sicherheit auf Demos. | 8 SP |

---

# EPIC-1: Re-Framing, neue Seitenarchitektur & Navigation

### Ziel
Die Startseite von der reinen „Farbänderungs-Petition“ zu einer mehrdimensionalen Initiative für Demokratie, Klimagerechtigkeit und Solidarität weiterentwickeln. Bestehende SEO-Rankings und Backlinks bleiben erhalten; die Petition wird als ein wichtiges historisches/laufendes Modul integriert, ist aber nicht mehr die einzige Call-to-Action.

---

### Story 1.1: Neuer Hero-Bereich & Leitmotiv „Blau ist der Planet, nicht die Hetze“
- **Als** Besucher:in der Website
- **möchte ich** sofort verstehen, dass „Rette Blau“ für eine antifaschistische, solidarische Gesellschaft und den Erhalt unserer Lebensgrundlagen steht,
- **damit ich** motiviert bin, aktiv zu werden und mich nicht in einer fruchtlosen Farbdebatte verliere.

#### Akzeptanzkriterien (Acceptance Criteria):
- [ ] **AC-1:** Der Hero-Bereich präsentiert das neue Dreiklang-Motto: *„Für den Blauen Planeten. Für die Freiheit. Gegen den Faschismus.“*
- [ ] **AC-2:** Das WeAct-Petitions-Widget wird durch ein dynamisches Multi-CTA ersetzt:
  - Primär: *„Werde Teil des Street-Teams (Patches & Sticker)“* und *„Hol dir das Alltags-Toolkit“*.
  - Sekundär: *„Zur bisherigen Petition & offenen Brief“* (bleibt erreichbar und transparent).
- [ ] **AC-3:** Vollständige Zweisprachigkeit (`de` / `en`) in den Sprachdateien hinterlegt.
- [ ] **AC-4:** Barrierefreiheit (a11y): Alle neuen Überschriften und Buttons erfüllen WCAG AA Kontrastwerte auf dunklem Hintergrund.

#### Tasks:
1. `src/components/HeroSection.tsx`: Komponenten-Struktur anpassen, um neues Leitbild und Multi-CTAs zu rendern.
2. `src/i18n/de.json` & `src/i18n/en.json`: Keys für Hero-Headline, Subline und neue CTAs definieren.
3. Unit-Tests in `src/__tests__/HeroSection.test.tsx` aktualisieren.

---

### Story 1.2: Modulare Hauptnavigation & Schnellzugriff (Sticky Bar / Drawer)
- **Als** Nutzer:in auf Smartphone oder Desktop
- **möchte ich** schnell zwischen den Bereichen (Street-Team, Toolkit, Planet, Bündnisse) springen können,
- **damit ich** ohne langes Suchen direkt zu den für mich relevanten Ressourcen gelange.

#### Akzeptanzkriterien:
- [ ] **AC-1:** Navigation in `SiteHeader.tsx` enthält Anker zu den neuen Modulen: `#street-team`, `#toolkit`, `#blauer-planet`, `#radar`, `#werte`.
- [ ] **AC-2:** Auf Mobilgeräten öffnet ein leichtgewichtiger Drawer mit klaren Icons (Lucide-Icons).
- [ ] **AC-3:** Smooth-Scrolling und aktive Sektions-Hervorhebung beim Scrollen.

#### Tasks:
1. `src/components/SiteHeader.tsx`: Navigationslinks aktualisieren.
2. `src/hooks/useActiveSection.ts`: Hook für Scroll-Spy implementieren.
3. Mobile-Menu-Animationen testen und in Playwright E2E abdecken.

---

# EPIC-2: Street-Team & Physischer Aktions-Hub (Sticker & Patches)

### Ziel
Da bereits Patches und Sticker verschickt werden, wird dieser Kanal zum Herzstück der analogen Sichtbarkeit ausgebaut. Aktive erhalten einfaches Material, um den öffentlichen Raum friedlich und kreativ zurückzugewinnen.

---

### Story 2.1: Patch- & Sticker-Soli-Bestellstrecke
- **Als** Antifaschist:in oder Demokrat:in
- **möchte ich** Sticker-Pakete und Patches bestellen (gegen Soli-Spende oder Portokosten),
- **damit ich** an meiner Kleidung und im Straßenbild sichtbare Zeichen gegen Rechts setzen kann.

#### Akzeptanzkriterien:
- [ ] **AC-1:** Modul zeigt hochauflösende Fotos der realen Patches und Sticker mit Maßangaben.
- [ ] **AC-2:** Interaktiver Mengenauswähler: *Starter-Pack (10 Sticker + 1 Patch)*, *Kiez-Pack (50 Sticker + 3 Patches)*, *Individuell*.
- [ ] **AC-3:** Soli-Modell-Kalkulator: Transparente Anzeige der Selbstkosten (z. B. 3 € Porto/Material) mit freiwilligem Soli-Aufschlag für Menschen mit geringem Einkommen.
- [ ] **AC-4:** Datenschutzkonformes Bestellformular (statisch angebunden via DSGVO-konformen Form-Endpoint z. B. Formspree/Mailto/Serverless, ohne Speicherung von Tracking-Cookies).
- [ ] **AC-5:** Automatisierte Bestätigungsnachricht mit Hinweisen zur sicheren Verwendung im öffentlichen Raum.

#### Tasks:
1. `src/components/street-team/MerchSection.tsx`: Neue Komponente für Patch/Sticker-Auswahl.
2. `src/components/street-team/OrderModal.tsx`: Zugänglicher Bestelldialog mit Tastatursteuerung.
3. Formularvalidierung in TypeScript mit Fehlerbehandlung für ungültige Postleitzahlen/E-Mails.
4. i18n-Texte für DE/EN anlegen.

---

### Story 2.2: Open-Source Print-at-Home Download-Center
- **Als** Schüler:in, Student:in oder Aktivist:in ohne Budget
- **möchte ich** druckfertige PDFs für Plakate, Flyer und Schablonen (Stencils) direkt herunterladen,
- **damit ich** noch heute in meiner Nachbarschaft oder an meiner Schule aktiv werden kann.

#### Akzeptanzkriterien:
- [ ] **AC-1:** Übersichtliches Raster mit Vorschaubildern für folgende Formate:
  - *DIN A4 / A3 Plakat:* „Kein Platz für Nazis – Blau ist der Planet, nicht der Hass“
  - *DIN A7 / Stickerbögen:* Für handelsübliche Etikettendrucker
  - *Abreißzettel (Schwarzes Brett):* Mit Abriss-Streifen für Beratungsstellen und Initiativen
  - *Stencils / Sprühschablonen (PDF):* Zum Ausschneiden aus Pappe für Kreidespray
- [ ] **AC-2:** Ein-Klick-Download aller Vorlagen als ZIP oder einzeln als Vektor-PDF.
- [ ] **AC-3:** Rechtlicher Disclaimer: Aufklärung über Sachbeschädigungs- und Plakatierungsregeln zum Schutz der Aktiven.

#### Tasks:
1. Grafiken/PDFs in `public/downloads/` ablegen.
2. `src/components/street-team/PrintAtHomeSection.tsx` implementieren.
3. Download-Klick-Tracking (rein lokal, ohne Drittanbieter-Tracker via datensparsamen Event).

---

# EPIC-3: Alltags-Antifa Toolkit (Fact-Cards & Gegenrede)

### Ziel
Ermächtigung von Menschen, in ihrem täglichen Umfeld (Arbeit, Schule, Familie, Verein) gegen rechte Narrative und Desinformation zu argumentieren. Basierend auf dem im Projekt bereits vorliegenden Faktendossier (`docs/afd-realitaet-faktendossier-rechtsextremismus-und-sozialpolitik.md`).

---

### Story 3.1: Interaktive 30-Sekunden-Faktenkarten (Pocket Fact-Cards)
- **Als** Bürger:in im Alltag
- **möchte ich** bei rassistischen oder rechtsextremen Behauptungen sofort schlagkräftige, verifizierte Gegenargumente zur Hand haben,
- **damit ich** souverän widersprechen kann, ohne lange Studien wälzen zu müssen.

#### Akzeptanzkriterien:
- [ ] **AC-1:** Themenfilter: *„Soziales & Steuern“*, *„Klima & Energie“*, *„Flucht & Migration“*, *„Demokratie & Medien“*.
- [ ] **AC-2:** Jede Fact-Card ist aufgebaut nach dem Schema:
  1. *Die rechte Behauptung* (z. B. „Die AfD hilft den kleinen Leuten“)
  2. *Die harte Realität* (z. B. DIW-Studie: AfD-Steuerpläne belasten Geringverdiener und entlasten Top-1%-Verdiener um bis zu 34.000 €)
  3. *Der 10-Sekunden-Kontersatz* für das persönliche Gespräch.
  4. *Quelle & Beleg* (DIW, Statistisches Bundesamt, Verfassungsschutz).
- [ ] **AC-3:** Swipe-/Klick-Navigation auf Smartphones; Karten lassen sich einzeln aufklappen.
- [ ] **AC-4:** Copy-to-Clipboard-Button: Text mit einem Klick in die Zwischenablage für WhatsApp- oder Telegram-Chats kopieren.

#### Tasks:
1. Datenmodell `src/data/factCards.ts` erstellen (strukturiertes Array mit ID, Kategorie, Mythos, Fakt, Kontersatz, Quellenlink).
2. `src/components/toolkit/FactCardsSection.tsx` und `FactCardItem.tsx` entwickeln.
3. Unit-Tests für Filter-Logik und Copy-Funktion schreiben.

---

### Story 3.2: Shareable Social-Graphics Generator (Bilder zum Teilen)
- **Als** Social-Media-Nutzer:in (Bluesky, Mastodon, WhatsApp, Instagram)
- **möchte ich** Faktenchecks als fertige Bildgrafiken direkt herunterladen oder teilen können,
- **damit ich** Falschmeldungen im Netz sofort mit seriösen Fakten im einheitlichen „Rette Blau“-Design begegnen kann.

#### Akzeptanzkriterien:
- [ ] **AC-1:** Jede Fact-Card bietet einen Button *„Als Grafik teilen / speichern“*.
- [ ] **AC-2:** Generierung erfolgt entweder über vorgerenderte WebP/PNG-Assets oder leichtgewichtiges Canvas/SVG im Browser (ohne Serveraufruf).
- [ ] **AC-3:** Nutzung der nativen Web Share API (`navigator.share`), falls vom Browser unterstützt, mit Fallback auf Download.

#### Tasks:
1. `src/utils/shareCard.ts`: Share-Helper mit Web Share API und Fallback.
2. Optimierte WebP-Grafiken für die Kernmythen unter `public/social-cards/` hinterlegen.

---

# EPIC-4: Schnittstelle „Blauer Planet“ (Klima & Antifaschismus)

### Ziel
Die Verbindung zwischen dem Schutz der natürlichen Lebensgrundlagen und der Abwehr des Faschismus herausarbeiten: Warum die Klimakrise eine Demokratiekrise ist und wie Rechtsextreme von Zerstörung und Verteilungskämpfen profitieren.

---

### Story 4.1: Interaktives Dossier „Warum Faschisten die Umwelt opfern“
- **Als** ökologisch und sozial engagierte Person
- **möchte ich** verstehen und nachlesen können, wie Rechtsextremismus und fossile Industrien zusammenhängen,
- **damit ich** die Verbindung zwischen Antifaschismus und Klimagerechtigkeit in meiner Organisation vermitteln kann.

#### Akzeptanzkriterien:
- [ ] **AC-1:** Drei multimediale Leitartikel/Schwerpunkte:
  1. *Fossiler Faschismus:* Die Leugnung der Erderwärmung als Werkzeug zur Spaltung und Sicherung fossiler Profite.
  2. *Die soziale Frage:* Warum ökologische Transformation ohne Umverteilung scheitert und wie rechte Kräfte Armutsängste ausnutzen.
  3. *Ökofaschismus entlarven:* Wie Völkische versuchen, Naturschutz mit Blut-und-Boden-Ideologie zu kapern.
- [ ] **AC-2:** Infografik: *„Der Blaue Planet im Stresstest“* (Planetare Belastungsgrenzen vs. autoritärer Rollback).
- [ ] **AC-3:** Handlungsaufruf: Lokale Klimagruppen und Antifa-Bündnisse für gemeinsame Aktionen zusammenbringen.

#### Tasks:
1. `src/components/planet/BluePlanetSection.tsx`: Sektion mit Bild-Text-Modulen und wissenschaftlichen Zitaten.
2. Responsive Grafiken und Vektoren für die planetaren Grenzen integrieren.
3. Übersetzung in DE/EN in den i18n-Dateien pflegen.

---

# EPIC-5: Solidaritäts- & Aktions-Radar (Connect Antifascists)

### Ziel
Menschen vor Ort – insbesondere in gefährdeten oder ländlichen Regionen – aus der Isolation holen und mit bestehenden Beratungsstellen, Allianzen und Schutzräumen vernetzen.

---

### Story 5.1: Datenschutzfreundliche Bündnissuche & Beratungsstellen-Verzeichnis
- **Als** Betroffene:r von rechter Hetze oder engagierte Person vor Ort
- **möchte ich** mein Bundesland oder meine Postleitzahl eingeben,
- **damit ich** sofort geprüfte Opferberatungsstellen (VBRG-Netzwerk) und zivilgesellschaftliche Bündnisse in meiner Nähe finde.

#### Akzeptanzkriterien:
- [ ] **AC-1:** Filterung nach Bundesland (16 Bundesländer) und Kategorie (*Opferberatung*, *Bündnis gegen Rechts*, *Omas gegen Rechts*, *Klima-Solidarität*).
- [ ] **AC-2:** Vollständige Integration des VBRG-Netzwerks (z. B. ezra in Thüringen, MOBIT, ReachOut in Berlin, m-power in RLP etc.) mit Notfallnummern.
- [ ] **AC-3:** Absolute Datensparsamkeit: Keine Weitergabe von Standorten, keine externen Google-APIs; Suche läuft 100% lokal im Browser auf einem vorstrukturierten JSON-Datensatz.
- [ ] **AC-4:** Schaltfläche *„Eigene Initiative vorschlagen“* führt zu einem redaktionell geprüften Kontaktformular/Mailto.

#### Tasks:
1. `src/data/initiativesDirectory.ts`: Kuratierte Datenbank für alle 16 Bundesländer anlegen.
2. `src/components/radar/SolidarityRadarSection.tsx` mit Filter- und Suchfeld bauen.
3. Barrierefreie Tastaturnavigation für Ergebnislisten implementieren.

---

# EPIC-6: Sichere Vernetzung & Dezentrale Kanäle

### Ziel
Sichere, abhör- und zensurresistente Kommunikationswege für Aktive bereitstellen, ohne ein eigenes gefährdetes soziales Netzwerk betreiben zu müssen.

---

### Story 6.1: Signal-Broadcast & Dezentrale Kanäle (Bluesky / Fediverse)
- **Als** Unterstützer:in
- **möchte ich** über wichtige Eilaktionen, Demo-Aufrufe und neue Kampagnenmaterialien informiert werden, ohne meine privaten Daten an Werbekonzerne preiszugeben,
- **damit ich** sicher und schnell mobilisierbar bin.

#### Akzeptanzkriterien:
- [ ] **AC-1:** Einbindung eines Signal-Broadcast-Kanallinks (One-Way-Kommunikation für maximale Sicherheit der Teilnehmenden).
- [ ] **AC-2:** Verlinkung auf offizielle Kanäle im Fediverse (Mastodon) und auf Bluesky.
- [ ] **AC-3:** Sektion *„Digitale Zivilcourage & Demo-Sicherheit“*: 5 goldene Regeln (Handysperre ohne Biometrie, verschlüsselte Chats, Buddy-System).

#### Tasks:
1. `src/components/community/ConnectChannelsSection.tsx` umsetzen.
2. Icons für Signal, Bluesky und Mastodon via Lucide/SVG einbinden.
