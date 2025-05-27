import { useContext, useState, FormEvent } from "react";

import { UserContext } from "../context/UserContext";

import InputField from "./InputField";

export default function SignupModal() {
  const { username, setUsername } = useContext(UserContext);
  const [input, setInput] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    setUsername(trimmed);
  };

  if (username) return null;

  return (
    <section className="fixed inset-0 flex items-center justify-center">
      <div className="w-11/12 max-w-[500px] rounded-xl border border-[#ccc] bg-white p-6">
        <h2 className="mb-6 text-xl font-bold">Welcome to CodeLeap network!</h2>
        <form onSubmit={handleSubmit} className="w-full">
          <label className="block text-sm font-medium">
            Please enter your username
          </label>
          <InputField
            type="text"
            placeholder="John Doe"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              disabled={input.trim() === ""}
              className={`rounded bg-blue-500 px-8 py-1 text-base font-medium uppercase text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-blue-300`}
            >
              Enter
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
