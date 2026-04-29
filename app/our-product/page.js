import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Our Products | DSS",
  description: "Explore our range of high-quality shuttering and scaffolding products designed to meet the needs of construction projects of all sizes.",
  alternates: {
    canonical: "https://yourdomain.com/our-products",
  },
};

// 1. Export the list and add 'slug' to each item
export const productList = [
  {
    title: "Vertical Standard",
    slug: "vertical-standard", // URL friendly slug
    description: "A vertical standard regulates specific industry sectors with tailored guidelines.",
    image: "/products/vertical_standard.jpg",
    loading: "lazy",
  },
  {
    title: "Horizontal Ledger",
    slug: "horizontal-ledger",
    description: "A horizontal ledger records transactions across multiple industries.",
    image: "/products/horizontal_ledger.jpg",
    loading: "lazy",
  },
  {
    title: "U Head Jack",
    slug: "u-head-jack",
    description: "A U head jack supports scaffolding beams and provides height adjustment.",
    image: "/products/u_head_jack.jpg",
    loading: "lazy",
  },
  {
    title: "Base Jack",
    slug: "base-jack",
    description: "A base jack provides stability and height adjustment for scaffolding.",
    image: "/products/base_jack.jpg",
    loading: "lazy",
  },
  {
    title: "Spigot Pin",
    slug: "spigot-pin",
    description: "A spigot pin connects scaffolding tubes ensuring alignment and stability.",
    image: "/products/spigot_pin.jpg",
    loading: "lazy",
  },
  {
    title: "Steel Challi",
    slug: "steel-challi",
    description: "A steel challi is a durable mesh-like reinforcement used in construction.",
    image: "/products/steel_challi.jpg",
    loading: "lazy",
  },
  {
    title: "Shuttering Plates",
    slug: "shuttering-plates",
    description: "Shuttering plates are temporary molds used to hold concrete in construction projects.",
    image: "/products/shuttering_plates.jpg",
    loading: "lazy",
  },
  {
    title: "Clamp",
    slug: "clamp",
    description: "Clamps are essential scaffolding accessories used to securely connect and fasten tubes together.",
    image: "/products/clamp.png",
    loading: "lazy",
  },
  {
    title: "Adjustable Telescopic Props",
    slug: "adjustable-telescopic-props",
    description: "Adjustable telescopic props provide stable support for construction projects.",
    image: "/products/adjustable_telescopic_prop.jpg",
    loading: "lazy",
  },
  {
    title: "Cuplock System",
    slug: "cuplock-system",
    description: "The Cuplock system is a modular scaffolding system known for its quick assembly and dismantling features.",
    image: "/products/cuplock_system.jpg",
    loading: "lazy",
  },
  {
    title: "MS Channel",
    slug: "ms-channel",
    description: "MS (Mild Steel) Channels are structural steel components with a cross-sectional shape resembling a C or a U.",
    image: "/products/ms_channel.jpg",
    loading: "lazy",
  },
];

export default function Product() {
  return (
    <>
      <section className="relative h-100 flex items-center justify-center text-white"
        style={{
          backgroundImage: "url('img_1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          loading: "lazy",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative text-center z-10">
          <h1 className="text-5xl font-bold mt-15">Our Products</h1>
          <div className="mt-3 text-lg font-medium">
            <span className="opacity-80 cursor-pointer">
              <Link href="/" className="hover:text-amber-300 transition-colors">
                Home
              </Link>
            </span>
            <span className="mx-2 text-gray-300">{'>'}</span>
            <span className="text-amber-400">
              Our Products
            </span>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-16 px-6">
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {productList.map((product, index) => (
            <div
              key={index}
              className="group bg-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition duration-300 flex flex-col"
            >
              <div className="relative h-52 overflow-hidden">
                <Image src={product.image} alt={product.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
              <div className="p-5 flex flex-col flex-1">
                {/* 2. Wrap Title in Link */}
                <Link href={`/our-product/${product.slug}`}>
                  <h3 className="font-semibold text-2xl mb-2 hover:text-[#fbbc04] transition duration-300 cursor-pointer">
                    {product.title}
                  </h3>
                </Link>
                <p className="text-gray-600 text-lg mb-6 flex-1">
                  {product.description}
                </p>

                {/* 3. Wrap Button in Link */}
                <Link href={`/our-product/${product.slug}`} className="mt-auto">
                  <button className="bg-[#fbbc04] text-black text-xs font-semibold px-6 py-4 hover:bg-yellow-500 transition w-full uppercase tracking-wider">
                    READ MORE ABOUT {product.title}
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}