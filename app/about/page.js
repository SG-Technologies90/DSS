import TestimonialSection from "../components/TestimonialSection";

export default function About() {

    const steps = [
    {
      id: "01",
      title: "Receive Project",
      icon: "📄",
    },
    {
      id: "02",
      title: "Concerning",
      icon: "📣",
    },
    {
      id: "03",
      title: "Planning Work",
      icon: "📋",
    },
    {
      id: "04",
      title: "Start Building",
      icon: "🏗️",
    },
  ];
  return (
    <div>

      {/* HERO SECTION */}
      <section
        className="relative h-[400px] flex items-center justify-center text-white"
        style={{
          backgroundImage: "url('img_1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* center content */}
        <div className="relative text-center">
          <h1 className="text-5xl font-bold mt-15">About Us</h1>

          <div className="mt-3 text-lg">
            <span className="opacity-80">Home</span>
            <span className="mx-2">{'>'}</span>
            <span className="text-orange-400">About Us</span>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img src="/img_2.jpg" className="w-[420px] h-[420px] object-cover"/>
            
            <div className="absolute bottom-[-100px] left-[200px] p-6">
              <img
                src="/img_3.jpg"
                className="w-[380px] h-[350px] object-cover shadow-lg"
              />
            </div>

          </div>


          {/* RIGHT TEXT */}
          <div>

            {/* small heading */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-orange-500 tracking-[3px] text-sm font-semibold">
                ABOUT US
              </span>

              <div className="w-10 h-[2px] bg-orange-500"></div>
            </div>

            {/* main heading */}
            <h2 className="text-4xl font-bold text-gray-800 mb-6 leading-snug">
              Something Can Always Be
              <br />
              Done Better.
            </h2>

            {/* paragraph */}
            <p className="text-gray-600 mb-5 leading-relaxed">
              At Decent Shuttering Solution, we specialize in providing high-quality 
              shuttering material, scaffolding solutions, and construction support 
              systems for every range of building projects. Our objective is to assist 
              contractors, builders, and developers with reliable shuttering solutions 
              that ensure strength, accuracy, and durability in concrete structures.
              We understand the technical and operational challenges of construction work. 

            <p className="text-gray-600 mb-5 leading-relaxed">
              Our team works closely with clients to deliver cost-effective shuttering 
              and scaffolding solutions, focusing on material quality, safety compliance, 
              and timely availability. Every project is handled with attention to detail, 
              ensuring consistent performance at the construction site.
              Through transparent working practices and a commitment to continuous improvement, 
              Decent Shuttering Solution has earned the trust of professionals across the construction 
              industry. 

            </p>
            </p>

            <p className="text-gray-600 leading-relaxed">
              Our solutions contribute to efficient project execution, reduced material wastage, 
              and improved structural outcomes.
            </p>

          </div>

        </div>
      </section>

      <section className="w-full grid md:grid-cols-2">

      {/* LEFT SIDE */}
      <div className="bg-black text-white px-16 py-20 flex flex-col justify-center">

        <h2 className="text-yellow-400 text-3xl font-bold mb-6">
          FROM THE CHAIRMAN'S DESK
        </h2>

        <p className="text-gray-300 leading-relaxed mb-6">
          The Team at <strong>DECENT SHUTTERING SOLUTION (DSS)</strong> is
          led by <strong>Mr. Kamal Khosla</strong>, the visionary chairman of
          the company. Mr. Khosla possesses extensive experience in the
          construction and scaffolding industry and has a deep understanding
          of the real estate and construction sectors. He envisions providing
          scaffolding and shuttering services to create a strong foundation
          for a stronger future.
        </p>

        <p className="text-gray-300 leading-relaxed mb-8">
          Over the years, DECENT SHUTTERING SOLUTION (DSS) has
          established itself as a prominent player in the scaffolding rental
          industry and has been instrumental in various significant
          development projects.
        </p>

        <h3 className="text-white text-xl font-semibold">
          KAMAL A KHOSLA
        </h3>

        <p className="text-gray-400 mt-2">Chairman</p>

      </div>


      {/* RIGHT SIDE IMAGE */}
      <div className="relative h-[500px] md:h-auto">
        <img
          src="/img_4.jpg"
          className="w-full h-full object-cover"
        />
      </div>

    </section>

    <section className="bg-gray-100 py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Title */}
        <div className="text-center mb-16">
          <p className="text-yellow-500 tracking-[4px] text-sm mb-2">
            — STEPS —
          </p>

          <h2 className="text-4xl font-semibold text-gray-800">
            Our Work Process
          </h2>
        </div>


        {/* Cards */}
        <div className="grid md:grid-cols-4 gap-8">

          {steps.map((step) => (
            <div
              key={step.id}
              className="relative bg-white p-10 text-center shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group"
            >

              {/* Icon */}
              <div className="text-4xl text-yellow-500 mb-6">
                {step.icon}
              </div>

              {/* Number */}
              <div className="absolute top-6 right-6 text-5xl text-gray-200 font-bold group-hover:text-yellow-200 transition">
                {step.id}
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-800">
                {step.title}
              </h3>

            </div>
          ))}

        </div>

      </div>
    </section>

    <section
      className="relative bg-cover bg-center py-24"
      style={{ backgroundImage: "url('/img_4.jpg')" }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 text-white">

        {/* Mission */}
        <div>
          <h2 className="text-3xl font-semibold mb-6">
            Our Mission
          </h2>

          <p className="text-gray-200 leading-relaxed">
           At Decent Shuttering Solution, our mission is to provide high-quality shuttering
            and formwork solutions that support safe, accurate, and efficient construction. 
            We aim to assist builders and contractors with durable shuttering materials, timely 
            service, and reliable construction support that meets industry standards and on-site 
            requirements.
          </p>
        </div>


        {/* Vision */}
        <div>
          <h2 className="text-3xl font-semibold mb-6">
            Our Vision
          </h2>

          <p className="text-gray-200 leading-relaxed">
            Our vision is to become a trusted name in the shuttering and scaffolding industry by 
            delivering consistent quality, maintaining safety standards, and adopting modern 
            construction practices. We strive to support sustainable building development through 
            innovative, cost-effective shuttering solutions that contribute to strong and 
            long-lasting structures.
          </p>
        </div>

      </div>
    </section>
    <TestimonialSection />

    </div>
  );
}