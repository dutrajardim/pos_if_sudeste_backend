import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

interface SubmitContactFormInput {
  name: string
  email: string
  comment: string
}

interface ContactInitialState {
  submitContactForm: {
    state: "idle" | "pending" | "fulfilled" | "rejected"
    error: unknown
  }
}

const initialState: ContactInitialState = {
  submitContactForm: {
    state: "idle",
    error: null
  }
}

const submitContactFormName = "contact/fubmitContactForm"
export const submitContactForm = createAsyncThunk(
  submitContactFormName,

  async ({ name, email, comment }: SubmitContactFormInput) => {
    const resp = await fetch(`http://localhost:3000/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, comment })
    })

    const data = await resp.json()
    return data
  }
)

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // --- Submit contact form

    // fulfilled
    builder.addCase(submitContactForm.fulfilled, (state) => {
      state.submitContactForm.state = "fulfilled"
    })

    // rejected
    builder.addCase(submitContactForm.rejected, (state, action) => {
      state.submitContactForm.state = "rejected"
      state.submitContactForm.error = action.error
    })

    // pending
    builder.addCase(submitContactForm.pending, (state) => {
      state.submitContactForm.state = "pending"
    })
  }
})

export default contactSlice.reducer