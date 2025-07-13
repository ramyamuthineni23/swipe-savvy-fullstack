import React, { useState, useEffect } from 'react';

function TestimonialCarousel() {
  const testimonials = [
    { name: 'John D.', text: 'Swipe Savvy increased our retention by 30%!' },
    { name: 'Sarah M.', text: 'The free listing was so easy to set up!' },
    { name: 'Mike R.', text: 'Great platform for small businesses like ours.' },
  ];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5001);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="max-w-2xl mx-auto p-4 text-center">
      <p className="italic">"{testimonials[current].text}"</p>
      <p className="font-bold mt-2">{testimonials[current].name}</p>
    </div>
  );
}

export default TestimonialCarousel;
