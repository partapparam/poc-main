import { useState, useEffect } from "react";

import Loading from "../../components/Loading/Loading";
import DiamondAdminComponent from '../../components/DiamondAdminComponent/DiamondAdminComponent.js';

import { fetchCalculations } from "../../services/diamondServices.js";

const DiamondAdmin = () => {
  const [data, setData] = useState(null);
  const dataCalc = async () => {
    const diamondData = await fetchCalculations();
    setData(diamondData?.data);
  };
  useEffect(() => {
    dataCalc();
  }, []);
  if (!data) {
    return (
        <Loading />
    );
  } else {
    return (
      <div>
        <DiamondAdminComponent data={data} setData={setData} />
      </div>
    );
  }
};

export default DiamondAdmin;
