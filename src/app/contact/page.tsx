"use client"
import { sendMessage } from "@/redux/actions/contactAction";
import { AppDispatch } from "@/redux/store";
import { useState } from "react";
import { FiPhone } from "react-icons/fi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { MdOutlineMailOutline } from "react-icons/md";
import { useDispatch } from "react-redux";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import useRecaptcha from "@/hooks/useRecaptcha ";
import DefaultLayout from "@/components/DefaultLayout";


const ContactPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [name, setName] = useState('');
    const [phonenumber, setPhoneNumber] = useState(0);
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const { capchaToken, recaptchaRef, handleRecaptcha } = useRecaptcha()


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

        if(!message){
            toast.error('Please fill the message field');
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
            message,
            recaptchaToken: capchaToken,
        };

        try {
            const result = await dispatch(sendMessage(messageData)).unwrap();
            // Check if the reCAPTCHA validation failed on the server-side
            if (result.recaptchaValid === false) {
                alert('ReCAPTCHA validation failed. Please try again.');
                handleRecaptcha('');
                if (recaptchaRef.current) {
                    recaptchaRef.current.reset();
                }
                return;
            }

            // Si la soumission réussit, afficher un toast de succès
            toast.success('Message submitted successfully !');
            // Réinitialiser les champs de formulaire
            setName('');
            setPhoneNumber(0);
            setEmail('');
            setMessage('');
            // Reset captcha after submission
            recaptchaRef.current?.reset();
        } catch (error) {
            // Si une erreur survient, afficher un toast d'erreur
            toast.error('Error while sending the message :');
            console.error('Error while sending the message :', error);
        }
    };

    

    return (
        <DefaultLayout>
        <div>
            <section>
                <div
                    className="relative lg:h-[25rem] h-[15rem]"
                    style={{
                        backgroundImage: "url('/images/banner-07.jpg')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <div className="absolute inset-0 bg-blue-950/50 flex items-center justify-center">
                        <h1 className="lg:text-6xl text-4xl font-bold text-white">Contact Us</h1>
                    </div>
                </div>
                <div className="w-full px-4 lg:px-20 py-20">
                    <h3 className="text-primary font-semibold text-lg mb-2">Contact us</h3>
                    <h2 className="text-4xl font-bold text-secondary mb-4 leading-tight">
                        Get In Touch With Us
                    </h2>

                    <div className="flex flex-col lg:flex-row gap-8">
                    <div className="rounded-md p-8 border">
                        <h2 className="text-2xl font-bold text-secondary mb-6">Drop us a message</h2>

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

                            <div className="flex flex-col">
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

                                <div className="flex flex-col">
                                    <label className="text-gray-700 font-medium">Message <span className="text-red-500">*</span></label>
                                    <textarea
                                        placeholder="Tell us a few words"
                                        required
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
                                <button disabled={!capchaToken} type="submit" className="bg-primary text-white p-3 w-48 text-sm font-medium rounded-md button-hover-effect">
                                    <span>SEND MESSAGE </span>
                                </button>
                        </form>
                        </div>
                        <div>
                            <div className="border-t-4 border-primary rounded-t-md">
                                <div className="mb-6 flex bg-gray-50 p-8 rounded-b-md gap-7">
                                    <div>
                                        <HiOutlineLocationMarker size={30} className="text-primary" />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-semibold text-secondary">
                                            Location
                                        </h3>
                                        <p className="text-secondary">105 Edington Drive, Roswell, GA 30076</p>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t-4 border-primary rounded-t-md">
                                <div className="mb-6 flex bg-gray-50 p-8 rounded-b-md gap-7">
                                    <div>
                                        <FiPhone size={27} className="text-primary" />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-semibold text-secondary">
                                            Call Now
                                        </h3>
                                        <p className="text-secondary">+1 234 567 890</p>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t-4 border-primary rounded-t-md">
                                <div className="mb-6 flex bg-gray-50 p-8 rounded-b-md gap-7">
                                    <div>
                                        <MdOutlineMailOutline size={30} className="text-primary" />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-semibold text-secondary">
                                            Email Adress
                                        </h3>
                                        <p className="text-secondary">email@youradress.com</p>
                                    </div>
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
export default ContactPage;