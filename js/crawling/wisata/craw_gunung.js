const displayTestimonials = async () => {
  try {
    const response = await fetch('https://asia-southeast2-pasabar.cloudfunctions.net/GetAll-Crawling');

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (data && Array.isArray(data.data)) {
      const testimonialContainer = document.getElementById('testimonials').querySelector('.swiper-wrapper');

      data.data.forEach(item => {
        const testimonial = document.createElement('div');
        testimonial.classList.add('swiper-slide');
        testimonial.innerHTML = `
          <div class="shadow-testimonial bg-white dark:bg-dark rounded-xl py-[30px] px-4 sm:px-[30px]" style="width: 100%;">
            <span class="inline-block px-4 py-0.5 mb-6 text-xs font-medium leading-loose text-center text-white rounded-[5px] bg-primary">
              ${item.created_at}
            </span>
            <p class="text-body-color dark:text-dark-6 text-base mb-6">
              "${item.full_text}"
            </p>
            <h3 class="font-semibold text-sm text-dark dark:text-white">
              ${item.username}
            </h3>
            <p class="text-xs text-body-secondary">lokasi ${item.location}</p>
          </div>
        `;
        testimonialContainer.appendChild(testimonial);
      });

      // Initialize the Swiper carousel
      new Swiper('.testimonial-carousel', {
        loop: true,
        spaceBetween: 30,
        slidesPerView: 'auto',
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      });
    } else {
      console.error('Data is not in the expected format:', data);
    }
  } catch (error) {
    console.error('Error fetching and displaying testimonials:', error);
  }
};

// Call the function to fetch and display testimonials when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  displayTestimonials();
});