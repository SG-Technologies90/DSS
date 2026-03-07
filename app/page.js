import Image from "next/image";
import Hero from "./components/Hero";
import About from "./components/About";
import Product from "./components/Product";
import StatsSection from "./components/StatsSection";
import StrengthSection from "./components/StrengthSection";
import TestimonialSection from "./components/TestimonialSection";
import ImageCards from "./components/ImageCards";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Product />
      <StatsSection />
      <StrengthSection />
      <TestimonialSection />
      <ImageCards />
    </>
  );
}
