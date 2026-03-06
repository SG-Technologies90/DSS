"use client";
import Image from "next/image";


const productList = [
  {
    title: "Vertical Standard",
    description:
      "A vertical standard regulates specific industry sectors with tailored guidelines.",
    image: "/products/vertical_standard.jpg",
  },
  {
    title: "Horizontal Ledger",
    description:
      "A horizontal ledger records transactions across multiple industries.",
    image: "/products/horizontal_ledger.jpg",
  },
  {
    title: "U Head Jack",
    description:
      "A U head jack supports scaffolding beams and provides height adjustment.",
    image: "/products/u_head_jack.jpg",
  },
  {
    title: "Base Jack",
    description:
      "A base jack provides stability and height adjustment for scaffolding.",
    image: "/products/base_jack.jpg",
  },
  {
    title: "Spigot Pin",
    description:
      "A spigot pin connects scaffolding tubes ensuring alignment and stability.",
    image: "/products/spigot_pin.jpg",
  },
  {
    title: "Steel Challi",
    description:
      "A steel challi is a durable mesh-like reinforcement used in construction.",
    image: "/products/steel_challi.jpg",
  },
  {
    title: "Shuttering Plates",
    description:
      "Shuttering plates are temporary molds used to hold concrete in construction projects.",
    image: "/products/shuttering_plates.jpg",
  },
  {
    title: "Span",
    description:
      "In construction, span refers to the distance between supports for beams or structures.",
    image: "/products/span.jpg",
  },
  {
    title: "Adjustable Telescopic Props",
    description:
      "Adjustable telescopic props provide stable support for construction projects.",
    image: "/products/adjustable_telescopic_prop.jpg",
  },
  {
    title: "Cuplock System",
    description:
      "The Cuplock system is a modular scaffolding system known for its quick assembly and dismantling features.",
    image: "/products/cuplock_system.jpg",
  },
  {
    title: "MS Channel",
    description:
      "MS (Mild Steel) Channels are structural steel components with a cross-sectional shape resembling a C or a U.",
    image: "/products/ms_channel.jpg",
  },
];

export default function Product() {
  return (
    <section className="bg-gray-100 py-16 px-6">
      <h2 className="text-center text-6xl font-semibold mb-12 text-yellow-500 underline">
        Our Products
      </h2>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {productList.map((product, index) => (
          <div
            key={index}
            className="group bg-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition duration-300">
  
            <div className="relative h-52 overflow-hidden">
              <Image src={product.image} alt={product.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110"/>
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-2xl mb-2 hover:text-yellow-500 transition duration-300 cursor-pointer">
                {product.title}
              </h3>
              <p className="text-gray-600 text-lg mb-6">
                {product.description}
              </p>

              <button className="bg-amber-400 text-black text-xs font-semibold px-6 py-4 hover:bg-amber-500 transition cursor-pointer">
                READ MORE ABOUT {product.title.toUpperCase()}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}