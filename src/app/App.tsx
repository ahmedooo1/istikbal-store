import { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import CategoriesPage from './components/CategoriesPage';
import ProductsPage from './components/ProductsPage';
import ProductDetail from './components/ProductDetail';
import ContactPage from './components/ContactPage';
import StaticPage from './components/StaticPage';
import Chatbot from './components/Chatbot';

type Page = 'home' | 'categories' | 'products' | 'product' | 'contact' | 'static';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | undefined>();
  const [selectedSubSubcategory, setSelectedSubSubcategory] = useState<string | undefined>();
  const [selectedProductId, setSelectedProductId] = useState<string | undefined>();
  const [selectedStaticSlug, setSelectedStaticSlug] = useState<string | undefined>();

  // Build a readable URL for the current state so it survives refresh / can be bookmarked
  const buildUrl = (page: string, category?: string, subcategory?: string, subsubcategory?: string, productId?: string, slug?: string) => {
    const params = new URLSearchParams();
    params.set('page', page || 'home');
    if (category) params.set('category', category);
    if (subcategory) params.set('subcategory', subcategory);
    if (subsubcategory) params.set('subsubcategory', subsubcategory);
    if (productId) params.set('productId', productId);
    if (slug) params.set('slug', slug);
    return `?${params.toString()}`;
  };

  // Parse URL (on load or popstate) and update local state
  const applyStateFromUrl = (search: string) => {
    const params = new URLSearchParams(search);
    const page = (params.get('page') as Page) || 'home';
    const category = params.get('category') || undefined;
    const subcategory = params.get('subcategory') || undefined;
    const subsubcategory = params.get('subsubcategory') || undefined;
    const productId = params.get('productId') || undefined;
    const slug = params.get('slug') || undefined;

    setCurrentPage(page);
    setSelectedCategory(category);
    setSelectedSubcategory(subcategory);
    setSelectedSubSubcategory(subsubcategory);
    setSelectedProductId(productId);
    setSelectedStaticSlug(slug);
  };

  // central navigation handler — also write URL so state persists on refresh
  const handleNavigate = (
    page: string,
    category?: string,
    subcategory?: string,
    subsubcategory?: string,
    productId?: string,
    slug?: string
  ) => {
    const url = buildUrl(page, category, subcategory, subsubcategory, productId, slug);
    // push state so back/forward works
    window.history.pushState({}, '', url);

    // update React state
    setCurrentPage(page as Page);
    setSelectedCategory(category);
    setSelectedSubcategory(subcategory);
    setSelectedSubSubcategory(subsubcategory);
    setSelectedProductId(productId);
    setSelectedStaticSlug(slug);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // on mount read URL (so refresh keeps location) and listen to back/forward
  useEffect(() => {
    applyStateFromUrl(window.location.search);
    const onPop = () => applyStateFromUrl(window.location.search);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);


  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'categories':
        return <CategoriesPage onNavigate={handleNavigate} />;
      case 'products':
        return (
          <ProductsPage
            onNavigate={handleNavigate}
            selectedCategory={selectedCategory}
            selectedSubcategory={selectedSubcategory}
            selectedSubSubcategory={selectedSubSubcategory}
          />
        );
      case 'product':
        return selectedProductId ? <ProductDetail productId={selectedProductId} onNavigate={handleNavigate} /> : <ProductsPage onNavigate={handleNavigate} />;
      case 'contact':
        return <ContactPage />;
      case 'static':
        return <StaticPage slug={selectedStaticSlug} onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header onNavigate={handleNavigate} currentPage={currentPage} selectedCategory={selectedCategory} />
      <main className="flex-1">
        {renderPage()}
      </main>
      <Footer onNavigate={handleNavigate} />
      <Chatbot />
    </div>
  );
}
