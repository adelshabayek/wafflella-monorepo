// ─── Wafflella Translations ────────────────────────────────────────────────────

export type Lang = "en" | "ar";

export const translations = {
  en: {
    // ── Navbar ──
    nav: {
      home: "Home",
      menu: "Menu",
      about: "About",
      contact: "Contact",
      orderNow: "Order Now",
      cart: "Cart",
    },

    // ── Hero ──
    hero: {
      badge: "Premium Desserts",
      headline1: "Every Bite is",
      headline2: "Pure Joy",
      description:
        "Handcrafted waffles, rich chocolate desserts, and premium beverages — all made with the finest ingredients and a whole lot of love.",
      orderNow: "Order Now",
      browseMenu: "Browse Menu",
      stats: [
        { value: "30+", label: "Menu Items" },
        { value: "5★", label: "Rating" },
        { value: "1K+", label: "Happy Customers" },
      ],
      floatingCoffee: "Premium Coffee",
      floatingCoffeeDesc: "Fresh brewed",
      floatingChoco: "Chocolate",
      floatingChocoDesc: "Rich & creamy",
      floatingOffer: "🎉 Special Offers",
      floatingOfferDesc: "Every day!",
      scroll: "Scroll",
    },

    // ── Featured Products ──
    featured: {
      badge: "Chef's Selection",
      title: "Featured Delights",
      description:
        "Handpicked favorites loved by our customers — crafted fresh daily.",
      viewAll: "View Full Menu",
      empty: "No featured items available right now.",
    },

    // ── Categories ──
    categories: {
      badge: "Explore",
      title: "Our Categories",
      description:
        "From golden waffles to rich chocolate — discover our full range of premium desserts.",
    },

    // ── About ──
    about: {
      badge: "Our Story",
      title1: "Born from a",
      titleHighlight: "Passion",
      title2: "for Desserts",
      paragraph1:
        "WAFFLELLA started with a simple dream — to create desserts so good, every bite feels like a celebration. From our signature golden waffles to our decadent chocolate creations, every item on our menu is crafted with the finest ingredients and an obsession with perfection.",
      paragraph2:
        "As a new destination for dessert lovers, we refuse to settle for anything less than extraordinary. We're here to bring a fresh, premium dessert experience to your table.",
      values: [
        {
          title: "Made with Love",
          description:
            "Every dessert is handcrafted with care and passion for creating the perfect bite.",
        },
        {
          title: "Premium Ingredients",
          description:
            "We source only the finest ingredients to ensure the highest quality in every creation.",
        },
        {
          title: "Exceptional Quality",
          description:
            "Our recipes are perfected through experience and a relentless pursuit of excellence.",
        },
        {
          title: "Fresh Daily",
          description:
            "Everything is prepared fresh every morning — never frozen, always delicious.",
        },
      ],
      ratedPremium: "Rated Premium",
      freshTaste: "Fresh Taste",
      premiumDesserts: "Premium Desserts",
    },

    // ── Contact ──
    contact: {
      badge: "Reach Us",
      title: "Let's Connect",
      description:
        "We'd love to hear from you. Order online, give us a call, or find us on social media.",
      phone: "Phone",
      whatsapp: "WhatsApp",
      facebook: "Facebook",
      followFacebook: "Follow on Facebook",
      instagram: "Instagram",
      findOnMaps: "Find us on Google Maps",
      openMaps: "Open in Maps",
    },

    // ── Footer ──
    footer: {
      tagline:
        "Premium desserts crafted with love. Every bite is an experience of quality, taste, and joy.",
      navigation: "Navigation",
      ourMenu: "Our Menu",
      contactUs: "Contact Us",
      findOnMaps: "Find us on Google Maps",
      rights: "All rights reserved.",
      madeWith: "Made by",
      byAdel: "Dev. Adel Shabayek",
    },

    // ── Menu Page ──
    menu: {
      badge: "Full Collection",
      title: "Our Menu",
      description:
        "Every item crafted with premium ingredients — explore our complete collection of desserts and beverages.",
      searchPlaceholder: "Search our menu...",
      allItems: "All Items",
      showingItems: "Showing",
      item: "item",
      items: "items",
      in: "in",
      noResults: "No results found",
      noItems: "No items available",
      noResultsDesc: 'No items match "%s". Try a different search.',
      noItemsDesc: "Check back soon for new additions!",
      clearSearch: "Clear Search",
    },

    // ── Cart ──
    cart: {
      title: "Your Cart",
      items: "items",
      empty: "Your cart is empty",
      emptyDesc: "Add some delicious items from our menu!",
      browseMenu: "Browse Menu",
      total: "Total",
      proceedBtn: "Proceed to Order",
      yourDetails: "Your Details",
      deliverTo: "We'll deliver to your address",
      backToCart: "Back to Cart",
      fullName: "Full Name",
      namePlaceholder: "Ahmed Mohamed",
      phone: "Phone Number",
      phonePlaceholder: "01xxxxxxxxx",
      address: "Delivery Address",
      addressPlaceholder: "Street, Building, Apartment, City...",
      orderSummary: "Order Summary",
      orderViaWhatsapp: "Order via WhatsApp",
      whatsappNote: "You'll be redirected to WhatsApp to confirm your order",
      orderSent: "Order Sent! 🎉",
      orderSentDesc:
        "Your WhatsApp just opened with your full order. Complete the chat to confirm!",
    },
  },

  ar: {
    // ── Navbar ──
    nav: {
      home: "الرئيسية",
      menu: "المنيو",
      about: "من نحن",
      contact: "تواصل معنا",
      orderNow: "اطلب الآن",
      cart: "السلة",
    },

    // ── Hero ──
    hero: {
      badge: "حلويات فاخرة",
      headline1: "كل قضمة",
      headline2: "بهجة خالصة",
      description:
        "وافل محضر بعناية، حلويات شوكولاتة فاخرة، ومشروبات مميزة — كلها مصنوعة بأجود المكونات وبكثير من الحب.",
      orderNow: "اطلب الآن",
      browseMenu: "تصفح المنيو",
      stats: [
        { value: "+50", label: "منتج في المنيو" },
        { value: "5★", label: "تقييمنا" },
        { value: "+1K", label: "عميل سعيد" },
      ],
      floatingCoffee: "قهوة فاخرة",
      floatingCoffeeDesc: "طازجة دائماً",
      floatingChoco: "شوكولاتة",
      floatingChocoDesc: "غنية وكريمية",
      floatingOffer: "🎉 عروض خاصة",
      floatingOfferDesc: "كل يوم!",
      scroll: "مرر للأسفل",
    },

    // ── Featured Products ──
    featured: {
      badge: "اختيارات الشيف",
      title: "أبرز الأطباق",
      description: "أفضل ما لدينا يحبه عملاؤنا — محضر طازج كل يوم.",
      viewAll: "عرض المنيو كاملاً",
      empty: "لا توجد منتجات مميزة متاحة حالياً.",
    },

    // ── Categories ──
    categories: {
      badge: "استكشف",
      title: "أقسامنا",
      description:
        "من الوافل الذهبي إلى الشوكولاتة الغنية — اكتشف مجموعتنا الكاملة من الحلويات الفاخرة.",
    },

    // ── About ──
    about: {
      badge: "قصتنا",
      title1: "وُلدنا من",
      titleHighlight: "شغف",
      title2: "بالحلويات",
      paragraph1:
        "بدأت WAFFLELLA بحلم بسيط — تقديم حلويات لا مثيل لها، تجعل كل قضمة احتفالاً. من وافلنا الذهبي المميز إلى إبداعاتنا بالشوكولاتة الفاخرة، كل منتج في منيونا مصنوع بأجود المكونات وشغف لا يتوقف.",
      paragraph2:
        "كوجهة جديدة لعشاق الحلويات، نحن لا نرضى بأقل من الاستثنائي. نحن هنا لنقدم تجربة حلويات جديدة وفاخرة تليق بك.",
      values: [
        {
          title: "مصنوع بحب",
          description: "كل حلوى تُصنع بعناية وشغف لتقديم أفضل تجربة.",
        },
        {
          title: "مكونات فاخرة",
          description: "نستخدم فقط أجود المكونات لضمان أعلى جودة في كل منتج.",
        },
        {
          title: "جودة استثنائية",
          description: "وصفاتنا تُصقل باستمرار في سعي دؤوب نحو الكمال.",
        },
        {
          title: "طازج يومياً",
          description: "كل شيء يُحضَّر طازجاً كل صباح — لا تجميد، دائماً لذيذ.",
        },
      ],
      ratedPremium: "تقييم ممتاز",
      freshTaste: "طعم طازج",
      premiumDesserts: "حلويات فاخرة",
    },

    // ── Contact ──
    contact: {
      badge: "تواصل معنا",
      title: "نحب نسمع منك",
      description:
        "اطلب أونلاين، اتصل بنا، أو تابعنا على وسائل التواصل الاجتماعي.",
      phone: "هاتف",
      whatsapp: "واتساب",
      facebook: "فيسبوك",
      followFacebook: "تابعنا على فيسبوك",
      instagram: "إنستجرام",
      findOnMaps: "ابحث عنا على خرائط جوجل",
      openMaps: "افتح في الخرائط",
    },

    // ── Footer ──
    footer: {
      tagline:
        "حلويات فاخرة مصنوعة بحب. كل قضمة تجربة من الجودة والطعم والبهجة.",
      navigation: "التنقل",
      ourMenu: "منيونا",
      contactUs: "تواصل معنا",
      findOnMaps: "ابحث عنا على خرائط جوجل",
      rights: "جميع الحقوق محفوظة.",
      madeWith: "صُنع بـ",
      byAdel: "بواسطة عادل شباييك",
    },

    // ── Menu Page ──
    menu: {
      badge: "المجموعة الكاملة",
      title: "منيونا",
      description:
        "كل منتج مصنوع بمكونات فاخرة — استكشف مجموعتنا الكاملة من الحلويات والمشروبات.",
      searchPlaceholder: "ابحث في منيونا...",
      allItems: "الكل",
      showingItems: "عرض",
      item: "منتج",
      items: "منتجات",
      in: "في",
      noResults: "لا توجد نتائج",
      noItems: "لا توجد منتجات متاحة",
      noResultsDesc: 'لا توجد منتجات تطابق "%s". جرب بحثاً آخر.',
      noItemsDesc: "تابعنا قريباً لمزيد من الإضافات!",
      clearSearch: "مسح البحث",
    },

    // ── Cart ──
    cart: {
      title: "سلة التسوق",
      items: "منتجات",
      empty: "سلتك فارغة",
      emptyDesc: "أضف بعض المنتجات اللذيذة من منيونا!",
      browseMenu: "تصفح المنيو",
      total: "الإجمالي",
      proceedBtn: "المتابعة للطلب",
      yourDetails: "بياناتك",
      deliverTo: "سنوصل طلبك إلى عنوانك",
      backToCart: "العودة للسلة",
      fullName: "الاسم الكامل",
      namePlaceholder: "أحمد محمد",
      phone: "رقم الهاتف",
      phonePlaceholder: "01xxxxxxxxx",
      address: "عنوان التوصيل",
      addressPlaceholder: "الشارع، المبنى، الشقة، المدينة...",
      orderSummary: "ملخص الطلب",
      orderViaWhatsapp: "اطلب عبر واتساب",
      whatsappNote: "سيتم تحويلك إلى واتساب لتأكيد طلبك",
      orderSent: "تم إرسال الطلب! 🎉",
      orderSentDesc:
        "تم فتح واتساب مع تفاصيل طلبك الكامل. أكمل المحادثة للتأكيد!",
    },
  },
};

export type Translations = typeof translations.en;
