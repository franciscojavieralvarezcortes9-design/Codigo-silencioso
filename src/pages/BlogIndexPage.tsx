import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BLOG_POSTS } from "../blogContent";
import { BookOpen, Calendar, Clock, ArrowRight, Search } from "lucide-react";

export const BlogIndexPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  useEffect(() => {
    document.title = "Blog de Neurociencia y Hábitos | Código Silencioso";
    window.scrollTo(0, 0);
  }, []);

  const categories = ["Todos", ...new Set(BLOG_POSTS.map(post => post.category))];

  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Todos" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-brand-dark min-h-screen pt-28 pb-20 text-slate-300 font-sans selection:bg-brand-gold selection:text-black">
      <div className="max-w-6xl mx-auto px-4 md:px-6 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-violet/5 rounded-full blur-[120px] pointer-events-none" />

        {/* Blog Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
          <span className="text-xs font-mono text-brand-gold tracking-widest uppercase block mb-3 animate-pulse">
            [ ARCHIVO DE DIVULGACIÓN CIENTÍFICA ]
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-white tracking-wide font-black mb-4">
            Bitácora de Neurociencia y Hábitos
          </h1>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Artículos científicos con un tono riguroso, honesto y empírico. Desmitificamos la psicología del desarrollo personal y analizamos el cableado biológico humano.
          </p>
        </div>

        {/* Controls: Search and Filters */}
        <div className="max-w-4xl mx-auto mb-12 flex flex-col md:flex-row gap-4 items-center justify-between bg-black/30 border border-brand-violet/15 p-4 rounded-2xl relative z-10">
          {/* Search bar */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Buscar artículos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-black/60 border border-brand-violet/30 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/20 transition-all"
            />
          </div>

          {/* Category filter pills */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-mono tracking-wider uppercase transition-all cursor-pointer ${
                  selectedCategory === category
                    ? "bg-brand-gold text-black font-bold"
                    : "bg-black/40 text-slate-400 border border-brand-violet/20 hover:text-white hover:border-brand-violet/55"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto relative z-10">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <article
                key={post.slug}
                className="bg-brand-dark/95 border border-brand-violet/15 hover:border-brand-gold/45 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-[0_15px_30px_rgba(107,33,232,0.04)] transform hover:-translate-y-1 group"
              >
                <div className="p-6 space-y-4">
                  {/* Category and Read time */}
                  <div className="flex items-center justify-between text-[10px] font-mono text-brand-gold/80">
                    <span className="bg-brand-violet/20 border border-brand-violet/30 px-2.5 py-1 rounded-md uppercase tracking-wider text-[9px]">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="font-serif text-lg sm:text-xl font-black text-white leading-snug group-hover:text-brand-gold transition-colors">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed text-justify line-clamp-3">
                    {post.description}
                  </p>
                </div>

                {/* Footer Link */}
                <div className="px-6 pb-6 pt-2 border-t border-brand-violet/10 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </span>
                  
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-mono text-brand-gold font-bold group-hover:gap-2 transition-all"
                  >
                    <span>LEER ARTÍCULO</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))
          ) : (
            <div className="col-span-full py-16 text-center space-y-3 bg-black/20 border border-brand-violet/15 rounded-2xl">
              <BookOpen className="w-8 h-8 text-slate-500 mx-auto animate-bounce" />
              <p className="text-sm font-mono text-slate-400">
                No se encontraron artículos que coincidan con su búsqueda.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("Todos");
                }}
                className="text-xs font-mono text-brand-gold underline hover:text-white transition-colors cursor-pointer"
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
