import { UserProvider } from "./context/UserContext";

import SignupModal from "./components/SignupModal";

function App() {
  return (
    <UserProvider>
      <SignupModal />
    </UserProvider>
  );
}

export default App;
