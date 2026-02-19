import { MapPin } from 'lucide-react';

interface StaticPageProps {
  slug?: string | null;
  onNavigate?: (page: string, category?: string, subcategory?: string, subsubcategory?: string, productId?: string, slug?: string) => void;
}

const CONTENT: Record<string, { title: string; body: string }> = {
  about: {
    title: 'À propos',
    body: "Istikbal Val-de-Reuil — mobilier moderne, qualité et service local. Cette page contient des informations sur notre histoire, nos engagements et notre équipe.",
  },
  promotions: {
    title: 'Promotions',
    body: "Retrouvez ici nos offres spéciales et promotions en cours. (Contenu factice — à remplacer par les offres réelles.)",
  },
  blog: {
    title: 'Blog',
    body: "Articles et inspirations pour l'aménagement intérieur. (Page de démonstration.)",
  },
  careers: {
    title: 'Carrières',
    body: "Consultez nos offres d'emploi et postulez pour rejoindre l'équipe Istikbal Val-de-Reuil.",
  },
  faq: {
    title: 'FAQ',
    body: "Questions fréquemment posées — livraison, retours, garanties et plus.",
  },
  delivery: {
    title: 'Livraison',
    body: "Informations sur les délais et conditions de livraison.",
  },
  returns: {
    title: 'Retours',
    body: "Procédure de retours et d'échanges — comment retourner un produit.",
  },
  warranty: {
    title: 'Garantie',
    body: "Détails de la garantie produit (durée, conditions et démarches).",
  },
  legal: {
    title: 'Mentions légales',
    body: "Informations légales de l'entreprise — SIRET, siège social, responsable de publication, etc.",
  },
  privacy: {
    title: 'Politique de confidentialité',
    body: "Comment nous traitons vos données personnelles — cookies, conservation et droits.",
  },
  terms: {
    title: 'Conditions générales de vente (CGV)',
    body: "Conditions générales applicables aux ventes — paiement, livraison, garanties.",
  },
};

export default function StaticPage({ slug, onNavigate }: StaticPageProps) {
  const key = slug || 'about';
  const page = CONTENT[key] ?? { title: 'Page', body: "Contenu à venir." };

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <h1 className="text-3xl text-slate-900 mb-6">{page.title}</h1>
      <p className="text-slate-600 mb-6">{page.body}</p>

      <div className="flex gap-3">
        <button
          onClick={() => onNavigate?.('home')}
          className="px-4 py-2 bg-slate-100 rounded-md text-slate-800 hover:bg-slate-200 transition"
        >
          Retour à l'accueil
        </button>
        <button
          onClick={() => onNavigate?.('contact')}
          className="px-4 py-2 bg-amber-400 text-slate-900 rounded-md hover:brightness-95 transition"
        >
          Contacter
        </button>
      </div>

      {/* Map + address */}
      <div className="mt-12 grid gap-8 md:grid-cols-2 items-start">
        <div>
          <h3 className="text-lg text-slate-900 mb-3 flex items-center gap-3">
            <MapPin className="w-5 h-5 text-slate-600" />
            Emplacement
          </h3>
          <p className="text-slate-600 mb-4">1 All. Vivaldi<br/>27100 Val-de-Reuil, France</p>
          <a
            href="https://www.google.com/maps/search/?api=1&query=1+All.+Vivaldi+27100+Val-de-Reuil"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-full text-sm hover:bg-slate-800 transition"
          >
            Voir sur Google Maps
          </a>
        </div>

        <div className="rounded-2xl overflow-hidden shadow-lg">
          <iframe
            title="Istikbal Val-de-Reuil — emplacement"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d666672.0917052375!2d0.5705337965982507!3d49.2538851521008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e125a013846861%3A0x3c10b19002eef8b!2sIstikbal%20Normandie!5e0!3m2!1sfr!2sfr!4v1771509494847!5m2!1sfr!2sfr"
            className="w-full h-64 border-0"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}
