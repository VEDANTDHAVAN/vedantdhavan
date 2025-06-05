import NavBar from "./components/NavBar"
import Contact from "./sections/Contact"
import EducationSection from "./sections/EducationSection"
import ExperienceSection from "./sections/ExperienceSection"
import FeatureCards from "./sections/FeatureCards"
import Hero from "./sections/Hero"
import ShowcaseSection from "./sections/ShowcaseSection"
import TechStack from "./sections/TechStack"

const App = () => {
  return (
    <>
     <NavBar />
     <Hero />
     <ShowcaseSection />
     <FeatureCards />
     <EducationSection />
     <TechStack />
     <ExperienceSection />
     <Contact />
    </>
  )
}

export default App