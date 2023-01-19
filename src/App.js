import { useEffect, useState } from 'react';
import {v4 as uuidv4} from 'uuid'
import axios from 'axios';
import Jokes from './jokes/Jokes';
import MainJoke from './jokes/MainJoke';
import './App.css'
import Spinner from './jokes/Spinner';

function App() {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(10);
  const[loading,setLoading]=useState(false)

  useEffect(() => {
    const fetchData = async () => {
      let jokes = JSON.parse(localStorage.getItem('data')) || [];
     setLoading(true)
      try {
        while (jokes.length < limit) {
          const res = await axios.get('https://icanhazdadjoke.com/', {
            headers: {
              Accept: 'application/json'
            }
          });
          jokes.push({
            count: 0,
            id: uuidv4(),
            joke: res.data.joke
          });
        }
        localStorage.setItem('data', JSON.stringify(jokes));
        setData(jokes);
        setLoading(false)
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [limit]);

  const handleClick = () => {
    setLimit(prev => prev + 5);
  };

  const changeCount = (id, action) => {
    const newData = data.map(joke => {
      if (joke.id === id) {
        return {
          ...joke,
          count: action === 'increment' ? joke.count + 1 : joke.count - 1
        };
      }
      return joke;
    });
    sortJokes(newData);
  };

  const sortJokes = jokes => {
    const sortedData = [...jokes].sort((a, b) => b.count - a.count);
    localStorage.setItem('data', JSON.stringify(sortedData));
    setData(sortedData);
  };
  console.log(data)

  return (
    <div className="App">
      <MainJoke handleClick={handleClick}/>
      {loading && <Spinner/> }
      {!loading &&  <Jokes jokes={data} changeCount={changeCount} handleClick={handleClick} />}
     
    </div>
  );
}

export default App;
