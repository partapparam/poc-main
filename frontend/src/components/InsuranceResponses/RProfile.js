import { useEffect } from "react";
import TypingEffect from "../TypingEffect/TypingEffect.js";

const RProfile = ({ accountData, setLoading, setAccountData }) => {

  const handleTypingComplete = () => {
    // console.log("Done");
    setLoading(false);
    setAccountData(null);
  };

  useEffect(() => {
    setLoading(true);
  }, []);
  // <div className="ins-resp-sub-header">Info:</div>
  const riskInitialHtml = `
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
              <span style="font-weight:bold">SIC Code:</span>${" "}
              ${accountData?.sic_code}
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
              <span style="font-weight:bold">Risk Score:</span>${" "}
              ${accountData?.risk_score}, refer
              below details
            </div>
          </div>
        </div>
        <div class="ml-[3.5rem] w-[65%]">
          <table className="w-full border-seperate mb-[20px]">
            <thead>
              <tr>
                <th className="w-[60%] resp-table-content bg-[#8DB1BF]">Insurance Type</th>
                <th className="w-[40%] resp-table-content bg-[#8DB1BF]">Score (out of 100)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="w-[60%] resp-table-content bg-[#fff]">General Liability Insurance</td>
                <td className="w-[40%] resp-table-content bg-[#fff]">${accountData?.general_liability_ins}</td>
              </tr>
              <tr>
                <td className="w-[60%] resp-table-content bg-[#fff]">Professional Liability Insurance (Errors & Omissions)</td>
                <td className="w-[40%] resp-table-content bg-[#fff]">${accountData?.professional_liability_ins}</td>
              </tr>
              <tr>
                <td className="w-[60%] resp-table-content bg-[#fff]">Property Insurance</td>
                <td className="w-[40%] resp-table-content bg-[#fff]">${accountData?.property_ins}</td>
              </tr>
              <tr>
                <td className="w-[60%] resp-table-content bg-[#fff]">Workers' Compensation Insurance</td>
                <td className="w-[40%] resp-table-content bg-[#fff]">${accountData?.workers_compensation_ins}</td>
              </tr>
              <tr>
                <td className="w-[60%] resp-table-content bg-[#fff]">Product Liability Insurance</td>
                <td className="w-[40%] resp-table-content bg-[#fff]">${accountData?.product_liability_ins}</td>
              </tr>
              <tr>
                <td className="w-[60%] resp-table-content bg-[#fff]">Cyber Liability Insurance</td>
                <td className="w-[40%] resp-table-content bg-[#fff]">${accountData?.cyber_liability_ins}</td>
              </tr>
              <tr>
                <td className="w-[60%] resp-table-content bg-[#fff]">Commercial Auto Insurance</td>
                <td className="w-[40%] resp-table-content bg-[#fff]">${accountData?.commercial_auto_ins}</td>
              </tr>
              <tr>
                <td className="w-[60%] resp-table-content bg-[#fff]">Business Interruption Insurance</td>
                <td className="w-[40%] resp-table-content bg-[#fff]">${accountData?.business_interruption_ins}</td>
              </tr>
              <tr>
                <td className="w-[60%] resp-table-content bg-[#fff]">Directors & Officers Liability Insurance</td>
                <td className="w-[40%] resp-table-content bg-[#fff]">${accountData['directors&officers_liability_ins']}</td>
              </tr>
              <tr>
                <td className="w-[60%] resp-table-content bg-[#fff]">Employment Practices Liability Insurance</td>
                <td className="w-[40%] resp-table-content bg-[#fff]">${accountData?.employment_practices_liability_ins}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="ins-resp-sub-header">Sources:</div>
      <div className="ins-resp-links">
        <a
          className="ins-resp-link"
          href="https://app.gtmcopilot.com/"
          target="_blank"
        >
          Link 1
        </a>${" "}
        |${" "}
        <a
          className="ins-resp-link"
          href="https://app.gtmcopilot.com/"
          target="_blank"
        >
          Link 2
        </a>${" "}
        |${" "}
        <a
          className="ins-resp-link"
          href="https://app.gtmcopilot.com/"
          target="_blank"
        >
          Link 3
        </a>
      </div>
    </div>
  `;

  return (
    <div>
      <TypingEffect
        html={riskInitialHtml}
        speed={2}
        onTypingComplete={handleTypingComplete}
      />
    </div>
  );
};

export default RProfile;
