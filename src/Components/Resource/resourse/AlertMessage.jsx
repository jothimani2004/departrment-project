import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react"; // Close icon from Lucide

const AlertMessage = ({ message }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true); // Show the alert when a new message comes
      const timer = setTimeout(() => setVisible(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]); // Reset when message changes

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="position-fixed top-0 start-50 translate-middle-x mt-3 alert alert-info d-flex align-items-center justify-content-between px-4 shadow-lg"
          style={{ width: "40%", zIndex: 1050 }}
        >
          <span>{message}✅</span>
          <button
            className="btn"
            onClick={() => setVisible(false)}
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AlertMessage;
