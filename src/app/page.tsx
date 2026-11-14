import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import AchievementsSection from "@/components/AchievementsSection";
import CertificatesSection from "@/components/CertificatesSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ShowreelButton from "@/components/animations/ShowreelButton";
import {
  initialAboutData,
  initialSkillCategories,
  initialAchievements,
  initialCertificates,
  initialProjects,
} from "@/data/placeholderData";

export default function Home() {
  return (
    <main className="min-h-screen bg-graphite text-cloud">
      {/* Sticky Navigation Bar */}
      <Navbar />

      {/* Cinematic Hero Section */}
      <Hero />

      {/* Section 1: About Me */}
      <AboutSection data={initialAboutData} />

      {/* Section 2: Technical Skills */}
      <SkillsSection categories={initialSkillCategories} />

      {/* Section 3: Achievements */}
      <AchievementsSection achievements={initialAchievements} />

      {/* Section 4: Certificates */}
      <CertificatesSection certificates={initialCertificates} />

      {/* Section 5: Projects */}
      <ProjectsSection projects={initialProjects} />

      {/* Section 6: Contact */}
      <ContactSection
        email={initialAboutData.email}
        phone={initialAboutData.phone}
        linkedinUrl={initialAboutData.linkedinUrl}
        githubUrl={initialAboutData.githubUrl}
      />

      {/* Footer */}
      <Footer />

      {/* Floating Cinematic Tour Controller (from Showreel source) */}
      <ShowreelButton />
    </main>
  );
}
