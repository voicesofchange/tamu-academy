import { lazy } from 'react';

/**
 * Route components loaded on demand.
 *
 * The homepage (Landing) and the sign-in / sign-up screens stay in the main
 * bundle, since they are the first thing a visitor opens. Everything else is
 * fetched only when its route is visited, which keeps the initial download
 * small without changing any page's markup or behaviour.
 */

export const About = lazy(() => import('@/pages/About'));

export const LearnersGuide = lazy(() => import('@/pages/LearnersGuide'));
export const RemotePathway = lazy(() => import('@/pages/RemotePathway'));
export const GuideSection = lazy(() => import('@/pages/GuideSection'));
export const GuideInsights = lazy(() => import('@/pages/GuideInsights'));
export const GuideCredits = lazy(() => import('@/pages/GuideCredits'));
export const GuidePrint = lazy(() => import('@/pages/GuidePrint'));

export const Courses = lazy(() => import('@/pages/Courses'));
export const UnderstandingAfricanEconomies = lazy(() => import('@/pages/UnderstandingAfricanEconomies'));
export const BuildingWealthTogether = lazy(() => import('@/pages/BuildingWealthTogether'));
export const BuildingWealthModule = lazy(() => import('@/pages/BuildingWealthModule'));
// One module page serves every course built with the course template.
export const TemplateCourseModule = lazy(() => import('@/pages/TemplateCourseModule'));
export const WealthCourseCompletion = lazy(() => import('@/pages/WealthCourseCompletion'));
export const WealthCertificate = lazy(() => import('@/pages/WealthCertificate'));
export const WealthCapstone = lazy(() => import('@/pages/WealthCapstone'));
export const SautiZaSoko = lazy(() => import('@/pages/SautiZaSoko'));
export const SokoModule = lazy(() => import('@/pages/SokoModule'));
export const SokoCourseCompletion = lazy(() => import('@/pages/SokoCourseCompletion'));
export const SokoCertificate = lazy(() => import('@/pages/SokoCertificate'));
export const SokoPeerFacilitator = lazy(() => import('@/pages/SokoPeerFacilitator'));
export const Module1Economics = lazy(() => import('@/pages/Module1Economics'));
export const Module2Economics = lazy(() => import('@/pages/Module2Economics'));
export const Module3Economics = lazy(() => import('@/pages/Module3Economics'));
export const Module4Economics = lazy(() => import('@/pages/Module4Economics'));
export const Module5Economics = lazy(() => import('@/pages/Module5Economics'));
export const Module6Economics = lazy(() => import('@/pages/Module6Economics'));
export const InterculturalAILeadershipLab = lazy(() => import('@/pages/InterculturalAILeadershipLab'));
export const UbuntuMentalHealth = lazy(() => import('@/pages/UbuntuMentalHealth'));
export const MhModule1 = lazy(() => import('@/pages/MhModule1'));
export const MhModule2 = lazy(() => import('@/pages/MhModule2'));
export const MhModule3 = lazy(() => import('@/pages/MhModule3'));
export const MhModule4 = lazy(() => import('@/pages/MhModule4'));
export const MhModule5 = lazy(() => import('@/pages/MhModule5'));
export const MhModule6 = lazy(() => import('@/pages/MhModule6'));
export const MhModule7 = lazy(() => import('@/pages/MhModule7'));
export const MhCourseCompletion = lazy(() => import('@/pages/MhCourseCompletion'));
export const MhCertificate = lazy(() => import('@/pages/MhCertificate'));
export const MhInsights = lazy(() => import('@/pages/MhInsights'));
export const EconomicsCourseCompletion = lazy(() => import('@/pages/EconomicsCourseCompletion'));
export const EconomicsCertificate = lazy(() => import('@/pages/EconomicsCertificate'));
export const WaiyakiWaHinga = lazy(() => import('@/pages/WaiyakiWaHinga'));
export const WaiyakiModule = lazy(() => import('@/pages/WaiyakiModule'));
export const WaiyakiCourseCompletion = lazy(() => import('@/pages/WaiyakiCourseCompletion'));
export const WaiyakiCertificate = lazy(() => import('@/pages/WaiyakiCertificate'));
export const CertificateDesignSample = lazy(() => import('@/pages/CertificateDesignSample'));

export const Resources = lazy(() => import('@/pages/Resources'));
export const LearnerStories = lazy(() => import('@/pages/LearnerStories'));
export const CommunityInsights = lazy(() => import('@/pages/CommunityInsights'));
export const Videos = lazy(() => import('@/pages/Videos'));
export const TranslationReview = lazy(() => import('@/pages/TranslationReview'));
export const Contact = lazy(() => import('@/pages/Contact'));
export const Articles = lazy(() => import('@/pages/Articles'));
export const TheRealCostOfAlwaysAchieving = lazy(() => import('@/pages/articles/TheRealCostOfAlwaysAchieving'));
export const WhyTherapyIsntEnough = lazy(() => import('@/pages/articles/WhyTherapyIsntEnough'));
export const CanPolicyMakeUsHappier = lazy(() => import('@/pages/articles/CanPolicyMakeUsHappier'));
export const WhoControlsTheGlobalEconomy = lazy(() => import('@/pages/articles/WhoControlsTheGlobalEconomy'));
export const IsTheICCBiasedAgainstAfricaArticle = lazy(() => import('@/pages/articles/IsTheICCBiasedAgainstAfrica'));
export const AfterTheGunsGoSilentArticle = lazy(() => import('@/pages/articles/AfterTheGunsGoSilent'));
export const ClimateIsAMentalHealthCrisisArticle = lazy(() => import('@/pages/articles/ClimateIsAMentalHealthCrisis'));
export const Privacy = lazy(() => import('@/pages/Privacy'));
export const Academy = lazy(() => import('@/pages/Academy'));
export const PartnershipInquiry = lazy(() => import('@/pages/PartnershipInquiry'));

export const MyCourses = lazy(() => import('@/pages/MyCourses'));
export const MotivationCoach = lazy(() => import('@/pages/MotivationCoach'));
export const Welcome = lazy(() => import('@/pages/Welcome'));
export const Profile = lazy(() => import('@/pages/Profile'));
export const ProgressDashboard = lazy(() => import('@/pages/ProgressDashboard'));
export const LearningHub = lazy(() => import('@/pages/LearningHub'));