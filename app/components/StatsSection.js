"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const Counter = ({ target }) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.4,
  });

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const duration = 1500;
    const step = target / (duration / 16);

    const updateCounter = () => {
      start += step;

      if (start < target) {
        setCount(Math.ceil(start));
        requestAnimationFrame(updateCounter);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(updateCounter);
  }, [inView, target]);

  return (
    <h2 ref={ref} className="stat-number">
      {count}+
    </h2>
  );
};

export default function StatsSection() {
  const stats = [
    { number: 117, label: "HAPPY CUSTOMERS" },
    { number: 468, label: "APPROVED PRODUCTS" },
    { number: 319, label: "CERTIFIED CLIENT" },
    { number: 438, label: "SATISFACTION" },
  ];

  return (
    <section className="stats-section">
      <div className="overlay"></div>

      <div className="stats-container">
        {stats.map((stat, i) => (
          <div key={i} className="stat-box">
            <Counter target={stat.number} />
            <p>{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}