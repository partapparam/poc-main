import { useState, useEffect, useRef } from "react";
import "./Insurance.css";
import { SendOutlined, GlobalOutlined, ApiOutlined, PaperClipOutlined } from "@ant-design/icons";
import InsuranceChat from "./InsuranceChat.js";

import {fetchAccountData} from '../../services/InsuranceServices.js';

import { Button, message } from "antd";
import Loading from '../Loading/Loading.js';

const InsuranceContent = ({
  currentPrompt,
  setCurrentPrompt,
  insChatArray,
  setInsChatArray,
  setLoading,
  loading,
  setActivePrompt,
  setActiveInsightsPrompt,
  accountData,
  setAccountData,
}) => {
  const [chat, setChat] = useState("");
  const [editablePrompt, setEditablePrompt] = useState(
    currentPrompt?.insQuestion || ""
  );
  const [promptResp, setPromptResp] = useState("");
  let fetchingData;

  const chatContentRef = useRef(null);
  const inputRef = useRef(null);

  const noGraphText = "There are no results for that question at this point.";

  const handlePromptSend = async () => {
    let extractedCompany;
    // setAccountData(null);
    if (editablePrompt !== "") {
      const line = editablePrompt + "\n" + promptResp;
      setChat(line);
      if (editablePrompt?.includes("firmographic")) {
        extractedCompany = editablePrompt
          ?.split("Get me firmographic info of")[1]
          ?.trim();
        // console.log(extractedCompany);
        if (extractedCompany?.trim() === "") {
          message.error(
            "Please Enter a Company to find its Firmographic Information"
          );
          return;
        }
        fetchingData = {
          companies: [
            {
              company: extractedCompany,
              country: "United States",
            },
          ],
        };
        setLoading(true);
        const res = await fetchAccountData({fetchingData});
        setAccountData(res.data)
        setLoading(false)
      } else if (editablePrompt?.includes("signals")) {
        extractedCompany = editablePrompt
          ?.split("Get me signals of")[1]
          ?.trim();
        // console.log(extractedCompany);
        if (extractedCompany?.trim() === "") {
          message.error("Please Enter a Company to find its Signals");
          return;
        }
        fetchingData = {
          companies: [
            {
              company: extractedCompany,
              country: "United States",
            },
          ],
        };
        setLoading(true);
        const res = await fetchAccountData({fetchingData});
        setAccountData(res.data)
        setLoading(false)
      } else if (editablePrompt?.includes("risk profile")) {
        extractedCompany = editablePrompt
          ?.split("Get me risk profile of")[1]
          ?.trim();
        // console.log(extractedCompany);
        if (extractedCompany?.trim() === "") {
          message.error("Please Enter a Company to find its Risk Profile");
          return;
        }
        fetchingData = {
          companies: [
            {
              company: extractedCompany,
              country: "United States",
            },
          ],
        };
        setLoading(true);
        const res = await fetchAccountData({fetchingData});
        setAccountData(res.data)
        setLoading(false)
      }  else if (editablePrompt?.includes("Analysis Report") || editablePrompt?.includes("Segmentation Reports") || editablePrompt?.includes("Fraud Analysis")) {
        setLoading(true);
      }

      setEditablePrompt("");
      setPromptResp(noGraphText);
      setActivePrompt(-1);
      setCurrentPrompt("");
    }
  };

  useEffect(() => {
    // console.log("loading => ", loading);
    // console.log("accountData => ", accountData);
  }, [loading, accountData]);

  const handlePromptChange = (e) => {
    setEditablePrompt(e.target.value);
    if (promptResp === undefined) setPromptResp(noGraphText);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handlePromptSend();
    }
  };

  useEffect(() => {
    setEditablePrompt(currentPrompt?.insQuestion || "");
    setPromptResp(
      currentPrompt.insResponse === "" ? noGraphText : currentPrompt.insResponse
    );
  }, [currentPrompt]);

  useEffect(() => {
    setTimeout(() => {
      chatContentRef.current.style.scrollBehavior = "smooth";
      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    }, 0);
  }, [chat]);

  useEffect(() => {
    let intervalId;
  
    if (loading) {
      intervalId = setInterval(() => {
        chatContentRef.current.style.scrollBehavior = "smooth";
        chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
      }, 1000);
    } else {
      // Clear the interval when loading becomes false
      clearInterval(intervalId);
    }
  
    // Cleanup function to clear the interval when the component unmounts or when loading changes
    return () => {
      clearInterval(intervalId);
    };
  }, [loading]);
  

  // useEffect(() => {
  //   // Focus on the input element when editablePrompt changes
    
  //   inputRef.current.focus();

  //   // Set the cursor position to the end of the input value
  //   const length = editablePrompt.length;
  //   inputRef.current.setSelectionRange(length, length);
  // }, [editablePrompt]);

  return (
<div className="insurance-content-container">
  <div className="insurance-content-chat-container" ref={chatContentRef}>
    <InsuranceChat
      chat={chat}
      insChatArray={insChatArray}
      setInsChatArray={setInsChatArray}
      accountData={accountData}
      setAccountData={setAccountData}
      loading={loading}
      setLoading={setLoading}
    />
  </div>
  {loading && (
    <div>
      <Loading type="semantic-chat"/>
    </div>
  )}
  {!loading && (
    <>
      <div className="insurance-content-input-container">
        {/* <div className="button-group">
          <button className="input-button"> <GlobalOutlined /> Internet</button>
          <button className="input-button"><ApiOutlined /> Hybrid</button>
          <button className="input-button"> <PaperClipOutlined /> Attach</button>
        </div> */}
        <div className="input-group">
          <input
            ref={inputRef}
            className="insurance-content-input"
            placeholder="Send Your Message ..."
            value={editablePrompt}
            onChange={handlePromptChange}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handlePromptSend} className="insurance-content-btn">
            <SendOutlined />
          </button>
        </div>
      </div>
    </>
  )}
</div>

  );
};

export default InsuranceContent;
