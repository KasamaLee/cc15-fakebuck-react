import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from "./hooks/use-auth";
import Route from "./router/Route";
import Loading from "./components/Loading";

function App() {
  const { initialLoading } = useAuth();
  if (initialLoading) {
    return <Loading />
  }
  return (
    <>
      <Route />
      <ToastContainer
      position="bottom-center"
      autoClose={5000}
      theme="colored"
      />
    </>)
}

export default App;