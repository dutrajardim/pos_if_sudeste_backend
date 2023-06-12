import { createBrowserRouter } from "react-router-dom"
import App from "./pages/App"
import ErrorPage from "./pages/ErrorPage"
import Contacts from "./pages/Contacts"
import Contact from "./pages/Contact"
import ContactForm from "./features/contact/ContactForm"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />
  },
  {
    path: "/contacts",
    element: <Contacts />,
    errorElement: <ErrorPage />
  },
  {
    path: "/contacts/:id",
    element: <Contact />,
    errorElement: <ErrorPage />
  },
  {
    path: "/contact",
    element: <ContactForm />,
    errorElement: <ErrorPage />
  }
])

export default router