import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import CategoriesPage from './components/CategoriesPage';
import ProductsPage from './components/ProductsPage';
import ProductDetail from './components/ProductDetail';
import ContactPage from './components/ContactPage';
import Chatbot from './components/Chatbot';

type Page = 'home' | 'categories' | 'products' | 'product' | 'contact';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | undefined>();
  const [selectedSubSubcategory, setSelectedSubSubcategory] = useState<string | undefined>();
  const [selectedProductId, setSelectedProductId] = useState<string | undefined>();

  const handleNavigate = (
    page: string,
    category?: string,
    subcategory?: string,
    subsubcategory?: string,
    productId?: string
  ) => {
    setCurrentPage(page as Page);
    setSelectedCategory(category);
    setSelectedSubcategory(subcategory);
    setSelectedSubSubcategory(subsubcategory);
    setSelectedProductId(productId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
      <Footer />
      <Chatbot />
    </div>
  );
}
