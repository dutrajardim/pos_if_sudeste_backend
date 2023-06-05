import { useState } from "react"

function App() {
  const [values, setValues] = useState("")
  const [lastSum, setLastSum] = useState()

  const sum = () => {
    const numbers = values.replace(/\s/g, '').split(',').map(v => parseInt(v, 10))
    if (numbers.every(v => typeof v === 'number'))
      fetch("http://localhost:3000/api/sum", {
        body: JSON.stringify(numbers),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
        .then(async (res) => {
          const data = await res.json()
          if (res.ok)
            setLastSum(data.result)
          else alert(data.message)
        })
        .catch(err => console.log(err))
    else alert("É necessário valores uma lista de valores inteiros separados por vírgula!")
  }

  return (
    <div className="flex flex-col items-center h-full bg-slate-700 text-white">
      <p className="text-5xl py-10 font-bold font-sans text-white">
        Página principal
      </p>
      <div className="flex flex-col gap-3">
        <span>Insira valores numéricos separados por vírgula:</span>
        <input type="text" placeholder="Ex. 1,2,3,76" className="p-2 text-slate-800" onChange={el => setValues(el.target.value)} value={values} />
        <button onClick={sum} className="m-3 p-3 bg-blue-200 text-gray-700 hover:bg-blue-400">Somar</button>
      </div>
      {lastSum && (
        <div>
          <span className="pr-5">Ultima resposta:</span>
          <span>{lastSum}</span>
        </div>
      )}
    </div>
  )
}

export default App
