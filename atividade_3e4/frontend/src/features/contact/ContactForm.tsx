import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { useAppDispatch } from "../../hooks/storeHooks";
import { submitContactForm } from "./contactSlice";

export default function ContactForm(): JSX.Element {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [comment, setComment] = useState("")

  const dispatch = useAppDispatch()

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(submitContactForm({ name, email, comment }))
  }

  return (
    <div>
      <Navbar />

      <form onSubmit={submitHandler} className="container mx-auto mt-10" >
        <div className="flex flex-col gap-2 m-2">
          <label htmlFor="contactForm__name">Nome:</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} id="contactForm__name" className="bg-slate-100 p-2" />
        </div>

        <div className="flex flex-col gap-2 m-2">
          <label htmlFor="contactForm__email">Email:</label>
          <input type="text" value={email} onChange={e => setEmail(e.target.value)} id="contactForm__email" className="bg-slate-100 p-2" />
        </div>

        <div className="flex flex-col gap-2 m-2">
          <label htmlFor="contactForm__comment">Comentário:</label>
          <textarea value={comment} onChange={e => setComment(e.target.value)} id="contactForm__comment" className="bg-slate-100 p-2" />
        </div>

        <button type="submit" className="m-2 px-5 py-2 bg-blue-700 text-white hover:bg-blue-900">Enviar</button>
      </form>
    </div>
  )
}