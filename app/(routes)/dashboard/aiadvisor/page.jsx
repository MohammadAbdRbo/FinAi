
// pages/dashboard/aiadvisor.jsx
import React from "react";
import AiAdvisor from "./_components/AdvisorPage"; // Importing from the Ai_Advisor folder

const AiAdvisorPage = () => {
  return (
    <div className="p-10">
      <h2 className="font-bold text-3xl">AI Advisor Chat</h2>
      <AiAdvisor />
    </div>
  );
};

export default AiAdvisorPage;
