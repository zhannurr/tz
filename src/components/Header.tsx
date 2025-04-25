import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

const { Header } = Layout;

const AppHeader = () => (
  <Header>
    <Menu theme="dark" mode="horizontal">
      <Menu.Item key="blog">
        <Link to="/">Blog</Link>
      </Menu.Item>
      <Menu.Item key="fake-api">
        <Link to="/fake-api">Fake API</Link>
      </Menu.Item>
    </Menu>
  </Header>
);

export default AppHeader;
