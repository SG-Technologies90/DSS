"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Ashutosh",
    rating: 5,
    text: `We would like to thank DSS Group  for your excellent support and service we received at the DSS Group regarding the construction support service products.We are writing this letter as a token of appreciation for the quality product supported by you. You have done a commendable Job and have given total satisfaction regarding the construction. | would sincerely thank your organization on manufacturing such a fine product and for your prompt service in applying the optimum utilization. Not only your product Is reliable, but it also saves lot of construction time.`,
  },
  {
    name: "Rahul Sharma",
    rating: 5,
    text: `Very professional team and excellent execution. The project was delivered on time and exceeded expectations. Great experience working with the team. They were supportive, responsive and ensured everything was done according to the specifications.`,
  },
  {
    name: "Priya Mehta",
    rating: 4,
    text: `We write to express our commendation for DSS Group. We were enticed to your company because of the quality of formwork you provide which is very easy to install. We also appreciate your timely delivery at our site and extension of services when required by us. Thank you once again to provide the technical support during the span of project. We would like to get associated for our upcoming projects. All the very best Team DSS  for Future.
`,
  },
  {
    name: "Vikram Patel",
    rating: 5,
    text: `The work has been completed successfully conforming to the standard specifications. The entire team of DSS Group  was supportive right from the inception of project to the completion of same. We would like to extend our relationship further to work with them in all our future endeavours for the betterment in construction industry for the affordable segments of housing sector. We wish the team DSS Group all the very best for their future projects and creating milestone in the formwork industry.`,
  },
];

export default function TestimonialSection() {
  const [index, setIndex] = useState(0);

  const prev = () => {
    setIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const next = () => {
    setIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 5000);

    return () => clearInterval(interval);
  }, [index]);

  const testimonial = testimonials[index];

  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center px-6">
        <div>
          <p className="text-amber-400 tracking-widest uppercase text-lg mb-4">
            Clients Testimonials
          </p>

          <h2 className="text-4xl font-bold text-gray-700 leading-snug mb-10">
            What Our Client's <br /> Are Saying
          </h2>

          <div className="flex gap-5">
            <button
              onClick={prev}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-pink-100 hover:bg-pink-200 transition text-amber-400"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={next}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-pink-100 hover:bg-pink-200 transition text-amber-400"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* RIGHT SIDE CARD */}
        <div className="bg-white p-8 shadow-lg rounded-md h-[390px] flex flex-col justify-between">

          {/* Quote */}
          <div className="text-6xl text-gray-300">“</div>

          {/* Name + Stars */}
          <div>
            <h4 className="font-semibold text-lg mt-0">{testimonial.name}</h4>

            <div className="flex text-yellow-500 mb-2">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <span key={i}>★</span>
              ))}
            </div>
          </div>

          {/* Text with fixed height */}
          <p className="text-gray-600 leading-relaxed line-clamp-5 overflow-hidden h-screen">
            {testimonial.text}
          </p>
        </div>
      </div>
    </section>
  );
}