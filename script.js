'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
let renderError=function(errMsg){
    countriesContainer.insertAdjacentText('beforebegin',`Something went wrong ${errMsg}`);
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
    fetch(url).then((response)=>{ 
        if(!response.ok){
            throw new Error("Country not found");      
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
const getCountry=function(country){
    //country 1
    fetchJson(`https://restcountries.com/v2/name/${country}`).then((data)=>{
        console.log(data);
        renderCountry(data[0])
        let border=data[0].borders?.[0]
        console.log(border);
        //country 2
    return fetch(`https://restcountries.com/v2/alpha/${border}`)
    
    }).then((response)=>response.json()).then(data=>renderCountry(data,'neighbour')).catch((err)=>{
        console.error(err)
    renderError(err)}).finally(()=>countriesContainer.style.opacity=1);
}
btn.addEventListener('click',function(){
    getCountry('pakistan');
});
getCountry('cccccsd');