import { RouterProvider, createBrowserRouter } from "react-router-dom"
import routes from "./routes/index.jsx"
import { Provider } from "react-redux"
import store from "./components/redux/store.js"

export default function App() {

  return (
    <Provider store={store}>

      <RouterProvider router={routes}/>
    </Provider>
  )
  
}