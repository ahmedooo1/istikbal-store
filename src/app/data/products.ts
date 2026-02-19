export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  subsubcategory?: string;
  price: number;
  image: string;
  gallery?: string[]; // multiple images support
  description: string;
  features?: string[];
  featured?: boolean;
}

export interface SubSubCategory {
  id: string;
  name: string;
}

export interface SubCategory {
  id: string;
  name: string;
  subsubcategories?: SubSubCategory[];
}

export interface Category {
  id: string;
  name: string;
  subcategories: SubCategory[];
}

export const categories: Category[] = [
  {
    id: 'salon',
    name: 'Salon',
    subcategories: [
      { 
        id: 'canapes', 
        name: 'Canapés',
        subsubcategories: [
          { id: 'canapes-angle', name: 'Canapés d\'angle' },
          { id: 'canapes-droits', name: 'Canapés droits' },
          { id: 'canapes-convertibles', name: 'Canapés convertibles' },
        ]
      },
      { id: 'fauteuils', name: 'Fauteuils' },
      { id: 'tables-basses', name: 'Tables basses' },
      { id: 'meubles-tv', name: 'Meubles TV' },
    ]
  },
  {
    id: 'chambre',
    name: 'Chambre',
    subcategories: [
      { 
        id: 'lits', 
        name: 'Lits',
        subsubcategories: [
          { id: 'lits-adultes', name: 'Lits adultes' },
          { id: 'lits-enfants', name: 'Lits enfants' },
          { id: 'lits-bebes', name: 'Lits bébés' },
        ]
      },
      { id: 'armoires', name: 'Armoires' },
      { id: 'commodes', name: 'Commodes' },
      { id: 'chevets', name: 'Tables de chevet' },
    ]
  },
  {
    id: 'salle-a-manger',
    name: 'Salle à manger',
    subcategories: [
      { id: 'tables', name: 'Tables' },
      { id: 'chaises', name: 'Chaises' },
      { id: 'buffets', name: 'Buffets' },
      { id: 'vitrines', name: 'Vitrines' },
    ]
  },
  {
    id: 'bureau',
    name: 'Bureau',
    subcategories: [
      { id: 'bureaux', name: 'Bureaux' },
      { id: 'chaises-bureau', name: 'Chaises de bureau' },
      { id: 'rangements', name: 'Rangements' },
      { id: 'bibliotheques', name: 'Bibliothèques' },
    ]
  },
];

export const products: Product[] = [
  // Salon - Canapés
  {
    id: '1',
    name: 'Canapé d\'angle Milano',
    category: 'salon',
    subcategory: 'canapes',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1759722665935-0967b4e0da93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsaXZpbmclMjByb29tJTIwc29mYXxlbnwxfHx8fDE3NzEzOTcyMDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    gallery: [
      'https://images.unsplash.com/photo-1759722665935-0967b4e0da93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
      'https://images.unsplash.com/photo-1598300054633-1e7c8b7d5b12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200'
    ],
    description: 'Canapé d\'angle moderne avec revêtement en tissu premium. Confort optimal pour toute la famille.',
    features: ['Revêtement tissu premium', 'Structure bois massif', 'Coussins déhoussables'],
    featured: true,
  },
  {
    id: '2',
    name: 'Canapé 3 places Elite',
    category: 'salon',
    subcategory: 'canapes',
    price: 899,
    image: 'https://images.unsplash.com/photo-1759722665935-0967b4e0da93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsaXZpbmclMjByb29tJTIwc29mYXxlbnwxfHx8fDE3NzEzOTcyMDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    gallery: [
      'https://images.unsplash.com/photo-1759722665935-0967b4e0da93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
      'https://images.unsplash.com/photo-1582582494700-4c9a7f9a9b9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200'
    ],
    description: 'Canapé élégant avec structure robuste et assises moelleuses.',
    features: ['Assises rembourrées', 'Accoudoirs renforcés'],
    featured: true,
  },
  // Salon - Fauteuils
  {
    id: '3',
    name: 'Fauteuil Confort Plus',
    category: 'salon',
    subcategory: 'fauteuils',
    price: 399,
    image: 'https://images.unsplash.com/photo-1768946131690-247c5319f0d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcm1jaGFpcnxlbnwxfHx8fDE3NzE0MDkxMjd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    gallery: [
      'https://images.unsplash.com/photo-1768946131690-247c5319f0d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
      'https://images.unsplash.com/photo-1602524815458-0f8b2f5f7f72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200'
    ],
    description: 'Fauteuil design avec repose-pieds intégré. Parfait pour la détente.',
    features: ['Repose-pieds intégré', 'Tissu anti-tache'],
  },
  {
    id: '4',
    name: 'Fauteuil Scandinave',
    category: 'salon',
    subcategory: 'fauteuils',
    price: 329,
    image: 'https://images.unsplash.com/photo-1768946131690-247c5319f0d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcm1jaGFpcnxlbnwxfHx8fDE3NzE0MDkxMjd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    gallery: [
      'https://images.unsplash.com/photo-1768946131690-247c5319f0d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
      'https://images.unsplash.com/photo-1505691723518-36a8d30bde5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200'
    ],
    description: 'Style scandinave minimaliste avec pieds en bois massif.',
    features: ['Pieds en bois massif', 'Revêtement résistant'],
    featured: true,
  },
  // Salon - Tables basses
  {
    id: '5',
    name: 'Table basse Moderna',
    category: 'salon',
    subcategory: 'tables-basses',
    price: 249,
    image: 'https://images.unsplash.com/photo-1656699170530-21004fb9ec2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjB0YWJsZSUyMG1vZGVybnxlbnwxfHx8fDE3NzE0MDkxMjd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    gallery: [
      'https://images.unsplash.com/photo-1656699170530-21004fb9ec2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200'
    ],
    description: 'Table basse avec plateau en verre trempé et structure métallique.',
    features: ['Plateau verre trempé', 'Structure métallique'],
  },
  // Chambre - Lits
  {
    id: '6',
    name: 'Lit Royale 160x200',
    category: 'chambre',
    subcategory: 'lits',
    price: 799,
    image: 'https://images.unsplash.com/photo-1680503146454-04ac81a63550?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWRyb29tJTIwZnVybml0dXJlJTIwYmVkfGVufDF8fHx8MTc3MTM0NDM2MXww&ixlib=rb-4.1.0&q=80&w=1080',
    gallery: [
      'https://images.unsplash.com/photo-1680503146454-04ac81a63550?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
      'https://images.unsplash.com/photo-1600607687730-8e51b1b7067a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200'
    ],
    description: 'Lit double avec tête de lit capitonnée. Élégance et confort.',
    features: ['Tête de lit capitonnée', 'Sommier inclus'],
    featured: true,
  },
  {
    id: '7',
    name: 'Lit Simple 90x200',
    category: 'chambre',
    subcategory: 'lits',
    price: 399,
    image: 'https://images.unsplash.com/photo-1680503146454-04ac81a63550?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWRyb29tJTIwZnVybml0dXJlJTIwYmVkfGVufDF8fHx8MTc3MTM0NDM2MXww&ixlib=rb-4.1.0&q=80&w=1080',
    gallery: [
      'https://images.unsplash.com/photo-1680503146454-04ac81a63550?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200'
    ],
    description: 'Lit simple moderne, idéal pour chambre d\'enfant ou d\'ado.',
  },
  // Chambre - Armoires
  {
    id: '8',
    name: 'Armoire 3 portes Premium',
    category: 'chambre',
    subcategory: 'armoires',
    price: 699,
    image: 'https://images.unsplash.com/photo-1630699144552-b2b60b277b75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXJkcm9iZSUyMGNsb3NldHxlbnwxfHx8fDE3NzE0MDkxMjd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    gallery: [
      'https://images.unsplash.com/photo-1630699144552-b2b60b277b75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200'
    ],
    description: 'Grande armoire avec miroir central et nombreux espaces de rangement.',
    features: ['Miroir central', 'Portes soft-close'],
  },
  // Salle à manger - Tables
  {
    id: '9',
    name: 'Table à manger extensible',
    category: 'salle-a-manger',
    subcategory: 'tables',
    price: 599,
    image: 'https://images.unsplash.com/photo-1663756915302-437cd36f4cfd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaW5pbmclMjByb29tJTIwdGFibGUlMjBjaGFpcnN8ZW58MXx8fHwxNzcxMzQ5NDExfDA&ixlib=rb-4.1.0&q=80&w=1080',
    gallery: [
      'https://images.unsplash.com/photo-1663756915302-437cd36f4cfd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
      'https://images.unsplash.com/photo-1540574163026-643ea20ade25?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200'
    ],
    description: 'Table extensible 6-8 personnes en bois massif.',
    featured: true,
  },
  {
    id: '10',
    name: 'Table ronde Design',
    category: 'salle-a-manger',
    subcategory: 'tables',
    price: 499,
    image: 'https://images.unsplash.com/photo-1663756915302-437cd36f4cfd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaW5pbmclMjByb29tJTIwdGFibGUlMjBjaGFpcnN8ZW58MXx8fHwxNzcxMzQ5NDExfDA&ixlib=rb-4.1.0&q=80&w=1080',
    gallery: [
      'https://images.unsplash.com/photo-1663756915302-437cd36f4cfd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200'
    ],
    description: 'Table ronde 4 personnes, style contemporain.',
  },
  // Salle à manger - Chaises
  {
    id: '11',
    name: 'Lot de 4 chaises Elite',
    category: 'salle-a-manger',
    subcategory: 'chaises',
    price: 299,
    image: 'https://images.unsplash.com/photo-1663756915302-437cd36f4cfd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaW5pbmclMjByb29tJTIwdGFibGUlMjBjaGFpcnN8ZW58MXx8fHwxNzcxMzQ5NDExfDA&ixlib=rb-4.1.0&q=80&w=1080',
    gallery: [
      'https://images.unsplash.com/photo-1663756915302-437cd36f4cfd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200'
    ],
    description: 'Chaises confortables avec revêtement en tissu résistant.',
  },
  // Bureau
  {
    id: '12',
    name: 'Bureau Exécutif',
    category: 'bureau',
    subcategory: 'bureaux',
    price: 449,
    image: 'https://images.unsplash.com/photo-1623679072629-3aaa0192a391?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjBkZXNrfGVufDF8fHx8MTc3MTMxMDI1N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    gallery: [
      'https://images.unsplash.com/photo-1623679072629-3aaa0192a391?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
      'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200'
    ],
    description: 'Bureau spacieux avec tiroirs intégrés. Parfait pour le télétravail.',
    features: ['Tiroirs intégrés', 'Surface anti-rayures'],
  },
];
