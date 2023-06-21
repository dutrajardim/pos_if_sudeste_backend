import { createBrowserRouter } from "react-router-dom"
import ErrorPage from "./pages/ErrorPage"
import CommentsForm from "./features/comments/CommentsForm"

const router = createBrowserRouter([
  {
    path: "/",
    element: <CommentsForm />,
    errorElement: <ErrorPage />
  },
])

export default router