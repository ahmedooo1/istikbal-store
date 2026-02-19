import { MapPin, Phone, Mail, Facebook, Instagram, Twitter } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string, category?: string, subcategory?: string, subsubcategory?: string, productId?: string, slug?: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-xl mb-4">ISTIKBAL</h3>
            <p className="text-white/70 text-sm mb-4">
              Votre destination pour des meubles modernes et élégants à Val-de-Reuil. Qualité, design et confort depuis plus de 20 ans.
            </p>
            <div className="flex gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl mb-4">Liens rapides</h3>
            <ul className="space-y-2 text-white/70 text-sm">
              <li>
                <a href="/?page=static&slug=about" onClick={(e) => { e.preventDefault(); onNavigate('static', undefined, undefined, undefined, undefined, 'about'); }} className="hover:text-white transition-colors">À propos</a>
              </li>
              <li>
                <a href="/?page=categories" onClick={(e) => { e.preventDefault(); onNavigate('categories'); }} className="hover:text-white transition-colors">Nos produits</a>
              </li>
              <li>
                <a href="/?page=static&slug=promotions" onClick={(e) => { e.preventDefault(); onNavigate('static', undefined, undefined, undefined, undefined, 'promotions'); }} className="hover:text-white transition-colors">Promotions</a>
              </li>
              <li>
                <a href="/?page=static&slug=blog" onClick={(e) => { e.preventDefault(); onNavigate('static', undefined, undefined, undefined, undefined, 'blog'); }} className="hover:text-white transition-colors">Blog</a>
              </li>
              <li>
                <a href="/?page=static&slug=careers" onClick={(e) => { e.preventDefault(); onNavigate('static', undefined, undefined, undefined, undefined, 'careers'); }} className="hover:text-white transition-colors">Carrières</a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-xl mb-4">Service client</h3>
            <ul className="space-y-2 text-white/70 text-sm">
              <li>
                <a href="/?page=contact" onClick={(e) => { e.preventDefault(); onNavigate('contact'); }} className="hover:text-white transition-colors">Contact</a>
              </li>
              <li>
                <a href="/?page=static&slug=delivery" onClick={(e) => { e.preventDefault(); onNavigate('static', undefined, undefined, undefined, undefined, 'delivery'); }} className="hover:text-white transition-colors">Livraison</a>
              </li>
              <li>
                <a href="/?page=static&slug=returns" onClick={(e) => { e.preventDefault(); onNavigate('static', undefined, undefined, undefined, undefined, 'returns'); }} className="hover:text-white transition-colors">Retours</a>
              </li>
              <li>
                <a href="/?page=static&slug=warranty" onClick={(e) => { e.preventDefault(); onNavigate('static', undefined, undefined, undefined, undefined, 'warranty'); }} className="hover:text-white transition-colors">Garantie</a>
              </li>
              <li>
                <a href="/?page=static&slug=faq" onClick={(e) => { e.preventDefault(); onNavigate('static', undefined, undefined, undefined, undefined, 'faq'); }} className="hover:text-white transition-colors">FAQ</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl mb-4">Contact</h3>
            <ul className="space-y-3 text-white/70 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>1 All. Vivaldi<br />27100 Val-de-Reuil, France</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <a href="tel:+33232252630" className="underline">+33 2 32 25 26 30</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <a href="mailto:contact@istikbal-valdereuil.fr" className="underline">contact@istikbal-valdereuil.fr</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60">
            <p>© 2026 Istikbal Val-de-Reuil. Tous droits réservés.</p>
            <div className="flex gap-6">
              <a href="/?page=static&slug=legal" onClick={(e) => { e.preventDefault(); onNavigate('static', undefined, undefined, undefined, undefined, 'legal'); }} className="hover:text-white transition-colors">Mentions légales</a>
              <a href="/?page=static&slug=privacy" onClick={(e) => { e.preventDefault(); onNavigate('static', undefined, undefined, undefined, undefined, 'privacy'); }} className="hover:text-white transition-colors">Politique de confidentialité</a>
              <a href="/?page=static&slug=terms" onClick={(e) => { e.preventDefault(); onNavigate('static', undefined, undefined, undefined, undefined, 'terms'); }} className="hover:text-white transition-colors">CGV</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
