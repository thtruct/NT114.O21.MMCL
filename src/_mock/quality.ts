export const productQuestions = [
  {
    question: 'Betaald de klant in de taxi?',
    products: ['Valys', 'DEXTR', 'NSV', 'Overige'],
    answers: [
      {
        content: 'Soms.',
        isAnswer: false,
        highlight: '(Dit antwoord is onjuist. Een klant betaald nooit in de taxi.)',
      },
      {
        content: 'Nooit.',
        isAnswer: true,
        highlight:
          '(U heeft het juiste antwoord gekozen. Een klant betaald inderdaad nooit in de taxi u krijgt betaald door Transvision.)',
      },
      {
        content: 'Altijd.',
        isAnswer: false,
        highlight: '(Dit antwoord is onjuist. Een klant betaald nooit in de taxi.)',
      },
    ],
  },
  {
    question: 'Wat doet u als u de klant niet kunt vinden?',
    products: ['Valys', 'NSV', 'Overige'],
    answers: [
      {
        content: 'U rijdt na 5 minuten wachten weg.',
        isAnswer: false,
        highlight:
          '(Dit antwoord is onjuist, u belt altijd eerst met de CVL van Transvision en rijdt pas weg nadat u hiervoor akkoord heeft gekregen van Transvision.)',
      },
      {
        content: 'U rijdt na 5 minuten wachten weg en geeft dit door aan de CVL van Transvision.',
        isAnswer: false,
        highlight:
          '(Dit antwoord is onjuist, u belt altijd eerst met de CVL van Transvision en rijdt pas weg nadat u hiervoor akkoord heeft gekregen van Transvision.)',
      },
      {
        content: 'U belt de CVL van Transvision en rijdt pas weg na akkoord van Transvision.',
        isAnswer: true,
        highlight:
          '(U heeft het juiste antwoord gekozen, u overlegt inderdaad altijd eerst met de CVL van Transvision voordat u wegrijdt.)',
      },
    ],
  },
  {
    question: 'Mag u dit vervoer voor Transvision rijden met een beperkte chauffeurskaart?',
    products: ['Valys', 'NSV', 'Overige'],
    answers: [
      {
        content: 'Ja, al het taxivervoer mag worden gereden met een beperkte chauffeurskaart.',
        isAnswer: false,
        highlight:
          '(Dit antwoord is onjuist, om dit vervoer te mogen rijden heeft u een volledige chauffeurskaart nodig. Dit is wettelijk verplicht.)',
      },
      {
        content:
          'Ja, dit mag omdat er niet meer voor de rit hoeft te worden betaald in het voertuig.',
        isAnswer: false,
        highlight:
          '(Dit antwoord is onjuist, om dit vervoer te mogen rijden heeft u een volledige chauffeurskaart nodig. Dit is wettelijk verplicht.)',
      },
      {
        content: 'Nee, u mag dit vervoer alleen rijden met een volledige chauffeurskaart.',
        isAnswer: true,
        highlight:
          '(U heeft het juiste antwoord gekozen, u heeft voor dit vervoer inderdaad een volledige chauffeurskaart nodig. Dit is wettelijk verplicht.)',
      },
    ],
  },
  {
    question: 'Wat wordt bedoeld met Wachtdienstvervoer?',
    products: ['NSV'],
    answers: [
      {
        content: 'Vervoer na een calamiteit.',
        isAnswer: true,
        highlight:
          '(U heeft het juiste antwoord gekozen, wachtdienstvervoer is inderdaad nodig bij een calamiteit van de NS.)',
      },
      {
        content:
          'Vervoer waarbij de chauffeur moet wachten op de passagier om deze weer mee terug te nemen.',
        isAnswer: false,
        highlight:
          '(Dit antwoord is onjuist, met wachtdienstvervoer wordt het vervoer bedoeld dat nodig is bij een calamiteit van de NS.)',
      },
      {
        content: 'Vervoer voor een gestrande reiziger.',
        isAnswer: false,
        highlight:
          '(Dit antwoord is onjuist, met wachtdienstvervoer wordt het vervoer bedoeld dat nodig is bij een calamiteit van de NS.)',
      },
    ],
  },
  {
    question: 'Mag een Valysklant een hulphond meenemen tijdens de rit?',
    products: ['Valys'],
    answers: [
      {
        content: 'Ja.',
        isAnswer: true,
        highlight:
          '(U heeft het juiste antwoord gekozen. Een Valysklant mag inderdaad een hulphond meenemen in de taxi. In overleg met de klant wordt bepaald waar de hond het beste kan zitten in het voertuig.)',
      },
      {
        content: 'Nee.',
        isAnswer: false,
        highlight:
          '(Dit antwoord is onjuist. Een Valysklant mag een hulphond meenemen in de taxi. In overleg met de klant wordt bepaald waar de hond het beste kan zitten in het voertuig.)',
      },
    ],
  },
  {
    question: 'Is combineren van passagiers bij dit vervoer toegestaan?',
    products: ['NSV', 'Overige'],
    answers: [
      {
        content: 'Ja.',
        isAnswer: false,
        highlight:
          '(Dit antwoord is onjuist. Ritten voor dit vervoer mogen nooit worden gecombineerd met andere passagiers.)',
      },
      {
        content: 'Nee.',
        isAnswer: true,
        highlight:
          '(U heeft het juiste antwoord gekozen. Ritten voor dit vervoer mogen inderdaad nooit worden gecombineerd met andere passagiers.)',
      },
    ],
  },
  {
    question:
      'Hoe weet u waar u de passagier op moet halen bij een rit voor een verkeershulpdienst?',
    products: ['Overige'],
    answers: [
      {
        content: 'Op de plaats van het pechgeval of ongeval.',
        isAnswer: false,
        highlight:
          '(Dit antwoord is onjuist. In veel gevallen is het pechgeval of ongeval langs de snelweg. Hier mag de taxi niet stoppen. U vindt de juiste ophaallocatie in het commentaarveld bij de ritboeking.)',
      },
      {
        content: 'Op het adres dat in de ritboeking staat.',
        isAnswer: false,
        highlight:
          '(Dit antwoord is onjuist. Het adres in de boeking is in alle gevallen dichtbij de ophaallocatie, maar kan afwijken omdat de ophaallocatie niet altijd op een vastgesteld adres zal zijn. U vindt de juiste ophaallocatie in het commentaarveld bij de ritboeking.)',
      },
      {
        content: 'Dit is opgenomen in het extra commentaarveld bij de ritboeking.',
        isAnswer: true,
        highlight:
          '(U heeft het juiste antwoord gekozen. Het adres in de boeking is in alle gevallen dichtbij de ophaallocatie, maar kan afwijken omdat de ophaallocatie niet altijd op een vastgesteld adres zal zijn. U vindt de juiste ophaallocatie in het commentaarveld bij de ritboeking.)',
      },
    ],
  },
  {
    question: 'Hoe lang mag een gecombineerde Valysrit duren?',
    products: ['Valys'],
    answers: [
      {
        content: 'Dit maakt niet uit.',
        isAnswer: false,
        highlight:
          '(Dit antwoord is onjuist. Door het combineren van een Valysrit met andere passagiers, mag de rit maximaal 1,5 keer de snelste route duren.)',
      },
      {
        content: 'Maximaal 1,5 keer de snelste route.',
        isAnswer: true,
        highlight:
          '(U heeft het juiste antwoord gekozen. De Valysrit mag inderdaad maximaal 1,5 keer de snelste route duren.)',
      },
      {
        content: 'Er mag niet worden gecombineerd bij een Valysrit.',
        isAnswer: false,
        highlight:
          '(Dit antwoord is onjuist. Valysritten mogen worden gecombineerd met andere passagiers. De rit mag maximaal 1,5 keer de snelste route duren.)',
      },
    ],
  },
];

export const videosDextr = [
  'https://s3.eu-central-1.amazonaws.com/cdn.tranvision.nl/dextr/Dextr2.mp4',
  'https://s3.eu-central-1.amazonaws.com/cdn.tranvision.nl/dextr/Dextr3.mp4',
  'https://s3.eu-central-1.amazonaws.com/cdn.tranvision.nl/dextr/Dextr4.mp4',
  'https://s3.eu-central-1.amazonaws.com/cdn.tranvision.nl/dextr/Dextr5.mp4',
];

export const videosNSV = [
  'https://s3.eu-central-1.amazonaws.com/cdn.tranvision.nl/nsv/1-NSvervoer.mp4',
  'https://s3.eu-central-1.amazonaws.com/cdn.tranvision.nl/nsv/2-PersoneelNS.mp4',
  'https://s3.eu-central-1.amazonaws.com/cdn.tranvision.nl/nsv/3-GordelNS.mp4',
  'https://s3.eu-central-1.amazonaws.com/cdn.tranvision.nl/nsv/4-SpelregelsNS.mp4',
  'https://s3.eu-central-1.amazonaws.com/cdn.tranvision.nl/nsv/5-ContactNS.mp4',
  'https://s3.eu-central-1.amazonaws.com/cdn.tranvision.nl/nsv/6-AanmeldingNS.mp4',
];

export const videosOverige = [
  'https://s3.eu-central-1.amazonaws.com/cdn.tranvision.nl/overige/1-Overig.mp4',
  'https://s3.eu-central-1.amazonaws.com/cdn.tranvision.nl/overige/2-Gordeloverige.mp4',
  'https://s3.eu-central-1.amazonaws.com/cdn.tranvision.nl/overige/3-SpelregelsOV.mp4',
  'https://s3.eu-central-1.amazonaws.com/cdn.tranvision.nl/overige/4-Contactoverig.mp4',
  'https://s3.eu-central-1.amazonaws.com/cdn.tranvision.nl/overige/5-Aanmeldingoverig.mp4',
];

export const videosValys = [
  'https://s3.eu-central-1.amazonaws.com/cdn.tranvision.nl/valys/1-Valys.mp4',
  'https://s3.eu-central-1.amazonaws.com/cdn.tranvision.nl/valys/2-GordelValys.mp4',
  'https://s3.eu-central-1.amazonaws.com/cdn.tranvision.nl/valys/3-SpelregelsValys.mp4',
  'https://s3.eu-central-1.amazonaws.com/cdn.tranvision.nl/valys/4-ContactValys.mp4',
  'https://s3.eu-central-1.amazonaws.com/cdn.tranvision.nl/valys/5-AanmeldingValys.mp4',
];
