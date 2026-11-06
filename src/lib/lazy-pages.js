import { lazyPage } from '@/lib/lazy-page';

/**
 * Route components loaded on demand.
 *
 * The homepage (Landing) and the sign-in / sign-up screens stay in the main
 * bundle, since they are the first thing a visitor opens. Everything else is
 * fetched only when its route is visited, which keeps the initial download
 * small without changing any page's markup or behaviour.
 */

export const About = lazyPage(() => import('@/pages/About'));

export const LearnersGuide = lazyPage(() => import('@/pages/LearnersGuide'));
export const RemotePathway = lazyPage(() => import('@/pages/RemotePathway'));
export const GuideSection = lazyPage(() => import('@/pages/GuideSection'));
export const GuideInsights = lazyPage(() => import('@/pages/GuideInsights'));
export const GuideCredits = lazyPage(() => import('@/pages/GuideCredits'));
export const GuidePrint = lazyPage(() => import('@/pages/GuidePrint'));

export const Courses = lazyPage(() => import('@/pages/Courses'));
export const UnderstandingAfricanEconomies = lazyPage(() => import('@/pages/UnderstandingAfricanEconomies'));
export const BuildingWealthTogether = lazyPage(() => import('@/pages/BuildingWealthTogether'));
export const BuildingWealthModule = lazyPage(() => import('@/pages/BuildingWealthModule'));
// One module page serves every course built with the course template.
export const TemplateCourseModule = lazyPage(() => import('@/pages/TemplateCourseModule'));
export const DiasporaRemittanceEconomy = lazyPage(() => import('@/pages/DiasporaRemittanceEconomy'));
export const WealthCourseCompletion = lazyPage(() => import('@/pages/WealthCourseCompletion'));
export const WealthCertificate = lazyPage(() => import('@/pages/WealthCertificate'));
export const WealthCapstone = lazyPage(() => import('@/pages/WealthCapstone'));
export const SautiZaSoko = lazyPage(() => import('@/pages/SautiZaSoko'));
export const SokoModule = lazyPage(() => import('@/pages/SokoModule'));
export const SokoCourseCompletion = lazyPage(() => import('@/pages/SokoCourseCompletion'));
export const SokoCertificate = lazyPage(() => import('@/pages/SokoCertificate'));
export const SokoPeerFacilitator = lazyPage(() => import('@/pages/SokoPeerFacilitator'));
export const Module1Economics = lazyPage(() => import('@/pages/Module1Economics'));
export const Module2Economics = lazyPage(() => import('@/pages/Module2Economics'));
export const Module3Economics = lazyPage(() => import('@/pages/Module3Economics'));
export const Module4Economics = lazyPage(() => import('@/pages/Module4Economics'));
export const Module5Economics = lazyPage(() => import('@/pages/Module5Economics'));
export const Module6Economics = lazyPage(() => import('@/pages/Module6Economics'));
export const InterculturalAILeadershipLab = lazyPage(() => import('@/pages/InterculturalAILeadershipLab'));
export const UbuntuMentalHealth = lazyPage(() => import('@/pages/UbuntuMentalHealth'));
export const MhModule1 = lazyPage(() => import('@/pages/MhModule1'));
export const MhModule2 = lazyPage(() => import('@/pages/MhModule2'));
export const MhModule3 = lazyPage(() => import('@/pages/MhModule3'));
export const MhModule4 = lazyPage(() => import('@/pages/MhModule4'));
export const MhModule5 = lazyPage(() => import('@/pages/MhModule5'));
export const MhModule6 = lazyPage(() => import('@/pages/MhModule6'));
export const MhModule7 = lazyPage(() => import('@/pages/MhModule7'));
export const MhCourseCompletion = lazyPage(() => import('@/pages/MhCourseCompletion'));
export const MhCertificate = lazyPage(() => import('@/pages/MhCertificate'));
export const MhInsights = lazyPage(() => import('@/pages/MhInsights'));
export const EconomicsCourseCompletion = lazyPage(() => import('@/pages/EconomicsCourseCompletion'));
export const EconomicsCertificate = lazyPage(() => import('@/pages/EconomicsCertificate'));
export const WaiyakiWaHinga = lazyPage(() => import('@/pages/WaiyakiWaHinga'));
export const WaiyakiModule = lazyPage(() => import('@/pages/WaiyakiModule'));
export const WaiyakiCourseCompletion = lazyPage(() => import('@/pages/WaiyakiCourseCompletion'));
export const WaiyakiCertificate = lazyPage(() => import('@/pages/WaiyakiCertificate'));
export const CertificateDesignSample = lazyPage(() => import('@/pages/CertificateDesignSample'));

export const Resources = lazyPage(() => import('@/pages/Resources'));
export const LearnerStories = lazyPage(() => import('@/pages/LearnerStories'));
export const CommunityInsights = lazyPage(() => import('@/pages/CommunityInsights'));
export const Videos = lazyPage(() => import('@/pages/Videos'));
export const TranslationReview = lazyPage(() => import('@/pages/TranslationReview'));
export const Contact = lazyPage(() => import('@/pages/Contact'));
export const Articles = lazyPage(() => import('@/pages/Articles'));
export const TheRealCostOfAlwaysAchieving = lazyPage(() => import('@/pages/articles/TheRealCostOfAlwaysAchieving'));
export const WhyTherapyIsntEnough = lazyPage(() => import('@/pages/articles/WhyTherapyIsntEnough'));
export const CanPolicyMakeUsHappier = lazyPage(() => import('@/pages/articles/CanPolicyMakeUsHappier'));
export const WhoControlsTheGlobalEconomy = lazyPage(() => import('@/pages/articles/WhoControlsTheGlobalEconomy'));
export const IsTheICCBiasedAgainstAfricaArticle = lazyPage(() => import('@/pages/articles/IsTheICCBiasedAgainstAfrica'));
export const AfterTheGunsGoSilentArticle = lazyPage(() => import('@/pages/articles/AfterTheGunsGoSilent'));
export const ClimateIsAMentalHealthCrisisArticle = lazyPage(() => import('@/pages/articles/ClimateIsAMentalHealthCrisis'));
export const Privacy = lazyPage(() => import('@/pages/Privacy'));
export const Academy = lazyPage(() => import('@/pages/Academy'));
export const PartnershipInquiry = lazyPage(() => import('@/pages/PartnershipInquiry'));

export const MyCourses = lazyPage(() => import('@/pages/MyCourses'));
export const MotivationCoach = lazyPage(() => import('@/pages/MotivationCoach'));
export const Welcome = lazyPage(() => import('@/pages/Welcome'));
export const Profile = lazyPage(() => import('@/pages/Profile'));
export const ProgressDashboard = lazyPage(() => import('@/pages/ProgressDashboard'));
export const LearningHub = lazyPage(() => import('@/pages/LearningHub'));