import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Draggable from 'gsap/Draggable';
import img1 from '../assets/img-1.jpg';
import img2 from '../assets/img-2.jpg';
import img3 from '../assets/img-3.jpg';
import img4 from '../assets/img-4.jpg';
import img5 from '../assets/img-5.jpg';
import img6 from '../assets/img-6.jpg';
import img7 from '../assets/img-7.jpg';
import img8 from '../assets/img-8.jpg';
import img9 from '../assets/img-9.jpg';

export default function InkfishScroll({activeItem}) {
  const mainContainer = useRef(null);
  const contentContainer = useRef(null);
  const dragHandle = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(Draggable);

    const container = contentContainer.current;
    const sections = gsap.utils.toArray(container.children);
    const numSections = sections.length;
    const dragTrack = mainContainer.current.querySelector('.drag-track');

    const sectionWidth = window.innerWidth;
    const totalWidth = sectionWidth * numSections;

    // Set up the container and sections
    gsap.set(container, { width: totalWidth, display: 'flex', x: 0 });
    gsap.set(dragHandle.current, { x: 0 });
    sections.forEach((section) =>
      gsap.set(section, { width: sectionWidth, flexShrink: 0 })
    );

    // Create draggable behavior with increased sensitivity
    Draggable.create(dragHandle.current, {
      type: 'x',
      bounds: {
        minX: 0,
        maxX: dragTrack.offsetWidth - dragHandle.current.offsetWidth,
      },
      onDrag: function () {
        const progress = this.x / (dragTrack.offsetWidth - dragHandle.current.offsetWidth);
        const moveX = -(totalWidth - sectionWidth) * progress * 1; // Increased intensity
        gsap.to(container, {
          x: moveX,
          duration: 0.03, // Even faster response
          ease: 'none',
        });
      },
      // Force initial position
      onDragStart: function() {
        if (!this.x) {
          gsap.set(this.target, { x: 0 });
          gsap.set(container, { x: 0 });
        }
      }
    });

    // Force initial positions
    gsap.set(container, { x: 0 });
    gsap.set(dragHandle.current, { x: 0 });

    // Add scroll event listener
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsVisible(scrollPosition > 100); // Show after 100px scroll
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    // Create intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        });
      },
      {
        threshold: 0.1 // Trigger when 10% of the target is visible
      }
    );

    // Observe the content container
    if (contentContainer.current) {
      observer.observe(contentContainer.current);
    }

    const handleHorizontalScroll = (e) => {
      const delta = e.deltaY || e.deltaX;
      const maxScroll = dragTrack.offsetWidth - dragHandle.current.offsetWidth;
  
      // Get current drag handle position
      const currentX = gsap.getProperty(dragHandle.current, "x");
      const newX = Math.max(0, Math.min(maxScroll, currentX + delta * 0.2));
  
      // Allow vertical scrolling at the leftmost position
      if (currentX === 0 && delta < 0) {
          return; // Allow default vertical scroll
      }
  
      // Prevent default scrolling if not at the leftmost boundary
      e.preventDefault();
  
      // Update drag handle and content position
      gsap.to(dragHandle.current, { x: newX, duration: 0.5 });
  
      const progress = newX / maxScroll;
      const moveX = -(totalWidth - sectionWidth) * progress;
      gsap.to(container, { x: moveX, duration: 0.5 });
  };
  

    // Add null checks before adding/removing event listeners
    if (mainContainer.current) {
      mainContainer.current.addEventListener('wheel', handleHorizontalScroll, { passive: false });
    }

    return () => {
      // Add null checks in cleanup
      if (window) {
        window.removeEventListener('scroll', handleScroll);
      }

      if (container) {
        gsap.set(container, { clearProps: 'all' });
      }

      if (dragHandle.current) {
        gsap.set(dragHandle.current, { clearProps: 'all' });
      }

      if (observer) {
        observer.disconnect();
      }

      // Null check before removing event listener
      if (mainContainer.current) {
        mainContainer.current.removeEventListener('wheel', handleHorizontalScroll);
      }
    };
  }, []);

  return (
    <div
      ref={mainContainer}
      className="overflow-hidden min-h-screen"
      style={{
        backgroundColor: '#000',
        color: '#fff',
        margin: '0',
        fontFamily: 'Avenir Next, system-ui, Avenir, Helvetica, Arial, sans-serif',
      }}
    >

      <div ref={contentContainer} className="relative h-screen flex">
        <section className="flex flex-col justify-center items-center p-16 bg-black text-white border-r border-gray-700">
          <h1 className="text-5xl max-w-3xl mb-8 mb-8 underline">
            EXPERIENCE
          </h1>
          <p className="text-xl max-w-2xl leading-relaxed">
          {activeItem.experience}
          </p>
        </section>

        <section className="flex flex-col items-center justify-center gap-8 bg-black text-white border-r border-gray-700">
          <img src={img1} alt="Fashion piece 1" className="w-3/4 h-auto shadow-md" />
          <img src={img2} alt="Fashion piece 2" className="w-3/4 h-auto shadow-md" />
          <img src={img3} alt="Fashion piece 3" className="w-3/4 h-auto shadow-md" />
        </section>

        <section className="flex flex-col items-center justify-center gap-8 bg-black text-white border-r border-gray-700">
          <img src={img4} alt="Fashion piece 4" className="w-3/4 h-auto shadow-md" />
          <img src={img5} alt="Fashion piece 5" className="w-3/4 h-auto shadow-md" />
          <img src={img6} alt="Fashion piece 6" className="w-3/4 h-auto shadow-md" />
        </section>

        <section className="flex flex-col justify-center items-center p-16 bg-black text-white border-r border-gray-700">
          <h1 className="text-5xl max-w-3xl mb-8 mb-8 underline">
            The Deep Dive
          </h1>
          <p className="text-xl max-w-2xl leading-relaxed">
          There is a long chain of hands that contribute to the production of this coffee before it finally lands with us. One of those touch points is the well known Bella Vista, and its industrious leader Luis Pedro Zelaya Zamora. Luis Pedro started Bella Vista as a way to uplift and support his community in Antigua through coffee production and education. In addition to operating their own farm, their team is constantly looking for more opportunities to provide jobs to families in the surrounding community, and are well known for not only their processing, milling and exporting expertise but for the training and support they provide producers.
            <br />
            <br />
            Over the past few years Luis Pedro has expanded Bella Vista’s operations from Antigua to also support producers in Huehuetenango, and this coffee is a direct result of that. We are excited to expand our direct relationship with Luis Pedro in this way!
          </p>
        </section>

        <section className="flex flex-col items-center justify-center relative bg-black text-white">
          <img src={activeItem.imageurl} alt="Fashion piece 8" className="w-3/4 h-auto shadow-md" />
          <p className='absolute z-40 text-6xl text-white font-extrabold text-center w-3/4'>{activeItem.overlayText}</p>
        </section>
      </div>

      <div
        className={`drag-track fixed bottom-8 left-1/2 -translate-x-1/2 w-[200px] h-[40px] bg-gray-700 rounded-full transition-opacity duration-300 opacity-0`}
        style={{
          backgroundColor: '#333',
        }}
      >
        <div
          ref={dragHandle}
          className="absolute left-0 w-[100px] h-[40px] bg-gray-900 text-white font-bold rounded-full cursor-grab flex items-center justify-center shadow-md"
          style={{
            transform: 'translateX(0)',
          }}
        >
          <p>Drag</p>
        </div>
      </div>
    </div>
  );
}
