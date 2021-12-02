import React, { useState, useEffect } from "react";
import axios from "axios";
import SingleHoliday from "./SingleHoliday";
const url = "https://react-corso-api.netlify.app/.netlify/functions/holiday";

const Holiday = () => {
  //Faccio fetchare i dati dall'api ma prima definisco uno 'state':
  const [data, setData] = useState([]);

  //Settiamo un altro 'state' per passare solo e unicamente uno dei valori che abbiamo all'interno dell'arrey di oggetti.
  const [selected, setSelected] = useState(0);

  //Funzione per scegliere il prossimo valore di selected e la prossima vacanza:
  const nextHoliday = () => {
    setSelected((prevValue) => {
      if (prevValue + 1 === data.data.length) {
        //Per non superare il numero delle vacanze e trovarsi un elemento 'NaN'
        return 0;
      } else {
        return prevValue + 1;
      }
    });
  };

  //Funzione per diminuire valore di 'selected' e passare alla vacanza precedente:
  const prevHoliday = () => {
    setSelected((prevValue) => {
      if (prevValue - 1 < 0) {
        //Per non superare il numero delle vacanze e trovarsi un elemento 'NaN'.
        return data.data.length - 1;
      } else {
        return prevValue - 1;
      }
    });
  };

  //Ora faccio una funzione per fetchare i dati dalla api:
  const getData = async () => {
    try {
      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  //Return condizionale per controllare di aver risolto la Promise:
  if (data.success) {
    return (
      <>
        {
          //Ternary operator per controllare il numero di vacanze:
          data.data.length > 0 ? (
            <SingleHoliday
              {...data.data[selected]}
              next={nextHoliday}
              prev={prevHoliday}
            />
          ) : (
            <h4>No Vacanze</h4>
          )
        }
      </>
    );
  } else {
    return <h2>...Loading</h2>;
  }
};

export default Holiday;
