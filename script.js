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

// let whereAmI=function(){
//     locationPromise().then((res)=>{
//         let {latitude:lat,longitude:lng}=res.coords;
//         return fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`);
//     }).then((res)=>{
//         if(!res.ok) throw new Error("country not found")
//             return res.json();
//     }).then(data=>{
// let countryCode=data.countryCode;
// return fetch(`https://restcountries.com/v2/alpha/${countryCode}`)
//     }).then((res)=>res.json()).then((data)=>renderCountry(data)).catch(err=>console.error(err));
// }
// btn.addEventListener('click',whereAmI);
//-------------------------------------coding challenge 2--------------------------------------------------
let imageContainer=document.querySelector('.images');
let img;
let createImage=function(imgPath){
return new Promise(function(resolve,reject){
   img= document.createElement('img');
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
// let currentImage;
// createImage('img/img-1.jpg').then(img=>{console.log('image 1 loaded')
//     currentImage=img;
//     return timeoutPromise(5);
// }).then(res=>{
//     console.log('Execution stoped for 2 seconds')
// currentImage.style.display='none';
// return createImage('img/img-2.jpg');
// }).then(res=>{
//     currentImage=res;
//     console.log('Image 2 loaded');
//     return timeoutPromise(5)
// }).then(()=>currentImage.style.display='none');
//------------------------------async and await------------------------------------------------------
let whereAmI=async function(country){
//getting country using geolocation api
try{
let response=await locationPromise();
let {latitude:lat,longitude:lng}=response.coords;
console.log(lat,lng);
let getLocation=await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`);
console.log(getLocation);
if(!getLocation.ok) throw new Error(`Something wrong in the url of fetch`);
let locationData=await getLocation.json();
let countryCode=locationData.countryCode;
let getCountryResponse=await fetch(`https://restcountries.com/v2/alpha/${countryCode}`);
let data=await getCountryResponse.json();
renderCountry(data);

    //getting country using async and await
    // let res=await fetch(`https://restcountries.com/v2/alpha/${country}`)
    // let data=await res.json();
    // renderCountry(data);
    // console.log(data);
return `You are in ${locationData.city},${data.name}`;
} catch(err){
renderError(err.message);
//throwin an error explicitly
throw new Error(err.message);
}
}
btn.addEventListener('click',whereAmI);

//----------------------------using try catch--------------------------------
// try{
//     let x=9;
// const z=100;
// z=90;
// console.log(z);
// }catch(err){
//     alert(err);
// }
// whereAmI().then(str=>console.log(str));
console.log(`1:loading the data`);
// whereAmI().then(str=>console.log(str)).catch((err)=>console.log(`2:${err.message}`)).finally(console.log(`3:data loaded sucessfully`));
// console.log(`3:data loaded sucessfully`);

(async function(){
    try{
let outputStr=await whereAmI();
console.log(`2:${outputStr}`)
    }
    catch(err){
console.log(`3:${err.message}`)
    }
})();
//----------------------running promises in parallel------------------------------------
let getCapital=async function(c1,c2,c3){
    // let res1=await fetch(`https://restcountries.com/v2/name/${c1}`);
    // console.log(res1);
    // let [data1]=await res1.json();
    
    // let res2=await fetch(`https://restcountries.com/v2/name/${c2}`);
    // let [data2]=await res2.json();
    // let res3=await fetch(`https://restcountries.com/v2/name/${c3}`);
    // let [data3]=await res3.json();
    // let capitalArray=[data1.capital,data2.capital,data3.capital]
    // console.log(capitalArray);
    //Running all promises in parallel
    try{
   const data=await Promise.all([fetchJson(`https://restcountries.com/v2/name/${c1}`),fetchJson(`https://restcountries.com/v2/name/${c2}`),fetchJson(`https://restcountries.com/v2/name/${c3}`)]);
console.log(data.map(d=>d[0].capital));
    }
    catch(err){
        console.log(err)
    }
}
getCapital("portugal","Germany","usa");
(async function(){
    const promiseWait=await Promise.race([fetchJson(`https://restcountries.com/v2/name/egypt`),fetchJson(`https://restcountries.com/v2/name/bangladesh`),fetchJson(`https://restcountries.com/v2/name/pakistan`)]);
  console.log(promiseWait[0]);
})();
// let tickPromise=function(sec){
//     return new Promise(function(_,reject){
//         setTimeout(reject(new Error(`timeout baby`))},sec*1000)
//     });
// }
let tickPromise=function(sec){
return new Promise(function(_,reject){
    setTimeout(reject(new Error('Promise rejected baby')),sec*100000)
})
}
Promise.race([fetchJson(`https://restcountries.com/v2/name/italy`),tickPromise(10)]).then(res=>console.log(res)).catch(err=>console.error(err.message));
Promise.allSettled([
    Promise.resolve("resolved"),
    Promise.reject('rejected promise'),
    Promise.resolve('another rejection')
]).then(res=>console.log(res));
//----coding challenge #3---------
// let loadNPause=async function(){
//     try{
// let img1=await createImage(`img-1.jpg`);
// console.log(`image 1 loaded`);
// await timeoutPromise(2);
// img1.style.display='none'
// let img2=await createImage(`img-2.jpg`);
// console.log(`image 2 loaded`);
// await timeoutPromise(2);
// img2.style.display='none';
//     }
//     catch(err){
// console.error(err.message);
//     }
// }
//loadNPause();
let loadAll=async function(imgArr){
    try{
imgArr.map(async el=>{await createImage(el);
console.log(el)
})
    }
    catch(err){
        console.log(err);
    }
}
loadAll(['img-1.jpg','img-2.jpg','img-3.jpg']);