import React, { useRef, useState } from "react";

const FAQ = () => {
 const [openQuestion, setOpenQuestion] = useState<number | null>(null);
 const answerRefs = useRef<(HTMLDivElement | null)[]>([]);



  const toggleQuestion = (index:number) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  const getHeight = (index: number) => {
    if (answerRefs.current[index]) {
      return answerRefs.current[index].scrollHeight + "px";
    }
    return "0px";
  };

  const faqs = [
    {
      question: "Bieten Sie auch umweltfreundliche Reinigungsprodukte an?",
      answer:
        "Ja, alle unsere Reinigungsprodukte sind umweltfreundlich und sicher für Mensch und Tier.",
    },
    {
      question: "Wie kann ich einen Termin vereinbaren?",
      answer:
        "Sie können ganz einfach online oder telefonisch einen Termin vereinbaren.",
    },
    {
      question: "Welche Arten von Reinigungsdiensten bieten Sie an?",
      answer:
        "Wir bieten Wohnungs-, Büro-, und Teppichreinigungen sowie weitere spezielle Dienstleistungen an.",
    },
  ];

    return (
        <div className="mt-12">
            <h2 className="text-3xl text-secondary font-bold mb-6">
                Häufig gestellte Fragen
            </h2>
            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className={`border rounded-md overflow-hidden ${openQuestion === index ? "shadow-lg" : ""
                            }`}
                    >
                        {/* Question */}
                        <button
                            className={`w-full flex justify-between items-center px-4 py-3 text-left font-semibold ${openQuestion === index
                                    ? "bg-primary text-white"
                                    : "text-secondary"
                                }`}
                            onClick={() => toggleQuestion(index)}
                        >
                            {faq.question}
                            <span
                                className={`text-xl pl-2 pr-2 border ${openQuestion === index ? "text-white border-white" : "text-primary border-primary"
                                    }`}              >
                                {openQuestion === index ? "−" : "+"}
                            </span>
                        </button>

                        {/* Answer */}
                        <div
                            ref={(el) => { answerRefs.current[index] = el; }}
                            style={{
                                height: openQuestion === index ? getHeight(index) : "0px",
                                transition: "height 0.3s ease-in-out",
                            }}
                            className="overflow-hidden"
                        >
                            <div className="px-4 py-3 text-gray-700 bg-white">
                                {faq.answer}
                            </div>
                        </div>


                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQ;
