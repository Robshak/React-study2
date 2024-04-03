import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter, defer } from "react-router-dom";
import { MyError } from "./Layout/Error/Error.tsx";
import { Layout } from "./Layout/Menu/Menu.tsx";
import ProductPage from "./pages/Product/Product.tsx";
import axios from "axios";
import { PREFIX } from "./helpers/API.ts";
import Auth from "./Layout/Auth/Auth.tsx";
import { Login } from "./pages/Login/Login.tsx";
import { Register } from "./pages/Register/Register.tsx";
import { RequireAuth } from "./helpers/RequireAuth.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import Success from "./pages/Success/Success.tsx";
import { Loading } from "./Layout/Loading/Loading.tsx";
// import { BrowserRouter } from "react-router-dom";

const Menu = lazy(() => import("./pages/Menu/Menu"));
const Cart = lazy(() => import("./pages/Cart/Cart"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <RequireAuth><Layout /></RequireAuth>,
    children: [
      {
        path: "/",
        element: <Suspense fallback={<Loading></Loading>}><Menu /></Suspense>
      },
      {
        path: "/Cart",
        element: <Suspense fallback={<Loading></Loading>}><Cart /></Suspense>
      },
      {
        path: "/product/:id",
        element: <ProductPage />,
        errorElement: <MyError />,
        loader: async ({ params }) => {
          return defer({
            data: new Promise((resolve, reject) => {
              setTimeout(() => {
                axios.get(`${PREFIX}/products/${params.id}`).then(data => resolve(data)).catch(e => reject(e));
              }, 2000);
            })
          });
        }
      },
      {
        path: "/success",
        element: <Success />
      }
    ]
  },
  {
    path: "/auth",
    element: <Auth />,
    children: [
      {
        path: "login",
        element: <Login />
      },
      {
        path: "register",
        element: <Register />
      }
    ]
  },
  {
    path: "*",
    element: <MyError />
  }
]);


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </React.StrictMode>
);
