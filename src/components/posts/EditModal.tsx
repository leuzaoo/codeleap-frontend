import { useState, FormEvent } from "react";

import { Post } from "../../types/Post";

import TextAreaField from "../TextAreaField";
import InputField from "../InputField";

interface Props {
  post: Post;
  onCancel: () => void;
  onSave: (id: number, title: string, content: string) => void;
}

export default function EditModal({ post, onCancel, onSave }: Props) {
  const [newTitle, setNewTitle] = useState<string>(post.title);
  const [newContent, setNewContent] = useState<string>(post.content);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedTitle = newTitle.trim();
    const trimmedContent = newContent.trim();
    if (!trimmedTitle || !trimmedContent) return;
    onSave(post.id, trimmedTitle, trimmedContent);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="w-11/12 max-w-md rounded-xl bg-white p-6">
        <h3 className="mb-4 text-2xl font-bold">Edit item</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Title</label>
            <InputField
              type="text"
              placeholder="Hello world"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Content</label>
            <TextAreaField
              placeholder="Content here"
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              rows={4}
            />
          </div>
          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="rounded-lg border border-[#999] px-8 py-1 font-medium transition hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!newTitle.trim() || !newContent.trim()}
              className={
                `rounded-lg px-8 py-1 font-medium text-white transition ` +
                `bg-green-500 hover:bg-green-600` +
                `disabled:cursor-not-allowed disabled:bg-green-300`
              }
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
