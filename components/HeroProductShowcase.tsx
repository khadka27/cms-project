'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Star, Sparkles, ArrowRight } from 'lucide-react';
import type { Product } from '@/lib/types';

export interface ShowcaseProduct {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  glow: string;
  slug: string;
  rating?: number;
}

const DEFAULT_SHOWCASE_PRODUCTS: ShowcaseProduct[] = [
  {
    id: 'sample-1',
    name: 'Air Max Sneaker',
    description: 'Edición Especial Deportiva',
    price: '$129.99',
    image: 'https://pngimg.com/uploads/running_shoes/running_shoes_PNG5823.png',
    glow: '#34d399',
    slug: 'products',
    rating: 4.9,
  },
  {
    id: 'sample-2',
    name: 'Classic Headphones',
    description: 'Audio Profesional de Estudio',
    price: '$89.99',
    image: 'https://pngimg.com/uploads/headphones/headphones_PNG101988.png',
    glow: '#60a5fa',
    slug: 'products',
    rating: 4.8,
  },
  {
    id: 'sample-3',
    name: 'Premium Watch',
    description: 'Diseño Inteligente y Elegante',
    price: '$199.99',
    image: 'https://pngimg.com/uploads/watches/watches_PNG101420.png',
    glow: '#c084fc',
    slug: 'products',
    rating: 5.0,
  },
];

const GLOW_PALETTE = ['#34d399', '#60a5fa', '#c084fc', '#f59e0b', '#06b6d4', '#ec4899'];

export default function HeroProductShowcase({ products = [] }: { products?: Product[] }) {
  const showcaseItems: ShowcaseProduct[] = useMemo(() => {
    if (!products || products.length === 0) {
      return DEFAULT_SHOWCASE_PRODUCTS;
    }

    const items: ShowcaseProduct[] = [];
    const fallbackImages = [
      'https://pngimg.com/uploads/running_shoes/running_shoes_PNG5823.png',
      'https://pngimg.com/uploads/headphones/headphones_PNG101988.png',
      'https://pngimg.com/uploads/watches/watches_PNG101420.png',
    ];

    products.slice(0, 6).forEach((p, idx) => {
      const validImage =
        p.featuredImage && p.featuredImage.trim() !== ''
          ? p.featuredImage
          : p.image && p.image.trim() !== ''
            ? p.image
            : fallbackImages[idx % fallbackImages.length];

      items.push({
        id: p.id,
        name: p.name,
        description: p.shortDescription || 'Análisis exhaustivo y pruebas verificadas',
        price: p.price ? `$${Number(p.price).toFixed(2)}` : '$29.99',
        image: validImage,
        glow: GLOW_PALETTE[idx % GLOW_PALETTE.length],
        slug: p.slug || 'products',
        rating: 4.9,
      });
    });

    return items.length > 0 ? items : DEFAULT_SHOWCASE_PRODUCTS;
  }, [products]);

  const [current, setCurrent] = useState(0);
  const [animClass, setAnimClass] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const sceneRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const productRef = useRef<HTMLImageElement>(null);
  const animatingRef = useRef(false);

  const currentItem = showcaseItems[current] || showcaseItems[0];

  // Auto transition every 5.5 seconds if not hovered and not animating
  useEffect(() => {
    if (isHovered || showcaseItems.length <= 1) return;

    const interval = setInterval(() => {
      showProduct((current + 1) % showcaseItems.length);
    }, 5500);

    return () => clearInterval(interval);
  }, [current, isHovered, showcaseItems.length]);

  const showProduct = (nextIndex: number) => {
    if (animatingRef.current) return;
    animatingRef.current = true;

    if (cardRef.current) cardRef.current.style.transform = '';
    if (productRef.current) productRef.current.style.transform = '';

    setAnimClass('scene-exit');

    setTimeout(() => {
      setCurrent(nextIndex);
      setAnimClass('scene-enter');

      setTimeout(() => {
        setAnimClass('');
        animatingRef.current = false;
      }, 700);
    }, 500);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    showProduct((current + 1) % showcaseItems.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    showProduct((current - 1 + showcaseItems.length) % showcaseItems.length);
  };

  // 3D dynamic mouse tilt tracking
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (animatingRef.current || !sceneRef.current || !cardRef.current || !productRef.current) return;

    const rect = sceneRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    cardRef.current.style.transform = `
      translateY(190px)
      rotateX(${55 - y * 10}deg)
      rotateY(${x * 10}deg)
      scale(0.85)
    `;

    productRef.current.style.transform = `
      translateY(-35px)
      translateZ(170px)
      scale(1.24)
      rotateY(${x * 15}deg)
      rotateX(${-y * 8}deg)
    `;
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (cardRef.current) cardRef.current.style.transform = '';
    if (productRef.current) productRef.current.style.transform = '';
  };

  return (
    <div className="w-full flex flex-col items-center justify-center select-none py-2">
      {/* White Glassmorphism styling & 3D preserve-3d scene rules */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .showcase-scene {
          width: 350px;
          height: 460px;
          perspective: 1200px;
          position: relative;
        }

        .showcase-card {
          position: absolute;
          inset: 0;
          border-radius: 28px;
          transform-style: preserve-3d;
          transition: transform .85s cubic-bezier(.2,.8,.2,1);
        }

        /* Pure White Glassmorphism Card: Crisp, clean, luxury white with subtle depth and zero washout */
        .showcase-card-bg {
          position: absolute;
          inset: 0;
          border-radius: 28px;
          background: linear-gradient(
            150deg,
            rgba(255, 255, 255, 0.98) 0%,
            rgba(255, 255, 255, 0.93) 55%,
            rgba(244, 248, 253, 0.96) 100%
          );
          backdrop-filter: blur(24px) saturate(190%);
          -webkit-backdrop-filter: blur(24px) saturate(190%);
          border: 1.5px solid rgba(255, 255, 255, 1);
          box-shadow: 
            0 25px 50px -12px rgba(2, 62, 138, 0.14),
            0 12px 24px -6px rgba(15, 23, 42, 0.08),
            0 1px 3px 0 rgba(15, 23, 42, 0.04),
            inset 0 2px 4px 0 rgba(255, 255, 255, 1),
            inset 0 -2px 4px 0 rgba(2, 62, 138, 0.03);
          transition: opacity .65s ease;
        }

        .showcase-top-badges {
          transition: opacity .4s ease;
        }

        .showcase-info {
          position: absolute;
          bottom: 22px;
          left: 20px;
          right: 20px;
          text-align: left;
          transition: opacity .4s ease;
        }

        .showcase-glow {
          position: absolute;
          width: 260px;
          height: 260px;
          top: 60px;
          left: 50%;
          transform: translateX(-50%);
          filter: blur(85px);
          opacity: .30;
          transition: opacity .7s ease, transform .7s ease, background .7s ease;
          pointer-events: none;
        }

        /* Centered product stage with generous padding and clean bounds */
        .showcase-product-stage {
          position: absolute;
          top: 60px;
          left: 20px;
          right: 20px;
          height: 220px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 5;
          pointer-events: none;
        }

        .showcase-product-img {
          max-width: 100%;
          max-height: 210px;
          width: auto;
          height: auto;
          object-fit: contain;
          border-radius: 18px;
          transform: translateZ(40px);
          filter: drop-shadow(0 15px 22px rgba(15, 23, 42, 0.16));
          transition: transform .85s cubic-bezier(.2,.8,.2,1);
        }

        /* 3D Hover transformation: Card falls backward, product floats forward in 3D */
        .showcase-scene:hover .showcase-card {
          transform: translateY(190px) rotateX(55deg) scale(.85);
        }

        .showcase-scene:hover .showcase-card-bg {
          opacity: 0;
        }

        .showcase-scene:hover .showcase-top-badges {
          opacity: 0;
        }

        .showcase-scene:hover .showcase-info {
          opacity: 0;
        }

        .showcase-scene:hover .showcase-product-img {
          transform: translateY(-35px) translateZ(170px) scale(1.24);
          filter: drop-shadow(0 25px 35px rgba(2, 62, 138, 0.28));
        }

        .showcase-scene:hover .showcase-glow {
          opacity: .60;
          transform: translateX(-50%) scale(1.45);
        }

        /* Smooth Carousel Transitions */
        .scene-enter {
          animation: showcaseEnterAnim .7s ease both;
        }

        .scene-exit {
          animation: showcaseExitAnim .5s ease both;
        }

        @keyframes showcaseEnterAnim {
          from {
            opacity: 0;
            transform: translateY(50px) scale(.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes showcaseExitAnim {
          to {
            opacity: 0;
            transform: translateY(-35px) scale(.92);
          }
        }

        @media(max-width: 500px) {
          .showcase-scene {
            width: 295px;
            height: 420px;
          }
          .showcase-product-stage {
            height: 190px;
            top: 55px;
          }
          .showcase-product-img {
            max-height: 185px;
          }
          .showcase-info {
            bottom: 18px;
            left: 16px;
            right: 16px;
          }
        }
      `}} />

      {/* Interactive 3D Scene */}
      <Link
        href={`/${currentItem.slug}`}
        className="block focus:outline-none"
        title={`Ver análisis de ${currentItem.name}`}
      >
        <div
          ref={sceneRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          className={`showcase-scene cursor-pointer ${animClass}`}
        >
          {/* Falling 3D White Card */}
          <div ref={cardRef} className="showcase-card">
            <div className="showcase-card-bg" />

            {/* High-Contrast Badges on White Card (100% Crisp, Never Washed Out) */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 showcase-top-badges">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-black tracking-wider uppercase bg-french_blue text-white shadow-sm border border-french_blue/40">
                <Sparkles className="w-3.5 h-3.5 text-white fill-white/30" />
                <span>DESTACADO</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-[11px] font-black bg-white text-slate-800 border border-slate-200/90 shadow-sm">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                <span className="font-extrabold text-slate-900">
                  {currentItem.rating ?? 4.9}
                </span>
              </span>
            </div>

            {/* Bottom Info Panel: Sharp Typography for White Background */}
            <div className="showcase-info">
              <div className="mb-2.5">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug line-clamp-1">
                  {currentItem.name}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 line-clamp-1 font-medium mt-0.5">
                  {currentItem.description}
                </p>
              </div>

              {/* Price and Solid Action Button */}
              <div className="flex items-center justify-between gap-3 pt-2.5 border-t border-slate-200/80">
                <span className="text-2xl sm:text-3xl font-black text-emerald-600 tracking-tight">
                  {currentItem.price}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-french_blue hover:bg-deep_twilight px-4 py-2 rounded-xl shadow-md shadow-french_blue/25 transition-all duration-200">
                  <span>Ver Análisis</span>
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </span>
              </div>
            </div>
          </div>

          {/* Radial Ambient Glow */}
          <div
            className="showcase-glow"
            style={{
              background: currentItem.glow,
            }}
          />

          {/* Centered Product Stage & 3D Floating Product */}
          <div className="showcase-product-stage">
            <img
              ref={productRef}
              src={currentItem.image}
              alt={currentItem.name}
              className="showcase-product-img"
            />
          </div>
        </div>
      </Link>

      {/* High-Contrast Navigation Controls */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous product"
          className="w-10 h-10 rounded-full bg-white hover:bg-french_blue hover:text-white text-slate-700 shadow-md border border-slate-200/90 flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5 -ml-0.5" />
        </button>

        {/* Dots Pill Container with High Contrast */}
        <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white shadow-md border border-slate-200/90">
          {showcaseItems.map((item, idx) => (
            <button
              key={item.id || idx}
              type="button"
              onClick={() => showProduct(idx)}
              aria-label={`Go to ${item.name}`}
              className={`h-2 transition-all duration-300 cursor-pointer rounded-full ${idx === current
                  ? 'w-7 bg-french_blue shadow-xs'
                  : 'w-2 bg-slate-300 hover:bg-slate-400'
                }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={handleNext}
          aria-label="Next product"
          className="w-10 h-10 rounded-full bg-white hover:bg-french_blue hover:text-white text-slate-700 shadow-md border border-slate-200/90 flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer"
        >
          <ChevronRight className="w-5 h-5 -mr-0.5" />
        </button>
      </div>
    </div>
  );
}
