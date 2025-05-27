import dayjs from "dayjs";

import { Post } from "../../types/Post";

interface Props {
  post: Post;
  currentUser: string;
  onEdit: (post: Post) => void;
  onDelete: (post: Post) => void;
}

export default function PostItem({
  post,
  currentUser,
  onEdit,
  onDelete,
}: Props) {
  const isOwner = post.username === currentUser;

  return (
    <div className="overflow-hidden rounded-xl border bg-white">
      <div className="bg-light-blue flex items-center justify-between px-6 py-3 text-white">
        <h4 className="text-2xl font-semibold">{post.title}</h4>
        {isOwner && (
          <div className="space-x-2">
            <button
              onClick={() => onDelete(post)}
              className="hover:text-red-200"
            >
              🗑️
            </button>
            <button
              onClick={() => onEdit(post)}
              className="hover:text-yellow-200"
            >
              ✏️
            </button>
          </div>
        )}
      </div>
      <div className="space-y-2 px-6 py-4 text-lg">
        <div className="flex justify-between">
          <p className="font-bold text-gray-600">@{post.username}</p>
          <p className="text-gray-500">
            {dayjs(post.created_datetime).fromNow()}
          </p>
        </div>
        <p>{post.content}</p>
      </div>
    </div>
  );
}
