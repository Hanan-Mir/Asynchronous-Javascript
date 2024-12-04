'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
let renderError=function(errMsg){
    countriesContainer.insertAdjacentText('afterend',`Something went wrong ${errMsg}`);
}
let renderCountry=function(data,className=' '){
    let html=`
<article class="country ${className}">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(data.population/10000).toFixed(2)}</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
          </div>
        </article>
`
countriesContainer.insertAdjacentHTML('afterend',html);
// countriesContainer.style.opacity=1;
}
let fetchJson=function(url){
   return fetch(url).then((response)=>{ 
        // return (response.json());
        if(!response.ok){
            throw new Error(`Country not found,${response.status}`);      
        }
      return response.json();
    })
}
// const getCountryAndNeigh=function(country){
// let request=new XMLHttpRequest();
// request.open('GET',`https://restcountries.com/v2/name/${country}`)
// request.send();
// request.addEventListener('load',function(){
// let [data]=JSON.parse(this.responseText);
// console.log(data);
// renderCountry(data);
// let border=data.borders?.[1];
// console.log(border);
// const request2=new XMLHttpRequest();
// request2.open('GET',`https://restcountries.com/v2/alpha/${border}`);
// request2.send();
// console.log(request2.responseText);
// request2.addEventListener('load',function(){
//     let data2=JSON.parse(request2.responseText);
//     renderCountry(data2,'neighbour');
// })
// })};
// getCountryAndNeigh('pakistan');
// const getCountry=function(country){
//     //country 1
//     fetchJson(`https://restcountries.com/v2/name/${country}`).then((data)=>{
//         console.log(data);
//         renderCountry(data[0])
//         let border=data[0].borders?.[0]
//         console.log(border);
//         //country 2
//     return fetchJson(`https://restcountries.com/v2/alpha/${border}`)).then(data=>renderCountry(data,'neighbour')).catch((err)=>{
//         console.error(err)
//     renderError(err)}).finally(()=>countriesContainer.style.opacity=1);
// }
// }
// const getCountry=function(country){
//     fetchJson(`https://restcountries.com/v2/name/${country}`).then((data)=>{
//         renderCountry(data[0]);
//         let border=data[0].borders?.[0];
//     })
// }
// btn.addEventListener('click',function(){
//     getCountry('pakistan');
// });
// getCountry('cccccsd');
// fetchJson(`https://restcountries.com/v2/alpha/AFG`).then((data)=>console.log(data));
// const whereAmI=function(lat,lng){
//     let countryName;
//     fetch(
//         `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
//     ).then((response)=>{
//         if(!response.ok) throw new Error(`1 Something went wrong ${response.status}`)
        
//         return response.json()}).then((data)=>{
//         let countryCode=data.countryCode;
//       fetchJson(`https://restcountries.com/v2/alpha/${countryCode}`).then((d)=>{;
//             countryName=d.name;
//             renderCountry(d);
//             console.log(`You are in ${data.city},${countryName}`)}).catch((err)=>console.error(err.message));
//         })
        
// }
// whereAmI(10,20);
// whereAmI(52.508,13.381);
//-------------------------building our own promise-------------------------------------
// let lotteryDrawing=new Promise(function(resolve,reject){

//     if(Math.random()>=0.5){
//         resolve(`You won the lottery price`);
//     }
//     else{
//         reject("you lost the draw")
//     }
// })
// lotteryDrawing.then(res=>console.log(res)).catch((err)=>console.error(err));
let lotteryPromise=new Promise(function(resolve,reject){
    console.log("Lottery draw is happening");
    setTimeout(function(){
        if(Math.random()>=0.5){
            resolve(`You won the lottery price`)
        }
        else{
            reject(`You lost the lottery draw`)
        }
    },2000);
})
lotteryPromise.then((res)=>console.log(res)).catch((err)=>console.error(err));
//--------------------------promisifying the settimeout function-------------------------------
let timeoutPromise=function(tick){
    return new Promise(function(resolve){
        setTimeout(resolve,tick*1000);
    })
}
timeoutPromise(4).then((res)=>console.log('Was wating'))
//creating alternative for callback hell 
timeoutPromise(1).then((res)=>{
    console.log('wating for 1 second');
    return timeoutPromise(2);
}).then((res)=>{
    console.log(`waiting for 2 seconds`);
    return timeoutPromise(3);
}).then((res)=>{
    console.log('waiting for 3 seconds');
}).catch((err)=>console.log(err));
//example microtasks queue
console.log('Hello Micro');
new Promise((function(resolve,reject){
    resolve("I am promise");
})).then((res)=>console.log(res));
setTimeout(()=>{console.log("I am timeout")},0)
console.log("ended all ");
//---------------promisifying the geolocation ----------------------------------
// navigator.geolocation.getCurrentPosition((pos)=>console.log(pos));
let locationPromise=function(){
    // return new Promise(function(resolve,reject){
    //   navigator.geolocation.getCurrentPosition((pos)=>resolve(pos),(err)=>reject(err))
    // })
    return new Promise(function(resolve,reject){
        navigator.geolocation.getCurrentPosition(resolve,reject);
    })
}
// locationPromise().then((res)=>{
//     let {latitude:lat,longitude:lng}=res.coords;
//     fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`)
// });

let whereAmI=function(){
    locationPromise().then((res)=>{
        let {latitude:lat,longitude:lng}=res.coords;
        return fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`);
    }).then((res)=>{
        if(!res.ok) throw new Error("country not found")
            return res.json();
    }).then(data=>{
let countryCode=data.countryCode;
return fetch(`https://restcountries.com/v2/alpha/${countryCode}`)
    }).then((res)=>res.json()).then((data)=>renderCountry(data)).catch(err=>console.error(err));
}
btn.addEventListener('click',whereAmI);
//-------------------------------------coding challenge 2--------------------------------------------------
let imageContainer=document.querySelector('.images');
let createImage=function(imgPath){
return new Promise(function(resolve,reject){
   let img= document.createElement('img');
    img.src=imgPath;
    img.addEventListener('load',function(){
        imageContainer.append(img)
        //img.classList.add('image');
        resolve(img);
    }
)
img.addEventListener('error',function(){
    reject('Image not loaded');
})
})
}
createImage('img/img-1.jpg').then(img=>console.log('image 1 loaded')).catch(err=>console.error(err));






