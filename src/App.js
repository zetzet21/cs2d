import { useState } from 'react';
import Authorisation from './Menu/authorisation.js';
import Server from './Menu/server.js';
import Header from './Menu/Header.js'
import './App.css';


function AppMain({server}) {
  const [data, setData] = useState();
  return (
    <div className="App">
      {
        data && data.name ?
          <Header server={server} data={data} setData={(data) => setData(data)}/> :
          <Authorisation server={server} setData={(data) => setData(data)}/>
      }
    </div>
  );
}

function App() {
  const server = new Server();
  return (
    <>
      <AppMain server={server}/>
    </>
  )
}

export default App;
