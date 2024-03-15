import "./Insurance.css";
import { useState, useEffect } from "react";
import { MessageFilled, RobotOutlined, SafetyCertificateFilled, SignalFilled, IdcardFilled } from "@ant-design/icons";
import InsuranceContent from "./InsuranceContent.js";
import { insurancePrompts, insightsPrompts } from "../../utils/InsuranceUtil.js";

const Insurance = () => {
  const [activePrompt, setActivePrompt] = useState(-1);
  const [activeInsightsPrompt, setActiveInsightsPrompt] = useState(-1);
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [insChatArray, setInsChatArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const [accountData, setAccountData] = useState(null);
  const [showInsightPrompts, setShowInsightPrompts] = useState(false)

  const handleInsurancePromptClick = (prompt, index) => {
    setActivePrompt(index);
    setCurrentPrompt(prompt);
    setActiveInsightsPrompt(-1)
  };
  const handleInsightsPromptClick = (prompt, index) => {
    setActiveInsightsPrompt(index);
    setActivePrompt(-1);
    setCurrentPrompt(prompt);
  };
  const handleNewChat = () => {
    setInsChatArray([]);
    setActivePrompt(-1);
    setActiveInsightsPrompt(-1)
    setLoading(false);
    setCurrentPrompt("");
    setAccountData(null);
  };
  const handleInsightVisibility = () => {
    setShowInsightPrompts(!showInsightPrompts)
  }
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        (event.ctrlKey && event.key === "k") || // For Windows
        (event.metaKey && event.key === "k")   // For Mac
      ) {
        event.preventDefault()
        handleNewChat();
      }
    };

    // Add event listener when the component mounts
    document.addEventListener("keydown", handleKeyDown);

    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return (
    <>
      <div className="insurance-container px-24 pt-8">
        <div className="insurance-sidebar-container">
          {/* <div className="insurance-chat-header">How Can I Help You Today?</div> */}
          <div className="flex justify-start">
            <div
                className="border px-4 py-2 mb-2 rounded bg-[#609DA1] text-white hover:shadow-2xl hover:scale-105 duration-300 cursor-pointer"
                style={{borderRadius: "30px", width: "70%", display: "flex", justifyContent: "space-around"}}
                onClick={handleNewChat}
            >
              <span className="new-chat-label">New Chat</span>

               {navigator.platform.includes("Win") || navigator.platform.includes("Linux") ? (
                <span style={{fontSize: "small", opacity: "0.6"}}>Ctrl+K</span>
              ) : (
                <span style={{fontSize: "small", opacity: "0.6"}}>&#8984;+K</span>
              )}
            </div>
          </div>
          <div className="insurance-chat-header2">Research</div>
          <div className="insurance-prompt-container min-h-[155px]">
            {insurancePrompts.map((prompt, index) => (
              <div
                key={index}
                className={`insurance-prompts w-full shadow-md ${
                  index === activePrompt ? "insurance-active" : ""
                }`}
                onClick={() => handleInsurancePromptClick(prompt, index)}
              >
                {prompt.promptText == "Risk Scoring" ? <SafetyCertificateFilled className="custom-messageIcon" /> : prompt.promptText == "Signals" ? <SignalFilled className="custom-messageIcon" /> : <IdcardFilled className="custom-messageIcon" />}
                {/* <MessageFilled className="custom-messageIcon" /> */}
                <div
                  className={`insurance-prompt text-[0.8rem] ${
                    index === activePrompt ? "insurance-promptActive" : ""
                  }`}
                >
                  {prompt.promptText}
                </div>
              </div>
            ))}
          </div>
          <div className="insurance-chat-header2">Insights</div>
          <div className="insurance-prompt-container talkToData-container">
            {/* "Talk to your data" button */}
            <div
              className={`insurance-prompts w-full shadow-md`}
              onClick={() => handleInsightVisibility()}
            >
              <RobotOutlined className="custom-messageIcon" />
              <div className={`insurance-prompt text-[0.8rem]`}>
                Talk to your data
              </div>
            </div>
          </div>
        {showInsightPrompts && (
          <div className="insurance-prompt-container min-h-[155px]">
          {insightsPrompts.map((prompt, index) => (
              <div
                key={index}
                className={`insurance-prompts w-full shadow-md ${
                  index === activeInsightsPrompt ? "insurance-active" : ""
                }`}
                onClick={() => handleInsightsPromptClick(prompt, index)}
              >
                
                <MessageFilled className="custom-messageIcon" />
                <div
                  className={`insurance-prompt text-[0.8rem] ${
                    index === activeInsightsPrompt ? "insurance-promptActive" : ""
                  }`}
                >
                  {prompt.promptText}
                </div>
              </div>
            ))}
          </div>
        )}
        </div>
        <div className="horizontal-line"></div>
        <div className="insurance-chat-container">
          <div className="flex justify-between">
            <div className="insurance-chat-header">Your Chat</div>
          </div>
          <InsuranceContent
            currentPrompt={currentPrompt}
            setCurrentPrompt={setCurrentPrompt}
            insChatArray={insChatArray}
            setInsChatArray={setInsChatArray}
            setLoading={setLoading}
            loading={loading}
            setActivePrompt={setActivePrompt}
            setActiveInsightsPrompt={setActiveInsightsPrompt}
            setAccountData={setAccountData}
            accountData={accountData}
          />
        </div>
      </div>
    </>
  );
};

export default Insurance;
