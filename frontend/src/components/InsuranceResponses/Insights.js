import { useEffect } from "react";
import TypingEffect from '../TypingEffect/TypingEffect.js';

const Insights = ({ prompt, setLoading }) => {

  const handleTypingComplete = () => {
    // console.log("Done");
    setTimeout(() => {
        setLoading(false);
      }, 2000);
  };

  useEffect(() => {
    setLoading(true);
  }, []);

  const prompt1 = `
  <div className="ins-resp">
      <div className="ins-resp-sub-text">
          <span></span>
      </div>
      <div className="ins-resp-dataInsight">
          <div class="w-full flex">


              <!-- Table 2: Average Claim Amounts by Cause -->
              <div>
                  <h2>Average Claim Amounts by Cause</h2>
                  <table className="w-full border-separate mb-[20px]">
                      <thead>
                          <tr>
                              <th className="w-[40%] resp-table-content bg-[#8DB1BF]">Claim Cause</th>
                              <th className="w-[30%] resp-table-content bg-[#8DB1BF]">Average Claim Amount (USD)</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr>
                              <td className="w-[40%] resp-table-content bg-[#fff]">Natural Disasters</td>
                              <td className="w-[30%] resp-table-content bg-[#fff]">25,000</td>
                          </tr>
                          <tr>
                              <td className="w-[40%] resp-table-content bg-[#fff]">Theft/Burglary</td>
                              <td className="w-[30%] resp-table-content bg-[#fff]">5,000</td>
                          </tr>
                          <tr>
                              <td className="w-[40%] resp-table-content bg-[#fff]">Accidents</td>
                              <td className="w-[30%] resp-table-content bg-[#fff]">15,000</td>
                          </tr>
                          <tr>
                              <td className="w-[40%] resp-table-content bg-[#fff]">Fire</td>
                              <td className="w-[30%] resp-table-content bg-[#fff]">20,000</td>
                          </tr>
                          <tr>
                              <td className="w-[40%] resp-table-content bg-[#fff]">Others</td>
                              <td className="w-[30%] resp-table-content bg-[#fff]">7,000</td>
                          </tr>
                      </tbody>
                  </table>
              </div>

              

          </div>
            <div class="w-full flex" style={{ marginTop: "20px" }}>
                <img style="width: 90%; margin-top: 25px" src="/prompt1.2.png" alt="Prompt 1" />
            </div>
      </div>
  </div>
`;
// <!-- Table 1: Claim Causes and Frequency -->
// <div style="width: 30%; margin-right: 2%;">
//     <h2>Claim Causes and Frequency</h2>
//     <table className="w-full border-separate mb-[20px]">
//         <thead>
//             <tr>
//                 <th className="w-[40%] resp-table-content bg-[#8DB1BF]">Claim Cause</th>
//                 <th className="w-[30%] resp-table-content bg-[#8DB1BF]">Number of Claims</th>
//             </tr>
//         </thead>
//         <tbody>
//             <tr>
//                 <td className="w-[40%] resp-table-content bg-[#fff]">Natural Disasters</td>
//                 <td className="w-[30%] resp-table-content bg-[#fff]">120</td>
//             </tr>
//             <tr>
//                 <td className="w-[40%] resp-table-content bg-[#fff]">Theft/Burglary</td>
//                 <td className="w-[30%] resp-table-content bg-[#fff]">200</td>
//             </tr>
//             <tr>
//                 <td className="w-[40%] resp-table-content bg-[#fff]">Accidents</td>
//                 <td className="w-[30%] resp-table-content bg-[#fff]">300</td>
//             </tr>
//             <tr>
//                 <td className="w-[40%] resp-table-content bg-[#fff]">Fire</td>
//                 <td className="w-[30%] resp-table-content bg-[#fff]">150</td>
//             </tr>
//             <tr>
//                 <td className="w-[40%] resp-table-content bg-[#fff]">Others</td>
//                 <td className="w-[30%] resp-table-content bg-[#fff]">100</td>
//             </tr>
//         </tbody>
//     </table>
// </div>
{/* <img style="width: 30%; margin-right: 5%;" src="/assets/images/prompt1.1.png" alt="Prompt 1" /> */}
// <!-- Table 3: Average Settlement Times by Cause -->
// <div style="width: 30%;">
//     <h2>Average Settlement Times by Cause</h2>
//     <table className="w-full border-separate mb-[20px]">
//         <thead>
//             <tr>
//                 <th className="w-[40%] resp-table-content bg-[#8DB1BF]">Claim Cause</th>
//                 <th className="w-[30%] resp-table-content bg-[#8DB1BF]">Average Settlement Time (days)</th>
//             </tr>
//         </thead>
//         <tbody>
//             <tr>
//                 <td className="w-[40%] resp-table-content bg-[#fff]">Natural Disasters</td>
//                 <td className="w-[30%] resp-table-content bg-[#fff]">60</td>
//             </tr>
//             <tr>
//                 <td className="w-[40%] resp-table-content bg-[#fff]">Theft/Burglary</td>
//                 <td className="w-[30%] resp-table-content bg-[#fff]">30</td>
//             </tr>
//             <tr>
//                 <td className="w-[40%] resp-table-content bg-[#fff]">Accidents</td>
//                 <td className="w-[30%] resp-table-content bg-[#fff]">45</td>
//             </tr>
//             <tr>
//                 <td className="w-[40%] resp-table-content bg-[#fff]">Fire</td>
//                 <td className="w-[30%] resp-table-content bg-[#fff]">50</td>
//             </tr>
//             <tr>
//                 <td className="w-[40%] resp-table-content bg-[#fff]">Others</td>
//                 <td className="w-[30%] resp-table-content bg-[#fff]">40</td>
//             </tr>
//         </tbody>
//     </table>
// </div>
{/* <img style="width: 30%;" src="/assets/images/prompt1.3.png" alt="Prompt 1" /> */}

const prompt2 = `
    <div className="ins-resp">
        <div className="ins-resp-sub-text">
            <span></span>
        </div>
        <div className="ins-resp-data">
            <div class=" w-[65%]">
                <table className="w-full border-separate mb-[20px]">
                    <thead>
                        <tr>
                            <th className="w-[30%] resp-table-content bg-[#8DB1BF]">Customer Segment</th>
                            <th className="w-[23%] resp-table-content bg-[#8DB1BF]">Age Group</th>
                            <th className="w-[23%] resp-table-content bg-[#8DB1BF]">Income Level</th>
                            <th className="w-[24%] resp-table-content bg-[#8DB1BF]">Insurance Products Interested In</th>
                            <th className="w-[30%] resp-table-content bg-[#8DB1BF]">Average Policy Size</th>
                            <th className="w-[23%] resp-table-content bg-[#8DB1BF]">Loyalty (Years as Customer)</th>
                            <th className="w-[23%] resp-table-content bg-[#8DB1BF]">Risk Profile</th>
                            <th className="w-[24%] resp-table-content bg-[#8DB1BF]">Region</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="w-[30%] resp-table-content bg-[#fff]">Young Professionals</td>
                            <td className="w-[23%] resp-table-content bg-[#fff]">25-35</td>
                            <td className="w-[23%] resp-table-content bg-[#fff]">$40,000-$80,000</td>
                            <td className="w-[24%] resp-table-content bg-[#fff]">Auto, Health, Travel</td>
                            <td className="w-[30%] resp-table-content bg-[#fff]">$1,200</td>
                            <td className="w-[23%] resp-table-content bg-[#fff]">1-3</td>
                            <td className="w-[23%] resp-table-content bg-[#fff]">Moderate</td>
                            <td className="w-[24%] resp-table-content bg-[#fff]">Urban</td>
                        </tr>
                        <tr>
                            <td className="w-[30%] resp-table-content bg-[#fff]">Established Families</td>
                            <td className="w-[23%] resp-table-content bg-[#fff]">36-50</td>
                            <td className="w-[23%] resp-table-content bg-[#fff]">$80,000-$150,000</td>
                            <td className="w-[24%] resp-table-content bg-[#fff]">Home, Life, Health, Auto</td>
                            <td className="w-[30%] resp-table-content bg-[#fff]">$3,000</td>
                            <td className="w-[23%] resp-table-content bg-[#fff]">4-10</td>
                            <td className="w-[23%] resp-table-content bg-[#fff]">Low</td>
                            <td className="w-[24%] resp-table-content bg-[#fff]">Suburban</td>
                        </tr>
                        <tr>
                            <td className="w-[30%] resp-table-content bg-[#fff]">High-Income Singles</td>
                            <td className="w-[23%] resp-table-content bg-[#fff]">30-45</td>
                            <td className="w-[23%] resp-table-content bg-[#fff]">$100,000+</td>
                            <td className="w-[24%] resp-table-content bg-[#fff]">Life, Luxury Auto, Travel</td>
                            <td className="w-[30%] resp-table-content bg-[#fff]">$4,500</td>
                            <td className="w-[23%] resp-table-content bg-[#fff]">2-5</td>
                            <td className="w-[23%] resp-table-content bg-[#fff]">High</td>
                            <td className="w-[24%] resp-table-content bg-[#fff]">Urban</td>
                        </tr>
                        <tr>
                            <td className="w-[30%] resp-table-content bg-[#fff]">Retirees</td>
                            <td className="w-[23%] resp-table-content bg-[#fff]">65+</td>
                            <td className="w-[23%] resp-table-content bg-[#fff]">$30,000-$70,000</td>
                            <td className="w-[24%] resp-table-content bg-[#fff]">Health, Life, Home</td>
                            <td className="w-[30%] resp-table-content bg-[#fff]">$2,000</td>
                            <td className="w-[23%] resp-table-content bg-[#fff]">10+</td>
                            <td className="w-[23%] resp-table-content bg-[#fff]">Low</td>
                            <td className="w-[24%] resp-table-content bg-[#fff]">Rural</td>
                        </tr>
                        <tr>
                            <td className="w-[30%] resp-table-content bg-[#fff]">Budget Conscious</td>
                            <td className="w-[23%] resp-table-content bg-[#fff]">Various</td>
                            <td className="w-[23%] resp-table-content bg-[#fff]">Up to $40,000</td>
                            <td className="w-[24%] resp-table-content bg-[#fff]">Basic Auto, Health</td>
                            <td className="w-[30%] resp-table-content bg-[#fff]">$800</td>
                            <td className="w-[23%] resp-table-content bg-[#fff]">1-5</td>
                            <td className="w-[23%] resp-table-content bg-[#fff]">Moderate</td>
                            <td className="w-[24%] resp-table-content bg-[#fff]">Various</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="" style={{ marginTop: "20px" }}>
                <img src="/prompt2.1.png" alt="Prompt 2" />
            </div>
        </div>
    </div>
`;

const prompt3 = `
    <div className="ins-resp" style={{ display: "flex" }}>
        <div className="ins-resp-sub-text">
            <span></span>
        </div>
        <div className="ins-resp-dataInsightP3" style={{ display: "flex" }}>
            <div class="w-full">
                <h2>Fraud by Frequency and Average Cost</h2>
                <table className="w-full border-separate mb-[20px]">
                    <thead>
                        <tr>
                            <th className="w-[20%] resp-table-content bg-[#8DB1BF]">Type of Fraud</th>
                            <th className="w-[15%] resp-table-content bg-[#8DB1BF]">Frequency (Annual)</th>
                            <th className="w-[25%] resp-table-content bg-[#8DB1BF]">Average Cost per Case (USD)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="w-[20%] resp-table-content bg-[#fff]">False Claims</td>
                            <td className="w-[15%] resp-table-content bg-[#fff]">1500</td>
                            <td className="w-[25%] resp-table-content bg-[#fff]">8,000</td>
                        </tr>
                        <tr>
                            <td className="w-[20%] resp-table-content bg-[#fff]">Policy Application Fraud</td>
                            <td className="w-[15%] resp-table-content bg-[#fff]">800</td>
                            <td className="w-[25%] resp-table-content bg-[#fff]">5,000</td>
                        </tr>
                        <tr>
                            <td className="w-[20%] resp-table-content bg-[#fff]">Premium Diversion</td>
                            <td className="w-[15%] resp-table-content bg-[#fff]">600</td>
                            <td className="w-[25%] resp-table-content bg-[#fff]">10,000</td>
                        </tr>
                        <tr>
                            <td className="w-[20%] resp-table-content bg-[#fff]">Claims Padding</td>
                            <td className="w-[15%] resp-table-content bg-[#fff]">1200</td>
                            <td className="w-[25%] resp-table-content bg-[#fff]">3,000</td>
                        </tr>
                        <tr>
                            <td className="w-[20%] resp-table-content bg-[#fff]">Staged Accidents</td>
                            <td className="w-[15%] resp-table-content bg-[#fff]">400</td>
                            <td className="w-[25%] resp-table-content bg-[#fff]">15,000</td>
                        </tr>
                        <tr>
                            <td className="w-[20%] resp-table-content bg-[#fff]">Provider Fraud</td>
                            <td className="w-[15%] resp-table-content bg-[#fff]">500</td>
                            <td className="w-[25%] resp-table-content bg-[#fff]">12,000</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <div class="w-full flex" style={{ marginTop: "20px" }}>
                <img style="width: 100%" src="/prompt3.1.png" alt="Prompt 3" />
            </div>
        </div>
    </div>
`;
{/* <div class="w-[45%]">
                <h2>Fraud Cases by Insurance Type</h2>
                <table className="w-full border-separate mb-[20px]">
                    <thead>
                        <tr>
                            <th className="w-[30%] resp-table-content bg-[#8DB1BF]">Insurance Type</th>
                            <th className="w-[20%] resp-table-content bg-[#8DB1BF]">Number of Fraud Cases</th>
                            <th className="w-[25%] resp-table-content bg-[#8DB1BF]">Percentage of Total Fraud Cases</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="w-[30%] resp-table-content bg-[#fff]">Auto</td>
                            <td className="w-[20%] resp-table-content bg-[#fff]">1000</td>
                            <td className="w-[25%] resp-table-content bg-[#fff]">40%</td>
                        </tr>
                        <tr>
                            <td className="w-[30%] resp-table-content bg-[#fff]">Life</td>
                            <td className="w-[20%] resp-table-content bg-[#fff]">500</td>
                            <td className="w-[25%] resp-table-content bg-[#fff]">20%</td>
                        </tr>
                        <tr>
                            <td className="w-[30%] resp-table-content bg-[#fff]">Health</td>
                            <td className="w-[20%] resp-table-content bg-[#fff]">700</td>
                            <td className="w-[25%] resp-table-content bg-[#fff]">28%</td>
                        </tr>
                        <tr>
                            <td className="w-[30%] resp-table-content bg-[#fff]">Property</td>
                            <td className="w-[20%] resp-table-content bg-[#fff]">300</td>
                            <td className="w-[25%] resp-table-content bg-[#fff]">12%</td>
                        </tr>
                    </tbody>
                </table>
</div> */}
{/* <img style="width: 45%;" src="/assets/images/prompt3.2.png" alt="Prompt 3" /> */}


  return (
    <div>
      <TypingEffect
        html={prompt == "prompt1" ? prompt1 : prompt == "prompt2" ? prompt2 : prompt3}
        speed={2}
        onTypingComplete={handleTypingComplete}
      />
    </div>
  );
};

export default Insights;
