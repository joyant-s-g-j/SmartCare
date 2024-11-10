const getparams = () => {
    const param = new URLSearchParams(window.location.search).get("doctorId");
    fetch(`https://test-thto.onrender.com/doctor/list/${param}`)
    .then(res=>res.json())
    .then((data) => displayDetails(data));

    fetch(`https://test-thto.onrender.com/doctor/review/?doctorId=${param}`)
    .then(res=>res.json())
    .then((data) => displayDocReview(data))
};

const displayDocReview = (reviews) => {
    reviews.forEach((review) => {
        const parent = document.getElementById("doc-reviews");
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

const displayDetails = (doctor) => {
    const parent = document.getElementById("doc-details");
    const div = document.createElement("div");
    div.classList.add("doc-details-container", "bg-teal-50", "flex", "rounded-xl", "p-16");
    div.innerHTML = `
        <img class="w-64 h-64 shadow-xl rounded-full" src="${doctor.image}" alt="">
        <div class="flex ml-24 gap-3 flex-col">
            <h1 class="text-5xl font-bold text-teal-700">${doctor.full_name}</h1>
            <p class="text-xl font-semibold space-x-2">${doctor?.specialization?.map((item) => {
                return `<span class="text-teal-700 rounded-lg">${item}</span>`;
            }).join('')}</p>
            <p class="text-lg font-semibold text-teal-900">Specializing in the diagnosis and treatment of bone, joint, and <br> muscle conditions, providing expert care for injuries and disorders <br> of the musculoskeletal system.</p>
            <h1 class="text-2xl font-bold text-teal-600">Fees: ${doctor.fee} BDT</h1>
            <button class="group/button relative inline-flex items-center justify-center overflow-hidden rounded-2xl bg-teal-800 backdrop-blur-lg px-4 py-2 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:shadow-teal-600/50 border border-white/20 w-[200px]">
                <span class="text-lg">Take Appointment</span>
                <div class="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
                    <div class="relative h-full w-10 bg-white/20"></div>
                </div>
            </button>
        </div>
    `;
    parent.appendChild(div);
};
getparams();