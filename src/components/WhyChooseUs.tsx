"use client"
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function WhyChooseUs() {

  return (
    <motion.section
      className="py-20"
      style={{ backgroundImage: "url('/images/bg-pattern.png')" }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <div className="lg:flex gap-14 mx-auto lg:px-20 px-10">
        <div className="lg:w-1/2 w-full">
          <h3 className="text-primary font-semibold text-lg mb-2">Why Choose Us</h3>
          <h2 className="text-4xl font-bold text-secondary mb-2 leading-tight">
            We will make any place neat & clean.
          </h2>
          <p className="text-lg text-gray-600 mb-12">
            Removing the pressure from any part of cleaning is the thing that we master in.
          </p>
          <div className="flex flex-col gap-8">
            <div className="flex items-start space-x-4">
              <div className="bg-primary text-white p-4 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.276 3.914a1 1 0 00.95.69h4.112c.969 0 1.371 1.24.588 1.81l-3.327 2.417a1 1 0 00-.364 1.118l1.276 3.914c.3.921-.755 1.688-1.54 1.118l-3.327-2.417a1 1 0 00-1.176 0l-3.327 2.417c-.784.57-1.838-.197-1.54-1.118l1.276-3.914a1 1 0 00-.364-1.118L2.025 9.341c-.783-.57-.38-1.81.588-1.81h4.112a1 1 0 00.95-.69l1.276-3.914z" />
                </svg>
              </div>
              <div>
                <h4 className="text-xl font-bold text-secondary">We are experts</h4>
                <p className="text-gray-600">
                  Versatile, broad system that reliably conveys outstanding outcomes.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-primary text-white p-4 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3-9a1 1 0 01-1 1H8a1 1 0 010-2h4a1 1 0 011 1zm-1 4a1 1 0 100-2H8a1 1 0 100 2h4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="text-xl font-bold text-secondary">We are committed</h4>
                <p className="text-gray-600">
                  To our clients and are guided in everything we do by their requirements.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-primary text-white p-4 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <g>
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M22 17.002a6.002 6.002 0 0 1-4.713 5.86l-.638-1.914A4.003 4.003 0 0 0 19.465 19H17a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h2.938a8.001 8.001 0 0 0-15.876 0H7a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-5C2 6.477 6.477 2 12 2s10 4.477 10 10V17.002zM20 17v-4h-3v4h3zM4 13v4h3v-4H4z" />
                  </g>
                </svg>
              </div>
              <div>
                <h4 className="text-xl font-bold text-secondary">24/7 Services</h4>
                <p className="text-gray-600">
                  Get happy with our best administrations we give whenever at any place.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 mt-10 lg:mt-0 gap-4">
          <Image src="/images/about-02.jpg" alt="Cleaning Image 1" className="rounded-lg shadow-lg" width={300} height={300} />
          <Image src="/images/about-03.jpg" alt="Cleaning Image 2" className="rounded-lg shadow-lg" width={300} height={300} />
          <Image src="/images/about-04.jpg" alt="Cleaning Image 3" className="rounded-lg shadow-lg" width={300} height={300} />
          <Image src="/images/about-05.jpg" alt="Cleaning Image 4" className="rounded-lg shadow-lg" width={300} height={300} />
        </div>
      </div>
    </motion.section>)
}