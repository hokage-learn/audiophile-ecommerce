import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createOrder = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    // Check if order with this orderId already exists (idempotency)
    const existingOrder = await ctx.db
      .query("orders")
      .withIndex("by_orderId", (q) => q.eq("orderId", args.orderId))
      .first();

    if (existingOrder) {
      // Return existing order ID instead of creating duplicate
      console.log(`Order ${args.orderId} already exists. Returning existing order.`);
      return existingOrder._id;
    }

    // Create new order
    const orderDbId = await ctx.db.insert("orders", {
      orderId: args.orderId,
      customerName: args.customerName,
      customerEmail: args.customerEmail,
      customerPhone: args.customerPhone,
      shippingAddress: args.shippingAddress,
      items: args.items,
      totals: args.totals,
      status: "pending",
      createdAt: Date.now(),
    });

    return orderDbId;
  },
});

export const getOrderById = query({
  args: { orderId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("orders")
      .withIndex("by_orderId", (q) => q.eq("orderId", args.orderId))
      .first();
  },
});

export const getOrderByConvexId = query({
  args: { id: v.id("orders") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

