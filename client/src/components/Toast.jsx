import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Toast({ message, type = 'success', onClose, duration = 5000 }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.9 }}
      className={`fixed bottom-6 left-6 z-50 flex items-center space-x-3 py-3.5 px-5 rounded-2xl shadow-2xl border ${
        type === 'success'
          ? 'bg-slate-900 border-green-500/30 text-green-400'
          : 'bg-slate-900 border-red-500/30 text-red-400'
      }`}
      style={{
        boxShadow: type === 'success' 
          ? '0 10px 30px -10px rgba(34, 197, 94, 0.2)' 
          : '0 10px 30px -10px rgba(239, 68, 68, 0.2)'
      }}
    >
      {type === 'success' ? (
        <CheckCircle2 size={20} className="shrink-0" />
      ) : (
        <AlertCircle size={20} className="shrink-0" />
      )}
      <span className="text-sm font-medium text-slate-100">{message}</span>
      <button
        onClick={onClose}
        className="text-slate-400 hover:text-slate-200 transition-colors p-0.5 cursor-pointer"
        aria-label="Close Notification"
      >
        <X size={16} />
      </button>
    </motion.div>
  );
}
