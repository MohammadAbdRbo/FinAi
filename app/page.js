import { Button } from "@/components/ui/button";
import Image from "next/image";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import ProjectDescription from "./_components/ProjectDescription";
import Features from "./_components/Features";
import Footer from "./_components/Footer";

export default function Home() {
  return (
   <div>
      {/* <Header/> */}
      {/* <Hero/> */}
      <ProjectDescription/>
      <Features/>
      <Footer/>
   </div>
  );
}
