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

    setMessages(prev => [...prev, userMessage, botMessage]);
    setShowQuestions(false);
    
    setTimeout(() => setShowQuestions(true), 1000);
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
      {/* Chat button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-slate-900 to-slate-800 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow z-50"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
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
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-medium">Assistant Istikbal</div>
                  <div className="text-xs text-white/80">En ligne</div>
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
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-slate-900 text-white rounded-br-sm'
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
            </div>

            {/* Quick questions */}
            {showQuestions && (
              <div className="p-4 bg-white border-t border-slate-200 max-h-64 overflow-y-auto">
                <p className="text-xs text-slate-600 mb-3">Questions fréquentes :</p>
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

            {/* Input (disabled, just for show) */}
            <div className="p-4 bg-white border-t border-slate-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Choisissez une question ci-dessus..."
                  disabled
                  className="flex-1 px-4 py-2 bg-slate-100 text-slate-400 rounded-full text-sm cursor-not-allowed"
                />
                <button
                  disabled
                  className="bg-slate-300 text-white p-2 rounded-full cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
