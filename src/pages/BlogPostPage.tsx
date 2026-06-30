import React, { useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { BLOG_POSTS } from "../blogContent";
import { Calendar, Clock, ArrowLeft, BookOpen, ExternalLink } from "lucide-react";

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  // Find post
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | Código Silencioso`;
      window.scrollTo(0, 0);
    }
  }, [post]);

  // If post not found, redirect to blog index page
  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  // Get suggested articles (excluding the current one)
  const suggestions = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <div className="bg-brand-dark min-h-screen pt-28 pb-20 text-slate-300 font-sans selection:bg-brand-gold selection:text-black">
      <div className="max-w-4xl mx-auto px-4 md:px-6 relative">
        {/* Back button */}
        <div className="mb-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-brand-gold transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>VOLVER AL BLOG</span>
          </Link>
        </div>

        {/* Article Container */}
        <article className="border border-brand-violet/20 bg-black/40 rounded-3xl p-6 sm:p-10 md:p-12 shadow-2xl relative overflow-hidden mb-12">
          {/* Top border accent */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-violet via-brand-gold to-brand-violet" />

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-brand-gold/80 mb-6">
            <span className="bg-brand-violet/20 border border-brand-violet/30 px-3 py-1 rounded-md uppercase tracking-wider text-[10px]">
              {post.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              {post.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              {post.readTime}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white tracking-wide font-black mb-8 leading-tight">
            {post.title}
          </h1>

          {/* Content Rendering */}
          <div className="space-y-6 text-sm sm:text-base leading-relaxed text-slate-300 text-justify">
            {post.content.map((paragraph, index) => {
              if (paragraph.startsWith("## ")) {
                return (
                  <h2
                    key={index}
                    className="text-white font-serif font-black text-lg sm:text-xl md:text-2xl pt-6 border-b border-brand-violet/10 pb-2 mb-4"
                  >
                    {paragraph.replace("## ", "")}
                  </h2>
                );
              }
              return (
                <p key={index} className="text-slate-300 font-sans leading-relaxed">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* CTA at the end of post */}
          <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-brand-violet/20 to-black/60 border border-brand-violet/30 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-lg text-center md:text-left">
              <h4 className="font-serif text-white font-black text-base sm:text-lg">
                ¿Quieres profundizar en protocolos biológicos rigurosos?
              </h4>
              <p className="text-xs text-slate-400">
                La neurociencia aplicada de Código Silencioso Volumen 2 contiene manuales prácticos paso a paso para hackear patrones de comportamiento y dominar tus decisiones diarias.
              </p>
            </div>
            <Link
              to="/"
              className="flex-shrink-0 bg-brand-gold text-black font-mono font-bold text-xs uppercase px-5 py-3 rounded-xl hover:bg-white transition-all cursor-pointer shadow-md tracking-wider flex items-center gap-1"
            >
              <span>SABER MÁS</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </article>

        {/* Suggestions Section */}
        <div className="border-t border-brand-violet/15 pt-12">
          <h3 className="font-serif text-xl text-white font-black tracking-wide mb-8 text-center sm:text-left">
            Otros artículos recomendados
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {suggestions.map((suggestion) => (
              <div
                key={suggestion.slug}
                className="bg-brand-dark/95 border border-brand-violet/15 hover:border-brand-gold/45 rounded-2xl p-5 space-y-3 flex flex-col justify-between transition-all duration-300 hover:shadow-lg group"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-brand-gold bg-brand-violet/20 px-2 py-0.5 rounded border border-brand-violet/30 uppercase tracking-wider inline-block">
                    {suggestion.category}
                  </span>
                  <h4 className="font-serif text-base font-black text-white group-hover:text-brand-gold transition-colors leading-snug">
                    <Link to={`/blog/${suggestion.slug}`}>{suggestion.title}</Link>
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                    {suggestion.description}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span>{suggestion.readTime}</span>
                  <Link
                    to={`/blog/${suggestion.slug}`}
                    className="text-brand-gold font-bold hover:underline"
                  >
                    LEER MÁS →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
