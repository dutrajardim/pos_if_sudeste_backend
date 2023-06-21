import { SerializedError, createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../store"

interface Comment {
  _id: string
  comment: string,
  user: {
    email: string,
    name: string
  }
}

interface CommentsInitialState {
  dict: Record<string, Comment>
  lastSaved: Comment | null
  fetchComments: AsyncThunkState
  submitComment: AsyncThunkState
}

interface AsyncThunkState {
  state: "idle" | "pending" | "fulfilled" | "rejected"
  error: null | SerializedError
}

const initialState: CommentsInitialState = {
  dict: {},
  lastSaved: null,
  fetchComments: {
    state: 'idle',
    error: null
  },
  submitComment: {
    state: 'idle',
    error: null
  },
}

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",

  async () => {
    const resp = await fetch(`http://localhost:3000/api/comments`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })

    const comments = await resp.json() as Comment[]
    return comments.reduce((acc, cur) => (acc[cur._id] = cur, acc), {} as Record<string, Comment>)
  }
)

interface SubmitCommentInput {
  email: string
  password: string
  comment: string
}

export const submitComment = createAsyncThunk(
  "comments/submitComment",

  async ({ email, password, comment }: SubmitCommentInput) => {
    const resp = await fetch(`http://localhost:3000/api/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        comment,
        email,
        password: btoa(password)
      })
    })

    const saved = await resp.json() as Comment
    return saved
  }
)

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // --- Fetch comments

    // fulfilled
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.dict = action.payload
      state.fetchComments.state = "fulfilled"
    })

    // rejected
    builder.addCase(fetchComments.rejected, (state, action) => {
      state.fetchComments.state = "rejected"
      state.fetchComments.error = action.error
    })

    // pending
    builder.addCase(fetchComments.pending, (state) => {
      state.fetchComments.state = "pending"
    })

    // --- Submit comment

    // fulfilled
    builder.addCase(submitComment.fulfilled, (state, action) => {
      state.lastSaved = action.payload
      state.submitComment.state = "fulfilled"
    })

    // rejected
    builder.addCase(submitComment.rejected, (state, action) => {
      state.submitComment.state = "rejected"
      state.submitComment.error = action.error
    })

    // pending
    builder.addCase(submitComment.pending, (state) => {
      state.lastSaved = null
      state.submitComment.state = "pending"
    })
  }
})

const selectDict = (store: RootState) => store.comments.dict
const selectById = (_: RootState, id: string) => id

export const selectComments = createSelector(selectDict, (dict) => Object.keys(dict))
export const selectCommentById = createSelector(selectDict, selectById, (dict, id) => dict[id])
export const selectLastSavedComment = (store: RootState) => store.comments.lastSaved
export const selectSubmitCommentError = (store: RootState) => store.comments.submitComment.error

export default commentsSlice.reducer