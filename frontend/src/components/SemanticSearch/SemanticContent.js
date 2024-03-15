import { useState, useEffect, useRef } from "react";
import "./SemanticSearch.css";
import { SendOutlined } from "@ant-design/icons";
import SemanticChat from "./SemanticChat";

import {fetchSemantic} from '../../services/SemanticServices.js'
import Loading from "../Loading/Loading";

const SemanticContent = ({
  currentPrompt,
  setCurrentPrompt,
  insChatArray,
  setInsChatArray,
  setLoading,
  loading,
  setActivePrompt,
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
    if (editablePrompt !== "") {
      setLoading(true);
      let returnedData;

      // Refer https://docs.google.com/spreadsheets/d/1IUrHm4q6FSeUcJOZeLJ9flLGxWEUVPB7ujIMHEjVT40/edit#gid=0 for this

      fetchingData = {
        user_id: "user6",
        query: editablePrompt,
      };
      // returnedData = {answer: "I know answer of this. I will not tell you🫡"}
      returnedData = await fetchSemantic({fetchingData});

      if (returnedData?.data?.answer?.replaceAll("\n", " ")?.includes("I don't know")) {
        console.log("Check");
        fetchingData = {
          user_id: "test-user",
          query: editablePrompt,
        };
        returnedData = await fetchSemantic({fetchingData});
      }

      if (returnedData?.data?.answer?.replaceAll("\n", " ")?.includes("I don't know")) {
        console.log("Check 2");
        fetchingData = {
          user_id: "user5-csv",
          query: editablePrompt,
        };
        returnedData = await fetchSemantic({fetchingData});
      }
      // console.log(returnedData?.answer?.replaceAll("\n", " "));
      const line =
        editablePrompt + "\n" + returnedData?.data?.answer?.replaceAll("\n", " ");
      setChat(line);
    }
    setEditablePrompt("");
    setPromptResp(noGraphText);
    setActivePrompt(-1);
    setCurrentPrompt("");
  };

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

  useEffect(() => {
    // Focus on the input element when editablePrompt changes
    inputRef?.current?.focus();

    // Set the cursor position to the end of the input value
    const length = editablePrompt?.length;
    inputRef?.current?.setSelectionRange(length, length);
  }, [editablePrompt]);

  return (
    <div className="semantic-content-container">
      <div className="semantic-content-chat-container" ref={chatContentRef}>
        <SemanticChat
          chat={chat}
          insChatArray={insChatArray}
          setInsChatArray={setInsChatArray}
          setLoading={setLoading}
        />
      </div>
      {loading && (
        <div>
          <Loading type="semantic-chat" />
        </div>
      )}
      {!loading && (
        <div className="semantic-content-input-container">
          <input
            ref={inputRef}
            className="semantic-content-input"
            placeholder="Send Your Message ..."
            value={editablePrompt}
            onChange={handlePromptChange}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handlePromptSend} className="semantic-content-btn">
            <SendOutlined />
          </button>
        </div>
      )}
    </div>
  );
};

export default SemanticContent;
