import { ArrowRight, Truck, ShieldCheck, Headphones, Sofa, Bed, Utensils, Briefcase } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { products, categories } from '../data/products';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HomePageProps {
  onNavigate: (page: string, category?: string, subcategory?: string, subsubcategory?: string, productId?: string) => void;
}

const heroSlides = [
  {
    url: 'https://images.unsplash.com/photo-1759722665935-0967b4e0da93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsaXZpbmclMjByb29tJTIwc29mYXxlbnwxfHx8fDE3NzEzOTcyMDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Canapé d\'angle Milano',
    title: 'Canapés modernes',
    subtitle: 'Découvrez nos canapés d\'angle et 3 places pour un salon élégant et confortable.'
  },
  {
    url: 'https://images.unsplash.com/photo-1680503146454-04ac81a63550?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWRyb29tJTIwZnVybml0dXJlJTIwYmVkfGVufDF8fHx8MTc3MTM0NDM2MXww&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Lit Royale 160x200',
    title: 'Chambres raffinées',
    subtitle: 'Lits doubles et simples, armoires et commodes pour un espace nuit stylé.'
  },
  {
    url: 'https://images.unsplash.com/photo-1663756915302-437cd36f4cfd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaW5pbmclMjByb29tJTIwdGFibGUlMjBjaGFpcnN8ZW58MXx8fHwxNzcxMzQ5NDExfDA&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Table à manger extensible',
    title: 'Salle à manger design',
    subtitle: 'Tables extensibles et chaises confortables pour recevoir vos proches.'
  },
  {
    url: 'https://images.unsplash.com/photo-1623679072629-3aaa0192a391?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjBkZXNrfGVufDF8fHx8MTc3MTMxMDI1N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Bureau Exécutif',
    title: 'Bureaux fonctionnels',
    subtitle: 'Des bureaux spacieux et ergonomiques pour travailler avec style.'
  },
];

export default function HomePage({ onNavigate }: HomePageProps) {
  const featuredProducts = products.filter(p => p.featured);

  const categoryIcons = {
    salon: Sofa,
    chambre: Bed,
    'salle-a-manger': Utensils,
    bureau: Briefcase,
  };

  const [heroIndex, setHeroIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[420px] md:h-[500px] flex items-center justify-center border-b border-slate-200 overflow-hidden">
        {/* Carousel Images */}
        <div className="absolute inset-0 w-full h-full">
          {heroSlides.map((slide, idx) => (
            <ImageWithFallback
              key={slide.url}
              src={slide.url}
              alt={slide.alt}
              className={`w-full h-full object-cover object-center transition-opacity duration-1000 absolute inset-0 ${heroIndex === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
              style={{ transitionProperty: 'opacity' }}
            />
          ))}
          {/* Overlay foncé subtil sur toute l'image */}
          <div className="absolute inset-0 bg-black/30" />
          {/* Overlay blanc léger pour garder la clarté du design */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-slate-50/60 to-slate-100/60" />
        </div>
        <div className="relative z-20 w-full max-w-6xl flex flex-col md:flex-row items-center justify-center px-4 gap-8 md:gap-0">
          {/* Plus d'overlay local sous le texte, overlay global appliqué sur l'image */}
          {/* Texte à gauche sur desktop, en haut sur mobile */}
          <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left relative z-20">

            <motion.h2
              key={heroIndex}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-2xl md:text-3xl font-semibold text-white mb-2"
              style={{
                textShadow: '0 2px 8px rgba(0,0,0,0.85), 0 1px 0 #000',
              }}
            >
              {heroSlides[heroIndex].title}
            </motion.h2>
            <motion.p
              key={heroIndex + '-subtitle'}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-base md:text-lg text-white mb-6 max-w-md"
              style={{
                textShadow: '0 2px 8px rgba(0,0,0,0.85), 0 1px 0 #000',
              }}
            >
              {heroSlides[heroIndex].subtitle}
            </motion.p>
            <button
              onClick={() => onNavigate('categories')}
              className="bg-slate-900 text-white px-8 py-3 rounded-full font-medium text-base shadow hover:bg-slate-800 transition-colors"
            >
              Découvrir nos collections
            </button>
            {/* Carousel dots */}
            <div className="flex gap-2 mt-6 justify-center md:justify-start">
              {heroSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setHeroIndex(idx)}
                  className={`w-3 h-3 rounded-full border border-slate-400 ${heroIndex === idx ? 'bg-slate-900' : 'bg-white/80'}`}
                  aria-label={`Aller à l'image ${idx + 1}`}
                />
              ))}
            </div>
          </div>
          {/* Image à droite sur desktop, masquée sur mobile (car déjà en fond) */}
          <div className="hidden md:block flex-1 h-[340px] relative">
            <ImageWithFallback
              src={heroSlides[heroIndex].url}
              alt={heroSlides[heroIndex].alt}
              className="w-full h-full object-cover object-center rounded-2xl shadow-lg border border-slate-200"
              style={{ maxHeight: 340 }}
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl text-slate-900 mb-4">Nos Catégories</h2>
            <p className="text-slate-600 text-lg">
              Trouvez les meubles parfaits pour chaque pièce de votre maison
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => {
              const Icon = categoryIcons[category.id as keyof typeof categoryIcons];
              return (
                <motion.button
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  onClick={() => onNavigate('products', category.id)}
                  className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all text-left group"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-slate-900 to-slate-700 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl text-slate-900 mb-2">{category.name}</h3>
                  <p className="text-slate-600 text-sm mb-4">
                    {category.subcategories.length} sous-catégories
                  </p>
                  <div className="flex items-center gap-2 text-slate-900 group-hover:gap-4 transition-all">
                    <span className="text-sm">Explorer</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl text-slate-900 mb-4">Produits Vedettes</h2>
            <p className="text-slate-600 text-lg">
              Nos meilleures ventes et nouveautés
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group cursor-pointer"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  <div className="absolute top-4 right-4 bg-white/90 text-slate-900 px-3 py-1 rounded-full text-sm font-semibold shadow">
                    {product.price}€
                  </div>

                  <button
                    aria-label={`Aperçu rapide ${product.name}`}
                    onClick={() => onNavigate('product', undefined, undefined, undefined, product.id)}
                    className="absolute bottom-4 right-4 bg-slate-900 text-white px-3 py-2 rounded-full text-sm shadow-lg hover:bg-slate-800 transition-colors"
                  >
                    Aperçu
                  </button>
                </div>
                <div className="p-6">
                  <h3 className="text-xl text-slate-900 mb-2">{product.name}</h3>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 text-sm">Livraison 2-5j</span>
                    <button
                      onClick={() => onNavigate('product', undefined, undefined, undefined, product.id)}
                      className="bg-amber-400 text-slate-900 px-4 py-2 rounded-full hover:brightness-95 transition-colors text-sm"
                    >
                      Voir détails
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate('categories')}
              className="bg-slate-900 text-white px-8 py-4 rounded-full hover:bg-slate-800 transition-colors inline-flex items-center gap-2"
            >
              Voir tous les produits
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl text-slate-900 mb-2">Livraison Gratuite</h3>
              <p className="text-slate-600">
                Pour toute commande supérieure à 500€
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl text-slate-900 mb-2">Garantie Qualité</h3>
              <p className="text-slate-600">
                Garantie de 2 ans sur tous nos produits
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl text-slate-900 mb-2">Service Client</h3>
              <p className="text-slate-600">
                Une équipe à votre écoute 7j/7
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
