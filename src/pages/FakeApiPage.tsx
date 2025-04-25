import { useEffect, useState } from "react";
import axios from "axios";
import { List, Card, Pagination, Spin, message } from "antd";

interface FakePost {
  id: number;
  title: string;
  body: string;
}

const FakeApiPage = () => {
  const [posts, setPosts] = useState<FakePost[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get<FakePost[]>(
          "https://jsonplaceholder.typicode.com/posts"
        );
        setPosts(response.data);
      } catch (error) {
        message.error("Failed to fetch data from Fake API");
      } finally {
        setTimeout(() => setLoading(false), 500); 
      }
    };

    fetchData();
  }, []);

  const paginatedPosts = posts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div style={{ padding: 24 }}>
      <h1>Posts from Fake API</h1>
      {loading ? (
        <Spin />
      ) : (
        <>
          <List
            grid={{ gutter: 16, column: 1 }}
            dataSource={paginatedPosts}
            renderItem={(item) => (
              <List.Item>
                <Card title={`#${item.id}: ${item.title}`}>
                  {item.body}
                </Card>
              </List.Item>
            )}
          />
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={posts.length}
            onChange={(page) => setCurrentPage(page)}
            style={{ marginTop: 20, textAlign: "center" }}
          />
        </>
      )}
    </div>
  );
};

export default FakeApiPage;
