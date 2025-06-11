import React from "react";
import SkillList from "./features/skills/SkillList";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">SkillTracker</h1>
      <SkillList />
    </div>
  );
};

export default App;
