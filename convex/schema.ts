import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  blogViews: defineTable({
    slug: v.string(),
    count: v.number(),
    updatedAt: v.number(),
  }).index("by_slug", ["slug"]),
});
