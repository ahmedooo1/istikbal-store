import { useState } from 'react';
import { motion } from 'motion/react';
import { Filter, Grid, List } from 'lucide-react';
import { products, categories } from '../data/products';
import { ImageWithFallback } from './figma/ImageWithFallback';
import ProductImageCarousel from './ProductImageCarousel';

interface ProductsPageProps {
  onNavigate: (page: string, category?: string, subcategory?: string, subsubcategory?: string, productId?: string) => void;
  selectedCategory?: string;
  selectedSubcategory?: string;
  selectedSubSubcategory?: string;
}

export default function ProductsPage({ onNavigate, selectedCategory, selectedSubcategory, selectedSubSubcategory }: ProductsPageProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [priceFilter, setPriceFilter] = useState<'all' | 'low' | 'medium' | 'high'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'price-asc' | 'price-desc'>('name');

  // Filter products
  let filteredProducts = products;
  
  if (selectedCategory) {
    filteredProducts = filteredProducts.filter(p => p.category === selectedCategory);
  }
  
  if (selectedSubcategory) {
    filteredProducts = filteredProducts.filter(p => p.subcategory === selectedSubcategory);
  }

  if (selectedSubSubcategory) {
    filteredProducts = filteredProducts.filter(p => p.subsubcategory === selectedSubSubcategory);
    // If no products found for the specific sub-subcategory, fall back to the parent subcategory
    if (filteredProducts.length === 0 && selectedSubcategory) {
      filteredProducts = products.filter(p => p.category === selectedCategory && p.subcategory === selectedSubcategory);
    }
  }

  // Price filter
  if (priceFilter === 'low') {
    filteredProducts = filteredProducts.filter(p => p.price < 400);
  } else if (priceFilter === 'medium') {
    filteredProducts = filteredProducts.filter(p => p.price >= 400 && p.price < 800);
  } else if (priceFilter === 'high') {
    filteredProducts = filteredProducts.filter(p => p.price >= 800);
  }

  // Sort
  if (sortBy === 'price-asc') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  } else {
    filteredProducts = [...filteredProducts].sort((a, b) => a.name.localeCompare(b.name));
  }

  const currentCategory = categories.find(c => c.id === selectedCategory);
  const currentSubcategory = currentCategory?.subcategories.find(s => s.id === selectedSubcategory);
  const currentSubSubcategory = currentSubcategory?.subsubcategories?.find(ss => ss.id === selectedSubSubcategory);

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 text-sm text-slate-600 mb-4">
            <button onClick={() => onNavigate('home')} className="text-slate-600 hover:text-slate-900">Accueil</button>
            <span>/</span>
            {currentCategory && (
              <>
                <button onClick={() => onNavigate('products', currentCategory.id)} className="text-slate-600 hover:text-slate-900">{currentCategory.name}</button>
                {currentSubcategory && (
                  <>
                    <span>/</span>
                    <button onClick={() => onNavigate('products', currentCategory.id, currentSubcategory.id)} className="text-slate-600 hover:text-slate-900">{currentSubcategory.name}</button>
                    {currentSubSubcategory && (
                      <>
                        <span>/</span>
                        <button onClick={() => onNavigate('products', currentCategory.id, currentSubcategory.id, currentSubSubcategory.id)} className="text-slate-700">{currentSubSubcategory.name}</button>
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </div>
          <h1 className="text-4xl text-slate-900 mb-2">
            {currentSubSubcategory?.name || currentSubcategory?.name || currentCategory?.name || 'Tous les produits'}
          </h1>
          <p className="text-slate-600">
            {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} disponible{filteredProducts.length > 1 ? 's' : ''}
          </p>
        </motion.div>

        {/* Filters and View Controls */}
        <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-slate-600" />
                <span className="text-sm text-slate-600">Filtres:</span>
              </div>
              
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value as any)}
                className="px-4 py-2 bg-slate-50 rounded-lg text-sm text-slate-900 border-2 border-transparent focus:border-slate-900 outline-none transition-colors"
              >
                <option value="all">Tous les prix</option>
                <option value="low">Moins de 400€</option>
                <option value="medium">400€ - 800€</option>
                <option value="high">Plus de 800€</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-2 bg-slate-50 rounded-lg text-sm text-slate-900 border-2 border-transparent focus:border-slate-900 outline-none transition-colors"
              >
                <option value="name">Trier par nom</option>
                <option value="price-asc">Prix croissant</option>
                <option value="price-desc">Prix décroissant</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid/List */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-600 text-lg">Aucun produit trouvé avec ces filtres.</p>
          </div>
        ) : (
          <div className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
              : 'space-y-6'
          }>
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -8 }}
                className={
                  viewMode === 'grid'
                    ? 'bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group cursor-pointer'
                    : 'bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group cursor-pointer flex flex-col md:flex-row'
                }
              >
                <div className={
                  viewMode === 'grid'
                    ? 'aspect-[4/3] overflow-hidden bg-slate-100'
                    : 'md:w-64 aspect-[4/3] overflow-hidden bg-slate-100'
                }>
                  <ProductImageCarousel
                    images={product.gallery && product.gallery.length > 0 ? product.gallery : [product.image]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    intervalMs={3500}
                    small
                  />
                </div>
                <div className="p-6 flex-1">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="text-xl text-slate-900">{product.name}</h3>
                    {product.featured && (
                      <span className="bg-gradient-to-r from-slate-900 to-slate-700 text-white text-xs px-3 py-1 rounded-full whitespace-nowrap">
                        Vedette
                      </span>
                    )}
                  </div>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl text-slate-900">{product.price}€</span>
                    <button
                      onClick={() => onNavigate('product', undefined, undefined, undefined, product.id)}
                      className="bg-slate-900 text-white px-6 py-2 rounded-full hover:bg-slate-800 transition-colors text-sm"
                    >
                      Voir détails
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
