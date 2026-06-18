/* ==========================================================================
   GOOBA EXPORT LLP - INTERACTIVE WEB LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollReveal();
  initStatsCounter();
  initProductModal();
  initContactForm();
});

/* ==========================================================================
   NAVBAR & MOBILE MENU
   ========================================================================== */
function initNavbar() {
  const header = document.querySelector('.header');
  const burgerMenu = document.querySelector('.burger-menu');
  const navLinks = document.querySelector('.nav-links');
  const navItems = document.querySelectorAll('.nav-links a');

  // Sticky header transition on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  });

  // Mobile menu toggling
  if (burgerMenu && navLinks) {
    burgerMenu.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      
      // Animate burger menu lines
      const spans = burgerMenu.querySelectorAll('span');
      if (navLinks.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
  }

  // Close mobile menu when a nav link is clicked
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        const spans = burgerMenu.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
  });
}

/* ==========================================================================
   SCROLL REVEAL (INTERSECTION OBSERVER)
   ========================================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Animate only once
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });
}

/* ==========================================================================
   STATISTICS COUNTER ANIMATION
   ========================================================================== */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');

  const animateCounter = (element) => {
    const targetValueStr = element.getAttribute('data-target');
    const suffix = element.getAttribute('data-suffix') || '';
    const duration = 2000; // 2 seconds
    const startTime = performance.now();

    // Check if the target is a text block instead of a number
    if (isNaN(parseInt(targetValueStr, 10))) {
      element.innerHTML = `${targetValueStr}<span>${suffix}</span>`;
      return;
    }

    const target = parseInt(targetValueStr, 10);

    const updateCounter = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      
      // Easing out quadratic function
      const easeProgress = progress * (2 - progress);
      const currentValue = Math.floor(easeProgress * target);
      
      // Format big numbers
      if (currentValue >= 1000000) {
        element.innerHTML = `${(currentValue / 1000000).toFixed(1)}M<span>${suffix}</span>`;
      } else if (currentValue >= 10000) {
        element.innerHTML = `${(currentValue / 1000).toFixed(0)}k<span>${suffix}</span>`;
      } else {
        element.innerHTML = `${currentValue}<span>${suffix}</span>`;
      }

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        // Ensure exact final number formatting
        if (target >= 1000000) {
          element.innerHTML = `1M<span>${suffix}</span>`;
        } else if (target >= 95000) {
          element.innerHTML = `95k<span>${suffix}</span>`;
        } else {
          element.innerHTML = `${target}<span>${suffix}</span>`;
        }
      }
    };

    requestAnimationFrame(updateCounter);
  };

  const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5
  });

  statNumbers.forEach(num => {
    statsObserver.observe(num);
  });
}

/* ==========================================================================
   PRODUCT DETAILS MODAL DATABASE
   ========================================================================== */
const PRODUCT_DATA = {
  'cow-dung-cakes': {
    name: 'Premium Cow Dung Cakes',
    category: 'Eco-Friendly Cultural Products',
    org: 'Standard Packaging & Custom Sizes Available',
    img: 'https://innohealth.in/2025/wp-content/uploads/sites/2/2025/09/VECTOR-MASCOT-2-scaled.png', // Fallback or placeholder visual
    bio: 'Our Cow Dung Cakes are processed naturally under strict hygiene and moisture controls. Prepared by blending raw cow dung with dry organic crop husks, they are pressed into uniform shapes and solar-dried to reduce moisture. They burn cleanly with minimal smoke emission. Ideal for cultural rituals, hawan, and eco-friendly rural biomass fuel. Packaged in customized corrugated boxes to prevent transport breakage.'
  },
  'cow-dung-diyas': {
    name: 'Hand-Molded Cow Dung Diyas',
    category: 'Festivals & Corporate Gifting',
    org: '100% Biodegradable & Chemical-Free',
    img: 'https://innohealth.in/2025/wp-content/uploads/sites/2/2025/09/VECTOR-MASCOT-2-scaled.png',
    bio: 'GOOBA Cow Dung Diyas are hand-finished by local rural artisans using fresh organic cow dung, clean clay binders, and natural herbal colors. Completely chemical-free and carbon-neutral, these lamps decompose naturally after use, acting as nutrient-rich manure for gardening soil. Highly demanded in international ethnic markets as sustainable corporate gifts and festival decor.'
  },
  'hawan-products': {
    name: 'Organic Hawan & Ritual Packs',
    category: 'Traditional Lifestyle Goods',
    org: 'Optimized Export Packaging',
    img: 'https://innohealth.in/2025/wp-content/uploads/sites/2/2025/09/VECTOR-MASCOT-2-scaled.png',
    bio: 'A curated selection of authentic Hawan Samagri, natural sambrani cups, and organic incense logs. Handcrafted without synthetic charcoal or chemical fragrances, these products combine cow dung, pure Ghee, medicinal herbs, and natural essential oils. When lit, they release a soot-free cleansing vapor that purifies the air. Packed in moisture-proof, export-grade vacuum bags.'
  },
  'bio-fuel-pellets': {
    name: 'High-Density Bio-Fuel Pellets',
    category: 'Renewable Energy & Biomass',
    org: 'Calorific Value: 3800-4200 Kcal/Kg',
    img: 'https://innohealth.in/2025/wp-content/uploads/sites/2/2025/09/VECTOR-MASCOT-2-scaled.png',
    bio: 'GOOBA Bio-Pellets are compressed cylinders made from refined cow dung and organic agricultural residues. With moisture levels below 8% and dense structure, they offer high combustion efficiency and steady heat release. Designed as a direct coal substitute for industrial boilers, processing plants, and green thermal power grids, helping corporate partners hit Net-Zero goals.'
  },
  'organic-manure': {
    name: 'Organic Manure & Soil Boosters',
    category: 'Sustainable Agriculture',
    org: '100% Pathogen-Free vermicompost',
    img: 'https://innohealth.in/2025/wp-content/uploads/sites/2/2025/09/VECTOR-MASCOT-2-scaled.png',
    bio: 'Our organic manure is a thoroughly decomposed, microbe-rich compost produced through vermicomposting of premium cow dung. Rich in Organic Carbon, Humic acid, and natural slow-release nitrogen, phosphorus, and potassium (NPK), it enhances soil moisture retention, aerates clay soils, and improves root development without chemical runoff. Perfect for organic farming, export crops, and home gardening.'
  },
  'custom-oem': {
    name: 'OEM & Private Label Services',
    category: 'Custom Manufacturing Partner',
    org: 'Full Container Load (FCL) Shipments',
    img: 'https://innohealth.in/2025/wp-content/uploads/sites/2/2025/09/VECTOR-MASCOT-2-scaled.png',
    bio: 'GOOBA Export LLP offers end-to-end custom contract manufacturing for international importers, large retail chains, and green lifestyle brands. Our services include specific size modifications, customized dry herbal blends, custom branded retail packaging, barcode printing, container optimization planning, and hassle-free export trade customs clearance. We serve as a trusted white-label manufacturing partner.'
  }
};

function initProductModal() {
  const productCards = document.querySelectorAll('.speaker-card'); // reusing the class for smooth styles
  const modalOverlay = document.getElementById('speaker-modal'); // reusing the ID for styling
  const modalCloseBtn = modalOverlay?.querySelector('.modal-close');
  
  if (!modalOverlay || !modalCloseBtn) return;

  const openModal = (productId) => {
    const data = PRODUCT_DATA[productId];
    if (!data) return;

    // Populate modal content
    modalOverlay.querySelector('.modal-img').src = 'assets/mascot.svg'; // Use our clean mascot SVG as visual backing
    modalOverlay.querySelector('.modal-img').alt = data.name;
    modalOverlay.querySelector('.modal-name').textContent = data.name;
    modalOverlay.querySelector('.modal-role').textContent = data.category;
    modalOverlay.querySelector('.modal-org').textContent = data.org;
    modalOverlay.querySelector('.modal-bio').innerHTML = data.bio;

    // Show modal with animation
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Lock background scroll
  };

  const closeModal = () => {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = ''; // Release background scroll
  };

  // Add click listener to product cards
  productCards.forEach(card => {
    card.addEventListener('click', () => {
      const productId = card.getAttribute('data-product-id');
      if (productId) openModal(productId);
    });
  });

  // Close on button click
  modalCloseBtn.addEventListener('click', closeModal);

  // Close on clicking outside modal content
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  // Close on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   CONTACT / INQUIRY FORM VALIDATION
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('registration-form'); // Reusing ID for form
  const formSuccess = document.getElementById('form-success');
  
  if (!form || !formSuccess) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Basic Validation
    const nameInput = document.getElementById('form-name');
    const emailInput = document.getElementById('form-email');
    const phoneInput = document.getElementById('form-phone');
    const typeInput = document.getElementById('form-type');

    let isValid = true;

    // Reset styles
    [nameInput, emailInput, phoneInput].forEach(input => {
      input.style.borderBottomColor = '';
    });

    if (!nameInput.value.trim()) {
      nameInput.style.borderBottomColor = 'var(--accent)';
      isValid = false;
    }

    if (!emailInput.value.trim() || !validateEmail(emailInput.value)) {
      emailInput.style.borderBottomColor = 'var(--accent)';
      isValid = false;
    }

    if (!phoneInput.value.trim()) {
      phoneInput.style.borderBottomColor = 'var(--accent)';
      isValid = false;
    }

    if (!isValid) return;

    // If valid, show beautiful success animation/screen
    form.style.opacity = '0';
    form.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
      form.style.display = 'none';
      formSuccess.style.display = 'block';
      
      // Populate details in success screen
      document.getElementById('success-name').textContent = nameInput.value.trim();
      document.getElementById('success-ticket').textContent = 'RQ-' + Math.floor(100000 + Math.random() * 900000);
      
      formSuccess.style.opacity = '0';
      formSuccess.style.transform = 'translateY(10px)';
      
      // Force repaint
      formSuccess.offsetHeight;
      
      formSuccess.style.transition = 'all 0.5s ease';
      formSuccess.style.opacity = '1';
      formSuccess.style.transform = 'translateY(0)';
    }, 400);
  });
}

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

/* ==========================================================================
   WHATSAPP MOCK CHATBOT LOGIC
   ========================================================================== */
function triggerBotOption(type, labelText) {
  const chatBody = document.getElementById('bot-chat-body');
  const optionsDiv = document.getElementById('bot-options');
  if (!chatBody || !optionsDiv) return;

  // Disable options during typing
  optionsDiv.style.pointerEvents = 'none';
  optionsDiv.style.opacity = '0.5';

  // 1. Add user message
  const userMsg = document.createElement('div');
  userMsg.className = 'chat-message user-msg';
  userMsg.innerHTML = `<p>${labelText}</p>`;
  chatBody.appendChild(userMsg);
  chatBody.scrollTop = chatBody.scrollHeight;

  // 2. Add typing indicator
  setTimeout(() => {
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'chat-message typing-indicator';
    typingIndicator.id = 'bot-typing';
    typingIndicator.innerHTML = '<p>GOOBA Support is typing...</p>';
    chatBody.appendChild(typingIndicator);
    chatBody.scrollTop = chatBody.scrollHeight;

    // 3. Add bot reply after delay
    setTimeout(() => {
      // Remove typing indicator
      const typing = document.getElementById('bot-typing');
      if (typing) typing.remove();

      let replyText = '';
      if (type === 'catalog') {
        replyText = "Sure! You can download our latest Product Catalog PDF here: <a href='#portfolio' style='text-decoration:underline; font-weight:600; color:var(--primary);'>GOOBA-Catalog.pdf</a> or click the button below to connect with our WhatsApp support to receive the catalog directly on your phone! 📦";
      } else if (type === 'quote') {
        replyText = "Our bulk FOB price list depends on your required quantities and destination port. 🚢 Click the button below to connect directly with our export desk on WhatsApp to get an instant pricing quote!";
      } else if (type === 'expert') {
        replyText = "An export trade manager is available now. Click the button below to start a live chat on WhatsApp for private label OEM or container shipping queries! 💬";
      }

      const botReply = document.createElement('div');
      botReply.className = 'chat-message bot-msg';
      botReply.innerHTML = `<p>${replyText}</p>`;
      chatBody.appendChild(botReply);
      chatBody.scrollTop = chatBody.scrollHeight;

      // Re-enable options
      optionsDiv.style.pointerEvents = '';
      optionsDiv.style.opacity = '';
    }, 1000); // Typing lasts 1 second
  }, 300); // 300ms pause before typing
}
