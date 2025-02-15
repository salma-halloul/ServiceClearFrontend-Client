"use client"
import { fetchServicesByCategory } from "@/redux/actions/serviceAction";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';
import Image from 'next/image';
import { createQuote } from "@/redux/actions/quoteAction";
import useRecaptcha from "@/hooks/useRecaptcha ";
import ReCAPTCHA from "react-google-recaptcha";
import DefaultLayout from "@/components/DefaultLayout";
import { clearServices } from "@/redux/slices/serviceSlice";

const QuotePage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const categories = useSelector((state: RootState) => state.category.categories);
    const services = useSelector((state: RootState) => state.service.servicesByCategorySelected || []);
    const [name, setName] = useState('');
    const [phonenumber, setPhoneNumber] = useState(12345678);
    const [email, setEmail] = useState('');
    const [zip, setZip] = useState(0);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const [message, setMessage] = useState('');
    const { capchaToken, recaptchaRef, handleRecaptcha } = useRecaptcha()
    

    useEffect(() => {
        if (selectedCategories.length > 0) {
            dispatch(fetchServicesByCategory(selectedCategories));
        } else {
            dispatch(clearServices()); // Réinitialiser les services si aucune catégorie n'est sélectionnée
            setSelectedServices([]); // Réinitialiser les services sélectionnés
        }
    }, [selectedCategories, dispatch]);
   


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!name){
            toast.error('Please fill the name field');
            return
        }
        if(!phonenumber){
            toast.error('Please fill the phonenumber field');
            return
        }
        if(!email){
            toast.error('Please fill the email field');
            return
        }
        if(!zip){
            toast.error('Please fill the zip field');
            return
        }
        if(selectedCategories.length === 0){
            toast.error('Please choose at leat one category');
            return
        }
        if( selectedServices.length === 0){
            toast.error('Please choose at leat one service');
            return
        }
        if (!capchaToken) {
            toast.error("Please complete the reCAPTCHA.");
            return;
        }



        const messageData = {
            name,
            phonenumber,
            email,
            zip,
            servicesIds: selectedServices,
            message,
            recaptchaToken: capchaToken,
        };

        try {
            const result = await dispatch(createQuote(messageData)).unwrap();

            // Check if the reCAPTCHA validation failed on the server-side
            if (result.recaptchaValid === false) {
                alert('ReCAPTCHA validation failed. Please try again.');
                handleRecaptcha('');
                if (recaptchaRef.current) {
                    recaptchaRef.current.reset();
                }
                return;
            }

            toast.success('Message submitted successfully !');
            setName('');
            setPhoneNumber(0);
            setEmail('');
            setZip(0);
            setSelectedServices([]);
            setSelectedCategories([]);
            setMessage('');
        } catch (error : any) {
            toast.error('Error while creating the quote :', error);
        }
    };


    return (
        <DefaultLayout>
        <div>
            <section>
                <div
                    className="relative lg:h-[25rem] h-[15rem]"
                    style={{
                        backgroundImage: "url('/images/banner-08.jpg')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <div className="absolute inset-0 bg-blue-950/50 flex items-center justify-center">
                        <h1 className="lg:text-6xl text-4xl font-bold text-white">Get A Quote</h1>
                    </div>
                </div>
                <div className="w-full px-4 lg:px-20 py-20">
                    <h3 className="text-primary font-semibold text-lg mb-2">Get A Quote</h3>
                    <h2 className="text-4xl font-bold text-secondary mb-4 leading-tight">
                        Get A Free Estimate
                    </h2>

                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="rounded-md p-8 border lg:w-2/3">
                            <h2 className="text-2xl font-bold text-secondary mb-6">Fill the form</h2>

                            <form className="space-y-4" onSubmit={handleSubmit}>
                                <div className="flex flex-col md:flex-row gap-4">
                                    <div className="flex-1">
                                        <label className="text-gray-700 font-medium isRequired">Your Name <span className="text-red-500">*</span></label>
                                        <input
                                            type="text"
                                            placeholder="Your name here"
                                            required
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="mt-1 p-3 border focus:outline-none focus:ring-1 focus:ring-primary rounded-md w-full text-gray-600"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label className="text-gray-700 font-medium">Contact Number <span className="text-red-500">*</span></label>
                                        <input
                                            type="tel"
                                            required
                                            value={phonenumber}
                                            onChange={(e) => setPhoneNumber(Number(e.target.value))}
                                            placeholder="Your phone here"
                                            className="mt-1 p-3 border focus:outline-none focus:ring-1 focus:ring-primary rounded-md w-full text-gray-600"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col md:flex-row gap-4">
                                    <div className="flex-1">
                                        <label className="text-gray-700 font-medium">Your Email <span className="text-red-500">*</span></label>
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Your email here"
                                            className="mt-1 p-3 border focus:outline-none focus:ring-1 focus:ring-primary rounded-md w-full text-gray-600"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label className="text-gray-700 font-medium">ZIP Code <span className="text-red-500">*</span></label>
                                        <input
                                            type="number"
                                            required
                                            value={zip}
                                            onChange={(e) => setZip(Number(e.target.value))}
                                            placeholder="Your phone here"
                                            className="mt-1 p-3 border focus:outline-none focus:ring-1 focus:ring-primary rounded-md w-full text-gray-600"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col">
                                    <label className="text-gray-700 font-medium">Categories <span className="text-red-500">*</span></label>
                                    <Select
                                        isMulti
                                          instanceId="categories-select"
                                        options={categories.map((cat) => ({
                                            value: cat.id,
                                            label: cat.name
                                        })) as { value: string; label: string }[]}
                                        value={categories
                                            .filter((cat) => selectedCategories.includes(cat.id))
                                            .map((cat) => ({ value: cat.id, label: cat.name }))}
                                        onChange={(selectedOptions) =>
                                            setSelectedCategories(selectedOptions.map((option) => option.value))
                                        }
                                        className="mt-1"
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label className="text-gray-700 font-medium">Services <span className="text-red-500">*</span></label>
                                    <Select
                                        isMulti
                                          instanceId="services-select"
                                        options={services.map((service) => ({
                                            value: service.id,
                                            label: service.name
                                        })) as { value: string; label: string }[]}
                                        value={services
                                            .filter((service) => selectedServices.includes(service.id))
                                            .map((service) => ({ value: service.id, label: service.name }))}
                                        onChange={(selectedOptions) =>
                                            setSelectedServices(selectedOptions.map((option) => option.value))
                                        }
                                        className="mt-1"
                                    />
                                </div>


                                <div className="flex flex-col">
                                    <label className="text-gray-700 font-medium">Message</label>
                                    <textarea
                                        placeholder="Tell us a few words"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        className="mt-1 p-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary w-full text-gray-600 h-28"
                                    ></textarea>
                                </div>

                                <div className="my-4">
                                    <ReCAPTCHA
                                        ref={recaptchaRef}
                                        sitekey="6LfNVcMqAAAAAKKguxyyvB5BHWPxJ5lOJVdr7s8o"
                                        onChange={handleRecaptcha}
                                    />

                                </div>

                                <button type="submit" className="bg-primary text-white p-3 w-48 text-sm font-medium rounded-md button-hover-effect">
                                    <span>SEND MESSAGE </span>
                                </button>
                            </form>
                        </div>
                        <div className="lg:w-2/5 h-full sticky px-4 lg:px-0 top-24">
                            <div className="rounded-lg shadow-md relative">
                                <Image
                                    src="/images/bg-02.jpg"
                                    alt="Cleaning Service"
                                    width={500}
                                    height={500}
                                    className="absolute inset-0 w-full h-full object-cover rounded-lg"
                                />
                                <div className="relative absolute rounded-lg inset-0 bg-blue-950/50 z-10 p-7 text-center">
                                    <h2 className="text-2xl font-bold text-white mb-4">Are you pressed ? Contact our team</h2>
                                    <p className="text-md text-white mb-6">
                                    Our team is available 24/7 and will be happy to discuss with you to create a quote that meets your needs or those of your company.
                                    </p>
                                    <button 
                                      onClick={() => window.location.href = 'tel:+911234567890'}
                                       className="bg-primary text-white text-sm font-medium py-3 px-4 rounded rounded-2xl button-hover-effect">
                                        <span>CALL NOW : +91 123 456 7890 </span>
                                    </button>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
            <div className="mt-10">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d310844.36313462513!2d13.095078131607513!3d52.50680413535733!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a84e373f035901%3A0x42120465b5e3b70!2sBerlin%2C%20Allemagne!5e0!3m2!1sfr!2stn!4v1737756551593!5m2!1sfr!2stn"
                    width="100%"
                    height={450}
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </div>
        </div>
        </DefaultLayout>

    );


};
export default QuotePage;