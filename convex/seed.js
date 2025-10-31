import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const seedProducts = mutation({
  handler: async (ctx) => {
    const products = [
      {
        name: "XX99 MARK II HEADPHONES",
        slug: "xx99-mark-ii-headphones",
        description: "The new XX99 Mark II headphones is the pinnacle of pristine audio. It redefines your premium headphone experience by reproducing the balanced depth and precision of studio-quality sound.",
        price: 2999,
        image: "/feat.png",
        category: "headphones",
        isNew: true,
        features: "Featuring a genuine leather headband and premium earcups, these headphones deliver superior comfort for long listening sessions. The intuitive controls allow you to manage music playback and adjust volume with ease.\n\nExperience active noise cancellation, Bluetooth 5.0 connectivity, and a 17-hour battery life. The auto on/off pause feature ensures you never waste battery when not in use. These headphones represent the pinnacle of modern audio design.",
        includes: [
          { quantity: "1x", item: "Headphone Unit" },
          { quantity: "2x", item: "Replacement Earcups" },
          { quantity: "1x", item: "User Manual" },
          { quantity: "1x", item: "3.5mm 5m Audio Cable" },
          { quantity: "1x", item: "Travel Bag" },
        ],
        gallery: {
          first: "/feat.png",
          second: "/feat.png",
          third: "/feat.png",
        },
        relatedProducts: [
          {
            name: "XX99 MARK I",
            slug: "xx99-mark-i-headphones",
            image: "/feat-head.png",
          },
          {
            name: "XX59",
            slug: "xx59-headphones",
            image: "/new-head.png",
          },
          {
            name: "ZX9 SPEAKER",
            slug: "zx9-speaker",
            image: "/z9speaker.png",
          },
        ],
        createdAt: Date.now(),
      },
      {
        name: "XX99 MARK I HEADPHONES",
        slug: "xx99-mark-i-headphones",
        description: "As the gold standard for headphones, the classic XX99 Mark I offers detailed and accurate audio reproduction for audiophiles, mixing engineers, and music aficionados alike in studios and on the go.",
        price: 1750,
        image: "/feat-head.png",
        category: "headphones",
        isNew: false,
        features: "Featuring a genuine leather headband and premium earcups, these headphones deliver superior comfort for long listening sessions. The intuitive controls allow you to manage music playback and adjust volume with ease.",
        includes: [
          { quantity: "1x", item: "Headphone Unit" },
          { quantity: "2x", item: "Replacement Earcups" },
          { quantity: "1x", item: "User Manual" },
          { quantity: "1x", item: "3.5mm 5m Audio Cable" },
        ],
        gallery: {
          first: "/feat-head.png",
          second: "/feat-head.png",
          third: "/feat-head.png",
        },
        relatedProducts: [
          {
            name: "XX99 MARK II",
            slug: "xx99-mark-ii-headphones",
            image: "/feat.png",
          },
          {
            name: "XX59",
            slug: "xx59-headphones",
            image: "/new-head.png",
          },
          {
            name: "ZX9 SPEAKER",
            slug: "zx9-speaker",
            image: "/z9speaker.png",
          },
        ],
        createdAt: Date.now(),
      },
      {
        name: "XX59 HEADPHONES",
        slug: "xx59-headphones",
        description: "Enjoy your audio almost anywhere and customize it to your specific tastes with the XX59 headphones. The stylish yet durable versatile wireless headset is a brilliant companion at home or on the move.",
        price: 899,
        image: "/new-head.png",
        category: "headphones",
        isNew: false,
        features: "These headphones offer a comfortable fit with adjustable headband and soft earcups. The intuitive controls allow you to manage music playback and adjust volume with ease.",
        includes: [
          { quantity: "1x", item: "Headphone Unit" },
          { quantity: "1x", item: "User Manual" },
          { quantity: "1x", item: "3.5mm 5m Audio Cable" },
        ],
        gallery: {
          first: "/new-head.png",
          second: "/new-head.png",
          third: "/new-head.png",
        },
        relatedProducts: [
          {
            name: "XX99 MARK II",
            slug: "xx99-mark-ii-headphones",
            image: "/feat.png",
          },
          {
            name: "XX99 MARK I",
            slug: "xx99-mark-i-headphones",
            image: "/feat-head.png",
          },
          {
            name: "ZX9 SPEAKER",
            slug: "zx9-speaker",
            image: "/z9speaker.png",
          },
        ],
        createdAt: Date.now(),
      },
      {
        name: "ZX9 SPEAKER",
        slug: "zx9-speaker",
        description: "Upgrade your sound system with the all new ZX9 active speaker. It's a bookshelf speaker system that offers truly wireless connectivity -- creating new possibilities for more pleasing and practical audio setups.",
        price: 4500,
        image: "/z9speaker.png",
        category: "speakers",
        isNew: false,
        features: "Connect via Bluetooth or nearly any wired source. This speaker features optical, digital coaxial, USB Type-B, stereo RCA, and stereo XLR inputs, allowing you to have up to five wired source devices connected for easy switching. Improved bluetooth technology offers near lossless audio quality at up to 328ft (100m).",
        includes: [
          { quantity: "2x", item: "Speaker Unit" },
          { quantity: "2x", item: "Speaker Cloth Panel" },
          { quantity: "1x", item: "User Manual" },
          { quantity: "1x", item: "3.5mm 5m Audio Cable" },
          { quantity: "1x", item: "10m Optical Cable" },
        ],
        gallery: {
          first: "/z9speaker.png",
          second: "/z9speaker.png",
          third: "/z9speaker.png",
        },
        relatedProducts: [
          {
            name: "ZX7 SPEAKER",
            slug: "zx7-speaker",
            image: "/z7speaker.png",
          },
          {
            name: "XX99 MARK I",
            slug: "xx99-mark-i-headphones",
            image: "/feat-head.png",
          },
          {
            name: "XX59",
            slug: "xx59-headphones",
            image: "/new-head.png",
          },
        ],
        createdAt: Date.now(),
      },
      {
        name: "ZX7 SPEAKER",
        slug: "zx7-speaker",
        description: "Stream high quality sound wirelessly with minimal loss. The ZX7 bookshelf speaker uses high-end audiophile components that represents the top of the line powered speakers for home or studio use.",
        price: 3500,
        image: "/z7speaker.png",
        category: "speakers",
        isNew: false,
        features: "Reap the advantages of a flat diaphragm tweeter cone. This provides a fast response rate and excellent high frequencies that lower tiered bookshelf speakers cannot provide. The woofers are made from aluminum that produces a unique and clear sound. XLR inputs allow you to connect to a mixer for more advanced usage.",
        includes: [
          { quantity: "2x", item: "Speaker Unit" },
          { quantity: "2x", item: "Speaker Cloth Panel" },
          { quantity: "1x", item: "User Manual" },
          { quantity: "1x", item: "3.5mm 7.5m Audio Cable" },
        ],
        gallery: {
          first: "/z7speaker.png",
          second: "/z7speaker.png",
          third: "/z7speaker.png",
        },
        relatedProducts: [
          {
            name: "ZX9 SPEAKER",
            slug: "zx9-speaker",
            image: "/z9speaker.png",
          },
          {
            name: "XX99 MARK I",
            slug: "xx99-mark-i-headphones",
            image: "/feat-head.png",
          },
          {
            name: "XX59",
            slug: "xx59-headphones",
            image: "/new-head.png",
          },
        ],
        createdAt: Date.now(),
      },
      {
        name: "YX1 EARPHONES",
        slug: "yx1-earphones",
        description: "Tailor your listening experience with bespoke dynamic drivers from the new YX1 Wireless Earphones. Enjoy incredible high-fidelity sound even in noisy environments with its active noise cancellation feature.",
        price: 599,
        image: "/categories/pod.png",
        category: "earphones",
        isNew: true,
        features: "Experience unrivalled stereo sound thanks to innovative acoustic technology. With improved ergonomics designed for full day wearing, these revolutionary earphones have been finely crafted to provide you with the perfect fit, delivering complete comfort all day long while enjoying exceptional noise isolation and truly immersive sound.",
        includes: [
          { quantity: "2x", item: "Earphone Unit" },
          { quantity: "6x", item: "Multi-size Earplugs" },
          { quantity: "1x", item: "User Manual" },
          { quantity: "1x", item: "USB-C Charging Cable" },
          { quantity: "1x", item: "Travel Pouch" },
        ],
        gallery: {
          first: "/categories/pod.png",
          second: "/categories/pod.png",
          third: "/categories/pod.png",
        },
        relatedProducts: [
          {
            name: "XX99 MARK I",
            slug: "xx99-mark-i-headphones",
            image: "/feat-head.png",
          },
          {
            name: "XX59",
            slug: "xx59-headphones",
            image: "/new-head.png",
          },
          {
            name: "ZX9 SPEAKER",
            slug: "zx9-speaker",
            image: "/z9speaker.png",
          },
        ],
        createdAt: Date.now(),
      },
    ];

    // Check if products already exist
    const existingProducts = await ctx.db.query("products").collect();
    if (existingProducts.length > 0) {
      return { message: "Products already exist. Skipping seed." };
    }

    // Insert products
    for (const product of products) {
      await ctx.db.insert("products", product);
    }

    return { message: `Seeded ${products.length} products successfully!` };
  },
});

