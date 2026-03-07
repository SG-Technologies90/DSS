import Image from "next/image";

export default function About() {
  return (
    <section
      className="relative h-[260px] w-full flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/img_1.jpg')" }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative text-center text-white">
        <h1 className="text-4xl font-semibold">About Us</h1>

        <p className="mt-2 text-sm">
          Home <span className="mx-2">{'>'}</span> About Us
        </p>
      </div>
    </section>
  );
}