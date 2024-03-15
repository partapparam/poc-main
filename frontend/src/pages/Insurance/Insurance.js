import Header from "../../components/Header_POC/Header";
import Insurance from "../../components/Insurance/Insurance";

import { Layout, Affix } from "antd";

const { Header: AntHeader } = Layout;

const Insurance_Page = () => {
  return (
    <>
      <Layout>
        <Affix>
          <AntHeader className="bg-[#f2f2f2] pl-3 mb-4">
            <Header />
          </AntHeader>
        </Affix>
      </Layout>
      <Insurance />
    </>
  );
};

export default Insurance_Page;
