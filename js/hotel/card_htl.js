const getAllHotel = async () => {
  const targetURL =
    "https://asia-southeast2-pasabar.cloudfunctions.net/GetAllHotelNL";

  try {
    // Fetch data from the API
    const response = await fetch(targetURL);

    // Check if the response is successful (status code 200)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the JSON response into an object
    const data = await response.json();

    // Check if the parsed data is an array
    if (Array.isArray(data.data)) {
      // Process each catalog item
      data.data.forEach((item) => {
        // Create a new catalog item element
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

        // Populate the catalog item with data
        newHotelItem.innerHTML = `
      <div class="mb-8 overflow-hidden rounded-[5px]">
        <a href="blog-details.html" class="block">
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

        // Append the new catalog item to the catalog body
        const hotelbody = document.getElementById("hotelbody");
        hotelbody.appendChild(newHotelItem);
      });
    } else {
      console.error("Data is not an array:", data);
      // Handle the case where data is not an array (e.g., unexpected API response format)
    }
  } catch (error) {
    console.error("Error fetching Hotel data:", error);
    // Handle network errors or other exceptions
  }
};

// Call the function to fetch and display the catalog data
getAllHotel();
