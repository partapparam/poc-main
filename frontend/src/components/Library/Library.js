import React, { useState, useEffect } from "react";
import { EyeOutlined, ShareAltOutlined, FieldTimeOutlined, BlockOutlined } from "@ant-design/icons";
// import { getLibrary } from "../../services/demo_v2Services";
import { Card, Input, Button } from "antd";
import HomeResChat from "../HomeResChat/HomeResChat";
import '../Discover/Discover.css'

function Library({ isPremium }) {
  const [selectedCategory, setSelectedCategory] = useState("Search");
  const [chatArray, setChatArray] = useState([]);
  const [selectedChatArray, setSelectedChatArray] = useState([]);
  const [isHistoryPromptClicked, setIsHistoryPromptClicked] = useState(false);
  const setLoading = () => {
    console.log("clicked");
  };

  const handleTabClick = (category) => {
    setSelectedCategory(category);
  };

  const categories = ["Search", "Segment", "DataOps", "Report"];

  // const getLibraryList = async () => {
  //   const data = {
  //     user_id: JSON.parse(localStorage.getItem('user'))?.id
  //   };
  //   console.log(data);
  //   let response = await getLibrary(data);
  //   console.log(response);
  //   if (response.status === 200 && response.data.status === "success") {
  //     const filteredRows = response.data.data.rows.filter(row => row.answer !== null);
  //     const chatArray = filteredRows.map(row => ({
  //       question: row.answer[0].question,
  //       answer: row.answer[0].answer,
  //       type: row.answer[0].type || "search", // Default to "search" if type is not present
  //       createdDate: row.createddate // Assuming this is the name of the column from your database
  //     }));
  //     console.log(chatArray, "Filtered Questions");
  //     setChatArray(chatArray);
  //   } else {
  //     // Handle error or empty response
  //     console.error("Error fetching library data");
  //   }
  // };

  // useEffect(() => {
  //   getLibraryList();
  // }, []);

  const handleQuestionClick = (question) => {
    setIsHistoryPromptClicked(true);
    const selectedChat = chatArray.find(chat => chat.question === question);
    setSelectedChatArray([selectedChat]);
    console.log(selectedChatArray);
  };

  const threads = [
    {
        prompt: 'What are key attributes of different audience segments for true wireless earphones in North America?',
        btnText: [
            'Audience'
        ] 
    },
    {
        prompt: 'Give me the total revenue generated by each SKU over last year?',
        btnText: [
            'Reports & Analytics'
        ] 
    },
    {
        prompt: 'Analyze deal cycle according to each SKU',
        btnText: [
            'Reports & Analytics'
        ] 
    },
    {
        prompt: 'Create a segment of existing customers and anonymize PII information',
        btnText: [
            'DataOps'
        ] 
    },
    {
        prompt: 'Give me list of keywords for ad campaign targeted towards budget conscious consumers looking for TWS',
        btnText: [
            'Audience',
            'Marketing'
        ] 
    },
    {
        prompt: 'Based on industry trends, which channel is most effective for my next campaign for TWS, targeted towards fitness enthusiasts in North America?',
        btnText: [
            'Marketing',
            'Market Intelligence'
        ] 
    },
]
const collection = [
  {
      txt: 'Audience',
      num: '20'
  },
  {
      txt: 'Reports & Analytics',
      num: '10'
  },
  {
      txt: 'Segment & List',
      num: '3'
  },
]
  return (
    <>
      {!isHistoryPromptClicked ? (
        <div className={`discover-container relative justify-center`}>
          <div style={{ alignItems: "center", fontWeight: "" }} className="flex text-[30px] ml-8 gap-4"> <BlockOutlined className="text-[25px] mt-1" /> Library</div>
          <hr className="m-4" />
          <div className="absolute z-50 right-0 top-2">
            <Input
              placeholder="Search"
              onChange={(e) => console.log(e.target.value)}
            />
          </div>
          <div className="libcontainer flex gap-36 pl-10">
            <div className="absolute z-50 right-0 top-20">
              <Button>
                Add New +
              </Button>
            </div>
            <div className="border border-2 absolute top-[130px] left-[62.5%] h-[600px]"/>
            <div className="threads w-[60%] mt-10 flex flex-col gap-5">
              <div className="headLib text-[20px]">
                My Threads
              </div>
              <div className="cardsLib flex flex-col gap-2">
                {threads.map((thread, index) => (
                  <Card key={index} className="allCards relative">
                    <div style={{fontWeight: 600, fontSize: "15px"}} className="txtPromptLib mb-6 w-[90%]">
                      {thread.prompt}
                    </div>
                    <div className="flex justify-end items-center gap-2 pr-2">
                      {thread.btnText.map((btn, indexBtn) => (
                        <div key={indexBtn} className="border bg-[#609DA1] text-white px-2 rounded-md">
                          {btn}
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
            <div className="collection w-[35%] mt-12 flex flex-col gap-4">
              <div className="headLib text-[20px]">
                  My Collection
              </div>
              <div className="cardsLib flex flex-col gap-2">
                {collection.map((col, indexCol) => (
                  <Card key={indexCol} className="allCards">
                    <div className="flex flex-col gap-2">
                      <div>
                        {col.txt} 
                      </div>
                      <div className="flex justify-start items-center gap-2">
                        <BlockOutlined />
                        {col.num}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
          {/* <div className="flex justify-center ">
            <div className="flex justify-center p-[0.3rem] w-[40%] gap-8 text-[17px] border-[5px] mt-4" style={{ borderRadius: "30px" }}> {/* This div is now centered */}
              {/* {categories.map((category) => (
                <div
                  key={category}
                  className={`tab text-center cursor-pointer p-[0.3rem] ${selectedCategory === category ? "active" : ""}`}
                  style={{ borderRadius: "30px", width: "20%", fontWeight: "600" }}
                  onClick={() => handleTabClick(category)}
                >
                  {category}
                </div>
              ))}
            </div>
          </div> */}
          {/* <div className="flex justify-center mt-8">
            <div className="prompts w-[60%]">
              {chatArray.length === 0 ? (
                <div className="text-center text-gray-500">No data found</div>
                ) : (
                chatArray
                    .filter(chat => chat.type === selectedCategory.toLowerCase())
                    .sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate))
                    .map((chat, index) => (
                        <Card
                        className="mb-6 bg-[whitesmoke] border cursor-pointer"
                        style={{ transition: "transform 0.3s ease", transform: "scale(1)" }}
                        key={index}
                        onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                        onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                      >
                        <div onClick={() => handleQuestionClick(chat.question)} className="question ml-4 text-xl">{chat.question}</div>
                        <div className="flex mt-2 ml-4 justify-end" style={{alignItems: "center"}}>
                          <FieldTimeOutlined />
                          <div className="ml-2 mr-6 text-gray-500">{formatTimeAgo(chat.createdDate)}</div>
                          <ShareAltOutlined />
                        </div>
                      </Card>
                      
                    ))
                )}

            </div>
          </div> */}
        </div>
      ) :
        <div className="pl-10 w-full h-[90%]" style={{ overflowY: "scroll", overflowX: "hidden" }}>
          <HomeResChat chatArray={selectedChatArray} setLoading={setLoading} source={"history"} setIsHistoryPromptClicked={setIsHistoryPromptClicked} />
        </div>
      }
    </>
  );
}

export default Library;
