'use client';

import { ChevronUp } from 'lucide-react';
import React from 'react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2 rounded-full border border-gray-300 bg-white px-3 py-2 shadow-sm"
        >
          Top
          <ChevronUp />
        </button>
      )}
    </>
  );
}
