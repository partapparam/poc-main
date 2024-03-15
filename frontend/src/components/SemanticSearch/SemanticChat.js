import React, { useState, useEffect } from "react";
import "./SemanticSearch.css";

import { UserOutlined } from "@ant-design/icons";
import { Badge, Avatar, Typography } from "antd";
import icon from "../../assets/images/logoRemovedBG.png";
import TypingEffect from "../TypingEffect/TypingEffect";

const SemanticChat = ({
  chat,
  insChatArray,
  setInsChatArray,
  setLoading,
}) => {
  const [done, setDone] = useState(false);
  useEffect(() => {
    setDone(false);
    const lines = chat.split("\n");

    if (lines.length >= 2) {
      const head = lines[0].trim();
      const content = lines[1]?.trim();

      const chatObject = { head, content };

      setInsChatArray((prevInsChats) => [...prevInsChats, chatObject]);
    }
  }, [chat]);

  const handleTypingComplete = () => {
    console.log("done");
    setDone(true);
    setLoading(false);
  };

  return (
    <div>
      {insChatArray.map((insChat, index) => (
        <div className="semantic-chat-container" key={index}>
          <div
            className={
              "bg-[#122D3E] px-4 py-4 current-chat-head flex items-center rounded-md"
            }
          >
            <Badge dot color="green">
              <Avatar size={"large"} icon={<UserOutlined />} />
            </Badge>
            <Typography.Text className={"text-white pl-3"}>
              {insChat.head}
            </Typography.Text>
          </div>
          <div className="semantic-chat-content">
            <img
              style={{ width: "50px", marginLeft: "12px" }}
              src={icon}
              alt="logo"
            />

            {/* Use TypingEffect for the latest message */}
            {index === insChatArray.length - 1 && !done ? (
              <TypingEffect
                html={`<span style="font-size:14px">${insChat?.content}</span>`}
                speed={20}
                onTypingComplete={handleTypingComplete}
              />
            ) : (
              <Typography.Text>{insChat.content}</Typography.Text>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SemanticChat;
