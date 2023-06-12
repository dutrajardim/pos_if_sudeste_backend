import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Navbar from "../components/Navbar"

export default function Contact(): JSX.Element {
  const { id } = useParams()
  const [contact, setContact] = useState<Contact | null>(null)

  useEffect(() => {
    if (id)
      fetch(`http://localhost:3000/api/contacts/${id}`)
        .then(async (res) => {
          const data = await res.json()
          if (res.ok)
            setContact(data)
          else alert(data.message)
        })
        .catch(err => console.log(err))
  }, [id])

  return (
    <div className="flex flex-col items-center h-full bg-slate-700 text-white">
      <Navbar />
      {contact && (
        <div className="p-10 flex flex-col w-[450px]">
          <div className="bg-slate-600 m-3 p-5 flex">
            <span className="w-1/3">Nome:</span><span>{contact.Name}</span>
          </div>
          <div className="bg-slate-600 m-3 p-5 flex">
            <span className="w-1/3">Email:</span><span>{contact.Email}</span>
          </div>
          <div className="bg-slate-600 m-3 p-5 flex">
            <span className="w-1/3">Idade:</span><span>{contact.Age}</span>
          </div>
        </div>
      )}
    </div>
  )
}