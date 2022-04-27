const cityWeather = (city) => {
  //1. Procesar si la ciudad es valida
  let errorText;
  if (typeof city !== "string") {
    //throw new Error('Not a string')
    // La linea superior detendria la ejecucion del codigo
    errorText = "Not a string";
  }
  if (city === "") {
    errorText = "String is empty";
  }

  return new Promise((resolve, reject) => {
    if (errorText) reject(errorText);
    //2. Realizar el fetch, la peticion

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=es&units=metric&appid=428a185f48376960ae6f1468824b5cf9`
    )
      .then((response) => response.json())
      //3.asi la peticion es correcta gestionarla
      .then((data) => {
        if (data === undefined) {
          reject("City not found");
        } else {
          const finalResult = data.main;
          resolve(finalResult);
        } //gestionar la respuesta
      })
      //3.b si es incorrecta rechazarla
      .catch((error) => reject(error));

    // if(city === 'not_found') {
    //   reject('City not found')
    // }
  });
};

cityWeather("madrid")
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error, "catch");
  });

//BASIC STRUCTURE
// new Promise( (resolve, reject) => {

//   resolve('datos que devolver si todo va bien')
//   reject('error que devolver')

// })

// PROMISE ALL

const promise1 = fetch("www.netflix.com");
const promise2 = fetch("www.hbo.com");

Promise.all([promise1, promise2])
  .then((result) => console.log(result))
  .catch((error) => console.error(error));

// async await

// function getAddressesFromAPI() {

// }

// async function handleCityClick() {

//   const addresses = await getDataFromAPI()
// }
