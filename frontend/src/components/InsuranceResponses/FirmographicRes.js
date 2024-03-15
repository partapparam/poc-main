import React, { useEffect } from "react";
import TypingEffect from "../TypingEffect/TypingEffect.js";

const FirmographicRes = ({ accountData, setLoading, setAccountData }) => {
  const handleTypingComplete = () => {
    // console.log("Done");
    setLoading(false);
    setAccountData(null);
  };

  useEffect(() => {
    setLoading(true);
  }, []);
  // <div className="ins-resp-sub-header">Info:</div>  //removed on purpose on 29-01-24

  const accountDataHTML = `
      <div className="ins-resp">
        <div className="ins-resp-sub-text">
          <span>${accountData?.account_desc?.split(".")[0]}</span>
          ${". "}
          <span>
            Here's a concise profile of the company based on the information
            available:
          </span>
        </div>
        <div className="ins-resp-data">
          <div className="ins-resp-data-bullet-points">
            <div className="ins-resp-data-bp-container">
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 2048 2048" class="ins-resp-data-bp"><path fill="currentColor" d="M1024 640q79 0 149 30t122 82t83 123t30 149q0 80-30 149t-82 122t-123 83t-149 30q-80 0-149-30t-122-82t-83-122t-30-150q0-79 30-149t82-122t122-83t150-30z"/></svg>
              <div className="ins-resp-data-bp-actual-data">
                <span style="font-weight:bold">Name:</span>${" "}
                ${accountData?.account_name}
              </div>
            </div>
            <div className="ins-resp-data-bp-container">
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 2048 2048" class="ins-resp-data-bp"><path fill="currentColor" d="M1024 640q79 0 149 30t122 82t83 123t30 149q0 80-30 149t-82 122t-123 83t-149 30q-80 0-149-30t-122-82t-83-122t-30-150q0-79 30-149t82-122t122-83t150-30z"/></svg>
              <div className="ins-resp-data-bp-actual-data">
                <span style="font-weight:bold">Domain:</span>${" "}
                ${accountData?.account_url?.split("www.")[1]}
              </div>
            </div>
            <div className="ins-resp-data-bp-container">
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 2048 2048" class="ins-resp-data-bp"><path fill="currentColor" d="M1024 640q79 0 149 30t122 82t83 123t30 149q0 80-30 149t-82 122t-123 83t-149 30q-80 0-149-30t-122-82t-83-122t-30-150q0-79 30-149t82-122t122-83t150-30z"/></svg>
              <div className="ins-resp-data-bp-actual-data">
                <span style="font-weight:bold">Headquarters:</span>${" "}
                ${
                  accountData?.account_addressstreet +
                  ", " +
                  accountData?.account_addresscity +
                  ", " +
                  accountData?.account_addressstate +
                  ", " +
                  accountData?.account_country
                }
              </div>
            </div>
            <div className="ins-resp-data-bp-container">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 2048 2048" class="ins-resp-data-bp"><path fill="currentColor" d="M1024 640q79 0 149 30t122 82t83 123t30 149q0 80-30 149t-82 122t-123 83t-149 30q-80 0-149-30t-122-82t-83-122t-30-150q0-79 30-149t82-122t122-83t150-30z"/></svg>
            <div className="ins-resp-data-bp-actual-data">
              <span style="font-weight:bold">Phone Number:</span> ${
                accountData?.account_phone
              }
            </div>
          </div>
            <div className="ins-resp-data-bp-container">
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 2048 2048" class="ins-resp-data-bp"><path fill="currentColor" d="M1024 640q79 0 149 30t122 82t83 123t30 149q0 80-30 149t-82 122t-123 83t-149 30q-80 0-149-30t-122-82t-83-122t-30-150q0-79 30-149t82-122t122-83t150-30z"/></svg>
              <div className="ins-resp-data-bp-actual-data">
                <span style="font-weight:bold">Headquarters ZIP Code:</span>${" "}
                ${accountData?.account_addresszip}
              </div>
            </div>
            <div className="ins-resp-data-bp-container">
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 2048 2048" class="ins-resp-data-bp"><path fill="currentColor" d="M1024 640q79 0 149 30t122 82t83 123t30 149q0 80-30 149t-82 122t-123 83t-149 30q-80 0-149-30t-122-82t-83-122t-30-150q0-79 30-149t82-122t122-83t150-30z"/></svg>
              <div className="ins-resp-data-bp-actual-data">
                <span style="font-weight:bold">Industry:</span>${" "}
                ${accountData?.account_industry}
              </div>
            </div>
            <div className="ins-resp-data-bp-container">
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 2048 2048" class="ins-resp-data-bp"><path fill="currentColor" d="M1024 640q79 0 149 30t122 82t83 123t30 149q0 80-30 149t-82 122t-123 83t-149 30q-80 0-149-30t-122-82t-83-122t-30-150q0-79 30-149t82-122t122-83t150-30z"/></svg>
              <div className="ins-resp-data-bp-actual-data">
                <span style="font-weight:bold"> Sub Industry:</span>${" "}
                ${accountData?.account_subindustry}
              </div>
            </div>
            <div className="ins-resp-data-bp-container">
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 2048 2048" class="ins-resp-data-bp"><path fill="currentColor" d="M1024 640q79 0 149 30t122 82t83 123t30 149q0 80-30 149t-82 122t-123 83t-149 30q-80 0-149-30t-122-82t-83-122t-30-150q0-79 30-149t82-122t122-83t150-30z"/></svg>
              <div className="ins-resp-data-bp-actual-data">
                <span style="font-weight:bold">Employee Count:</span>${" "}
                ${accountData?.account_employees}
              </div>
            </div>
            <div className="ins-resp-data-bp-container">
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 2048 2048" class="ins-resp-data-bp"><path fill="currentColor" d="M1024 640q79 0 149 30t122 82t83 123t30 149q0 80-30 149t-82 122t-123 83t-149 30q-80 0-149-30t-122-82t-83-122t-30-150q0-79 30-149t82-122t122-83t150-30z"/></svg>
              <div className="ins-resp-data-bp-actual-data">
                <span style="font-weight:bold">Revenue:</span>${" "}
                ${accountData?.account_revenue}
              </div>
            </div>
            <div className="ins-resp-data-bp-container">
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 2048 2048" class="ins-resp-data-bp"><path fill="currentColor" d="M1024 640q79 0 149 30t122 82t83 123t30 149q0 80-30 149t-82 122t-123 83t-149 30q-80 0-149-30t-122-82t-83-122t-30-150q0-79 30-149t82-122t122-83t150-30z"/></svg>
              <div className="ins-resp-data-bp-actual-data">
                <span style="font-weight:bold">GICS Code:</span>${" "}
                ${accountData?.account_gicscode}
              </div>
            </div>
            <div className="ins-resp-data-bp-container">
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 2048 2048" class="ins-resp-data-bp"><path fill="currentColor" d="M1024 640q79 0 149 30t122 82t83 123t30 149q0 80-30 149t-82 122t-123 83t-149 30q-80 0-149-30t-122-82t-83-122t-30-150q0-79 30-149t82-122t122-83t150-30z"/></svg>
              <div className="ins-resp-data-bp-actual-data">
                <span style="font-weight:bold">NAICS Code:</span>${" "}
                ${accountData?.naics_code}
              </div>
            </div>
            <div className="ins-resp-data-bp-container">
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 2048 2048" class="ins-resp-data-bp"><path fill="currentColor" d="M1024 640q79 0 149 30t122 82t83 123t30 149q0 80-30 149t-82 122t-123 83t-149 30q-80 0-149-30t-122-82t-83-122t-30-150q0-79 30-149t82-122t122-83t150-30z"/></svg>
              <div className="ins-resp-data-bp-actual-data">
                <span style="font-weight:bold">SIC Code:</span>${" "}
                ${accountData?.sic_code}
              </div>
            </div>
          </div>
        </div>
        <div className="ins-resp-sub-header">Sources:</div>
        <div className="ins-resp-links">
          <a
            className="ins-resp-link"
            href="https://app.gtmcopilot.com"
            target="_blank"
          >
            Link 1
          </a>${" "}
          |${" "}
          <a
            className="ins-resp-link"
            href="https://app.gtmcopilot.com"
            target="_blank"
          >
            Link 2
          </a>${" "}
          |${" "}
          <a
            className="ins-resp-link"
            href="https://app.gtmcopilot.com"
            target="_blank"
          >
            Link 3
          </a>
        </div>
      </div>
    `;

// Technology AND Signals removed 29-01-2024
  //   <div className="ins-resp-data-bp-container">
  //   <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 2048 2048" class="ins-resp-data-bp"><path fill="currentColor" d="M1024 640q79 0 149 30t122 82t83 123t30 149q0 80-30 149t-82 122t-123 83t-149 30q-80 0-149-30t-122-82t-83-122t-30-150q0-79 30-149t82-122t122-83t150-30z"/></svg>
  //   <div className="ins-resp-data-bp-actual-data">
  //     <span style="font-weight:bold">Technologies Used:</span>${" "}
  //     ${extractInfo(accountData, "tech")?.slice(0, 2)?.join(", ")}
  //     ${
  //       extractInfo(accountData, "tech")?.length > 2
  //         ? ", among others"
  //         : ""
  //     }
  //   </div>
  // </div>
  // <div className="ins-resp-data-bp-container">
  //   <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 2048 2048" class="ins-resp-data-bp"><path fill="currentColor" d="M1024 640q79 0 149 30t122 82t83 123t30 149q0 80-30 149t-82 122t-123 83t-149 30q-80 0-149-30t-122-82t-83-122t-30-150q0-79 30-149t82-122t122-83t150-30z"/></svg>
  //   <div className="ins-resp-data-bp-actual-data">
  //     <span style="font-weight:bold">Signals:</span>${" "}
  //     ${extractInfo(accountData, "signal")?.slice(0, 4)?.join(", ")}
  //     ${
  //       extractInfo(accountData, "signal")?.length > 4
  //         ? ", among others"
  //         : ""
  //     }
  //   </div>
  // </div>
  return (
    <div>
      <TypingEffect
        html={accountDataHTML}
        speed={2}
        onTypingComplete={handleTypingComplete}
      />
    </div>
  );
};

export default FirmographicRes;
