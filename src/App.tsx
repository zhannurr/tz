import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import BlogPage  from "./pages/BlogPage";
import PostDetail  from "./pages/PostDetail";

import FakeApiPage from "./pages/FakeApiPage";
import AppHeader from "./components/Header";

const { Content } = Layout;

function App() {
  return (
    <Router>
      <Layout>
        <AppHeader />
        <Content>
          {
          <Routes>
            <Route path="/" element={<BlogPage/>} />
            <Route path="/posts/:id" element={<PostDetail/>} />
            <Route path="/fake-api" element={<FakeApiPage />} />
          </Routes>
          }
        </Content>
      </Layout>
    </Router>
  );
}

export default App;
