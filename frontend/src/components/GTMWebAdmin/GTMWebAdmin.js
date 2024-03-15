import { useEffect, useState } from "react";

import { getSiteInfo } from "../../services/gtmJSServices";

import { Select, Table, Typography } from "antd";

const { Text } = Typography;
const columns = [
  {
    title: "Site Link",
    key: "site_name",
    dataIndex: "site_name",
  },
  {
    title: "Client IP",
    key: "ip",
    dataIndex: "ip",
  },
  {
    title: "Timestamp",
    key: "timestamp",
    dataIndex: "timestamp",
  },
];
const formatDate = (dateString) => {
  const options = {
    month: "2-digit",
    day: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString("en-US", options);
  return formattedDate;
};

const GTMWebAdmin = () => {
  const [data, setData] = useState(null);
  const [uniqueSites, setUniqueSites] = useState([]);
  const [mainData, setMainData] = useState([]);

  const uSites = [];
  const fetchData = async () => {
    setData([]);
    const response = await getSiteInfo({});
    // console.log(response.data.siteInfo);
    const data = response.data.siteInfo;
    setMainData(data);
    data.forEach((item, index) => {
      const newRow = {
        key: `${item?.id}_${index}`,
        site_id: (
          <>
            <Text level={5}>{item?.site_id || "Not Available"}</Text>
          </>
        ),
        site_name: (
          <>
            <Text level={5}>{item?.site_name || "Not Available"}</Text>
          </>
        ),
        ip: (
          <>
            <Text level={5}>{item?.ip || "Not Available"}</Text>
          </>
        ),
        timestamp: (
          <>
            <Text level={5}>
              {item?.timestamp ? formatDate(item?.timestamp) : "Not Available"}
            </Text>
          </>
        ),
      };
      setData((prevData) => [...prevData, newRow]);
      const valueExists = uSites.some((obj) => obj.value === item.site_id);
      if (!valueExists) {
        uSites.push({ label: item.site_name, value: item.site_id });
      }
      setUniqueSites(uSites);
    });
    setUniqueSites((prevSites) => [
      { value: "00", label: "All Sites" },
      ...prevSites,
    ]);
    // console.log(uniqueSites);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSelectChange = (siteID) => {
    // console.log(e);
    setData([]);
    if (siteID === "00") {
      mainData.forEach((item, index) => {
        const newRow = {
          key: `${item?.id}_${index}`,
          site_id: (
            <>
              <Text level={5}>{item?.site_id || "Not Available"}</Text>
            </>
          ),
          site_name: (
            <>
              <Text level={5}>{item?.site_name || "Not Available"}</Text>
            </>
          ),
          ip: (
            <>
              <Text level={5}>{item?.ip || "Not Available"}</Text>
            </>
          ),
          timestamp: (
            <>
              <Text level={5}>
                {item?.timestamp ? formatDate(item?.timestamp) : "Not Available"}
              </Text>
            </>
          ),
        };
        setData((prevData) => [...prevData, newRow]);
      });
    } else {
      mainData.forEach((item, index) => {
        if (item.site_id === siteID) {
          const newRow = {
            key: `${item?.id}_${index}`,
            site_name: (
              <>
                <Text level={5}>{item?.site_name || "Not Available"}</Text>
              </>
            ),
            ip: (
              <>
                <Text level={5}>{item?.ip || "Not Available"}</Text>
              </>
            ),
            timestamp: (
              <>
                <Text level={5}>
                  {item?.timestamp
                    ? formatDate(item?.timestamp)
                    : "Not Available"}
                </Text>
              </>
            ),
          };
          setData((prevData) => [...prevData, newRow]);
        }
      });
    }
  };

  return (
    <div className="h-screen w-full py-5 px-12 relative">
      <Select
        className="absolute right-10 top-11 w-[15%]"
        options={uniqueSites}
        defaultValue={{
          value: "00",
          label: "All Sites",
        }}
        onChange={handleSelectChange}
      />
      <div className="flex justify-center items-center text-4xl text-black my-5">
        GTM WEB ADMIN
      </div>
      <Table
        columns={columns}
        dataSource={data}
        bordered
        pagination={false}
        className="px-40"
      />
    </div>
  );
};

export default GTMWebAdmin;
