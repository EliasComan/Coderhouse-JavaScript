//Declaracion de variables
const api = 'https://jsonplaceholder.typicode.com/posts';
 const producto = ["banana","manzana","mandarina","paltas","peras"];
 let mostrar;
  let ProductosUsuario = []
  let precio = 0;
  let cantidad = 0;
  let contador=0;
  let preciofinal = 0;
  let carritoguardado = parseInt(localStorage.getItem("valorcarrito"));
  let productosguardados= localStorage.getItem("productoselegidos");

  // NUEVA FUNCION A PARTIR DE UNA PLANTILLA

const Productos =[{id: 1, nombre: 'Banana', precio:25, img:"./imagenes/banana.jpg"},
{id: 2, nombre: 'Manzana', precio:20, img:"./imagenes/manzana.jpg"},
{id: 3, nombre: 'Mandarina', precio:35, img:"./imagenes/mandarina.jpg"},
{id: 4, nombre: 'Palta', precio:55, img:"./imagenes/palta.jpg"},
{id: 5, nombre: 'Pera', precio:12, img:"./imagenes/pera.jpg"},
{id:6, nombre:'Uvas', precio: 46, img:"./imagenes/uvas.jpg"}];

//CARRITO GUARDADO EN OPERACIONES ANTERIORES

if (localStorage.getItem("valorcarrito") > 0) {
  
  $('#carrito').append(`<div><h3>Usted tiene un carrito pendiente que contiene: </h3>
                                <p>${productosguardados}</p>
                                <p>Y su valor es:</p>
                                  <h3>$${carritoguardado}</h3> </div>
                                  <button id = "fincompra">Finalizar Compra</button>`);
  $('#carrito').hide();
  $('#carrito').fadeIn('fast');
}else{}


//ENVIO DE PRODUCTOS GENERADOS AL DOM

let productoaurelio;
let padre = document.getElementById("productosg");
for (const Producto of Productos) {
   productoaurelio = document.createElement("div");
  productoaurelio.innerHTML = `<div class= "producto">
                                <div class ="row">
                                <div class="col-sm">
                               <img class="imagenes" src= "${Producto.img}" alt="Card image cap">
                                          <div class="card-body">
                                      <h5 class="card-title">${Producto.nombre}</h5>
                                              <h6>$ ${Producto.precio}</h6>
                                              <input type="number" id="${Producto.nombre}" placeholder="Ingrese cantidad">
                               <a class="carrito" id="${Producto.id}">Sumar al carrito</a>
                                                                    </div>
                                                                    </div>
                                                            </div>
                                                            </div>`;
  

  padre.appendChild(productoaurelio);
  
}


//GUARDADO DE LA SELECCION DE PRODUCTOS
for (const botoncompra of Productos) {
    let compra = document.getElementById(botoncompra.id);
      compra.onclick = () => {
        ProductosUsuario.push(botoncompra.nombre);
        precio = botoncompra.precio;
        cantidad= document.getElementById(botoncompra.nombre);
        cantidad = cantidad.value;
       contador = cantidad * precio;
       preciofinal = contador + preciofinal;
       console.log(preciofinal);
       localStorage.setItem("valorcarrito",preciofinal);
      localStorage.setItem("productoselegidos",ProductosUsuario);
        
      }

}


//NUEVO CARRITO EN JQUERY
$('.Nuestrosproductos').append(`<button class= "fcompra" id="fcompra">Finalizar Compra</button>`);
$('#fcompra').hide();
$('.carrito').on('click', function () {
$('#fcompra').fadeIn(2000);
});

$('#fcompra').on('click', function ()  {
  $('.alerta').prepend(`  <div class="alert alert-success" role="alert">
Compra realizada
</div>`);
    $('.Fincompra').append(`<div><h3>Su compra fue:</h3>
                            <p>${ProductosUsuario.join()}</p>
                             <p> Su coste es:<h3>$${preciofinal}</h3></p></div>`);
  preciofinal = 0;
  ProductosUsuario = [];
  localStorage.setItem("valorcarrito",preciofinal);
  localStorage.setItem("productoselegidos",ProductosUsuario);
})

//Finalizar compra de carrito

$('#fincompra').on('click', function(){

  preciofinal = 0;
  ProductosUsuario = [];
  localStorage.setItem("valorcarrito",preciofinal);
  localStorage.setItem("productoselegidos",ProductosUsuario);

})

//Alerta de compra de paquetes

$('.paquetecompra').click(function (e) { 
  e.preventDefault(e);
  $('.contpaquetes').append( 
    `<form class="formulario">
    <h3>Por favor ingrese sus datos para continuar con su compra</h3>
    <div class="form">
    <div><input type="text" id="nombref" placeholder="Ingrese su nombre y apellido"></div>
    <div><input type="text"id="direccionf" placeholder= "Ingrese su direccion"></div>
   <div><input type= "text" id="localidadf" placeholder="Ingrese su localidad"></div>
   <div> <label for="paquete">Elija cantidad de personas</label>
    <select id="cantidadf" class="form-control" ><
      <option>1 Persona</option>
      <option>2 Personas</option>
      <option>4 Personas</option>
      </select></div>
      <button id="comprapaquete"> Comprar</button>
      </div></form>`
 );

$('#comprapaquete').click(function (e) { 
  e.preventDefault();
  let nombref = document.getElementById("nombref");
  nombref = nombref.value;
  let localidadf = document.getElementById("localidadf");
  localidadf = localidadf.value;
  let direccionf = document.getElementById("direccionf");
  direccionf = direccionf.value;
  let cantidadf = document.getElementById("cantidadf");
  cantidadf = cantidadf.value;
  const dataf = {nombreformulario: nombref, localidad:localidadf, direccion: direccionf, cantidad:cantidadf}
  $.post(api, dataf,
    function (data, textStatus) {
      if (textStatus === 'success') {
        console.log(data);
        $('.formulario').prepend(`  <div class="alert alert-success" role="alert">
        Compra realizada
        </div>`);
        
      }
    },
    
  );
  
});
});
// METODO AJAX PARA EL FORMULARIO
$('#enviar').click(function (e) { 
  e.preventDefault();
  let nombredom = document.getElementById("nombre");
  nombredom = nombredom.value;
  let apellidodom = document.getElementById("apellido");
  apellidodom = apellidodom.value;
  let emaildom = document.getElementById("email");
  emaildom = emaildom.value;
  const info = [{nombre: nombredom ,apellido: apellidodom ,email: emaildom}];
  $.post(api , info,
    function (data, textStatus) {
      if (textStatus === 'success') {
        console.log(textStatus);
        console.log(data);
      }
      
    },
  
  );
  
});

