import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  products: defineTable({
    name: v.string(),
    slug: v.string(),
    description: v.string(),
    price: v.number(),
    image: v.string(),
    category: v.string(),
    isNew: v.optional(v.boolean()),
    features: v.optional(v.string()),
    includes: v.optional(v.array(v.union(v.string(), v.object({
      quantity: v.string(),
      item: v.string(),
    })))),
    gallery: v.optional(v.object({
      first: v.string(),
      second: v.string(),
      third: v.string(),
    })),
    relatedProducts: v.optional(v.array(v.object({
      name: v.string(),
      slug: v.string(),
      image: v.string(),
    }))),
    createdAt: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_category", ["category"]),

  orders: defineTable({
    orderId: v.string(),
    customerName: v.string(),
    customerEmail: v.string(),
    customerPhone: v.string(),
    shippingAddress: v.object({
      address: v.string(),
      city: v.string(),
      zipCode: v.string(),
      country: v.string(),
    }),
    items: v.array(
      v.object({
        productId: v.id("products"),
        name: v.string(),
        price: v.number(),
        quantity: v.number(),
      })
    ),
    totals: v.object({
      subtotal: v.number(),
      shipping: v.number(),
      tax: v.number(),
      total: v.number(),
    }),
    status: v.string(), // "pending", "confirmed", "shipped", "delivered"
    createdAt: v.number(),
  })
    .index("by_orderId", ["orderId"])
    .index("by_email", ["customerEmail"])
    .index("by_created", ["createdAt"]),
});

