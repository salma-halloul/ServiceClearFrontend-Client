"use client"
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import MobileNavbar from "./MobileNavbar";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/redux/store";
import { fetchAllCategories } from "@/redux/actions/categoryAction";
import { useRouter, usePathname } from 'next/navigation';



type LinkKeys = 'HOME' | 'SERVICES' | 'ABOUT US' | 'CONTACT';

const links: Record<LinkKeys, string> = {
  HOME: '/',
  SERVICES: '/services',
  'ABOUT US': '/about',
  CONTACT: '/contact',
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { categories } = useSelector((state: RootState) => state.category);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname()
  const hasFetched = useRef(false); 

  useEffect(() => {
    if (!hasFetched.current) {
      dispatch(fetchAllCategories());
      hasFetched.current = true;
    }
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCategoryClick = (categoryId: string) => {
    router.push(`/services?categoryId=${categoryId}`);
  };


  return (
    <><div
      className={`fixed top-0 w-full z-50 transition-all duration-300 hidden lg:flex
        ${isScrolled ? "bg-white shadow-sm translate-y-0" : "-translate-y-1 bg-transparent"}`}
    >
      <div className="container mx-auto px-10 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <Image
            width={200}
            height={32}
            src={isScrolled ? "/images/logo-scrolled.png" : "/images/logo.png"}
            alt="Logo" 
          />
        </Link>

        <ul className="flex gap-10">
          {["HOME", "SERVICES", "ABOUT US", "CONTACT"].map((item, index) => (
            <li key={index} className="relative group">
              <a
          href={links[item as LinkKeys]}
          className={`font-bold duration-300 ${pathname === links[item as LinkKeys] ? 'text-primary' : isScrolled ? 'text-secondary hover:text-primary' : 'text-white hover:text-primary'}`}

              >
                {item}
                {item === "SERVICES" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-4 h-4 inline-block ml-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                )}
              </a>
              {item === "SERVICES" && (
                <ul className="absolute left-0 mt-2 w-48 bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {categories.map((category, index) => (
                    <li key={index} className="border-b last:border-0">
                      <a
                        onClick={() => handleCategoryClick(category.id)} 
                        className="block px-4 py-2 text-gray-700 hover:text-primary hover:cursor-pointer"
                      >
                        {category.name}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        <a href="/quote" className="bg-primary text-white text-sm font-medium py-3 px-4 rounded rounded-2xl button-hover-effect">
  <span>GET A QUOTE</span>
</a>
      </div>
    </div>
    <MobileNavbar />
    </>

  );
};

export default Navbar;