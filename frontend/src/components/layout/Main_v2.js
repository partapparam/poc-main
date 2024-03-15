import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Layout, Drawer, Affix } from "antd";
import Sidenav_v2 from "./Sidenav_v2";
import Header_v2 from "./Header_v2";
import { UserDetails } from "../../helpers/helpers";
import { useNavigate, Outlet } from 'react-router-dom';

const { Header: AntHeader, Content, Sider } = Layout;

// function Main({ children }) {
function Main_v2({darkMode, updateDarkModeInApp, isPremium}) {

  // const history = useHistory();
  const navigate = useNavigate();

  // console.log(history)

  const userDetails = UserDetails();
  const isLoggedIn = userDetails?.id ? true : false;

  if (!isLoggedIn) {
    // history.push('/login')
    navigate("/login");
  }

  const [visible, setVisible] = useState(false);
  const [placement, setPlacement] = useState("right");
  const [sidenavColor, setSidenavColor] = useState("#01989D");
  const [sidenavType, setSidenavType] = useState("transparent");
  const [fixed, setFixed] = useState(false);

  const openDrawer = () => setVisible(!visible);
  const handleSidenavType = (type) => setSidenavType(type);
  const handleSidenavColor = (color) => setSidenavColor(color);
  const handleFixedNavbar = (type) => setFixed(type);
  const updateDarkMode = (newDarkMode) => {
    updateDarkModeInApp(newDarkMode);
  };
  let { pathname } = useLocation();
  pathname = pathname.replace("/", "");

  useEffect(() => {
    if (pathname === "rtl") {
      setPlacement("left");
    } else {
      setPlacement("right");
    }
  }, [pathname]);

  return (
    <Layout
      className={`layout-dashboard ${
        pathname === "profile" ? "layout-profile" : ""
      } ${pathname === "rtl" ? "layout-dashboard-rtl" : ""} ${darkMode === true ? "dark-theme" : ""}`}
      style={{ background: 'white' }}
    >
      <Drawer
        title={false}
        placement={placement === "right" ? "left" : "right"}
        closable={false}
        onClose={() => setVisible(false)}
        open={visible}
        key={placement === "right" ? "left" : "right"}
        width={250}
        className={`drawer-sidebar ${
          pathname === "rtl" ? "drawer-sidebar-rtl" : ""
        } `}
      >
        <Layout
          className={`layout-dashboard ${
            pathname === "rtl" ? "layout-dashboard-rtl" : ""
          }`}
        >
          <Sider
            trigger={null}
            width={250}
            theme="light"
            className={`sider-primary ant-layout-sider-primary ${
              sidenavType === "#fff" ? "active-route" : ""
            }`}
            style={{ background: sidenavType }}
          >
            <Sidenav_v2 color={sidenavColor} darkMode={darkMode} isPremium={isPremium} />
          </Sider>
        </Layout>
      </Drawer>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        trigger={null}
        width={250}
        theme="light"
        className={`sider-primary ant-layout-sider-primary ${
          sidenavType === "#fff" ? "active-route" : ""
        }`}
        style={{ background: sidenavType }}
      >
        <Sidenav_v2 color={sidenavColor} darkMode={darkMode} isPremium={isPremium} />
      </Sider>
      <Layout>
  <AntHeader className={`${fixed ? "ant-header-fixed" : ""}`}>
    <Header_v2

    />
  </AntHeader>

<Content className="content-ant">
  <Outlet />
</Content>
</Layout>
    </Layout>
  );
}

export default Main_v2;


