"use client"
import Services from "@/components/Services";
import { useSearchParams } from "next/navigation";

const ServicesPage = () => {
    const searchParams = useSearchParams()
    const categoryId = searchParams.get('categoryId')
    console.log(categoryId);

 return (
    <div>
      <section>
        <div
          className="relative lg:h-[25rem] h-[15rem]"
          style={{
            backgroundImage: "url('/images/banner-06.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-blue-950/50 flex items-center justify-center">
            <h1 className="lg:text-6xl text-4xl font-bold text-white">Services</h1>
          </div>
        </div>
        </section>
        <Services selectedCategory={categoryId as string} />
        </div>
  );


};
export default ServicesPage;