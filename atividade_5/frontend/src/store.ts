import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit"
import commentsReducer from "./features/comments/commentsSlice"
import commentsListener from "./features/comments/listener"

const listener = createListenerMiddleware()
commentsListener(listener.startListening)

const store = configureStore({
  reducer: {
    comments: commentsReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(listener.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStartListening = typeof listener.startListening

export default store