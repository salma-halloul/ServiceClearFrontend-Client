"use client";

import { ArrowRight} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/redux/store";
import { fetchServices, fetchServicesByCategory } from "@/redux/actions/serviceAction";
import { useRouter } from "next/navigation";
import { IoGridOutline } from "react-icons/io5";

const Services = ({ selectedCategory }: { selectedCategory: string | undefined }) => {
  const { categories } = useSelector((state: RootState) => state.category);
  const {services} = useSelector((state: RootState) => state.service);
  const [localSelectedCategory, setLocalSelectedCategory] = useState<string | null>(
    selectedCategory || 'all' 
  );
  const dispatch = useAppDispatch();
  const hasFetched = useRef(false);
  

  // Fetch services when category changes (or on initial load)
  useEffect(() => {
    if (!hasFetched.current) {
    if (localSelectedCategory === 'all' || !localSelectedCategory) {
      dispatch(fetchServices());  // Fetch all services if "All" is selected or no category is selected
      hasFetched.current = true;
    } else {
      // Fetch services for the selected category
      dispatch(fetchServicesByCategory([localSelectedCategory]));
    }
  }
  }, [localSelectedCategory, dispatch]);


  const filteredServices = localSelectedCategory === 'all' || !localSelectedCategory
    ? services // If "All" or no category is selected, show all services
    : services.filter(service => service.categories.some(category => category.id === localSelectedCategory));


  const router = useRouter();

  const handleServiceClick = (serviceId: string) => {
      router.push(`/services/${serviceId}`);
  };


  return (
    <div>
      <section className="py-20">
        <div className="lg:px-20 px-10 mx-auto">
          <h3 className="text-primary font-semibold text-center text-lg mb-2">Our Services</h3>
          <h2 className="text-4xl font-bold text-secondary text-center mb-4 leading-tight">
            We offer many types of services
          </h2>
          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div
              key="all"
              className="flex flex-col items-center bg-tertiary justify-center w-32 lg:p-4 p-2 transition-transform hover:scale-105 hover:cursor-pointer"
              onClick={() => setLocalSelectedCategory('all')}
            >
              <IoGridOutline
                size={20}
                className={`lg:w-8 lg:h-8 w-4 h-4 mb-2 ${localSelectedCategory === 'all' ? 'text-primary' : 'text-secondary'}`}
               />
              <h4 className={`lg:text-sm text-xs font-semibold ${localSelectedCategory === 'all' ? 'text-primary' : 'text-secondary'}`}>All</h4>
            </div>
            {categories.map((category, index) => (
              <div
                key={index}
                className="flex flex-col items-center bg-tertiary justify-center w-32 lg:p-4 p-2  transition-transform hover:scale-105 hover:cursor-pointer"
                onClick={() => setLocalSelectedCategory(category.id)}
              >
                <Image
                  src={category.icon}
                  width={20}
                  height={20}
                  alt="Category Icon"
                  className={`lg:w-8 lg:h-8 w-4 h-4 mb-2 ${localSelectedCategory === category.id ? 'svg-color' : ''}`}
                />
                <h4 className={`lg:text-sm text-xs font-semibold ${localSelectedCategory === category.id ? 'text-primary' : 'text-secondary'}`}>{category.name}</h4>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 mt-6 gap-8">
            {filteredServices?.map((service, index) => (
              <div
                key={index}
                onClick={() => handleServiceClick(service.id)}
                className="bg-white rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-105"
              >
                <Image
                  src={service.images[0]}
                  alt={service.name}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-secondary mb-2">{service.name}</h3>
                  <p className="text-gray-600">{service.shortDescription}</p>
                  <button className="mt-4 text-secondary hover:text-primary font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                    Learn More <ArrowRight size={20} className="text-primary" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>

  );
}
export default Services;