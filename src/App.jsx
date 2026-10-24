import NavBar from "./components/NavBar"
import Hero from "./sections/Hero"
import SystemsSection from "./sections/SystemsSection"
import ProjectIndex from "./components/ProjectIndex"
import EngineeringNotes from "./sections/EngineeringNotes"
import AboutSection from "./sections/AboutSection"
import Contact from "./sections/Contact"
import Footer from "./sections/Footer"

const App = () => {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <NavBar />
      <main id="main">
        <Hero />
        <SystemsSection />
        <ProjectIndex />
        <EngineeringNotes />
        <AboutSection />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App