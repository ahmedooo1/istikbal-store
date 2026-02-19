import { ArrowLeft } from 'lucide-react';
import { products } from '../data/products';
import { ImageWithFallback } from './figma/ImageWithFallback';
import ProductImageCarousel from './ProductImageCarousel';

interface ProductDetailProps {
  productId: string;
  onNavigate: (page: string, category?: string, subcategory?: string, subsubcategory?: string, productId?: string) => void;
}

export default function ProductDetail({ productId, onNavigate }: ProductDetailProps) {
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Produit introuvable</h2>
          <button
            onClick={() => onNavigate('products')}
            className="bg-slate-900 text-white px-4 py-2 rounded-full"
          >
            Retour aux produits
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-6">
          <button
            onClick={() => onNavigate('products')}
            className="inline-flex items-center gap-2 text-slate-700 hover:text-slate-900"
          >
            <ArrowLeft className="w-5 h-5" /> Retour
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-slate-50 rounded-2xl overflow-hidden p-4">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-xl">
              <ProductImageCarousel
                images={product.gallery && product.gallery.length > 0 ? product.gallery : [product.image]}
                alt={product.name}
                className="w-full h-full object-cover"
                showThumbnails
                intervalMs={4000}
              />
            </div>
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-extrabold mb-2 text-slate-900">{product.name}</h1>
              <p className="text-slate-600 mb-4">{product.description}</p>

              <div className="flex items-center gap-4 mb-6">
                <div className="text-4xl font-bold text-slate-900">{product.price}€</div>
                <div className="text-sm text-slate-500">Livraison estimée 2-5 jours</div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Caractéristiques</h3>
                <ul className="list-disc pl-5 text-slate-600">
                  {product.features?.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex gap-4">
              <button onClick={() => onNavigate('contact')} className="flex items-center gap-2 bg-amber-400 text-slate-900 px-5 py-3 rounded-full shadow-lg hover:brightness-95 transition-colors">
                Demander des infos
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
