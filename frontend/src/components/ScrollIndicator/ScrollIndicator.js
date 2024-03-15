import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

import './ScrollIndicator.css';

const ScrollIndicator = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;

      // Set visibility based on scroll position
      setIsVisible(scrollY + 2 < document.body.scrollHeight - window.innerHeight); // +2 for safe side
    };
    
    // Attach the event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  };

  return (
    isVisible && (
      <div className="scroll-indicator" onClick={scrollToBottom}>
        <FontAwesomeIcon icon={faArrowDown} color='white' />
      </div>
    )
  );
};

export default ScrollIndicator;
