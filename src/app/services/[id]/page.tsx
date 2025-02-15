"use client"
import FAQ from "@/components/Faq";
import { fetchServiceById, fetchServicesByCategory } from "@/redux/actions/serviceAction";
import { RootState, useAppDispatch } from "@/redux/store";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import DefaultLayout from "@/components/DefaultLayout";
import Loader from "@/components/Loader";

const ServiceDetailsPage = () => {
  const { id } = useParams() as { id: string }; // ID du service actuel
  const dispatch = useAppDispatch();
  const { service, services } = useSelector((state: RootState) => state.service);
  const { categories } = useSelector((state: RootState) => state.category);
  const { servicesByCategory } = useSelector((state: RootState) => state.service);
  const hasFetchedService = useRef(false); // Gérer le fetch initial du service
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);


  // Charger les détails du service une seule fois
  useEffect(() => {
    if (id && !hasFetchedService.current) {
      dispatch(fetchServiceById(id)); // Récupérer le service via l'ID
      hasFetchedService.current = true;
    }
  }, [dispatch, id]);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
  };

  // Filtrage des services côté front avec Redux
  const filteredServices = selectedCategory
    ? services.filter((s) => s.categories.some(category => category.id === selectedCategory))
    : [];

  if (!service) {
    return <div><Loader/></div>; 
  }

 return (
  <DefaultLayout>
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
            <h1 className="lg:text-5xl text-4xl font-bold text-white">{service?.name}</h1>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 px-4 lg:px-20 py-24">
        <div className="lg:w-2/3">
            <Image
              src={service.images[0]}
              alt={service.name}
              width={800}
              height={500}
              className="w-full h-[300px] object-cover rounded-md mb-6"
            />
            <h2 className="text-3xl text-secondary font-bold mb-4">{service?.name}</h2>
            <p className="text-gray-700 leading-relaxed">{service?.description}</p>
            <FAQ/>
          </div>
          
          <div className="lg:w-1/3 h-full sticky px-4 lg:px-0 top-24">
            <div className="mb-8 border rounded-md">
              <div className="bg-primary rounded-t-md">
                <h3 className="text-2xl text-white font-bold p-3 ">All Services</h3>
              </div>
              <div className="p-4">
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category.id}>
                      {/* Bouton pour la catégorie */}
                      <button
                        onClick={() => handleCategoryClick(category.id)}
                        className="text-secondary hover:text-primary flex items-center gap-2"
                      >
                        <span className="text-primary font-bold">›</span> {category.name}
                      </button>

                      {/* Affichage des services si cette catégorie est sélectionnée */}
                      {selectedCategory === category.id && (
                        <ul className="mt-2 ml-4 border-l-2 border-tertiary pl-4">
                          {filteredServices.length > 0 ? (
                            filteredServices.map((service) => (
                              <li key={service.id}>
                                <a
                                  href={`/services/${service.id}`}
                                  className={`block ${service.id === id ? "text-primary" : "text-secondary hover:text-primary"
                                    }`}
                                >
                                  {service.name}
                                </a>
                              </li>
                            ))
                          ) : (
                            <li className="text-gray-500 italic">No services found</li>
                          )}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
           <div className="rounded-lg shadow-md relative">
             <Image
               src="/images/bg-01.jpg"
               width={500}
                height={500}
               alt="Cleaning Service"
               className="absolute inset-0 w-full h-full object-cover rounded-lg"
             />
             <div className="relative absolute rounded-lg inset-0 bg-blue-950/50 z-10 p-7 text-center">
               <h2 className="text-xl font-bold text-white mb-4">Buchen Sie eine Reinigungskraft</h2>
               <p className="text-sm text-white mb-6">
               Holen Sie sich einen kostenlosen Kostenvoranschlag und sparen Sie Geld!               </p>
               <button className="bg-primary text-white text-sm font-medium py-3 px-4 rounded rounded-2xl button-hover-effect">
          <span>KOSTENLOSES ANGEBOT</span>
        </button>
             </div>
           </div>
         </div>
       </div>
     </section>
   </div>
   </DefaultLayout>
 );


};
export default ServiceDetailsPage;