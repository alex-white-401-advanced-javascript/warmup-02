'use strict';

// Application Dependencies
const superagent = require('superagent');


function fetchPeopleWithPromises(req, res) {
  let newArrayOfPromises = [];
  let url = 'https://swapi.co/api/people'
  
  return superagent.get(url)
  .then(apiResponse => apiResponse.body.results.map( link => link.url))
  .then(result => {
    for(let i in result){
      newArrayOfPromises.push(Promise.resolve(superagent.get(result[i])))
    }
    return Promise.all(newArrayOfPromises)
    .then( response => {
      const names = response.map( result => result.body.name);
      console.log(names);
    })
  })
}


async function fetchPeopleWithAsync() {
  let result = await fetchPeopleWithPromises();
  console.log(result);
  }
  
  fetchPeopleWithAsync();
  // fetchPeopleWithPromises();
