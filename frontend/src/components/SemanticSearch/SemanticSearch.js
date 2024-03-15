import { useState } from "react";
import { MessageFilled } from "@ant-design/icons";
import SemanticContent from "./SemanticContent.js";
import { semanticPrompts } from "../../utils/SemanticPrompts.js";

import './SemanticSearch.css';

const SemanticSearch = () => {
  const [activePrompt, setActivePrompt] = useState(-1);
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [insChatArray, setInsChatArray] = useState([]);
  const [loading, setLoading] = useState(false);

  const handlePromptClick = (prompt, index) => {
    setActivePrompt(index);
    setCurrentPrompt(prompt);
  };

  const handleNewChat = () => {
    setInsChatArray([]);
    setActivePrompt(-1);
    setLoading(false);
    setCurrentPrompt("");
  };

  return (
    <>
      <div className="semantic-container px-24 pt-[1.5rem]">
        <div className="semantic-sidebar-container">
          <div className="semantic-chat-header">How Can I Help You Today?</div>
          <div className="semantic-prompt-container max-h-[240px]">
            {semanticPrompts.map((prompt, index) => (
              <div
                key={index}
                className={`semantic-prompts w-[85%] shadow-md ${
                  index === activePrompt ? "semantic-active" : ""
                }`}
                onClick={() => handlePromptClick(prompt, index)}
              >
                <MessageFilled className="custom-messageIcon" />
                <div
                  // key={index}
                  className={`semantic-prompt text-[0.8rem] text-start ${
                    index === activePrompt ? "semantic-promptActive" : ""
                  }`}
                >
                  {prompt.promptText}
                </div>
              </div>
            ))}
          </div>
          {/* <div className="insurance-chat-header">Chat History</div> */}
        </div>
        <div className="horizontal-line"></div>
        <div className="semantic-chat-container">
          <div className="flex justify-between">
            <div className="semantic-chat-header">Your Chat</div>
            <div
              className="border px-4 py-2 mb-2 rounded bg-[#609DA1] text-white hover:shadow-2xl hover:scale-105 duration-300 cursor-pointer"
              onClick={handleNewChat}
            >
              New Chat
            </div>
          </div>
          <SemanticContent
            currentPrompt={currentPrompt}
            setCurrentPrompt={setCurrentPrompt}
            insChatArray={insChatArray}
            setInsChatArray={setInsChatArray}
            setLoading={setLoading}
            loading={loading}
            setActivePrompt={setActivePrompt}
          />
        </div>
      </div>
    </>
  );
};

export default SemanticSearch;
