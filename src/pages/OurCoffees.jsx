import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { galleryItems } from "../Data/data.js";
import InkfishScroll from '../components/InkfishScroll.jsx';

const OurCoffees = () => {
  const [activeTexture, setActiveTexture] = useState(galleryItems[0].textureurl);
  const [isHovering, setIsHovering] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [quantity, setQuantity] = useState('250g');
  const [grindType, setGrindType] = useState('Whole Bean');

  useEffect(() => {
    const gallery = document.querySelector(".gallery");
    const blurryPrev = document.querySelector(".blurry-prev");
    const projectPreview = document.querySelector(".project-preview");
    const itemCount = galleryItems.length;

    // Clear existing gallery items first
    gallery.innerHTML = "";
    projectPreview.innerHTML = "";

    let activeItemIndex = 0;
    let isAnimating = false;

    // Populate the gallery with items
    galleryItems.forEach((item, index) => {
      const itemDiv = document.createElement("div");
      itemDiv.classList.add("item", "relative");
      if (index === 0) itemDiv.classList.add("active");

      // Background preview image
      const previewImg = document.createElement("img");
      previewImg.src = item.imageurl;
      previewImg.alt = `${item.title} Preview`;
      previewImg.className = "w-full h-full object-cover ";

      // Logo overlay
      const logo = document.createElement("img");
      logo.src = item.titleurl;
      logo.alt = `${item.title} Logo`;
      logo.className = "absolute inset-0 w-full h-full object-contain  p-4";

      itemDiv.appendChild(previewImg);
      itemDiv.appendChild(logo);

      // Hover animation
      itemDiv.addEventListener("mouseenter", () => {
        gsap.to(itemDiv, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out",
        });
      });

      itemDiv.addEventListener("mouseleave", () => {
        gsap.to(itemDiv, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      });

      itemDiv.dataset.index = index;
      itemDiv.addEventListener("click", () => handleItemClick(index));
      gallery.appendChild(itemDiv);
    });

    // Initialize project preview
    const initializeProjectPreview = () => {
      const activeItem = galleryItems[0];
      renderPreviewContent(activeItem);
    };


    // Text above coffee bag image//
      /////////////////////////////////////////
    const renderPreviewContent = (item) => {
      projectPreview.innerHTML = "";

      const info = document.createElement("div");
      info.className =
        "text-lg space-y-2 leading-4 overflow-y-hidden font-bold";

      // Create formatted content for individual coffee text info 
      
      info.innerHTML = `
        <p class="mb-4 font-bold">${item.copy}</p>
        
        <div className="mb-6">
        <div class="grid grid-cols-2 gap-x-3 gap-y-1 mt-3 mb-2 text-sm ">
          ${Object.entries(item.details)
            .map(
              ([key, value]) => `
            <div class="flex items-center">
              <span class="font-bold">${key}:</span>
              <span class="ml-1">${value}</span>
            </div>
          `
          
            )
            .join("")}
        </div>
        </div>
      `;


///////////////////////////////////////////////////////////
      // Large Product Image Container
      const projectImgContainer = document.createElement("div");
      projectImgContainer.className =
        "w-[35vw] h-[50vh] max-h-[70vh] overflow-hidden rounded-lg ml-3 mt-10 ";

      const projectImg = document.createElement("img");
      projectImg.src = item.imageurl;
      projectImg.alt = `${item.title} Preview`;
      projectImg.className = "w-full h-full object-cover";

      projectImgContainer.appendChild(projectImg);

      projectPreview.appendChild(info);
      projectPreview.appendChild(projectImgContainer);
    };

    // Handle item click
    const handleItemClick = (index) => {
      if (index === activeItemIndex || isAnimating) return;
      isAnimating = true;
      setIsLoading(true);

      const activeItem = galleryItems[index];

      // Update active texture and index
      setActiveTexture(activeItem.textureurl);
      setActiveIndex(index);

      // Add timeout to simulate loading and ensure smooth transition
      setTimeout(() => {
        setIsLoading(false);
      }, 800);

      gsap.to(projectPreview.children, {
        opacity: 0,
        y: 20,
        duration: 0.4,
        stagger: 0.1,
        ease: "power2.inOut",
        onComplete: () => {
          renderPreviewContent(activeItem);
          gsap.to(projectPreview.children, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.2,
            ease: "power2.out",
            onComplete: () => {
              isAnimating = false;
            },
          });
        },
      });

      gallery.children[activeItemIndex].classList.remove("active");
      gallery.children[index].classList.add("active");
      activeItemIndex = index;

      const newBlurryImg = document.createElement("img");
      newBlurryImg.src = activeItem.imageurl;

      blurryPrev.insertBefore(newBlurryImg, blurryPrev.firstChild);
      const currentBlurryImg = blurryPrev.querySelector("img:nth-child(2)");
      if (currentBlurryImg) {
        gsap.to(currentBlurryImg, {
          opacity: 0,
          duration: 0.8,
          ease: "power2.inOut",
          onComplete: () => blurryPrev.removeChild(currentBlurryImg),
        });
      }
      gsap.to(newBlurryImg, { opacity: 1, duration: 0.8, ease: "power2.inOut" });
    };

    initializeProjectPreview();

    // Cleanup function to prevent memory leaks
    return () => {
      gallery.innerHTML = "";
      projectPreview.innerHTML = "";
    };
  }, []);

  return (
    <div className="flex flex-col w-screen h-[100vh] mt-10 overflow-y-auto">
      {/* Main content wrapper */}
      <div className="flex items-center w-screen h-screen text-white">
        {/* Blurry Preview */}
        <div className="fixed w-screen h-screen inset-0 blurry-prev -z-10">
          <img
            src={galleryItems[0].imageurl}
            alt="Blurry Preview"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 backdrop-blur-[80px] bg-gray-800/30"></div>
        </div>

        {/* Site Info / Product Details */}
        {/* ///////////////////// */}
      <div> 
        <div className="flex flex-1 flex-col justify-center h-screen">
          <div className="p-2 flex flex-col">
            {/* Logo Image */}
            <div
              className="transition-opacity duration-800 ease-in-out"
              style={{ 
                opacity: isLoading ? 0 : 1,
                marginTop: '20px'
              }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <img
                src={galleryItems[activeIndex].titleurl}
                alt={`${galleryItems[activeIndex].title} Logo`}
                className="w-[90%] mx-auto  mb-10"
              />
            </div>
          </div>

          {/* Product Details Container */}
          {/* /////////////////////////////// */}
         
          <div className="mt-10 space-y-3 flex flex-col justify-center">
            {/* Price */}
            <div className=" text-center text-lg font-medium">
              {galleryItems[activeIndex].price}
            </div>

            {/* Dropdown Menus and Add to Cart Button */}
            <div className=" space-y-3 w-75 p-4 flex flex-col items-center justify-evenly">
              {/* <div className="inline-flex w-3/4 justify-evenly ">
              <select 
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full mr-1 p-2  backdrop-blur-sm border border-white/20 rounded-full focus:outline-none focus:border-gray-100"
              >
                <option value="250g" className="text-center">250g</option>
                <option value="500g">500g</option>
                <option value="1kg">1kg</option>
              </select>

              <select 
                value={grindType}
                onChange={(e) => setGrindType(e.target.value)}
                className="w-full ml-1 p-2 bg-black backdrop-blur-sm border border-white/20 rounded-full focus:outline-none focus:border-gray-100"
              >
                <option value="Whole Bean" className="text-center">Whole Bean</option>
                <option value="Espresso">Espresso</option>
                <option value="Filter">Filter</option>
                <option value="French Press">French Press</option>
              </select>

              </div> */}
              {/* Add to Cart Button */}
              {/* <button 
                onClick={() => {
                  console.log(`Added ${quantity} of ${grindType} ${galleryItems[activeIndex].title} to cart`);
                }}
                className="w-3/4 py-2 px-4 bg-gray-100 text-gray-800 font-medium rounded-full duration-200 hover:bg-turquoise"
              >
                Add to Cart
              </button> */}
            </div>
          </div>
        </div>
    

        </div> 

        {/* Project Preview */}
        <div className="flex-[1.75] p-3 mt-10 project-preview mx-auto backdrop-blur-sm overflow-y-hidden"></div>

        {/* Gallery */}
        <div className="relative z-10 flex flex-col gap-4 overflow-y-auto h-screen p-4 bg-gray-800/50 backdrop-blur-md gallery lg:w-[20%] sm:w-[15%]">
          {/* Gallery items will be populated here */}
        </div>
      </div>

      {/* InkfishScroll at bottom */}
      <div className="w-full h-[20vh] ">
        <InkfishScroll activeItem={galleryItems[activeIndex]} />
      </div>
    </div>
  );
};

export default OurCoffees;
