import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import SkillList from "./features/skills/SkillList";
import ProjectList from "./features/skills/projects/ProjectList";
import CertificationList from "./features/skills/certification/CertificationList";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Code2 } from "lucide-react";

function App() {
  return (
    <BrowserRouter>
      {/* Main container with minimum full viewport height */}
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Header at the top */}
        <Header />
        
        {/* Main content area that grows to fill space */}
        <main className="flex-grow container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/skills" element={<SkillList />} />
            <Route path="/projects" element={<ProjectList />} />
            <Route path="/certifications" element={<CertificationList />} />
          </Routes>
        </main>
        
        {/* Footer at the bottom */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;