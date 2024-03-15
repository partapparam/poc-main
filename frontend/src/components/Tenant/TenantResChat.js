import React, { useState, useEffect, useRef } from "react"
import {
  CopyTwoTone,
  ShareAltOutlined,
  LikeTwoTone,
  DislikeTwoTone,
  DatabaseOutlined,
  LinkOutlined,
  AlignLeftOutlined,
} from "@ant-design/icons"
import AudienceTypingEffectUtil from "../HomeResChat/AudienceTypingEffectUtil"
// import { addLibrary } from "../../services/demo_v2Services";
import { Button, Avatar, Table, Divider } from "antd"
import avatar8 from "./../../assets/images/user.png"
import "./TenantResChat.css"

const TenantResChat = ({
  chatArray,
  setLoading,
  source,
  setIsHistoryPromptClicked,
  setQuestion,
  setInputFilled,
  handleSend,
  sessionStatus,
  setSessionStatus,
}) => {
  const latestQuestionRef = useRef(null)
  const chatContentRef = useRef(null)
  const [completed, setCompleted] = useState(false)

  const isNumberedList = (text) => {
    // Check if the text starts with a number followed by a dot and a space
    const result1 = /^\d+\.\s/.test(text?.trim())
    const result2 = /^(-|\d+\.\s)/.test(text?.trim())
    // console.log(text, result1);
    return result1 || result2
  }
  // const saveLibrarydata = async (data) => {
  //   let response = await addLibrary(data);
  //   console.log(response);
  //   if(response.status == 200 ){
  //     console.log("Data Saved ");
  //   } else {
  //     console.log("error");
  //   }
  // }
  const suggestionButton = (question) => {
    setQuestion(question)
    setInputFilled(true)
    handleSend()
  }
  useEffect(() => {
    if (latestQuestionRef.current) {
      setTimeout(() => {
        latestQuestionRef.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
          inline: "nearest",
        })
      }, 500)
    }
    // setTimeout(() => {
    //   chatContentRef.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    // }, 500)
    setCompleted(false)
  }, [chatArray])
  function renderLink(text) {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
    let match
    let lastIndex = 0
    const elements = []

    while ((match = linkRegex.exec(text)) !== null) {
      const linkText = match[1]
      const linkUrl = match[2]

      elements.push(
        <span key={`text-${lastIndex}`}>
          {text.substring(lastIndex, match.index)}
        </span>
      )

      elements.push(
        <a
          key={`link-${match.index}`}
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#609DA1", textDecoration: "underline" }}
        >
          {linkText}
        </a>
      )
      console.log(elements)
      lastIndex = linkRegex.lastIndex
    }

    // Add the remaining text after the last link
    if (lastIndex < text.length) {
      elements.push(
        <span key={`text-${lastIndex}`}>
          {text.substring(lastIndex, text.length)}
        </span>
      )
    }

    return <div className="inline">{elements}</div>
  }
  return (
    <div className="w-[107%] flex flex-col">
      {source == "history" && (
        <Button
          onClick={() => setIsHistoryPromptClicked(false)}
          className="mb-2 border w-[fit-content]"
        >
          Go back to Your Library
        </Button>
      )}
      {chatArray?.map((chat, index) => (
        <>
          <div className="flex ">
            <div className={"w-[90%] mb-10"} key={index}>
              <div
                className="flex gap-2 mb-1 mt-2"
                style={{ alignItems: "center", marginLeft: "-30px" }}
              >
                <div style={{ height: "50px", width: "50px" }}>
                  <Avatar
                    src={
                      localStorage.getItem("profile_url")
                        ? localStorage.getItem("profile_url").toString()
                        : avatar8
                    }
                  ></Avatar>
                </div>
                <div className="text-2xl ml-2">{chat?.question}</div>
              </div>
              <div className="flex items-center gap-2.5 mt-6 mb-2">
                <AlignLeftOutlined style={{ fontSize: "24px" }} />
                <div
                  ref={
                    index === chatArray.length - 1 ? latestQuestionRef : null
                  }
                  className="flex justify-center items-center text-2xl pb-0.5"
                >
                  Answer
                </div>
              </div>
              {(index !== chatArray?.length - 1 || completed) &&
                chat?.answer?.map((ans, ansIndex) => (
                  <div
                    key={`ans_${ansIndex}`}
                    style={{
                      paddingLeft: isNumberedList(ans) ? "70px" : "2.5rem",
                    }}
                    className={` ${
                      isNumberedList(ans) && "my-2"
                    } text-justify text-base`}
                  >
                    {isNumberedList(ans) ? (
                      <div
                        className={`flex gap-${
                          Number(ans?.split(" ")[0]?.split(".")[0]) < 10
                            ? "5"
                            : "3"
                        }`}
                      >
                        <div className="text-end">
                          {ans?.split(" ")[0]?.trim()}
                        </div>
                        <div>
                          {renderLink(
                            ans?.split(" ").slice(1).join(" ").trim()
                          )}
                        </div>
                      </div>
                    ) : (
                      <>{renderLink(ans?.trim())}</>
                      // <>{ans?.trim()}</>
                    )}
                  </div>
                ))}
              {index === chatArray?.length - 1 && !completed && (
                <>
                  <AudienceTypingEffectUtil
                    chatArray={chatArray}
                    isNumberedList={isNumberedList}
                    renderLink={renderLink}
                    setCompleted={setCompleted}
                    chatContentRef={chatContentRef}
                    setLoading={setLoading}
                  />
                  <div ref={chatContentRef} />
                </>
              )}
            </div>
          </div>
          <div>
            {(completed || index !== chatArray?.length - 1) && (
              <>
                {chat?.sources &&
                  chat?.sources?.length > 0 &&
                  chat?.sources?.some(Boolean) && (
                    <>
                      <div className="flex items-center gap-2.5 mb-2">
                        <DatabaseOutlined style={{ fontSize: "24px" }} />
                        <div className="flex justify-center items-center text-2xl pb-0.5">
                          Sources
                        </div>
                      </div>
                      <div className="flex flex-wrap pl-[3rem] justify-start items-center gap-5 pb-2 w-[90%]">
                        {chat?.sources?.map(
                          (source, sourceIdx) =>
                            source !== false &&
                            source?.title && (
                              <div
                                key={`source-${sourceIdx}`}
                                className="flex flex-col justify-center items-center border rounded-lg w-[300px] h-[100px] gap-5 cursor-pointer border-[#609DA1] bg-gray-100 hover:scale-105 delay-150 duration-300 ease-in-out"
                                onClick={() =>
                                  window.open(
                                    `${source?.url}`,
                                    "_blank",
                                    "noreferrer"
                                  )
                                }
                              >
                                <div className="flex justify-start items-center w-[90%] text-lg">
                                  {source?.title?.length > 30
                                    ? source?.title?.substring(0, 30) + "..."
                                    : source?.title}
                                </div>
                                <div className="flex justify-start items-center gap-2 w-full pl-[0.75rem]">
                                  <div className="flex justify-center items-center border border-[#609DA1] rounded-full p-2 bg-white">
                                    {source?.image?.includes("http") ? (
                                      <img
                                        alt="img"
                                        src={source?.image}
                                        width={20}
                                      />
                                    ) : (
                                      <LinkOutlined
                                        style={{
                                          color: "black",
                                          fontSize: "20px",
                                        }}
                                      />
                                    )}
                                  </div>
                                  <div className="text-[12px]">
                                    {source?.siteName || "Source"}
                                  </div>
                                </div>
                              </div>
                            )
                        )}
                      </div>
                    </>
                  )}
                <div
                  className="mt-4"
                  style={{
                    paddingLeft: "2.5rem",
                    marginBottom: "20px",
                    display: "flex",
                    gap: "8px",
                  }}
                >
                  <CopyTwoTone
                    twoToneColor={"#609da1"}
                    className="copy-icon icon"
                  />
                  <LikeTwoTone
                    twoToneColor={"#609da1"}
                    className="like-icon icon"
                  />
                  <DislikeTwoTone
                    twoToneColor={"#609da1"}
                    className="dislike-icon icon"
                  />
                  {/* <DownloadOutlined style={{ color: "#609da1", fill: 'white' }} className="download-icon icon" /> */}
                  <ShareAltOutlined
                    style={{ color: "#609da1", fill: "white" }}
                    className="download-icon icon"
                  />
                </div>
              </>
            )}
          </div>
        </>
      ))}
      {sessionStatus === "False" ? (
        <div>
          <Button
            onClick={() => setSessionStatus("True")}
            className="mb-2 border w-[fit-content]"
          >
            Ask Follow Up
          </Button>
        </div>
      ) : (
        <>
          <Button
            onClick={() => setSessionStatus("False")}
            className="mb-2 border w-[fit-content]"
          >
            End Q&A
          </Button>
        </>
      )}
    </div>
  )
}

export default TenantResChat
