import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import SkillList from "./features/skills/SkillList";
import SkillGrid from "./features/skills/SkillGrid";
import SkillForm from "./features/skills/SkillForm";
import SkillDetails from "./features/skills/SkillDetails";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-6">
          <Routes>
            {/* Home and Dashboard */}
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Skill Pages */}
            <Route path="/skills" element={<SkillGrid />} />      {/* Default skills view */}
            <Route path="/skills/list" element={<SkillList />} /> {/* Optional alternative view */}
            <Route path="/skills/new" element={<SkillForm />} />
            <Route path="/skills/edit/:id" element={<SkillForm />} />
            <Route path="/skills/:id" element={<SkillDetails />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
