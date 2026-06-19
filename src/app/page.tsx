import HeroSlider from '@/components/home/HeroSlider'
import ProjectsSection from '@/components/home/ProjectsSection'
import LaunchSection from '@/components/home/LaunchSection'
import AboutSection from '@/components/home/AboutSection'
import StatsSection from '@/components/home/StatsSection'
import CTASection from '@/components/home/CTASection'

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <ProjectsSection />
      <LaunchSection />
      <AboutSection />
      <StatsSection />
      <CTASection />
    </>
  )
}
