import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import AddCoins from "./pages/AddCoins/AddCoins";
import Navbar from "./components/Navbar/Navbar";


const Layout = () => {
  return (
    <div className="app">
      <Navbar/>
      <Outlet/>
    </div>
  )
}




const router = createBrowserRouter([
    {
      path: "/",
      element:<Layout/>,
      children: [
        {
          path: "/",
          element:<Home/>
        },
        {
          path: "/addCoins",
          element:<AddCoins/>
        }
      ]
    },
]);
  

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
