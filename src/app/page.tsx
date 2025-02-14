"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import QuoteProcess from "@/components/QuoteProcess";
import Testimonials from "@/components/Testimonials";
import {  useAppDispatch } from "@/redux/store";
import { fetchServices } from "@/redux/actions/serviceAction";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";
import { motion } from "framer-motion";

const slides = [
  {
    title: "Best quality solution in cleaning industry",
    subtitle: "The best cleaning service ever!",
    image: "/images/banner-02.jpg"

  },
  {
    title: "Professional cleaning services for your home",
    subtitle: "Expert cleaners at your service",
    image: "/images/banner-04.jpeg"
  },
  {
    title: "Making your space spotless and fresh",
    subtitle: "Trusted by thousands of customers",
    image: "/images/banner-01.webp"
  },
];

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  useEffect(() => {
    setMounted(true);
    let autoScrollInterval = null;

    if (emblaApi) {
      emblaApi.on("select", () => {
        setCurrentSlide(emblaApi.selectedScrollSnap());
      });

      // Auto-scroll every 3 seconds
      autoScrollInterval = setInterval(() => {
        emblaApi.scrollNext();
      }, 6000);
    }

    return () => {
      // Cleanup interval on unmount
      if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
      }
    };
  }, [emblaApi]);

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  if (!mounted) return null;

  return (
    <main>
      {/* Hero Slider */}
      <div className="embla relative z-0" ref={emblaRef}>
        <div className="embla__container flex">
          {slides.map((slide, index) => (
            <motion.div
              key={index}
              className="embla__slide relative flex-[0_0_100%] min-w-0"
              initial={{ opacity: 0, x: 50 }} // Départ à droite et transparent
              animate={{ opacity: 1, x: 0 }} // Apparition normale
              exit={{ opacity: 0, x: -50 }} // Disparition à gauche
              transition={{ duration: 0.8, ease: "easeOut" }} // Durée et effet de transition
            >
              <div className="relative h-[500px] lg:h-[600px]">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  layout="fill"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 lg:px-20 px-10 bg-blue-950/50">
                  <div className="container mx-auto h-full flex items-center">
                    <motion.div
                      className="max-w-3xl text-white"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    >
                      <h2 className="text-primary text-xl mb-4 text-shadow">{slide.subtitle}</h2>
                      <h1 className="lg:text-6xl text-4xl font-bold mb-8 leading-tight">
                        {slide.title}
                      </h1>
                      <motion.button
                        className="bg-primary button-hover-effect text-white px-8 py-3 rounded text-lg font-semibold transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span>GET A QUOTE</span>
                      </motion.button>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={scrollPrev}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={scrollNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className={`w-3 h-3 rounded-full transition-colors ${currentSlide === index ? 'bg-primary' : 'bg-white/50 hover:bg-white/75'
                }`}
            />
          ))}
        </div>
      </div>
      {/* Services Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        viewport={{ once: true }}
      >
        <Services selectedCategory={undefined} />
      </motion.div>

      {/* About Us */}
      <motion.section
        className="py-20 lg:px-20 px-10"
        style={{ backgroundImage: "url('/images/bg-pattern.png')" }}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-8">
          {/* Image */}
          <div className="w-full">
            <motion.div
              className="w-full"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <Image
                width={500}
                height={500}
                src="/images/about-01.jpg"
                alt="Logo"
                className="rounded-md"
              />
            </motion.div>

          </div>

          {/* Texte */}
          <motion.div
            className="w-full"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
          >            <h3 className="text-primary font-semibold text-lg mb-2">About Us</h3>
            <h2 className="text-4xl font-bold text-secondary mb-4 leading-tight">
              We have long stretches of encounters on cleaning
            </h2>
            <p className="text-gray-600 mb-6">
              We offer services for all sorts and sizes of complexes, from small to
              big places of work and industrial facilities to warehouses and retail
              locations.
            </p>
            {/* Points en colonnes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <p>Experienced Team</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <p>Latest Equipment</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <p>Online Booking</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <p>Certified Company</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <p>Free Estimate</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <p>24/7 Online Support
                </p>
              </div>
            </div>

            {/* Bouton */}
            <button className="px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow-md button-hover-effect">
              <span>Discover More</span>
            </button>
          </motion.div>
        </div>
      </motion.section>

      {/* Quote Process */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <QuoteProcess />
      </motion.div>

      {/* Why Choose Us */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: true }}
      >
        <WhyChooseUs />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        viewport={{ once: true }}
      >
        <Testimonials />
      </motion.div>
    </main>
  );
}