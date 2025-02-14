import QuoteProcess from "@/components/QuoteProcess";
import Testimonials from "@/components/Testimonials";
import WhyChooseUs from "@/components/WhyChooseUs";

const AboutPage = () => {
  return (
    <div>
      <section>
        <div
          className="relative h-[25rem]"
          style={{
            backgroundImage: "url('/images/bnr3.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-blue-950/50 flex items-center justify-center">
            <h1 className="text-6xl font-bold text-white">About Us</h1>
          </div>
        </div>

        {/* Texte */}
        <div className="w-full px-20 py-20 ">
          <h3 className="text-primary font-semibold text-lg mb-2">About us</h3>
            <h2 className="text-4xl font-bold text-secondary mb-4 leading-tight">
              Who We Are ?
            </h2>
            <p className="text-gray-600 mb-6">
              At Service Clear, we are committed to providing quality cleaning services
              superior tailored to your specific needs, whether small offices,
              large industrial installations or commercial premises. Our mission is to
              guarantee a clean and healthy environment for our customers.
            </p>

            <div className="space-y-4">
              <p className="text-gray-600">
                <strong>Experienced Team:</strong> Our staff is highly trained and experienced, ensuring consistent
                and excellent service delivery every time. We take pride in their professionalism and attention to detail.
              </p>
              <p className="text-gray-600">
                <strong>Latest Equipment:</strong> We utilize state-of-the-art equipment and eco-friendly products to achieve
                outstanding results, while prioritizing safety and sustainability.
              </p>
              <p className="text-gray-600">
                <strong>Online Booking:</strong> Book your cleaning services effortlessly through our user-friendly online
                platform, available at your convenience.
              </p>
              <p className="text-gray-600">
                <strong>Certified Company:</strong> Service Clear is a fully certified company, adhering to the highest industry
                standards to ensure top-notch cleaning services.
              </p>
              <p className="text-gray-600">
                <strong>Free Estimate:</strong> We offer free on-site visits to assess your cleaning needs and provide you with
                a personalized quote, ensuring complete transparency and accuracy.
              </p>
              <p className="text-gray-600">
                <strong>24/7 Online Support:</strong> Our support team is available around the clock to assist you with any
                inquiries or urgent requests, providing unmatched convenience and peace of mind.
              </p>
            </div>
        </div>
      </section>
      <WhyChooseUs/>

      <QuoteProcess />
      <div style={{ backgroundImage: "url('/images/bg-pattern.png')" }}>
        <Testimonials />
      </div>

    </div>

  );
}
export default AboutPage;