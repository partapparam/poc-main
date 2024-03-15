import { useEffect } from "react";
import iCustomerLogo from "../../assets/images/iCustomer_logo.png";
import rapnetLogo from "../../assets/images/rapnet.png";

import './DiamondAdminComponent.css';

import { Table, Typography } from "antd";

const DiamondAdminComponent = ({ data, setData }) => {
  const { Text } = Typography;
  const columns = [
    {
      title: "Client IP",
      key: "clientip",
      dataIndex: "clientip",
    },
    {
      title: "Log Time",
      key: "log_time",
      dataIndex: "log_time",
    },
    {
      title: "Color",
      key: "colorid",
      dataIndex: "colorid",
    },
    {
      title: "Meas Width",
      key: "measwidth",
      dataIndex: "measwidth",
    },
    {
      title: "Clarity",
      key: "clarityid",
      dataIndex: "clarityid",
    },
    {
      title: "Weight",
      dataIndex: "weight",
      key: "weight",
    },
    {
      title: "Fluorescence Intensity",
      key: "fluorescenceintensityid",
      dataIndex: "fluorescenceintensityid",
    },
    {
      title: "Cut",
      key: "cutid",
      dataIndex: "cutid",
    },
    {
      title: "Country",
      key: "countryid",
      dataIndex: "countryid",
    },
    {
      title: "Depth Percent",
      key: "depthpercent",
      dataIndex: "depthpercent",
    },
    {
      title: "Milky",
      key: "milkyid",
      dataIndex: "milkyid",
    },
    {
      title: "Maximum Girdle Size",
      key: "girdlesizemaxid",
      dataIndex: "girdlesizemaxid",
    },
    {
      title: "Symmetry",
      key: "symmetryid",
      dataIndex: "symmetryid",
    },
    {
      title: "Table Percent",
      key: "tablepercent",
      dataIndex: "tablepercent",
    },
    // {
    //   title: "Seller",
    //   dataIndex: "sellerid",
    //   key: "sellerid",
    // },
    // {
    //   title: "Lab",
    //   dataIndex: "labid",
    //   key: "labid",
    // },
    {
      title: "Price Per Carat",
      key: "price",
      dataIndex: "price",
      className: "diff"
    },
    {
      title: "Feed Back",
      key: "feedback",
      dataIndex: "feedback",
    },
  ];

  function formatDate(dateString) {
    const options = {
      month: '2-digit',
      day: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    };
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('en-US', options);
    return formattedDate;
  }

  const dataInput = (data, setData) => {
    setData([]);
    data.forEach((item, index) => {
      const newRow = {
        key: `${item}_${index}`,
        clientip: (
          <>
            <Text level={5}>{item?.clientip || "Not Available"}</Text>
          </>
        ),
        log_time: (
          <>
            <Text level={5}>{item?.time ? formatDate(item?.time) : "Not Available"}</Text>
          </>
        ),
        colorid: (
          <>
            <Text level={5}>{item?.colorid || "Not Available"}</Text>
          </>
        ),
        measwidth: (
          <>
            <Text level={5}>{item?.measwidth || "Not Available"}</Text>
          </>
        ),
        clarityid: (
          <>
            <Text level={5}>{item?.clarityid || "Not Available"}</Text>
          </>
        ),
        weight: (
          <>
            <Text level={5}>{item?.weight || "Not Available"}</Text>
          </>
        ),
        fluorescenceintensityid: (
          <>
            <Text level={5}>{item?.fluorescenceintensityid || "Not Available"}</Text>
          </>
        ),
        cutid: (
          <>
            <Text level={5}>{item?.cutid || "Not Available"}</Text>
          </>
        ),
        countryid: (
          <>
            <Text level={5}>{item?.countryid || "Not Available"}</Text>
          </>
        ),
        depthpercent: (
          <>
            <Text level={5}>{item?.depthpercent || "Not Available"}</Text>
          </>
        ),
        milkyid: (
          <>
            <Text level={5}>{item?.milkyid || "Not Available"}</Text>
          </>
        ),
        girdlesizemaxid: (
          <>
            <Text level={5}>{item?.girdlesizemaxid || "Not Available"}</Text>
          </>
        ),
        symmetryid: (
          <>
            <Text level={5}>{item?.symmetryid || "Not Available"}</Text>
          </>
        ),
        tablepercent: (
          <>
            <Text level={5}>{item?.tablepercent || "Not Available"}</Text>
          </>
        ),
        // sellerid: (
        //   <>
        //     <Text level={5}>{item?.sellerid || "Not Available"}</Text>
        //   </>
        // ),
        // labid: (
        //   <>
        //     <Text level={5}>{item?.labid || "Not Available"}</Text>
        //   </>
        // ),
        price: (
          <>
            <div className="text-[14px]">{item?.price || "Not Available"}</div>
          </>
        ),
        feedback: (
          <>
            <Text level={5}>{item?.feedback || "Not Available"}</Text>
          </>
        ),
      };
      setData((prevData) => [...prevData, newRow]);
    });
  };

  useEffect(() => {
    // console.log(data);
    dataInput(data, setData);
  }, []);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-start gap-2">
      <div className="w-full flex items-center justify-between">
        <img
          src={iCustomerLogo}
          width={250}
          alt="brand-logo"
        />
        <img
          src={rapnetLogo}
          width={125}
          alt="rapnet-logo"
          className="mr-2"
        />
      </div>
      <div className="w-full text-center text-4xl font-bold font-roboto mt-[-3rem]">
        Diamond POC Admin View
      </div>
      <div className="w-full mt-10 px-4">
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          bordered
        />
      </div>
      <div className="p-1"></div>
    </div>
  );
};

export default DiamondAdminComponent;
