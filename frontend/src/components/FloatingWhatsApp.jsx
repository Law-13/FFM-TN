import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { WHATSAPP_CHANNEL_LINK } from '../config';

export default function FloatingWhatsApp() {
  return (
    <motion.a
      href={WHATSAPP_CHANNEL_LINK}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 flex items-center justify-center p-4 rounded-full bg-[#25d366] text-white shadow-glow-green hover:shadow-[0_0_25px_rgba(37,211,102,0.8)] transition-all duration-300 z-50 cursor-pointer group"
      title="Join WhatsApp Community"
    >
      <MessageCircle className="w-6 h-6 fill-white" />
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 ease-out whitespace-nowrap font-semibold text-sm">
        Join WhatsApp Community
      </span>
    </motion.a>
  );
}
