import { useContext, useEffect, useState, useCallback } from "react";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/pt-br";
import axios from "axios";
import dayjs from "dayjs";

import { UserContext } from "../context/UserContext";
import { Post } from "../types/Post";

import CreatePostForm from "../components/posts/CreatePostForm";
import DeleteModal from "../components/posts/DeleteModal";
import EditModal from "../components/posts/EditModal";
import PostItem from "../components/posts/PostItem";

dayjs.extend(relativeTime);
dayjs.locale("en-us");

const API = "https://dev.codeleap.co.uk/careers/";

export default function PostsPage() {
  const { username } = useContext(UserContext);

  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const [deletingPost, setDeletingPost] = useState<Post | null>(null);
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get<{ results: Post[] }>(API);
      setPosts(
        data.results.sort(
          (a, b) =>
            new Date(b.created_datetime).getTime() -
            new Date(a.created_datetime).getTime(),
        ),
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleCreate = async () => {
    const payload = {
      username,
      title: title.trim(),
      content: content.trim(),
    };
    const { data: newPost } = await axios.post<Post>(API, payload);
    setPosts((prev) => [newPost, ...prev]);
    setTitle("");
    setContent("");
  };

  const handleDelete = async (id: number) => {
    await axios.delete(`${API}${id}/`);
    setPosts((prev) => prev.filter((p) => p.id !== id));
    setDeletingPost(null);
  };

  const handleSaveEdit = async (
    id: number,
    newTitle: string,
    newContent: string,
  ) => {
    const { data: updated } = await axios.patch<Post>(`${API}${id}/`, {
      title: newTitle,
      content: newContent,
    });
    setPosts((prev) => prev.map((p) => (p.id === id ? updated : p)));
    setEditingPost(null);
  };

  return (
    <>
      <div className="mx-auto my-6 max-w-3xl space-y-8 px-6">
        <CreatePostForm
          title={title}
          content={content}
          onTitleChange={setTitle}
          onContentChange={setContent}
          onSubmit={(e) => {
            e.preventDefault();
            if (title.trim() && content.trim()) handleCreate();
          }}
        />

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          posts.map((post) => (
            <PostItem
              key={post.id}
              post={post}
              currentUser={username}
              onDelete={setDeletingPost}
              onEdit={setEditingPost}
            />
          ))
        )}
      </div>

      {deletingPost && (
        <DeleteModal
          post={deletingPost}
          onCancel={() => setDeletingPost(null)}
          onConfirm={handleDelete}
        />
      )}

      {editingPost && (
        <EditModal
          post={editingPost}
          onCancel={() => setEditingPost(null)}
          onSave={handleSaveEdit}
        />
      )}
    </>
  );
}
