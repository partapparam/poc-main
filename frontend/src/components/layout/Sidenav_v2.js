/* eslint-disable no-undef */
import { useEffect, useState } from "react"
import { Select, Avatar, Typography } from "antd"
import {
  RightCircleFilled,
  LeftCircleFilled,
  PlusCircleOutlined,
  CompassOutlined,
  BlockOutlined,
  TeamOutlined,
  SettingOutlined,
  LoginOutlined,
  LogoutOutlined,
  DatabaseOutlined,
  ControlOutlined,
} from "@ant-design/icons"
import { useLocation, Link, useNavigate } from "react-router-dom"
import logoWOname from "../../assets/images/logoWOname.png"
import gtmcopilotLogo from "../../assets/images/v2Logo.png"
import avatar8 from "./../../assets/images/user.png"
import { GetUserSetting } from "../../services/Settings"
import UserDetails from "../../helpers/UserDetails"

const { Option } = Select

function Sidenav_v2({ darkMode, isPremium }) {
  const [name, setName] = useState("")
  const [module, setModule] = useState(null)
  const [selectedWorkspace, setSelectedWorkspace] = useState("Consumer")
  const user = UserDetails()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const page = pathname?.replace("/", "")
  console.log("page " + page)
  const { Title } = Typography
  const [collapsed, setCollapsed] = useState(true)
  // const history = useHistory();
  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }
  const handleWorkspaceChange = (value) => {
    setSelectedWorkspace(value)
  }

  const handleNewChatClick = () => {
    if (
      pathname == "/demo" ||
      pathname == "/finance" ||
      pathname == "/tenant"
    ) {
      const event = new Event("newChatClicked")
      document.dispatchEvent(event)
    } else {
      //
      // module == "demo" ? navigate("/demo") : navigate("/finance")
      //
      module === "demo"
        ? navigate("/demo")
        : module === "finance"
        ? navigate("/finance")
        : navigate("/tenant")
    }
  }

  const [selectedKeys, setSelectedKeys] = useState([page])

  useEffect(() => {
    setSelectedKeys([page])
  }, [page])
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        (event.ctrlKey && event.key === "k") || // For Windows
        (event.metaKey && event.key === "k") // For Mac
      ) {
        event.preventDefault()
        if (pathname !== "/demo" && pathname.includes("demo")) {
          navigate("/demo")
        }
        if (pathname !== "/finance" && pathname.includes("finance")) {
          navigate("/finance")
        }
        if (pathname !== "/tenant" && pathname.includes("tenant")) {
          navigate("/tenant")
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])
  useEffect(() => {
    if (pathname.includes("/demo")) {
      setModule("demo")
    } else if (pathname.includes("/finance")) {
      setModule("finance")
    } else if (pathname.includes("/tenant")) {
      setModule("tenant")
    } else {
      setModule("admin")
    }
  }, [pathname])
  useEffect(() => {
    ;(async () => {
      /** TODO */
      // let response = await GetUserSetting({
      //   userID: user?.id,
      // })
      let response = {}
      response.data = {
        status: "success",
        data: [
          {
            email: "nachiket@icustomer.ai",
            organization_name: "icustomer ai",
            organization_country: null,
            organization_domain: "icustomer.ai",
            name: "nachiket",
            role: null,
            plan: "free",
            google_id: "113652146766808456062",
            usertype: "freemium",
          },
        ],
      }
      /**
       * TODO Replace response from API
       * #######
       * ######
       */
      if (response) {
        const nameFromResponse = Array.isArray(response.data.data)
          ? response.data.data[0].name
          : response.data.data.name
        if (nameFromResponse.includes("|")) {
          const [firstName, lastName] = nameFromResponse
            .split("|")
            .map((part) => part.trim())
          const updatedName = `${firstName}`
          setName(updatedName)
        } else {
          setName(nameFromResponse)
        }
      }
    })()
  }, [user?.id])
  return (
    <>
      {collapsed ? (
        <div className="flex ml-1 flex-col justify-between h-full border-r border-solid border-slate-300 pl-2">
          <div>
            <div className="brand cursor-pointer">
              <Link to={"/demo"}>
                <img
                  style={{ height: "45px", margin: "auto" }}
                  src={logoWOname}
                  alt="logo"
                />
              </Link>
            </div>
            <hr />
            {/* 
            show if module = tenant
          
            */}
            {module === "demo" ||
            module === "finance" ||
            module === "tenant" ? (
              <>
                {/* Add literal strings to check for module === tenant
                  if so, make div invisible to remove dropdown */}
                <div
                  className={`flex justify-start ${
                    module === "tenant" ? "invisible" : ""
                  }`}
                >
                  <div
                    className="hover:bg-gray-200 transition duration-300 ease-in-out w-full px-4 py-2 mb-2 hover:shadow-2xl hover:scale-105 duration-300 cursor-pointer"
                    style={{
                      borderRadius: "5px",
                      display: "flex",
                      justifyContent: "center",
                      fontSize: "20px",
                    }}
                    // onClick={handleNewChat}
                  >
                    <TeamOutlined />
                  </div>
                </div>
                <div
                  className="flex mb-1 justify-center"
                  onClick={handleNewChatClick}
                >
                  <div
                    className="border px-4 py-2 rounded bg-[whitesmoke] text-black hover:shadow-2xl hover:scale-105 duration-300 cursor-pointer"
                    style={{
                      borderRadius: "30px",
                      width: "50%",
                      display: "flex",
                      justifyContent: "space-around",
                      fontSize: "20px",
                    }}
                    // onClick={handleNewChat}
                  >
                    <PlusCircleOutlined />
                  </div>
                </div>
                <div className="flex justify-start">
                  <div
                    className="hover:bg-gray-200 transition duration-300 ease-in-out w-full px-4 py-2 mb-0.5 hover:shadow-2xl hover:scale-105 duration-300 cursor-pointer"
                    style={{
                      borderRadius: "5px",
                      display: "flex",
                      justifyContent: "center",
                      fontSize: "20px",
                    }}
                    // add addtional conditional statement for module tenant
                    onClick={
                      module === "demo"
                        ? () => navigate("/demo/discover")
                        : module === "finance"
                        ? console.log("finance navigate")
                        : console.log("tenant navigate")
                    }
                  >
                    <CompassOutlined />
                  </div>
                </div>
                <div className="flex justify-start">
                  <div
                    className="hover:bg-gray-200 transition duration-300 ease-in-out w-full px-4 py-2 mb-0.5 hover:shadow-2xl hover:scale-105 duration-300 cursor-pointer"
                    style={{
                      borderRadius: "5px",
                      display: "flex",
                      justifyContent: "center",
                      fontSize: "20px",
                    }}
                    onClick={
                      module === "demo"
                        ? () => navigate("/demo/library")
                        : module === "finance"
                        ? console.log("finance navigate")
                        : console.log("tenant navigate")
                    }
                  >
                    <BlockOutlined />
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* <div className="flex my-4 justify-start">
                  <div
                      className="hover:bg-gray-200 transition duration-300 ease-in-out w-full px-4 py-2 mb-0.5 hover:shadow-2xl hover:scale-105 duration-300 cursor-pointer"
                      style={{borderRadius: "5px", display: "flex", justifyContent: "center", fontSize: "20px"}}
                      onClick={() => navigate("/admin-input")}
                  >
                      <LoginOutlined />
                  </div>
              </div>
              <div className="flex my-4 justify-start">
                  <div
                      className="hover:bg-gray-200 transition duration-300 ease-in-out w-full px-4 py-2 mb-0.5 hover:shadow-2xl hover:scale-105 duration-300 cursor-pointer"
                      style={{borderRadius: "5px", display: "flex", justifyContent: "center", fontSize: "20px"}}
                      onClick={() => navigate("/admin-output")}
                  >
                      <LogoutOutlined />
                  </div>
              </div>
              <div className="flex my-4 justify-start">
                  <div
                      className="hover:bg-gray-200 transition duration-300 ease-in-out w-full px-4 py-2 mb-0.5 hover:shadow-2xl hover:scale-105 duration-300 cursor-pointer"
                      style={{borderRadius: "5px", display: "flex", justifyContent: "center", fontSize: "20px"}}
                      onClick={() => navigate("/demo/library")}
                  >
                      <DatabaseOutlined />
                  </div>
              </div>
              <div className="flex my-4 justify-start">
                  <div
                      className="hover:bg-gray-200 transition duration-300 ease-in-out w-full px-4 py-2 mb-0.5 hover:shadow-2xl hover:scale-105 duration-300 cursor-pointer"
                      style={{borderRadius: "5px", display: "flex", justifyContent: "center", fontSize: "20px"}}
                      onClick={() => navigate("/demo/library")}
                  >
                      <ControlOutlined />
                  </div>
              </div> */}
              </>
            )}
          </div>
          <div className="text-center">
            {collapsed === true ? (
              <>
                {pathname !== "/ssot" && (
                  <RightCircleFilled
                    style={{ fontSize: "25px" }}
                    onClick={toggleCollapsed}
                  />
                )}
                <hr />
                <div
                  className="justify-center"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    marginBottom: "10px",
                  }}
                >
                  <Avatar
                    src={
                      localStorage.getItem("profile_url")
                        ? localStorage.getItem("profile_url").toString()
                        : avatar8
                    }
                  ></Avatar>
                </div>
              </>
            ) : null}
          </div>
        </div>
      ) : (
        // The expanded version starts
        <div
          className="flex flex-col ml-1 justify-between h-full border-r border-solid border-slate-300 pl-2 pr-2"
          style={{ maxWidth: "80%" }}
        >
          <div>
            <div className="brand flex cursor-pointer">
              <Link to={"/demo"}>
                <img
                  style={{ height: "45px", margin: "auto" }}
                  src={gtmcopilotLogo}
                  alt="logo"
                />
              </Link>
              {page !== "admin/dashboard" && (
                <>
                  <div className="text-end">
                    {collapsed === false ? (
                      <LeftCircleFilled
                        className="mt-2 text-xl"
                        onClick={toggleCollapsed}
                      />
                    ) : null}
                  </div>
                </>
              )}
            </div>
            <hr />
            {module === "demo" ||
            module === "finance" ||
            module === "tenant" ? (
              <>
                <div className="flex justify-start">
                  {/* Convert below div to user template literals
                      add clause to check for module
                      if module === tenant, hide dropdown
                      */}
                  <div
                    className={`px-4 py-2 text-grey cursor-pointer w-full hover:bg-gray-200 transition duration-300 ease-in-out mb-2 ${
                      module === "tenant" ? "invisible" : ""
                    }`}
                    style={{
                      borderRadius: "5px",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      fontWeight: "600",
                    }}
                    // onClick={handleNewChat}
                  >
                    <TeamOutlined
                      className="pt-0.5"
                      style={{ fontSize: "15px" }}
                    />
                    <Select
                      defaultValue="GTMC Demo"
                      value={selectedWorkspace}
                      onChange={handleWorkspaceChange}
                      style={{
                        width: 200,
                        fontWeight: 500,
                        border: "0px",
                        borderBottom: "1px solid #d9d9d9",
                        borderRadius: 0,
                      }}
                      dropdownStyle={{
                        border: "none",
                        borderBottom: "1px solid #d9d9d9",
                        borderRadius: 0,
                      }}
                    >
                      <Option value="Consumer">Consumer</Option>
                      <Option value="Business">Business</Option>
                      {/* <Option value="GTMC Demo">GTMC Demo</Option>
                        <Option value="GTMC Admin">GTMC Admin</Option>
                        <Option value="GTMC Poweruser">GTMC Poweruser</Option> */}
                    </Select>
                  </div>
                </div>
                <div
                  className="flex mb-1 justify-start"
                  onClick={handleNewChatClick}
                >
                  <div
                    className="border px-4 py-2 rounded bg-[whitesmoke] text-black cursor-pointer"
                    style={{
                      borderRadius: "30px",
                      width: "85%",
                      display: "flex",
                      justifyContent: "space-around",
                      fontWeight: "500",
                    }}
                    // onClick={handleNewChat}
                  >
                    <span className="new-chat-label">New Chat</span>

                    {navigator.platform.includes("Win") ||
                    navigator.platform.includes("Linux") ? (
                      <span style={{ fontSize: "small", opacity: "0.6" }}>
                        Ctrl+K
                      </span>
                    ) : (
                      <span style={{ fontSize: "small", opacity: "0.6" }}>
                        &#8984;+K
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex justify-start ">
                  <div
                    className="px-4 py-2 text-grey cursor-pointer w-full hover:bg-gray-200 transition duration-300 ease-in-out"
                    style={{
                      borderRadius: "5px",
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      fontWeight: "600",
                    }}
                    onClick={
                      module === "demo"
                        ? () => navigate("/demo/discover")
                        : module === "finance"
                        ? console.log("finance navigate")
                        : console.log("Tenant navigate")
                    }
                    // onClick={handleNewChat}
                  >
                    <CompassOutlined
                      className="pt-0.5"
                      style={{ fontSize: "15px" }}
                    />
                    <span
                      className="new-chat-label"
                      style={{ fontSize: "17px" }}
                    >
                      Discover
                    </span>
                  </div>
                </div>
                <div className="flex justify-start ">
                  <div
                    className="px-4 py-2 mb-2 text-grey cursor-pointer w-full hover:bg-gray-200 transition duration-300 ease-in-out"
                    style={{
                      borderRadius: "5px",
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      fontWeight: "600",
                    }}
                    onClick={
                      module === "demo"
                        ? () => navigate("/demo/library")
                        : module === "finance"
                        ? console.log("finance navigate")
                        : console.log("Tenant navigate")
                    }
                    // onClick={handleNewChat}
                  >
                    <BlockOutlined
                      className="pt-0.5"
                      style={{ fontSize: "15px" }}
                    />
                    <span
                      className="new-chat-label"
                      style={{ fontSize: "17px" }}
                    >
                      Library
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* <div className="flex my-4 justify-start ">
                    <div
                        className="px-4 py-2 text-grey cursor-pointer w-full hover:bg-gray-200 transition duration-300 ease-in-out"
                        style={{borderRadius: "5px", display: "flex",alignItems: "center", gap: 4 , fontWeight: "600"}}
                        onClick={() => navigate("/admin-input")}
                    // onClick={handleNewChat}
                    >
                    <LoginOutlined className="pt-0.5" style={{fontSize: "15px"}} />  
                    <span className="new-chat-label" style={{fontSize: "17px"}}>Input</span>
                    </div>
                </div>
                <div className="flex my-4 justify-start ">
                    <div
                        className="px-4 py-2 text-grey cursor-pointer w-full hover:bg-gray-200 transition duration-300 ease-in-out"
                        style={{borderRadius: "5px", display: "flex",alignItems: "center", gap: 4 , fontWeight: "600"}}
                        onClick={() => navigate("/admin-output")}
                    // onClick={handleNewChat}
                    >
                    <LogoutOutlined className="pt-0.5" style={{fontSize: "15px"}} />  
                    <span className="new-chat-label" style={{fontSize: "17px"}}>Output</span>
                    </div>
                </div>
                
                <div className="flex my-4 justify-start ">
                    <div
                        className="px-4 py-2 text-grey cursor-pointer w-full hover:bg-gray-200 transition duration-300 ease-in-out"
                        style={{borderRadius: "5px", display: "flex",alignItems: "center", gap: 4 , fontWeight: "600"}}
                        onClick={() => navigate("/demo/discover")}
                    // onClick={handleNewChat}
                    >
                    <DatabaseOutlined className="pt-0.5" style={{fontSize: "15px"}} />  
                    <span className="new-chat-label" style={{fontSize: "17px"}}>DB Tools</span>
                    </div>
                </div>
                <div className="flex my-4 justify-start ">
                    <div
                        className="px-4 py-2 mb-2 text-grey cursor-pointer w-full hover:bg-gray-200 transition duration-300 ease-in-out"
                        style={{borderRadius: "5px", display: "flex",alignItems: "center", gap: 4 , fontWeight: "600"}}
                        onClick={() => navigate("/demo/library")}
                    // onClick={handleNewChat}
                    >
                    <ControlOutlined className="pt-0.5" style={{fontSize: "15px"}} />  
                    <span className="new-chat-label" style={{fontSize: "17px"}}>LLM</span>
                    </div>
                </div> */}
              </>
            )}
          </div>
          <div className="text-center">
            <>
              <hr />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  borderRadius: "5px",
                }}
                className="px-4 py-2 mb-1 w-full hover:bg-gray-200 transition duration-300 ease-in-out"
              >
                <Avatar
                  src={
                    localStorage.getItem("profile_url")
                      ? localStorage.getItem("profile_url").toString()
                      : avatar8
                  }
                  style={{ marginRight: "10px" }}
                ></Avatar>
                <Title
                  className={`${darkMode ? "dark" : ""}`}
                  level={5}
                  style={{
                    marginBottom: "0",
                    marginRight: "15px",
                    color: "gray",
                  }}
                >
                  {name}
                </Title>
                <SettingOutlined
                  className="pt-0.5"
                  style={{ fontSize: "20px" }}
                />
              </div>
            </>
          </div>
        </div>
      )}
    </>
  )
}

export default Sidenav_v2
