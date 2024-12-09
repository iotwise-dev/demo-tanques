import React from 'react'
import { Chart } from './components/Chart'
import { Database } from './services/database.service.js'

export const App = () => {

  const formatDate = (timestamp) => {
    const dateObject = new Date(timestamp)

    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const day = String(dateObject.getDate()).padStart(2, '0');
    const hours = String(dateObject.getHours()).padStart(2, '0');
    const minutes = String(dateObject.getMinutes()).padStart(2, '0');
    const seconds = String(dateObject.getSeconds()).padStart(2, '0');

    // Format the date as desired
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    return formattedDate

  }

  const [lastState, setLastState] = React.useState({x:0, y: 0})
  const [activo, setActivo] = React.useState([{x:0, y: 0}])
  const [nivel, setNivel] = React.useState([{x:0, y: 0}])
  const [alto, setAlto] = React.useState([{x:0, y: 0}])
  const [medio, setMedio] = React.useState([{x:0, y: 0}])
  const [bajo, setBajo] = React.useState([{x:0, y: 0}])

  React.useEffect(() => {
    Database.onValue('test', 20, (data) => {
      data = Object.values(data)

      setLastState(data[data.length-1])

      setActivo(data.map(item => {
        return {
          x: formatDate(item['timestamp']),
          y: item['Activación'] === 1 ? 2 : 0
          
        }
      }))

      setNivel(data.map(item => {
        return {
          x: formatDate(item['timestamp']),
          y: 3 - item['Alto'] - item['Medio'] - item['bajo']
          
        }
      }))

      setAlto(data.map(item => {
        return {
          x: formatDate(item['timestamp']),
          y: item['Alto']
          
        }
      }))

      setMedio(data.map(item => {
        return {
          x: formatDate(item['timestamp']),
          y: item['Medio']
          
        }
      }))

      setBajo(data.map(item => {
        return {
          x: formatDate(item['timestamp']),
          y: item['bajo']
          
        }
      }))
    })
  }, [])

  return (
    <>
      <div className='py-4 text-center'>
        <h3>Monitoreo de Tanques de Agua</h3>
        <h5>(Aplicación Demo)</h5>
      </div>

      <div className='row pb-5'>
        <div className='text-center pt-3 text-light col-12 col-sm-4' style={{background: '#0097', border: 'solid 1px #555'}}>
          <h6><strong>Ultimo Dato</strong></h6>
          <h6>{formatDate(lastState['timestamp'])}</h6>
        </div>
        
        <div className='text-center pt-3 text-light col-12 col-sm-2' style={{background: `${lastState['Alto'] === 1 ? '#9997' : '#0907'}`, border: 'solid 1px #555'}}>
          <h6><strong>Nivel Alto</strong></h6>
          <h6>{lastState['Alto'] === 1 ? 'Apagado' : 'Encendido'}</h6>
        </div>  
        
        <div className='text-center pt-3 text-light col-12 col-sm-2' style={{background: `${lastState['Medio'] === 1 ? '#9997' : '#0907'}`, border: 'solid 1px #555'}}>
          <h6><strong>Nivel Medio</strong></h6>
          <h6>{lastState['Medio'] === 1 ? 'Apagado' : 'Encendido'}</h6>
        </div>
        
        <div className='text-center pt-3 text-light col-12 col-sm-2' style={{background: `${lastState['bajo'] === 1 ? '#9997' : '#0907'}`, border: 'solid 1px #555'}}>
          <h6><strong>Nivel Bajo</strong></h6>
          <h6>{lastState['bajo'] === 1 ? 'Apagado' : 'Encendido'}</h6>
        </div>
        
        <div className='text-center pt-3 text-light col-12 col-sm-2' style={{background: `${(lastState['Alto'] === 1 && lastState['Medio'] === 1 && lastState['bajo'] === 1 ) ? '#900' : lastState['Activación'] === 1 ? '#990a' : '#9997'}`, border: 'solid 1px #555'}}>
          <h6><strong>Estado del Tanque</strong></h6>
          <h6>{(lastState['Alto'] === 1 && lastState['Medio'] === 1 && lastState['bajo'] === 1 ) ? 'ALARMA' : lastState['Activación'] === 1 ? 'Llenando' : 'Estable'}</h6>
        </div>

      </div>

      <div style={{ height: '300px' }}>
        <Chart
          type="line"
          data={{
            datasets: [
              {
                label: "Activo",
                type: "line",
                data: activo,
                borderColor: "rgba(75, 75, 75, 1)",
                backgroundColor: "rgba(75, 75, 75, 0.2)",
                pointRadius: 2,
                pointHoverRadius: 7,
                lineTension: 0,
                borderWidth: 1,
                stepped: true,
                fill: true
              },
              {
                label: "Nivel",
                data: nivel,
                borderColor: "rgba(75, 75, 192, 1)",
                backgroundColor: "rgba(75, 75, 192, 0.2)",
                pointRadius: 2,
                pointHoverRadius: 7,
                lineTension: 0.3,
                borderWidth: 2
              },
              {
                label: "Alto",
                type: "bar",
                data: alto,
                borderColor: "rgba(75, 192, 75, 1)",
                backgroundColor: "rgba(75, 192, 75, 0.2)",
                borderWidth: 1
              },
              {
                label: "Medio",
                type: "bar",
                data: medio,
                borderColor: "rgba(192, 192, 75, 1)",
                backgroundColor: "rgba(192, 192, 75, 0.2)",
                borderWidth: 1
              },
              {
                label: "Bajo",
                type: "bar",
                data: bajo,
                borderColor: "rgba(192, 75, 75, 1)",
                backgroundColor: "rgba(192, 75, 75, 0.2)",
                borderWidth: 1
              }
            ]
          }}
          options={{
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
              title: {
                text: 'Registros Historicos',
                color: '#fff',
                display: true              }
            },
            scales: {
              x: {
                type: "time",
                time: {
                  unit: "seconds",
                  displayFormats: {
                    //minute: "YYYY-MM-DD HH:mm:ss"
                    seconds: "HH:mm:ss"
                  }
                },
                scaleLabel: {
                  display: true,
                  labelString: "Tiempo"
                }
              },
              y: {
                //min: 4,
                //max: 16,
                scaleLabel: {
                  display: true,
                  labelString: "Dato"
                }
              }
            }
          }}
        />
      </div>
    </>
  )
}

export default App