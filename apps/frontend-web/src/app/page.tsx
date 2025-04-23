"use client";
import { useState } from "react";
import Navbar from "@/app/components/layout/Navbar";
import ConnectionStatus from "@/app/components/layout/ConnectionStatus";
import HomeSection from "@/app/sections/HomeSection";
import AddRecipeSection from "@/app/sections/AddRecipeSection";
import AboutSection from "@/app/sections/AboutSection";
import ContactSection from "@/app/sections/ContactSection";

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
