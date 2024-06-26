import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface TypingTextProps {
    text: string;
  }  

const TypingText: React.FC<TypingTextProps> = ({text}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loop, setLoop] = useState(0);
  const [speed, setSpeed] = useState(150);

  useEffect(() => {
    const handleType = () => {
      setDisplayedText(
        isDeleting
          ? text.substring(0, displayedText.length - 1)
          : text.substring(0, displayedText.length + 1)
      );

      setSpeed(isDeleting ? 50 : 150);

      if (!isDeleting && displayedText === text) {
        setTimeout(() => setIsDeleting(true), 500);
      } else if (isDeleting && displayedText === '') {
        setIsDeleting(false);
        setLoop(loop + 1);
      }
    };

    const typingTimeout = setTimeout(handleType, speed);

    return () => clearTimeout(typingTimeout);
  }, [displayedText, isDeleting]);

  return (
    <motion.h1
      className="col-span-1 text-slate-500 text-center text-5xl font-serif font-semibold"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {displayedText}
    </motion.h1>
  );
};

export default TypingText;
