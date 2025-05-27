import { useContext } from "react";

import { UserProvider, UserContext } from "./context/UserContext";

import SignupModal from "./components/SignupModal";
import PostsPage from "./pages/PostsPage";

function AppContent() {
  const { username } = useContext(UserContext);

  if (!username) {
    return <SignupModal />;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-light-blue text-light px-6 py-4">
        <h1 className="text-xl font-semibold">CodeLeap Network</h1>
      </header>

      <main className="flex-grow bg-white">
        <PostsPage />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}
