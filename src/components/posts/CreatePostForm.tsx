import { FormEvent } from "react";

import TextAreaField from "../TextAreaField";
import InputField from "../InputField";

interface Props {
  title: string;
  content: string;
  onTitleChange: (v: string) => void;
  onContentChange: (v: string) => void;
  onSubmit: (e: FormEvent) => void;
}

export default function CreatePostForm({
  title,
  content,
  onTitleChange,
  onContentChange,
  onSubmit,
}: Props) {
  return (
    <div className="space-y-4 rounded-xl border border-[#999] bg-white p-6">
      <h3 className="text-xl font-semibold">What’s on your mind?</h3>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <InputField
            type="text"
            placeholder="Hello world"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Content</label>
          <TextAreaField
            placeholder="Content here"
            value={content}
            onChange={(e) => onContentChange(e.target.value)}
            rows={4}
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!title.trim() || !content.trim()}
            className="rounded bg-blue-500 px-6 py-2 font-medium text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-blue-300"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
