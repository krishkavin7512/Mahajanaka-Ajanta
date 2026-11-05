/* Mahājanaka — the script.
   Source: Mahājanaka Jātaka (Jātaka no. 539) and the Mahājanaka mural on the left wall of Ajanta Cave 1.
   kind: "mural" → a detail of the real painting (assets/img/m/<img>.jpg)
         "art"   → our own illustration for an episode not preserved on the wall (MahaArt scene)
   span: grid placement on the page (cols × rows on a 6-column comic page)
   shot: the director's storyboard notes for the same frame. */
window.STORY = {
  chapters: [
    { id: "lost", num: "I", title: "The Lost Prince", native: "मिथिला", place: "Mithila, kingdom of Videha" },
    { id: "sea", num: "II", title: "The Sea", native: "समुद्र", place: "The ocean, bound for Suvannabhumi" },
    { id: "crown", num: "III", title: "The Crown", native: "मुकुट", place: "Mithila" },
    { id: "trees", num: "IV", title: "Two Mango Trees", native: "आम्र", place: "The royal garden" },
    { id: "leaving", num: "V", title: "The Walk Away", native: "निष्क्रमण", place: "Mithila, and beyond" },
  ],
  cast: [
    { name: "Mahājanaka", role: "Prince of Videha, born in exile. In this life, the Bodhisattva.", tag: "The hero" },
    { name: "Sīvalī", role: "Princess of Mithila, later his queen. The one who tries hardest to hold him back.", tag: "The queen" },
    { name: "Maṇimekhalā", role: "Goddess and guardian of the sea, sent to protect the virtuous.", tag: "The goddess" },
    { name: "Polajanaka", role: "The king's younger brother, who seizes the throne of Mithila.", tag: "The usurper" },
  ],
  panels: [
    /* ---------- I. THE LOST PRINCE ---------- */
    { ch: "lost", kind: "art", art: "mithila", span: [6, 2],
      captions: [{ pos: "tl", text: "Mithila, capital of Videha. Slanderers turn two royal brothers against each other." },
                 { pos: "br", text: "In battle, the younger, Polajanaka, kills King Ariṭṭhajanaka and takes the crown." }],
      shot: { n: 1, size: "Extreme long shot", cam: "Slow push-in on the falling crown", dur: "6s", sound: "War drums fade to silence", note: "Establish the city as a silhouette — the story begins with loss." } },
    { ch: "lost", kind: "art", art: "flight", span: [3, 2],
      captions: [{ pos: "tl", text: "That night the queen, carrying the dead king's child, escapes in disguise." },
                 { pos: "bl", text: "An old man with a cart guides her to Champā. Many say it was the god Sakka himself." }],
      shot: { n: 2, size: "Long shot", cam: "Static, figures walk into frame", dur: "5s", sound: "Wind, a single flute", note: "The moon dwarfs the two travellers: they are alone in the world." } },
    { ch: "lost", kind: "art", art: "shore", span: [3, 2],
      captions: [{ pos: "tl", text: "In Champā a son is born — Mahājanaka. At sixteen he learns who he is." }],
      bubbles: [{ who: "Mahājanaka", x: 18, y: 50, tail: "br", text: "Mother, give me half your treasure. I will sail to Suvaṇṇabhūmi and win back my father's kingdom." }],
      shot: { n: 3, size: "Medium long shot", cam: "Slow pan from the boy to the ship", dur: "5s", sound: "Gulls, rigging creaks", note: "Sunrise: the first hopeful colour in the story." } },

    /* ---------- II. THE SEA ---------- */
    { ch: "sea", kind: "art", art: "storm", span: [4, 2],
      sfx: [{ text: "KRRAAAK!", x: 58, y: 18, rot: -8 }],
      captions: [{ pos: "bl", text: "Seven days out, the ship breaks apart. Hundreds drown, crying out to their gods." }],
      shot: { n: 4, size: "Extreme long shot", cam: "Dutch angle, hand-held shake", dur: "4s", sound: "Thunder, splintering wood", note: "The only frame in the book with a tilted horizon — the world turns over." } },
    { ch: "sea", kind: "art", art: "swim", span: [2, 2],
      captions: [{ pos: "tl", text: "He rubs his body with ghee, climbs the mast, and leaps clear of the sharks." },
                 { pos: "br", text: "Then he swims. Seven days. Seven nights." }],
      shot: { n: 5, size: "Extreme long shot, top-down", cam: "Time-lapse: seven suns cross the sky", dur: "7s", sound: "Breathing, water, nothing else", note: "Seven numbered suns turn time into an image." } },
    { ch: "sea", kind: "art", art: "goddess", span: [4, 3],
      bubbles: [{ who: "Maṇimekhalā", x: 6, y: 10, tail: "br", text: "No shore is in sight. Why do you struggle on?" },
                { who: "Mahājanaka", x: 52, y: 70, tail: "bl", text: "One who keeps striving cannot be blamed. Even if I drown, I will have done my part." }],
      shot: { n: 6, size: "Long shot, low angle", cam: "Crane up from the swimmer to the goddess", dur: "8s", sound: "Choir swell over the waves", note: "The heart of the story: effort (vīriya) is praised even when success is impossible." } },
    { ch: "sea", kind: "art", art: "lift", span: [2, 3],
      captions: [{ pos: "tl", text: "Moved by his courage, the goddess lifts him in her arms." },
                 { pos: "bl", text: "By dawn she lays him down in a mango grove outside Mithila." }],
      shot: { n: 7, size: "Long shot", cam: "Tracking with the flight, left to right", dur: "5s", sound: "Wind; music resolves", note: "Night gives way to dawn — the first turning point." } },

    /* ---------- III. THE CROWN ---------- */
    { ch: "crown", kind: "art", art: "chariot", span: [6, 2],
      captions: [{ pos: "tl", text: "King Polajanaka has died, leaving only a daughter, Sīvalī. The ministers send out the festive chariot with no one at the reins, to find a king worthy of Mithila." },
                 { pos: "br", text: "It circles the city — and stops at the feet of a sleeping stranger." }],
      shot: { n: 8, size: "Low angle, wide", cam: "Wheel rolls in and stops in frame", dur: "6s", sound: "Wheel creak slowing to silence", note: "We never see who drives: the wheel is fate." } },
    { ch: "crown", kind: "mural", img: "court", span: [4, 3], label: "The court of Mithila, Ajanta Cave 1",
      captions: [{ pos: "tl", text: "He strings the bow a thousand men could not bend, finds the sixteen hidden treasures and wins Sīvalī's hand." },
                 { pos: "br", text: "Mahājanaka is crowned king of Videha." }],
      shot: { n: 9, size: "Wide", cam: "Slow drift across the women of the court", dur: "6s", sound: "Conch, vīṇā and cymbals", note: "First appearance of the real mural: the story arrives at the wall of Cave 1." } },
    { ch: "crown", kind: "mural", img: "queen-wall", span: [2, 3], label: "Palace women, Ajanta Cave 1",
      bubbles: [{ who: "Sīvalī", x: 8, y: 66, tail: "tr", text: "Long live the king of Mithila!" }],
      shot: { n: 10, size: "Medium shot", cam: "Static", dur: "3s", sound: "Celebration continues", note: "Close on the palace women — the people whose world will be shaken." } },

    /* ---------- IV. TWO MANGO TREES ---------- */
    { ch: "trees", kind: "art", art: "mangoes", span: [6, 2],
      captions: [{ pos: "tl", text: "Years later, in the royal garden, he sees two mango trees." },
                 { pos: "br", text: "The one heavy with fruit has been stripped and broken by the crowd. The barren one stands whole and green." }],
      bubbles: [{ who: "Mahājanaka (thinking)", x: 60, y: 30, tail: "bl", think: true, text: "The tree with fruit is torn apart. The tree with nothing stands at peace. A kingdom is fruit." }],
      shot: { n: 11, size: "Wide, symmetrical", cam: "Locked-off; the frame is split by a centre line", dur: "6s", sound: "Birdsong, then silence", note: "A split composition for the moment the king is split in two." } },
    { ch: "trees", kind: "mural", img: "bath-pots", span: [2, 3], label: "Attendants with water jars, Ajanta Cave 1",
      captions: [{ pos: "tl", text: "Servants bring the sacred water." }],
      shot: { n: 12, size: "Medium shot", cam: "Tilt down the water jars", dur: "3s", sound: "Water poured from jars", note: "Ritual, slow, deliberate." } },
    { ch: "trees", kind: "mural", img: "bath-king", span: [4, 3], label: "The king's bath, Ajanta Cave 1",
      captions: [{ pos: "tl", text: "He takes his last royal bath. His mind is already made up." }],
      bubbles: [{ who: "Mahājanaka", x: 54, y: 72, tail: "tl", text: "I will put it all down." }],
      shot: { n: 13, size: "Medium close-up", cam: "Very slow push-in on his face", dur: "6s", sound: "Single bell", note: "The calmest face in the book — the decision is made inside, not out." } },

    /* ---------- V. THE WALK AWAY ---------- */
    { ch: "leaving", kind: "mural", img: "sivali", span: [4, 3], label: "Sīvalī and the women of the palace, Ajanta Cave 1",
      captions: [{ pos: "tl", text: "Queen Sīvalī tries everything — music, dancers, even setting the city alight to stir his duty as king." }],
      bubbles: [{ who: "Sīvalī", x: 52, y: 8, my: 34, tail: "bl", text: "My lord, Mithila is burning! The treasury is being plundered!" },
                { who: "Mahājanaka", x: 4, y: 72, tail: "tr", text: "Happily we live, we who own nothing. When Mithila burns, nothing of mine burns." }],
      shot: { n: 14, size: "Medium shot", cam: "Shot / reverse-shot between queen and king", dur: "7s", sound: "Crackling fire off-screen", note: "His famous reply — later quoted in Buddhist texts — is the turning line of the whole story." } },
    { ch: "leaving", kind: "mural", img: "grief", span: [2, 3], label: "Mourners, Ajanta Cave 1",
      captions: [{ pos: "bl", text: "The people weep in the streets." }],
      shot: { n: 15, size: "Medium shot", cam: "Static", dur: "3s", sound: "Wailing, distant", note: "Reaction shot: the cost of renunciation is paid by others too." } },
    { ch: "leaving", kind: "mural", img: "horse", span: [3, 3], label: "The departure, Ajanta Cave 1",
      captions: [{ pos: "tl", text: "He leaves the palace behind." }],
      shot: { n: 16, size: "Long shot", cam: "Pan following the horse out of frame", dur: "4s", sound: "Hoofbeats fading", note: "The horse exits frame left — away from the story we have known." } },
    { ch: "leaving", kind: "art", art: "reed", span: [3, 3],
      bubbles: [{ who: "Mahājanaka", x: 6, y: 8, tail: "br", text: "As this reed can never go back into its sheath, Sīvalī, I can never go back to you." }],
      shot: { n: 17, size: "Extreme close-up", cam: "Static; the reed is pulled out in one motion", dur: "4s", sound: "A dry rustle, then nothing", note: "The smallest object in the book carries its biggest decision." } },
    { ch: "leaving", kind: "art", art: "forest", span: [6, 2],
      captions: [{ pos: "tl", text: "He walks into the Himālaya and never returns to Mithila." },
                 { pos: "br", text: "Sīvalī turns back, crowns their son Dīghāvu — and she too leaves the palace to live as an ascetic." }],
      shot: { n: 18, size: "Extreme long shot", cam: "Slow crane up and away", dur: "8s", sound: "Wind through deodars; end theme", note: "Mirror of the first frame: a city of silhouettes becomes a forest of them." } },
  ],
};
