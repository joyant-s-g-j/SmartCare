const loadServices = () => {
    fetch("https://testing-8az5.onrender.com/services/")
    .then((res) => res.json())
    .then((data) => displayService(data))
    .catch((err) => console.log(err));
};

const loadReviews = () => {
    fetch("https://test-thto.onrender.com/doctor/review/")
    .then((res) => res.json())
    .then((data) => displayReview(data))
    .catch((err) => console.log(err));
};

const displayReview = (reviews) => {
    reviews.forEach((review) => {
        const parent = document.getElementById("review-container");
        const div = document.createElement("div")
        div.innerHTML = `
            <div class="max-w-sm mx-auto bg-white shadow-lg rounded-lg p-6">
                <div class="flex items-center mb-4">
                    <img class="w-12 h-12 rounded-full mr-4" src="Images/girl.png" alt="User Avatar">
                    <div>
                    <h2 class="text-lg text-teal-800 font-bold">${review.reviewer}</h2>
                    <p class="text-sm font-semibold text-teal-600">Verified Patient</p>
                    </div>
                </div>
                
                <div class="items-center mb-4">${review.rating}</div>
                
                <p class="text-teal-700 font-semibold text-sm">${review.body.slice(0, 140)}</p>
            </div>
        `;
        parent.appendChild(div);
    });
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
  
let doctors = [];

const loadDoctors = (search) => {
    document.getElementById("doctors").innerHTML = "";
    fetch(`https://testing-8az5.onrender.com/doctor/list/?search=${search ? search : ""}`)
    .then((res) => res.json())
    .then((data) => {
        doctors = data.results;
        if (doctors.length > 0) {
            document.getElementById("nodata").style.display = "none";
            displayDoctors(doctors);
        } else {
            document.getElementById("doctors").innerHTML = "";
            document.querySelector(".nodata").style.display = "block";
        }
    })
    .catch((err) => console.log(err));
};

const displayDoctors = (doctors) => {
    const parent = document.getElementById("doctors");
    parent.innerHTML = "";
    doctors.forEach((doctor) => {
        const div = document.createElement("div");
        div.classList.add("doc-card", "bg-white", "shadow-xl", "p-6", "rounded-lg");
        div.innerHTML = `
            <img src="${doctor.image}" class="rounded-full w-[120px] h-[120px] mx-auto mb-4" alt="Doctor">
            <h1 class="text-xl text-teal-900 font-bold text-center">${doctor?.full_name}</h1>
            <h2 class="text-center text-xl font-semibold text-teal-600 mt-2 mb-4">${doctor.designation}</h2>
            <p class="text-center font-semibold mt-2 mb-4">${doctor?.specialization?.map((item) => {
                return `<button class="bg-teal-600 mx-1 text-white py-2 px-4 rounded-lg text-lg transition-all duration-300 ease-in-out hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500">${item}</button>`;
            }).join('')}</p>
            <button class="cta flex items-center gap-1 group mx-auto text-teal-600">
                <span class="transition-all duration-300">Details</span>
                <svg width="15px" height="10px" viewBox="0 0 15 10" class="transition-all duration-300 transform group-hover:translate-x-2">
                    <path d="M1,5 L11,5" stroke="currentColor" stroke-width="2" fill="none"></path>
                    <polyline points="8 1 12 5 8 9" stroke="currentColor" stroke-width="2" fill="none"></polyline>
                </svg>
            </button>
        `;
        parent.appendChild(div);
    });
};

const loadDesignation = () => {
    fetch("https://testing-8az5.onrender.com/doctor/designation/")
    .then((res) => res.json())
    .then((data) => {
        const parent = document.getElementById("drop-deg");
        parent.innerHTML = ''; 
        data.forEach((item) => {
            const li = document.createElement("li");
            li.classList.add("dropdown-item", "py-2", "px-4", "hover:text-white", "font-semibold", "hover:bg-teal-700", "cursor-pointer");
            // li.innerText = item?.name;
            li.innerHTML = `
                <li onclick="loadDoctors('${item.name}')">${item.name}</li>
            `
            parent.appendChild(li);
        });
    });
};

const loadSpecialization = () => {
    fetch("https://testing-8az5.onrender.com/doctor/specialization/")
    .then((res) => res.json())
    .then((data) => {
        const parent = document.getElementById("drop-sep");
        parent.innerHTML = ''; 
        data.forEach((item) => {
            const li = document.createElement("li");
            li.classList.add("dropdown-item", "py-2", "px-4", "hover:text-white", "font-semibold", "hover:bg-teal-700", "cursor-pointer");
            // li.innerText = item?.name;
            li.innerHTML = `
                <li onclick="loadDoctors('${item.name}')">${item.name}</li>
            `
            parent.appendChild(li);
        });
    });
};

const handleSearchBtn = () => {
    const btn = document.querySelector(".search");
    btn.addEventListener('click', () => {
        const value = document.getElementById("search-box").value.toLowerCase();
        const filteredDoctors = doctors.filter(doctor => doctor.full_name.toLowerCase().includes(value));
        displayDoctors(filteredDoctors);
        
        const nodataContainer = document.querySelector(".nodata");
        if (filteredDoctors.length === 0) {
            if (nodataContainer) {
                nodataContainer.style.display = 'block';
            }
            console.log("No data found");
        } else {
            if (nodataContainer) {
                nodataContainer.style.display = 'none';
            }
        }
        
        document.getElementById("search-box").value = "";
    });
};

const toggleDropdown = (type) => {
    const designationDropdown = document.getElementById("drop-deg");
    const specializationDropdown = document.getElementById("drop-sep");

    if (type === 'designation') {
        designationDropdown.classList.toggle("hidden");
        specializationDropdown.classList.add("hidden");
    } else if (type === 'specialization') {
        specializationDropdown.classList.toggle("hidden");
        designationDropdown.classList.add("hidden");
    }

    console.log(`${type} Dropdown toggled`);
};

window.addEventListener('load', () => {
    loadServices();  
    loadDoctors();   
    loadDesignation();
    loadSpecialization();
    handleSearchBtn();
    loadReviews();
});