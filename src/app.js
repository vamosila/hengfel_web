/*
* File: app.js
* Author: Vámosi László Ádám
* Copyright: 2025, Vámosi László Ádám
* Group: Szoft I-N
* Date: 2025-04-16
* GitHub: https://github.com/vamosilaszloadam/
* Licenc: MIT
*/

const radiusInput=document.querySelector("#radius");
const heightInput=document.querySelector("#height");
const calcButton=document.querySelector("#calcButton");
const surfaceInput=document.querySelector("#surface");
const numberInputs=document.querySelectorAll("input[type='number']");
const unitSelects=document.querySelectorAll("select");

radiusInput.value="";
heightInput.value="";
surfaceInput.value="";
calcButton.disabled=true;

function calcSurface(){
    const radius=Number(radiusInput.value);
    const height=Number(heightInput.value);
    const radiusUnit=document.querySelector("#radiusSelect").value;
    const heightUnit=document.querySelector("#heightSelect").value;
    const surfaceUnit=document.querySelector("#surfaceSelect").value;
    const unitConversion={
        km:1000,
        m:1,
        dm:0.1,
        cm:0.01,
        mm:0.001
    };
    const radiusInMeters=unitConversion[radiusUnit]*radius;
    const heightInMeters=unitConversion[heightUnit]*height;
    const surfaceInMeters=2*Math.PI*Math.pow(radiusInMeters,2)+2*Math.PI*radiusInMeters*heightInMeters;
    // const surfaceInMeters=2*Math.PI*radiusInMeters*(radiusInMeters+heightInMeters);
    const surfaceConverted=surfaceInMeters/Math.pow(unitConversion[surfaceUnit],2);
    surfaceInput.value=String(surfaceConverted.toFixed(2));
}

calcButton.addEventListener("click",()=>{
    calcSurface();
});

numberInputs.forEach(input=>{
    let preValue="";
    input.addEventListener("input",()=>{
        surfaceInput.value="";
        if(input.value<0){
            input.value*=-1;
        }
        if(input.value.length==1){
            preValue="";
        }
        if(input.value.length>0){
            preValue=input.value;
        }
        if(input.value.length==0){
            input.value=preValue;
        } 
        if(preValue.length==1){
            input.addEventListener("keydown",(event)=>{
                if(event.key==="Backspace"){
                    preValue="";
                }
              },{once:true});
        }
        if(radiusInput.value.length>0&&heightInput.value.length>0){
            calcButton.disabled=false;
        }else{
            calcButton.disabled=true;
        }
    });
});

unitSelects.forEach(select=>{
    select.addEventListener("change",()=>{
        if(radiusInput.value.length>0&&heightInput.value.length>0&&surfaceInput.value.length>0){
            calcSurface();
        }
    });
});