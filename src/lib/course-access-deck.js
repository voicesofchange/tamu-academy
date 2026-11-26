/**
 * course-access-deck — the presenter's script for the "How learners access a
 * course" deck.
 *
 * The deck is a walkthrough, not a screenshot reel: each slide carries the
 * on-screen copy a presenter can read or project, the visual to show beside it,
 * speaker notes, and anything that must be checked against the live platform
 * before presenting. Interface labels quoted here come from the app's own
 * components ("Start Course", "Sign In to Start", "Create Account",
 * "Explore the Course", "Resume at…", "View Certificate"); anything that could
 * change is flagged rather than assumed.
 */

export const COURSE_ACCESS_DECK = {
  title: 'How Learners Access a Tamu Academy Course',
  subtitle:
    'A presenter’s walkthrough of the learner journey: finding a course, starting it, studying, saving progress, and finishing.',
  audience: 'For facilitators, educators and partner organisations introducing the platform to new learners.',
  slides: [
    {
      number: '01',
      eyebrow: 'Starting point',
      title: 'Where learners begin',
      points: [
        'Tamu Academy is open to read at tamuacademy.org — no account needed to browse.',
        'The Courses page is reached from the main navigation.',
        'Courses are grouped into learning areas, so a learner can start from the subject that matters to them.',
        'Each course card shows its learning area, module count, and whether it is available now or still in development.',
      ],
      visual:
        'Full-screen capture of the Courses page: the opening statement, then one learning area with its course cards. Hold on a single card so the status label is readable.',
      notes: [
        'Open with the public page, not the dashboard. The point of this slide is that a learner can look before committing anything.',
        'Name one learning area aloud and read one course description — a short one, so the room hears how plainly the courses are written.',
        'If someone asks about languages: the platform supports English, French, Swahili and Spanish through its translation system, and coverage varies by course and screen. Say that plainly rather than promising a fully translated catalogue.',
      ],
      verify: 'Confirm the current navigation label and the learning areas shown on the day of presenting.',
    },
    {
      number: '02',
      eyebrow: 'Choosing',
      title: 'Reading the course overview',
      points: [
        'Every course card opens a course overview.',
        'The overview explains what the course covers, how many modules it has, and how it is studied.',
        'Open courses are labelled available now; courses in development are labelled as such and cannot be started.',
        'From the overview, the learner takes the course’s start action — or is offered sign-in first.',
      ],
      visual:
        'The overview page of the course you will demonstrate: the title, the short description, the module list, and the start action visible in the same frame.',
      notes: [
        'Choose one course and stay with it for the rest of the deck. The journey is the same across courses; switching mid-presentation loses the room.',
        'Point out that the module list is visible before enrolling — a learner can see the whole shape of the course first.',
        'Say that study is self-paced: there is no fixed class time and no deadline to miss.',
      ],
      verify: 'Confirm the exact wording of the start action on the course you demonstrate, and that no in-development course is presented as open.',
    },
    {
      number: '03',
      eyebrow: 'Account',
      title: 'Creating an account or signing in',
      points: [
        'Browsing and reading are open. Starting a course asks the learner to identify themselves.',
        'A learner can sign in with an email address and password, or continue with Google.',
        'New learners choose “Create Account”; returning learners sign in.',
        'After signing in, the learner is taken back to the course they chose, and the course is opened for them.',
      ],
      visual:
        'Split frame: the sign-in panel in front, the course overview behind it. The second beat is the same learner landing on module one.',
      notes: [
        'Explain why an account is needed: it is how progress, saved work and certificates stay attached to the right person.',
        'Reassure the room that this is one short step, and that the platform returns the learner to the course rather than dropping them on a generic dashboard.',
        'Keep the screen free of anyone’s real account details when demonstrating.',
      ],
      verify: 'Confirm which sign-in options are enabled for learners, and that the return-to-course behaviour still works as described.',
    },
    {
      number: '04',
      eyebrow: 'Studying',
      title: 'Working through a lesson',
      points: [
        'A lesson combines a recorded lesson with captions, a written companion, and reflection.',
        'Where a course includes activities and knowledge checks, they appear inside the lesson.',
        'Recordings load only when the learner presses play, and Data-Saver keeps pages light on a slow connection.',
        'Language support is available through the platform, with coverage varying by course and screen.',
      ],
      visual:
        'A module page with the video at the top and the written companion below it. Second beat: a knowledge check, answered once, so the room sees the feedback.',
      notes: [
        'This is the slide that answers “what is it actually like to study here?” Give it the most time.',
        'Show the caption control on the video, and say that captions are part of how lessons are built, not an afterthought.',
        'Mention the written companion: a learner on a slow or shared connection can read the lesson instead of streaming it.',
        'If the room is mostly francophone, note that French is one of the supported languages and offer to confirm coverage for the specific course before they present it.',
      ],
      verify: 'Confirm caption availability on the video you demonstrate, and the translation coverage of the specific course shown.',
    },
    {
      number: '05',
      eyebrow: 'Returning',
      title: 'Progress is saved, and picking it back up',
      points: [
        'Progress is recorded as the learner completes each module.',
        '“My Courses” lists enrolled courses with their progress and the next module to study.',
        'The resume action returns the learner to where they stopped.',
        '“My Progress” gathers progress across every course in one place.',
      ],
      visual:
        'The My Courses page: the resume card first, then one enrolled course tile with its progress bar and actions.',
      notes: [
        'The message here is continuity. A learner who studies for twenty minutes between shifts can come back and carry on.',
        'Point at the progress bar and say what it counts — completed modules out of the course’s total.',
        'Note that the dashboard shown should be a demonstration account, never a real learner’s page.',
      ],
      verify: 'Confirm whether progress on the demonstrated course is recorded at module completion, and check the current dashboard wording.',
    },
    {
      number: '06',
      eyebrow: 'Finishing',
      title: 'Completing a course and certificates',
      points: [
        'Each course ends with a completion step that lists what remains before it is finished.',
        'Where a course offers a certificate, it becomes available once the course requirements are met.',
        'A certificate carries a certificate identifier and a verification code.',
        'Not every course offers a certificate — this is confirmed per course.',
      ],
      visual:
        'The completion page for the demonstrated course, then the certificate itself. If that course has no certificate, show the completion page only and say so.',
      notes: [
        'Be precise here: a certificate marks completion of a course on this platform. It is not an accredited qualification, and it is not a claim about employment or further study.',
        'If the room asks what a certificate is worth, answer with what it actually records — the course, the learner’s name, the completion date, and a verification code.',
        'Close by returning to the invitation: this is a journey a partner’s learners could take, and the next conversation is about what they would want to study.',
      ],
      verify: 'Confirm which of the current courses issue certificates, and the completion requirements for the course you demonstrate.',
    },
  ],
  checklist: {
    heading: 'Before you present',
    intro:
      'Walk the whole journey once on the live site shortly before presenting. Interface labels and course statuses can change between now and then.',
    items: [
      'Walk the exact route in this deck on the live platform, end to end, signed in as a demonstration learner.',
      'Confirm the navigation label and the learning areas shown on the Courses page.',
      'Confirm which courses are marked available now, and that no in-development course is shown as open.',
      'Confirm the start action’s wording on the course you will demonstrate.',
      'Confirm which sign-in options are enabled — email and password, and Google.',
      'Confirm the demonstrated course’s module count and translation coverage, especially French.',
      'Confirm caption availability on the video you plan to show.',
      'Confirm which courses currently issue certificates.',
      'Clear the demonstration account of any personal details before sharing the screen.',
    ],
  },
};