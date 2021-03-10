import { useState } from "react";



export const Trafico = () => {
    var [red, setRed] = useState("red");
    var [orange, setOrange] = useState("orange");
    var [green, setGreen] = useState("green");

    var redbrillo=()=>{
        if (red=="red"){ setRed("red brillo")} ;
        setOrange("orange")
        setGreen("green")
        };
    
    var orangebrillo = () => {
      if (orange == "orange") {
        setOrange("orange brillo");
      } 
      setRed ("red");
      setGreen ("green");
    };
        
    var greenbrillo = () => {
      if (green == "green") {
        setGreen("green brillo");
      } 
      setRed ( "red");
      setOrange ("orange");
    };



    return (
        <div className="container">
            <div className="palito"></div>
            <div className="containercirculitos">
                <div className={red} onClick={redbrillo}></div>
                <div className={orange} onClick={orangebrillo}></div>
                <div className={green} onClick={greenbrillo}></div>
            </div>
        </div>
    );


}