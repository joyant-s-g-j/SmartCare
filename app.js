// Function to load services data from API
const loadServices = () => {
    fetch("https://testing-8az5.onrender.com/services/")
      .then((res) => res.json())
      .then((data) => displayService(data))
      .catch((err) => console.log(err));
  };
  
  const displayService = (services) => {
    const swiperWrapper = document.querySelector('.swiper-wrapper');
    swiperWrapper.innerHTML = "";
  
    services.forEach((service) => {
      const slide = document.createElement("div");
      slide.classList.add("swiper-slide");
  
      slide.innerHTML = `
      <div class="bg-white p-5 shadow-lg rounded-[20px]">
          <img src="${service.image}" alt="${service.name}" class="w-[250px] h-[200px] mb-2 rounded-lg object-cover">
          <h2 class="text-xl font-bold text-teal-700">${service.name}</h2>
          <p class="text-teal-800 font-semibold">${service.description.slice(0, 20)}...</p>
          <button type="submit" class="flex mt-4 text-teal-900 gap-2 mx-auto shadow-xl text-lg bg-teal-50 backdrop-blur-md lg:font-semibold isolation-auto border-teal-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-emerald-500 hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group">
              Details
              <svg class="w-8 h-8 justify-end group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-none p-2 rotate-45" viewBox="0 0 16 19" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                  class="fill-gray-800 group-hover:fill-gray-800"></path>
              </svg>
          </button>
      </div>
      `;
  
      swiperWrapper.appendChild(slide);
    });
  
    // Initialize Swiper
    const swiper = new Swiper('.services-slider', {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      pagination: {
            el: '.swiper-pagination',
            clickable: true,
            bulletClass: 'swiper-pagination-bullet', 
            bulletActiveClass: 'swiper-pagination-bullet-active',
            renderBullet: function (index, className) {
                return '<span class="' + className + ' bg-teal-500 w-2 h-2 mx-1 rounded-full"></span>';
            },
        },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        640: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
        1280: {
          slidesPerView: 4,
        },
        1600: {
          slidesPerView: 5,
        },
      },
    });
  };
  
  // Load services when the page loads
  loadServices();