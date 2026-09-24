import React from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import AnimatedTechHero from './views/AnimatedTechHero'
import ProjectSection from './views/ProjectSection'

const App = () => {
  return (
    <HashRouter>
      <div>
        <Routes>
          <Route path="/" element={<AnimatedTechHero />} />
          <Route path="/projects" element={<ProjectSection />} />
        </Routes>
      </div>
    </HashRouter>
  )
}

export default App