import Image from "next/image";
import Hero from "./components/Hero";
import About from "./components/About";
import Product from "./components/Product";
import StatsSection from "./components/StatsSection";
import StrengthSection from "./components/StrengthSection";
import TestimonialSection from "./components/TestimonialSection";
import ImageCards from "./components/ImageCards";
import GalleryCarousel from "./components/GalleryCarousel";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <GalleryCarousel />
      <Product />
      <StatsSection />
      <StrengthSection />
      <TestimonialSection />
      <ImageCards />
    </>
  );
}
