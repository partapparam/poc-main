import React, { useState, useEffect } from "react"

import TenantInitial from "./TenantInitial"
import TenantLater from "./TenantLater"

// import "./Home_v2.css";

const Tenant = ({}) => {
  const [initialCalled, setInitialCalled] = useState(true)
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState({ responseData: "", sources: "" })
  const [loading, setLoading] = useState(false)
  const [attachedFile, setAttachedFile] = useState(null)
  const [sessionStatus, setSessionStatus] = useState("False")

  useEffect(() => {
    const handleNewChatEvent = () => {
      console.log("new chat started")
      setInitialCalled(true)
      setQuestion("")
      setAnswer({ responseData: "", sources: "" })
      setAttachedFile(null)
      setLoading(false)
      setSessionStatus("False")
    }

    document.addEventListener("newChatClicked", handleNewChatEvent)

    return () => {
      document.removeEventListener("newChatClicked", handleNewChatEvent)
    }
  }, [])
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        (event.ctrlKey && event.key === "k") || // For Windows
        (event.metaKey && event.key === "k") // For Mac
      ) {
        event.preventDefault()
        setInitialCalled(true)
        setQuestion("")
        setAnswer({ responseData: "", sources: "" })
        setAttachedFile(null)
        setLoading(false)
        setSessionStatus("False")
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])
  if (initialCalled) {
    return (
      <TenantInitial
        setInitialCalled={setInitialCalled}
        setQuestion={setQuestion}
        question={question}
        setAnswer={setAnswer}
        loading={loading}
        setLoading={setLoading}
        attachedFile={attachedFile}
        setAttachedFile={setAttachedFile}
        sessionStatus={sessionStatus}
      />
    )
  }
  return (
    <TenantLater
      question={question}
      answer={answer}
      setQuestion={setQuestion}
      loading={loading}
      setLoading={setLoading}
      sessionStatus={sessionStatus}
      setSessionStatus={setSessionStatus}
    />
  )
}

export default Tenant
