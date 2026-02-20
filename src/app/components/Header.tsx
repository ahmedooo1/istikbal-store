import { Menu, Phone, MapPin } from 'lucide-react';
import { useState, useRef } from 'react';
import { categories } from '../data/products';

interface HeaderProps {
  onNavigate: (page: string, category?: string, subcategory?: string, subsubcategory?: string, productId?: string) => void;
  currentPage: string;
  selectedCategory?: string | null;
}

export default function Header({ onNavigate, currentPage, selectedCategory }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null);

  const categoryCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const subcategoryCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCategoryTimer = () => {
    if (categoryCloseTimer.current) {
      clearTimeout(categoryCloseTimer.current);
      categoryCloseTimer.current = null;
    }
  };

  const scheduleCategoryClose = (delay = 180) => {
    clearCategoryTimer();
    categoryCloseTimer.current = setTimeout(() => setActiveCategory(null), delay);
  };

  const clearSubcategoryTimer = () => {
    if (subcategoryCloseTimer.current) {
      clearTimeout(subcategoryCloseTimer.current);
      subcategoryCloseTimer.current = null;
    }
  };

  const scheduleSubcategoryClose = (delay = 180) => {
    clearSubcategoryTimer();
    subcategoryCloseTimer.current = setTimeout(() => setActiveSubcategory(null), delay);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>Val-de-Reuil, France</span>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>+33 2 32 25 26 30</span>
            </div>
          </div>
          <div className="text-sm">
            Lun-Sam: 9h-19h | Dim: 10h-18h
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="/"
            onClick={(e) => { e.preventDefault(); onNavigate('home'); }}
            aria-label="Logo"
            className="flex items-center gap-3 text-2xl tracking-tight hover:opacity-80 transition-opacity"
          >
            <img src="/favicon.svg" alt="Meubles & Design" className="h-8 w-auto" />
            <span className="block text-xs text-slate-600 tracking-wide">MEUBLES & Décoration</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => onNavigate('home')}
              className={`transition-colors ${
                currentPage === 'home' ? 'text-slate-900' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Accueil
            </button>

            {categories.map((category) => (
              <div
                key={category.id}
                className="relative"
                onMouseEnter={() => {
                  clearCategoryTimer();
                  setActiveCategory(category.id);
                }}
                onMouseLeave={() => scheduleCategoryClose()}
              >
                <button
                  onClick={() => onNavigate('products', category.id)}
                  className={`transition-colors px-2 ${
                    selectedCategory === category.id ? 'text-slate-900' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {category.name}
                </button>

                {activeCategory === category.id && (
                  <div className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-lg py-2 min-w-[220px] z-50" onMouseEnter={() => clearCategoryTimer()} onMouseLeave={() => scheduleCategoryClose()}>
                    {category.subcategories.map((subcategory) => (
                      <div
                        key={subcategory.id}
                        className="relative group/sub"
                        onMouseEnter={() => {
                          clearSubcategoryTimer();
                          setActiveSubcategory(subcategory.id);
                        }}
                        onMouseLeave={() => scheduleSubcategoryClose()}
                      >
                        <button
                          onClick={() => {
                            onNavigate('products', category.id, subcategory.id);
                            setActiveCategory(null);
                            setActiveSubcategory(null);
                          }}
                          className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors flex items-center justify-between"
                        >
                          <span>{subcategory.name}</span>
                          {subcategory.subsubcategories && subcategory.subsubcategories.length > 0 && (
                            <span className="text-slate-400">›</span>
                          )}
                        </button>

                        {subcategory.subsubcategories && subcategory.subsubcategories.length > 0 && activeSubcategory === subcategory.id && (
                          <div className="absolute left-full top-0 ml-0" onMouseEnter={() => clearSubcategoryTimer()} onMouseLeave={() => scheduleSubcategoryClose()}>
                            <div className="bg-white shadow-xl rounded-lg py-2 min-w-[200px] border border-slate-100">
                              {subcategory.subsubcategories.map((subsubcategory) => (
                                <button
                                  key={subsubcategory.id}
                                  onClick={() => {
                                    onNavigate('products', category.id, subcategory.id, subsubcategory.id);
                                    setActiveCategory(null);
                                    setActiveSubcategory(null);
                                  }}
                                  className="w-full text-left px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                                >
                                  {subsubcategory.name}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <button
              onClick={() => onNavigate('contact')}
              className={`transition-colors ${
                currentPage === 'contact' ? 'text-slate-900' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Contact
            </button>

            {/* cart removed — no purchase flow */}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6 text-slate-700" />
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-slate-200">
            <nav className="flex flex-col gap-4">
              <button
                onClick={() => {
                  onNavigate('home');
                  setMobileMenuOpen(false);
                }}
                className="text-left text-slate-700 hover:text-slate-900 transition-colors"
              >
                Accueil
              </button>
              <button
                onClick={() => {
                  onNavigate('categories');
                  setMobileMenuOpen(false);
                }}
                className="text-left text-slate-700 hover:text-slate-900 transition-colors"
              >
                Nos Produits
              </button>
              <button
                onClick={() => {
                  onNavigate('contact');
                  setMobileMenuOpen(false);
                }}
                className="text-left text-slate-700 hover:text-slate-900 transition-colors"
              >
                Contact
              </button>
            </nav>
          </div>
        )}
      </div>

      {/* categories displayed in top navigation */}
    </header>
  );
}
