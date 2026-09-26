import { useState } from "react";
import { ubicaciones } from "../data/ubicaciones";

export default function ModuloUbicaciones() {

    const [departamento, setDepartamento] = useState("");
    const [municipio, setMunicipio] = useState("");
    const [resultados, setResultados] = useState([]);


    const departamentos = [
        ...new Set(
            ubicaciones.map(
                (ubicacion) => ubicacion.departamento
            )
        )
    ];


    const municipios = departamento
        ? [
            ...new Set(
                ubicaciones
                .filter(
                    (ubicacion) =>
                        ubicacion.departamento === departamento
                )
                .map(
                    (ubicacion) =>
                        ubicacion.municipio
                )
            )
        ]
        : [];


    function buscarLugares(){

        const lugaresEncontrados = ubicaciones.filter(
            (ubicacion) =>
                ubicacion.departamento === departamento &&
                ubicacion.municipio === municipio
        );


        setResultados(lugaresEncontrados);

    }


    return (

        <div className="contenedor">


            <h2>
                📍 Ubicaciones seguras
            </h2>


            <p>
                Busque lugares autorizados para adquirir medicamentos.
            </p>



            <label>
                Departamento:
            </label>

            <select
                value={departamento}
                onChange={(e)=>{

                    setDepartamento(e.target.value);

                    setMunicipio("");

                    setResultados([]);

                }}
            >

                <option value="">
                    Seleccione departamento
                </option>


                {
                    departamentos.map((dep)=>(

                        <option 
                            key={dep}
                            value={dep}
                        >
                            {dep}
                        </option>

                    ))
                }


            </select>



            <label>
                Municipio:
            </label>


            <select

                value={municipio}

                onChange={(e)=>
                    setMunicipio(e.target.value)
                }

                disabled={!departamento}

            >

                <option value="">
                    Seleccione municipio
                </option>


                {
                    municipios.map((mun)=>(

                        <option
                            key={mun}
                            value={mun}
                        >
                            {mun}
                        </option>

                    ))
                }


            </select>



            <button
                onClick={buscarLugares}
                disabled={!municipio}
            >

                Buscar lugares

            </button>



            <div className="resultados">


                {
                    resultados.length > 0 ? (

                        resultados.map((lugar)=>(

                            <div 
                                className="tarjeta"
                                key={lugar.nombre}
                            >

                                <h3>
                                    🏥 {lugar.nombre}
                                </h3>


                                <p>
                                    Tipo: {lugar.tipo}
                                </p>


                                <p>
                                    Dirección: {lugar.direccion}
                                </p>


                                <p>
                                    Estado:
                                    {" "}
                                    ✅ {lugar.estado}
                                </p>


                            </div>

                        ))

                    ) : (

                        <p>
                            Realice una búsqueda para mostrar lugares.
                        </p>

                    )
                }


            </div>



            <div className="mapa">

                <h3>
                    🗺️ Mapa visual
                </h3>

                {

                    resultados.map((lugar)=>(

                        <p key={lugar.nombre}>
                            📍 {lugar.nombre}
                        </p>

                    ))

                }


            </div>



            <style>{`

                .contenedor{

                    max-width:800px;
                    margin:30px auto;
                    padding:25px;
                    background:white;
                    border-radius:10px;
                    border:1px solid #ddd;

                }


                select, button{

                    width:100%;
                    padding:12px;
                    margin:10px 0;

                }


                button{

                    background:#1976d2;
                    color:white;
                    border:none;
                    cursor:pointer;

                }


                .tarjeta{

                    padding:15px;
                    margin-top:15px;
                    border-radius:8px;
                    background:#f5f5f5;
                    border-left:5px solid #1976d2;

                }


                .mapa{

                    margin-top:25px;
                    padding:20px;
                    background:#e8f5e9;
                    border-radius:10px;

                }

            `}</style>


        </div>

    );

}