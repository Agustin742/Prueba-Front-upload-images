import { useState } from "react";

const App = () => {

  const [srcImagen, setSrcImagen] = useState('')

  const envioFormulario = async (e) => {
    e.preventDefault()

    console.log('enviando la data...');

    console.log(e.target);

    const formu = e.target
    const formData = new FormData(formu)

    console.log(formData);

    formData.forEach(( valor, clave ) => {
      console.log(clave);
      console.log(valor);
    })

    const urlBack = 'http://localhost:8080/api/v1/uploads/'
    const options = {
      method: 'POST',
      body: formData
    }
    
    try {
      const res = await fetch(urlBack, options)

    if (!res.ok){
      throw new Error('No se pudo subir la imagen')
    }

    const data = await res.json()

    console.log(data);

    setSrcImagen(data.url)

    e.target.reset()

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="container mt-4">
      <h1 className="display-6 text-success">Formulario de Subida de imatgenes</h1>
      <form onSubmit={envioFormulario} className="border border-success rounded p-4">
        <div className="mb-3">

          <label htmlFor="subida-archivos" className="form-label">Subir archvio</label>
          <input type="file" name="archivo" id="subida-archivos" className="form-control" placeholder="Elija un archivo" />

        </div>
        
        <button className="btn btn-success">Enviar</button>

      </form>
      {srcImagen && (
        <img src={srcImagen} alt="" width={200} />
      )}
      
    </div>
  )
}

export default App