import Header from "../../components/Header_POC/Header.js";

import SemanticSearch from "../../components/SemanticSearch/SemanticSearch.js";

import { Layout, Affix } from "antd";

const { Header: AntHeader } = Layout;

const Semantic = () => {
  return (
    <>
      <Layout>
        <Affix>
          <AntHeader className="bg-[#f2f2f2] pl-3 mb-4">
            <Header />
          </AntHeader>
        </Affix>
      </Layout>

      <SemanticSearch />
    </>
  );
};

export default Semantic;
