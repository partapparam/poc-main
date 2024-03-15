import { useState, useEffect } from 'react';
import parse from "html-react-parser";

const TypingEffect = ({ html, speed, onTypingComplete }) => {
    // console.log(html, "htnlhsdfuv");
    const [displayedHtml, setDisplayedHtml] = useState("");
  
    useEffect(() => {
      let index = 0;
      let newHtml = "";  
      const intervalId = setInterval(() => {
        newHtml += html.charAt(index);
        setDisplayedHtml(newHtml);
        index++;
  
        if (index === html.length) {
          clearInterval(intervalId);
  
          // Call the completion callback when typing is complete
          if (typeof onTypingComplete === "function") {
            onTypingComplete();
          }
        }
      }, speed / 5);
  
      return () => clearInterval(intervalId);
    }, [html, speed, onTypingComplete]);
  
    return <div>{parse(displayedHtml)}</div>;
};

export default TypingEffect;