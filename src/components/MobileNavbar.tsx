import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/redux/store";
import { useRouter } from "next/navigation";
import { fetchAllCategories } from "@/redux/actions/categoryAction";

type LinkKeys = 'HOME' | 'SERVICES' | 'ABOUT US' | 'CONTACT';

const links: Record<LinkKeys, string> = {
  HOME: '/',
  SERVICES: '/services',
  'ABOUT US': '/about',
  CONTACT: '/contact',
};

const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false); // État pour les catégories
  const { categories } = useSelector((state: RootState) => state.category);
  const dispatch = useAppDispatch();
  const router = useRouter();
  
    const hasFetched = useRef(false); 
  
    useEffect(() => {
      if (!hasFetched.current) {
        dispatch(fetchAllCategories());
        hasFetched.current = true;
      }
    }, [dispatch]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleServices = () => {
    setIsServicesOpen(!isServicesOpen); // Basculer l'état des catégories
  };

  const handleCategoryClick = (categoryId: string) => {
    router.push(`/services?categoryId=${categoryId}`);
    setIsOpen(false); // Fermer le menu après un clic
  };

  return (
    <div className="flex lg:hidden z-50">
      <div className="flex justify-between items-center p-5 w-full">
        {/* Logo */}
        <Link href="/">
          <Image
            width={200}
            height={32}
            src="/images/logo.png"
            alt="Logo"
          />
        </Link>
        {/* Menu Button */}
        <button
          onClick={toggleSidebar}
          aria-label="Toggle menu"
          className="text-primary border border-primary rounded p-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <Link href="/">
            <Image
              width={200}
              height={32}
              src="/images/logo.png"
              alt="Logo"
            />
          </Link>
          <button
            onClick={toggleSidebar}
            aria-label="Close menu"
            className="text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <ul className="flex flex-col p-4">
        {["HOME", "SERVICES", "ABOUT US", "CONTACT"].map((item, index) => (
            <li key={index} className="py-4 mt-0 border-b border-gray-300">
              {item === "SERVICES" ? (
                <div>
                  <button
                    onClick={toggleServices}
                    className="font-bold text-secondary hover:text-primary flex items-center justify-between w-full"
                  >
                    <span>{item}</span>
                    <span>{isServicesOpen ? "-" : "+"}</span> {/* Symbole + ou - */}
                  </button>
                  {isServicesOpen && (
                    <ul className="pl-4 mt-2">
                      {categories.map((category, index) => (
                        <li key={index} className="py-2">
                          <button
                            onClick={() => handleCategoryClick(category.id)}
                            className="text-gray-700 hover:text-primary"
                          >
                            {category.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <Link
                  href={links[item.toUpperCase() as LinkKeys]}
                  className="font-bold text-secondary hover:text-primary"
                  onClick={toggleSidebar}
                >
                  {item}
                </Link>
              )}
            </li>
          ))}
          <li className="py-4 mt-0 border-b border-gray-300">
            <Link
              href="/quote"
              className="font-bold text-primary"
              onClick={toggleSidebar}
            >
              Get A Quote
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MobileNavbar;