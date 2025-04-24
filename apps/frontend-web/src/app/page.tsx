"use client";
import { useState } from "react";
import Navbar from "@/src/app/components/layout/Navbar";
import ConnectionStatus from "@/src/app/components/layout/ConnectionStatus";
import HomeSection from "@/src/app/sections/HomeSection";
import AddRecipeSection from "@/src/app/sections/AddRecipeSection";
import AboutSection from "@/src/app/sections/AboutSection";
import ContactSection from "@/src/app/sections/ContactSection";

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");

  return (
    <>
      <Navbar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      <div className="main-content">
        {activeSection === "home" && <HomeSection />}
        {activeSection === "add" && <AddRecipeSection />}
        {activeSection === "about" && <AboutSection />}
        {activeSection === "contact" && <ContactSection />}
      </div>

      <ConnectionStatus />
    </>
  );
}
