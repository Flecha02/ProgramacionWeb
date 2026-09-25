import { useState } from 'react';

const medicamentos = [
  {
    id: 1,
    nombre: 'Paracetamol 500 mg',
    presentacion: '20 tabletas',
    laboratorio: 'Laboratorio Demo',
    precios: [
      {
        farmacia: 'Farmacia Guatemala',
        pais: 'Guatemala',
        precio: 32.50
      },
      {
        farmacia: 'Farmacia Central',
        pais: 'Guatemala',
        precio: 27.90
      },
      {
        farmacia: 'Farmacia El Salvador',
        pais: 'El Salvador',
        precio: 21.75
      }
    ]
  },
  {
    id: 2,
    nombre: 'Amoxicilina 500 mg',
    presentacion: '20 cápsulas',
    laboratorio: 'Laboratorio Demo',
    precios: [
      {
        farmacia: 'Farmacia Guatemala',
        pais: 'Guatemala',
        precio: 68.75
      },
      {
        farmacia: 'Farmacia Central',
        pais: 'Guatemala',
        precio: 59.50
      },
      {
        farmacia: 'Farmacia El Salvador',
        pais: 'El Salvador',
        precio: 46.25
      }
    ]
  },
  {
    id: 3,
    nombre: 'Ibuprofeno 400 mg',
    presentacion: '20 tabletas',
    laboratorio: 'Laboratorio Demo',
    precios: [
      {
        farmacia: 'Farmacia Guatemala',
        pais: 'Guatemala',
        precio: 45.25
      },
      {
        farmacia: 'Farmacia Central',
        pais: 'Guatemala',
        precio: 39.90
      },
      {
        farmacia: 'Farmacia El Salvador',
        pais: 'El Salvador',
        precio: 31.50
      }
    ]
  },
  {
    id: 4,
    nombre: 'Loratadina 10 mg',
    presentacion: '10 tabletas',
    laboratorio: 'Laboratorio Demo',
    precios: [
      {
        farmacia: 'Farmacia Guatemala',
        pais: 'Guatemala',
        precio: 38.25
      },
      {
        farmacia: 'Farmacia Central',
        pais: 'Guatemala',
        precio: 34.50
      },
      {
        farmacia: 'Farmacia El Salvador',
        pais: 'El Salvador',
        precio: 28.75
      }
    ]
  }
];

export default function ModuloCompararPrecios() {

  const [busqueda, setBusqueda] = useState('');
  const [medicamentoSeleccionado, setMedicamentoSeleccionado] =
    useState(medicamentos[0]);

  const buscarMedicamento = (e) => {
    e.preventDefault();

    const encontrado = medicamentos.find((med) =>
      med.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    if (encontrado) {
      setMedicamentoSeleccionado(encontrado);
    } else {
      setMedicamentoSeleccionado(null);
    }
  };

  const seleccionarMedicamento = (med) => {
    setMedicamentoSeleccionado(med);
    setBusqueda(med.nombre);
  };

  const preciosOrdenados = medicamentoSeleccionado
    ? [...medicamentoSeleccionado.precios].sort(
        (a, b) => a.precio - b.precio
      )
    : [];

  const precioMasBajo =
    preciosOrdenados.length > 0 ? preciosOrdenados[0].precio : 0;

  const precioMasAlto =
    preciosOrdenados.length > 0
      ? preciosOrdenados[preciosOrdenados.length - 1].precio
      : 0;

  const ahorro = precioMasAlto - precioMasBajo;

  return (
    <div
      style={{
        maxWidth: '1100px',
        margin: '0 auto',
        fontFamily: 'system-ui, sans-serif',
        padding: '20px'
      }}
    >

      {/* ENCABEZADO */}

      <section
        style={{
          background: '#b71c1c',
          color: 'white',
          padding: '30px',
          borderRadius: '10px',
          marginBottom: '25px'
        }}
      >
        <h1 style={{ margin: 0 }}>
           Comparador de precios de medicamentos
        </h1>

        <p
          style={{
            marginTop: '10px',
            marginBottom: 0,
            lineHeight: '1.5'
          }}
        >
          Consulta precios de un mismo medicamento en diferentes
          establecimientos y compara dónde puede encontrarse a menor costo.
        </p>
      </section>

   

      <section
        style={{
          background: 'white',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '20px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.08)'
        }}
      >

        <h2 style={{ marginTop: 0 }}>
          Buscar medicamento
        </h2>

        <form
          onSubmit={buscarMedicamento}
          style={{
            display: 'flex',
            gap: '10px',
            flexWrap: 'wrap'
          }}
        >

          <input
            type="text"
            placeholder="Ejemplo: Paracetamol"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            style={{
              flex: 1,
              minWidth: '250px',
              padding: '12px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              fontSize: '15px'
            }}
          />

          <button
            type="submit"
            style={{
              background: '#b71c1c',
              color: 'white',
              border: 'none',
              padding: '12px 25px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Comparar precios
          </button>

        </form>

        <div
          style={{
            display: 'flex',
            gap: '8px',
            marginTop: '15px',
            flexWrap: 'wrap'
          }}
        >

          {medicamentos.map((med) => (

            <button
              key={med.id}
              onClick={() => seleccionarMedicamento(med)}
              style={{
                border: '1px solid #ddd',
                background: '#f7f7f7',
                padding: '7px 12px',
                borderRadius: '20px',
                cursor: 'pointer'
              }}
            >
              {med.nombre}
            </button>

          ))}

        </div>

      </section>

      {!medicamentoSeleccionado && (

        <div
          style={{
            background: '#ffebee',
            color: '#b71c1c',
            padding: '15px',
            borderRadius: '8px'
          }}
        >
          ⚠️ No se encontró el medicamento solicitado.
        </div>

      )}

      {medicamentoSeleccionado && (

        <>

          {/* INFORMACIÓN DEL PRODUCTO */}

          <section
            style={{
              background: 'white',
              padding: '20px',
              borderRadius: '8px',
              marginBottom: '20px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.08)'
            }}
          >

            <h2
              style={{
                color: '#b71c1c',
                marginTop: 0
              }}
            >
              {medicamentoSeleccionado.nombre}
            </h2>

            <p>
              <strong>Presentación:</strong>{' '}
              {medicamentoSeleccionado.presentacion}
            </p>

            <p>
              <strong>Fabricante:</strong>{' '}
              {medicamentoSeleccionado.laboratorio}
            </p>

          </section>

          {/* RESUMEN */}

          <section
            style={{
              display: 'grid',
              gridTemplateColumns:
                'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '15px',
              marginBottom: '20px'
            }}
          >

            <div
              style={{
                background: '#e8f5e9',
                padding: '20px',
                borderRadius: '8px'
              }}
            >
              <small>Precio más bajo</small>

              <h2
                style={{
                  color: '#2e7d32',
                  margin: '5px 0'
                }}
              >
                Q{precioMasBajo.toFixed(2)}
              </h2>
            </div>

            <div
              style={{
                background: '#ffebee',
                padding: '20px',
                borderRadius: '8px'
              }}
            >
              <small>Precio más alto</small>

              <h2
                style={{
                  color: '#b71c1c',
                  margin: '5px 0'
                }}
              >
                Q{precioMasAlto.toFixed(2)}
              </h2>
            </div>

            <div
              style={{
                background: '#fff3e0',
                padding: '20px',
                borderRadius: '8px'
              }}
            >
              <small>Ahorro posible</small>

              <h2
                style={{
                  color: '#e65100',
                  margin: '5px 0'
                }}
              >
                Q{ahorro.toFixed(2)}
              </h2>
            </div>

          </section>

          {/* TABLA */}

          <section
            style={{
              background: 'white',
              padding: '20px',
              borderRadius: '8px',
              overflowX: 'auto',
              boxShadow: '0 2px 5px rgba(0,0,0,0.08)'
            }}
          >

            <h2 style={{ marginTop: 0 }}>
              Comparación de precios
            </h2>

            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse'
              }}
            >

              <thead>

                <tr
                  style={{
                    background: '#b71c1c',
                    color: 'white'
                  }}
                >

                  <th style={{ padding: '12px', textAlign: 'left' }}>
                    Establecimiento
                  </th>

                  <th style={{ padding: '12px', textAlign: 'left' }}>
                    País
                  </th>

                  <th style={{ padding: '12px', textAlign: 'left' }}>
                    Precio
                  </th>

                  <th style={{ padding: '12px', textAlign: 'left' }}>
                    Diferencia
                  </th>

                </tr>

              </thead>

              <tbody>

                {preciosOrdenados.map((item, index) => {

                  const diferencia =
                    item.precio - precioMasBajo;

                  return (

                    <tr
                      key={index}
                      style={{
                        background:
                          index === 0
                            ? '#e8f5e9'
                            : 'white',
                        borderBottom: '1px solid #ddd'
                      }}
                    >

                      <td
                        style={{
                          padding: '12px',
                          fontWeight:
                            index === 0
                              ? 'bold'
                              : 'normal'
                        }}
                      >

                        {item.farmacia}

                        {index === 0 && (
                          <span
                            style={{
                              marginLeft: '8px',
                              background: '#2e7d32',
                              color: 'white',
                              padding: '3px 7px',
                              borderRadius: '10px',
                              fontSize: '11px'
                            }}
                          >
                            MÁS BARATO
                          </span>
                        )}

                      </td>

                      <td style={{ padding: '12px' }}>
                        {item.pais}
                      </td>

                      <td
                        style={{
                          padding: '12px',
                          fontWeight: 'bold'
                        }}
                      >
                        Q{item.precio.toFixed(2)}
                      </td>

                      <td style={{ padding: '12px' }}>

                        {diferencia === 0
                          ? 'Mejor precio'
                          : `+ Q${diferencia.toFixed(2)}`}

                      </td>

                    </tr>

                  );

                })}

              </tbody>

            </table>

          </section>

          {/* AVISO */}

          <div
            style={{
              marginTop: '20px',
              padding: '15px',
              borderRadius: '8px',
              background: '#fff8e1',
              color: '#5d4037',
              fontSize: '14px'
            }}
          >
            ⚠️ <strong>Prototipo académico:</strong> los precios
            presentados son datos simulados y únicamente demuestran
            cómo funcionaría un sistema real de comparación.
          </div>

        </>

      )}

    </div>
  );
}