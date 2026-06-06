import { Navigation } from '@/components/nav/Navigation';
import { Hero } from '@/components/hero/Hero';
import { ProjectsSection } from '@/components/projects/ProjectsSection';
import { About } from '@/components/about/About';
import { SkillsSection } from '@/components/skills/SkillsSection';
import { ExperienceSection } from '@/components/experience/ExperienceSection';
import { AchievementsSection } from '@/components/achievements/AchievementsSection';
import { EducationSection } from '@/components/education/EducationSection';
import { WritingSection } from '@/components/contact/WritingSection';
import { ContactForm } from '@/components/contact/ContactForm';
import { Footer } from '@/components/footer/Footer';

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        {/* 01 Hero */}
        <Hero />
        {/* 02 Projects (Featured + All) */}
        <ProjectsSection />
        {/* 03 About */}
        <About />
        {/* 04 Skills */}
        <SkillsSection />
        {/* 05 Experience */}
        <ExperienceSection />
        {/* 06 Achievements */}
        <AchievementsSection />
        {/* 07 Education */}
        <EducationSection />
        {/* 08 Writing */}
        <WritingSection />
        {/* 09 Contact */}
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
