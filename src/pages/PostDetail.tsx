import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Input, message, Spin, Card, notification } from "antd";

import { BlogPost } from '../types/blog';  

const PostDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    setLoading(true);
    const postsFromStorage = localStorage.getItem("blogPosts");
    if (postsFromStorage) {
      const posts: BlogPost[] = JSON.parse(postsFromStorage);
      const found = posts.find((p) => p.id === Number(id));
      if (found) {
        setPost(found);
        setTitle(found.title);
        setText(found.text);
      } else {
        message.error("Post not found");
      }
    }
    setTimeout(() => setLoading(false), 500);
  }, [id]);

  const handleUpdate = () => {
    if (!title || !text) {
      message.error("Please fill in both fields");
      return;
    }
  
    const postsFromStorage = localStorage.getItem("blogPosts");
    if (postsFromStorage) {
      const posts: BlogPost[] = JSON.parse(postsFromStorage);
      const updated = posts.map((p) =>
        p.id === Number(id) ? { ...p, title, text } : p
      );
      localStorage.setItem("blogPosts", JSON.stringify(updated));
      notification.success({
        message: "Success",
        description: "Post updated successfully",
        placement: "topRight",
      });
      setTimeout(() => {
        navigate("/");
      }, 5000);
    }
  };
  const handleDelete = () => {
     const postsFromStorage = localStorage.getItem("blogPosts");
     if (postsFromStorage) {
      const posts: BlogPost[] = JSON.parse(postsFromStorage);
      const updated = posts.map((p) =>
       p.id === Number(id) ? { ...p, deleted: true } : p
      );
      localStorage.setItem("blogPosts", JSON.stringify(updated));
      message.success("Post deleted");
      navigate("/");
     }
    };
    

  if (loading) return <Spin />;

  if (!post) return <p>Post not found</p>;

  return (
    <Card title={`Post #${post.id}`} style={{ padding: 24 }}>
      {editMode ? (
        <>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Edit title"
            style={{ marginBottom: 8 }}
          />
          <Input.TextArea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Edit text"
            rows={4}
            style={{ marginBottom: 8 }}
          />
          <Button type="primary" onClick={handleUpdate} style={{ marginRight: 8 }}>
            Save
          </Button>
          <Button onClick={() => setEditMode(false)}>Cancel</Button>
        </>
      ) : (
        <>
          <h2>{post.title}</h2>
          <p>{post.text}</p>
          <Button type="primary" onClick={() => setEditMode(true)} style={{ marginRight: 8 }}>
            Edit
          </Button>
          <Button danger onClick={handleDelete}>
            Delete
          </Button>
        </>
      )}
    </Card>
  );
};

export default PostDetailPage;
