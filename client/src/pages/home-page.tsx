import { useAuthContext } from "@/context/auth-context";

const HomePage = () => {
  const { isLoading, logout } = useAuthContext();

  return (
    <div>
      <h1>HomePage</h1>
      <button onClick={logout}>{isLoading ? "Loading..." : "Logout"}</button>
    </div>
  );
};

export default HomePage;

