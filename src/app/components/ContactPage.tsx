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
    website: '' /* honeypot */,
  });

  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (data: typeof formData) => {
    const e: Record<string, string> = {};
    if (!data.name || data.name.trim().length < 2) e.name = 'Veuillez indiquer votre nom.';
    if (!data.email || !/\S+@\S+\.\S+/.test(data.email)) e.email = 'Email invalide.';
    if (!data.subject) e.subject = 'Sélectionnez un sujet.';
    if (!data.message || data.message.trim().length < 10) e.message = 'Le message doit contenir au moins 10 caractères.';
    if (data.phone && !/^(\+33|0)[1-9](?:[\s.-]?\d{2}){4}$/.test(data.phone)) e.phone = 'Numéro de téléphone invalide.';
    // honeypot should be empty
    if (data.website) e.website = 'Spam détecté.';
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validate(formData);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    setStatus('sending');

    // simulate send
    setTimeout(() => {
      setStatus('sent');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '', website: '' });
      setTimeout(() => setStatus('idle'), 3500);
    }, 900);
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
              1 All. Vivaldi<br />
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
              <a href="tel:+33232252630" className="underline">+33 2 32 25 26 30</a><br />
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
              <a href="mailto:contact@istikbal-valdereuil.fr" className="underline">contact@istikbal-valdereuil.fr</a><br />
              <a href="mailto:info@istikbal-valdereuil.fr" className="underline">info@istikbal-valdereuil.fr</a><br />
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

              {status === 'sent' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border-2 border-green-200 rounded-xl p-6 text-center"
                  role="status"
                  aria-live="polite"
                >
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl text-green-900 mb-2">Message envoyé !</h3>
                  <p className="text-green-700">Nous vous répondrons dans les plus brefs délais.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  {/* honeypot (hidden) */}
                  <input type="text" name="website" tabIndex={-1} autoComplete="off" value={formData.website} onChange={(e) => setFormData({ ...formData, website: e.target.value })} style={{ display: 'none' }} />

                  <div>
                    <label htmlFor="contact-name" className="block text-sm text-slate-700 mb-2">
                      Nom complet *
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'err-name' : undefined}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full px-4 py-3 bg-slate-50 rounded-lg text-slate-900 border-2 ${errors.name ? 'border-rose-500' : 'border-transparent'} focus:border-slate-900 outline-none transition-colors`}
                      placeholder="Jean Dupont"
                    />
                    {errors.name && <p id="err-name" role="alert" className="text-rose-600 text-sm mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-sm text-slate-700 mb-2">
                      Email *
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'err-email' : undefined}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-4 py-3 bg-slate-50 rounded-lg text-slate-900 border-2 ${errors.email ? 'border-rose-500' : 'border-transparent'} focus:border-slate-900 outline-none transition-colors`}
                      placeholder="jean.dupont@email.fr"
                    />
                    {errors.email && <p id="err-email" role="alert" className="text-rose-600 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="contact-phone" className="block text-sm text-slate-700 mb-2">
                      Téléphone
                    </label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? 'err-phone' : undefined}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`w-full px-4 py-3 bg-slate-50 rounded-lg text-slate-900 border-2 ${errors.phone ? 'border-rose-500' : 'border-transparent'} focus:border-slate-900 outline-none transition-colors`}
                      placeholder="+33 6 XX XX XX XX"
                    />
                    {errors.phone && <p id="err-phone" role="alert" className="text-rose-600 text-sm mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="block text-sm text-slate-700 mb-2">
                      Sujet *
                    </label>
                    <select
                      id="contact-subject"
                      name="subject"
                      required
                      aria-invalid={!!errors.subject}
                      aria-describedby={errors.subject ? 'err-subject' : undefined}
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className={`w-full px-4 py-3 bg-slate-50 rounded-lg text-slate-900 border-2 ${errors.subject ? 'border-rose-500' : 'border-transparent'} focus:border-slate-900 outline-none transition-colors`}
                    >
                      <option value="">Sélectionnez un sujet</option>
                      <option value="info">Demande d'information</option>
                      <option value="quote">Demande de devis</option>
                      <option value="delivery">Question sur la livraison</option>
                      <option value="after-sales">Service après-vente</option>
                      <option value="other">Autre</option>
                    </select>
                    {errors.subject && <p id="err-subject" role="alert" className="text-rose-600 text-sm mt-1">{errors.subject}</p>}
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-sm text-slate-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'err-message' : undefined}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={6}
                      className={`w-full px-4 py-3 bg-slate-50 rounded-lg text-slate-900 border-2 ${errors.message ? 'border-rose-500' : 'border-transparent'} focus:border-slate-900 outline-none transition-colors resize-none`}
                      placeholder="Votre message..."
                    />
                    {errors.message && <p id="err-message" role="alert" className="text-rose-600 text-sm mt-1">{errors.message}</p>}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={status === 'sending'}
                    className={`w-full ${status === 'sending' ? 'opacity-70 cursor-wait' : ''} bg-slate-900 text-white px-8 py-4 rounded-full hover:bg-slate-800 transition-colors inline-flex items-center justify-center gap-2`}
                  >
                    <Send className={`w-5 h-5 ${status === 'sending' ? 'animate-spin' : ''}`} />
                    {status === 'sending' ? 'Envoi...' : 'Envoyer le message'}
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

            {/* Embedded Google Maps (full) */}
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <iframe
                title="Istikbal Val-de-Reuil — emplacement (embed)"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d666672.0917052375!2d0.5705337965982507!3d49.2538851521008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e125a013846861%3A0x3c10b19002eef8b!2sIstikbal%20Normandie!5e0!3m2!1sfr!2sfr!4v1771509494847!5m2!1sfr!2sfr"
                className="w-full h-64 border-0"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
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
