# Gestion de errores y asincronía

## Throw

- `throw new Error()` lanza una excepción customizada por ti, puedes pasarle al error un string por ejemplo con el mensaje de error. Aunque es posible pasarle más datos.

## Promises

- Podemos _entender_ que las promesas tienen dos partes, el uso que se les dan y su definición interna, como cualquier otra función.

Por ejemplo:

```js
Flats.find().then().catch();
```

Lo de arriba es una promesa, o mejor dicho, una función que _retorna_ una promesa. Sin embargo no verás nunca el _resolve_ o el _reject_ puesto que forman parte de su lógica interna.

Vale, ¿pero que pasa si necesito crear yo mismo una promesa para gestionar un proceso asincrono?. Por ejemplo si llamo a una API que me informa del tiempo ¿cómo puedo gestionar los errores que puedan surgir?

La estructura básica para esto es la siguiente:

```js
function doSomethingAsync() {
  return new Promise((resolve, reject) => {
    if ("éxito") {
      resolve("datos que me han pedido");
    } else {
      reject(
        "Mensaje de error informando del motivo por el que la operación no ha podido ser completada"
      );
    }
  });
}
```

De este modo hemos creado una función que retorna una promesa. Igual que `Flats.find()`, ahora si alguien quisiera hacer uso de nuestra función lo tendría mucho más facil ya que hemos encapsulado la lógica dentro.

```js
  doSomethingAsync()
    .then(result=> /*aquí result sería el mensaje de 'datos que me han pedido' */)
    .catch(error => /*aquí error sería el 'Mensaje de error informando del motivo por el que la operación no ha podido ser completada'*/)
  
```

## Promise.all()

`Promise.all` es un método que nos permite gestionar varias promesas que son independientes entre si, pero que necesitamos asegurarnos de que ambas han terminado.

En el caso de un comparador de peliculas entre Netflix y HBO, Netflix podría tardar 5min en contestar y HBO 10min. Si las hacemos dependientes tardaría un total de 15min. Promise.all() las gestiona _a la vez_ y solo continua hasta el `.then` cuando todas se han resuelto con éxito. Recibe las promesas como un array de promesas.

## Async await

Las declaraciones de async await pueden servir para gestionar funciones que contienen procesos asincronos que necesitamos que se completen para poder continuar.

Por ejemplo si tenemos dos `selects` uno de paises y otro de ciudades es posible que queramos rellenar el de ciudades en función del pais elegido, haciendo una llamada a una api para recibir estos datos. La función podría tener un aspecto similar al siguiente.

```js
function handleSelectCountry(e) {
  const country = e.currentTarget.value;

  const cities = fetchCities(country);

  document.querySelector(".cities-selector"); // etc etc
}
```

Si usaramos ese código o uno similar nos encontraríamos con que el selector de ciudades no se rellena, puesto que el fetchCities es un proceso asincrono que no está siendo gestionado. Una opción sería emplear async await.

En primer lugar declarariamos la función como asincrona y luego indicariamos que linea, o lineas, debemos esperar.

```js
async function handleSelectCountry(e) {
  const country = e.currentTarget.value;

  const cities = await fetchCities(country);

  document.querySelector(".cities-selector"); // etc etc
}
```

## Error handling básico

Siempre que realicemos un proceso tenemos que tener en cuenta que casos pueden hacer que nuestra función u operación devuelva un resultado erroneo, confuso o directamente arroje un error que detenga la ejecución del código y en el peor de los casos _tumbe_ nuestro servidor. Esto es especialmente importante en javascript que al carecer de un tipado fuerte es suceptible a mayor número de errores que otros lenguajes. (esto puede ser mitigado a través del uso de typescript)

Consideraciones estandar que tenemos que plantearnos son:

- ¿Qué sucede si el input que recibo no es el que espero? Un null en lugar de un string.
- Si el proceso no es _puro_, osea un mismo input no genera siempre un mismo output, como por ejemplo cuando realizas una petición a una api que en ocasiones puede fallar por problemas externos al código, ¿cómo vamos a gestionar estos posibles errores? ¿Qué información vamos a darle al usuario?
- En caso de que algo no haya sido previsto y termine arrojando un error, ¿vamos a asumir ese riesgo (siempre es una opción, es imposible atender a todos los casos), vamos a implementar sistemas alternativos? Por ejemplo, si una petición no funciona por cualquier motivo podríamos implementar una petición a una segunda api que quizá sea más lenta o no sea nuestra primera opción pero que podría servirnos mientras recuperamos la funcionalidad de nuestro servicio.

## Términos importantes a investigar cuando hablamos de backend.

    - Idempotency.
    - Replica sets.
    - Load balancing.
    - Controllers. (Modelo MVC - Modelo Vista Controlador)
