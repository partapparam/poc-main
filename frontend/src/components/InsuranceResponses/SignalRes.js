import { useState, useEffect } from "react";
import { Table } from "antd";
import { signalColumn } from "../../utils/InsuranceUtil.js";
import { tableTypeWritingFeature } from "../../utils/InsuranceUtil.js";

const SignalRes = ({ accountData, setLoading, setAccountData }) => {
  const [visibleRows, setVisibleRows] = useState([]);
  const [doneTrack, setDoneTrack] = useState(false); // onTableRenderComplete was called extra 10 times if this was not there

  const signalData = [
    {
      key: 1,
      signalType: "Macro Signals",
      indicator: "Economics Indicator",
      value: accountData?.macrosignals_economicindicators,
    },
    {
      key: 2,
      signalType: "Macro Signals",
      indicator: "Industry News",
      value: accountData?.macrosignals_industrynews,
    },
    {
      key: 3,
      signalType: "Macro Signals",
      indicator: "Regulatory Changes",
      value: accountData?.macrosignals_regulatorychanges,
    },
    {
      key: 4,
      signalType: "Macro Signals",
      indicator: "Consumer Trend",
      value: accountData?.macrosignals_consumertrend,
    },
    {
      key: 5,
      signalType: "Micro Signals",
      indicator: "Web Traffic Trend",
      value: accountData?.microsignals_webtraffictrend,
    },
    {
      key: 6,
      signalType: "Micro Signals",
      indicator: "Head Count Trend",
      value: accountData?.microsignals_headcnttrend,
    },
    {
      key: 7,
      signalType: "Micro Signals",
      indicator: "Recruiting Velocity",
      value: accountData?.microsignals_recruitingvel,
    },
    {
      key: 8,
      signalType: "Micro Signals",
      indicator: "Expansion News",
      value: accountData?.microsignals_expansionnews,
    },
    {
      key: 9,
      signalType: "Micro Signals",
      indicator: "Legal News",
      value: accountData?.microsignals_legalnews,
    },
    {
      key: 10,
      signalType: "Micro Signals",
      indicator: "Merger IPO Acquisition News",
      value: accountData?.microsignals_mnanews,
    },
    {
      key: 11,
      signalType: "Micro Signals",
      indicator: "Press Release",
      value: accountData?.microsignals_pressrelease,
    },
  ];

  const onTableRenderComplete = () => {
    if (doneTrack) {
      // console.log("Done");
      setDoneTrack(false);
      setLoading(false);
      setAccountData(null);
    }
  };

  useEffect(() => {
    // console.log(accountData);
    setLoading(true);
    tableTypeWritingFeature(signalData, setVisibleRows);
  }, []);

  useEffect(() => {
    if (visibleRows?.length === 11) {
      setTimeout(() => {
        setDoneTrack(true);
        onTableRenderComplete();
      }, 500);
    }
  }, [visibleRows]);

  return (
    <div className="ins-resp-signal">
      <Table
        columns={signalColumn}
        // dataSource={signalData}
        dataSource={visibleRows}
        pagination={false}
        bordered
      />
    </div>
  );
};

export default SignalRes;
