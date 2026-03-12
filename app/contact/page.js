export default function Gallery() {
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
                    <h1 className="text-5xl font-bold mt-15">Contact Us</h1>
                    <div className="mt-3 text-lg">
                        <span className="opacity-80 cursor-pointer">
                            <a href="/" className="hover:text-amber-300">
                                Home
                            </a>
                        </span>
                        <span className="mx-2">{'>'}</span>
                        <span className="text-amber-300" href="/about">
                            Contact Us
                        </span>
                    </div>
                </div>
            </section>
        </div>
    )
}