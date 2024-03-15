import React, { useState, useEffect } from 'react';
import ReactDOMServer from 'react-dom/server';
import TypingEffect from "../TypingEffect/TypingEffect";

const AudienceTypingEffectUtil = ({ chatArray, isNumberedList, renderLink, setCompleted, chatContentRef, setLoading }) => {
    // console.log(chatArray)
    const lastChat = chatArray?.filter((chat, index) => index === chatArray?.length - 1)
    const arrToMap = lastChat[0]?.answer;
    const newArray = arrToMap?.map((ans, ansIndex) => (
      <div key={`ans_${ansIndex}`} style={{ paddingLeft: isNumberedList(ans) ? "70px" : "2.5rem" }} className={` ${isNumberedList(ans) && 'my-2'} text-justify text-base`}>
        {isNumberedList(ans) ? (
          <div className={`flex gap-${Number(ans?.split(" ")[0]?.split(".")[0]) < 10 ? '5' : '3'}`}>
            <div className="text-end">
              {ans?.split(" ")[0]?.trim()}
            </div>
            <div>
              {renderLink(ans?.split(" ").slice(1).join(" ").trim())}
            </div>
          </div>
        ) : (
          <>{renderLink(ans?.trim())}</>
        )}
      </div>
    ))
    const htmlString = ReactDOMServer.renderToString(newArray);
  
    // console.log(htmlString);
    let intervalId;
    const onTypingComplete = () => {
    //   console.log("done");
      setCompleted(true);
      setLoading(false);
      clearInterval(intervalId)
    }
    useEffect(() => {
      if (chatArray?.length > 1) {
        intervalId = setInterval(() => {
          chatContentRef.current.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
        }, 500);
      }
      return () => clearInterval(intervalId);
    }, [])
    if (lastChat?.length > 0) {
      return (
        <>
        <TypingEffect 
          html={htmlString}
          speed={0.5}
          onTypingComplete={onTypingComplete}
        />
        </>
      );
    }
  };

export default AudienceTypingEffectUtil;