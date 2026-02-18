import { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl md:text-5xl text-slate-900 mb-4">Contactez-nous</h1>
          <p className="text-slate-600 text-lg">
            Notre équipe est à votre disposition pour répondre à toutes vos questions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-slate-50 to-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-shadow"
          >
            <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl text-slate-900 mb-2">Notre Adresse</h3>
            <p className="text-slate-600">
              ZAC des Portes<br />
              27100 Val-de-Reuil<br />
              France
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-slate-50 to-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-shadow"
          >
            <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center mb-4">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl text-slate-900 mb-2">Téléphone</h3>
            <p className="text-slate-600">
              +33 2 32 XX XX XX<br />
              Du lundi au samedi<br />
              9h - 19h
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-slate-50 to-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-shadow"
          >
            <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center mb-4">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl text-slate-900 mb-2">Email</h3>
            <p className="text-slate-600">
              contact@istikbal-valdereuil.fr<br />
              info@istikbal-valdereuil.fr<br />
              Réponse sous 24h
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h2 className="text-2xl text-slate-900 mb-6">Envoyez-nous un message</h2>
              
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border-2 border-green-200 rounded-xl p-6 text-center"
                >
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl text-green-900 mb-2">Message envoyé !</h3>
                  <p className="text-green-700">
                    Nous vous répondrons dans les plus brefs délais.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm text-slate-700 mb-2">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 rounded-lg text-slate-900 border-2 border-transparent focus:border-slate-900 outline-none transition-colors"
                      placeholder="Jean Dupont"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-slate-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 rounded-lg text-slate-900 border-2 border-transparent focus:border-slate-900 outline-none transition-colors"
                      placeholder="jean.dupont@email.fr"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-slate-700 mb-2">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 rounded-lg text-slate-900 border-2 border-transparent focus:border-slate-900 outline-none transition-colors"
                      placeholder="+33 6 XX XX XX XX"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-slate-700 mb-2">
                      Sujet *
                    </label>
                    <select
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 rounded-lg text-slate-900 border-2 border-transparent focus:border-slate-900 outline-none transition-colors"
                    >
                      <option value="">Sélectionnez un sujet</option>
                      <option value="info">Demande d'information</option>
                      <option value="quote">Demande de devis</option>
                      <option value="delivery">Question sur la livraison</option>
                      <option value="after-sales">Service après-vente</option>
                      <option value="other">Autre</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-slate-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={6}
                      className="w-full px-4 py-3 bg-slate-50 rounded-lg text-slate-900 border-2 border-transparent focus:border-slate-900 outline-none transition-colors resize-none"
                      placeholder="Votre message..."
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-slate-900 text-white px-8 py-4 rounded-full hover:bg-slate-800 transition-colors inline-flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    Envoyer le message
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Hours and Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-8"
          >
            {/* Opening Hours */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-2xl text-white">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="w-6 h-6" />
                <h2 className="text-2xl">Horaires d'ouverture</h2>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-white/80">Lundi - Vendredi</span>
                  <span>9h - 19h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">Samedi</span>
                  <span>9h - 19h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">Dimanche</span>
                  <span>10h - 18h</span>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="bg-slate-100 rounded-2xl overflow-hidden shadow-lg">
              <div className="aspect-[16/10] bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                  <p className="text-slate-600">
                    Carte interactive du magasin
                  </p>
                  <p className="text-sm text-slate-500 mt-2">
                    ZAC des Portes, 27100 Val-de-Reuil
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-slate-50 p-6 rounded-2xl">
              <h3 className="text-xl text-slate-900 mb-4">Informations utiles</h3>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-slate-900">•</span>
                  <span>Parking gratuit disponible</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-900">•</span>
                  <span>Showroom de 2000m²</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-900">•</span>
                  <span>Conseiller en aménagement sur place</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-900">•</span>
                  <span>Service de livraison et montage</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
