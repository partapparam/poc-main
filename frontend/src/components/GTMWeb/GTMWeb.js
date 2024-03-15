import { useState, useEffect } from "react";
import { Button, Card, Input, message, Typography } from "antd";
import { CopyOutlined } from '@ant-design/icons';

import { insertSite } from "../../services/gtmJSServices";

const { Paragraph } = Typography;

const GTMWeb = () => {
  const [website, setWebsite] = useState(null);
  const [websiteEntered, setWebsiteEntered] = useState(false);
  const [websiteID, setWebsiteID] = useState(null);
  const [APILink, setAPILink] = useState(null);
  let apiLink = `<!-- GTMCopilot Tag Starts -->
  <script>(function(w, d, s, l, i, n) {w[l] = w[l] || [];w[l].push({'gtmCopilot.start': new Date().getTime(), event: 'gtmCopilot.js'});var f = d.getElementsByTagName(s)[0],j = d.createElement(s),dl = l != 'dataLayer' ? '&l=' + l : '',geoLocationParam = '';if (n.geolocation) {n.geolocation.getCurrentPosition((position) => {let{latitude,longitude}=position.coords;geoLocationParam = '&geolocation=' + latitude + ',' + longitude;injectScript();}, (error) => {console.error('Error getting geolocation:', error);geoLocationParam = '&geolocation=Not There';injectScript();});} else {console.error('Geolocation is not supported by this browser.');geoLocationParam = '&geolocation=Not There';injectScript();}injectScript = () => {j.async = true;j.src = 'https://app.gtmcopilot.com/api_v3/gtm/js?id=' + i + dl + geoLocationParam;f.parentNode.insertBefore(j, f);}})(window, document, 'script', 'dataLayer', 'unique_site_id', navigator);</script>
  <!-- GTMCopilot Tag Ends -->`;
  const handleInput = (e) => {
    setWebsite(e.target.value);
  };
  const handleSubmit = async (e) => {
    if (!website || website.trim() === "") {
      message.error("Please enter your website to generate GTM script");
      return;
    }
    let linkPattern = /^(http|https):\/\/.+?\..+$/i;
    if (!linkPattern.test(website)) {
        message.error("Please enter a valid link to your website");
        return;
    }
    const payload = {
        site_name: website
    }
    const response = await insertSite(payload);
    const site_id = response.data.site_id;
    setWebsiteID(site_id)
    setWebsiteEntered(true);
  };
  useEffect(() => {
    if (websiteID) {
        // console.log(websiteID)
        apiLink = apiLink.replace('unique_site_id', websiteID);
        // console.log(apiLink)
        setAPILink(apiLink)
    }
  }, [websiteID])
  const copyScript = () => {
    let textToCopy = APILink;
    const textArea = document.createElement("textarea");
    textArea.value = textToCopy;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    message.success("Script Copied Successfully")
  }
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className={`bg-[#032D3E] text-white flex-col justify-center items-center ${!websiteEntered ? 'w-[20%]' : 'w-[50%]'}`}>
        <div className="text-lg font-medium text-center">GTM Website Visitors</div>
        <div className="w-full mt-5">
          {!websiteEntered ? 
          <div>
            <label htmlFor="website">Enter your website's address</label>
            <Input
              placeholder="eg: https://www.google.com"
              id="website"
              className="mt-2"
              onChange={handleInput}
              onPressEnter={handleSubmit}
            />
            <Button className="float-right mt-2" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
          :
          <div className="flex-col justify-center items-center">
            <div>
                Enter the following script inside <b>{"<head>"}</b> tag of index.html file
            </div>
            <div className=" bg-[#15475b] mt-2 relative">
                <CopyOutlined className="absolute right-2 top-1 cursor-pointer" onClick={copyScript} />
                <Paragraph code type="success" className="p-2">
                    {APILink}
                </Paragraph>
            </div>
          </div>
        }
        </div>
      </Card>
    </div>
  );
};

export default GTMWeb;
