import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const incrementView = mutation({
  args: {
    slug: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("blogViews")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();

    if (existing) {
      const nextCount = existing.count + 1;
      await ctx.db.patch(existing._id, {
        count: nextCount,
        updatedAt: Date.now(),
      });
      return nextCount;
    }

    await ctx.db.insert("blogViews", {
      slug: args.slug,
      count: 1,
      updatedAt: Date.now(),
    });

    return 1;
  },
});

export const getViewCount = query({
  args: {
    slug: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("blogViews")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();

    return existing ? existing.count : 0;
  },
});
