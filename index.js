let randomizeArray= document.querySelector("#randomizeArray");
let bubbleSortbtn= document.querySelector("#bubblesort");
let insertionSortbtn= document.querySelector("#insertionsort");
let barsContainer= document.querySelector(".bars_container");
let minValue= 1;
let maxValue=50;
let noOfBars= 10;
let speedFactor = 500;

let unsortedArray= new Array(noOfBars);

const randomNum= (min,max) =>{
    return ( Math.floor( Math.random()* (max-min+1) ) +min);
}

const createArray= ()=>{
    for(let i=0;i<noOfBars;i++){
        unsortedArray[i]= randomNum(minValue,maxValue);
        console.log(unsortedArray[i])
    }
}

document.addEventListener("DOMContentLoaded",()=>{
    createArray();
    randerBars(unsortedArray);
})

const randerBars=(array)=>{
    for(let i=0;i<array.length;i++){
        let bar = document.createElement("div");
        bar.classList.add("bars");
        bar.style.height= array[i] *10 + "px";
        // console.log(bar)
        barsContainer.append(bar);
    }
}

randomizeArray.addEventListener("click",()=>{
    createArray();
    barsContainer.innerHTML="" ;
    randerBars(unsortedArray);
})


function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

bubbleSortbtn.addEventListener("click",()=>{
    let sortedArray;
    sortedArray = bubbleSort(unsortedArray);
    console.log(sortedArray);
})

let bubbleSort=async(array)=>{
    let bars= document.querySelectorAll(".bars");
    // console.log(bars);
    for(var i=0;i<array.length;i++){
        for(var j=0;j<(array.length-i-1);j++){
            if(array[j]>array[j+1]){
                for (let k = 0; k < bars.length; k++) {
                    if (k !== j && k !== j + 1) {
                      bars[k].style.backgroundColor = "red";
                    }
                }
                console.log(array[j],array[j+1]);
                let temp= array[j];
                array[j]=array[j+1];
                array[j+1]=temp;

                bars[j].style.height = array[j] * 10 + "px";
                bars[j].style.backgroundColor = "white";
                bars[j + 1].style.height = array[j + 1] * 10 + "px";
                bars[j + 1].style.backgroundColor = "white";
                await sleep(speedFactor);
            }
        }
    }
    //I've used it to remove gold background from the bars after sorting
    for (let k = 0; k < bars.length; k++) {
          bars[k].style.backgroundColor = "red";
    }
    // await sleep(speedFactor);

    return array;
}

insertionSortbtn.addEventListener("click",()=>{
    let sortedArray=insertionSort(unsortedArray);
    console.log(sortedArray);
})

let insertionSort=async(array)=>{
    let bars= document.querySelectorAll(".bars");
    for(let i=0;i< array.length;i++){
        let key= array[i];
        let j=i-1;
        
        bars[i].style.backgroundColor = "white";//to see upto which part is sorted (this shows sorted is going on on which bar)
        while(j>=0 && array[j]>key){
            array[j+1]=array[j];
            bars[j+1].style.height= array[j+1]*10 +"px";
            j--;
            await sleep(speedFactor);
        }
        array[j+1]=key;
        bars[j+1].style.height= array[j+1]*10 +"px";
        
    }
    return array;
}