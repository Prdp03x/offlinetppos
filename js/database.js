/* IndexedDB storage layer. No network dependency. */
(() => {
  const DB_NAME = "NxOs-pos-db";
  const DB_VERSION = 2;
  const seedProducts = [
    {
      id: "ginger-elaichi-chai",
      name: "Ginger Elaichi",
      category: "Chai",
      price: 65,
      active: true,
    },
    {
      id: "ginger-chai",
      name: "Ginger",
      category: "Chai",
      price: 55,
      active: true,
    },
    {
      id: "ginger-pudina-chai",
      name: "Ginger & Pudina",
      category: "Chai",
      price: 70,
      active: true,
    },
    {
      id: "masala-chai",
      name: "Masala",
      category: "Chai",
      price: 65,
      active: true,
    },
    {
      id: "elaichi-chai",
      name: "Elaichi",
      category: "Chai",
      price: 70,
      active: true,
    },
    {
      id: "pudina-elaichi-chai",
      name: "Pudina Elaichi",
      category: "Chai",
      price: 70,
      active: true,
    },
    {
      id: "gud-vali-chai",
      name: "Gud Vali Chai",
      category: "Chai",
      price: 75,
      active: true,
    },
    {
      id: "add-gud",
      name: "Add Gud (Jaggery)",
      category: "Chai Add-ons",
      price: 5,
      active: true,
    },
    {
      id: "classic-cold-coffee",
      name: "Classic",
      category: "Cold Coffees",
      price: 175,
      active: true,
    },
    {
      id: "hazelnut-cold-coffee",
      name: "Hazelnut",
      category: "Cold Coffees",
      price: 190,
      active: true,
    },
    {
      id: "kadak-kold-koffee",
      name: "Kadak Kold Koffee",
      category: "Cold Coffees",
      price: 190,
      active: true,
    },
    {
      id: "mocha-cold-coffee",
      name: "Mocha",
      category: "Cold Coffees",
      price: 190,
      active: true,
    },
    {
      id: "cappuccino-cold",
      name: "Cappuccino",
      category: "Cold Coffees",
      price: 185,
      active: true,
    },
    {
      id: "vanilla-cold-coffee",
      name: "Vanilla",
      category: "Cold Coffees",
      price: 190,
      active: true,
    },
    {
      id: "iced-americano",
      name: "Iced Americano",
      category: "Cold Coffees",
      price: 120,
      active: true,
    },
    {
      id: "masala-lemonade",
      name: "Masala Lemonade",
      category: "Desi Coolers",
      price: 125,
      active: true,
    },
    {
      id: "lemon-ginger-cooler",
      name: "Lemon Ginger",
      category: "Desi Coolers",
      price: 125,
      active: true,
    },
    {
      id: "cranNxOs-mojito",
      name: "CranNxOs Mojito",
      category: "Desi Coolers",
      price: 125,
      active: true,
    },
    {
      id: "orange-chatpata",
      name: "Orange Chatpata",
      category: "Desi Coolers",
      price: 125,
      active: true,
    },
    {
      id: "green-apple-cooler",
      name: "Green Apple",
      category: "Desi Coolers",
      price: 125,
      active: true,
    },
    {
      id: "fruit-punch",
      name: "Fruit Punch",
      category: "Desi Coolers",
      price: 125,
      active: true,
    },
    {
      id: "mojito",
      name: "Mojito",
      category: "Desi Coolers",
      price: 125,
      active: true,
    },
    {
      id: "lemon-ice-tea",
      name: "Lemon Ice Tea",
      category: "Desi Coolers",
      price: 135,
      active: true,
    },
    {
      id: "peach-ice-tea",
      name: "Peach Ice Tea",
      category: "Desi Coolers",
      price: 135,
      active: true,
    },
    {
      id: "hibiscus-melon-ice-tea",
      name: "Hibiscus Melon Ice Tea",
      category: "Desi Coolers",
      price: 135,
      active: true,
    },
    {
      id: "water-1l",
      name: "Water (1L)",
      category: "Desi Coolers",
      price: 28.5,
      active: true,
    },
    {
      id: "extra-soda",
      name: "Extra Soda",
      category: "Desi Coolers",
      price: 20,
      active: true,
    },
    {
      id: "hot-coffee",
      name: "Hot Coffee",
      category: "Hot Coffees",
      price: 80,
      active: true,
    },
    {
      id: "hot-coffee-hazelnut",
      name: "Hot Coffee Hazelnut",
      category: "Hot Coffees",
      price: 95,
      active: true,
    },
    {
      id: "hot-coffee-vanilla",
      name: "Hot Coffee Vanilla",
      category: "Hot Coffees",
      price: 95,
      active: true,
    },
    {
      id: "hot-coffee-ginger",
      name: "Hot Coffee Ginger",
      category: "Hot Coffees",
      price: 95,
      active: true,
    },
    {
      id: "hot-coffee-elaichi",
      name: "Hot Coffee Elaichi",
      category: "Hot Coffees",
      price: 95,
      active: true,
    },
    {
      id: "black-coffee",
      name: "Black Coffee",
      category: "Hot Coffees",
      price: 70,
      active: true,
    },
    {
      id: "chocolate-milkshake",
      name: "Chocolate",
      category: "Milkshakes",
      price: 175,
      active: true,
    },
    {
      id: "oreo-milkshake",
      name: "Oreo",
      category: "Milkshakes",
      price: 190,
      active: true,
    },
    {
      id: "strawberry-milkshake",
      name: "Strawberry",
      category: "Milkshakes",
      price: 175,
      active: true,
    },
    {
      id: "Berryblast-milkshake",
      name: "Berryblast",
      category: "Milkshakes",
      price: 190,
      active: true,
    },
    {
      id: "cold-cocoa",
      name: "Cold Cocoa",
      category: "Chocolate Love",
      price: 180,
      active: true,
    },
    {
      id: "hot-chocolate",
      name: "Hot Chocolate",
      category: "Chocolate Love",
      price: 150,
      active: true,
    },
    {
      id: "bourvita-cold",
      name: "Bourvita Cold",
      category: "Chocolate Love",
      price: 155,
      active: true,
    },
    {
      id: "bourvita-hot",
      name: "Bourvita Hot",
      category: "Chocolate Love",
      price: 110,
      active: true,
    },
    {
      id: "healthy-green-tea",
      name: "Healthy Green Tea (with Honey & Lime)",
      category: "Soothing Teas",
      price: 75,
      active: true,
    },
    {
      id: "lemongrass-ginger-green-tea",
      name: "Lemongrass Ginger Green Tea",
      category: "Soothing Teas",
      price: 95,
      active: true,
    },
    {
      id: "chamomile-green-tea",
      name: "Chamomile Green Tea",
      category: "Soothing Teas",
      price: 95,
      active: true,
    },
    {
      id: "rose-green-tea",
      name: "Rose Green Tea",
      category: "Soothing Teas",
      price: 95,
      active: true,
    },
    {
      id: "fiery-tea",
      name: "Fiery Tea",
      category: "Soothing Teas",
      price: 95,
      active: true,
    },
    {
      id: "blue-tea",
      name: "Blue Tea",
      category: "Soothing Teas",
      price: 95,
      active: true,
    },
    {
      id: "black-tea",
      name: "Black Tea",
      category: "Soothing Teas",
      price: 55,
      active: true,
    },
    {
      id: "hot-milk",
      name: "Hot Milk",
      category: "Milk",
      price: 70,
      active: true,
    },
    {
      id: "cold-milk",
      name: "Cold Milk",
      category: "Milk",
      price: 70,
      active: true,
    },
    {
      id: "kavo",
      name: "Kavo",
      category: "Regional Sips",
      price: 75,
      active: true,
    },
    {
      id: "kesar-chai",
      name: "Kesar Chai",
      category: "Regional Sips",
      price: 95,
      active: true,
    },
    {
      id: "mini-samosa",
      name: "Mini Samosa (4 Pcs)",
      category: "Garma Garam",
      price: 95,
      active: true,
    },
    {
      id: "vada-pav-slider",
      name: "Vada Pav Slider",
      category: "Garma Garam",
      price: 145,
      active: true,
    },
    {
      id: "bread-pakoda-bites",
      name: "Bread Pakoda Bites (3 Pcs)",
      category: "Garma Garam",
      price: 125,
      active: true,
    },
    {
      id: "kota-kachori",
      name: "Kota Kachori (4 Pcs)",
      category: "Garma Garam",
      price: 95,
      active: true,
    },
    {
      id: "kota-kachori-samosa",
      name: "Kota Kachori & Samosa",
      category: "Garma Garam",
      price: 95,
      active: true,
    },
    { id: "poha", name: "Poha", category: "Nashta", price: 70, active: true },
    {
      id: "poha-vegetable",
      name: "Poha With Vegetable",
      category: "Nashta",
      price: 85,
      active: true,
    },
    {
      id: "khichu",
      name: "Khichu (Rice flour Upma)",
      category: "Nashta",
      price: 110,
      active: true,
    },
    {
      id: "thepla",
      name: "Thepla (3 Pcs)",
      category: "Nashta",
      price: 95,
      active: true,
    },
    { id: "upma", name: "Upma", category: "Nashta", price: 100, active: true },
    {
      id: "mumbai-bhel",
      name: "Mumbai Bhel",
      category: "Chaats",
      price: 120,
      active: true,
    },
    {
      id: "samosa-chaat",
      name: "Samosa Chaat",
      category: "Chaats",
      price: 105,
      active: true,
    },
    {
      id: "sweet-corn-chaat",
      name: "Sweet Corn Chaat",
      category: "Chaats",
      price: 105,
      active: true,
    },
    {
      id: "cheese-garlic-bread",
      name: "Cheese Garlic Bread (3 Pcs)",
      category: "Cheesy Bites",
      price: 160,
      active: true,
    },
    {
      id: "khachos",
      name: "Khachos (Peri Peri/Tandoori/Mexican)",
      category: "Cheesy Bites",
      price: 120,
      active: true,
    },
    {
      id: "mexican-cheese-sandwich",
      name: "Mexican Cheese (3 Slice)",
      category: "Grilled Sandwiches",
      price: 195,
      active: true,
    },
    {
      id: "tandoori-peri-peri-paneer-sandwich",
      name: "Tandoori / Peri Peri Paneer",
      category: "Grilled Sandwiches",
      price: 195,
      active: true,
    },
    {
      id: "cheese-butter-sandwich",
      name: "Cheese Butter",
      category: "Grilled Sandwiches",
      price: 180,
      active: true,
    },
    {
      id: "vegetable-sandwich",
      name: "Vegetable (2 Slice)",
      category: "Grilled Sandwiches",
      price: 135,
      active: true,
    },
    {
      id: "paneer-bhurji-sandwich",
      name: "Paneer Bhurji (2 Slice)",
      category: "Grilled Sandwiches",
      price: 165,
      active: true,
    },
    {
      id: "cheese-corn-capsicum-sandwich",
      name: "Cheese Corn Capsicum (2 Slice)",
      category: "Grilled Sandwiches",
      price: 155,
      active: true,
    },
    {
      id: "cheese-chilli-sandwich",
      name: "Cheese Chilli (3 Slice)",
      category: "Grilled Sandwiches",
      price: 185,
      active: true,
    },
    {
      id: "extra-cheese",
      name: "Extra Cheese",
      category: "Add-ons",
      price: 30,
      active: true,
    },
    {
      id: "extra-meggie-masala",
      name: "Extra Masala",
      category: "Add-ons",
      price: 5,
      active: true,
    },
    {
      id: "extra-dahi",
      name: "Extra Dahi",
      category: "Add-ons",
      price: 20,
      active: true,
    },
    {
      id: "plain",
      name: "*Plain",
      category: "Add-ons",
      price: 0,
      active: true,
    },
    {
      id: "extra-grilled",
      name: "*Extra Grilled",
      category: "Add-ons",
      price: 15,
      active: true,
    },
    {
      id: "jain-food",
      name: "*Jain Food",
      category: "Add-ons",
      price: 0,
      active: true,
    },
    {
      id: "extra-sugar",
      name: "*Extra Sugar",
      category: "Add-ons",
      price: 0,
      active: true,
    },
    {
      id: "extra-pickle",
      name: "*Extra Pickle",
      category: "Add-ons",
      price: 3,
      active: true,
    },
    {
      id: "extra-70ml-cup",
      name: "*Extra 70ml cup",
      category: "Packaging",
      price: 1,
      active: true,
    },
    {
      id: "extra-130ml-cup",
      name: "*Extra 130ml cup",
      category: "Packaging",
      price: 4.76,
      active: true,
    },
    {
      id: "extra-180ml-cup",
      name: "*Extra 180ml cup",
      category: "Packaging",
      price: 6.67,
      active: true,
    },
    {
      id: "extra-300ml-cup",
      name: "*Extra 300ml cup",
      category: "Packaging",
      price: 9.52,
      active: true,
    },
    {
      id: "extra-take-away-kettle-cold",
      name: "*Extra Take Away kettle COLD",
      category: "Packaging",
      price: 9.52,
      active: true,
    },
    {
      id: "extra-take-away-kettle-hot",
      name: "*Extra Take Away kettle HOT",
      category: "Packaging",
      price: 9.52,
      active: true,
    },
    {
      id: "extra-snackie-pack",
      name: "*Extra Take Away Snack Pack",
      category: "Packaging",
      price: 9.52,
      active: true,
    },
    {
      id: "extra-snackie-box",
      name: "*Extra Take Away Snackiee Box",
      category: "Packaging",
      price: 9.52,
      active: true,
    },
    {
      id: "wihtout-sugar",
      name: "*WITHOUT Sugar",
      category: "Add-ons",
      price: 0,
      active: true,
    },
    {
      id: "go-desi-imli",
      name: "Go Desi Imli Pop",
      category: "Muffins",
      price: 4.76,
      active: true,
    },
    {
      id: "go-desi-kacha",
      name: "Go Desi Kacha Pop",
      category: "Muffins",
      price: 4.76,
      active: true,
    },
    {
      id: "go-desi-real-aam",
      name: "Go Desi Real Aam Pop",
      category: "Muffins",
      price: 4.76,
      active: true,
    },
    {
      id: "chocoblast",
      name: "Chocoblast",
      category: "Muffins",
      price: 19.05,
      active: true,
    },
    {
      id: "cookie-choco-crunchy",
      name: "Choco crunchy",
      category: "Cookies",
      price: 33.33,
      active: true,
    },
    {
      id: "cookie-rich-almond",
      name: "Choco Rich Almond",
      category: "Cookies",
      price: 33.33,
      active: true,
    },
    {
      id: "cookie-dark-chocolate-chips",
      name: "Choco Dark Chocochips",
      category: "Cookies",
      price: 33.33,
      active: true,
    },
    {
      id: "Khakhra-jeera",
      name: "Khakhra Jeera",
      category: "Khakhra",
      price: 23.81,
      active: true,
    },
    {
      id: "Khakhra-methi",
      name: "Khakhra Methi",
      category: "Khakhra",
      price: 23.81,
      active: true,
    },
    {
      id: "methi-bhakhri",
      name: "Methi Bhakhri",
      category: "Bhakhri",
      price: 28.5,
      active: true,
    },
    {
      id: "jeera-bhakhri",
      name: "Jeera Bhakhri",
      category: "Bhakhri",
      price: 28.5,
      active: true,
    },
    {
      id: "cream-roll-vanilla",
      name: "Cream roll Vanilla",
      category: "Cream Roll",
      price: 28.57,
      active: true,
    },
    {
      id: "cream-roll-pineapple",
      name: "Cream roll Pineapple",
      category: "Cream Roll",
      price: 28.57,
      active: true,
    },
    {
      id: "cream-roll-chocolate",
      name: "Cream roll Chocolate",
      category: "Cream Roll",
      price: 28.57,
      active: true,
    },
    {
      id: "cream-roll-strawberry",
      name: "Cream roll Strawberry",
      category: "Cream Roll",
      price: 28.57,
      active: true,
    },
    {
      id: "veg-puff",
      name: "Veg Puff",
      category: "Puffs",
      price: 60,
      active: true,
    },
    {
      id: "cheese-puff",
      name: "Cheese Puff",
      category: "Puffs",
      price: 90,
      active: true,
    },
    {
      id: "mexican-tandoori-puff",
      name: "Mexican/Tandoori Puff",
      category: "Puffs",
      price: 85,
      active: true,
    },
    {
      id: "peri-peri-puff",
      name: "Peri Peri Puff",
      category: "Puffs",
      price: 85,
      active: true,
    },
    {
      id: "mexican-wrap",
      name: "Mexican",
      category: "Wraps",
      price: 155,
      active: true,
    },
    {
      id: "tandoori-peri-peri-paneer-wrap",
      name: "Tandoori / Peri Peri Paneer",
      category: "Wraps",
      price: 155,
      active: true,
    },
    {
      id: "french-fries-salted",
      name: "French Fries Salted",
      category: "Crispy Fries",
      price: 150,
      active: true,
    },
    {
      id: "french-fries-cheezy",
      name: "French Fries Cheezy",
      category: "Crispy Fries",
      price: 180,
      active: true,
    },
    {
      id: "peri-peri-french-fries",
      name: "Peri Peri French Fries",
      category: "Crispy Fries",
      price: 160,
      active: true,
    },
    {
      id: "mexican-cheezy-fries",
      name: "Mexican Cheezy French Fries",
      category: "Crispy Fries",
      price: 190,
      active: true,
    },
    {
      id: "ghارwala-aloo-paratha",
      name: "Gharwala Aloo Paratha",
      category: "Tea Post Specials",
      price: 130,
      active: true,
    },
    {
      id: "chatpata-paneer-rice-bowl",
      name: "Chatpata Paneer Rice Bowl",
      category: "Tea Post Specials",
      price: 195,
      active: true,
    },
    {
      id: "farali-bhel",
      name: "Farali Bhel",
      category: "Upvas Ka Nashta",
      price: 140,
      active: true,
    },
    {
      id: "sabudana-vada",
      name: "Sabudana Vada (4 Pcs)",
      category: "Upvas Ka Nashta",
      price: 150,
      active: true,
    },
    {
      id: "dhokla",
      name: "Dhokla",
      category: "Local Treats",
      price: 95,
      active: true,
    },
    {
      id: "fafda",
      name: "Fafda",
      category: "Local Treats",
      price: 95,
      active: true,
    },
    {
      id: "vanela-gathiya",
      name: "Vanela Gathiya",
      category: "Local Treats",
      price: 95,
      active: true,
    },
    {
      id: "muthiya",
      name: "Muthiya",
      category: "Local Treats",
      price: 95,
      active: true,
    },
    {
      id: "desi-meal-thepla-sukhi-bhaji",
      name: "Desi Meal (Thepla + Sukhi Bhaji)",
      category: "Local Treats",
      price: 170,
      active: true,
    },
    {
      id: "desi-dabba-fafda",
      name: "Desi Dabba Fafda 100gm",
      category: "Local Treats",
      price: 130,
      active: true,
    },
    {
      id: "desi-dabba-vanela-gathiya",
      name: "Desi Dabba Vanela Gathiya 100gm",
      category: "Local Treats",
      price: 130,
      active: true,
    },
    {
      id: "maska-bun-amul",
      name: "Maska Bun (Amul)",
      category: "Maska Bun & Breads",
      price: 95,
      active: true,
    },
    {
      id: "maska-bun-jam-amul",
      name: "Maska Bun With Jam (Amul)",
      category: "Maska Bun & Breads",
      price: 100,
      active: true,
    },
    {
      id: "chocolate-maska-bun-amul",
      name: "Chocolate Maska Bun (Amul)",
      category: "Maska Bun & Breads",
      price: 110,
      active: true,
    },
    {
      id: "spicy-cheese-bun",
      name: "Spicy Cheese Bun",
      category: "Maska Bun & Breads",
      price: 130,
      active: true,
    },
    {
      id: "bread-butter-amul",
      name: "Bread Butter (Amul) (2 Slice)",
      category: "Maska Bun & Breads",
      price: 100,
      active: true,
    },
    {
      id: "jam-butter-amul",
      name: "Jam Butter (Amul) (2 Slice)",
      category: "Maska Bun & Breads",
      price: 105,
      active: true,
    },
    {
      id: "chatpata-masala-noodles",
      name: "Chatpata Masala Noodles",
      category: "Adda Noodles",
      price: 115,
      active: true,
    },
    {
      id: "chatpata-masala-noodles-cheese",
      name: "Chatpata Masala Noodles (With Cheese)",
      category: "Adda Noodles",
      price: 150,
      active: true,
    },
    {
      id: "tadka-noodles",
      name: "Tadka Noodles",
      category: "Adda Noodles",
      price: 160,
      active: true,
    },
  ];
  let dbPromise;
  function openDB() {
    if (dbPromise) return dbPromise;
    dbPromise = new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains("products"))
          db.createObjectStore("products", { keyPath: "id" });
        if (!db.objectStoreNames.contains("bills")) {
          const s = db.createObjectStore("bills", { keyPath: "id" });
          s.createIndex("createdAt", "createdAt");
          s.createIndex("billNo", "billNo", { unique: true });
        }
        if (!db.objectStoreNames.contains("settings"))
          db.createObjectStore("settings", { keyPath: "key" });
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
    return dbPromise;
  }
  async function all(store) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const r = db.transaction(store, "readonly").objectStore(store).getAll();
      r.onsuccess = () => resolve(r.result || []);
      r.onerror = () => reject(r.error);
    });
  }
  async function put(store, value) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(store, "readwrite");
      tx.objectStore(store).put(value);
      tx.oncomplete = () => resolve(value);
      tx.onerror = () => reject(tx.error);
    });
  }
  async function remove(store, key) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(store, "readwrite");
      tx.objectStore(store).delete(key);
      tx.oncomplete = resolve;
      tx.onerror = () => reject(tx.error);
    });
  }
  async function clearStore(store) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(store, "readwrite");
      tx.objectStore(store).clear();
      tx.oncomplete = resolve;
      tx.onerror = () => reject(tx.error);
    });
  }
  async function init() {
    await openDB();
    const products = await all("products");
    if (!products.length) {
      for (const p of seedProducts) await put("products", p);
    } else {
      // Add any missing menu seed products without overwriting products the user has edited.
      const existing = new Set(products.map((p) => p.id));
      for (const p of seedProducts)
        if (!existing.has(p.id)) await put("products", p);
    }
    if (!(await getSetting("business")))
      await put("settings", {
        key: "business",
        value: { name: "Teapost Desi Morbi", phone: "87777 37277", address: "Opp.Dmart, LE College Road, Morbi-2", gstin: "" },
      });
    return true;
  }
  async function getSetting(key) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const r = db
        .transaction("settings", "readonly")
        .objectStore("settings")
        .get(key);
      r.onsuccess = () => resolve(r.result?.value);
      r.onerror = () => reject(r.error);
    });
  }
  async function setSetting(key, value) {
    return put("settings", { key, value });
  }
  async function nextBillNo() {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction("settings", "readwrite");
      const store = tx.objectStore("settings");
      const req = store.get("billCounter");
      let next = 1;
      req.onsuccess = () => {
        next = Math.max(1, Number(req.result?.value || 1));
        store.put({ key: "billCounter", value: next + 1 });
      };
      req.onerror = () => reject(req.error);
      tx.oncomplete = () => resolve("BILL-" + String(next).padStart(6, "0"));
      tx.onerror = () => reject(tx.error);
      tx.onabort = () =>
        reject(tx.error || new Error("Bill counter transaction aborted"));
    });
  }
  async function resetDailySales() {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(["bills", "settings"], "readwrite");
      tx.objectStore("bills").clear();
      tx.objectStore("settings").put({ key: "billCounter", value: 1 });
      tx.oncomplete = resolve;
      tx.onerror = () => reject(tx.error);
      tx.onabort = () =>
        reject(tx.error || new Error("Daily reset transaction aborted"));
    });
  }
  async function saveBill(bill) {
    return put("bills", bill);
  }
  async function replaceAll(data) {
    await clearStore("products");
    await clearStore("bills");
    await clearStore("settings");
    for (const p of data.products || []) await put("products", p);
    for (const b of data.bills || []) await put("bills", b);
    for (const s of data.settings || []) await put("settings", s);
    if (!(await all("products")).length)
      for (const p of seedProducts) await put("products", p);
    if (!(await getSetting("business")))
      await put("settings", {
        key: "business",
        value: { name: "Teapost Desi Morbi", phone: "87777 37277", address: "Opp.Dmart, LE College Road, Morbi-2", gstin: "" },
      });
    if (!(await getSetting("billCounter"))) {
      let max = 0;
      for (const b of data.bills || []) {
        const m = String(b.billNo || "").match(/(\d+)$/);
        if (m) max = Math.max(max, Number(m[1]));
      }
      await put("settings", { key: "billCounter", value: max + 1 });
    }
  }
  window.POSDB = {
    init,
    all,
    put,
    remove,
    clearStore,
    getSetting,
    setSetting,
    nextBillNo,
    resetDailySales,
    saveBill,
    replaceAll,
  };
})();
