
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar1 from "./components/shared/Navbar1";
import Home from "./components/Home";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";


const appRoute = createBrowserRouter([
  {
    path: "/",
    element:<Home/>
  },
  {
    path: "/login",
    element:<Login/>
  },
  {
    path: "/signup",
    element:<Signup/>
  }
])
function App() {
 
  return (
    <>
      <RouterProvider router={appRoute}/>
    </>
  )
}

export default App
