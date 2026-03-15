import { productList } from "./our-product/page";
import { connectDB } from "../lib/db";
import Blog from "../models/Blog";

export default async function sitemap() {

  const baseUrl = "http://localhost:3000"; // Change to your actual domain in production

  // Static pages
  const staticPages = [
    "",
    "/about",
    "/contact",
    "/gallery",
    "/our-product",
    "/blogs",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));


  // Product pages (static list)
  const productPages = productList.map((product) => ({
    url: `${baseUrl}/our-product/${product.slug}`,
    lastModified: new Date(),
  }));


  // Blog pages (dynamic from DB)
  await connectDB();

  const blogs = await Blog.find({ status: "Published" }).select("slug updatedAt");

  const blogPages = blogs.map((blog) => ({
    url: `${baseUrl}/blogs/${blog.slug}`,
    lastModified: blog.updatedAt || new Date(),
  }));


  return [
    ...staticPages,
    ...productPages,
    ...blogPages,
  ];
}