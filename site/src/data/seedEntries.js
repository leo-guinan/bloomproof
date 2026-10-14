// Real published entries, mirroring entries/*.md field for field.
// Artifact URLs are exactly the ones in the entry files.
export const seedEntries = [
  {
    id: '001',
    number: '001',
    title: 'Phones in the canopy that hear chainsaws',
    problem:
      'Illegal loggers work at night in remote rainforest. Satellites show the damage days or weeks later — by then the trees are gone and the loggers are gone. Rangers can’t be everywhere, and they find out too late.',
    solution:
      'Old phones hung high in the trees, solar powered, listening around the clock. AI trained on chainsaw recordings picks the two-stroke engine sound out of rain, insects, and animal noise. When it hears one, it sends rangers the location in real time. Satellites tell you what happened. This tells you while it’s happening.',
    artifactType: 'demo',
    artifactUrl: 'https://rfcx.org',
    artifactLicense: 'Apache-2.0',
    extraLinks: [
      { label: 'Live demo', url: 'https://arbimon.org' },
      { label: 'Guardian device software', url: 'https://github.com/rfcx/guardian-software' }
    ],
    humanName: 'Vasco M. van Roosmalen, Equipe de Conservação da Amazônia',
    humanQuote: 'An extremely powerful tool for the protection of rainforests.',
    attachmentUrl: '',
    origin: 'record',
    status: 'published',
    createdAt: '2026-10-12'
  },
  {
    id: '002',
    number: '002',
    title: "A plant doctor in every farmer's pocket",
    problem:
      "Cassava feeds over half a billion people a day in Africa. It gets sick slowly — a farmer can’t tell which disease is on the leaf until it’s already spread to the neighbor’s farm. Trained experts are few and far away.",
    solution:
      'A free phone app called Nuru — "light" in Swahili. Point the camera at a leaf. In seconds the AI names the disease, over 90% accuracy, better than trained human extension agents in field tests. It runs fully offline on cheap Android phones. No signal, no cloud, no cost. Then it tells the farmer what to do about it.',
    artifactType: 'demo',
    kind: 'app',
    artifactUrl: 'https://play.google.com/store/apps/details?id=plantvillage.nuru',
    artifactLicense: 'CC BY-SA (PlantVillage training dataset)',
    extraLinks: [
      { label: 'PlantVillage open dataset', url: 'https://plantvillage.psu.edu' }
    ],
    humanName: 'David Hughes, PlantVillage founder',
    humanQuote:
      'The most satisfying part has been to make a difference in the lives of the poorest people on the planet.',
    attachmentUrl: '',
    origin: 'record',
    status: 'published',
    createdAt: '2026-10-12'
  },
  {
    id: '004',
    number: '004',
    title: 'A voice for 12 million speakers',
    problem:
      'None of the big voice assistants understand a single native African language. For Kinyarwanda’s 12 million speakers — many with low literacy or visual impairments — the entire voice-technology revolution simply didn’t exist in their language.',
    solution:
      'Mozilla’s Common Voice crowdsourced more than 1,700 hours of donated Kinyarwanda speech into a public-domain dataset. Rwandan AI startup Digital Umuganda built speech-to-text and text-to-speech on it — including Mbaza, a chatbot that gives citizens government and health information in Kinyarwanda, spoken aloud.',
    artifactType: 'demo',
    artifactUrl: 'https://commonvoice.mozilla.org',
    artifactLicense: 'CC0',
    extraLinks: [],
    humanName: 'Audace Niyonkuru, Digital Umuganda CEO',
    humanQuote: 'With speech technology, no one will be left behind.',
    attachmentUrl: '',
    origin: 'record',
    status: 'published',
    createdAt: '2026-10-14'
  },
  {
    id: '005',
    number: '005',
    title: 'The open map of every protein',
    problem:
      'Figuring out a protein’s 3D shape used to take months of lab work per protein — and shape determines function, which determines drugs. For underfunded diseases like melioidosis, a bacterial “silent killer” claiming around 90,000 lives a year mostly in Southeast Asia, that slowness meant treatments stalled for lack of basic structural knowledge.',
    solution:
      'AlphaFold predicts a protein’s 3D structure from its amino-acid sequence in seconds, at accuracy rivaling lab experiments. The predictions are published in a free searchable database of more than 200 million structures covering nearly every known protein.',
    artifactType: 'demo',
    artifactUrl: 'https://alphafold.ebi.ac.uk',
    artifactLicense: 'Apache-2.0 (code) / CC BY 4.0 (database)',
    extraLinks: [{ label: 'AlphaFold code', url: 'https://github.com/google-deepmind/alphafold' }],
    humanName: 'Dr. Su Datt Lam’s team, National University of Malaysia',
    humanQuote: '',
    attachmentUrl: '',
    origin: 'record',
    status: 'published',
    createdAt: '2026-10-14'
  },
  {
    id: '006',
    number: '006',
    title: 'Seven days’ warning before the water comes',
    problem:
      'Floods affect an estimated 95 to 240 million people a year, killing 6,000 to 8,000 and causing up to $33 billion in damage — and in the most vulnerable regions, warnings arrived too late or not at all. In Bangladesh, floods kill an average of 5,000 people a year.',
    solution:
      'Google’s Flood Hub uses neural-network models to forecast river flooding up to 7 days ahead across 100 countries, publishing hyper-local inundation maps that show predicted flood depth and extent down to the village level. Alerts go out through Search, Maps, and partner networks including the Red Cross.',
    artifactType: 'demo',
    artifactUrl: 'https://sites.research.google/floods',
    artifactLicense: 'Apache-2.0',
    extraLinks: [{ label: 'Flood forecasting code', url: 'https://github.com/google-research/flood-forecasting' }],
    humanName: 'Yossi Matias, Flood Hub project lead',
    humanQuote: '',
    attachmentUrl: '',
    origin: 'record',
    status: 'published',
    createdAt: '2026-10-14'
  },
  {
    id: '007',
    number: '007',
    title: '35 million cells, explorable by any biologist',
    problem:
      'Single-cell datasets exploded to millions of cells across thousands of genes — but exploring them required serious coding, locking most biologists out of data that could reveal how diseases work at the cellular level.',
    solution:
      'CZI’s CELLxGENE Discover is a no-code, in-browser platform for exploring more than 35 million cells across 1,000+ standardized datasets: interactive gene-expression visualization, comparison between cell groups, and an encyclopedia of 700+ cell types — all point-and-click, no install.',
    artifactType: 'demo',
    artifactUrl: 'https://cellxgene.cziscience.com',
    artifactLicense: 'MIT',
    extraLinks: [{ label: 'CELLxGENE code', url: 'https://github.com/chanzuckerberg/cellxgene' }],
    humanName: 'Phil Smoot, CZI head of science and technology',
    humanQuote: 'Answer fundamental questions about human biology in seconds, not years.',
    attachmentUrl: '',
    origin: 'record',
    status: 'published',
    createdAt: '2026-10-14'
  }
]
