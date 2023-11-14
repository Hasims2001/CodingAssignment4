import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux"
export const ViewList = ({handleChecked, viewHome}) => {
    const {loading, error, characters, fav_characters} = useSelector(store=> store);
    const [arr, setArr] = useState([]);
    useEffect(()=>{
      if(viewHome){
        setArr(characters)
      }else{
        setArr(fav_characters)
      }
    }, [viewHome, fav_characters])
    console.log(viewHome)
  return (
    <div style={{display: 'flex', flexWrap: "wrap", gap: "2rem", justifyContent: "center"}}>
        {loading && <div className="loader">
  <div className="loader__bar"></div>
  <div className="loader__bar"></div>
  <div className="loader__bar"></div>
  <div className="loader__bar"></div>
  <div className="loader__bar"></div>
  <div className="loader__ball"></div>
</div>}
        {error !== "" && <></>}
        {!loading && arr.length > 0 && arr.map((item)=>(
            <div className="card" key={item.id}>
            <div className="img">
                <img src={item.images.sm} width={"100%"}  alt={item.name}/>
            </div>
            <span>{item.name}</span>
            <p className="info">{item.connections.groupAffiliation} <br />  Relatives: {item.connections.relatives}</p>
            <p className="info-publisher info">Publisher: {item.biography.publisher}</p>
            <input type="checkbox" onChange={()=> handleChecked(item.id)} ></input>
          </div>
        ))}
    </div>
  )
}
