export const BEZWAAR = 'BEZWAAR';
export const COMPLIMENT = 'COMPLIMENT';
export const IDEE = 'IDEE';
export const KLACHT = 'KLACHT';
export const TROUWEN = 'TROUWEN';
export const VERHUIZEN = 'VERHUIZEN';

const bezwaar = {
  title: 'Ik wil een bezwaar indienen',
  overview: {
    sub_title: 'Je kunt hier een bezwaar indienen tegen een parkeerbon',
    send_to: [
      {
        name: 'Gem. Eindhoven',
        access_level: 'Lezen en schrijven',
      },
    ],
    needed_documents: [
      'Je kunt één of meerdere documenten toe voegen (parkeerticket, ' +
        'bewijsstuk, etc)>',
    ],
    steps: [
      'Kies de beschikking waartegen je bezwaar wilt maken.',
      'Geef aan waarom wil je bezwaar wilt maken?',
      'Je voegt eventueel document of foto\'s toe.',
    ],
  },
  questions: [
    {
      id: 'd4449bd7-2f12-4b06-8284-6e3ab6c3484a',
      type: 'checkbox_group',
      title: 'Wil je bezwaar maken tegen een van onderstaande beschikkingen?',
      subtitle:
        'Indien onderstaand scherm leeg is, dan kun je op dit moment nergens ' +
        'bezwaar tegen maken.',
      data_properties: {
        title: 'Klacht(en)',
        bind: 'complaint_types',
      },
      options: [
        {
          text: 'Nummer beschikking 1',
          value: 'Nummer beschikking 1',
        },
        {
          text: 'Nummer beschikking 2',
          value: 'Nummer beschikking 2',
        },
      ],
      next: '771f9b38-f847-4545-a5b9-2d3046da4018',
    },
    {
      id: '771f9b38-f847-4545-a5b9-2d3046da4018',
      type: 'text',
      title: 'Waarom wil je bezwaar maken?',
      subtitle: 'Beschrijf waarom je bezwaar maakt.',
      data_properties: {
        title: 'Beschrijfing',
        bind: 'Beschrijfing',
      },
      next: 'f3a140ac-0244-4744-b5d2-2a36d3a53594',
    },
    {
      id: 'f3a140ac-0244-4744-b5d2-2a36d3a53594',
      type: 'choice',
      title: 'Bewijsstukken',
      subtitle: 'Voeg bewijsstukken ter ondersteuning van je bezwaar toe.',
      options: [
        {
          text: 'Ik wil een document uploaden',
          goto: 'a4782a2a-998a-4648-99c5-8f3f6fa804c3',
        },
        {
          text: 'Ik wil een foto maken',
          goto: '35039c60-d3fd-4903-a2ac-eb69858f337d',
        },
        {
          text: 'Nee',
          goto: 'bdf40318-7c87-4c37-9594-8760b6f24b8e',
        },
      ],
    },
    {
      id: 'a4782a2a-998a-4648-99c5-8f3f6fa804c3',
      type: 'documents_upload',
      title: 'Document aanleveren van jouw klacht',
      subtitle: '',
      data_properties: {
        title: 'Documenten',
        bind: 'complaint_documents',
        placeholder: 'Jouw klacht',
      },
      another: {
        text: 'Nog een document uploaden',
        icon: 'upload.svg',
      },
      next: 'f3a140ac-0244-4744-b5d2-2a36d3a53594',
    },
    {
      id: '35039c60-d3fd-4903-a2ac-eb69858f337d',
      type: 'documents_photo',
      title: 'Foto aanleveren van jouw klacht',
      subtitle: '',
      data_properties: {
        title: 'Foto\'s',
        bind: 'compaint_photos',
        placeholder: 'Jouw klacht',
      },
      another: {
        text: 'Nog een foto maken',
        icon: 'camera.svg',
      },
      next: 'f3a140ac-0244-4744-b5d2-2a36d3a53594',
    },
    {
      id: 'bdf40318-7c87-4c37-9594-8760b6f24b8e',
      type: 'radiobutton_group',
      title: 'Contact',
      subtitle:
        'Vind je het prettig dat er contact met je wordt opgenomen over jouw ' +
        'klacht?',
      data_properties: {
        title: 'Contact over jou idee',
        bind: 'contact',
      },
      options: [
        {
          text: 'Ja',
          value: 'Ja',
        },
        {
          text: 'Nee',
          value: 'Nee',
        },
      ],
    },
  ],
};

const compliment = {
  title: 'Een compliment geven',
  overview: {
    sub_title: 'We stellen het erg op prijs dat je een compliment wilt geven',
    send_to: [
      {
        name: 'Gem. Eindhoven',
        access_level: 'Lezen en schrijven',
      },
    ],
    needed_documents: ['Eventueel een foto of document ter illustratie'],
    steps: [
      'Je geeft aan of je anoniem wilt blijven',
      'Je geeft aan wie of wat je een compliment wilt geven',
      'Je omschrijft het compliment',
      'Je voegt eventueel een foto of document to',
    ],
  },
  cost: false,
  questions: [
    {
      id: '1',
      type: 'choice',
      title: 'Wil je je compliment anoniem indienen?',
      subtitle: 'We kunnen geen terugkoppeling geven als je anoniem indient',
      options: [
        {
          text: 'ja',
          goto: '2',
        },
        {
          text: 'nee',
          goto: '2',
        },
      ],
    },
    {
      id: '2',
      type: 'text',
      optional: {
        goto: '3',
      },
      title: 'Aan wie of wat wil je een compliment geven?',
      subtitle:
        'Als je geen naam weet, beschrijf dan zo goed mogelijk de functie ' +
        'van de persoon of het organisatie-onderdeel aan wie je een ' +
        'compliment wilt geven',
      data_properties: {
        title: 'Ontvanger van compliment',
        bind: 'receiver_compliment',
      },
      next: '3',
    },
    {
      id: '3',
      type: 'text',
      optional: {
        goto: '4',
      },
      title: 'Waarom wil je het compliment geven?',
      subtitle: 'Beschrijf wat de reden is dat jij het compliment wilt geven',
      data_properties: {
        title: 'Reden compliment',
        bind: 'compliment_reason',
      },
      next: '4',
    },
    {
      id: '4',
      type: 'choice',
      title: 'Wil je extra informatie over het compliment toevoegen?',
      subtitle: 'Je kunt een foto of een document toevoegen\t',
      options: [
        {
          text: 'Ik wil een document uploaden',
          icon: 'upload.svg',
          goto: 'bbe914c4-2e82-11e8-b467-0ed5f89f718b',
        },
        {
          text: 'Ik wil een foto maken',
          icon: 'camera.svg',
          goto: 'bbe912b2-2e82-11e8-b467-0ed5f89f718b',
        },
        {
          text: 'Nee',
          icon: '',
          goto: 'bbe90d9e-2e82-11e8-b467-0ed5f89f718b',
        },
      ],
    },
    {
      id: 'bbe914c4-2e82-11e8-b467-0ed5f89f718b',
      type: 'documents_upload',
      optional: {
        goto: '4',
      },
      title: 'Document aanleveren voor het compliment',
      subtitle: '',
      data_properties: {
        title: 'Documenten',
        bind: 'compliment_documents',
        placeholder: '',
      },
      another: {
        text: 'Nog een document toevoegen?',
        icon: 'upload.svg',
      },
      next: 'bbe90d9e-2e82-11e8-b467-0ed5f89f718b',
    },
    {
      id: 'bbe912b2-2e82-11e8-b467-0ed5f89f718b',
      type: 'documents_photo',
      optional: {
        goto: '4',
      },
      title: 'Foto maken voor bij het compliment',
      subtitle: '',
      data_properties: {
        title: 'Documenten',
        bind: 'compliment_documents',
        placeholder: '',
      },
      another: {
        text: 'Nog een foto maken?',
        icon: 'camera.svg',
      },
      next: 'bbe90d9e-2e82-11e8-b467-0ed5f89f718b',
    },
    {
      id: 'bbe90d9e-2e82-11e8-b467-0ed5f89f718b',
      type: 'radiobutton_group',
      title:
        'Vind je het prettig als er contact wordt opgenomen met jou over het ' +
        'gegeven compliment?',
      subtitle: '',
      data_properties: {
        title: 'Contact',
        bind: 'contact',
      },
      options: [
        {
          text: 'Ja',
          value: 'Nee',
        },
        {
          text: 'Nee',
          value: 'Ja',
        },
      ],
    },
  ],
};

const idee = {
  title: 'briljant idee',
  overview: {
    sub_title: 'Wat leuk dat je een briljant idee hebt.',
    send_to: [
      {
        name: 'Gem. Eindhoven',
        access_level: 'Lezen en schrijven',
      },
    ],
    needed_documents: ['Eventueel documenten of foto\'s'],
    steps: [
      'Je geeft aan of je anoniem wilt blijven.',
      'Je geeft het onderwerp van je idee op.',
      'Je beschrijft je idee.',
      'Je voegt eventueel document of foto\'s toe.',
    ],
  },
  questions: [
    {
      id: 'c5e7bc92-1c79-4a95-9512-1c05e1417a3f',
      type: 'radiobutton_group',
      title: 'Wil je je idee anoniem indienen?',
      subtitle:
        'Bij anoniem indienen, kunnen we geen contact met je opnemen bij ' +
        'vragen.',
      data_properties: {
        title: 'Wil je anoniem indienen',
        bind: 'anoniem',
      },
      options: [
        {
          text: 'Ja',
          value: 'Ja',
        },
        {
          text: 'Nee',
          value: 'Nee',
        },
      ],
      next: 'bbe90362-2e82-11e8-b467-0ed5f89f718b',
    },
    {
      id: 'bbe90362-2e82-11e8-b467-0ed5f89f718b',
      type: 'text',
      title: 'Wat is jouw idee?',
      subtitle: 'Beschrijf hieronder jouw idee.',
      data_properties: {
        title: 'Nieuwe idee',
        bind: 'idee',
      },
      metadata: {
        autocomplete: 'idee',
      },
      next: '0cb6a6a9-50f0-42dc-aea7-922b80b5ceb2',
    },
    {
      id: '0cb6a6a9-50f0-42dc-aea7-922b80b5ceb2',
      type: 'choice',
      title: 'Wil je extra informatie over jouw idee toevoegen?',
      subtitle: 'Je kunt extra informatie toevoegen aan jouw idee',
      options: [
        {
          text: 'Ik wil een document uploaden',
          goto: '4df5ae04-6b99-40a7-bc47-035f6c886830',
        },
        {
          text: 'Ik wil een foto maken',
          goto: 'ed77ca8e-cc32-46bc-8fe5-462bc0dda8d0',
        },
        {
          text: 'Nee',
          goto: '4b628917-e8d6-4820-9f47-9be8dc9580f1',
        },
      ],
    },
    {
      id: '4df5ae04-6b99-40a7-bc47-035f6c886830',
      type: 'documents_upload',
      title: 'Document aanleveren van jouw idee',
      subtitle: '',
      data_properties: {
        title: 'Documenten',
        bind: 'documents',
        placeholder: 'Jouw idee',
      },
      another: {
        text: 'Nog een document uploaden',
        icon: 'upload.svg',
      },
      next: '0cb6a6a9-50f0-42dc-aea7-922b80b5ceb2',
    },
    {
      id: 'ed77ca8e-cc32-46bc-8fe5-462bc0dda8d0',
      type: 'documents_photo',
      title: 'Foto aanleveren van jouw idee',
      subtitle: '',
      data_properties: {
        title: 'Foto\'s',
        bind: 'photos',
        placeholder: 'Jouw idee',
      },
      another: {
        text: 'Nog een foto maken',
        icon: 'camera.svg',
      },
      next: '0cb6a6a9-50f0-42dc-aea7-922b80b5ceb2',
    },
    {
      id: '4b628917-e8d6-4820-9f47-9be8dc9580f1',
      type: 'radiobutton_group',
      title:
        'Vind je het prettig dat er contact met je wordt opgenomen over jouw ' +
        'idee?',
      subtitle: '',
      data_properties: {
        title: 'Contact over jou idee',
        bind: 'contact',
      },
      options: [
        {
          text: 'Ja',
          value: 'Ja',
        },
        {
          text: 'Nee',
          value: 'Nee',
        },
      ],
    },
  ],
};
const klacht = {
  title: 'klacht',
  overview: {
    sub_title: 'Wat fijn dat je de moeite neemt om een klacht in te dienen.',
    send_to: [
      {
        name: 'Gem. Eindhoven',
        access_level: 'Lezen en schrijven',
      },
    ],
    needed_documents: ['Eventueel documenten of foto\'s'],
    steps: [
      'Je geeft aan of je anoniem wilt blijven.',
      'Je geeft aan waar je klacht over gaat.',
      'Je geeft inhoudelijke informatie over je klacht.',
      'Je voegt eventueel document of foto\'s toe.',
    ],
  },
  questions: [
    {
      id: 'c5e7bc92-1c79-4a95-9512-1c05e1417a3f',
      type: 'radiobutton_group',
      title: 'Wil je je idee anoniem indienen?',
      subtitle:
        'Bij anoniem indienen, kunnen we geen contact met je opnemen bij ' +
        'vragen.',
      data_properties: {
        title: 'Wil je anoniem indienen',
        bind: 'anoniem',
      },
      options: [
        {
          text: 'Ja',
          value: 'Ja',
        },
        {
          text: 'Nee',
          value: 'Nee',
        },
      ],
      next: '930535c1-95d8-4804-aac7-cd1ec8cfa59a',
    },
    {
      id: '930535c1-95d8-4804-aac7-cd1ec8cfa59a',
      type: 'multiple_choice',
      title: 'Wat is het onderwerp van je klacht?',
      subtitle:
        'Voor klachten over de buitenruimte of woonoverlast, wordt je ' +
        'doorverwezen.',
      data_properties: {
        title: 'Klacht',
        bind: 'complaint_type',
      },
      options: [
        {
          text: 'Een klacht over de openbare ruimte',
          value: 'Openbare ruimte',
        },
        {
          text: 'Een klacht over woonoverlast',
          value: 'Woon overlast',
        },
        {
          text: 'Ander soort klacht',
          value: 'Anders',
        },
      ],
      next: 'f41ef54a-73f2-4aae-9836-06840382967f',
    },
    {
      id: 'f41ef54a-73f2-4aae-9836-06840382967f',
      type: 'text',
      title: 'Wat is het onderwerp van je klacht?',
      subtitle: 'Het onderwerp van je klacht',
      data_properties: {
        title: 'Beschrijving',
        bind: 'Beschrijving',
      },
      next: '1ead3c2d-1c1d-4dba-b0a9-fb7889ed4ae5',
    },
    {
      id: '1ead3c2d-1c1d-4dba-b0a9-fb7889ed4ae5',
      type: 'choice',
      title: 'Wil je extra informatie over de klacht toevoegen?',
      subtitle: 'Je kunt extra informatie toevoegen aan je klacht',
      options: [
        {
          text: 'Ik wil een document uploaden',
          goto: 'bbe912b2-2e82-11e8-b467-0ed5f89f718b',
        },
        {
          text: 'Ik wil een foto maken',
          goto: 'ed77ca8e-cc32-46bc-8fe5-462bc0dda8d0',
        },
        {
          text: 'Nee',
          goto: 'bbe914c4-2e82-11e8-b467-0ed5f89f718b',
        },
      ],
    },
    {
      id: 'bbe912b2-2e82-11e8-b467-0ed5f89f718b',
      type: 'documents_upload',
      title: 'Upload het document van de klacht',
      subtitle: '',
      data_properties: {
        title: 'Documenten',
        bind: 'complaint_photos',
        placeholder: 'Klacht',
      },
      another: {
        text: 'Nog een document uploaden',
        icon: 'upload.svg',
      },
      next: '1ead3c2d-1c1d-4dba-b0a9-fb7889ed4ae5',
    },
    {
      id: 'ed77ca8e-cc32-46bc-8fe5-462bc0dda8d0',
      type: 'documents_photo',
      title: 'Foto aanleveren van je klacht',
      subtitle: '',
      data_properties: {
        title: 'Documenten',
        bind: 'complaint_photos',
        placeholder: 'Jou klacht',
      },
      another: {
        text: 'Nog een foto maken',
        icon: 'camera.svg',
      },
      next: '1ead3c2d-1c1d-4dba-b0a9-fb7889ed4ae5',
    },
    {
      id: 'bbe914c4-2e82-11e8-b467-0ed5f89f718b',
      type: 'radiobutton_group',
      title:
        'Vind je het prettig dat er contact met je wordt opgenomen over jouw ' +
        'idee?',
      subtitle: '',
      data_properties: {
        title: 'Contact over jou idee',
        bind: 'contact',
      },
      options: [
        {
          text: 'Ja',
          value: 'Ja',
        },
        {
          text: 'Nee',
          value: 'Nee',
        },
      ],
    },
  ],
};
const trouwen = {
  title: 'trouwen',
  overview: {
    sub_title:
      'Wat leuk dat je gaat trouwen! Om te trouwen hebben wij een aantal ' +
      'gegevens van je nodig.',
    send_to: [
      {
        name: 'Gem. Eindhoven',
        access_level: 'Lezen en schrijven',
      },
    ],
    needed_documents: ['Legitimatiebewijs van je partner'],
    steps: [
      'Je geeft aan met wie je gaat trouwen.',
      'Je kiest een datum en locatie.',
      'Je geeft aan wie je getuigen voor het huwelijk zijn.',
      'Je betaalt met IDEAL of Creditcard.',
    ],
    cost_description:
      'Trouwen op dinsdagochtend is gratis. De kosten kunnen varieren, ' +
      'afhankelijk van je wensen.',
  },
  cost: true,
  questions: [
    {
      id: '8f6c188e-2e86-11e8-b467-0ed5f89f718b',
      type: 'multi_text',
      title: 'Gegevens huwelijkspartner',
      subtitle: 'Kloppen deze gegevens?',
      data_properties: {
        title: 'Gegevens huwelijkspartner',
        bind: 'marriage_partner_data',
      },
      list: [
        {
          text: 'Naam',
          name: 'name',
          value: 'Evelien',
        },
        {
          text: 'BSN',
          value: '13379002',
          name: 'bsn',
        },
      ],
      next: '8f6c1ca8-abba-11e8-beeb-0ed5f89f718b',
    },
    {
      id: '8f6c1ca8-abba-11e8-beeb-0ed5f89f718b',
      type: 'choice',
      title: 'Voeg ter controle een foto toe van de huwelijkspartner',
      subtitle: 'Wilt u nu een foto maken of een foto uploaden?',
      options: [
        {
          text: 'Ik wil een foto maken',
          goto: '8f6c1ca8-2e8f-11e8-b467-0ed5f89f718b',
        },
        {
          text: 'Ik wil een foto uploaden',
          goto: '8f6c1ca8-abba-11e8-b467-0ed5f89f718b',
        },
      ],
    },
    {
      id: '8f6c1ca8-abba-11e8-b467-0ed5f89f718b',
      type: 'documents_upload',
      title: 'Foto van je huwelijkspartner',
      subtitle: '',
      data_properties: {
        title: 'Documenten',
        bind: 'marrying_photos',
        placeholder: 'Foto huwelijkspartner',
      },
      another: {
        text: 'Nog een document uploaden',
        icon: 'upload.svg',
      },
      next: '8f6c1ca8-2e86-11e8-b467-0ed5f89f718b',
    },
    {
      id: '8f6c1ca8-2e8f-11e8-b467-0ed5f89f718b',
      type: 'documents_photo',
      title: 'Foto van je huwelijkspartner',
      subtitle: '',
      data_properties: {
        title: 'Documenten',
        bind: 'marrying_photos',
        placeholder: 'Foto huwelijkspartner',
      },
      another: {
        text: 'Nog een foto maken',
        icon: 'camera.svg',
      },
      next: '8f6c1ca8-2e86-11e8-b467-0ed5f89f718b',
    },
    {
      id: '8f6c1ca8-2e86-11e8-b467-0ed5f89f718b',
      type: 'multiple_choice',
      title: 'Hoe wil je trouwen?',
      subtitle: 'Maak een keuze hoe je wilt trouwen.',
      data_properties: {
        title: 'Hoe trouwen',
        bind: 'how_to_marry',
      },
      options: [
        {
          text: 'Gratis trouwen',
          cost: 0,
          value: 'Gratis trouwen',
        },
        {
          text: 'Zonder ceremonie',
          cost: 75,
          value: 'Zonder ceremonie',
        },
        {
          text: 'Met ceremonie',
          cost: 150,
          value: 'Met ceremonie',
        },
      ],
      next: '8f6c1f5a-2e86-11e8-b467-0ed5f89f718b',
    },
    {
      id: '8f6c1f5a-2e86-11e8-b467-0ed5f89f718b',
      type: 'location',
      title: 'Waar wil je trouwen?',
      subtitle: 'Op deze locatie kunnen jullie een handtekening zetten.',
      data_properties: {
        title: 'Trouw locatie',
        bind: 'location',
      },
      next: '8f6c2220-2e86-11e8-b467-0ed5f89f718b',
    },
    {
      id: '8f6c2220-2e86-11e8-b467-0ed5f89f718b',
      type: 'multiple_choice',
      title: 'Kies een trouwamtenaar',
      subtitle:
        'Je kunt kiezen wie jullie trouwt. Scroll door de lijst om iedereen ' +
        'te zien.',
      data_properties: {
        title: 'Trouwambtenaar',
        bind: 'wedding_official',
      },
      options: [
        {
          text: 'Geen voorkeur',
          value: 'Geen voorkeur',
        },
        {
          text: 'Kies Willem',
          video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          value: 'Willem',
        },
        {
          text: 'Kies Judith',
          video_url: 'https://www.youtube.com/watch?v=hVtAw2gie5Y',
          value: 'Judith',
        },
        {
          text: 'Kies René',
          video_url: 'https://www.youtube.com/watch?v=qHfJG_eEWKE',
          value: 'René',
        },
      ],
      next: '8f6c243c-2e86-11e8-b467-0ed5f89f718b',
    },
    {
      id: '8f6c243c-2e86-11e8-b467-0ed5f89f718b',
      type: 'calendar',
      title: 'Wanneer wil je trouwen?',
      subtitle: 'bijv. 12-12-2017.',
      data_properties: {
        title: 'Datum van trouwen',
        bind: 'marry_date',
      },
      metadata: {
        unavailabilities: [
          {
            url: 'someapicalltofetchinfo',
            text: 'trouwambtenaar',
            goto: '8f6c2220-2e86-11e8-b467-0ed5f89f718b',
          },
          {
            url: 'someapicalltofetchinfo',
            text: 'locatie',
            goto: '8f6c1f5a-2e86-11e8-b467-0ed5f89f718b',
          },
        ],
      },
      next: '8f6c291e-2e86-11e8-b467-0ed5f89f718b',
    },
    {
      id: '8f6c291e-2e86-11e8-b467-0ed5f89f718b',
      type: 'multi_text',
      title: 'Gegevens eerste getuige',
      subtitle: 'Kloppen deze gegevens?',
      data_properties: {
        title: 'Gegevens eerste getuige',
        bind: 'first_witness_data',
      },
      list: [
        {
          text: 'Naam',
          value: 'Evelien de Vries',
          name: 'name',
        },
        {
          text: 'BSN',
          value: '13379002',
          name: 'bsn',
        },
      ],
      next: '8f6c2d9c-2e86-11e8-b467-0ed5f89f718b',
    },
    {
      id: '8f6c2d9c-2e86-11e8-b467-0ed5f89f718b',
      type: 'multi_text',
      optional: {
        goto: '8f6c2fcc-2e86-11e8-b467-0ed5f89f718b',
      },
      title: 'Gegevens tweede getuige',
      subtitle: 'Is er een tweede getuige?',
      data_properties: {
        title: 'Gegevens tweede getuige',
        bind: 'second_witness_data',
      },
      list: [
        {
          text: 'Naam',
          name: 'name',
        },
        {
          text: 'BSN',
          name: 'bsn',
        },
      ],
      next: '8f6c2fcc-2e86-11e8-b467-0ed5f89f718b',
    },
    {
      id: '8f6c2fcc-2e86-11e8-b467-0ed5f89f718b',
      type: 'declaration',
      title: 'Ik verklaar dat ik nog met niemand anders getrouwd ben.',
      data_properties: {
        title: 'Nog niet getrouwd',
        bind: 'not_married_declaration',
      },
      declaration_text: 'Ja',
      next: '8f6c31ac-2e86-11e8-b467-0ed5f89f718b',
    },
    {
      id: '8f6c31ac-2e86-11e8-b467-0ed5f89f718b',
      type: 'radiobutton_group',
      title: 'Ik ben bloedverwant in de derde of vierde graads.',
      subtitle: 'Bijvoorbeeld neef en nicht of tante en neef.',
      data_properties: {
        title: 'Bloedverwant derde of vierde graads',
        bind: 'blood_relation_family',
      },
      options: [
        {
          text: 'Ja',
          value: 'Ja',
        },
        {
          text: 'Nee',
          value: 'Nee',
        },
      ],
      next: '8f6c3378-2e86-11e8-b467-0ed5f89f718b',
    },
    {
      id: '8f6c3378-2e86-11e8-b467-0ed5f89f718b',
      type: 'checkbox_group',
      title: 'Welke dingen wil je nog meer op je trouwerij?',
      subtitle: 'Selecteer wat je graag wilt hebben.',
      data_properties: {
        title: 'Feest artikelen',
        bind: 'party_attributes',
      },
      options: [
        {
          text: 'Champagne 🍾',
          cost: 12,
          value: 'Champagne',
        },
        {
          text: 'Confetti 🎉',
          cost: 8,
          value: 'Confetti',
        },
        {
          text: 'Geluidsinstallatie 🎵',
          cost: 20,
          value: 'Geluidsinstallatie',
        },
      ],
    },
  ],
};

const verhuizen = {
  title: 'verhuizing',
  overview: {
    send_to: [
      {
        name: 'Gem. Eindhoven',
        access_level: 'Lezen en schrijven',
      },
    ],
    needed_documents: ['Huur- of koopcontract'],
    steps: [
      'Geef je nieuwe adres op.',
      'Geef de datum op wanneer je gaat verhuizen.',
      'Geef aan met wie je gaat verhuizen.',
      'Upload je koopcontracxt of huurcontract.',
    ],
  },
  questions: [
    {
      id: 'bbe90362-2e82-11e8-b467-0ed5f89f718b',
      type: 'text',
      title: 'Wat wordt je nieuwe adres?',
      subtitle: 'bijv. 1234AB Eindhoven',
      data_properties: {
        title: 'Nieuwe adres',
        bind: 'address',
      },
      metadata: {
        autocomplete: 'address',
      },
      next: 'bbe906f0-2e82-11e8-b467-0ed5f89f718b',
    },
    {
      id: 'bbe906f0-2e82-11e8-b467-0ed5f89f718b',
      type: 'calendar',
      title: 'Wanneer wil je verhuizen?',
      subtitle: 'bijv. 12-12-2017',
      data_properties: {
        title: 'Datum van verhuizing',
        bind: 'move_date',
      },
      metadata: {
        min_date: 'new Date()',
        max_date: 'new Date(new Date().setMonth(new Date().getMonth() + 3))',
      },
      next: 'bbe90d9e-2e82-11e8-b467-0ed5f89f718b',
    },
    {
      id: 'bbe90d9e-2e82-11e8-b467-0ed5f89f718b',
      type: 'checkbox_group',
      title: 'Met wie ga je verhuizen?',
      subtitle: 'Er wordt een bericht gestuurd naar de persoon die meeverhuist',
      data_properties: {
        title: 'Personen die meeverhuizen',
        bind: 'movers',
      },
      options: [
        {
          text: 'Evelien de Vries',
          value: 'Evelien de Vries',
        },
        {
          text: 'Thomas de Vries',
          value: 'Thomas de Vries',
        },
      ],
      next: 'bbe91064-2e82-11e8-b467-0ed5f89f718b',
    },
    {
      id: 'bbe91064-2e82-11e8-b467-0ed5f89f718b',
      type: 'choice',
      title: 'Fotografeer je huurcontract',
      subtitle:
        'Wij hebben jouw huurcontract nodig om je verhuizing te bevestigen',
      options: [
        {
          text: 'Maak foto',
          icon: 'camera.svg',
          goto: 'bbe912b2-2e82-11e8-b467-0ed5f89f718b',
        },
        {
          text: 'Upload',
          icon: 'upload.svg',
          goto: 'bbe914c4-2e82-11e8-b467-0ed5f89f718b',
        },
      ],
    },
    {
      id: 'bbe912b2-2e82-11e8-b467-0ed5f89f718b',
      type: 'documents_photo',
      title: 'Fotografeer je huurcontract',
      subtitle:
        'Wij hebben jouw huurcontract nodig om je verhuizing te bevestigen',
      data_properties: {
        title: 'Documenten',
        bind: 'rental_contract_photos',
        placeholder: 'Huurcontract',
      },
      another: {
        text: 'Nog een foto maken',
        icon: 'camera.svg',
      },
    },
    {
      id: 'bbe914c4-2e82-11e8-b467-0ed5f89f718b',
      type: 'documents_upload',
      title: 'Upload je huurcontract',
      subtitle:
        'Wij hebben jouw huurcontract nodig om je verhuizing te bevestigen',
      data_properties: {
        title: 'Documenten',
        bind: 'rental_contract_photos',
        placeholder: 'Huurcontract',
      },
      another: {
        text: 'Nog een foto uploaden',
        icon: 'upload.svg',
      },
    },
  ],
};

export const testData = (
  data = [BEZWAAR, COMPLIMENT, IDEE, KLACHT, TROUWEN, VERHUIZEN][
    Math.floor(Math.random() / (1.0 / 6))
  ]
) => {
  switch (data) {
    case BEZWAAR:
      return bezwaar;
    case COMPLIMENT:
      return compliment;
    case IDEE:
      return idee;
    case KLACHT:
      return klacht;
    case TROUWEN:
      return trouwen;
    case VERHUIZEN:
      return verhuizen;
    default:
  }
};
