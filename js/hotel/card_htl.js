const openModal = (data) => {
  const modal = document.getElementById("myModal");
  const modalTitle = modal.querySelector("#modalTitle");
  const modalTicket = modal.querySelector("#modalTicket");
  const modalParkir = modal.querySelector("#modalParkir");
  const modalJarak = modal.querySelector("#modalJarak");
  const modalPemandangan = modal.querySelector("#modalPemandangan");
  const modalKelebihan = modal.querySelector("#modalKelebihan");
  const modalKekurangan = modal.querySelector("#modalKekurangan");

  // Populate the modal with the provided data
  modalTitle.textContent = data.title;
  modalTicket.textContent = `Ticket: ${data.ticket}`;
  modalParkir.textContent = `Parkir: ${data.parkir}`;
  modalJarak.textContent = `Jarak: ${data.jarak}`;
  modalPemandangan.textContent = `Pemandangan: ${data.pemandangan}`;
  modalKelebihan.textContent = `Kelebihan: ${data.kelebihan}`;
  modalKekurangan.textContent = `Kekurangan: ${data.kekurangan}`;
  
  modal.style.display = "block";
};

// Define the closeModal function
const closeModal = (modalId) => {
  const modal = document.getElementById(modalId);
  modal.style.display = "none";
};

// Function to create hotel items and populate the hotel body
const populateHotelBody = async () => {
  const hotelbody = document.getElementById("hotelbody");
  try {
    // Fetch hotel data from the API
    const response = await fetch("https://asia-southeast2-pasabar.cloudfunctions.net/GetAllHotelNL");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    
    // Check if the data is an array
    if (Array.isArray(data.data)) {
    }
      
      
      // Create hotel items and add click event listeners
      data.data.forEach((item) => {
        const newHotelItem = document.createElement("div");
        newHotelItem.classList.add(
          "w-full",
          "px-4",
          "md:w-1/2",
          "lg:w-1/3",
          "wow",
          "fadeInUp",
          "group",
          "mb-10"
          );
          newHotelItem.setAttribute("data-wow-delay", ".1s");
          
          newHotelItem.innerHTML = `
          <div class="mb-8 overflow-hidden rounded-[5px]">
        <a href="#">
          <img src="${item.image}" alt="image" class="w-full transition group-hover:rotate-6 group-hover:scale-125" />
        </a>
      </div>
      <div>
        <span class="inline-block px-4 py-0.5 mb-6 text-xs font-medium leading-loose text-center text-white rounded-[5px] bg-primary">
          ${item.lokasi}
        </span>
        <h3>
          <a href="blog-details.html" class="inline-block mb-4 text-xl font-semibold text-dark dark:text-white hover:text-primary dark:hover:text-primary sm:text-2xl lg:text-xl xl:text-2xl">
            ${item.title}
          </a>
        </h3>
        <p class="max-w-[370px] text-base text-body-color dark:text-dark-6">
          ${item.description}
        </p>
      </div>`;
          
          // Add click event listener to each hotel item
          newHotelItem.addEventListener("click", async () => {
            // Manually populate modal with specific details
            const manualData = {
              title: item.title,
              ticket: "15 ribu",
              parkir: "5 ribu mobil, lumayan luas",
              jarak: "20km dari Bandung",
              pemandangan: "Indah dan ada samudera awan",
              kelebihan: "Perjalanan untuk mencapai puncak lumayan mudah dan santai",
              kekurangan: "Di gunung ini populasi babi banyak, jadi banyak babi di jalurnya"
            };
            
        openModal(manualData);
      });

      // Append the new catalog item to the catalog body
      hotelbody.appendChild(newHotelItem);
    });
  } catch (error) {
    console.error("Error fetching hotel data:", error);
  }
};

// Call the function to populate the hotel body
populateHotelBody();