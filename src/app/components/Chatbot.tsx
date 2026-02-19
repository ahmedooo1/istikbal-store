import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const faqs = [
  {
    question: 'Quels sont vos horaires d\'ouverture ?',
    answer: 'Nous sommes ouverts du lundi au samedi de 9h à 19h, et le dimanche de 10h à 18h.'
  },
  {
    question: 'Proposez-vous la livraison ?',
    answer: 'Oui, nous proposons la livraison dans toute la France. Le délai est généralement de 2 à 4 semaines selon les produits.'
  },
  {
    question: 'Puis-je voir les meubles en magasin ?',
    answer: 'Absolument ! Notre showroom à Val-de-Reuil présente une large sélection de nos meubles. Vous pouvez venir les voir et les toucher.'
  },
  {
    question: 'Proposez-vous un service de montage ?',
    answer: 'Oui, nous proposons un service de montage professionnel pour tous nos meubles. Le tarif dépend du type de meuble.'
  },
  {
    question: 'Quelle est votre politique de retour ?',
    answer: 'Vous disposez de 14 jours pour retourner un produit non monté dans son emballage d\'origine.'
  },
  {
    question: 'Proposez-vous un financement ?',
    answer: 'Oui, nous proposons plusieurs solutions de financement. N\'hésitez pas à nous contacter pour plus d\'informations.'
  },
  {
    question: 'Comment puis-je vous contacter ?',
    answer: 'Vous pouvez nous contacter par téléphone au +33 2 32 XX XX XX ou via notre formulaire de contact sur le site.'
  },
  {
    question: 'Où se trouve votre magasin ?',
    answer: 'Notre magasin est situé à Val-de-Reuil, France. L\'adresse exacte est disponible dans notre section Contact.'
  },
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Bonjour ! Je suis l\'assistant virtuel Istikbal. Comment puis-je vous aider aujourd\'hui ?',
      sender: 'bot',
      timestamp: new Date(),
    }
  ]);
  const [showQuestions, setShowQuestions] = useState(true);
  const [faqOpen, setFaqOpen] = useState(true); // persistent collapse state for FAQ list
  const [showTyping, setShowTyping] = useState(false); // show typing dots AFTER response

  const handleQuestionClick = (faq: typeof faqs[0]) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: faq.question,
      sender: 'user',
      timestamp: new Date(),
    };

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: faq.answer,
      sender: 'bot',
      timestamp: new Date(),
    };

    // add user message, show typing indicator, then append bot response
    setMessages(prev => [...prev, userMessage]);
    setShowQuestions(false);
    setShowTyping(true);

    // simulate typing before showing the bot reply
    setTimeout(() => {
      setMessages(prev => [...prev, botMessage]);
      setShowTyping(false);

      // restore quick questions shortly after reply
      setTimeout(() => setShowQuestions(true), 300);
    }, 900);
  };

  const resetChat = () => {
    setMessages([
      {
        id: '1',
        text: 'Bonjour ! Je suis l\'assistant virtuel Istikbal. Comment puis-je vous aider aujourd\'hui ?',
        sender: 'bot',
        timestamp: new Date(),
      }
    ]);
    setShowQuestions(true);
  };

  return (
    <>
      {/* inline styles for typing dots animation */}
      <style>{`@keyframes chat-dot { 0% { transform: translateY(0); opacity: .45; } 50% { transform: translateY(-6px); opacity: 1; } 100% { transform: translateY(0); opacity: .45; } }
        .chat-dot { display: inline-block; width: 8px; height: 8px; border-radius: 9999px; background: #7c3aed; margin-right: 6px; animation: chat-dot 900ms ease-in-out infinite; }
      `}</style>
      {/* Chat button */}
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Fermer le chat' : 'Ouvrir le chat'}
          aria-expanded={isOpen}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-violet-600 text-white p-3 rounded-full shadow-2xl hover:shadow-xl transition-transform z-50"
        >
          <div className="relative w-9 h-9 flex items-center justify-center">
            <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center transition-colors">
              {isOpen ? <X className="w-5 h-5 text-white" /> : <MessageCircle className="w-5 h-5 text-white" />}
            </div>
          </div>
        </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
            style={{ height: '600px', maxHeight: 'calc(100vh - 8rem)' }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center border border-white/10">
                  <div className="w-7 h-7 rounded-full bg-amber-400 text-slate-900 flex items-center justify-center font-semibold">I</div>
                </div>
                <div>
                  <div className="font-medium">Assistant Istikbal</div>
                  <div className="text-xs text-white/80">Disponible — Réponse instantanée</div>
                </div>
              </div>
              <button
                onClick={resetChat}
                className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full transition-colors"
              >
                Réinitialiser
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
              {messages.map((message, idx) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-br-sm'
                        : 'bg-white text-slate-900 rounded-bl-sm shadow-sm'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-white/60' : 'text-slate-400'
                    }`}>
                      {message.timestamp.toLocaleTimeString('fr-FR', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
              ))}
              {/* typing animation shown AFTER response when showTyping is true */}
              {showTyping && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] p-3 rounded-2xl bg-white text-slate-900 rounded-bl-sm shadow-sm">
                    <div className="flex items-center gap-2">
                      <span className="chat-dot" style={{ animationDelay: '0ms' }} aria-hidden="true" />
                      <span className="chat-dot" style={{ animationDelay: '150ms' }} aria-hidden="true" />
                      <span className="chat-dot" style={{ animationDelay: '300ms' }} aria-hidden="true" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick questions */}
            {faqOpen && showQuestions && (
              <div className="p-4 bg-white border-t border-slate-200 max-h-64 overflow-y-auto">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs text-slate-600">Questions fréquentes :</p>
                  <button
                    onClick={() => setFaqOpen(false)}
                    aria-expanded={faqOpen}
                    className="text-xs text-slate-500 hover:text-slate-700"
                  >
                    Masquer
                  </button>
                </div>
                <div className="space-y-2">
                  {faqs.map((faq, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuestionClick(faq)}
                      className="w-full text-left text-sm bg-slate-50 hover:bg-slate-100 text-slate-700 p-3 rounded-lg transition-colors"
                    >
                      {faq.question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* collapsed FAQ header when faqOpen is false */}
            {!faqOpen && (
              <div className="p-3 bg-white border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-slate-600">Questions fréquentes :</p>
                  <button
                    onClick={() => setFaqOpen(true)}
                    className="text-xs text-slate-500 hover:text-slate-700"
                  >
                    Afficher
                  </button>
                </div>
              </div>
            )}

            {/* input removed — chat is FAQ-driven */}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
