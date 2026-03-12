export default function Gallery() {
  const images = [
    "/img_1.jpg",
    "/img_10.jpg",
    "/img_3.jpg",
    "/img_4.jpg",
    "/img_5.jpg",
    "/img_6.jpg",
    "/img_7.jpg",
    "/img_8.jpg",
    "/img_9.jpg",
  ];

  return (
    <div>
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
          <h1 className="text-5xl font-bold mt-15">Our Gallery</h1>
          <div className="mt-3 text-lg">
           <span className="opacity-80 cursor-pointer">
           <a href="/" className="hover:text-amber-300">
              Home
            </a>
            </span>
            <span className="mx-2">{'>'}</span>
            <span className="text-amber-300" href="/about">
            Our Gallery
            </span>
          </div>
        </div>
      </section>
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

          {images.map((img, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-lg group cursor-pointer"
            >
              <img
                src={img}
                alt="gallery"
                className="w-full h-[260px] object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
              />
            </div>
          ))}

        </div>
      </div>
    </section>
    </div>
  );
}