import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"


export default function Contacts(): JSX.Element {

  const [contacts, setContacts] = useState<Contact[]>([])

  useEffect(() => {
    fetch('http://localhost:3000/api/contacts', {
      method: 'GET'
    })
      .then(res => res.json())
      .then(data => setContacts(data))
      .catch(error => console.log(error))

  }, [])
  return (
    <div className="flex flex-col items-center h-full bg-slate-700">
      <Navbar />

      <p className="text-5xl py-10 font-bold font-sans text-white">
        Contatos
      </p>

      <ul className="w-[450px]">
        {contacts.map(({ Name, Age, Email }, key) => (
          <li key={key} className="m-3 p-5 bg-slate-100 shadow-md shadow-slate-400 rounded-md">
            <div className="flex">
              <span className="font-bold w-1/3">Nome:</span> <span>{Name}</span>
            </div>
            <div className="flex">
              <span className="font-bold w-1/3">Idade:</span> <span>{Age}</span>
            </div>
            <div className="flex">
              <span className="font-bold w-1/3">Email:</span> <span>{Email}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}