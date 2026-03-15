import Image from "next/image";

const cards = [
  {
    id: 1,
    img: "/img_1.jpg",
  },
  {
    id: 2,
    img: "/img_2.jpg",
  },
  {
    id: 3,
    img: "/img_3.jpg",
  },
  {
    id: 4,
    img: "/img_4.jpg",
  },
];

export default function ImageCards() {
  return (
    <div className="w-full bg-white py-0">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 px-1">
        {cards.map((card) => (
          <div
            key={card.id}
            className="overflow-hidden group"
          >
            <div className="relative w-full h-62">
              <Image
                src={card.img}
                alt="card image"
                fill
                className="object-cover transform transition duration-500 group-hover:scale-110"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}