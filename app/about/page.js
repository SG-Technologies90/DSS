import TestimonialSection from "../components/TestimonialSection";

export const metadata = {
  title: "About Us | DSS",
  description:
    "Learn about Decent Shuttering Solution, our mission, vision, and the team behind our high-quality shuttering and scaffolding solutions for construction projects.",
  alternates: {
    canonical: "https://yourdomain.com/about",
  },
};

export default function About() {
  const steps = [
    { id: "01", title: "Receive Project", icon: "📄" },
    { id: "02", title: "Concerning", icon: "📣" },
    { id: "03", title: "Planning Work", icon: "📋" },
    { id: "04", title: "Start Building", icon: "🏗️" },
  ];

  return (
    <div>

      {/* HERO */}
      <section
        className="relative h-[300px] md:h-[400px] flex items-center justify-center text-white"
        style={{
          backgroundImage: "url('/img_1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative text-center px-4">
          <h1 className="text-3xl md:text-5xl font-bold mt-10">About Us</h1>

          <div className="mt-3 text-sm md:text-lg">
            <a href="/" className="opacity-80 hover:text-amber-300">
              Home
            </a>
            <span className="mx-2">{">"}</span>
            <span className="text-amber-300">About Us</span>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="bg-gray-100 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-12 items-center">

          {/* IMAGES */}
          <div className="relative w-full flex justify-center">

            <img
              src="/img_2.jpg"
              className="w-full md:w-[420px] h-[320px] md:h-[420px] object-cover"
              loading="lazy"
            />

            <div className="absolute -bottom-10 md:-bottom-16 right-0 md:right-10 border-amber-300 border-2 shadow-lg">
              <img
                src="/img_3.jpg"
                className="w-[220px] md:w-[320px] h-[200px] md:h-[260px] object-cover shadow-lg"
                loading="lazy"
              />
            </div>

          </div>

          {/* TEXT */}
          <div>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-amber-300 tracking-[3px] text-sm font-semibold">
                ABOUT US
              </span>
              <div className="w-10 h-[2px] bg-amber-300"></div>
            </div>

            <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-6 leading-snug">
              Something Can Always Be
              <br />
              Done Better.
            </h2>

            <p className="text-gray-600 mb-5 leading-relaxed text-sm md:text-base">
             At Decent Shuttering Solution, we specialize in providing high-quality shuttering material, scaffolding solutions, 
             and construction support systems for every range of building projects. 
             Our objective is to assist contractors, builders, and developers with 
             reliable shuttering solutions that ensure strength, accuracy, and durability 
             in concrete structures.
            </p>

            <p className="text-gray-600 mb-5 leading-relaxed text-sm md:text-base">
              We understand the technical and operational challenges of construction work. 
              Our team works closely with clients to deliver cost-effective shuttering and 
              scaffolding solutions, focusing on material quality, safety compliance, and 
              timely availability. Every project is handled with attention to detail, 
              ensuring consistent performance at the construction site.
            </p>

            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              Through transparent working practices and a commitment to continuous improvement, 
              Decent Shuttering Solution has earned the trust of professionals across the 
              construction industry. Our solutions contribute to efficient project execution, 
              reduced material wastage, and improved structural outcomes.
            </p>

          </div>

        </div>
      </section>

      {/* CHAIRMAN SECTION */}
      <section className="w-full grid md:grid-cols-2">

        <div className="bg-black text-white px-6 md:px-16 py-14 md:py-20 flex flex-col justify-center">

          <h2 className="text-yellow-400 text-2xl md:text-3xl font-bold mb-15 mt-0">
            FROM THE CHAIRMAN'S DESK
          </h2>

          <p className="text-gray-300 leading-relaxed mb-6 text-sm md:text-base">
            “Our respected Chairman is in charge of our business. His vision, leadership, and knowledge of the industry have been the main reasons for our growth and success. He has worked in the shuttering and scaffolding business for years, so he knows a lot about how construction works, safety rules, and how infrastructure demands change over time.
          </p>

          <p className="text-gray-300 leading-relaxed mb-8 text-sm md:text-base">
            The company has always focused on providing high-quality shuttering and scaffolding materials that support robust, safe, and efficient construction procedures under his leadership. His dedication to new ideas, dependability, and making customers happy has helped the company create long-lasting connections in the construction and real estate industries.
          </p>

          <p className="text-gray-300 leading-relaxed mb-8 text-sm md:text-base">
            He strongly believes that a good foundation is the first step in developing a strong structure. The company continues to help build modern infrastructure with accuracy and trust through advanced scaffolding systems and reliable shuttering solutions.
            The Chairman has a forward-looking strategy for the company that includes increasing its reach while keeping the highest standards of quality, safety, and service excellence on every project.
          </p>
          <h3 className="text-lg md:text-xl font-semibold">
            Rakesh Pannu
          </h3>

          <p className="text-gray-400 mt-2">Chairman</p>

        </div>

        <div className="relative h-[300px] md:h-auto">
          <img
            src="/chairman.jpeg"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

      </section>

      {/* PROCESS */}
      <section className="bg-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">

          <div className="text-center mb-16">
            <p className="text-yellow-500 tracking-[4px] text-sm mb-2">
              — STEPS —
            </p>

            <h2 className="text-2xl md:text-4xl font-semibold text-gray-800">
              Our Work Process
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {steps.map((step) => (
              <div
                key={step.id}
                className="relative bg-white p-8 text-center shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group"
              >

                <div className="text-4xl text-yellow-500 mb-6">
                  {step.icon}
                </div>

                <div className="absolute top-6 right-6 text-5xl text-gray-200 font-bold group-hover:text-yellow-200">
                  {step.id}
                </div>

                <h3 className="text-lg font-semibold text-gray-800">
                  {step.title}
                </h3>

              </div>
            ))}

          </div>

        </div>
      </section>

      {/* MISSION VISION */}
      <section
        className="relative bg-cover bg-center py-20"
        style={{ backgroundImage: "url('/img_4.jpg')" }}
      >

        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative max-w-7xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-12 text-white">

          <div>
            <h2 className="text-2xl md:text-3xl font-semibold mb-6">
              Our Mission
            </h2>

            <p className="text-gray-200 leading-relaxed text-sm md:text-base">
              At Decent Shuttering Solution, our mission is to provide high-quality 
              shuttering and formwork solutions that support safe, accurate, and 
              efficient construction. We aim to assist builders and contractors with 
              durable shuttering materials, timely service, and reliable construction 
              support that meets industry standards and on-site requireme
            </p>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-semibold mb-6">
              Our Vision
            </h2>

            <p className="text-gray-200 leading-relaxed text-sm md:text-base">
              Our vision is to become a trusted name in the shuttering and scaffolding 
              industry by delivering consistent quality, maintaining safety standards, 
              and adopting modern construction practices. We strive to support sustainable 
              building development through innovative, cost-effective shuttering solutions 
              that contribute to strong and long-lasting structures.
            </p>
          </div>

        </div>

      </section>

      <TestimonialSection />

    </div>
  );
}