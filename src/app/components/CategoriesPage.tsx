import { motion } from 'motion/react';
import { ArrowRight, Sofa, Bed, Utensils, Briefcase } from 'lucide-react';
import { categories } from '../data/products';

interface CategoriesPageProps {
  onNavigate: (page: string, category?: string, subcategory?: string, subsubcategory?: string) => void;
}

export default function CategoriesPage({ onNavigate }: CategoriesPageProps) {
  const categoryIcons = {
    salon: Sofa,
    chambre: Bed,
    'salle-a-manger': Utensils,
    bureau: Briefcase,
  };

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl text-slate-900 mb-4">Nos Catégories</h1>
          <p className="text-slate-600 text-lg">
            Explorez notre gamme complète de meubles pour chaque espace de votre maison
          </p>
        </motion.div>

        <div className="space-y-12">
          {categories.map((category, index) => {
            const Icon = categoryIcons[category.id as keyof typeof categoryIcons];
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-slate-50 to-white rounded-3xl p-8 shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-slate-900 to-slate-700 rounded-2xl flex items-center justify-center">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl text-slate-900">{category.name}</h2>
                    <p className="text-slate-600">
                      {category.subcategories.length} sous-catégories disponibles
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {category.subcategories.map((subcategory, subIndex) => (
                    <motion.button
                      key={subcategory.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + subIndex * 0.05 }}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => onNavigate('products', category.id, subcategory.id)}
                      className="bg-white p-6 rounded-xl border-2 border-slate-100 hover:border-slate-900 transition-all text-left group"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg text-slate-900">{subcategory.name}</h3>
                        <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-slate-900 group-hover:translate-x-1 transition-all" />
                      </div>
                      <p className="text-sm text-slate-600">
                        Découvrir
                      </p>
                    </motion.button>
                  ))}
                </div>

                <div className="mt-6">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onNavigate('products', category.id)}
                    className="bg-slate-900 text-white px-6 py-3 rounded-full hover:bg-slate-800 transition-colors inline-flex items-center gap-2"
                  >
                    Voir tous les produits {category.name}
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
