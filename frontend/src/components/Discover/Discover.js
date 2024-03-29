import { Card, Menu, Dropdown } from "antd";
import React, { useState } from "react";
import { CompassOutlined } from "@ant-design/icons";
import salesforce from '../../assets/images/salesforceImg.png';
import snowflake from '../../assets/images/snowflake.png';
import './Discover.css'
import logoWOname from "../../assets/images/logoWOname.png";

function Discover({  }) {
  const [selectedTag, setSelectedTag] = useState("Select all");
  const categories1 = ["Select all", "Marketing", "Sales", "Privacy", "Report & Analytics", "DataOps", "Content", "Audience", "Leads", "Benchmarking", "Support", "Market Intelligence"];

  const prompts = [
    {
      text: "What are key attributes of different audience segments for true wireless earphones in North America?",
      tagging: ["Audience"]
    },
    {
      text: "Give me the total revenue generated by each SKU over last year?",
      tagging: ["Report & Analytics"]
    },
    {
      text: "Analyze deal cycle according to each SKU",
      tagging: ["Report & Analytics"]
    },
    {
      text: "Create a segment of existing customers and anonymize PII information",
      tagging: ["DataOps"]
    },
    {
      text: "Give me list of keywords for ad campaign targeted towards budget conscious consumers looking for TWS ",
      tagging: ["Audience", "Marketing"]
    },
    {
      text: "Based on industry trends, which channel is most effective for my next campaign for TWS, targeted towards fitness enthusiasts in North America?",
      tagging: ["Marketing", "Market Intelligence"]
    },
    {
      text: "Can you analyze my past campaigns and share the most efficient channel that resulted in maximum conversions?",
      tagging: ["Marketing", "Benchmarking"]
    },    {
      text: "Can you create a segment that are showing intent and fall in the age group of 25-30 and live in urban areas? Exclude existing customers.",
      tagging: ["Market Intelligence", "Marketing"]
    },    {
      text: "Create an ad copy that resonates with Budget-Conscious Consumers that includes 'Affordable TWS Earbuds' keyword.",
      tagging: ["Content"]
    },    {
      text: "Discover unique identities across ecosystem without any clear consent and privacy proof",
      tagging: ["DataOps", "Privacy"]
    },    {
      text: "How many key contacts have changed job in last quarter?",
      tagging: ["Sales", "Support"]
    },
  ]
  const agents = [
    [{
      text: "ICP & Persona",
      tagging: ["Marketing"],
      logos: "both"
    },
    {
      text: "Data Quality",
      tagging: ["DataOps"],
      logos: "both"
    }],
    [{
      text: "Campaing Analytics",
      tagging: ["Report & Analytics"],
      logos: "both"
    },
    {
      text: "Leads",
      tagging: ["Leads"],
      logos: "salesforce"
    }],
    [{
      text: "Market Intelligence",
      tagging: ["Market Intelligence"],
      logos: "snowflake"
    },
    {
      text: "Pricing Optimization",
      tagging: ["Market Intelligence"],
      logos: "snowflake"
    }],
    [{
      text: "Sales Enablement",
      tagging: ["Sales"],
      logos: "salesforce"
    },
    {
      text: "Privacy and compliance monitoring",
      tagging: ["Privacy"],
      logos: "both"
    }]

  ]

  const focusMenu = (
    <Menu>
      {categories1.map((category, index) => (
        <Menu.Item key={index} onClick={() => setSelectedTag(category)}>
          {category}
        </Menu.Item>
      ))}
    </Menu>
  );

  const filteredPrompts = prompts.filter(prompt =>
    selectedTag === "Select all" || prompt.tagging.includes(selectedTag)
  );

  const filteredAgents = agents.map(thread =>
    thread.filter(agent =>
      selectedTag === "Select all" || agent.tagging.includes(selectedTag)
    )
  );

  return (
    <div className={`discover-container justify-center`}>
      <div style={{ alignItems: "center", fontWeight: "" }} className="flex text-[30px] ml-8 gap-4"> <CompassOutlined className="text-[25px] mt-1" /> Discover</div>
      <hr className="m-4" />
      <span className="ml-8 mb-4 text-[15px]">Use pre trained templates of agents and popular prompts by use cases</span>
      <div className="ml-8 mb-8 mt-4 border-[2px] w-[20%]" style={{borderRadius: "10px"}}>
        <Dropdown overlay={focusMenu} placement="bottomLeft" trigger={['click']}>
          <div className={`flex justify-center items-center gap-1 cursor-pointer p-2 ${selectedTag !== "Select all" ? "selectedButton" : ""}`}>
            <div className="text-[1rem]">{selectedTag}</div>
          </div>
        </Dropdown>
      </div>
      <div className="flex justify-center mt-8">
        <div className="prompts w-[55%]">
          <div  className="headLib mb-4 text-[20px]">
            Prompts
          </div>
          <div className="cardsLib flex flex-col gap-2">
            {filteredPrompts.map((thread, index) => (
              <Card key={index} className="relative allCards">
                <div style={{fontWeight: 600, fontSize: "15px"}} className="txtPromptLib mb-6 w-[90%]">
                  {thread.text}
                </div>
                <div className="flex justify-end items-center gap-2 pr-2">
                  {thread.tagging.map((btn, indexBtn) => (
                    <div key={indexBtn} className="border bg-[#609DA1] text-white px-2 rounded-md">
                      {btn}
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
        <div className="task-agents ml-8 w-[45%]">
          <div className="headLib mb-4 text-[20px]">
            Agents
          </div>
          {filteredAgents.map((thread, index) => (
            <div key={index} className="flex justify-space-around gap-2">
              {thread.map((agent, indexT) => (
                <Card key={indexT} className={`allCards agentCard relative w-[50%] ${index != 0 ? "mt-4": "" }`}>
                  <div className="flex gap-2 mb-6" style={{alignItems: "center"}}>
                    <img
                      style={{ height: "2rem", margin: "auto" }}
                      src={logoWOname}
                      alt="logo"
                    />
                    <div style={{fontWeight: 600, fontSize: "15px"}} className="txtPromptLib w-[90%]">
                      {agent.text}
                    </div>
                  </div>
                  <div className="flex" style={{justifyContent: "space-between"}}>
                    <div className="flex gap-2">
                    {(agent.logos == "both" || agent.logos == "salesforce")  && (
                      <img
                        style={{ height: "1.5rem", margin: "auto" }}
                        src={salesforce}
                        alt="logo"
                      />
                    )}
                    {(agent.logos == "both" || agent.logos == "snowflake")  && (
                      <img
                        style={{ height: "1.5rem", margin: "auto" }}
                        src={snowflake}
                        alt="logo"
                      />
                    )}
                    </div>
                    <div className="flex justify-center items-center gap-2">
                      {agent.tagging.map((btn, indexBtn) => (
                        <div key={indexBtn} className="border bg-[#609DA1] text-white px-2 rounded-md">
                          {btn}
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Discover;



          {/* {prompts[selectedCategory].map((prompt, index) => (
            <Card className="mb-3 text-[15px]" key={index}>
              <div style={{fontWeight: "400"}} className="prompt">
                {prompt.text}
              </div>
              <div className="flex justify-start gap-4 text-[12px] mt-2">
                <div style={{alignItems: "center"}} className="views flex gap-1">
                    <EyeOutlined /> {prompt.views}
                </div>
                <div style={{alignItems: "center"}} className="shares flex gap-1">
                    <ShareAltOutlined /> {prompt.shares}
                </div>
                <div style={{alignItems: "center"}} className="time flex gap-1">
                    <FieldTimeOutlined /> {prompt.time}
                </div>
              </div>
            </Card>
          ))} */}

          // Segment: [
          //   {
          //     text: "Can you analyze my past campaigns and share the most efficient ad platform that resulted in maximum conversions?",
          //     views: "1.2k",
          //     shares: "350",
          //     time: "1d ago"
          //   },
          //   {
          //     text: "Can you create a segment that shows intent and falls in the age group of 25-30, living in urban areas? Exclude existing customers.",
          //     views: "2.4k",
          //     shares: "450",
          //     time: "2d ago"
          //   },
          //   {
          //     text: "Create an ad copy that resonates with budget-conscious consumers, including the 'Affordable TWS Earbuds' keyword.",
          //     views: "1.6k",
          //     shares: "300",
          //     time: "3d ago"
          //   },
          //   {
          //     text: "Based on my past campaigns for budget-conscious consumers, can you tell me which images were most impactful? Use this information to generate a new image.",
          //     views: "1.9k",
          //     shares: "400",
          //     time: "4d ago"
          //   },
          //   {
          //     text: "Send the attached ad copy and segment to the Google Ads platform.",
          //     views: "2.2k",
          //     shares: "500",
          //     time: "5d ago"
          //   },
          //   {
          //     text: "Create a list 'Q1_Budget_Conscious_visitors' of all identifiable visitors resulting from the ad campaign 'Q1_Budget_Conscious.'",
          //     views: "1.3k",
          //     shares: "200",
          //     time: "6d ago"
          //   }
          // ],
          // DataOps: [
          //   {
          //     text: "Can you help me create a data mart to power product analytics and fetch relevant information across the systems?",
          //     views: "2.8k",
          //     shares: "650",
          //     time: "3d ago"
          //   },
          //   {
          //     text: "Discover unique identities across the ecosystem without clear consent and privacy proof.",
          //     views: "1.7k",
          //     shares: "300",
          //     time: "4d ago"
          //   },
          //   {
          //     text: "Create a workflow to implement privacy and compliance checks across multiple touchpoints and databases.",
          //     views: "2.6k",
          //     shares: "550",
          //     time: "5d ago"
          //   },
          //   {
          //     text: "Can you create a segment of existing customers and anonymize PII information?",
          //     views: "1.4k",
          //     shares: "250",
          //     time: "6d ago"
          //   },
          //   {
          //     text: "From the list of IP addresses of our website visitors, can you enrich 'name,' 'age,' 'address,' and 'email' information?",
          //     views: "2.0k",
          //     shares: "400",
          //     time: "7d ago"
          //   },
          //   {
          //     text: "I have attached an event participant email list. Can you perform a reverse lookup in CRM and enrich 'name,' 'age,' and 'address'?",
          //     views: "1.1k",
          //     shares: "150",
          //     time: "8d ago"
          //   },
          // ],
          // Report: [
          //   {
          //     text: "Can you give me the total revenue generated by each SKU over the last year?",
          //     views: "2.5k",
          //     shares: "600",
          //     time: "4d ago"
          //   },
          //   {
          //     text: "Give me the total profit generated by each SKU after deducting all costs in the last year.",
          //     views: "1.9k",
          //     shares: "450",
          //     time: "5d ago"
          //   },
          //   {
          //     text: "Provide monthly sales trends in the last year for each SKU. Identify SKUs with any seasonal pattern and recommend the next best action for those SKUs.",
          //     views: "2.2k",
          //     shares: "500",
          //     time: "6d ago"
          //   },
          //   {
          //     text: "Can you augment historic data analysis with micro trends to forecast demand for each SKU in the next year?",
          //     views: "1.6k",
          //     shares: "350",
          //     time: "7d ago"
          //   },
          //   {
          //     text: "Based on our current attribution model, which channel was most impactful?",
          //     views: "2.8k",
          //     shares: "700",
          //     time: "8d ago"
          //   },
          //   {
          //     text: "Analyze the deal cycle according to each SKU.",
          //     views: "852",
          //     shares: "159",
          //     time: "2w ago"
          //   }
          // ]