import React, { useState, useEffect } from "react"
import { Input, Switch, message, Spin, Button, Menu, Dropdown } from "antd"
import {
  ForkOutlined,
  ApiOutlined,
  PaperClipOutlined,
  ArrowRightOutlined,
  DatabaseOutlined,
  BarChartOutlined,
  TeamOutlined,
  BuildOutlined,
  MenuOutlined,
} from "@ant-design/icons"
import { tenantAPI } from "../../services/tenantServices.js"
// import Loading from "../Loading/Loading.js";
import loadingGif from "../../assets/images/powerUserLoading.gif"
import "./TenantInitial.css"

const { TextArea } = Input

const TenantInitial = ({
  setInitialCalled,
  setQuestion,
  question,
  setAnswer,
  loading,
  setLoading,
  attachedFile,
  setAttachedFile,
  sessionStatus,
}) => {
  const [isProcessing, setIsProcessing] = useState(false)
  const [rows, setRows] = useState(1)
  const [divFocused, setDivFocused] = useState(true)
  const [inputFilled, setInputFilled] = useState(false)
  const [isPromptClicked, setIsPromptClicked] = useState(false)
  const [selectedButton, setSelectedButton] = useState("Public")

  const handlePromptClick = (prompt) => {
    setQuestion(prompt)
    setInputFilled(true)
    setIsPromptClicked(true)
  }

  const handleInputChange = (e) => {
    const value = e.target.value
    if (!value) {
      setInputFilled(false)
    } else {
      setInputFilled(true)
    }
    const lines = value.split("\n").length
    const newRows = Math.min(lines, 5)
    setRows(newRows || 1)
    setQuestion(value)
  }

  const handleTextAreaFocus = () => {
    setDivFocused(true)
  }

  const handleTextAreaBlur = () => {
    setDivFocused(false)
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setIsProcessing(true)
      setInputFilled(true)
      setTimeout(() => {
        setIsProcessing(false)
        setAttachedFile(file)
      }, 2000)
    }
  }

  const handleSend = async () => {
    if (inputFilled) {
      // let cleanFile = question.toLowerCase().trim().includes("attached file")

      if (attachedFile) {
        setQuestion("You've uploaded " + attachedFile.name)
        setLoading(true)
        setTimeout(() => {
          // setAnswer("I am analysing the file you have uploaded:\n1. File has 5 columns\n2. company_name column represent name of companies and has no missing values\n3. email column represents emails of individual, it is a PII filed and has 20% missing values\n4. website column represents URL's with 10% missing values\n5. contact_name represents name of individuals with no missing values\n6. company_country represents country with no missing values.\n7. There are 12% duplicate rows in the file");
          setInitialCalled(false)
          // TODO
          // Should we also set sessionStatus = true
          // Meaning that we will be allowing follow up questions to the file uploaded
        }, 3000)
      } else {
        setLoading(true)
        const payload = {
          question: question + ", with sources",
          session: sessionStatus,
          // attachedFile: attachedFile
        }
        let response = await tenantAPI(payload)
        if (response?.status === 200) {
          console.log(response)
          setAnswer({
            responseData: response?.data?.responseData || "",
            sources: response?.data?.sources || [],
          })
        } else {
          setAnswer({ responseData: "Cannot Process That", sources: [] })
        }
        setInitialCalled(false)
      }
    }
    setIsPromptClicked(false)
  }
  useEffect(() => {
    if (attachedFile?.name) {
      handleSend()
    }
  }, [attachedFile])
  useEffect(() => {
    if (isPromptClicked === true) {
      handleSend()
    }
  }, [isPromptClicked])
  const focusMenu = (
    <Menu>
      <Menu.Item disabled key="3" onClick={() => setSelectedButton("Hybrid")}>
        <div
          disabled
          className={`flex justify-center items-center gap-1 p-2 ${
            selectedButton === "Hybrid" ? "selectedButton" : ""
          }`}
          //   onClick={() => setSelectedButton("Hybrid")}
        >
          <ApiOutlined style={{ fontSize: "18px" }} />
          <div className="text-[1rem]">Hybrid</div>
        </div>
      </Menu.Item>
      <Menu.Item key="1" onClick={() => setSelectedButton("Public")}>
        <div
          className={`flex justify-center items-center gap-1 cursor-pointer p-2 ${
            selectedButton === "Public" ? "selectedButton" : ""
          }`}
          onClick={() => setSelectedButton("Public")}
        >
          <ForkOutlined style={{ fontSize: "16px" }} />
          <div className="text-[1rem]">Public</div>
        </div>
      </Menu.Item>
      <Menu.Item disabled key="2" onClick={() => setSelectedButton("Internal")}>
        <div
          disabled
          className={`flex justify-center items-center gap-1 p-2 ${
            selectedButton === "Internal" ? "selectedButton" : ""
          }`}
          //   onClick={() => setSelectedButton("Internal")}
        >
          <DatabaseOutlined style={{ fontSize: "16px" }} />
          <div className="text-[1rem]">Internal</div>
        </div>
      </Menu.Item>
    </Menu>
  )
  if (loading) {
    return (
      <div
        className="h-full flex justify-center"
        style={{ alignItems: "center" }}
      >
        <img src={loadingGif} alt="loadingGif" className="h-[150px]" />
        {/* <Loading /> */}
      </div>
    )
  }

  return (
    <div className="flex justify-center mt-[100px]">
      <div className="w-[650px] flex flex-col justify-center items-center h-full">
        <div
          className="w-[50%] text-[200%] justify-center text-center items-center mb-2 font-bold"
          style={{ position: "relative" }}
        >
          How can I help you?
        </div>
        <TextArea
          autoSize={{ minRows: 1, maxRows: 5 }}
          rows={rows}
          value={question}
          onChange={handleInputChange}
          onFocus={handleTextAreaFocus}
          onBlur={handleTextAreaBlur}
          placeholder="Ask anything..."
          className={`audResearchTextArea text-xl py-4`}
          autoFocus
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault()
              handleSend()
            }
          }}
        />
        <div
          className={`w-full flex justify-between items-center p-4 pb-3 audResearchTextBottom ${
            divFocused && "divFocused"
          }`}
        >
          <div className="flex justify-center items-center gap-3">
            <Dropdown
              overlay={focusMenu}
              placement="bottomLeft"
              trigger={["click"]}
            >
              <div
                className={`flex justify-center items-center gap-1 cursor-pointer p-2 ${
                  selectedButton !== "Attach" &&
                  selectedButton !== "Focus" &&
                  selectedButton !== "Hybrid"
                    ? "selectedButton"
                    : ""
                }`}
              >
                {selectedButton === "Public" ? (
                  <ForkOutlined style={{ fontSize: "18px" }} />
                ) : selectedButton === "Internal" ? (
                  <DatabaseOutlined style={{ fontSize: "18px" }} />
                ) : selectedButton === "Hybrid" ? (
                  <ApiOutlined style={{ fontSize: "18px" }} />
                ) : (
                  <MenuOutlined style={{ fontSize: "14px" }} />
                )}
                <div className="text-[1rem]">
                  {selectedButton == "Attach" || selectedButton == "Hybrid"
                    ? "Focus"
                    : selectedButton}
                </div>
              </div>
            </Dropdown>
            <div
              className={`flex justify-center items-center gap-1 p-2 ${
                selectedButton === "Attach" ? "selectedButton" : ""
              }`}
              onClick={() => setSelectedButton("Attach")}
            >
              <label
                htmlFor="file-input"
                className="cursor-pointer flex"
                style={{ alignItems: "center" }}
              >
                {isProcessing ? (
                  <div className="flex gap-2" style={{ alignItems: "center" }}>
                    <Spin />
                    <div className="ml-1 text-[1rem]">Processing...</div>
                  </div>
                ) : (
                  <>
                    <PaperClipOutlined style={{ fontSize: "18px" }} />
                    <div className="text-[1rem]">Attach</div>
                  </>
                )}
              </label>
              <input
                id="file-input"
                type="file"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </div>
          </div>
          <div className="flex justify-center items-center gap-5">
            <div className="flex justify-center items-center gap-1">
              <Switch className="bg-[#243858]" disabled />
              <div className="text-[1rem]">Copilot</div>
            </div>
            <div
              className={`flex justify-center items-center gap-2 border-2 rounded-2xl p-2 ${
                inputFilled
                  ? "bg-[#609DA1] cursor-pointer"
                  : "cursor-not-allowed"
              }`}
              onClick={handleSend}
            >
              <ArrowRightOutlined
                style={{ color: inputFilled ? "white" : "black" }}
              />
            </div>
          </div>
        </div>
        {attachedFile && (
          <div className="mt-2 text-gray">
            Attached File: {attachedFile.name}
          </div>
        )}
        <div>
          {/* <div className="flex flex-wrap justify-center mt-4"> */}
          <div className="prompt-container item-center">
            <div
              className="text-left flex py-2 px-4 gap-2 text-gray mt-2"
              style={{ alignItems: "center" }}
            >
              <Button
                onClick={() =>
                  handlePromptClick(
                    "What financial challenges and risks should we be aware of when investing in the EV industry? This might include supply chain issues, raw material costs, or competitive pressures."
                  )
                }
                className={`flex ${
                  selectedButton === "Search" ? "selectedButton" : ""
                }`}
                style={{
                  borderRadius: "6px",
                  padding: "0px 20px",
                  alignItems: "center",
                }}
              >
                {" "}
                <TeamOutlined
                  style={{ fontSize: "15px", marginRight: "-8px" }}
                />{" "}
                Search: Find emerging trends, audience, research, curated
                premium information
              </Button>
              <Button
                disabled
                onClick={() =>
                  handlePromptClick(
                    "Reports & Analytics: Create reports, forecasting, campaign analytics"
                  )
                }
                className={`flex ${
                  selectedButton === "Report" ? "selectedButton" : ""
                }`}
                style={{
                  borderRadius: "6px",
                  padding: "0px 20px",
                  alignItems: "center",
                }}
              >
                {" "}
                <BarChartOutlined
                  style={{ fontSize: "15px", marginRight: "-8px" }}
                />{" "}
                Reports & Analytics: Create reports, forecasting, campaign
                analytics{" "}
              </Button>
            </div>
            <div
              className="text-left flex py-2 px-4 gap-2 text-gray mb-2"
              style={{ alignItems: "center" }}
            >
              <Button
                disabled
                onClick={() =>
                  handlePromptClick(
                    "Identify niche markets for high-end sports cars focusing on income levels and hobbies"
                  )
                }
                className={`flex ${
                  selectedButton === "Segment" ? "selectedButton" : ""
                }`}
                style={{
                  borderRadius: "6px",
                  padding: "0px 20px",
                  alignItems: "center",
                }}
              >
                {" "}
                <BuildOutlined
                  style={{ fontSize: "15px", marginRight: "-8px" }}
                />{" "}
                Segment: Build campaign list, audience, filter identities,
                activate list
              </Button>
              <Button
                disabled
                onClick={() =>
                  handlePromptClick(
                    "What are the best practices for ensuring high data quality in real-time vehicle data streams?"
                  )
                }
                className={`flex ${
                  selectedButton === "DataOps" ? "selectedButton" : ""
                }`}
                style={{
                  borderRadius: "6px",
                  padding: "0px 20px",
                  alignItems: "center",
                }}
              >
                {" "}
                <DatabaseOutlined
                  style={{ fontSize: "15px", marginRight: "-8px" }}
                />{" "}
                Data Ops: Build a data product, clean, enrich, dedupe list,
                encrypt PII info
              </Button>
            </div>
          </div>
          {/* </div> */}
        </div>
      </div>
    </div>
  )
}

export default TenantInitial
