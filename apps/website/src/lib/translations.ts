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
      badge: "Sweet Cravings? 🧇",
      headline1: "A World of Joy",
      headline2: "In Every Bite!",
      description:
        "Calling all waffle and pancake lovers! Crispy on the outside, fluffy on the inside, and drenched in the finest melted chocolate. Ready to treat yourself?",
      orderNow: "Let's Order!",
      browseMenu: "See Menu",
      stats: [
        { value: "30+", label: "Crazy Creations" },
        { value: "5★", label: "Awesome Rating" },
        { value: "1K+", label: "Happy Foodies" },
      ],
      floatingCoffee: "Extra Chocolate",
      floatingCoffeeDesc: "Melted goodness",
      floatingChoco: "Fluffy Pancakes",
      floatingChocoDesc: "Melts in your mouth",
      floatingOffer: "🎉 Mega Offers",
      floatingOfferDesc: "Don't miss out!",
      scroll: "Scroll Down",
    },

    // ── Featured Products ──
    featured: {
      badge: "Our Masterpieces",
      title: "Menu Superstars",
      description: "These are our absolute best-sellers. Warning: highly addictive!",
      viewAll: "Gimme the Full Menu",
      empty: "We're cooking up some new crazy creations, stay tuned!",
    },

    // ── Categories ──
    categories: {
      badge: "Pick Your Vibe",
      title: "What's Your Craving Today?",
      description: "Feeling like a crispy golden waffle or a super fluffy pancake? Choose your mood!",
    },

    // ── About ──
    about: {
      badge: "Our Story",
      title1: "Started from an",
      titleHighlight: "Obsession",
      title2: "with Waffles & Pancakes",
      paragraph1:
        "At WAFFLELLA, it all started with our love for the perfect waffle—crispy edges, fluffy center—and pancakes that feel like sweet little clouds! We took that love and built a menu that will change how you think about desserts.",
      paragraph2:
        "We don't just serve waffles and pancakes; we create chocolate-drenched masterpieces that take you on a sweet journey. Every order is made with love and top-tier ingredients to instantly boost your mood.",
      values: [
        {
          title: "Made with Love",
          description: "Every single waffle and pancake is crafted with care as if we're making it for ourselves.",
        },
        {
          title: "Top-Notch Ingredients",
          description: "No compromises here! We use only the finest original chocolates and toppings for a mind-blowing taste.",
        },
        {
          title: "Perfect Crunch & Fluff",
          description: "The secret is in the batter! We've perfected the recipe for the ultimate crunch and fluffiness.",
        },
        {
          title: "Always Fresh",
          description: "Our batter is prepared fresh every single day to guarantee that out-of-this-world taste.",
        },
      ],
      ratedPremium: "Mind-Blowing Taste",
      freshTaste: "Always Fresh",
      premiumDesserts: "Crazy Creations",
    },

    // ── Contact ──
    contact: {
      badge: "Talk to Us",
      title: "Let's Get in Touch!",
      description:
        "Wanna order? Have a question? Or just want to tell us how much you loved the chocolate? We're all ears!",
      phone: "Ring Us",
      whatsapp: "WhatsApp Us",
      facebook: "Facebook",
      followFacebook: "Join our FB family",
      instagram: "Instagram",
      findOnMaps: "Find us on Google Maps",
      openMaps: "Let's Go!",
    },

    // ── Footer ──
    footer: {
      tagline:
        "The kings of waffles and pancakes. Where happiness melts in chocolate!",
      navigation: "Quick Links",
      ourMenu: "Our Menu",
      contactUs: "Hit Us Up",
      findOnMaps: "Where are we?",
      rights: "All rights reserved to Wafflella.",
      madeWith: "Made with ❤️ by",
      byAdel: "Dev. Adel Shabayek",
    },

    // ── Menu Page ──
    menu: {
      badge: "The Full Menu",
      title: "Pick Your Treat",
      description:
        "Crispy waffle or fluffy pancake? Browse the menu and pick whatever fixes your mood today.",
      searchPlaceholder: "What are you looking for?...",
      allItems: "Everything",
      showingItems: "Showing",
      item: "creation",
      items: "creations",
      in: "in",
      noResults: "Couldn't find that",
      noItems: "No creations right now",
      noResultsDesc: 'Sorry, nothing matches "%s". Try searching for waffles or pancakes!',
      noItemsDesc: "We're preparing a new killer menu, stay tuned!",
      clearSearch: "Clear Search",
    },

    // ── Cart ──
    cart: {
      title: "Your Cart",
      items: "items",
      empty: "Your cart is super empty",
      emptyDesc: "What are you waiting for? Go grab some waffles and pancakes!",
      browseMenu: "Get the Menu",
      total: "The Bill",
      proceedBtn: "Let's Confirm the Order",
      yourDetails: "Your Info",
      deliverTo: "We'll deliver happiness right to your door",
      backToCart: "Back to Cart",
      fullName: "What's your name?",
      namePlaceholder: "Full Name",
      phone: "Phone Number",
      phonePlaceholder: "01xxxxxxxxx",
      address: "Detailed Address",
      addressPlaceholder: "Street, Building, Floor, Apartment...",
      orderSummary: "Double Checked?",
      orderViaWhatsapp: "Order via WhatsApp",
      whatsappNote: "We'll pop open WhatsApp to confirm your order in seconds",
      orderSent: "Order Sent! 🚀",
      orderSentDesc:
        "WhatsApp is open with your order details. Just hit send and we'll reply ASAP!",
      nameError: "Please tell us your name",
      phoneError: "That phone number looks weird",
      addressError: "Give us the full address so we don't get lost",
    },

    // ── Product ──
    product: {
      unavailable: "Sold Out 😢",
      featured: "Must Try!",
      addedToCart: "added to cart! 🛒",
    },

    // ── Page Headers ──
    aboutPage: {
      badge: "✦ Our Journey",
      title: "About WAFFLELLA",
      description: "A story of passion, quality, and an unwavering love for exceptional desserts.",
    },
    contactPage: {
      badge: "✦ Say Hello",
      title: "Contact Us",
      description: "We're always happy to hear from you. Reach out via any channel below.",
    },

    // ── WhatsApp ──
    whatsapp: {
      chatTooltip: "Need help?",
    },

    // ── Footer Categories ──
    footerCategories: ["Waffles", "Pancakes"],
  },

  ar: {
    // ── Navbar ──
    nav: {
      home: "الرئيسية",
      menu: "المنيو",
      about: "قصتنا",
      contact: "كلمنا",
      orderNow: "يالا نطلب",
      cart: "العربية",
    },

    // ── Hero ──
    hero: {
      badge: "دلع كرشك صح! 🧇",
      headline1: "عالم من السعادة",
      headline2: "في كل قطمة",
      description:
        "عشاق الوافل والبان كيك، مكانكم هنا! عجينة هشة ومقرمشة غرقانة في أحلى صوصات الشوكولاتة السايحة. جاهز تدلع نفسك؟",
      orderNow: "يالا نطلب!",
      browseMenu: "شوف المنيو",
      stats: [
        { value: "+50", label: "اختراع مجنون" },
        { value: "5★", label: "تقييم العظمة" },
        { value: "+1K", label: "أكيل مبسوط" },
      ],
      floatingCoffee: "إكسترا شوكولاتة",
      floatingCoffeeDesc: "غرقانة وسايحة",
      floatingChoco: "بان كيك طري",
      floatingChocoDesc: "بيدوب في البوق",
      floatingOffer: "🎉 عروض التوفير",
      floatingOfferDesc: "متتفوتش!",
      scroll: "انزل كمان",
    },

    // ── Featured Products ──
    featured: {
      badge: "اختراعاتنا",
      title: "نجوم المنيو",
      description: "دي أكتر حاجات الناس أدمنتها عندنا، من الآخر كده.. دي خلاصة السعادة!",
      viewAll: "هات المنيو كله",
      empty: "بنجهز اختراعات جديدة، خليك قريب!",
    },

    // ── Categories ──
    categories: {
      badge: "اختار مزاجك",
      title: "هتاكل إيه النهاردة؟",
      description:
        "نفسك في وافل مقرمش ولا بان كيك طري وهش؟ اختار اللي يظبط الدماغ من تشكيلتنا.",
    },

    // ── About ──
    about: {
      badge: "حكايتنا",
      title1: "بداية",
      titleHighlight: "الهوس",
      title2: "بالوافل والبان كيك",
      paragraph1:
        "في WAFFLELLA، الحكاية بدأت بحبنا للوافل المظبوط.. اللي مقرمش من بره وطري من جوه، والبان كيك اللي عامل زي السحابة! قررنا ناخد الحب ده ونعمل بيه أجدع منيو هيغير مفهومك عن الحلويات.",
      paragraph2:
        "إحنا مش بس بنقدم وافل وبان كيك، إحنا بنعمل اختراعات غرقانة شوكولاتة وصوصات هتاخدك في رحلة تانية خالص. كل طلب بيتعمل بحب بمكونات متتوصاش عشان نظبطلك المود.",
      values: [
        {
          title: "شغل بمزاج",
          description: "كل وافلاية وبان كيكايه بتتعمل بحب واهتمام كأنها لينا مخصوص.",
        },
        {
          title: "خامات من الآخر",
          description: "مفيش تنازلات هنا! بنستخدم أنضف الخامات والصوصات الأصلية عشان الطعم يضرب في الدماغ.",
        },
        {
          title: "قرمشة وهشاشة",
          description: "السر كله في العجينة.. ظابطين المقادير بالمللي عشان تاكل أحلى قرمشة وأطرى بان كيك.",
        },
        {
          title: "طازة دايماً",
          description: "العجينة بتتحضر فريش كل يوم عشان الطعم يفضل دايماً في حتة تانية.",
        },
      ],
      ratedPremium: "طعم يجنن",
      freshTaste: "دايماً فريش",
      premiumDesserts: "اختراعاتنا",
    },

    // ── Contact ──
    contact: {
      badge: "كلمنا",
      title: "خلينا على تواصل",
      description:
        "عايز تطلب؟ عندك استفسار؟ أو حتى عايز تقولنا رأيك؟ إحنا دايماً هنا عشانك.",
      phone: "رن علينا",
      whatsapp: "ابعتلنا واتساب",
      facebook: "فيسبوك",
      followFacebook: "تابعنا على فيسبوك",
      instagram: "إنستجرام",
      findOnMaps: "مكاننا على جوجل ماب",
      openMaps: "يلا بينا",
    },

    // ── Footer ──
    footer: {
      tagline:
        "ملوك الوافل والبان كيك. هنا السعادة بتدوب في الشوكولاتة!",
      navigation: "لف في الموقع",
      ourMenu: "المنيو بتاعنا",
      contactUs: "كلمنا",
      findOnMaps: "إحنا فين؟",
      rights: "كل الحقوق محفوظة لوافيلا يا غالي.",
      madeWith: "اتعمل بحب بواسطة",
      byAdel: "عادل شباييك",
    },

    // ── Menu Page ──
    menu: {
      badge: "المنيو الكامل",
      title: "اختار دلعك",
      description:
        "وافل مقرمش ولا بان كيك غرقان؟ قلب في المنيو واختار اللي يظبطلك مودك النهارده.",
      searchPlaceholder: "بتدور على إيه؟...",
      allItems: "كله موجود",
      showingItems: "بنعرض",
      item: "اختراع",
      items: "اختراعات",
      in: "من",
      noResults: "ملقناش اللي بتدور عليه",
      noItems: "مفيش اختراعات دلوقتي",
      noResultsDesc: 'معلش مفيش حاجة اسمها "%s" عندنا. جرب تدور على وافل أو بان كيك!',
      noItemsDesc: "بنجهزلك منيو جديد يكسر الدنيا، استنانا!",
      clearSearch: "امسح البحث",
    },

    // ── Cart ──
    cart: {
      title: "عربيتك",
      items: "حاجات",
      empty: "العربية فاضية خالص",
      emptyDesc: "مستني إيه؟ خش المنيو واختار أحلى وافل وبان كيك!",
      browseMenu: "هات المنيو",
      total: "الحساب يا معلم",
      proceedBtn: "يالا نأكد الطلب",
      yourDetails: "بياناتك",
      deliverTo: "هنوصلك السعادة لحد الباب",
      backToCart: "ارجع للعربية",
      fullName: "اسمك إيه؟",
      namePlaceholder: "الاسم بالكامل",
      phone: "رقم تليفونك",
      phonePlaceholder: "01xxxxxxxxx",
      address: "العنوان بالتفصيل",
      addressPlaceholder: "الشارع، العمارة، الدور، الشقة...",
      orderSummary: "راجعت الطلب؟",
      orderViaWhatsapp: "اطلب من على الواتساب",
      whatsappNote: "هنحولك على الواتساب عشان نأكد الطلب في ثواني",
      orderSent: "طلبك طار! 🚀",
      orderSentDesc:
        "الواتساب فتح معاك بتفاصيل الطلب، ابعت الرسالة وهنرد عليك على طول!",
      nameError: "اكتب اسمك عشان نعرفك",
      phoneError: "رقم التليفون مش مظبوط",
      addressError: "اكتب العنوان بالتفصيل عشان منتهش",
    },

    // ── Product ──
    product: {
      unavailable: "خلصان للأسف",
      featured: "أكيلة!",
      addedToCart: "نط في العربية! 🛒",
    },

    // ── Page Headers ──
    aboutPage: {
      badge: "✦ حكايتنا",
      title: "عن وافليلا",
      description: "حكاية شغف، جودة، وحب ميتوصفش للوافل والبان كيك.",
    },
    contactPage: {
      badge: "✦ قولنا ألو",
      title: "كلمنا",
      description: "إحنا دايماً مبسوطين بيك. ابعتلنا أو تواصل معانا على أي حاجة من دول.",
    },

    // ── WhatsApp ──
    whatsapp: {
      chatTooltip: "نقدر نساعدك؟",
    },

    // ── Footer Categories ──
    footerCategories: ["وافل", "بان كيك"],
  },
};

export type Translations = typeof translations.en;
