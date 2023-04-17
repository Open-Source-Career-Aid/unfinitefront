import React, { useState, useEffect } from 'react';

const phrases = ['The new way to learn', 'The new way to research', 'The new way to grow'];

const Typewriter = () => {
  const [text, setText] = useState('');
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentText = phrases[currentPhrase];
      const length = currentText.length;
      const newText = isDeleting ? currentText.substring(0, text.length - 1) : currentText.substring(0, text.length + 1);

      setText(newText);

      if (!isDeleting && newText === currentText) {
        setIsDeleting(true);
        setTimeout(() => setCurrentPhrase((currentPhrase + 1) % phrases.length), 1000);
      } else if (isDeleting && newText === '') {
        setIsDeleting(false);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [text, isDeleting, currentPhrase]);

  return (
    <h1>{text}</h1>
  );
};

export default Typewriter;
