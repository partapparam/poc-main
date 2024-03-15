import React from "react"
import { useNavigate } from "react-router-dom"
import { Button, Card } from "antd"

const SSOT = () => {
  const userString = localStorage.getItem("user")
  const user = userString ? JSON.parse(userString) : null // Parse the user string into a JSON object
  const tenant = user?.organization_domain
  const navigate = useNavigate()
  const powerUserPocs = [
    ["Generic Demo", "/demo"],
    ["Insurance", "/insurance"],
    ["Finance", "/finance"],
    ["Diamond Price Calculator", "/diamond-price-calculator"],
    ["Tenant", "/tenant"],
    // ["Semantic Search", '/semantic-search'],
  ]
  const adminPocs = [
    ["Diamond Price Calculator", "/diamond-price-calculator/admin"],
  ]

  return (
    <>
      {tenant === "icustomer.ai" ? (
        <>
          <div className={"text-center text-2xl"}>List of Demo's</div>
          <div className="flex justify-center mt-8 gap-12 p-[3%]">
            <Card className={"w-[35%]"}>
              <div className={"text-xl mb-8 text-center"}> Power User </div>
              {powerUserPocs.map(([name, route], index) => (
                <div key={index} style={{ marginBottom: "20px" }}>
                  <Button
                    className={"w-[100%]"}
                    onClick={() => navigate(route)}
                  >
                    {name}
                  </Button>
                </div>
              ))}
            </Card>
            <Card className={"w-[35%]"}>
              <div className={"text-xl mb-8 text-center"}>Admin User</div>
              {adminPocs.map(([name, route], index) => (
                <div key={index} style={{ marginBottom: "20px" }}>
                  <Button
                    className={"w-[100%]"}
                    onClick={() => navigate(route)}
                  >
                    {name}
                  </Button>
                </div>
              ))}
            </Card>
          </div>
        </>
      ) : (
        <div>Sorry, you're not authorised to access this page.</div>
      )}
    </>
  )
}

export default SSOT
