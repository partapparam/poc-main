import { useState, useEffect } from "react";
import iCustomerLogo from "../../assets/images/iCustomer_logo.png";
import rapnetLogo from "../../assets/images/rapnet.png";
import { Form, Select, Input, Button, Typography, message } from "antd";
import {
  cutOptions,
  colorOptions,
  clarityOptions,
  fluorescenceOptions,
  milkyOptions,
  symmetryOptions,
  maxGirdleOptions,
} from "../../utils/DiamondConstants";
import { Icon } from "@iconify/react";
import { fetchDiamondPrice } from "../../services/diamondServices";
import ScrollIndicator from '../../components/ScrollIndicator/ScrollIndicator';

import './Diamond.css';

const Diamond = () => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [price, setPrice] = useState(7515.924537109375);
  const [feedBack, setFeedBack] = useState(null);
  const [calcClicked, setCalcClicked] = useState(false);
  const onFinish = async () => {
    setIsLoading(true);
    console.log("Form Values", form.getFieldsValue());
    const fetchingData = form.getFieldsValue();
    const payload = {
      fetchingData,
      type: "noFeedBack"
    }
    const diamondPrice = await fetchDiamondPrice(payload);
    console.log("diamondPrice", diamondPrice?.data);
    setTimeout(() => {
      if (diamondPrice?.data?.price) {
        setPrice(diamondPrice?.data?.price);
      } else {
        if (diamondPrice?.data?.message) {
          if (diamondPrice?.data?.message === "Forbidden") {
            message.error("Token is incorrect");
          } else {
            message.error(
              diamondPrice?.data?.message ||
                "There was an error generating diamond price"
            );
          }
        }
      }
      setIsLoading(false);
      if (!calcClicked) {
        setCalcClicked(true);
      }
      setFeedBack(null);
    }, 1000);
  };
  const initialValues = {
    ColorID: 8,
    MeasWidth: 20.34,
    ClarityID: 7,
    Weight: 1.21,
    FluorescenceIntensityID: 1,
    CutID: 2,
    CountryID: 231,
    DepthPercent: 62.2,
    MilkyID: 1,
    GirdleSizeMaxID: 3,
    SymmetryID: 4,
    TablePercent: 50,
  };
  const handleInputChangeFloat = (e) => {
    const inputValue = e?.target?.value;

    const hasDot = inputValue?.includes(".");

    if (hasDot && e.key === ".") {
      e.preventDefault();
      return;
    }

    const filteredValue = inputValue
      ?.replace(/[^0-9.]/g, "")
      ?.replace(/(\..*)\./g, "$1");

    e.target.value = filteredValue;
  };
  const handleInputChange = (e) => {
    const inputValue = e?.target?.value;

    const validInputRegex = /^[\d.]*$/;

    if (!validInputRegex.test(inputValue)) {
      const filteredValue = inputValue.replace(/[^0-9.]/g, "");
      e.target.value = filteredValue;
    }

    if (inputValue?.includes(".")) {
      const filteredValue = inputValue?.replace(/\./g, "");
      e.target.value = filteredValue;
    }
  };
  const feedBackHandler = async (fBack) => {
    setFeedBack(fBack);
    console.log(form.getFieldsValue());
    const fetchingData = form.getFieldsValue();
    const payload = {
      fetchingData,
      type: fBack
    }
    const diamondPrice = await fetchDiamondPrice(payload);
    console.log(diamondPrice?.data?.price, `calculated with ${fBack} feedback`);
  };

  const handleFeedBack = async (fType) => {
    if (feedBack !== "positive" && fType === "positive") {
      feedBackHandler("positive");
    } else if (feedBack !== "negative" && fType === "negative") {
      feedBackHandler("negative");
    }
  };
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    const updateScreenWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    updateScreenWidth();

    window.addEventListener('resize', updateScreenWidth);

    return () => {
      window.removeEventListener('resize', updateScreenWidth);
    };
  }, []);

  const logoImageWidth = screenWidth >= 1024 ? 250 : 150;
  const rapnetImageWidth = screenWidth >= 1024 ? 125 : 100;

  return (
    <div className="w-full h-screen flex flex-col items-center justify-start gap-2">
      <div className="w-full flex items-center justify-between">
        <img src={iCustomerLogo} width={logoImageWidth} alt="brand-logo" />
        <img
          src={rapnetLogo}
          width={rapnetImageWidth}
          alt="rapnet-logo"
          className="mr-2"
        />
      </div>
      <div className="w-full text-center text-4xl font-bold font-roboto lg:mt-[-3rem]">
        Diamond Price Calculator
      </div>
      <div className="w-full flex flex-col lg:flex-row items-center justify-center lg:px-12">
        <Form
          layout="vertical"
          form={form}
          initialValues={initialValues}
          className="w-full lg:w-2/3 mt-6 flex flex-col"
        >
          <div className="flex items-center justify-center gap-5 mx-2">
            <Form.Item
              label="Color"
              name="ColorID"
              className="w-1/2 px-4 text-center calculateFormLabel py-2 rounded-md bg-[#032D3E] selectLabelMargin"
            >
              <Select options={colorOptions} />
            </Form.Item>
            <Form.Item
              label="Width"
              name="MeasWidth"
              className="w-1/2 px-4 text-center calculateFormLabel py-2 rounded-md bg-[#032D3E]"
            >
              <Input
                onInput={handleInputChangeFloat}
                className="text-center pr-6 relative"
              />
            </Form.Item>
          </div>
          <div className="flex items-center justify-center gap-5 mx-2">
            <Form.Item
              label="Clarity"
              name="ClarityID"
              className="w-1/2 px-4 text-center calculateFormLabel py-2 rounded-md bg-[#032D3E] selectLabelMargin"
            >
              <Select options={clarityOptions} />
            </Form.Item>
            <Form.Item
              label="Weight"
              name="Weight"
              className="w-1/2 px-4 text-center calculateFormLabel py-2 rounded-md bg-[#032D3E]"
            >
              <Input
                onInput={handleInputChangeFloat}
                className="text-center pr-6 relative"
              />
            </Form.Item>
          </div>
          <div className="flex items-center justify-center gap-5 mx-2">
            {/* <Form.Item
              label="Seller"
              name="SellerID"
              className="w-1/2 px-4 text-center calculateFormLabel py-2 rounded-md bg-[#066984]"
            >
              <Input onInput={handleInputChange} className="text-center pr-6" />
            </Form.Item> */}
            
            {/* <Form.Item
              label="Lab"
              name="LabID"
              className="w-1/2 px-4 text-center calculateFormLabel py-2 rounded-md bg-[#066984]"
            >
              <Input onInput={handleInputChange} className="text-center pr-6" />
            </Form.Item> */}
            <Form.Item
              label="Cut"
              name="CutID"
              className="w-1/2 px-4 text-center calculateFormLabel py-2 rounded-md bg-[#066984] selectLabelMargin"
            >
              <Select options={cutOptions} />
            </Form.Item>
            <Form.Item
              label="Country"
              name="CountryID"
              className="w-1/2 px-4 text-center calculateFormLabel py-2 rounded-md bg-[#066984]"
            >
              <Input onInput={handleInputChange} className="text-center pr-6" />
            </Form.Item>
          </div>
          <div className="flex items-center justify-center gap-5 mx-2">
            <Form.Item
              label="Milky"
              name="MilkyID"
              className="w-1/2 px-4 text-center calculateFormLabel py-2 rounded-md bg-[#066984] selectLabelMargin"
            >
              <Select options={milkyOptions} />
            </Form.Item>
            <Form.Item
              label="Symmetry"
              name="SymmetryID"
              className={`${screenWidth >= 340 ? 'w-1/2' : 'w-[47%]'} px-4 text-center calculateFormLabel py-2 rounded-md bg-[#066984] selectLabelMargin`}
            >
              <Select options={symmetryOptions} />
            </Form.Item>
          </div>
          <div className="flex items-center justify-center gap-5 mx-2">
            <Form.Item
              label="Maximum Girdle Size"
              name="GirdleSizeMaxID"
              className="w-2/3 px-4 text-center calculateFormLabel py-2 rounded-md bg-[#066984] selectLabelMargin"
            >
              <Select options={maxGirdleOptions} />
            </Form.Item>
          </div>
          <div className="flex items-center justify-center gap-5 mx-2">
            <Form.Item
              label="Table Percent"
              name="TablePercent"
              className="w-2/3 px-4 text-center calculateFormLabel py-2 rounded-md bg-[#066984]"
            >
              <Input
                onInput={handleInputChangeFloat}
                className="text-center pr-6"
              />
            </Form.Item>
          </div>
          <div className="flex items-center justify-center gap-5 mx-2">
            <Form.Item
              label="Fluorescence Intensity"
              name="FluorescenceIntensityID"
              className="w-2/3 px-4 text-center calculateFormLabel py-2 rounded-md bg-[#066984] selectLabelMargin"
            >
              <Select options={fluorescenceOptions} />
            </Form.Item>
          </div>
          <div className="flex items-center justify-center gap-5 mx-2">
            <Form.Item
              label="Depth Percent"
              name="DepthPercent"
              className="w-2/3 px-4 text-center calculateFormLabel py-2 rounded-md bg-[#066984]"
            >
              <Input
                onInput={handleInputChangeFloat}
                className="text-center pr-6"
              />
            </Form.Item>
          </div>
        </Form>
        <div className="w-full flex justify-center calculateBtnContainer lg:mb-20 lg:ml-[-10rem]">
          <Button
            type="default"
            onClick={onFinish}
            loading={isLoading}
            disabled={isLoading}
            className="bg-[#609DA1] text-white calculateBtn hover:shadow-xl hover:scale-105 font-bold py-6 px-8 flex justify-center items-center text-base"
          >
            {isLoading ? "Calculating..." : "Calculate"}
          </Button>
        </div>
        <div
          className={`w-2/3 flex flex-col pt-10 justify-center items-center border rounded-lg text-center shadow-lg bg-[#8DB1BF] priceCard my-4 lg:mb-20 lg:ml-[-10rem] lg:h-[20rem] ${
            calcClicked ? "pb-2" : "pb-10"
          }`}
        >
          <Typography.Title
            level={4}
            style={{ color: "white" }}
            className="titleMargin"
          >
            Price Per Carat
          </Typography.Title>
          <Typography.Title level={1} strong className="titleMargin">
            ${" "}
            {price?.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Typography.Title>
          {calcClicked && (
            <Typography.Text
              style={{
                color: "white",
                alignSelf: "flex-end",
                marginRight: "1rem",
                marginTop: "1rem",
              }}
            >
              Was this accurate?{" "}
              {feedBack === "positive" ? (
                <Icon
                  icon="carbon:thumbs-up-filled"
                  color="#eaebeb"
                  style={{ display: "inline" }}
                  className="cursor-pointer mb-1"
                  width={15}
                />
              ) : (
                <Icon
                  icon="octicon:thumbsup-16"
                  color="#eaebeb"
                  style={{ display: "inline" }}
                  className="mb-1 cursor-pointer"
                  onClick={() => handleFeedBack("positive")}
                />
              )}{" "}
              :{" "}
              {feedBack === "negative" ? (
                <Icon
                  icon="carbon:thumbs-down-filled"
                  color="#eaebeb"
                  style={{ display: "inline" }}
                  className="cursor-pointer"
                  hFlip={true}
                  width={15}
                />
              ) : (
                <Icon
                  icon="octicon:thumbsdown-16"
                  color="#eaebeb"
                  style={{ display: "inline" }}
                  className="mb-0.5 cursor-pointer"
                  onClick={() => handleFeedBack("negative")}
                />
              )}
            </Typography.Text>
          )}
        </div>
      </div>
      {screenWidth >= 1024 && <ScrollIndicator />}
      <div className="p-1"></div>
    </div>
  );
};

export default Diamond;
