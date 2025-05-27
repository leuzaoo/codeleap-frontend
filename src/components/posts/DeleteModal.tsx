import { Post } from "../../types/Post";

interface Props {
  post: Post;
  onCancel: () => void;
  onConfirm: (id: number) => void;
}

export default function DeleteModal({ post, onCancel, onConfirm }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="w-11/12 max-w-md rounded-xl bg-white p-6">
        <h3 className="mb-4 text-lg font-semibold">
          Are you sure you want to delete this item?
        </h3>
        <p className="mb-6 text-sm text-gray-700">“{post.title}”</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="rounded-lg border border-[#999] px-8 py-1 font-bold transition hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(post.id)}
            className="rounded-lg bg-red-500 px-8 py-1 text-white transition hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
