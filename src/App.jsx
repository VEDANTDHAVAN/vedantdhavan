import NavBar from "./components/NavBar"
import EducationSection from "./sections/EducationSection"
import FeatureCards from "./sections/FeatureCards"
import Hero from "./sections/Hero"
import ShowcaseSection from "./sections/ShowcaseSection"

const App = () => {
  return (
    <>
     <NavBar />
     <Hero />
     <ShowcaseSection />
     <FeatureCards />
     <EducationSection />
    </>
  )
}

export default App