import React, { useState, useEffect } from "react";

import HomeInitial_v2 from "../HomeInitial_v2/HomeInitial_v2.js";
import HomeLater_v2 from "../HomeLater_v2/HomeLater_v2.js";

// import "./Home_v2.css";

const Home_v2 = ({  }) => {
  const [initialCalled, setInitialCalled] = useState(true);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState({responseData: "", sources: ""});
  const [loading, setLoading] = useState(false);
  const [attachedFile, setAttachedFile] = useState(null);

  useEffect(() => {
    const handleNewChatEvent = () => {
      setInitialCalled(true)
      setQuestion("")
      setAnswer({responseData: "", sources: ""})
      setAttachedFile(null)
      setLoading(false)
    };

    document.addEventListener("newChatClicked", handleNewChatEvent);

    return () => {
      document.removeEventListener("newChatClicked", handleNewChatEvent);
    };
  }, []);
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        (event.ctrlKey && event.key === "k") || // For Windows
        (event.metaKey && event.key === "k")   // For Mac
      ) {
        event.preventDefault()
        setInitialCalled(true)
        setQuestion("")
        setAnswer({responseData: "", sources: ""})
        setAttachedFile(null)
        setLoading(false)
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  if (initialCalled) {
    return (
      <HomeInitial_v2
        setInitialCalled={setInitialCalled}
        setQuestion={setQuestion}
        question={question}
        setAnswer={setAnswer}
        loading={loading}
        setLoading={setLoading}
        attachedFile={attachedFile}
        setAttachedFile={setAttachedFile}
      />
    );
  }
  return (
    <HomeLater_v2
      question={question}
      answer={answer}
      setQuestion={setQuestion}
      loading={loading}
      setLoading={setLoading}
    />
  );
};

export default Home_v2;
