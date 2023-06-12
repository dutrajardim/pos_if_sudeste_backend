import { Link } from "react-router-dom";

export default function Navbar(): JSX.Element {

  return (
    <div className="px-5 bg-slate-100 mb-3 w-full">
      <ul className="flex flex-row justify-center">
        <li><Link to="/" className="px-5 block py-3 text-black hover:text-blue-700">Home</Link></li>
        <li><Link to="/contacts" className="px-5 block py-3 text-black hover:text-blue-700">Contatos</Link></li>
        <li><Link to="/contact" className="px-5 block py-3 text-black hover:text-blue-700">Contato</Link></li>
      </ul>
    </div>
  )
}