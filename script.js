  /* ── Navbar scroll ── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
    document.getElementById('backTop').classList.toggle('show', window.scrollY > 400);
  });

  /* ── Mobile menu ── */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });

  /* ── Carousel ── */
  const track  = document.getElementById('carouselTrack');
  const slides = track.querySelectorAll('.carousel-slide');
  const dots   = document.getElementById('carouselDots');
  let   current = 0;
  let   timer;

  slides.forEach((_, i) => {
    const d = document.createElement('button');
    d.className = 'dot' + (i === 0 ? ' active' : '');
    d.setAttribute('aria-label', `Ir a la imagen ${i + 1}`);
    d.addEventListener('click', () => goTo(i));
    dots.appendChild(d);
  });

  function goTo(n) {
    slides[current].querySelector('img').style.transform = '';
    current = (n + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === current));
    resetTimer();
  }

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), 4500);
  }

  document.getElementById('prevBtn').addEventListener('click', () => goTo(current - 1));
  document.getElementById('nextBtn').addEventListener('click', () => goTo(current + 1));

  /* Touch swipe */
  let startX = 0;
  track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend',   e => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) goTo(dx < 0 ? current + 1 : current - 1);
  }, { passive: true });

  resetTimer();

  /* ── Scroll reveal ── */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ── Counter animation ── */
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el    = e.target;
      const target = +el.dataset.count;
      const step   = target / 60;
      let   val    = 0;
      const tick   = () => {
        val = Math.min(val + step, target);
        el.textContent = Math.floor(val) + (el.dataset.suffix || (target === 98 ? '%' : '+'));
        if (val < target) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

  /* ── Hero particles ── */
  const container = document.getElementById('particles');
  for (let i = 0; i < 18; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 16 + 4;
    p.style.cssText = `
      width:${size}px;height:${size}px;
      left:${Math.random() * 100}%;
      animation-duration:${Math.random() * 12 + 8}s;
      animation-delay:-${Math.random() * 15}s;
    `;
    container.appendChild(p);
  }

  /* ── Form submit ── */
  document.getElementById('reservationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('.submit-btn');
    const t = translations[currentLang] || translations.es;
    btn.textContent = t.form_success;
    btn.style.background = 'linear-gradient(135deg,#28a745,#20c997)';
    setTimeout(() => {
      btn.textContent = t.form_submit;
      btn.style.background = '';
      this.reset();
    }, 3500);
  });

  /* ── Set min date for date input ── */
  const dateInput = document.getElementById('date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }
  /* ── FAQ accordion ── */
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item   = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const isOpen = item.classList.contains('open');

      /* Close all open items */
      document.querySelectorAll('.faq-item.open').forEach(openItem => {
        openItem.classList.remove('open');
        openItem.querySelector('.faq-answer').style.maxHeight = '0';
        openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      /* Open clicked item if it was closed */
      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ── Language Switcher ── */
  const translations = {
    es: {
      nav_inicio:'Inicio', nav_galeria:'Galería', nav_nosotros:'Nosotros',
      nav_planes:'Planes', nav_contacto:'Contacto', nav_reservar:'📅 Reservar',
      hero_badge:'🌊 Aventuras en el agua desde 2015',
      hero_title_html:'Descubre el mar<br>como <span class="highlight">nunca antes</span>',
      hero_sub:'Excursiones únicas en bote para toda la familia. Paisajes espectaculares, guías expertos y experiencias que recordarás toda la vida.',
      hero_btn_planes:'🗺️ Ver Planes', hero_btn_galeria:'📸 Ver Galería', hero_scroll:'Desliza',
      stat_clientes:'Clientes Felices', stat_anos:'Años de Experiencia',
      stat_rutas:'Rutas Disponibles', stat_satisfaccion:'% Satisfacción',
      gal_tag:'📸 Galería', gal_title_html:'Momentos que <span>inspiran</span>',
      gal_desc:'Cada excursión es una historia única. Mira lo que vivieron nuestros pasajeros.',
      slide1_label:'🌅 Atardecer', slide1_title:'Tour al Atardecer', slide1_sub:'Vive los colores más espectaculares del cielo',
      slide2_label:'🤿 Snorkel', slide2_title:'Arrecifes de Coral', slide2_sub:'Descubre el mundo submarino lleno de colores',
      slide3_label:'🏝️ Isla Privada', slide3_title:'Playas Secretas', slide3_sub:'Accede a playas que solo conocemos nosotros',
      slide4_label:'👨‍👩‍👧 Familiar', slide4_title:'Diversión para Todos', slide4_sub:'Experiencias diseñadas para toda la familia',
      slide5_label:'🛥️ Aventura', slide5_title:'Aguas Turquesas', slide5_sub:'Navega por aguas de un azul impresionante',
      about_tag:'🧭 Nosotros', about_title_html:'Apasionados por <span>el mar</span>',
      about_desc:'Somos un equipo de navegantes apasionados que desde 2015 ofrecemos experiencias acuáticas únicas, seguras y memorables para todos nuestros viajeros.',
      about_badge_span:'años en el mar',
      feat1_title:'Seguridad Garantizada', feat1_desc:'Botes certificados, chalecos salvavidas y guías con formación de primeros auxilios.',
      feat2_title:'Turismo Responsable', feat2_desc:'Comprometidos con el cuidado del ecosistema marino y las comunidades locales.',
      feat3_title:'Experiencia Personalizada', feat3_desc:'Adaptamos cada excursión a tus necesidades, ya seas aventurero o buscas relax.',
      feat4_title:'Calificación 5 Estrellas', feat4_desc:'Más de 2,500 reseñas positivas en Google, TripAdvisor e Instagram.',
      hl_tag:'✨ Experiencias', hl_title:'¿Por qué elegirnos?', hl_desc:'Todo lo que necesitas para una aventura perfecta en el mar.',
      hl1_title:'Flota Moderna', hl1_desc:'Botes equipados con tecnología de última generación y mantenimiento continuo.',
      hl2_title:'Guías Expertos', hl2_desc:'Nuestros capitanes conocen cada rincón del mar y tienen años de experiencia.',
      hl3_title:'Gastronomía a Bordo', hl3_desc:'Degusta platillos locales frescos mientras navegas por paisajes increíbles.',
      hl4_title:'Fotógrafo Oficial', hl4_desc:'Captura cada momento con nuestro fotógrafo profesional incluido en planes premium.',
      hl5_title:'Rutas Exclusivas', hl5_desc:'15 rutas únicas que incluyen caletas, arrecifes y reservas naturales.',
      hl6_title:'Pago Flexible', hl6_desc:'Acepta tarjetas, transferencias y pagos en cuotas sin interés.',
      pl_tag:'🗺️ Planes', pl_title_html:'Elige tu <span>aventura</span>', pl_desc:'Tenemos el plan perfecto para cada tipo de viajero y ocasión.',
      pl_popular:'⭐ Más Popular',
      pl1_name:'Paseo Básico', pl1_desc:'Ideal para quienes quieren su primera experiencia en el mar. Ruta clásica con paradas en las mejores vistas.',
      pl1_f1:'Duración: 2 horas', pl1_f2:'Hasta 8 personas', pl1_f3:'Chaleco salvavidas incluido', pl1_f4:'Bebidas de bienvenida', pl1_f5:'Guía bilingüe', pl1_unit:'/ persona',
      pl2_name:'Aventura Marina', pl2_desc:'Snorkel en arrecifes de coral, visita a playas secretas y avistamiento de fauna marina en su hábitat natural.',
      pl2_f1:'Duración: 5 horas', pl2_f2:'Hasta 12 personas', pl2_f3:'Equipo de snorkel incluido', pl2_f4:'Almuerzo a bordo', pl2_f5:'Fotógrafo incluido', pl2_f6:'Guía certificado', pl2_unit:'/ persona',
      pl3_name:'Premium Privado', pl3_desc:'Bote exclusivo para tu grupo. Itinerario 100% personalizado, chef a bordo y servicio de primer nivel.',
      pl3_f1:'Día completo (8 horas)', pl3_f2:'Exclusivo para tu grupo', pl3_f3:'Chef y camarero a bordo', pl3_f4:'Itinerario personalizable', pl3_f5:'Fotógrafo profesional', pl3_f6:'Traslados incluidos', pl3_unit:'/ grupo',
      pl4_name:'Atardecer Romántico', pl4_desc:'Ideal para parejas y aniversarios. Navega bajo los colores más espectaculares del cielo con música en vivo.',
      pl4_f1:'Duración: 3 horas', pl4_f2:'Máx. 6 personas', pl4_f3:'Champagne y aperitivos', pl4_f4:'Música en vivo', pl4_f5:'Sesión de fotos', pl4_unit:'/ pareja',
      pl5_name:'Tour Familiar', pl5_desc:'Diseñado para que toda la familia, desde los más pequeños hasta los abuelos, disfruten sin restricciones.',
      pl5_f1:'Duración: 4 horas', pl5_f2:'Hasta 15 personas', pl5_f3:'Actividades para niños', pl5_f4:'Snacks y bebidas', pl5_f5:'Guía infantil especializado', pl5_unit:'/ persona',
      pl6_name:'Eventos Corporativos', pl6_desc:'Team building, lanzamientos de producto y celebraciones empresariales con experiencias únicas en el mar.',
      pl6_f1:'Capacidad: hasta 50 personas', pl6_f2:'Equipamiento audiovisual', pl6_f3:'Catering personalizado', pl6_f4:'Coordinador de eventos', pl6_f5:'Actividades de integración', pl6_unit:'/ evento',
      pl_cta_book:'Reservar ahora →', pl_cta_inquire:'Consultar →', price_from:'Desde $',
      testi_tag:'💬 Testimonios', testi_title:'Lo que dicen nuestros viajeros', testi_desc:'Más de 2,500 familias y aventureros ya vivieron la experiencia.',
      testi1_text:'"Fue la experiencia más increíble de nuestras vacaciones. El guía sabía todo sobre la fauna marina y las fotos quedaron espectaculares. ¡Definitivamente volvemos!"',
      testi2_text:'"Tomamos el plan familiar con nuestros 3 hijos y fue perfecto. Los niños disfrutaron al máximo, el equipo fue muy atento y el almuerzo delicioso. 100% recomendado."',
      testi3_text:'"Le propuse matrimonio a mi novia durante el tour de atardecer. El equipo organizó todo en secreto: flores, champagne y música. Fue un momento mágico e irrepetible."',
      social_title:'🌐 Síguenos en Redes Sociales', social_desc:'Comparte tu aventura y etiquétanos. ¡Tu foto puede aparecer en nuestra galería!',
      faq_tag:'❓ FAQ', faq_title_html:'Preguntas <span>Frecuentes</span>', faq_desc:'Todo lo que necesitas saber antes de embarcarte en tu aventura.',
      faq1_q:'¿Qué incluye el precio de cada plan?', faq1_a:'El precio incluye el traslado en bote, guía especializado, equipo de seguridad (salvavidas, botiquín), y seguro de excursión. Según el plan elegido pueden incluirse también snorkel, almuerzo a bordo, bebidas y fotografías profesionales. Consulta los detalles en la sección de Planes.',
      faq2_q:'¿Cuántas personas pueden ir en el bote?', faq2_a:'La capacidad varía por plan: los paseos básicos y tours familiares admiten hasta 12 personas, el plan Premium Privado está pensado para parejas o grupos de hasta 6 personas, y el plan Corporativo puede gestionar grupos de hasta 50 personas con embarcaciones adicionales según disponibilidad.',
      faq3_q:'¿Qué sucede si el clima es desfavorable el día de la excursión?', faq3_a:'La seguridad de nuestros pasajeros es la prioridad. Si las condiciones climáticas no son seguras (vientos fuertes, tormenta o mar agitado), cancelamos o reprogramamos la excursión sin costo adicional. Te notificaremos con al menos 2 horas de anticipación y ofreceremos una nueva fecha disponible o el reembolso completo.',
      faq4_q:'¿Con cuánta anticipación debo reservar?', faq4_a:'Recomendamos reservar con al menos 48 horas de anticipación para garantizar disponibilidad, especialmente en temporada alta (verano y fines de semana). Para eventos corporativos o grupos grandes, sugerimos reservar con al menos 2 semanas de anticipación. Las reservas de último momento están sujetas a disponibilidad.',
      faq5_q:'¿Se permiten niños a bordo?', faq5_a:'¡Por supuesto! Los niños son bienvenidos en todos nuestros planes. Los menores de 3 años no pagan pasaje. Para niños menores de 12 años se requiere acompañamiento de un adulto responsable. Contamos con chalecos salvavidas en todas las tallas y nuestros guías están capacitados para atender a familias con niños pequeños.',
      faq6_q:'¿Qué debo llevar para la excursión?', faq6_a:'Te recomendamos llevar: protector solar resistente al agua, gafas de sol, gorra o sombrero, ropa ligera y cómoda, traje de baño (si planeas nadar), toalla, calzado antideslizante y agua extra. Para el tour de atardecer, una ligera chaqueta puede ser útil. El equipo de snorkel se proporciona en los planes que lo incluyen.',
      faq7_q:'¿Aceptan pagos con tarjeta de crédito?', faq7_a:'Aceptamos pagos en efectivo, transferencia bancaria y tarjetas de crédito/débito (Visa, Mastercard, American Express). Para reservar, solicitamos un anticipo del 30% y el saldo restante se cubre el día de la excursión. También puedes pagar el total por adelantado con un descuento especial del 5%.',
      faq8_q:'¿Puedo cancelar o reprogramar mi reserva?', faq8_a:'Sí. Las cancelaciones realizadas con más de 48 horas de anticipación reciben reembolso completo del anticipo. Las cancelaciones entre 24 y 48 horas reciben el 50% del anticipo. Cancelaciones con menos de 24 horas no son reembolsables, aunque puedes reprogramar tu fecha sin costo adicional. Contáctanos por WhatsApp para gestionar tu cambio.',
      contact_tag:'📬 Contacto', contact_title_html:'¿Listo para tu <span>aventura?</span>',
      contact_desc:'Reserva tu excursión hoy mismo o escríbenos con cualquier pregunta. ¡Respondemos en menos de 2 horas!',
      contact_loc_label:'Ubicación', contact_phone_label:'Teléfono / WhatsApp', contact_email_label:'Email',
      contact_hours_label:'Horario de Atención', contact_hours_val:'Lun–Dom, 7:00 am – 7:00 pm',
      form_title:'📅 Solicitar Reserva', form_fname:'Nombre *', form_fname_ph:'Tu nombre',
      form_lname:'Apellido *', form_lname_ph:'Tu apellido', form_email:'Correo electrónico *',
      form_phone:'WhatsApp / Teléfono', form_plan:'Plan de interés *', form_plan_opt:'Selecciona un plan',
      form_date:'Fecha deseada *', form_guests:'Número de personas', form_guests_ph:'¿Cuántos van?',
      form_message:'Comentarios o preguntas', form_message_ph:'Cuéntanos qué necesitas...',
      form_submit:'🚀 Enviar Solicitud', form_success:'✅ ¡Solicitud Enviada!',
      footer_brand_desc:'Desde 2015 creando experiencias acuáticas únicas e inolvidables para aventureros de todo el mundo.',
      footer_explore:'Explorar', footer_plans:'Planes', footer_social:'Redes',
      footer_copy:'© 2025 ExcursionBotes. Todos los derechos reservados.',
      footer_made:'Hecho con 💙 y', footer_sea:'mucho mar',
      aria_menu:'Menú', aria_prev:'Anterior', aria_next:'Siguiente', aria_whatsapp:'WhatsApp', aria_backtop:'Volver arriba'
    },
    en: {
      nav_inicio:'Home', nav_galeria:'Gallery', nav_nosotros:'About Us',
      nav_planes:'Plans', nav_contacto:'Contact', nav_reservar:'📅 Book Now',
      hero_badge:'🌊 Water Adventures since 2015',
      hero_title_html:'Discover the sea<br>like <span class="highlight">never before</span>',
      hero_sub:'Unique boat excursions for the whole family. Spectacular scenery, expert guides and experiences you\'ll remember forever.',
      hero_btn_planes:'🗺️ See Plans', hero_btn_galeria:'📸 View Gallery', hero_scroll:'Scroll',
      stat_clientes:'Happy Customers', stat_anos:'Years of Experience',
      stat_rutas:'Available Routes', stat_satisfaccion:'% Satisfaction',
      gal_tag:'📸 Gallery', gal_title_html:'Moments that <span>inspire</span>',
      gal_desc:'Every excursion is a unique story. See what our passengers experienced.',
      slide1_label:'🌅 Sunset', slide1_title:'Sunset Tour', slide1_sub:'Experience the most spectacular colors of the sky',
      slide2_label:'🤿 Snorkel', slide2_title:'Coral Reefs', slide2_sub:'Discover the colorful underwater world',
      slide3_label:'🏝️ Private Island', slide3_title:'Secret Beaches', slide3_sub:'Access beaches only we know about',
      slide4_label:'👨‍👩‍👧 Family', slide4_title:'Fun for Everyone', slide4_sub:'Experiences designed for the whole family',
      slide5_label:'🛥️ Adventure', slide5_title:'Turquoise Waters', slide5_sub:'Sail through impressively blue waters',
      about_tag:'🧭 About Us', about_title_html:'Passionate about <span>the sea</span>',
      about_desc:'We are a team of passionate sailors who since 2015 have offered unique, safe and memorable aquatic experiences for all our travelers.',
      about_badge_span:'years at sea',
      feat1_title:'Guaranteed Safety', feat1_desc:'Certified boats, life jackets and guides with first aid training.',
      feat2_title:'Responsible Tourism', feat2_desc:'Committed to caring for the marine ecosystem and local communities.',
      feat3_title:'Personalized Experience', feat3_desc:'We tailor each excursion to your needs, whether you seek adventure or relaxation.',
      feat4_title:'5-Star Rating', feat4_desc:'More than 2,500 positive reviews on Google, TripAdvisor and Instagram.',
      hl_tag:'✨ Experiences', hl_title:'Why choose us?', hl_desc:'Everything you need for a perfect adventure at sea.',
      hl1_title:'Modern Fleet', hl1_desc:'Boats equipped with state-of-the-art technology and continuous maintenance.',
      hl2_title:'Expert Guides', hl2_desc:'Our captains know every corner of the sea and have years of experience.',
      hl3_title:'On-Board Gastronomy', hl3_desc:'Taste fresh local dishes while sailing through incredible landscapes.',
      hl4_title:'Official Photographer', hl4_desc:'Capture every moment with our professional photographer included in premium plans.',
      hl5_title:'Exclusive Routes', hl5_desc:'15 unique routes including coves, reefs and nature reserves.',
      hl6_title:'Flexible Payment', hl6_desc:'Accepts cards, bank transfers and interest-free installment payments.',
      pl_tag:'🗺️ Plans', pl_title_html:'Choose your <span>adventure</span>', pl_desc:'We have the perfect plan for every type of traveler and occasion.',
      pl_popular:'⭐ Most Popular',
      pl1_name:'Basic Tour', pl1_desc:'Ideal for those who want their first experience at sea. Classic route with stops at the best views.',
      pl1_f1:'Duration: 2 hours', pl1_f2:'Up to 8 people', pl1_f3:'Life jacket included', pl1_f4:'Welcome drinks', pl1_f5:'Bilingual guide', pl1_unit:'/ person',
      pl2_name:'Marine Adventure', pl2_desc:'Snorkeling on coral reefs, visits to secret beaches and sighting of marine wildlife in their natural habitat.',
      pl2_f1:'Duration: 5 hours', pl2_f2:'Up to 12 people', pl2_f3:'Snorkel equipment included', pl2_f4:'Lunch on board', pl2_f5:'Photographer included', pl2_f6:'Certified guide', pl2_unit:'/ person',
      pl3_name:'Private Premium', pl3_desc:'Exclusive boat for your group. 100% personalized itinerary, on-board chef and first-class service.',
      pl3_f1:'Full day (8 hours)', pl3_f2:'Exclusive for your group', pl3_f3:'Chef and waiter on board', pl3_f4:'Customizable itinerary', pl3_f5:'Professional photographer', pl3_f6:'Transfers included', pl3_unit:'/ group',
      pl4_name:'Romantic Sunset', pl4_desc:'Ideal for couples and anniversaries. Sail under the most spectacular colors of the sky with live music.',
      pl4_f1:'Duration: 3 hours', pl4_f2:'Max. 6 people', pl4_f3:'Champagne and appetizers', pl4_f4:'Live music', pl4_f5:'Photo session', pl4_unit:'/ couple',
      pl5_name:'Family Tour', pl5_desc:'Designed so the whole family, from the youngest to grandparents, can enjoy without restrictions.',
      pl5_f1:'Duration: 4 hours', pl5_f2:'Up to 15 people', pl5_f3:'Children\'s activities', pl5_f4:'Snacks and drinks', pl5_f5:'Specialized children\'s guide', pl5_unit:'/ person',
      pl6_name:'Corporate Events', pl6_desc:'Team building, product launches and corporate celebrations with unique experiences at sea.',
      pl6_f1:'Capacity: up to 50 people', pl6_f2:'Audiovisual equipment', pl6_f3:'Personalized catering', pl6_f4:'Event coordinator', pl6_f5:'Team-building activities', pl6_unit:'/ event',
      pl_cta_book:'Book now →', pl_cta_inquire:'Inquire →', price_from:'From $',
      testi_tag:'💬 Testimonials', testi_title:'What our travelers say', testi_desc:'More than 2,500 families and adventurers have already lived the experience.',
      testi1_text:'"It was the most incredible experience of our vacation. The guide knew everything about marine wildlife and the photos were spectacular. We\'ll definitely be back!"',
      testi2_text:'"We took the family plan with our 3 kids and it was perfect. The children had a great time, the team was very attentive and the lunch was delicious. 100% recommended."',
      testi3_text:'"I proposed to my girlfriend during the sunset tour. The team arranged everything in secret: flowers, champagne and music. It was a magical and unforgettable moment."',
      social_title:'🌐 Follow Us on Social Media', social_desc:'Share your adventure and tag us. Your photo could appear in our gallery!',
      faq_tag:'❓ FAQ', faq_title_html:'Frequently <span>Asked Questions</span>', faq_desc:'Everything you need to know before embarking on your adventure.',
      faq1_q:'What does the price of each plan include?', faq1_a:'The price includes boat transportation, specialized guide, safety equipment (life jackets, first aid kit), and excursion insurance. Depending on the plan chosen, snorkel equipment, on-board lunch, drinks and professional photos may also be included. Check the details in the Plans section.',
      faq2_q:'How many people can go on the boat?', faq2_a:'Capacity varies by plan: basic tours and family tours accommodate up to 12 people, the Private Premium plan is designed for couples or groups of up to 6 people, and the Corporate plan can handle groups of up to 50 people with additional vessels based on availability.',
      faq3_q:'What happens if the weather is unfavorable on the day of the excursion?', faq3_a:'The safety of our passengers is the priority. If weather conditions are not safe (strong winds, storms or rough seas), we cancel or reschedule the excursion at no additional cost. We will notify you with at least 2 hours\' notice and offer a new available date or a full refund.',
      faq4_q:'How far in advance should I book?', faq4_a:'We recommend booking at least 48 hours in advance to ensure availability, especially during peak season (summer and weekends). For corporate events or large groups, we suggest booking at least 2 weeks in advance. Last-minute reservations are subject to availability.',
      faq5_q:'Are children allowed on board?', faq5_a:'Absolutely! Children are welcome on all our plans. Children under 3 years old do not pay. Children under 12 years old must be accompanied by a responsible adult. We have life jackets in all sizes and our guides are trained to work with families with young children.',
      faq6_q:'What should I bring for the excursion?', faq6_a:'We recommend bringing: water-resistant sunscreen, sunglasses, cap or hat, light and comfortable clothing, swimsuit (if you plan to swim), towel, non-slip footwear and extra water. For the sunset tour, a light jacket may be useful. Snorkel equipment is provided in plans that include it.',
      faq7_q:'Do you accept credit card payments?', faq7_a:'We accept cash, bank transfer and credit/debit cards (Visa, Mastercard, American Express). To book, we require a 30% deposit and the remaining balance is paid on the day of the excursion. You can also pay the total in advance with a special 5% discount.',
      faq8_q:'Can I cancel or reschedule my reservation?', faq8_a:'Yes. Cancellations made more than 48 hours in advance receive a full refund of the deposit. Cancellations between 24 and 48 hours receive 50% of the deposit. Cancellations less than 24 hours in advance are non-refundable, although you can reschedule your date at no additional cost. Contact us via WhatsApp to manage your change.',
      contact_tag:'📬 Contact', contact_title_html:'Ready for your <span>adventure?</span>',
      contact_desc:'Book your excursion today or write to us with any questions. We respond in less than 2 hours!',
      contact_loc_label:'Location', contact_phone_label:'Phone / WhatsApp', contact_email_label:'Email',
      contact_hours_label:'Opening Hours', contact_hours_val:'Mon–Sun, 7:00 am – 7:00 pm',
      form_title:'📅 Request a Reservation', form_fname:'First Name *', form_fname_ph:'Your first name',
      form_lname:'Last Name *', form_lname_ph:'Your last name', form_email:'Email address *',
      form_phone:'WhatsApp / Phone', form_plan:'Plan of interest *', form_plan_opt:'Select a plan',
      form_date:'Desired date *', form_guests:'Number of people', form_guests_ph:'How many are going?',
      form_message:'Comments or questions', form_message_ph:'Tell us what you need...',
      form_submit:'🚀 Send Request', form_success:'✅ Request Sent!',
      footer_brand_desc:'Since 2015 creating unique and unforgettable aquatic experiences for adventurers from around the world.',
      footer_explore:'Explore', footer_plans:'Plans', footer_social:'Social',
      footer_copy:'© 2025 ExcursionBotes. All rights reserved.',
      footer_made:'Made with 💙 and', footer_sea:'lots of sea',
      aria_menu:'Menu', aria_prev:'Previous', aria_next:'Next', aria_whatsapp:'WhatsApp', aria_backtop:'Back to top'
    },
    fr: {
      nav_inicio:'Accueil', nav_galeria:'Galerie', nav_nosotros:'À propos',
      nav_planes:'Forfaits', nav_contacto:'Contact', nav_reservar:'📅 Réserver',
      hero_badge:'🌊 Aventures aquatiques depuis 2015',
      hero_title_html:'Découvrez la mer<br>comme <span class="highlight">jamais auparavant</span>',
      hero_sub:'Des excursions en bateau uniques pour toute la famille. Des paysages spectaculaires, des guides experts et des expériences dont vous vous souviendrez toute votre vie.',
      hero_btn_planes:'🗺️ Voir les Forfaits', hero_btn_galeria:'📸 Voir la Galerie', hero_scroll:'Défiler',
      stat_clientes:'Clients Satisfaits', stat_anos:'Années d\'Expérience',
      stat_rutas:'Itinéraires Disponibles', stat_satisfaccion:'% Satisfaction',
      gal_tag:'📸 Galerie', gal_title_html:'Des moments qui <span>inspirent</span>',
      gal_desc:'Chaque excursion est une histoire unique. Découvrez ce que nos passagers ont vécu.',
      slide1_label:'🌅 Coucher de Soleil', slide1_title:'Tour au Coucher du Soleil', slide1_sub:'Vivez les couleurs les plus spectaculaires du ciel',
      slide2_label:'🤿 Snorkeling', slide2_title:'Récifs Coralliens', slide2_sub:'Découvrez le monde sous-marin plein de couleurs',
      slide3_label:'🏝️ Île Privée', slide3_title:'Plages Secrètes', slide3_sub:'Accédez à des plages que nous sommes les seuls à connaître',
      slide4_label:'👨‍👩‍👧 Familial', slide4_title:'Fun pour Tous', slide4_sub:'Des expériences conçues pour toute la famille',
      slide5_label:'🛥️ Aventure', slide5_title:'Eaux Turquoise', slide5_sub:'Naviguez sur des eaux d\'un bleu impressionnant',
      about_tag:'🧭 À propos', about_title_html:'Passionnés par <span>la mer</span>',
      about_desc:'Nous sommes une équipe de navigateurs passionnés qui depuis 2015 offrons des expériences aquatiques uniques, sûres et mémorables à tous nos voyageurs.',
      about_badge_span:'ans en mer',
      feat1_title:'Sécurité Garantie', feat1_desc:'Bateaux certifiés, gilets de sauvetage et guides formés aux premiers secours.',
      feat2_title:'Tourisme Responsable', feat2_desc:'Engagés dans la protection de l\'écosystème marin et des communautés locales.',
      feat3_title:'Expérience Personnalisée', feat3_desc:'Nous adaptons chaque excursion à vos besoins, que vous recherchiez l\'aventure ou la détente.',
      feat4_title:'Note 5 Étoiles', feat4_desc:'Plus de 2 500 avis positifs sur Google, TripAdvisor et Instagram.',
      hl_tag:'✨ Expériences', hl_title:'Pourquoi nous choisir ?', hl_desc:'Tout ce dont vous avez besoin pour une aventure parfaite en mer.',
      hl1_title:'Flotte Moderne', hl1_desc:'Bateaux équipés de la technologie de dernière génération et d\'un entretien continu.',
      hl2_title:'Guides Experts', hl2_desc:'Nos capitaines connaissent chaque recoin de la mer et ont des années d\'expérience.',
      hl3_title:'Gastronomie à Bord', hl3_desc:'Dégustez des plats locaux frais tout en naviguant dans des paysages incroyables.',
      hl4_title:'Photographe Officiel', hl4_desc:'Capturez chaque moment avec notre photographe professionnel inclus dans les forfaits premium.',
      hl5_title:'Itinéraires Exclusifs', hl5_desc:'15 itinéraires uniques incluant des criques, récifs et réserves naturelles.',
      hl6_title:'Paiement Flexible', hl6_desc:'Accepte les cartes, virements bancaires et paiements en plusieurs fois sans intérêts.',
      pl_tag:'🗺️ Forfaits', pl_title_html:'Choisissez votre <span>aventure</span>', pl_desc:'Nous avons le forfait parfait pour chaque type de voyageur et occasion.',
      pl_popular:'⭐ Le Plus Populaire',
      pl1_name:'Promenade Basique', pl1_desc:'Idéal pour ceux qui veulent leur première expérience en mer. Itinéraire classique avec arrêts aux meilleures vues.',
      pl1_f1:'Durée : 2 heures', pl1_f2:'Jusqu\'à 8 personnes', pl1_f3:'Gilet de sauvetage inclus', pl1_f4:'Boissons de bienvenue', pl1_f5:'Guide bilingue', pl1_unit:'/ personne',
      pl2_name:'Aventure Marine', pl2_desc:'Snorkeling sur des récifs coralliens, visite de plages secrètes et observation de la faune marine dans son habitat naturel.',
      pl2_f1:'Durée : 5 heures', pl2_f2:'Jusqu\'à 12 personnes', pl2_f3:'Équipement de snorkeling inclus', pl2_f4:'Déjeuner à bord', pl2_f5:'Photographe inclus', pl2_f6:'Guide certifié', pl2_unit:'/ personne',
      pl3_name:'Premium Privé', pl3_desc:'Bateau exclusif pour votre groupe. Itinéraire 100% personnalisé, chef à bord et service de premier ordre.',
      pl3_f1:'Journée complète (8 heures)', pl3_f2:'Exclusif pour votre groupe', pl3_f3:'Chef et serveur à bord', pl3_f4:'Itinéraire personnalisable', pl3_f5:'Photographe professionnel', pl3_f6:'Transferts inclus', pl3_unit:'/ groupe',
      pl4_name:'Coucher de Soleil Romantique', pl4_desc:'Idéal pour les couples et les anniversaires. Naviguez sous les couleurs les plus spectaculaires du ciel avec de la musique live.',
      pl4_f1:'Durée : 3 heures', pl4_f2:'Max. 6 personnes', pl4_f3:'Champagne et amuse-bouches', pl4_f4:'Musique live', pl4_f5:'Séance photo', pl4_unit:'/ couple',
      pl5_name:'Tour Familial', pl5_desc:'Conçu pour que toute la famille, des plus petits aux grands-parents, profite sans restrictions.',
      pl5_f1:'Durée : 4 heures', pl5_f2:'Jusqu\'à 15 personnes', pl5_f3:'Activités pour enfants', pl5_f4:'Collations et boissons', pl5_f5:'Guide spécialisé pour enfants', pl5_unit:'/ personne',
      pl6_name:'Événements Corporatifs', pl6_desc:'Team building, lancements de produits et célébrations d\'entreprise avec des expériences uniques en mer.',
      pl6_f1:'Capacité : jusqu\'à 50 personnes', pl6_f2:'Équipement audiovisuel', pl6_f3:'Traiteur personnalisé', pl6_f4:'Coordinateur d\'événements', pl6_f5:'Activités d\'intégration', pl6_unit:'/ événement',
      pl_cta_book:'Réserver →', pl_cta_inquire:'Demander →', price_from:'Dès $',
      testi_tag:'💬 Témoignages', testi_title:'Ce que disent nos voyageurs', testi_desc:'Plus de 2 500 familles et aventuriers ont déjà vécu l\'expérience.',
      testi1_text:'"C\'était l\'expérience la plus incroyable de nos vacances. Le guide savait tout sur la faune marine et les photos étaient spectaculaires. On reviendra certainement !"',
      testi2_text:'"Nous avons pris le forfait familial avec nos 3 enfants et c\'était parfait. Les enfants ont adoré, l\'équipe était très attentionnée et le déjeuner délicieux. 100% recommandé."',
      testi3_text:'"J\'ai demandé ma petite amie en mariage pendant le tour au coucher du soleil. L\'équipe a tout organisé en secret : fleurs, champagne et musique. C\'était un moment magique et inoubliable."',
      social_title:'🌐 Suivez-nous sur les Réseaux Sociaux', social_desc:'Partagez votre aventure et identifiez-nous. Votre photo pourrait apparaître dans notre galerie !',
      faq_tag:'❓ FAQ', faq_title_html:'Questions <span>Fréquentes</span>', faq_desc:'Tout ce que vous devez savoir avant de vous embarquer dans votre aventure.',
      faq1_q:'Qu\'est-ce qui est inclus dans le prix de chaque forfait ?', faq1_a:'Le prix comprend le transport en bateau, un guide spécialisé, l\'équipement de sécurité (gilets de sauvetage, trousse de premiers secours) et l\'assurance excursion. Selon le forfait choisi, le matériel de snorkeling, le déjeuner à bord, les boissons et les photos professionnelles peuvent également être inclus. Consultez les détails dans la section Forfaits.',
      faq2_q:'Combien de personnes peuvent monter à bord ?', faq2_a:'La capacité varie selon le forfait : les promenades basiques et les tours familiaux accueillent jusqu\'à 12 personnes, le forfait Premium Privé est conçu pour les couples ou groupes de 6 personnes maximum, et le forfait Corporatif peut gérer des groupes jusqu\'à 50 personnes avec des embarcations supplémentaires selon disponibilité.',
      faq3_q:'Que se passe-t-il si la météo est mauvaise le jour de l\'excursion ?', faq3_a:'La sécurité de nos passagers est la priorité. Si les conditions météorologiques ne sont pas sûres (vents forts, tempête ou mer agitée), nous annulons ou reprogrammons l\'excursion sans frais supplémentaires. Nous vous informerons au moins 2 heures à l\'avance et proposerons une nouvelle date disponible ou un remboursement complet.',
      faq4_q:'Combien de temps à l\'avance dois-je réserver ?', faq4_a:'Nous recommandons de réserver au moins 48 heures à l\'avance pour garantir la disponibilité, surtout en haute saison (été et week-ends). Pour les événements corporatifs ou les grands groupes, nous suggérons de réserver au moins 2 semaines à l\'avance. Les réservations de dernière minute sont soumises à disponibilité.',
      faq5_q:'Les enfants sont-ils autorisés à bord ?', faq5_a:'Absolument ! Les enfants sont les bienvenus dans tous nos forfaits. Les enfants de moins de 3 ans ne paient pas. Les enfants de moins de 12 ans doivent être accompagnés d\'un adulte responsable. Nous disposons de gilets de sauvetage dans toutes les tailles et nos guides sont formés pour accueillir des familles avec de jeunes enfants.',
      faq6_q:'Que dois-je apporter pour l\'excursion ?', faq6_a:'Nous recommandons d\'apporter : de la crème solaire résistante à l\'eau, des lunettes de soleil, une casquette ou un chapeau, des vêtements légers et confortables, un maillot de bain (si vous prévoyez de nager), une serviette, des chaussures antidérapantes et de l\'eau supplémentaire. Pour le tour au coucher du soleil, une légère veste peut être utile. L\'équipement de snorkeling est fourni dans les forfaits qui l\'incluent.',
      faq7_q:'Acceptez-vous les paiements par carte de crédit ?', faq7_a:'Nous acceptons les paiements en espèces, par virement bancaire et par cartes de crédit/débit (Visa, Mastercard, American Express). Pour réserver, nous demandons un acompte de 30% et le solde restant est réglé le jour de l\'excursion. Vous pouvez également payer la totalité à l\'avance avec une remise spéciale de 5%.',
      faq8_q:'Puis-je annuler ou reprogrammer ma réservation ?', faq8_a:'Oui. Les annulations effectuées plus de 48 heures à l\'avance bénéficient d\'un remboursement complet de l\'acompte. Les annulations entre 24 et 48 heures reçoivent 50% de l\'acompte. Les annulations moins de 24 heures à l\'avance ne sont pas remboursables, mais vous pouvez reprogrammer votre date sans frais supplémentaires. Contactez-nous via WhatsApp pour gérer votre modification.',
      contact_tag:'📬 Contact', contact_title_html:'Prêt pour votre <span>aventure ?</span>',
      contact_desc:'Réservez votre excursion dès aujourd\'hui ou écrivez-nous pour toute question. Nous répondons en moins de 2 heures !',
      contact_loc_label:'Localisation', contact_phone_label:'Téléphone / WhatsApp', contact_email_label:'E-mail',
      contact_hours_label:'Heures d\'Ouverture', contact_hours_val:'Lun–Dim, 7h00 – 19h00',
      form_title:'📅 Demande de Réservation', form_fname:'Prénom *', form_fname_ph:'Votre prénom',
      form_lname:'Nom *', form_lname_ph:'Votre nom', form_email:'Adresse e-mail *',
      form_phone:'WhatsApp / Téléphone', form_plan:'Forfait souhaité *', form_plan_opt:'Choisissez un forfait',
      form_date:'Date souhaitée *', form_guests:'Nombre de personnes', form_guests_ph:'Combien de personnes ?',
      form_message:'Commentaires ou questions', form_message_ph:'Dites-nous ce dont vous avez besoin...',
      form_submit:'🚀 Envoyer la Demande', form_success:'✅ Demande Envoyée !',
      footer_brand_desc:'Depuis 2015, nous créons des expériences aquatiques uniques et inoubliables pour les aventuriers du monde entier.',
      footer_explore:'Explorer', footer_plans:'Forfaits', footer_social:'Réseaux',
      footer_copy:'© 2025 ExcursionBotes. Tous droits réservés.',
      footer_made:'Fait avec 💙 et', footer_sea:'beaucoup de mer',
      aria_menu:'Menu', aria_prev:'Précédent', aria_next:'Suivant', aria_whatsapp:'WhatsApp', aria_backtop:'Retour en haut'
    }
  };

  let currentLang = localStorage.getItem('lang') || 'es';

  function applyTranslations(lang) {
    const t = translations[lang];
    if (!t) return;
    document.documentElement.lang = lang;
    const applyAttr = (attr, setter) =>
      document.querySelectorAll('[' + attr + ']').forEach(el => {
        const val = t[el.getAttribute(attr)];
        if (val !== undefined) setter(el, val);
      });
    applyAttr('data-i18n',             (el, v) => { el.textContent = v; });
    applyAttr('data-i18n-html',        (el, v) => { el.innerHTML   = v; });
    applyAttr('data-i18n-placeholder', (el, v) => { el.placeholder = v; });
    applyAttr('data-i18n-aria',        (el, v) => { el.setAttribute('aria-label', v); });
    document.querySelectorAll('.lang-option').forEach(opt => {
      opt.classList.toggle('active', opt.dataset.lang === lang);
      opt.setAttribute('aria-selected', opt.dataset.lang === lang);
    });
    const active = document.querySelector('.lang-option.active');
    if (active) {
      const flag = active.dataset.flag;
      const label = active.dataset.label;
      document.getElementById('langFlag').src = `https://flagcdn.com/w40/${flag}.png`;
      document.getElementById('langFlag').alt = label;
    }
    currentLang = lang;
    localStorage.setItem('lang', lang);
  }

  /* ─── Language Dropdown ──────────────────────────────────── */
  const langDropdown = document.getElementById('langDropdown');
  const langTrigger  = document.getElementById('langTrigger');
  const langPanel    = document.getElementById('langPanel');

  langTrigger.addEventListener('click', () => {
    const isOpen = langDropdown.classList.toggle('open');
    langTrigger.setAttribute('aria-expanded', isOpen);
  });

  langPanel.addEventListener('click', e => {
    const opt = e.target.closest('.lang-option');
    if (!opt) return;
    applyTranslations(opt.dataset.lang);
    langDropdown.classList.remove('open');
    langTrigger.setAttribute('aria-expanded', 'false');
  });

  document.addEventListener('click', e => {
    if (!langDropdown.contains(e.target)) {
      langDropdown.classList.remove('open');
      langTrigger.setAttribute('aria-expanded', 'false');
    }
  });

  /* Apply saved/default language on load */
  applyTranslations(currentLang);
