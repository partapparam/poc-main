import React, { useEffect } from "react";
import "./Insurance.css";

import { insightsPrompts, insurancePrompts } from "../../utils/InsuranceUtil.js";
import FirmographicRes from "../InsuranceResponses/FirmographicRes";
import RProfile from "../InsuranceResponses/RProfile";
import SignalRes from "../InsuranceResponses/SignalRes";
import Insights from "../InsuranceResponses/Insights";
import { UserOutlined, CopyTwoTone, LikeTwoTone, DislikeTwoTone, DownloadOutlined } from "@ant-design/icons";
import { Badge, Avatar, Typography, message } from "antd";
import icon from "../../assets/images/logoRemovedBG.png";

const InsuranceChat = ({
  chat,
  insChatArray,
  setInsChatArray,
  accountData,
  setAccountData,
  loading,
  setLoading,
}) => {
  const findAverage = (obj) => {
    let sum = 0;
    let count = 0;

    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = parseFloat(obj[key]);

        if (!isNaN(value)) {
          sum += value;
          count++;
        }
      }
    }

    return count === 0 ? 0 : sum / count;
  };

  useEffect(() => {
    const lines = chat.split("\n");

    if (lines.length >= 2) {
      const head = lines[0].trim(); //editableprompt/question
      const content = lines[1].trim(); //promptresp/answer
      let matchedContent;
      let actualObj = {};

      if (head?.includes("firmographic")) {
        // console.log("IChatFirmographic")
        if (accountData) {
          // console.log(accountData);
          if (
            accountData?.message ===
            "No records match this combination in iGraph"
          ) {
            message.error(accountData?.message || "No records found");
            setAccountData(null);
            return;
          }
          const keysToInclude = [
            "account_name",
            "account_url",
            "account_addressstreet",
            "account_addresscity",
            "account_addressstate",
            "account_country",
            "account_addresszip",
            "account_industry",
            "account_subindustry",
            "account_gicscode",
            "account_employees",
            "account_phone",
            "account_revenue",
            "sic_code",
            "naics_code",
            "technographic",
            "account_desc",
            "companytag",
          ];

          actualObj = {};
          keysToInclude.forEach((key) => {
            actualObj[key] = accountData[0][key];
          });
          // console.log(actualObj);
          if (!loading) {
            matchedContent = insurancePrompts.find(
              (ins) => ins.insQuestion === "Get me firmographic info of "
            );
          }
        }
      } else if (head?.includes("signals")) {
        // console.log(accountData);
        if (accountData) {
          // console.log(accountData);
          if (
            accountData?.message ===
            "No records match this combination in iGraph"
          ) {
            message.error(accountData?.message || "No records found");
            setAccountData(null);
            return;
          }
          const keysToInclude = [
            "account_name",
            "macrosignals_economicindicators",
            "macrosignals_industrynews",
            "macrosignals_regulatorychanges",
            "macrosignals_consumertrend",
            "microsignals_webtraffictrend",
            "microsignals_headcnttrend",
            "microsignals_recruitingvel",
            "microsignals_expansionnews",
            "microsignals_legalnews",
            "microsignals_mnanews",
            "microsignals_pressrelease",
          ];

          actualObj = {};
          keysToInclude.forEach((key) => {
            actualObj[key] = accountData[0][key];
          });
          // console.log(actualObj);
          if (!loading) {
            matchedContent = insurancePrompts.find(
              (ins) => ins.insQuestion === "Get me signals of "
            );
          }
        }
      } else if (head?.includes("risk profile")) {
        // console.log(accountData)
        if (accountData) {
          // console.log(accountData);
          if (
            accountData?.message ===
            "No records match this combination in iGraph"
          ) {
            message.error(accountData?.message || "No records found");
            setAccountData(null);
            return;
          }
          const keysToInclude = [
            "account_name",
            "account_desc",
            "sic_code",
            "naics_code",
            "general_liability_ins",
            "professional_liability_ins",
            "property_ins",
            "workers_compensation_ins",
            "product_liability_ins",
            "cyber_liability_ins",
            "commercial_auto_ins",
            "business_interruption_ins",
            "directors&officers_liability_ins",
            "employment_practices_liability_ins",
          ];

          actualObj = {};
          keysToInclude.forEach((key) => {
            actualObj[key] = accountData[0][key];
          });
          const {
            account_name,
            account_desc,
            naics_code,
            sic_code,
            ...actualDataObj
          } = actualObj;
          const average = findAverage(actualDataObj);
          // console.log(average);
          actualObj["risk_score"] = average;
          // console.log(actualObj);
          if (!loading) {
            matchedContent = insurancePrompts.find(
              (ins) => ins.insQuestion === "Get me risk profile of "
            );
          }
        }
      } else{
        matchedContent = insightsPrompts.find(
          (ins) => ins.insQuestion === head
        );
      } 

      let infoPlaceholder;
      // console.log(matchedContent, "matchedContent");
      if (matchedContent) {
        // console.log(matchedContent, actualObj);
        if (matchedContent?.promptText === "Signals") {
          infoPlaceholder = (
            <SignalRes
              accountData={actualObj}
              setLoading={setLoading}
              setAccountData={setAccountData}
            />
          );
        } else if (
          matchedContent?.promptText === "Firmographic" &&
          matchedContent?.promptText?.length > 5
        ) {
          infoPlaceholder = (
            <FirmographicRes
              accountData={actualObj}
              setLoading={setLoading}
              setAccountData={setAccountData}
            />
          );
        } else if (matchedContent?.promptText === "Risk Scoring") {
          infoPlaceholder = (
            <RProfile
              accountData={actualObj}
              setLoading={setLoading}
              setAccountData={setAccountData}
            />
          );
        } else if (matchedContent?.promptText === "Create claim Analysis Report for last quarter"){
          infoPlaceholder = (
            <Insights
              prompt={"prompt1"}
              setLoading={setLoading}

            />
          );
        } else if (matchedContent?.promptText === "Create Customer Segmentation Reports"){
          infoPlaceholder = (
            <Insights
              prompt={"prompt2"}
              setLoading={setLoading}

            />
          );
        } else if (matchedContent?.promptText === "Create Fraud Analysis Reports"){
          infoPlaceholder = (
            <Insights
              prompt={"prompt3"}
              setLoading={setLoading}

            />
          );
        }
        matchedContent = {};
        // console.log(infoPlaceholder, "infoPlaceholder");
      } else {
        infoPlaceholder = "";
      }

      const chatObject = { head, content, infoPlaceholder };

      if (infoPlaceholder !== "") {
        // console.log(chatObject);
        setInsChatArray((prevInsChats) => [...prevInsChats, chatObject]);
      }
    }
  }, [chat, accountData]);

  return (
    <div>
      {insChatArray.map((insChat, index) => (
        <div className="insurance-chat-container" key={index}>
          <div
          style={{marginTop: "30px"}}
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
          <div className="insurance-chat-content">
            <img
              style={{ width: "50px", marginLeft: "12px" }}
              src={icon}
              alt="logo"
            />

            <Typography.Text>{insChat.content}</Typography.Text>
          </div>
          <div className="insurance-chat-image">{insChat.infoPlaceholder}</div>
          {!loading && (
          <div style={{paddingLeft: "5rem", display: "flex", gap: "8px"}}>
            <CopyTwoTone twoToneColor="grey" />
            <LikeTwoTone twoToneColor="grey"/>
            <DislikeTwoTone twoToneColor="grey" />
            <DownloadOutlined style={{  color: 'grey', fill: 'white' }} />
          </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default InsuranceChat;
