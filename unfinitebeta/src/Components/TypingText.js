import React, { useState, useEffect } from 'react';

const TypingText = ({ text , typingeffect }) => {

  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {

    if (!typingeffect) {
        setDisplayedText(text);
        return;
    }
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayedText(text.slice(0, currentIndex));
        currentIndex += 1;
      } else {
        clearInterval(intervalId);
      }
    }, 1);
    return () => clearInterval(intervalId);
  }, [text]);

  return <p>{displayedText}</p>;
};

export default TypingText;