import { CheckCircle2, Clock, DollarSign, MessageSquare } from "lucide-react";

export default function QuoteProcess() {
const steps = [
  {
    title: "Book Online",
    description: "Schedule your cleaning service through our easy online booking system",
    icon: Clock,
  },
  {
    title: "Get a Quote",
    description: "Receive a detailed quote based on your specific requirements",
    icon: DollarSign,
  },
  {
    title: "Confirm Details",
    description: "Review and confirm your booking details and preferences",
    icon: CheckCircle2,
  },
  {
    title: "Enjoy the Service",
    description: "Sit back and relax while we take care of your cleaning needs",
    icon: MessageSquare,
  },
];

  
    return (
      <section className="py-20">
      <div className="lg:px-20 px-10">
        <h3 className="text-primary font-semibold text-center text-lg mb-2">How It Works</h3>
        <h2 className="text-4xl font-bold text-secondary text-center mb-10 leading-tight">
          Some easy steps to clean your asset.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-tertiary rounded-full flex items-center justify-center">
                <step.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-secondary mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
    )
  }