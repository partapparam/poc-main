import React, { useState, useEffect, useRef } from "react";
import {CopyTwoTone, ShareAltOutlined, LikeTwoTone, DislikeTwoTone, DatabaseOutlined, LinkOutlined,  AlignLeftOutlined } from "@ant-design/icons";
import AudienceTypingEffectUtil from "./AudienceTypingEffectUtil";
// import { addLibrary } from "../../services/demo_v2Services";
import { Button, Avatar, Table } from "antd";
import avatar8 from './../../assets/images/user.png';
import sampleChart1 from "../../assets/images/sampleChart1.png";
import sampleChart2 from "../../assets/images/sampleChart2.png";
import sampleChart3 from "../../assets/images/sampleChart3.png";
import sampleChart4 from "../../assets/images/sampleChart4.png";
import sampleChart5 from "../../assets/images/sampleChart5.png";
import './HomeResChat.css'


const HomeResChat = ({ chatArray, setLoading, source, setIsHistoryPromptClicked, setQuestion, setInputFilled, handleSend }) => {
  const latestQuestionRef = useRef(null);
  const chatContentRef = useRef(null);
  const [completed, setCompleted] = useState(false);

  const isNumberedList = (text) => {
    // Check if the text starts with a number followed by a dot and a space
    const result1 = /^\d+\.\s/.test(text?.trim());
    const result2 = /^(-|\d+\.\s)/.test(text?.trim());
    // console.log(text, result1);
    return result1 || result2;
  };
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
  setQuestion(question);
  setInputFilled(true);
  handleSend()
}
  useEffect(() => {
    if (latestQuestionRef.current) {
      setTimeout(() => {
        latestQuestionRef.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
      }, 500)
    }
      // setTimeout(() => {
      //   chatContentRef.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
      // }, 500)
    setCompleted(false)
    if (source === "demo_v2") {
      const chatArrayWithType = chatArray.map(chat => {
        let type = "search";
    
        if (chat.question.includes("Identify niche markets for high-end sports cars focusing on income levels and hobbies")) {
          type = "segment";
        } else if (chat.question.includes("What are the best practices for ensuring high data quality in real-time vehicle data streams?")) {
          type = "dataops";
        } else if (chat.question.includes("Develop a strategy for an automobile manufacturer looking to expand its presence in emerging markets, considering local consumer preferences, regulatory environments, and distribution challenges")) {
          type = "report";
        }
    
        // Returning updated chat object with type
        return { ...chat, type };
      });
    
      const data = {
        user_id: JSON.parse(localStorage.getItem('user'))?.id,
        answer: chatArrayWithType
      };
    
      console.log(data);
      // saveLibrarydata(data);
    }
    
  }, [chatArray]);
  function renderLink(text) {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let match;
    let lastIndex = 0;
    const elements = [];
  
    while ((match = linkRegex.exec(text)) !== null) {
      const linkText = match[1];
      const linkUrl = match[2];
  
      // Add the text before the link
      elements.push(
        <span key={`text-${lastIndex}`}>
          {text.substring(lastIndex, match.index)}
        </span>
      );
  
      // Add the link
      elements.push(    
        <a
          key={`link-${match.index}`}
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#609DA1', textDecoration: 'underline' }}
        >
          {linkText}
        </a>
      );
  
      lastIndex = linkRegex.lastIndex;
    }
  
    // Add the remaining text after the last link
    if (lastIndex < text.length) {
      elements.push(
        <span key={`text-${lastIndex}`}>
          {text.substring(lastIndex, text.length)}
        </span>
      );
    }
  
    return <div className="inline">{elements}</div>;
  }
  return (
    <div className="w-[107%] flex flex-col">
      {source == "history" && <Button onClick={() => setIsHistoryPromptClicked(false)} className="mb-2 border w-[fit-content]">Go back to Your Library</Button>}
      {chatArray?.map((chat, index) => (
        <>
        <div className="flex ">
          <div className={chat.isGraph === true ? "w-[45%] mb-10" : "w-[90%] mb-10"} key={index}>
          <div className="flex gap-2 mb-1 mt-2" style={{ alignItems: "center", marginLeft: "-30px" }}>
            <div style={{ height: "40px", width: "40px" }}>
              <Avatar 
                src={localStorage.getItem('profile_url') ? localStorage.getItem('profile_url').toString() : avatar8}
              ></Avatar>
            </div>
            <div className="text-2xl ml-2">
              {chat?.question}
            </div>
          </div>

            <div className="flex items-center gap-2.5 mt-6 mb-2">
              <AlignLeftOutlined style={{ fontSize: "24px" }} />
              <div ref={
                index === chatArray.length - 1 ? latestQuestionRef : null
              } className="flex justify-center items-center text-2xl pb-0.5">
                Answer
              </div>
            </div>
            {(index !== chatArray?.length - 1 || completed) && chat?.answer?.map((ans, ansIndex) => (
              <div key={`ans_${ansIndex}`} style={{ paddingLeft: isNumberedList(ans) ? "70px" : "2.5rem"}} className={` ${isNumberedList(ans) && 'my-2'} text-justify text-base`}>
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
                  // <>{ans?.trim()}</>
                )}
              </div>
            ))}
            {index === chatArray?.length - 1 && !completed && 
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
            }

            {completed && (
              <>
              {chat?.question.toLowerCase().trim().includes("revenue down this week") ? 
              <img className="mt-4 ml-8" src={sampleChart1} /> :
              chat?.question.toLowerCase().trim().includes("drop in influencer partnership") ?
              <img className="mt-4 ml-8" src={sampleChart2} /> :
              chat?.question.toLowerCase().trim().includes("campaign perform last week?") ?
              <img className="mt-4 ml-8" src={sampleChart3} /> :
              chat?.question.toLowerCase().trim().includes("active users?") ?
              <img className="mt-4 ml-8" src={sampleChart4} /> : 
              chat?.question.toLowerCase().trim().includes("sales revenue this week?") ?
              <img className="mt-4 ml-8" src={sampleChart5} /> :<div style={{display: "none"}}></div>
              }
              <>
                {
                  chat?.isSuggestions === true ? 
                  <span className="ml-10 mt-6 color-[gray]">
                    Suggestions:-
                  </span> : "" 
                }
 
                <div className="flex gap-2 ml-10 mt-2">
                  {chat?.suggestions?.map((suggestion, index) =>(
                      <Button onClick={() => suggestionButton(suggestion)}>{suggestion}</Button>
                  ))}
                </div>
              </>
              </>
            )}

            
          </div>
          {chat.isGraph === true && (
              <div className="flex justify-center w-[45%] mt-10 ml-2" style={{height: "fit-content"}}> 
            {chat?.question.toLowerCase().trim().includes("revenue down this week") ? 
              // <img style={{height: "fit-content"}} className="mt-4 ml-8" src={sampleChart1} />
              <Table className="demoAppTable"
              columns={[
                { title: 'Date', dataIndex: 'date', key: 'date'},
                { title: 'Revenue', dataIndex: 'revenue', key: 'revenue' },
              ]}
              dataSource={[
                { date: "December'29", revenue: 7800 },
                { date: "January'05", revenue: 15500 },
                { date: "January'12", revenue: 9000 },
                { date: "January'19", revenue: 18000 },
                { date: "January'26", revenue: 11000 },
                { date: "February'03", revenue: 28000 },
              ]}
              pagination={false} // If you want pagination, remove this line
            /> :
              chat?.question.toLowerCase().trim().includes("drop in influencer partnership") ?
              // <img style={{height: "fit-content"}} className="mt-4 ml-8" src={sampleChart2} /> 
              <Table className="demoAppTable"
              columns={[
                { title: 'Social Media', dataIndex: 'sm', key: 'sm' },
                { title: 'User Count', dataIndex: 'uc', key: 'uc' },
              ]}
              dataSource={[
                { sm: "Facebook", uc: 730000 },
                { sm: "Linkedin", uc: 65000 },
                { sm: "Twitter", uc: 4000 },
                { sm: "Instagram", uc: 1000 },
              ]}
              pagination={false} // If you want pagination, remove this line
            /> :
              // chat?.question.toLowerCase().trim().includes("campaign perform last week?") ?
              // <img style={{height: "fit-content"}} className="mt-4 ml-8" src={sampleChart3} /> :
              // chat?.question.toLowerCase().trim().includes("active users?") ?
              // <img style={{height: "fit-content"}} className="mt-4 ml-8" src={sampleChart4} /> : 
              chat?.question.toLowerCase().trim().includes("sales revenue this week?") ?
              // <img style={{height: "fit-content"}} className="mt-4 ml-8" src={sampleChart2} /> 
              <Table className="w-[60%] demoAppTable" style={{overflowX: "scroll"}}
                columns={[
                  { title: 'Date', dataIndex: 'date', key: 'date' },
                  { title: 'Paid Ads', dataIndex: 'paidAds', key: 'paidAds' },
                  { title: 'Influencer Partnership', dataIndex: 'influencerPartnership', key: 'influencerPartnership' },
                  { title: 'SmartHome Essentials', dataIndex: 'smartHomeEssentials', key: 'smartHomeEssentials' },
                  { title: 'Tech Gadgets', dataIndex: 'techGadgets', key: 'techGadgets' },
                  { title: 'Others', dataIndex: 'others', key: 'others' },
                ]}
                dataSource={[
                  { date: "December'29", paidAds: 100, influencerPartnership: 75, smartHomeEssentials: 50, techGadgets: 25, others: 15 },
                  { date: "January'15", paidAds: 100, influencerPartnership: 75, smartHomeEssentials: 50, techGadgets: 25, others: 15 },
                  { date: "January'31", paidAds: 100, influencerPartnership: 75, smartHomeEssentials: 50, techGadgets: 25, others: 15 },
                ]}
                pagination={false} // If you want pagination, remove this line
              />
              :<div style={{display: "none"}}></div>
            }
            </div>
          )}
        </div>
        <div>
          {(completed || index !== chatArray?.length - 1) && (
              <>
                {chat?.sources && chat?.sources?.length > 0 && chat?.sources?.some(Boolean) && (
                  <>
                  <div className="flex items-center gap-2.5 mb-2">
                    <DatabaseOutlined style={{ fontSize: "24px" }} />
                    <div className="flex justify-center items-center text-2xl pb-0.5">
                      Sources
                    </div>
                  </div>
                  <div className="flex flex-wrap pl-[3rem] justify-start items-center gap-5 pb-2 w-[90%]">
                    {chat?.sources?.map((source, sourceIdx) => (
                      source !== false && source?.title && (
                        <div 
                          key={`source-${sourceIdx}`} 
                          className="flex flex-col justify-center items-center border rounded-lg w-[300px] h-[100px] gap-5 cursor-pointer border-[#609DA1] bg-gray-100 hover:scale-105 delay-150 duration-300 ease-in-out" 
                          onClick={() => window.open(`${source?.url}`, "_blank", "noreferrer")}
                        >
                          <div className="flex justify-start items-center w-[90%] text-lg">
                            {source?.title?.length > 30 ? source?.title?.substring(0, 30) + "..." : source?.title}
                          </div>
                          <div className="flex justify-start items-center gap-2 w-full pl-[0.75rem]">
                            <div className="flex justify-center items-center border border-[#609DA1] rounded-full p-2 bg-white">
                              {source?.image?.includes("http") ? (
                                <img alt="img" src={source?.image} width={20} />
                              ) : (
                                <LinkOutlined style={{ color: 'black', fontSize: "20px" }} />
                              )}
                            </div>
                            <div className="text-[12px]">
                              {source?.siteName || "Source"}
                            </div>
                          </div>
                        </div>
                      )
                    ))}
                  </div>
                  </>
                )}
              <div className="mt-4" style={{ paddingLeft: "2.5rem", marginBottom: "20px", display: "flex", gap: "8px" }}>
                <CopyTwoTone twoToneColor={"#609da1"} className="copy-icon icon" />
                <LikeTwoTone twoToneColor={"#609da1"}  className="like-icon icon" />
                <DislikeTwoTone twoToneColor={"#609da1"}  className="dislike-icon icon" />
                {/* <DownloadOutlined style={{ color: "#609da1", fill: 'white' }} className="download-icon icon" /> */}
                <ShareAltOutlined style={{ color: "#609da1", fill: 'white' }} className="download-icon icon" />
              </div>
              </>
            )}
        </div>
        </>
      ))}
    </div>
  );
};

export default HomeResChat;
