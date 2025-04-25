import { useEffect, useState } from "react";
import { Button, Input, message, Card, Pagination, Spin, notification } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

import { BlogPost } from '../types/blog';  
 

const BlogPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const postsPerPage = 10;

  const navigate = useNavigate();

  const location = useLocation();


  useEffect(() => {
    const storedPosts = localStorage.getItem("blogPosts");
    if (storedPosts) {
        const parsed = JSON.parse(storedPosts).filter((p: BlogPost) => !p.deleted);
        setPosts(parsed);
    }

  }, [location]); 

  useEffect(() => {
    if (posts.length > 0) {
      localStorage.setItem("blogPosts", JSON.stringify(posts));
    }
  }, [posts]);

  const handleCreatePost = () => {
    if (!title || !text) {
      message.error("Please fill in both fields");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const newPost: BlogPost = {
        id: Date.now(),
        title,
        text,
      };
      setPosts([newPost, ...posts]);
      setTitle("");
      setText("");

      notification.success({
        message: "Post created successfully", 
        description: "Your new post has been created", 
      });

      setLoading(false);
    }, );
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts
  .filter(post => !post.deleted)
  .slice(indexOfFirstPost, indexOfLastPost);
  return (
    <div style={{ padding: 24 }}>
      <h1>User Data Manager Blog</h1>
      <Card title="Add New Post" style={{ marginBottom: 24 }}>
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ marginBottom: 12 }}
        />
        <Input.TextArea
          placeholder="Text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          style={{ marginBottom: 12 }}
        />
        <Button type="primary" onClick={handleCreatePost} loading={loading}>
          Create Post
        </Button>
      </Card>

      <h2>Posts</h2>
      {loading ? (
        <Spin />
      ) : (
        currentPosts.map((post) => (
          <Card
            key={post.id}
            title={post.title}
            style={{ marginBottom: 16 }}
            actions={[
              <Button onClick={() => navigate(`/posts/${post.id}`, { state: post })}>
                View
              </Button>
            ]}
          >
            <p>{post.text}</p>

          </Card>
        ))
      )}

      <Pagination
        current={currentPage}
        pageSize={postsPerPage}
        total={posts.length}
        onChange={(page) => setCurrentPage(page)}
        style={{ marginTop: 24 }}
      />
    </div>
  );
};

export default BlogPage;
