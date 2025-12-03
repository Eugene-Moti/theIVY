"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Calendar, Clock, User, ChevronRight, Search, Tag, Share2, Bookmark, Heart, TrendingUp, Home, Building, MapPin, ChevronLeft, ChevronRight as RightIcon, Filter } from "lucide-react";

// Gold Star Component - Consistent with other pages
const GoldStar = () => (
  <svg className="w-12 h-12 md:w-14 md:h-14 text-[#bfa544]" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 .587l3.668 7.431 8.332 1.209-6 5.852 1.416 8.262L12 19.897l-7.416 3.896 1.416-8.262-6-5.852 8.332-1.209z" />
  </svg>
);

// Featured Article Card
const FeaturedArticle = ({ article, index }: { article: any; index: number }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="group relative bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500"
    >
      <div className="md:flex">
        {/* Image Section */}
        <div className="md:w-2/5 relative overflow-hidden">
          <div className="relative h-64 md:h-full">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#bfa544]/20 via-transparent to-black/40" />
            
            {/* Featured Badge */}
            <div className="absolute top-6 left-6">
              <span className="bg-gradient-to-r from-[#bfa544] to-[#d4c07a] text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                Featured
              </span>
            </div>
            
            {/* Category Badge */}
            <div className="absolute bottom-6 left-6">
              <span className="bg-white/90 backdrop-blur-sm text-[#bfa544] px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                <Tag className="w-3 h-3" />
                {article.category}
              </span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="md:w-3/5 p-8 md:p-12">
          <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{article.readTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{article.author}</span>
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6 leading-tight group-hover:text-[#bfa544] transition-colors">
            {article.title}
          </h2>
          
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            {article.excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-3 mb-8">
            {article.tags.map((tag: string, i: number) => (
              <span key={i} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-[#bfa544] hover:text-white transition-colors cursor-pointer">
                {tag}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center gap-3 text-[#bfa544] font-semibold text-lg"
            >
              Read Full Article
              <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </motion.button>
            
            <div className="flex items-center gap-4">
              <button className="text-gray-400 hover:text-[#bfa544] transition-colors">
                <Heart className="w-5 h-5" />
              </button>
              <button className="text-gray-400 hover:text-[#bfa544] transition-colors">
                <Bookmark className="w-5 h-5" />
              </button>
              <button className="text-gray-400 hover:text-[#bfa544] transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

// Regular Article Card
const ArticleCard = ({ article, index }: { article: any; index: number }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${article.category === 'Luxury Living' ? 'bg-[#bfa544] text-white' : article.category === 'Investment' ? 'bg-blue-500 text-white' : 'bg-green-500 text-white'}`}>
            {article.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{article.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{article.readTime}</span>
          </div>
        </div>

        <h3 className="text-xl font-serif font-bold text-gray-900 mb-3 group-hover:text-[#bfa544] transition-colors line-clamp-2">
          {article.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {article.excerpt}
        </p>

        {/* Author */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#bfa544] to-[#d4c07a] flex items-center justify-center text-white text-sm font-semibold">
            {article.author.charAt(0)}
          </div>
          <span className="text-sm text-gray-700">{article.author}</span>
        </div>

        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
          <button className="text-[#bfa544] font-semibold text-sm hover:text-[#d4c07a] transition-colors">
            Read More
          </button>
          <div className="flex items-center gap-2">
            <button className="text-gray-400 hover:text-[#bfa544] transition-colors">
              <Heart className="w-4 h-4" />
            </button>
            <span className="text-xs text-gray-500">{article.likes}</span>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

// Popular Post Card
const PopularPost = ({ post, index }: { post: any; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group flex items-center gap-4 p-4 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer"
    >
      {/* Number */}
      <div className="text-2xl font-bold text-gray-300 group-hover:text-[#bfa544] transition-colors">
        {index + 1}
      </div>
      
      {/* Content */}
      <div className="flex-1">
        <h4 className="font-semibold text-gray-900 mb-1 group-hover:text-[#bfa544] transition-colors line-clamp-2">
          {post.title}
        </h4>
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {post.date}
          </span>
          <span>{post.views} views</span>
        </div>
      </div>
    </motion.div>
  );
};

export default function BlogPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scaleBg = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [0.7, 0.95]);

  // Mock data for featured articles
  const featuredArticles = [
    {
      id: 1,
      title: "The Future of Luxury Living in Nairobi: Trends Shaping 2024",
      excerpt: "Discover how innovative architecture, smart home technology, and sustainable design are redefining luxury living in Nairobi's most prestigious neighborhoods.",
      image: "/renders/251027_FINAL_Cinema-View 1_IVY PARK.jpg",
      date: "Mar 15, 2024",
      readTime: "8 min read",
      author: "Sarah Johnson",
      category: "Luxury Living",
      tags: ["Luxury", "Trends", "Nairobi", "Design", "Innovation"]
    },
    {
      id: 2,
      title: "Investment Strategies: Why Real Estate in Westlands Remains Top Choice",
      excerpt: "An in-depth analysis of the Westlands property market, investment opportunities, and why it continues to be the preferred choice for savvy investors.",
      image: "/designs/Luckinn Ivy.jpg",
      date: "Mar 10, 2024",
      readTime: "6 min read",
      author: "Michael Chen",
      category: "Investment",
      tags: ["Investment", "Westlands", "Market", "ROI", "Analysis"]
    }
  ];

  // Mock data for regular articles
  const articles = [
    {
      id: 3,
      title: "Sustainable Architecture: Building Eco-Friendly Luxury Homes",
      excerpt: "Exploring how luxury homes can incorporate sustainable practices without compromising on elegance and comfort.",
      image: "/designs/IMG-20250709-WA0080.jpg",
      date: "Mar 5, 2024",
      readTime: "5 min read",
      author: "Emma Wilson",
      category: "Design",
      likes: 42
    },
    {
      id: 4,
      title: "The Rise of Smart Homes in Kenya: Technology Meets Comfort",
      excerpt: "How smart home technology is transforming the way we live and adding value to luxury properties in Kenya.",
      image: "/designs/blossom.jpg",
      date: "Feb 28, 2024",
      readTime: "7 min read",
      author: "David Kim",
      category: "Technology",
      likes: 56
    },
    {
      id: 5,
      title: "Interior Design Trends for Modern Apartments",
      excerpt: "From minimalist aesthetics to bold statements, discover the latest interior design trends for urban living.",
      image: "/designs/IMG-20250709-WA0082.jpg",
      date: "Feb 22, 2024",
      readTime: "4 min read",
      author: "Lisa Rodriguez",
      category: "Design",
      likes: 38
    },
    {
      id: 6,
      title: "Property Market Analysis: Kilimani vs. Kileleshwa",
      excerpt: "A comparative study of Nairobi's two most sought-after residential neighborhoods for property investment.",
      image: "/designs/IMG-20250709-WA0081.jpg",
      date: "Feb 18, 2024",
      readTime: "6 min read",
      author: "James Mwangi",
      category: "Market",
      likes: 64
    },
    {
      id: 7,
      title: "Maximizing ROI on Luxury Real Estate Investments",
      excerpt: "Expert tips and strategies for getting the best returns on your luxury property investments in Nairobi.",
      image: "/designs/Exterior_07_IA.png",
      date: "Feb 12, 2024",
      readTime: "5 min read",
      author: "Rachel Wang",
      category: "Investment",
      likes: 49
    },
    {
      id: 8,
      title: "The Art of Creating Community in Luxury Developments",
      excerpt: "How thoughtful design and amenities foster a sense of community in high-end residential complexes.",
      image: "/designs/Nandwa-Ivy.png",
      date: "Feb 8, 2024",
      readTime: "4 min read",
      author: "Thomas Omondi",
      category: "Community",
      likes: 31
    }
  ];

  // Popular posts
  const popularPosts = [
    { id: 1, title: "Top 5 Luxury Amenities Home Buyers Want in 2024", date: "Mar 12, 2024", views: "1.2K" },
    { id: 2, title: "Understanding Property Taxes for Luxury Real Estate", date: "Mar 8, 2024", views: "980" },
    { id: 3, title: "The Impact of Remote Work on Luxury Home Design", date: "Mar 3, 2024", views: "1.5K" },
    { id: 4, title: "Why Gated Communities Are Becoming More Popular", date: "Feb 27, 2024", views: "890" },
    { id: 5, title: "Smart Security Systems for Luxury Properties", date: "Feb 20, 2024", views: "1.1K" }
  ];

  // Categories
  const categories = [
    { name: "All", count: 24 },
    { name: "Luxury Living", count: 8 },
    { name: "Investment", count: 6 },
    { name: "Design", count: 5 },
    { name: "Market Trends", count: 4 },
    { name: "Community", count: 3 }
  ];

  // Tags
  const popularTags = ["Luxury", "Investment", "Nairobi", "Design", "Trends", "Real Estate", "Smart Homes", "Sustainability", "Architecture", "Market"];

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      {/* HERO SECTION */}
      <section ref={heroRef} className="relative min-h-[70vh] overflow-hidden">
        <motion.div 
          style={{ y: yBg, scale: scaleBg }} 
          className="absolute inset-0 -z-10"
        >
          <Image
            src="/renders/251027_Final_Lounge - View 02_IVY PARK.jpg"
            alt="IVY GROUP Blog"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>

        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/70"
        />

        <div className="relative z-10 flex items-center justify-center min-h-[70vh] px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            className="relative max-w-5xl"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="mb-8"
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-serif text-white drop-shadow-2xl mb-6 tracking-tight">
                IVY <span className="text-[#bfa544]">INSIGHTS</span>
              </h1>
              
              <div className="flex items-center justify-center gap-6">
                <div className="h-px w-32 bg-[#bfa544]/70" />
                <GoldStar />
                <div className="h-px w-32 bg-[#bfa544]/70" />
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto leading-relaxed drop-shadow-lg mb-12"
            >
              Expert perspectives on luxury living, real estate investment, and design innovation
            </motion.p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="max-w-2xl mx-auto"
            >
              <div className="relative">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles, topics, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/10 backdrop-blur-lg border border-white/20 text-white placeholder-gray-300 rounded-full pl-14 pr-6 py-5 focus:outline-none focus:ring-2 focus:ring-[#bfa544] focus:border-transparent"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#bfa544] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#d4c07a] transition-colors">
                  Search
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="py-20 bg-gradient-to-b from-[#f8f9f7] to-[#e9ede9]">
        <div className="max-w-7xl mx-auto px-6">
          {/* Featured Articles */}
          <div className="mb-20">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold font-serif text-[#222] mb-4">Featured Insights</h2>
              <div className="flex items-center justify-center gap-6">
                <div className="h-px w-32 bg-[#bfa544]" />
                <GoldStar />
                <div className="h-px w-32 bg-[#bfa544]" />
              </div>
            </div>

            <div className="space-y-12">
              {featuredArticles.map((article, index) => (
                <FeaturedArticle key={article.id} article={article} index={index} />
              ))}
            </div>
          </div>

          {/* Main Content with Sidebar */}
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Articles Grid */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-serif font-bold text-gray-900">
                  Latest Articles
                  {selectedCategory !== "All" && (
                    <span className="text-[#bfa544] ml-2">• {selectedCategory}</span>
                  )}
                </h3>
                
                {/* Category Filter - Mobile */}
                <div className="lg:hidden">
                  <select 
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#bfa544]"
                  >
                    {categories.map(category => (
                      <option key={category.name} value={category.name}>
                        {category.name} ({category.count})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Articles Grid */}
              {filteredArticles.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-8">
                  {filteredArticles.map((article, index) => (
                    <ArticleCard key={article.id} article={article} index={index} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
                  <div className="text-gray-400 mb-4">
                    <Search className="w-16 h-16 mx-auto" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-700 mb-2">No articles found</h4>
                  <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                </div>
              )}

              {/* Pagination */}
              <div className="flex items-center justify-center gap-4 mt-12">
                <button className="w-10 h-10 flex items-center justify-center bg-white rounded-lg border border-gray-200 hover:bg-[#bfa544] hover:text-white hover:border-[#bfa544] transition-colors">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                {[1, 2, 3, 4, 5].map(page => (
                  <button
                    key={page}
                    className={`w-10 h-10 flex items-center justify-center rounded-lg font-semibold transition-colors ${
                      page === 1
                        ? 'bg-[#bfa544] text-white'
                        : 'bg-white text-gray-700 border border-gray-200 hover:bg-[#bfa544] hover:text-white hover:border-[#bfa544]'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button className="w-10 h-10 flex items-center justify-center bg-white rounded-lg border border-gray-200 hover:bg-[#bfa544] hover:text-white hover:border-[#bfa544] transition-colors">
                  <RightIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Categories - Desktop */}
              <div className="hidden lg:block bg-white rounded-2xl shadow-xl p-6">
                <h4 className="text-xl font-serif font-bold text-gray-900 mb-6">Categories</h4>
                <div className="space-y-3">
                  {categories.map(category => (
                    <button
                      key={category.name}
                      onClick={() => setSelectedCategory(category.name)}
                      className={`flex items-center justify-between w-full p-3 rounded-lg transition-colors ${
                        selectedCategory === category.name
                          ? 'bg-[#bfa544] text-white'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <span className="font-medium">{category.name}</span>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        selectedCategory === category.name
                          ? 'bg-white/20'
                          : 'bg-gray-100'
                      }`}>
                        {category.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Popular Posts */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <TrendingUp className="w-6 h-6 text-[#bfa544]" />
                  <h4 className="text-xl font-serif font-bold text-gray-900">Trending Now</h4>
                </div>
                <div className="space-y-1">
                  {popularPosts.map((post, index) => (
                    <PopularPost key={post.id} post={post} index={index} />
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h4 className="text-xl font-serif font-bold text-gray-900 mb-6">Popular Tags</h4>
                <div className="flex flex-wrap gap-3">
                  {popularTags.map(tag => (
                    <button
                      key={tag}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-[#bfa544] hover:text-white transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-gradient-to-br from-[#bfa544] to-[#d4c07a] rounded-2xl shadow-xl p-8 text-white">
                <div className="text-center">
                  <h4 className="text-2xl font-serif font-bold mb-4">Stay Updated</h4>
                  <p className="text-white/90 mb-6">
                    Subscribe to our newsletter for the latest insights and updates
                  </p>
                  <div className="space-y-4">
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="w-full bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 rounded-full px-6 py-4 focus:outline-none focus:ring-2 focus:ring-white"
                    />
                    <button className="w-full bg-white text-[#bfa544] font-semibold py-4 rounded-full hover:bg-gray-100 transition-colors">
                      Subscribe Now
                    </button>
                  </div>
                  <p className="text-xs text-white/70 mt-4">
                    By subscribing, you agree to our Privacy Policy
                  </p>
                </div>
              </div>

              {/* Call to Action */}
              <div className="bg-gradient-to-br from-[#222] to-[#444] rounded-2xl shadow-xl p-8 text-white text-center">
                <Home className="w-12 h-12 text-[#bfa544] mx-auto mb-4" />
                <h4 className="text-xl font-serif font-bold mb-3">Ready to Find Your Dream Home?</h4>
                <p className="text-gray-300 mb-6">
                  Explore our exclusive properties and schedule a viewing today
                </p>
                <Link
                  href="/buy"
                  className="inline-block bg-[#bfa544] text-white font-semibold px-8 py-3 rounded-full hover:bg-[#d4c07a] transition-colors"
                >
                  View Properties
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERT INSIGHTS SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-serif text-[#222] mb-4">Meet Our Experts</h2>
            <div className="flex items-center justify-center gap-6">
              <div className="h-px w-32 bg-[#bfa544]" />
              <GoldStar />
              <div className="h-px w-32 bg-[#bfa544]" />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Senior Design Director",
                bio: "With over 15 years in luxury architecture, Sarah brings international experience to Nairobi's skyline.",
                image: "/designs/IMG-20250709-WA0080.jpg"
              },
              {
                name: "Michael Chen",
                role: "Investment Strategist",
                bio: "Michael specializes in real estate investment analysis and market forecasting across East Africa.",
                image: "/designs/Luckinn Ivy.jpg"
              },
              {
                name: "Emma Wilson",
                role: "Sustainability Consultant",
                bio: "Emma leads our green initiatives, integrating sustainable practices into luxury developments.",
                image: "/designs/blossom.jpg"
              }
            ].map((expert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-gradient-to-br from-[#faf9f5] to-white rounded-2xl shadow-xl p-8 text-center group hover:shadow-2xl transition-all"
              >
                <div className="relative w-24 h-24 mx-auto mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#bfa544] to-[#d4c07a] rounded-full" />
                  <div className="absolute inset-2 bg-white rounded-full" />
                  <div className="absolute inset-4 rounded-full overflow-hidden">
                    <Image
                      src={expert.image}
                      alt={expert.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <h4 className="text-xl font-serif font-bold text-gray-900 mb-2">{expert.name}</h4>
                <p className="text-[#bfa544] font-semibold mb-4">{expert.role}</p>
                <p className="text-gray-600 text-sm">{expert.bio}</p>
                <button className="mt-6 text-[#bfa544] font-semibold text-sm hover:text-[#d4c07a] transition-colors">
                  View Articles →
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 bg-gradient-to-r from-[#bfa544] to-[#d4c07a]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
            Have a Real Estate Question?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Our experts are here to help with your luxury real estate inquiries
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/contact"
              className="inline-block bg-white text-[#bfa544] px-10 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors shadow-2xl"
            >
              Contact Our Team
            </Link>
            <Link
              href="/buy"
              className="inline-block border-2 border-white text-white px-10 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-colors"
            >
              Browse Properties
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}