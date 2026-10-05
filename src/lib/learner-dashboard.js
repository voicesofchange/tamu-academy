/**
 * Dashboard tailoring for the three learner groups.
 *
 * The learner's saved `learner_category` profile value decides which view the
 * dashboard opens with. Everything here is presentation only: course access,
 * permissions and saved progress are identical for every group, and the
 * optional view filter on the dashboard changes emphasis without ever
 * rewriting the learner's saved category.
 *
 * Each group carries three emphasis areas, in the order the site presents
 * them: learning next steps, community pathways, and career and impact.
 * Items are plain links ({ title, body, to, cta }) so a single section
 * component can render any of them.
 */

export const DASHBOARD_GROUPS = [
  {
    id: 'diaspora',
    profileValue: 'Diaspora Learner',
    label: 'Diaspora Learner',
    shortLabel: 'Diaspora',
    headline: 'Learning that travels with you',
    summary:
      'Your dashboard leads with the courses that connect African systems thinking to the work, study and community you are part of abroad.',
    learning: [
      {
        title: 'Understanding African Economies and the Global System',
        body: 'Six modules on who shapes the global economy, and where African agency sits inside it.',
        to: '/courses/understanding-african-economies-and-the-global-system',
        cta: 'Open course',
      },
      {
        title: 'Mental Health, Community and Culture',
        body: 'Seven modules on care, culture and community wellbeing, framed from African experience.',
        to: '/courses/mental-health-community-and-culture',
        cta: 'Open course',
      },
      {
        title: 'Sauti za Soko: Markets, Climate and Community Power',
        body: 'A seven-module pathway that begins in a Kenyan market and is written for learners anywhere.',
        to: '/courses/sauti-za-soko',
        cta: 'Open course',
      },
    ],
    community: [
      {
        title: 'Learner stories',
        body: 'How learners in the network put these courses to use in their own work and communities.',
        to: '/stories',
        cta: 'Read stories',
      },
      {
        title: 'Community insights',
        body: 'Aggregated, anonymous numbers from learners across the network. No individual answers are shown.',
        to: '/insights',
        cta: 'View insights',
      },
    ],
    impact: [
      {
        title: 'Bring Tamu to your organisation',
        body: 'Universities, diaspora associations and community groups can run a Tamu pathway with us.',
        to: '/partnership-inquiry',
        cta: 'Start an inquiry',
      },
      {
        title: 'Certificates that carry your name',
        body: 'Set the name you want printed now, and collect your certificate as you finish each course.',
        to: '/profile',
        cta: 'Check your profile',
      },
    ],
  },
  {
    id: 'remote',
    profileValue: 'Remote Learner',
    label: 'Remote Learner',
    shortLabel: 'Remote',
    headline: 'Built for a slow connection',
    summary:
      'Your dashboard leads with text-first pathways, printable material and the settings that keep every page light.',
    learning: [
      {
        title: 'Sauti za Soko: Markets, Climate and Community Power',
        body: 'Seven modules, each opening with a short lesson and a saved action plan rather than video.',
        to: '/courses/sauti-za-soko',
        cta: 'Open course',
      },
      {
        title: "Safari ya Utu: A Learner's Guide",
        body: 'A self-paced guide you can work through section by section, saving privately as you go.',
        to: '/learners-guide',
        cta: 'Open the guide',
      },
      {
        title: 'Printable workbook',
        body: 'Print the whole guide and work offline. Nothing is sent anywhere until you choose to save.',
        to: '/learners-guide/print',
        cta: 'Open the workbook',
      },
    ],
    community: [
      {
        title: 'Peer vendor circle',
        body: 'An optional track that prepares you to convene and facilitate a circle of local traders.',
        to: '/courses/sauti-za-soko/peer-facilitator',
        cta: 'See the track',
      },
      {
        title: 'Learner stories',
        body: 'Short, text-first accounts from learners studying in low-bandwidth settings.',
        to: '/stories',
        cta: 'Read stories',
      },
    ],
    impact: [
      {
        title: 'Prove what you finished',
        body: 'Certificates are issued per course and can be printed or kept on your device.',
        to: '/my-courses',
        cta: 'View certificates',
      },
      {
        title: 'Bring Tamu to your community',
        body: 'Community organisations and youth groups can run a Tamu pathway with us.',
        to: '/partnership-inquiry',
        cta: 'Start an inquiry',
      },
    ],
  },
  {
    id: 'soko-peer',
    profileValue: 'Soko Peer Facilitator',
    label: 'Soko Peer Facilitator',
    shortLabel: 'Soko Peer',
    headline: 'Ready to convene a circle',
    summary:
      'Your dashboard leads with facilitation practice: the vendor circle track, the market pathway behind it, and the tools to run a session locally.',
    learning: [
      {
        title: 'Sauti za Soko: Markets, Climate and Community Power',
        body: 'The seven market modules you facilitate, including the market cases and action plans.',
        to: '/courses/sauti-za-soko',
        cta: 'Open pathway',
      },
      {
        title: 'Peer Facilitator track',
        body: 'Facilitation practice, session planning and the privacy rules that protect your circle.',
        to: '/courses/sauti-za-soko/peer-facilitator',
        cta: 'Open track',
      },
    ],
    community: [
      {
        title: 'Kiswahili discussion prompts',
        body: 'Every module carries a discussion prompt written in Kiswahili, ready to open a circle with.',
        to: '/courses/sauti-za-soko',
        cta: 'Open pathway',
      },
      {
        title: 'Learner stories',
        body: 'How the pathway has been used by learners and organisers in the network.',
        to: '/stories',
        cta: 'Read stories',
      },
    ],
    impact: [
      {
        title: 'Facilitator certificate',
        body: 'Complete the track and your facilitation certificate is issued alongside your course certificate.',
        to: '/courses/sauti-za-soko/peer-facilitator/certificate',
        cta: 'View certificate',
      },
      {
        title: 'Partner with Tamu',
        body: 'Run a vendor circle with your association, youth group or county programme.',
        to: '/partnership-inquiry',
        cta: 'Start an inquiry',
      },
    ],
  },
];

/**
 * Shown when no learner group is saved yet. The dashboard still tailors
 * nothing away: it offers the pathways across all three emphases and points
 * at the profile field that turns tailoring on.
 */
export const DASHBOARD_FALLBACK = {
  id: 'unset',
  profileValue: '',
  label: 'Your learning path',
  shortLabel: 'Not set',
  headline: 'Choose your learner group',
  summary:
    'Your dashboard tailors itself once you choose the learner group that describes you. Until then, here is everything the network offers.',
  learning: [
    {
      title: 'Browse the courses',
      body: 'Three pathways: African economies and the global system, mental health and community, and markets and climate.',
      to: '/courses',
      cta: 'Browse courses',
    },
    {
      title: "Safari ya Utu: A Learner's Guide",
      body: 'A self-paced guide you can work through section by section, saving privately as you go.',
      to: '/learners-guide',
      cta: 'Open the guide',
    },
  ],
  community: [
    {
      title: 'Learner stories',
      body: 'How learners in the network put these courses to use in their own work and communities.',
      to: '/stories',
      cta: 'Read stories',
    },
    {
      title: 'Community insights',
      body: 'Aggregated, anonymous numbers from learners across the network.',
      to: '/insights',
      cta: 'View insights',
    },
  ],
  impact: [
    {
      title: 'Set your learner group',
      body: 'One field on your profile decides which dashboard view opens for you. You can change it any time.',
      to: '/profile',
      cta: 'Open profile',
    },
    {
      title: 'Bring Tamu to your organisation',
      body: 'Universities, diaspora associations and community groups can run a Tamu pathway with us.',
      to: '/partnership-inquiry',
      cta: 'Start an inquiry',
    },
  ],
};

/** The saved group's dashboard view, or null when no group is saved yet. */
export function getDashboardGroup(learnerCategory) {
  if (!learnerCategory) return null;
  const value = String(learnerCategory).trim();
  if (!value) return null;
  return DASHBOARD_GROUPS.find((group) => group.profileValue === value) || null;
}