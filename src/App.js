import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { useCallback,useEffect, useRef, useState } from 'react';
import { getCharacter } from './Redux/action';
import {ViewList} from './Components/ViewList.jsx'
import { DELETECHARACTER, FAVCHARACTER } from './Redux/actionType.js';
function App() {
  const dispatch = useDispatch()
  const {characters} = useSelector(store=> store)
  const [viewHome, setViewHome] = useState(true);
  // const handle = useCallback(()=>{
  //   getCharacter(dispatch)
  // }, [])
  useEffect(()=>{
    if(characters.length === 0){
      getCharacter(dispatch)
    }
  }, [])
  const handleViewFav= ()=>{
    setViewHome(!viewHome)
  }
  const handleDelete= ()=>{
      dispatch({type: DELETECHARACTER, payload:  checkedRef.current})
      checkedRef.current = []
  }
  const handleAddFav = ()=>{
    dispatch({type: FAVCHARACTER, payload: checkedRef.current})
    alert('added successfully')
   
  }
  const checkedRef = useRef([]);
  const handleChecked = (id)=>{
      const list = checkedRef.current;     
      if(list.includes(id)){
        let ind = list.indexOf(id)
        list.splice(ind, 1)
      }else{
        list.push(id)
      }
      checkedRef.current = list
  }
  return (
    <div className="App">
      <ViewList handleChecked={handleChecked} viewHome={viewHome}/>
      <div style={{position: 'relative'}}>
      <div className="card" style={{height: "5rem", width: "20rem", position: 'fixed', right: "10px", bottom: "10px"}}>
            <div style={{display: 'flex', margin: 'auto', gap: '.5rem'}} ><button onClick={handleDelete}>Delete</button>
            {viewHome && <button onClick={handleAddFav}>Add To Favourite</button>}</div>
          </div>
      </div>
      <div style={{position: 'relative'}}>
      <div className="card" style={{height: "5rem", width: "13rem", position: 'fixed', left: "10px", bottom: "10px"}}>
            <button onClick={handleViewFav}>{viewHome ? "View Favourite": "Home"}</button>
          </div>
      </div>
    </div>
  );
}

export default App;
