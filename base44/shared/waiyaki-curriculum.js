/**
 * Waiyaki wa Hinga: Leadership, Resistance and Historical Memory —
 * server-side-only course content.
 *
 * Imported ONLY by Base44 backend functions. Never imported by src/ and
 * never bundled into the public client JavaScript. Modules, the final
 * assessment (including its answer key) and the project options are
 * released to a learner only through the access-gated getWaiyakiModule,
 * getWaiyakiAssessment and checkWaiyakiAssessment backend functions.
 *
 * SOURCE: the Tamu Academy learner guide of the same name. The five-module
 * organisation, the module parts, the key terms, the source-analysis grid,
 * the reflection prompts, the four project choices and the bibliography are
 * the guide's own. Every claim carries the guide's evidence label:
 *   DOCUMENTED — supported by written records or reliable published research
 *   TRADITION  — held in oral history, family memory, song or community testimony
 *   CONTESTED  — sources disagree, or the evidence is incomplete or partisan
 *
 * The guide states no answer key, so the correct answers below were written
 * for this course from the guide's own content; they are server-side only.
 */

export const WAIYAKI_COURSE_TITLE =
  'Waiyaki wa Hinga: Leadership, Resistance and Historical Memory';

export const WAIYAKI_COURSE_SUBTITLE =
  'A research- and memory-based course exploring Waiyaki wa Hinga, colonial history, leadership, resistance, land, governance, oral history, and contemporary significance.';

// ---------------------------------------------------------------------------
// Modules
// ---------------------------------------------------------------------------

export const WAIYAKI_MODULES = {
  'module-1': {
    route: 'module-1',
    number: 'Module 01',
    title: 'Who Was Waiyaki wa Hinga?',
    subtitle: 'The story in brief \u00b7 Reading the sources',
    estimatedTime: '35\u201345 minutes',
    companionVideo: 'Video 1',
    learningObjectives: [
      'Summarise the main events of Waiyaki wa Hinga\u2019s life and death.',
      'Apply source-criticism questions to colonial records and to oral tradition.',
      'Explain why historians separate documented fact from oral tradition.',
      'Identify the main places and people in the story.',
    ],
    lead:
      'Waiyaki wa Hinga was a nineteenth-century Kikuyu leader at Dagoretti\u2013Kabete, in what is now Kenya. In 1890 he made a pact of blood brotherhood with an agent of the Imperial British East Africa Company. Two years later he was wounded, arrested and deported, and he died in company custody at Kibwezi. His story sits at the meeting point of African self-government, early colonial expansion, and the long struggle over land and memory.',
    sections: [
      {
        heading: 'The story in brief',
        blocks: [
          {
            type: 'paragraph',
            label: 'DOCUMENTED',
            text: 'Waiyaki wa Hinga was a wealthy and respected leader of the southern Kikuyu frontier, around present-day Dagoretti and Kabete on the western edge of Nairobi. He controlled land, traded with passing caravans, and spoke for his community in its dealings with outsiders.',
          },
          {
            type: 'paragraph',
            label: 'DOCUMENTED',
            text: 'In October 1890 he welcomed Captain Frederick Lugard of the Imperial British East Africa Company and sealed an alliance through blood brotherhood. Within two years, the relationship had collapsed. Company caravans and soldiers took food, livestock and women; forts were built and burned; villages were raided. In August 1892 Waiyaki was wounded in a confrontation, chained overnight, tried and sentenced to deportation.',
          },
          {
            type: 'paragraph',
            label: 'CONTESTED',
            text: 'He never reached the coast. He died at Kibwezi, roughly 250 km from home. Colonial officials blamed his head wound. Kikuyu tradition holds that he was buried alive. His grave has never been confirmed.',
          },
          {
            type: 'paragraph',
            label: 'DOCUMENTED',
            text: 'More than a century later, Kenya formally declared him a national hero in 2023. One of Nairobi\u2019s busiest roads, Waiyaki Way, carries his name.',
          },
        ],
      },
      {
        heading: 'Why study him?',
        blocks: [
          {
            type: 'bullets',
            items: [
              {
                title: 'Leadership',
                text: 'He governed through councils and consensus, not as a king \u2014 a model that challenges stereotypes about African politics.',
              },
              {
                title: 'First contact',
                text: 'His story shows how early colonial relationships were negotiated, misunderstood and broken.',
              },
              {
                title: 'Memory',
                text: 'His death became a symbol, used by nationalists, novelists, families and governments in different ways.',
              },
              {
                title: 'Method',
                text: 'He is an ideal case for learning how to weigh archives against oral history.',
              },
            ],
          },
        ],
      },
    ],
    keyTerms: [
      {
        term: 'Kikuyu / Ag\u0129k\u0169y\u0169',
        definition:
          'Bantu-speaking people of central Kenya, today Kenya\u2019s largest ethnic community.',
      },
      {
        term: 'IBEAC',
        definition:
          'Imperial British East Africa Company, a chartered company that administered British interests in East Africa from 1888 to 1895.',
      },
    ],
    sourceAnalysis: {
      heading: 'Reading the Sources',
      intro:
        'Every source was created by someone, for someone, for a reason. The skill this course practises is not choosing the \u201ctrue\u201d side, but asking what each source can and cannot tell us.',
      lenses: [
        {
          heading: 'Company records (IBEAC, 1890\u20131893)',
          paragraphs: [
            {
              label: 'DOCUMENTED',
              text: 'Commercial pressure. The IBEAC was a chartered company answerable to shareholders in London. Officers had to justify costly forts and punitive expeditions to their superiors.',
            },
            {
              label: 'CONTESTED',
              text: 'How that shaped the record. Historians argue this encouraged officers to describe clashes as unprovoked attacks rather than responses to looting and abuse. Even so, some officials admitted fault: Lugard blamed undisciplined caravans, and Sir Gerald Portal wrote that company raiding had turned the country against Europeans.',
            },
            {
              label: 'DOCUMENTED',
              text: 'Cultural misreading. Officers projected European ideas onto Kikuyu society: a \u201cchief\u201d who could command everyone, and land that could be permanently granted. When councils or independent lineages resisted, Waiyaki was held personally responsible.',
            },
          ],
          strength:
            'Contemporary, dated, and written by eyewitnesses to some events.',
          weakness:
            'Written by one side of a conflict, in a language and legal frame the other side did not share.',
        },
        {
          heading: 'Oral tradition and family accounts',
          paragraphs: [
            {
              text: 'Use it well: compare multiple tellings, note who is speaking and when, and look for points where independent traditions agree \u2014 such as the name of Waiyaki\u2019s mother, or Kibwezi as the place of death.',
            },
          ],
          strength:
            'Preserves Kikuyu perspectives, names, songs and places absent from the archive, and was carried by people with direct ties to the events.',
          weakness:
            'Details shift across tellings and generations, and family accounts can reflect later political needs. Critics argue, for example, that some modern accounts cast Waiyaki as a fully formed nationalist decades before nationalism existed.',
        },
      ],
      questions: [
        {
          question: 'Who made it?',
          example:
            'Was the writer a company officer, a missionary, a family member, a journalist?',
        },
        {
          question: 'When?',
          example: 'At the time, or decades later? Before or after independence?',
        },
        {
          question: 'For whom?',
          example:
            'London shareholders, a Kenyan newspaper audience, family descendants?',
        },
        {
          question: 'What is missing?',
          example:
            'Whose voices are absent? What would the other side say?',
        },
        {
          question: 'What else agrees?',
          example: 'Is the claim supported by an independent source?',
        },
      ],
    },
    reflection: {
      groups: [
        {
          heading: 'Discussion & Reflection',
          prompts: [
            'Before this course, what did you know or assume about Waiyaki wa Hinga? Where did that knowledge come from?',
            'Why might a written colonial record and a family\u2019s oral history tell different stories about the same event?',
          ],
        },
      ],
    },
  },

  'module-2': {
    route: 'module-2',
    number: 'Module 02',
    title: 'Land, People and Power',
    subtitle:
      'A name with two worlds \u00b7 Not a king, not a chief \u00b7 Kabete, the caravans\u2019 Cape Town',
    estimatedTime: '40\u201350 minutes',
    companionVideo: 'Video 2',
    learningObjectives: [
      'Compare the different accounts of Waiyaki\u2019s parentage and family.',
      'Explain how adoption and intermarriage shaped identity on the Kikuyu\u2013Maasai frontier.',
      'Describe the role of a m\u0169thamaki and the power of the council of elders (kiama).',
      'Analyse how European assumptions about chiefs shaped colonial conflict.',
      'Explain how land was acquired and why the frontier mattered to long-distance trade.',
    ],
    lead:
      'This module sets the world Waiyaki was born into: a frontier of exchange between Kikuyu farmers and Maasai herders, a society governed without kings, and a ridge country whose food markets made it indispensable to the long caravan routes between the coast and the interior.',
    sections: [
      {
        heading: 'Part 1 \u00b7 A Name with Two Worlds',
        blocks: [
          {
            type: 'paragraph',
            label: 'CONTESTED',
            text: 'Birth and parentage. No birth record exists. Historians estimate the 1840s. The meaning of Hinga, his father\u2019s name, is itself debated: translations include \u201cdissembler\u201d, \u201cdouble agent\u201d and \u201cone who keeps secrets\u201d.',
          },
          {
            type: 'paragraph',
            label: 'DOCUMENTED',
            text: 'A point of agreement: both the family tree published in Regeru\u2019s book and the dissenting descendant name Waiyaki\u2019s mother as Ngina.',
          },
          {
            type: 'paragraph',
            text: 'Frontier identity. The southern Kikuyu frontier was a zone of exchange. Kikuyu farmers and Maasai herders raided each other, but also traded, made treaties, intermarried and adopted one another\u2019s members.',
          },
          {
            type: 'paragraph',
            label: 'DOCUMENTED',
            text: 'The family in Waiyaki\u2019s generation. According to the family genealogy, Waiyaki had seven wives: Tiebo, Wambui Kairigo, Wanja, Wambui, Cania, Gathoni and Wambui wa Igacaku.',
          },
        ],
      },
      {
        heading: 'Part 2 \u00b7 Not a King, Not a Chief',
        blocks: [
          {
            type: 'paragraph',
            label: 'DOCUMENTED',
            text: 'A society without kings. Pre-colonial Kikuyu society had no kings or paramount chiefs. Authority was spread across age-sets, generations and councils of elders. A m\u0169thamaki (plural athamaki) was a respected spokesman whose influence came from wealth, wisdom, generosity and skill in speech.',
          },
          {
            type: 'paragraph',
            label: 'DOCUMENTED',
            text: 'Why the misunderstanding mattered. The company treated Waiyaki as a ruler who could command his people, guarantee food supplies and punish wrongdoers. When young men attacked caravans or neighbours killed porters, officials held Waiyaki responsible, although he had no power to stop them.',
          },
        ],
      },
      {
        heading: 'Part 3 \u00b7 Kabete, the Caravans\u2019 Cape Town',
        blocks: [
          {
            type: 'paragraph',
            label: 'DOCUMENTED',
            text: 'Settling the land. The Kikuyu expanded southward ridge by ridge over several centuries. South of the Chania River, land was mostly acquired by purchase and mutual adoption with the Athi/Dorobo hunting peoples, not by conquest.',
          },
          {
            type: 'paragraph',
            text: 'A food market for caravans. Long-distance caravans of 1,200 to 1,500 people travelled between the Swahili coast and the lake regions. Godfrey Muriuki compared Kabete\u2019s role to that of Cape Town for passing ships.',
          },
          {
            type: 'paragraph',
            label: 'DOCUMENTED',
            text: 'Waiyaki\u2019s wealth came largely from this trade and from land. He co-owned large holdings with his brother around Kihumo, Kikuyu and Dagoretti.',
          },
        ],
      },
    ],
    keyTerms: [
      {
        term: 'Mbari',
        definition:
          'A Kikuyu sub-clan or lineage group that held land collectively.',
      },
      {
        term: 'Adoption (Kikuyu)',
        definition:
          'A ritual process, often involving a goat sacrifice, through which an outsider became a full lineage member.',
      },
      {
        term: 'M\u0169thamaki',
        definition:
          'Kikuyu spokesman-leader; influence rather than command.',
      },
      {
        term: 'Kiama',
        definition: 'Council of elders that judged disputes and ratified decisions.',
      },
      {
        term: 'Age-set (riika)',
        definition:
          'A group of people initiated together, sharing duties and status for life.',
      },
      {
        term: 'Athi / Dorobo',
        definition: 'Hunter-gatherer peoples from whom many Kikuyu bought land.',
      },
      {
        term: 'Caravan route',
        definition:
          'The trade and later colonial route from Mombasa to Uganda that passed through Kikuyuland.',
      },
    ],
    reflection: {
      groups: [
        {
          heading: 'Discussion & Reflection',
          prompts: [
            'Why does it matter that Waiyaki is described as a m\u0169thamaki rather than a chief? What changes in the story when the wrong word is used?',
            'Land on this frontier was mostly bought, inherited or adopted, not conquered. How does that change the way you read the arrival of the company?',
          ],
        },
      ],
    },
  },

  'module-3': {
    route: 'module-3',
    number: 'Module 03',
    title: 'From Alliance to Arrest',
    subtitle: 'Blood brothers, 1890 \u00b7 From friendship to fire, 1891 \u00b7 The row at Fort Smith, 1892',
    estimatedTime: '45\u201360 minutes',
    companionVideo: 'Video 3',
    learningObjectives: [
      'Describe the 1890 meeting between Waiyaki and Lugard and the meaning of blood brotherhood.',
      'Compare African and European expectations of the agreement, including over land.',
      'Identify the causes of the breakdown between the Kikuyu and the company.',
      'Trace the events from the Githunguri killings to Waiyaki\u2019s arrest.',
      'Compare colonial and Kikuyu accounts of the confrontation at Fort Smith.',
    ],
    lead:
      'In less than two years, the relationship between Waiyaki and the Imperial British East Africa Company moved from a sacred pact to open conflict. This module follows that change in three parts: the alliance of October 1890, its collapse in 1891, and the crisis of August 1892 that ended with Waiyaki\u2019s arrest.',
    sections: [
      {
        heading: 'Part 1 \u00b7 Blood Brothers, October 1890',
        intro: 'First contact, a sacred pact, and two different understandings of it.',
        blocks: [
          {
            type: 'subheading',
            text: 'The meeting',
          },
          {
            type: 'paragraph',
            label: 'DOCUMENTED',
            text: 'Captain Frederick Lugard reached Dagoretti in October 1890, on his way to Uganda for the IBEAC with Sudanese soldiers, Somali scouts and nearly 300 Swahili porters. Waiyaki received him, made blood brotherhood with him, and helped choose a site for a company fort \u2014 the first north of Machakos.',
          },
          {
            type: 'paragraph',
            text: 'Lugard was impressed. In his diary he wrote that he trusted himself almost alone among Waiyaki\u2019s people and found them honest and straightforward.',
          },
          {
            type: 'subheading',
            text: 'What was agreed?',
          },
          {
            type: 'paragraph',
            label: 'TRADITION',
            text: 'Family accounts reported in the Kenyan press give the terms: food would be supplied on payment, not on demand, and neither side would harm the other. Wambui Otieno adds that no land was to be taken.',
          },
          {
            type: 'callout',
            label: 'PRIMARY-SOURCE MOMENT',
            heading: 'Blood brotherhood',
            text: 'Blood brotherhood (muma wa thakame) was a widespread East African institution. Two parties exchanged or tasted each other\u2019s blood, often with meat, and took binding oaths. Breaking the bond was believed to bring misfortune. For Waiyaki, it was a sacred alliance between equals. For many Europeans, it was a useful formality \u2014 one Lugard used repeatedly on his journeys.',
          },
          {
            type: 'paragraph',
            label: 'DOCUMENTED',
            text: 'Lugard left for Uganda on 1 November 1890, leaving George Wilson in charge. He never returned to manage the relationship he had created.',
          },
          {
            type: 'subheading',
            text: 'Land in question: gift, tenancy or transfer?',
          },
          {
            type: 'table',
            columns: ['Kikuyu land law', 'What it meant'],
            rows: [
              ['Githaka', 'A lineage estate.'],
              ['Muhoi (plural ahoi)', 'A tenant given permission to cultivate, usually through friendship and with the lineage\u2019s approval.'],
              ['Muthami', 'A person who could build a homestead, but the land still belonged to the lineage.'],
            ],
          },
          {
            type: 'paragraph',
            label: 'CONTESTED',
            text: 'Many historians and the Waiyaki family argue that allowing Lugard to build a fort was understood as a conditional, tenant-like permission, not a sale or surrender of land. Company records treated it as a lasting grant. The gap between those two readings helps explain why Kikuyu communities felt entitled to withdraw permission once the terms were broken.',
          },
        ],
      },
      {
        heading: 'Part 2 \u00b7 From Friendship to Fire, 1891',
        intro: 'How an alliance broke down within months.',
        blocks: [
          {
            type: 'subheading',
            text: 'What went wrong',
          },
          {
            type: 'bulletParagraphs',
            items: [
              {
                label: 'DOCUMENTED',
                text: 'Caravan porters and garrison soldiers took crops, livestock and women. Even Lugard later blamed the falling-out on undisciplined caravans robbing crops.',
              },
              {
                label: 'DOCUMENTED',
                text: 'Wilson ran short of ammunition and received no reinforcements. He withdrew at night; the Kikuyu then looted and burned the fort in early 1891.',
              },
            ],
          },
          {
            type: 'subheading',
            text: 'Fort Smith',
          },
          {
            type: 'paragraph',
            label: 'DOCUMENTED',
            text: 'Major Eric Smith then led a stronger expedition and built Fort Smith at Ndumbuini, Kabete, overlooking Waiyaki\u2019s village (dated to late 1891 or April 1892). W.J. Purkiss later commanded it. The fort survives today and was gazetted a national monument in 2005, though it sits largely on private land and has been neglected.',
          },
          {
            type: 'callout',
            label: 'WORD STUDY',
            heading: '\u201cDagoretti\u201d',
            text: 'A popular explanation derives the name from the Kikuyu ndagurite, \u201che has not bought\u201d \u2014 said of the British occupying land they had not paid for. Other scholars trace the name to Maasai. Treat it as folk etymology that nonetheless captures how the community felt.',
          },
        ],
      },
      {
        heading: 'Part 3 \u00b7 August 1892: The Row at Fort Smith',
        intro: 'Resistance, arrest and colonial justice.',
        blocks: [
          {
            type: 'subheading',
            text: 'The spark',
          },
          {
            type: 'paragraph',
            label: 'DOCUMENTED',
            text: 'Purkiss sent armed porters led by a man named Maktubu to collect food at Githunguri. They were killed.',
          },
          {
            type: 'paragraph',
            label: 'CONTESTED',
            text: 'Popular accounts blame the porters\u2019 pillaging; Muriuki links the killing to a private dowry or debt dispute and finds that Waiyaki did not order it.',
          },
          {
            type: 'paragraph',
            label: 'DOCUMENTED',
            text: 'In July\u2013August 1892, J.R.L. Macdonald\u2019s railway survey caravan joined Purkiss in a punitive expedition. Villages were burned. Waiyaki, related to the Githunguri people by marriage, is said to have warned them. The force returned to Fort Smith on 14 August.',
          },
          {
            type: 'subheading',
            text: 'Two versions of the confrontation',
          },
          {
            type: 'bullets',
            items: [
              {
                title: 'Colonial account (Macdonald, Ainsworth)',
                text: 'Waiyaki, said to be drunk, attacked Purkiss with a sword. The blade caught in the rafters; he was overpowered and wounded in the head, reportedly with his own sword.',
              },
              {
                title: 'Kikuyu and family account',
                text: 'Waiyaki came to protest the raids, was refused entry, forced his way in and was beaten. Some accounts say he was lured to \u201cpeace talks\u201d.',
              },
            ],
          },
          {
            type: 'subheading',
            text: 'Arrest and trial',
          },
          {
            type: 'bulletParagraphs',
            items: [
              {
                label: 'DOCUMENTED',
                text: 'Arrested on 16 August 1892. An official described him handcuffed to the flagstaff with a chain around his neck, spending the night in the fort square.',
              },
              {
                label: 'DOCUMENTED',
                text: 'Tried in a makeshift company court and sentenced to deportation.',
              },
              {
                label: 'DOCUMENTED',
                text: 'On 17 August he was marched toward the coast.',
              },
            ],
          },
        ],
      },
    ],
    keyTerms: [
      {
        term: 'Muma wa thakame',
        definition:
          'Blood brotherhood \u2014 a binding East African oath between two parties who exchanged or tasted each other\u2019s blood.',
      },
      {
        term: 'Githaka',
        definition: 'A Kikuyu lineage estate.',
      },
      {
        term: 'Muhoi',
        definition:
          'A tenant given permission to cultivate lineage land, usually through friendship and with the lineage\u2019s approval.',
      },
      {
        term: 'Muthami',
        definition:
          'Someone permitted to build a homestead on lineage land, which still belonged to the lineage.',
      },
    ],
    reflection: {
      groups: [
        {
          heading: 'Part 1 \u00b7 Blood Brothers, October 1890',
          prompts: [
            'What did each side gain from the alliance in 1890?',
            'Can an agreement be valid if the two parties understand it differently? Find another historical example.',
            'Why is it significant that Lugard praised Waiyaki\u2019s people in writing?',
          ],
        },
        {
          heading: 'Part 2 \u00b7 From Friendship to Fire, 1891',
          prompts: [
            'Was the conflict caused by individuals, by the company\u2019s system, or by deeper differences? Defend your answer.',
            'Why do place-name stories like \u201cndagurite\u201d survive even when their origins are uncertain?',
          ],
        },
        {
          heading: 'Part 3 \u00b7 August 1892',
          prompts: [
            'Whose account of the confrontation do you find more convincing, and why? What evidence would change your mind?',
            'Could a trial run by one party to a conflict be fair? What would a fair process have looked like?',
            'Why might the two accounts of the confrontation be so different? What did each side need the story to show?',
          ],
        },
      ],
    },
  },

  'module-4': {
    route: 'module-4',
    number: 'Module 04',
    title: 'Kibwezi: Two Stories of One Death',
    subtitle: 'The record, the tradition, and the search for the grave',
    estimatedTime: '40\u201350 minutes',
    companionVideo: 'Video 4',
    learningObjectives: [
      'Compare the colonial record and oral tradition about Waiyaki\u2019s death.',
      'Explain why the question remains unresolved.',
      'Recognise how official speeches can reshape popular memory.',
    ],
    lead:
      'Waiyaki died at Kibwezi, in today\u2019s Makueni County, while a prisoner of the company. What happened to his body is the most contested question in his story \u2014 and the clearest lesson in how evidence is weighed.',
    sections: [
      {
        heading: 'What everyone agrees on',
        blocks: [
          {
            type: 'paragraph',
            label: 'DOCUMENTED',
            text: 'Waiyaki died at Kibwezi, in today\u2019s Makueni County, while a prisoner of the company. The family dates his death to 6 September 1892.',
          },
          {
            type: 'table',
            columns: ['The colonial record', 'The oral tradition'],
            rows: [
              [
                'DOCUMENTED \u2014 Administrator John Ainsworth wrote that the prisoner could go no further because of his head wound, was left at the Scottish mission hospital at Kibwezi, died some days later, and was buried in the mission cemetery. Macdonald attributed death to a skull fracture.',
                'TRADITION \u2014 Waiyaki was buried alive, head down, facing the centre of the earth. A G\u0129k\u0169y\u0169 song remembers that he was buried alive and a banana tree planted over the spot. Ng\u0169g\u0129 wa Thiong\u2019o echoes the image in A Grain of Wheat.',
              ],
            ],
          },
        ],
      },
      {
        heading: 'Weighing the evidence',
        blocks: [
          {
            type: 'paragraph',
            text: 'The written sources support death from a head wound, but they were written by the side that inflicted it. None is a medical report or an eyewitness account of the burial. The oral tradition was recorded early and has been held consistently for over a century, but it cannot be confirmed without identifying the remains. The mission cemetery at Kibwezi holds ten unmarked graves and none for Waiyaki.',
          },
        ],
      },
      {
        heading: 'Searches for the grave',
        blocks: [
          {
            type: 'bulletParagraphs',
            items: [
              {
                label: 'DOCUMENTED',
                text: '1998: the Sunday Times (2 August) reported that a journalist, guided by local elder Mzee Athumani, had found Waiyaki\u2019s grave at Kibwezi. Wambui Otieno was photographed at the site and remains were sent for DNA tests. No result was ever published.',
              },
              {
                label: 'DOCUMENTED',
                text: '2014: the family publicly appealed for the grave to be located and the remains exhumed. No official exhumation has taken place.',
              },
            ],
          },
        ],
      },
      {
        heading: 'Case study: a president\u2019s retelling',
        blocks: [
          {
            type: 'paragraph',
            text: 'In his Mashujaa Day speech of 20 October 2020, President Uhuru Kenyatta told the nation that Waiyaki was arrested in 1892 and buried alive at Manyani Maximum Prison in Taita Taveta. The speech presented the oral tradition as fact \u2014 and placed it at the wrong location: Waiyaki died at Kibwezi, and Manyani Prison did not exist in 1892.',
          },
          {
            type: 'callout',
            heading: 'Consider',
            text: 'How do official words shape what millions of people believe about the past?',
          },
          {
            type: 'paragraph',
            label: 'CONTESTED',
            text: 'Impossible variant: one story says he was buried upside down in revenge for a Mau Mau killing. Mau Mau began around 1950, nearly 60 years after his death.',
          },
        ],
      },
    ],
    keyTerms: [],
    reflection: {
      groups: [
        {
          heading: 'Discussion & Reflection',
          prompts: [
            'Why do you think the buried-alive tradition has lasted so long?',
            'What would it take to resolve this question? Who should decide whether to exhume remains?',
            'Is a tradition \u201cfalse\u201d if it cannot be proven? What else might it be telling us?',
          ],
        },
      ],
    },
  },

  'module-5': {
    route: 'module-5',
    number: 'Module 05',
    title: 'Memory, Family and a Nation',
    subtitle: 'The House of Hinga \u00b7 From contested figure to national hero \u00b7 Epilogue',
    estimatedTime: '45\u201355 minutes',
    companionVideo: 'Video 5',
    learningObjectives: [
      'Identify prominent descendants of Waiyaki wa Hinga and the family\u2019s efforts to commemorate him.',
      'Compare nationalist, revisionist and balanced interpretations of his life.',
      'Evaluate how Kenya remembers him today, from Waiyaki Way to national hero status.',
      'Explain why his story remains unfinished.',
    ],
    lead:
      'Waiyaki\u2019s death became a symbol, and symbols are used. This module follows three kinds of remembering: a family that has kept his name and pressed for his remains, historians who read his life in sharply different ways, and a nation that has made him a hero.',
    sections: [
      {
        heading: 'Part 1 \u00b7 The House of Hinga',
        intro: 'Family, descendants, and the long search for remains.',
        blocks: [
          {
            type: 'subheading',
            text: 'Notable descendants',
          },
          {
            type: 'table',
            columns: ['Name', 'Relationship', 'Significance'],
            rows: [
              ['Tiras (Tirus) Waiyaki', 'Grandson', 'Kenya\u2019s first African chief inspector of police'],
              ['Wambui Otieno (1936\u20132011)', 'Great-granddaughter', 'Mau Mau activist, politician, author of Mau Mau\u2019s Daughter; known for the S.M. Otieno burial case'],
              ['Dr Munyua Waiyaki (1926\u20132017)', 'Great-grandson (often called grandson)', 'Foreign Minister 1974\u201379, Agriculture Minister, MP for Kasarani'],
              ['Njoroge Regeru', 'Descendant', 'Lawyer; author of the family history (2016)'],
            ],
          },
          {
            type: 'paragraph',
            text: 'The family genealogy shows the name Waiyaki repeated across generations and branches \u2014 a living form of commemoration long before any public monument.',
          },
          {
            type: 'subheading',
            text: 'Remembering in the family',
          },
          {
            type: 'paragraph',
            label: 'DOCUMENTED',
            text: 'In September 2014 the family publicly appealed for the grave to be located, the remains exhumed, and a hero\u2019s burial held. The same year they held the first-ever commemoration of his death \u2014 122 years after it. They resolved to mark 6 September every year, and did so again in 2015, when they also addressed the British Government about his treatment.',
          },
          {
            type: 'paragraph',
            label: 'DOCUMENTED',
            text: 'Descendants say much Hinga land was later alienated under colonial rule. A nephew donated land at Kihumo, the site of the first fort, where a church now stands.',
          },
        ],
      },
      {
        heading: 'Part 2 \u00b7 From Contested Figure to National Hero',
        intro: 'Memory, recognition and meaning today.',
        blocks: [
          {
            type: 'subheading',
            text: 'Three ways of seeing Waiyaki',
          },
          {
            type: 'table',
            columns: ['View', 'Key voices', 'Argument'],
            rows: [
              [
                'Nationalist',
                'Wambui Otieno, N. Regeru, Maina wa Kinyatti',
                'Kenya\u2019s first freedom fighter, betrayed and martyred for defending his people and land; his Kikuyu\u2013Maasai heritage is held up as a model of unity across communities.',
              ],
              [
                'Revisionist',
                'Peter Rogers (1979)',
                'Trade, not confrontation, was the main theme; Waiyaki was a leading trading elder and go-between whose removal opened the way for rivals.',
              ],
              [
                'Balanced',
                'Godfrey Muriuki (1974)',
                'Neither the scheming rogue of company records nor the nationalist martyr \u2014 a leader caught in forces he could not control.',
              ],
            ],
          },
          {
            type: 'subheading',
            text: 'Memory in public life',
          },
          {
            type: 'bullets',
            items: [
              {
                title: 'A lasting symbol',
                text: 'His death became a lasting symbol of opposition to colonial rule. Jomo Kenyatta mentioned him in Facing Mount Kenya (1938).',
              },
              {
                title: 'Literature',
                text: 'Ng\u0169g\u0129 wa Thiong\u2019o named the hero of The River Between (1965) Waiyaki; the novel is set decades later but carries his name\u2019s weight.',
              },
              {
                title: 'Waiyaki Way',
                text: 'A major Nairobi road renamed after independence.',
              },
              {
                title: 'Fort Smith',
                text: 'Gazetted a national monument in 2005, but neglected and largely on private land.',
              },
              {
                title: 'National hero',
                text: 'Listed by the National Heroes Council among the 2023 Mashujaa Day heroes (Liberation Struggle, Kiambu County), honoured on 20 October 2023.',
              },
              {
                title: 'Monuments',
                text: 'The family has asked for a monument on Waiyaki Way, and a former Nairobi governor promised one in 2017; it has not been built.',
              },
              {
                title: 'The arts',
                text: 'A G\u0129k\u0169y\u0169-language stage play, Waiyaki wa Hinga, opened in Nairobi in May 2026, with a rerun in October.',
              },
            ],
          },
        ],
      },
      {
        heading: 'Epilogue \u00b7 Why Waiyaki Still Matters',
        intro:
          'The facts of Waiyaki wa Hinga\u2019s life fit on a single page. Their meaning has taken more than a century to unfold.',
        blocks: [
          {
            type: 'paragraph',
            text: 'He shows what African leadership looked like before colonial rule. Waiyaki governed through persuasion and council, not command. His story corrects the old assumption that pre-colonial African societies were either kingdoms or chaos.',
          },
          {
            type: 'paragraph',
            text: 'He shows how colonialism began in practice. Not with a single conquest, but with alliances, misunderstandings, broken terms, and the steady pressure of armed traders who needed food, land and obedience.',
          },
          {
            type: 'paragraph',
            text: 'He shows how memory works. The written record says one thing; his people\u2019s songs and stories say another. Learning to hold both, honestly, is one of the most important skills a student of history can develop.',
          },
          {
            type: 'paragraph',
            text: 'He shows that history is unfinished. His grave has not been confirmed. A promised monument has not been built. His descendants still gather each September. Questions that began in 1892 are still being asked today \u2014 and some of them may yet be answered by the people who study his life.',
          },
          {
            type: 'paragraph',
            text: 'Waiyaki\u2019s story is a reminder that the people who came before us are part of the ground we stand on \u2014 and of the roads we travel every day.',
          },
        ],
      },
    ],
    keyTerms: [],
    reflection: {
      groups: [
        {
          heading: 'Part 1 \u00b7 The House of Hinga',
          prompts: [
            'Why might a family wait more than a century to hold a public commemoration?',
            'What is owed, if anything, to the descendants of people harmed under colonial rule?',
            'How does your own family or community remember its ancestors?',
          ],
        },
        {
          heading: 'Part 2 \u00b7 From Contested Figure to National Hero',
          prompts: [
            'Is it possible to be both a collaborator and a resister? Use Waiyaki\u2019s life as evidence.',
            'What should a monument to Waiyaki look like, and what words should it carry?',
            'Which leaders in your own country\u2019s history are remembered in contested ways? What can Waiyaki\u2019s story teach about them?',
          ],
        },
      ],
    },
  },
};

// ---------------------------------------------------------------------------
// Final assessment
// ---------------------------------------------------------------------------

export const WAIYAKI_ASSESSMENT_MODULE_SLUG = 'final-assessment';

export const WAIYAKI_ASSESSMENT_PASS_REQUIRED = 4;

export const WAIYAKI_ASSESSMENT = {
  heading: 'Check your understanding',
  intro:
    'Five questions covering the whole course. Answer at least four correctly to pass. The questions follow the guide\u2019s course review; your answers are graded on the server, and you will see which parts you got right only after submitting.',
  questions: [
    {
      id: 'q1',
      prompt: 'What was a m\u0169thamaki, and why is \u201cparamount chief\u201d a misleading description?',
      options: [
        'A colonial-appointed chief who could command labour and punish wrongdoers on behalf of the company.',
        'A respected spokesman-leader whose influence came from wealth, wisdom, generosity and skill in speech, in a society with no kings or paramount chiefs.',
        'An inherited king who personally owned all the land held by his lineage.',
        'The council of elders that judged disputes and ratified decisions.',
      ],
      correctIndex: 1,
      explanation:
        'Pre-colonial Kikuyu society had no kings or paramount chiefs. A m\u0169thamaki was a spokesman whose influence came from wealth, wisdom, generosity and skill in speech. The company treated Waiyaki as a ruler who could command everyone and guarantee food supplies \u2014 which he had no power to do \u2014 so calls to account for the actions of independent young men and lineages fell on him.',
    },
    {
      id: 'q2',
      prompt: 'Name two causes of the breakdown between the Kikuyu and the IBEAC in 1891.',
      options: [
        'A dispute over the price of ivory, and the closing of the caravan route to Uganda.',
        'Company caravans and garrisons seizing crops, livestock and women, and the withdrawal from the first fort, which the Kikuyu then looted and burned.',
        'The refusal of the Kikuyu to pay hut tax, and the company\u2019s decision to move its fort to Kabete.',
        'The arrival of the railway survey, and the killing of Maktubu at Githunguri.',
      ],
      correctIndex: 1,
      explanation:
        'Company porters and garrison soldiers took crops, livestock and women \u2014 Lugard himself later blamed undisciplined caravans robbing crops. Wilson then ran short of ammunition, received no reinforcements, withdrew at night, and the Kikuyu looted and burned the fort in early 1891. The Githunguri killings and the railway survey belong to 1892.',
    },
    {
      id: 'q3',
      prompt: 'Summarise the colonial and the oral accounts of Waiyaki\u2019s death.',
      options: [
        'Both accounts agree that he was executed by firing squad at Kibwezi.',
        'The colonial record says he escaped toward the coast; oral tradition says he died at Fort Smith.',
        'The colonial record says he died of his head wound at the Kibwezi mission and was buried in its cemetery; oral tradition holds that he was buried alive, head down, and that a banana tree was planted over the spot.',
        'The colonial record says he was released and returned to Kabete; oral tradition says he was hanged at Dagoretti.',
      ],
      correctIndex: 2,
      explanation:
        'Ainsworth wrote that the prisoner could go no further because of his head wound, was left at the Scottish mission hospital at Kibwezi, died some days later and was buried in the mission cemetery; Macdonald attributed death to a skull fracture. The oral tradition holds that he was buried alive, head down, facing the centre of the earth \u2014 an image carried in G\u0129k\u0169y\u0169 song and echoed by Ng\u0169g\u0129 wa Thiong\u2019o.',
    },
    {
      id: 'q4',
      prompt: 'Why is the 2020 presidential speech an important case study in historical memory?',
      options: [
        'It was the first official document to prove how Waiyaki died.',
        'It presented one account \u2014 the oral tradition \u2014 as settled fact, and placed it at the wrong location, showing how official words can shape what millions of people believe about the past.',
        'It corrected the colonial record by giving the exact coordinates of the grave.',
        'It announced the exhumation of the remains and the results of DNA testing.',
      ],
      correctIndex: 1,
      explanation:
        'President Uhuru Kenyatta told the nation on 20 October 2020 that Waiyaki was buried alive at Manyani Maximum Prison in Taita Taveta. The speech turned the oral tradition into fact and put it at the wrong place: Waiyaki died at Kibwezi, and Manyani Prison did not exist in 1892.',
    },
    {
      id: 'q5',
      prompt: 'What happened in 1998, 2014 and 2023 in the story of Waiyaki\u2019s remembrance?',
      options: [
        '1998: a journalist reported finding the grave and remains were sent for DNA tests that were never published. 2014: the family appealed for the grave to be located and held its first commemoration of his death. 2023: Kenya listed him among the Mashujaa Day national heroes.',
        '1998: the fort was gazetted a national monument. 2014: a Nairobi governor promised a monument on Waiyaki Way. 2023: a stage play about him opened in Nairobi.',
        '1998: a Kenyan newspaper published the first oral-history interview with his descendants. 2014: remains were exhumed and reburied at Kihumo. 2023: Waiyaki Way was renamed.',
        '1998: the family published its genealogy. 2014: the British Government apologised. 2023: his grave was confirmed by survey and excavation.',
      ],
      correctIndex: 0,
      explanation:
        'In 1998 the Sunday Times reported that a journalist had found the grave at Kibwezi, guided by local elder Mzee Athumani; Wambui Otieno was photographed there and remains were sent for DNA tests whose results were never published. In 2014 the family appealed publicly for the grave to be located and exhumed, and held the first commemoration of his death, 122 years after it. In 2023 the National Heroes Council listed him among the Mashujaa Day heroes, honoured on 20 October 2023. The fort was gazetted in 2005, the monument was promised in 2017, and no grave has been confirmed.',
    },
  ],
};

// ---------------------------------------------------------------------------
// Final project
// ---------------------------------------------------------------------------

/**
 * The guide's four project choices. `minWords` is enforced server-side, so a
 * submission is genuine written work: the comparative essay carries the
 * guide's stated 800\u20131,200 word range as its minimum.
 */
export const WAIYAKI_PROJECT_OPTIONS = [
  {
    id: 'memory_map',
    title: 'Memory map',
    guidance:
      'Map the places in Waiyaki\u2019s story \u2014 Dagoretti, Kabete, Fort Smith, Githunguri, Kibwezi, Waiyaki Way \u2014 and write a short note on how each is remembered today.',
    minWords: 120,
    wordRange: 'At least 120 words, plus your map',
  },
  {
    id: 'oral_history_interview',
    title: 'Oral history interview',
    guidance:
      'Interview an elder in your community about a historical figure. Compare what they say with written sources, using this course\u2019s evidence labels.',
    minWords: 120,
    wordRange: 'At least 120 words',
  },
  {
    id: 'monument_proposal',
    title: 'Monument proposal',
    guidance:
      'Design a memorial for Waiyaki wa Hinga. Explain its location, form and inscription, and how it handles contested evidence.',
    minWords: 120,
    wordRange: 'At least 120 words',
  },
  {
    id: 'comparative_essay',
    title: 'Comparative essay (800\u20131,200 words)',
    guidance:
      'Compare Waiyaki with another early resister to colonial rule in Africa \u2014 for example Koitalel arap Samoei (Kenya), Mekatilili wa Menza (Kenya), Kinjikitile Ngwale (Tanzania) or Yaa Asantewaa (Ghana).',
    minWords: 800,
    wordRange: '800\u20131,200 words',
  },
];

// ---------------------------------------------------------------------------
// Sources
// ---------------------------------------------------------------------------

export const WAIYAKI_FURTHER_READING = {
  primarySources: [
    'Lugard, F.D. The Rise of Our East African Empire. Edinburgh: Blackwood, 1893.',
    'Perham, M. (ed.). The Diaries of Lord Lugard. London: Faber, 1959.',
    'Macdonald, J.R.L. Soldiering and Surveying in British East Africa, 1891\u20131894. London: Arnold, 1897.',
    'Austin, H.H. \u201cThe Passing of Waiyaki.\u201d The Times, November 1922.',
    'Kenyatta, J. Facing Mount Kenya. London: Secker & Warburg, 1938.',
  ],
  scholarship: [
    'Berman, B., and J. Lonsdale. Unhappy Valley: Conflict in Kenya and Africa. London: James Currey, 1992.',
    'Muriuki, G. A History of the Kikuyu, 1500\u20131900. Nairobi: Oxford University Press, 1974.',
    'Food and Agriculture Organization. \u201cThe Evolution of Kikuyu Land Tenure.\u201d In Land Tenure in Kenya (FAO study), chapter 3.',
    'Leakey, L.S.B. The Southern Kikuyu before 1903. London: Academic Press, 1977.',
    'Rogers, P. \u201cThe British and the Kikuyu 1890\u20131905: A Reassessment.\u201d Journal of African History 20, no. 2 (1979): 255\u201369.',
    'Lonsdale, J. \u201cThe Prayers of Waiyaki: Political Uses of the Kikuyu Past.\u201d In Revealing Prophets, 1995.',
    'Oxford Reference, \u201cWaiyaki wa Hinga,\u201d Dictionary of African Biography.',
  ],
  familyAndCommunity: [
    'Otieno, W.W. Mau Mau\u2019s Daughter: A Life History. Boulder: Lynne Rienner, 1998.',
    'Regeru, N. Muthamaki Waiyaki wa Hinga: The Untold Story. Nairobi: Regsco Holdings, 2016.',
    'Mituka, B. \u201cScribe discovers Waiyaki\u2019s grave.\u201d Sunday Times (Kenya), 2 August 1998.',
  ],
  officialRecords: [
    'National Heroes Council. 2023 Mashujaa Day Heroes and Heroines Citations. heroes.go.ke.',
    'Republic of Kenya. Speech by President Uhuru Kenyatta, 11th Mashujaa Day, 20 October 2020. president.go.ke.',
    'Daily Nation, \u201c122 years later, family seeks hero\u2019s burial for Waiyaki wa Hinga,\u201d 4 September 2014.',
    'Business Daily, \u201cOldest edifice of colonial era left to rot in Kikuyu.\u201d',
    'The Standard, \u201cMashujaa: Five heroes whose resting places might never be known.\u201d',
    'Ng\u0169g\u0129 wa Thiong\u2019o. The River Between (1965); A Grain of Wheat (1967).',
  ],
  note:
    'This collection reflects research current to October 2026. It includes only claims that can be verified; where oral tradition is cited, it is identified as tradition. Precise coordinates for burial sites circulate in research notes but have not been confirmed by survey or excavation \u2014 treat any coordinates as orientation only. Family testimony and new evidence are welcomed for future revisions.',
};