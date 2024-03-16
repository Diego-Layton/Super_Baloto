<!-- SCRIPT____________________________________________________________________________________________________ -->
<script setup>
import { ref } from "vue";
import Swal from 'sweetalert2';
import  jsPDF  from "jspdf";
import autoTable from 'jspdf-autotable'


let loteria = ref("");
let premio = ref("");
let valorBoleta = ref("");
let numeroboletas = ref("");
let fecha = ref("");
let boletas = ref([]);
let showDiv = ref(true);
let Iestado = ref("");
let showDisponible = ref(false)
let showadquirir = ref(false)
let showboletacomprada = ref(false)
let showParticipante = ref(false)
let showBoletanopagada = ref(false)
let showBoletapagada = ref(false)
let showlistadoboletas = ref(false)
let showPersonalizar = ref(false)
// let showtabla = ref(false)
let Datospagada = ref([])
let Datosnopagada = ref([])
let nombre = ref("");
let telefono = ref("");
let direccion = ref("");
let pagado = ref("")
let botonBoletas=ref([])
let selectedColor = ref("")
let selectedColor1 = ref("")
let seleccionacolor = ref("")
let resultados = ref([]);


let bd = true;

function editar(item, i) {
  showDiv.value = !showDiv.value;
  console.log(item);
  console.log(i);

  premio.value = item.premio;
  valorBoleta.value = item.valorBoleta;
  loteria.value = item.loteria;
  fecha.value = item.fecha;

  bd = false;
  index = i;

  guardar(i);
}

function guardar(i) {
  let fechaActual = new Date();
  let fechaSeleccionada = new Date(fecha.value);

  if (premio.value === "") {
    mostrarError("Debe ingresar la cantidad del premio");
  } else if (valorBoleta.value === "") {
    mostrarError("Debe ingresar el valor de la boleta");
  } else if (loteria.value === "") {
    mostrarError("Debe ingresar la loteria con la que juega");
  } else if (numeroboletas.value === "") {
    mostrarError("Debe seleccionar una cantidad de boletas");
  } else if (fecha.value==="") {
    mostrarError("Debe ingresar una fecha que sea después del día de hoy");
  } else if (fechaSeleccionada <= fechaActual || fechaSeleccionada === "") {
    mostrarError("Debe ingresar una fecha que sea después del día de hoy");
  } else {
    if (bd === true) {
      mostrarmensaje("Formulario enviado correctamente");
      boletas.value.push({
        premio: premio.value,
        valorBoleta: valorBoleta.value,
        loteria: loteria.value,
        fecha: fecha.value,
      });
    } else {
      boletas.value[i].premio = premio.value;
      boletas.value[i].valorBoleta = valorBoleta.value;
      boletas.value[i].loteria = loteria.value;
      boletas.value[i].fecha = fecha.value;
      bd = true;
    }

    for (let i = 0; i < 100; i++) {
      botonBoletas.value.push({
        i,
        estado: "disponible",
      });
    }
    console.log(boletas.value);
    showDiv.value = !showDiv.value;
  }
}


function mostrarError(mensaje) {
Swal.fire({
  width: 400,
  title: mensaje,
  // input: "text",
  text: "Vuelve e intenta!",
  imageUrl: "https://i.gifer.com/APo8.gif",
  color: "white",
  background: "rgb(21, 102, 139",
  imageWidth: 300,
  imageHeight: 200,
  backdrop: `
    black
      ` 
});
}

function mostrarmensaje(mensaje) {
Swal.fire({
  width: 500,
  title: mensaje,
  text:  "Bien hecho",
  imageUrl: "https://i.pinimg.com/originals/13/a1/5b/13a15b6384a77f463056c03b97dfe6ad.gif",
  color: "black",
  background: "rgb(21, 102, 139",
  imageWidth: 300,
  imageHeight: 200,
  backdrop: `
    #fff
      ` ,
  showConfirmButton: false,
  timer: 1800

});
}



function adquirido(mensaje) {
  Swal.fire({
    width: 400,
  title: mensaje,
  text: "boleta adquirida!",
  imageUrl: "https://i0.wp.com/imgs.hipertextual.com/wp-content/uploads/2015/08/Jimmy-Fallon.gif?fit=650%2C365&quality=50&strip=all&ssl=1",
  color: "white",
  background: "rgb(21, 102, 139)",
  imageWidth: 300,
  imageHeight: 200,
  backdrop: `
    black
      ` 
  });
}
function modifiicarboleta(e, i) {

showDisponible.value=false
showBoletanopagada.value=false
showBoletapagada.value=false



  if (e.estado == 'disponible') {
    showDisponible.value = !showDisponible.value

  }  else if(e.estado == 'reservada'){
    showBoletanopagada.value = !showBoletanopagada.value

  } else if(e.estado == 'pagada'){
    showBoletapagada.value = !showBoletapagada.value
  }

  Iestado.value = i
}

function adquirir() {
  showadquirir.value = !showadquirir.value

}

function listar() {
  Datospagada.value.push({
    nombre: nombre.value,
    direccion: direccion.value,
    telefono: telefono.value,
    boleta:Iestado.value
    
  })
 

  botonBoletas.value[Iestado.value].estado="pagada"
  console.log(botonBoletas.value[Iestado.value]);
  

}
function cerrar() {
  showlistadoboletas.value = !showlistadoboletas.value
}

function verdatos() {
  Datosnopagada.value.push({
    nombre: nombre.value,
    direccion: direccion.value,
    telefono: telefono.value,
    boleta:Iestado.value
  })

  botonBoletas.value[Iestado.value].estado="reservada"

  
  console.log(botonBoletas.value);
  
  
}

function listardatosparticipante(){

  showlistadoboletas.value = !showlistadoboletas.value

  let resultadodeambosdatos= encontrarCoincidencias(Datospagada.value, Datosnopagada.value);

  if(resultadodeambosdatos.length<=0){}

  else{
showboletacomprada.value = !showboletacomprada.value
  }
  console.log(resultadodeambosdatos);
  
}

function getColorClass(estado) {
      if(estado === 'disponible'){
        return 'blue';
      }else if (estado === 'pagada') {
        return 'green';
      } else if (estado === 'reservada') {
        return 'red';
      }
    }            


function verdatosparticipante(){
showParticipante.value = !showParticipante.value
}



function cerrardatos() {
  showBoletanopagada.value = !showBoletanopagada.value
}
function cerrardatos1() {
  showlistadoboletas.value = !showlistadoboletas.value
}function cerrardatos2() {
  showPersonalizar.value = !showPersonalizar.value
}
function cerrardatos3() {
  showDisponible.value = !showDisponible.value
}
function cerrardatos4() {
  showParticipante.value = !showParticipante.value
}
function cerrardatos5() {
  showBoletapagada.value = !showBoletapagada.value
}
function cerrardatos6() {
  showadquirir.value = !showadquirir.value
}

function exportPdf() {
      const doc = new jsPDF('landscape');
      let bodyData = [];
      let tableElement = document.getElementById('tab');
      let rows = tableElement.querySelectorAll('tr');
      for (let i = 0; i < rows.length; i++) {
        let row = rows[i];
        let cols = row.querySelectorAll('td');
        let rowData = [];
        for (let j = 0; j < cols.length; j++) {
          let col = cols[j];
          rowData.push(col.innerText);
        }
        bodyData.push(rowData);
      }
      let headers = ['Nombre','Direcccion','telefono', 'Boletas']
      autoTable(doc, {
        head: [headers],
        body: bodyData,
      });
      doc.save('Registro.pdf');
    }



function personalizar() {
  showPersonalizar.value = !showPersonalizar.value
}

function obtener() {
  if (nombre.value === "") {
    mostrarError("Debe ingresar el nombre");
  } else if (direccion.value === "") {
    mostrarError("Debe ingresar su direccion (ej:Cra xx # xx - xx)");
  } else if (telefono.value.length < 10) {
    mostrarError("Debe ingresar su telefono con una cantidad de mas de 10 digitos");
  } else {

    if (pagado.value == "pagado") {
    adquirido('boleta adquirida');
    showadquirir.value = !showadquirir.value
    listar()


  } else if(pagado.value == "reserva"){
    adquirido('boleta en estado de reserva');
    showadquirir.value = !showadquirir.value
      
    verdatos()
  }
  }
}

  
function liberar() {
  botonBoletas.value[Iestado.value].estado = "disponible";

  let index = Datosnopagada.value.findIndex(item => item.boleta==Iestado.value);
if(index!==-1){
  Datosnopagada.value.splice(index,1)

let indexR = -1;
let indexBoleta = -1;

resultados.value.some((item, index) => {
    const boletaIndex = item.boleta.indexOf(Iestado.value);
    if (boletaIndex !== -1) {
        indexR = index;
        indexBoleta = boletaIndex;
        return true;
    }
});

if (indexR !== -1 && indexBoleta !== -1) {
    resultados.value[indexR].boleta.splice(indexBoleta, 1);
    console.log("Numero eliminado de item.boleta:", Iestado.value);
} else {
    console.log("Numero no encontrado en item.boleta.");
}
}
}

  
  

function marcar() {
  botonBoletas.value[Iestado.value].estado="pagada"
  
}


function encontrarCoincidencias(Datospagada, Datosnopagada) {

    let boletasAdquiridas = Datospagada.concat(Datosnopagada);

    boletasAdquiridas.forEach(function(item1) {
        let encontrado = resultados.value.find(function(item2) {
            return item1.telefono == item2.telefono;
        });

        if (encontrado) {
            let index = resultados.value.findIndex(function(item2) {
            return item1.telefono == item2.telefono;
        })
      if (!resultados.value[index].boleta.includes(item1.boleta)) {
        resultados.value[index].boleta.push(item1.boleta);
      
        } }else {
            resultados.value.push({
                nombre: item1.nombre,
                direccion: item1.direccion,
                telefono: item1.telefono,
                boleta:[item1.boleta]
            });
        }
    
    console.log(`esto es resultados:${resultados}`);
      });

    console.log(`esto es boletasAdquiridas:${boletasAdquiridas}`);
    
    return resultados.value;
}


// function encontrarCoincidencias(Datospagada, Datosnopagada) {
//     let resultados = {
//         value: []
//     };

//     let boletasAdquiridas = Datospagada.concat(Datosnopagada);

//     boletasAdquiridas.forEach(function(item1) {
//         let encontrado = resultados.value.find(function(item2) {
//             return item1.telefono == item2.telefono;
//         });

//         if (encontrado) {
//             let index = resultados.value.findIndex(function(item2) {
//                 return item1.telefono == item2.telefono;
//             });
//             if (!resultados.value[index].Boletas.includes(item1.boleta)) {
//                 resultados.value[index].Boletas.push(item1.boleta);
//             }
//         } else {
//             resultados.value.push({
//                 nombre: item1.nombre,
//                 direccion: item1.direccion,
//                 telefono: item1.telefono,
//                 Boletas: [item1.boleta]
//             });
//         }
//     });

//     resultados.value.forEach(function(item) {
//         console.log(`Nombre: ${item.nombre}, Dirección: ${item.direccion}, Teléfono: ${item.telefono}, Boletas: ${item.Boletas.join(', ')}`);
//     });

//     console.log('Esto son los resultados:', resultados.value);
//     console.log('Esto es boletasAdquiridas:', boletasAdquiridas);

//     return resultados.value;
// }





</script>

<!-- MAQUETADO_________________________________________________________________________________________________ -->

<template>
  <div class="contenedorPrincipal">

      <div :style="{ backgroundColor: selectedColor1 }" id="miDiv3" class="talonario">


      <div class="disponible" v-if="showDisponible">

        <div class="tituloadquirir">
        <h3>Boleta {{ Iestado }}</h3>
        <div class="equis1" >
          <button id="equis1" @click="cerrardatos3()"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.6585 4.92888C18.049 4.53836 18.6822 4.53835 19.0727 4.92888C19.4632 5.3194 19.4632 5.95257 19.0727 6.34309L13.4158 12L19.0727 17.6568C19.4632 18.0473 19.4632 18.6805 19.0727 19.071C18.6822 19.4615 18.049 19.4615 17.6585 19.071L12.0016 13.4142L6.34481 19.071C6.3387 19.0771 6.33254 19.0831 6.32632 19.089C5.93455 19.4614 5.31501 19.4554 4.93059 19.071C4.6377 18.7781 4.56447 18.3487 4.71092 17.9876C4.75973 17.8672 4.83296 17.7544 4.93059 17.6568L10.5874 12L4.93059 6.34314C4.54006 5.95262 4.54006 5.31945 4.93059 4.92893C5.32111 4.5384 5.95428 4.5384 6.3448 4.92893L12.0016 10.5857L17.6585 4.92888Z" fill="white"/>
</svg>
</button>
        </div>
      </div>
        <h5>Estado: {{ botonBoletas[Iestado].estado }} </h5>
        <button id="adquirirb" @click="adquirir()">adquirir boleta</button>
      </div>


      <div class="adquirir" v-if="showadquirir">
  
        <div class="tituloboladquirir">
        <h3 id="bol">Boleta a Adquirir: {{ Iestado }}</h3>
        <div class="equis" >
          <button id="equis5" @click="cerrardatos6()"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.6585 4.92888C18.049 4.53836 18.6822 4.53835 19.0727 4.92888C19.4632 5.3194 19.4632 5.95257 19.0727 6.34309L13.4158 12L19.0727 17.6568C19.4632 18.0473 19.4632 18.6805 19.0727 19.071C18.6822 19.4615 18.049 19.4615 17.6585 19.071L12.0016 13.4142L6.34481 19.071C6.3387 19.0771 6.33254 19.0831 6.32632 19.089C5.93455 19.4614 5.31501 19.4554 4.93059 19.071C4.6377 18.7781 4.56447 18.3487 4.71092 17.9876C4.75973 17.8672 4.83296 17.7544 4.93059 17.6568L10.5874 12L4.93059 6.34314C4.54006 5.95262 4.54006 5.31945 4.93059 4.92893C5.32111 4.5384 5.95428 4.5384 6.3448 4.92893L12.0016 10.5857L17.6585 4.92888Z" fill="white"/>
</svg>
</button>
        </div>
      </div>
        <div class="nombre"><svg width="30" height="27" viewBox="0 0 24 24" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7ZM14 7C14 8.10457 13.1046 9 12 9C10.8954 9 10 8.10457 10 7C10 5.89543 10.8954 5 12 5C13.1046 5 14 5.89543 14 7Z"
              fill="white" />
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M20 17.1666C20 16.7333 19.8642 16.3074 19.5815 15.979C17.7477 13.8488 15.0313 12.5 12 12.5C8.96866 12.5 6.25235 13.8488 4.41847 15.979C4.13576 16.3074 4 16.7333 4 17.1666V19C4 20.1046 4.89543 21 6 21H18C19.1046 21 20 20.1046 20 19V17.1666ZM18 17.2083C16.5313 15.5445 14.3887 14.5 12 14.5C9.61132 14.5 7.46872 15.5445 6 17.2083V19H18V17.2083ZM6.00017 17.1622C6.00017 17.1622 6.00018 17.1622 6.00017 17.1623C6.00016 17.1624 6.00015 17.1625 6.00012 17.1627C6.00014 17.1625 6.00016 17.1623 6.00017 17.1622Z"
              fill="white" />
          </svg>
          <input id="input" type="text" placeholder="Nombre" v-model.trim="nombre" />
        </div>
        <div class="telefono"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M21.0047 21.342C21.6329 20.8043 21.9962 20.02 22 19.1931V16.1795C22 15.3021 21.4281 14.5272 20.5898 14.2685L17.1131 13.1956C16.4856 13.002 15.8031 13.1287 15.2869 13.5346L13.8995 14.6258C13.0354 14.0205 12.2118 13.3319 11.4399 12.5601C10.6681 11.7882 9.97951 10.9646 9.37419 10.1005L10.4654 8.71309C10.8713 8.19694 10.998 7.5144 10.8044 6.88693L9.73153 3.41025C9.47281 2.57186 8.69786 2 7.82046 2H4.8069C3.98001 2.00381 3.19565 2.3671 2.65797 2.99532C2.21357 3.51456 1.96206 4.17697 2.00467 4.85909C2.27326 9.15824 4.04992 13.3803 7.33479 16.6652C10.6197 19.9501 14.8418 21.7267 19.1409 21.9953C19.823 22.0379 20.4854 21.7864 21.0047 21.342ZM7.80217 8.86404C7.257 9.55719 7.23015 10.5256 7.73607 11.2479C8.40782 12.2069 9.17126 13.1198 10.0257 13.9743C10.8802 14.8287 11.7931 15.5922 12.7521 16.2639C13.4744 16.7698 14.4428 16.743 15.136 16.1978L16.5233 15.1067L20 16.1795V19.1872C19.9979 19.4317 19.8901 19.6635 19.7042 19.8226C19.5325 19.9695 19.3695 20.0057 19.2656 19.9992C15.434 19.7598 11.6762 18.1782 8.749 15.251C5.82181 12.3238 4.24016 8.56596 4.00078 4.73438C3.99429 4.63048 4.03046 4.46752 4.17743 4.2958C4.33653 4.10991 4.5683 4.00206 4.81287 4H7.82046L8.89334 7.47667L7.80217 8.86404Z"
              fill="white" />
          </svg>
          <input id="input" type="text" placeholder="Telefono" v-model.trim="telefono" />
        </div>
        <div class="direccion"><svg width="28" height="25" viewBox="0 0 24 24" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M3 11.8284C3 11.2979 3.21071 10.7892 3.58579 10.4142L10.5858 3.41416C11.3668 2.63311 12.6332 2.63311 13.4142 3.41416L20.4142 10.4142C20.7893 10.7892 21 11.2979 21 11.8284V20C21 20.5522 20.5523 21 20 21H14C13.4477 21 13 20.5522 13 20V15H11V20C11 20.5522 10.5523 21 10 21H4C3.44772 21 3 20.5522 3 20V11.8284ZM12 4.82837L5 11.8284V19H9V13.9999C9 13.4477 9.44772 12.9999 10 12.9999H14C14.5523 12.9999 15 13.4477 15 13.9999V19H19V11.8284L12 4.82837Z"
              fill="white" />
          </svg>
          <input id="input" type="text" placeholder="Direccion" v-model.trim="direccion" />
        </div>
        <div class="pagar">
          <label for="ya">Pagar ya:</label>
          <input type="radio" id="si" v-model="pagado" value="pagado"/>
          <label for="paga">Si</label>
          <input type="radio" id="si" v-model="pagado" value="reserva" />
          <label for="paga">No</label>
        </div>
        <button id="botadquirir" @click="obtener()">ADQUIRIR</button>
      </div>

      <div class="participante" v-if="showParticipante">
        <div class="tituloparticipante">
          <P>PARTICIPANTE</P>
        
          <div class="equis" >
          <button id="equis" @click="cerrardatos4()"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.6585 4.92888C18.049 4.53836 18.6822 4.53835 19.0727 4.92888C19.4632 5.3194 19.4632 5.95257 19.0727 6.34309L13.4158 12L19.0727 17.6568C19.4632 18.0473 19.4632 18.6805 19.0727 19.071C18.6822 19.4615 18.049 19.4615 17.6585 19.071L12.0016 13.4142L6.34481 19.071C6.3387 19.0771 6.33254 19.0831 6.32632 19.089C5.93455 19.4614 5.31501 19.4554 4.93059 19.071C4.6377 18.7781 4.56447 18.3487 4.71092 17.9876C4.75973 17.8672 4.83296 17.7544 4.93059 17.6568L10.5874 12L4.93059 6.34314C4.54006 5.95262 4.54006 5.31945 4.93059 4.92893C5.32111 4.5384 5.95428 4.5384 6.3448 4.92893L12.0016 10.5857L17.6585 4.92888Z" fill="white"/>
</svg>
</button>
        </div>
        </div>
        <div class="datosparticipante">
          <div class="nombrep">
            <p id="p">NOMBRE</p>
            <p id="pa"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7ZM14 7C14 8.10457 13.1046 9 12 9C10.8954 9 10 8.10457 10 7C10 5.89543 10.8954 5 12 5C13.1046 5 14 5.89543 14 7Z"
                  fill="black" />
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M20 17.1666C20 16.7333 19.8642 16.3074 19.5815 15.979C17.7477 13.8488 15.0313 12.5 12 12.5C8.96866 12.5 6.25235 13.8488 4.41847 15.979C4.13576 16.3074 4 16.7333 4 17.1666V19C4 20.1046 4.89543 21 6 21H18C19.1046 21 20 20.1046 20 19V17.1666ZM18 17.2083C16.5313 15.5445 14.3887 14.5 12 14.5C9.61132 14.5 7.46872 15.5445 6 17.2083V19H18V17.2083ZM6.00017 17.1622C6.00017 17.1622 6.00018 17.1622 6.00017 17.1623C6.00016 17.1624 6.00015 17.1625 6.00012 17.1627C6.00014 17.1625 6.00016 17.1623 6.00017 17.1622Z"
                  fill="black" />
              </svg>{{ nombre }}</p>
          </div>
          <div class="nombrep">
            <p id="p">DIRECCION</p>
            <p id="pa"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M3 11.8284C3 11.2979 3.21071 10.7892 3.58579 10.4142L10.5858 3.41416C11.3668 2.63311 12.6332 2.63311 13.4142 3.41416L20.4142 10.4142C20.7893 10.7892 21 11.2979 21 11.8284V20C21 20.5522 20.5523 21 20 21H14C13.4477 21 13 20.5522 13 20V15H11V20C11 20.5522 10.5523 21 10 21H4C3.44772 21 3 20.5522 3 20V11.8284ZM12 4.82837L5 11.8284V19H9V13.9999C9 13.4477 9.44772 12.9999 10 12.9999H14C14.5523 12.9999 15 13.4477 15 13.9999V19H19V11.8284L12 4.82837Z"
                  fill="black" />
              </svg>{{ direccion }}</p>
          </div>
          <div class="nombrep">
            <p id="p">TELEFONO</p>
            <p id="pa"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M21.0047 21.342C21.6329 20.8043 21.9962 20.02 22 19.1931V16.1795C22 15.3021 21.4281 14.5272 20.5898 14.2685L17.1131 13.1956C16.4856 13.002 15.8031 13.1287 15.2869 13.5346L13.8995 14.6258C13.0354 14.0205 12.2118 13.3319 11.4399 12.5601C10.6681 11.7882 9.97951 10.9646 9.37419 10.1005L10.4654 8.71309C10.8713 8.19694 10.998 7.5144 10.8044 6.88693L9.73153 3.41025C9.47281 2.57186 8.69786 2 7.82046 2H4.8069C3.98001 2.00381 3.19565 2.3671 2.65797 2.99532C2.21357 3.51456 1.96206 4.17697 2.00467 4.85909C2.27326 9.15824 4.04992 13.3803 7.33479 16.6652C10.6197 19.9501 14.8418 21.7267 19.1409 21.9953C19.823 22.0379 20.4854 21.7864 21.0047 21.342ZM7.80217 8.86404C7.257 9.55719 7.23015 10.5256 7.73607 11.2479C8.40782 12.2069 9.17126 13.1198 10.0257 13.9743C10.8802 14.8287 11.7931 15.5922 12.7521 16.2639C13.4744 16.7698 14.4428 16.743 15.136 16.1978L16.5233 15.1067L20 16.1795V19.1872C19.9979 19.4317 19.8901 19.6635 19.7042 19.8226C19.5325 19.9695 19.3695 20.0057 19.2656 19.9992C15.434 19.7598 11.6762 18.1782 8.749 15.251C5.82181 12.3238 4.24016 8.56596 4.00078 4.73438C3.99429 4.63048 4.03046 4.46752 4.17743 4.2958C4.33653 4.10991 4.5683 4.00206 4.81287 4H7.82046L8.89334 7.47667L7.80217 8.86404Z"
                  fill="black" />
              </svg>{{ telefono }}</p>
          </div>
          <div class="nombrep">
            <p id="p">ESTADO</p>
            <p id="pa"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M11.2756 13.5065C10.9983 13.5065 10.7627 13.2794 10.7993 13.0046C10.8196 12.8526 10.8513 12.7447 10.8945 12.5978C10.8956 12.5942 10.8966 12.5905 10.8977 12.5869C10.9053 12.5613 10.9131 12.5344 10.9213 12.5059C11.0204 12.1735 11.1642 11.9051 11.3528 11.7005C11.5414 11.496 11.7683 11.3106 12.0336 11.1444C12.2317 11.0166 12.4091 10.8839 12.5657 10.7465C12.7223 10.6091 12.8469 10.4573 12.9396 10.2911C13.0323 10.1217 13.0787 9.93313 13.0787 9.72539C13.0787 9.50486 13.0259 9.3115 12.9205 9.14531C12.815 8.97912 12.6728 8.85128 12.4938 8.76179C12.318 8.6723 12.1231 8.62756 11.9089 8.62756C11.7012 8.62756 11.5046 8.6739 11.3193 8.76658C11.1339 8.85607 10.9821 8.9903 10.8638 9.16928C10.8251 9.22677 10.7923 9.28887 10.7652 9.35558C10.6641 9.6049 10.459 9.82606 10.19 9.82606H9.22875C8.94771 9.82606 8.71708 9.59328 8.76178 9.31582C8.82867 8.90053 8.96685 8.54327 9.17632 8.24403C9.46715 7.82535 9.85228 7.51374 10.3317 7.3092C10.8111 7.10145 11.34 6.99758 11.9185 6.99758C12.5545 6.99758 13.117 7.10305 13.606 7.31399C14.095 7.52173 14.4785 7.82376 14.7566 8.22006C15.0346 8.61637 15.1737 9.09418 15.1737 9.65348C15.1737 10.0274 15.1113 10.3598 14.9867 10.6506C14.8652 10.9383 14.6943 11.194 14.4737 11.4177C14.2532 11.6382 13.9927 11.838 13.6923 12.0169C13.4398 12.1672 13.2321 12.3238 13.0691 12.4868C12.9093 12.6498 12.7894 12.8383 12.7095 13.0525C12.7037 13.0687 12.6981 13.0851 12.6926 13.1015C12.6167 13.3313 12.4136 13.5065 12.1716 13.5065H11.2756Z"
                  fill="black" />
                <path
                  d="M11.7219 17.0746C11.4023 17.0746 11.1291 16.9628 10.9022 16.7391C10.6784 16.5121 10.5682 16.2405 10.5714 15.9241C10.5682 15.6109 10.6784 15.3424 10.9022 15.1187C11.1291 14.895 11.4023 14.7831 11.7219 14.7831C12.0256 14.7831 12.2924 14.895 12.5226 15.1187C12.7527 15.3424 12.8693 15.6109 12.8725 15.9241C12.8693 16.135 12.8134 16.3284 12.7047 16.5042C12.5993 16.6767 12.4602 16.8158 12.2876 16.9212C12.1151 17.0235 11.9265 17.0746 11.7219 17.0746Z"
                  fill="black" />
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12Z"
                  fill="black" />
              </svg>
              {{ botonBoletas[Iestado].estado  }}</p>
          </div>
        </div>
      </div>

      <div class="boletapagada" v-if="showBoletapagada">
        <div class="equis1" >
          <button id="equis4" @click="cerrardatos5()"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.6585 4.92888C18.049 4.53836 18.6822 4.53835 19.0727 4.92888C19.4632 5.3194 19.4632 5.95257 19.0727 6.34309L13.4158 12L19.0727 17.6568C19.4632 18.0473 19.4632 18.6805 19.0727 19.071C18.6822 19.4615 18.049 19.4615 17.6585 19.071L12.0016 13.4142L6.34481 19.071C6.3387 19.0771 6.33254 19.0831 6.32632 19.089C5.93455 19.4614 5.31501 19.4554 4.93059 19.071C4.6377 18.7781 4.56447 18.3487 4.71092 17.9876C4.75973 17.8672 4.83296 17.7544 4.93059 17.6568L10.5874 12L4.93059 6.34314C4.54006 5.95262 4.54006 5.31945 4.93059 4.92893C5.32111 4.5384 5.95428 4.5384 6.3448 4.92893L12.0016 10.5857L17.6585 4.92888Z" fill="white"/>
</svg>
</button>
        </div>
          <button id="ver" @click="verdatosparticipante()">Ver datos del participante de la boleta pagada</button>
</div>


      <div class="boletanopagada" v-if="showBoletanopagada">
        <div class="titulobolnopaga">
          <p>Boleta numero:</p>
          <div class="equis" >
          <button id="equis" @click="cerrardatos()"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.6585 4.92888C18.049 4.53836 18.6822 4.53835 19.0727 4.92888C19.4632 5.3194 19.4632 5.95257 19.0727 6.34309L13.4158 12L19.0727 17.6568C19.4632 18.0473 19.4632 18.6805 19.0727 19.071C18.6822 19.4615 18.049 19.4615 17.6585 19.071L12.0016 13.4142L6.34481 19.071C6.3387 19.0771 6.33254 19.0831 6.32632 19.089C5.93455 19.4614 5.31501 19.4554 4.93059 19.071C4.6377 18.7781 4.56447 18.3487 4.71092 17.9876C4.75973 17.8672 4.83296 17.7544 4.93059 17.6568L10.5874 12L4.93059 6.34314C4.54006 5.95262 4.54006 5.31945 4.93059 4.92893C5.32111 4.5384 5.95428 4.5384 6.3448 4.92893L12.0016 10.5857L17.6585 4.92888Z" fill="white"/>
</svg>
</button>
        </div>
        </div>
        <div class="bolnopaga">
          <div class="bolnopagada"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M16.0001 12C16.0001 14.2091 14.2092 16 12.0001 16C9.79097 16 8.0001 14.2091 8.0001 12C8.0001 9.79086 9.79097 8 12.0001 8C14.2092 8 16.0001 9.79086 16.0001 12ZM14.0001 12C14.0001 13.1046 13.1047 14 12.0001 14C10.8955 14 10.0001 13.1046 10.0001 12C10.0001 10.8954 10.8955 10 12.0001 10C13.1047 10 14.0001 10.8954 14.0001 12Z"
                fill="black" />
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M22.6059 12.7781C22.8745 12.2893 22.8745 11.7107 22.6059 11.2219C21.5011 9.21142 18.0534 4 12.0001 4C5.94677 4 2.49915 9.21141 1.39435 11.2219C1.12571 11.7107 1.12571 12.2893 1.39435 12.7781C2.49915 14.7886 5.94677 20 12.0001 20C18.0534 20 21.5011 14.7886 22.6059 12.7781ZM20.7495 12C20.2262 11.0814 19.2538 9.61152 17.8334 8.35493C16.3304 7.02516 14.4072 6 12.0001 6C9.59298 6 7.66981 7.02516 6.16677 8.35493C4.74644 9.61152 3.77399 11.0814 3.25071 12C3.77399 12.9186 4.74644 14.3885 6.16677 15.6451C7.66981 16.9748 9.59298 18 12.0001 18C14.4072 18 16.3304 16.9748 17.8334 15.6451C19.2538 14.3885 20.2262 12.9186 20.7495 12Z"
                fill="black" />
            </svg>
            <button id="liberar" @click="verdatosparticipante()">Ver datos del participante</button>
          </div>
          <div class="bolnopagada"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M20 12C20 16.4183 16.4183 20 12 20C8.22522 20 5.06106 17.3856 4.21945 13.8688C4.10205 13.3782 3.68329 13 3.17885 13H3.15358C2.56224 13 2.09591 13.5126 2.21895 14.091C3.18034 18.6101 7.19429 22 12 22C17.5229 22 22 17.5228 22 12C22 6.47715 17.5229 2 12 2C8.41135 2 5.26421 3.89033 3.5 6.72958V4.5C3.5 3.94772 3.05228 3.5 2.5 3.5C2.46548 3.5 2.43137 3.50175 2.39776 3.50516C1.8935 3.55637 1.5 3.98223 1.5 4.5V9C1.5 9.26522 1.60536 9.51957 1.79289 9.70711C1.98043 9.89464 2.23478 10 2.5 10L7 10C7.55229 10 8 9.55228 8 9C8 8.44771 7.55228 8 7 8L5.07026 8C6.4535 5.60879 9.03887 4 12 4C16.4183 4 20 7.58172 20 12Z"
                fill="black" />
              <path
                d="M12 7.5C11.4477 7.5 11 7.94772 11 8.5V12C11 12.3573 11.1906 12.6874 11.5 12.866L14.9641 14.866C15.0239 14.9005 15.0858 14.9282 15.1488 14.9492C15.5901 15.0963 16.0885 14.9185 16.3301 14.5C16.6063 14.0217 16.4424 13.4101 15.9641 13.134L13 11.4227V8.5C13 7.94772 12.5523 7.5 12 7.5Z"
                fill="black" />
            </svg>
            <button id="liberar"   @click="liberar()" >liberar boleta</button>
          </div>
          <div class="bolnopagada"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M16.5001 8.99998C16.8906 9.3905 16.8906 10.0237 16.5001 10.4142L11.7072 15.2071C11.3167 15.5976 10.6835 15.5976 10.293 15.2071L8.0001 12.9142C7.60958 12.5237 7.60958 11.8905 8.0001 11.5C8.39063 11.1095 9.02379 11.1095 9.41432 11.5L11.0001 13.0858L15.0859 8.99998C15.1347 8.95116 15.1873 8.90845 15.2428 8.87184C15.6309 8.61556 16.1584 8.65827 16.5001 8.99998Z"
                fill="black" />
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12Z"
                fill="black" />
            </svg>
            <button id="liberar" @click="marcar()">Marcar como pagada</button>
          </div>
        </div>
      </div>

      <div class="listado" v-if="showlistadoboletas">
        <div class="titulolistado">
          <p>LISTADO DE BOLETAS</p>
          <div class="equis" >
          <button id="equis2" @click="cerrardatos1()"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.6585 4.92888C18.049 4.53836 18.6822 4.53835 19.0727 4.92888C19.4632 5.3194 19.4632 5.95257 19.0727 6.34309L13.4158 12L19.0727 17.6568C19.4632 18.0473 19.4632 18.6805 19.0727 19.071C18.6822 19.4615 18.049 19.4615 17.6585 19.071L12.0016 13.4142L6.34481 19.071C6.3387 19.0771 6.33254 19.0831 6.32632 19.089C5.93455 19.4614 5.31501 19.4554 4.93059 19.071C4.6377 18.7781 4.56447 18.3487 4.71092 17.9876C4.75973 17.8672 4.83296 17.7544 4.93059 17.6568L10.5874 12L4.93059 6.34314C4.54006 5.95262 4.54006 5.31945 4.93059 4.92893C5.32111 4.5384 5.95428 4.5384 6.3448 4.92893L12.0016 10.5857L17.6585 4.92888Z" fill="white"/>
</svg>
</button>
        </div>
          <div class="buscador">
            <input type="text" placeholder="Buscar" id="buscador"><svg width="24" height="24" viewBox="0 0 24 24"
              fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M10.502 2C5.80753 2 2.00195 5.80558 2.00195 10.5C2.00195 15.1944 5.80753 19 10.502 19C12.4884 19 14.3169 18.3176 15.7637 17.176L20.5877 22C20.9783 22.3905 21.6114 22.3905 22.002 22C22.3925 21.6095 22.3925 20.9763 22.002 20.5858L17.1779 15.7618C18.3196 14.3149 19.002 12.4865 19.002 10.5C19.002 5.80558 15.1964 2 10.502 2ZM4.00195 10.5C4.00195 6.91015 6.9121 4 10.502 4C14.0918 4 17.002 6.91015 17.002 10.5C17.002 12.2952 16.2755 13.9188 15.0981 15.0962C13.9208 16.2736 12.2972 17 10.502 17C6.9121 17 4.00195 14.0899 4.00195 10.5Z"
                fill="black" />
            </svg>
          </div>
        </div>
        <div class="listadobol">
            <div  class="boletacomprada" v-for="(item1, i) in resultados" :key="i"  :v-if="showboletacomprada">
            <div class="datop">
              <div class="texto-nombre">Nombre</div>
              <div class="texto-nombrep">{{ item1.nombre }}</div>
            </div>
            <div class="datop">
              <div class="texto-nombre">Teléfono</div>
              <div class="texto-telefono">{{ item1.telefono }}</div>
            </div>
            <div class="datop">
              <div class="texto-nombre">Direccion:</div>
              <div class="texto-direccion">{{ item1.direccion }}</div>
            </div>
            <div class="datop">
              <div class="texto-nombre">Boletas</div>
              <div class="texto-09-10">{{ item1.boleta.join(', ') }}</div>
            </div>
          </div>
        </div>
        <div class="botoncerrar">
          <button id="cerrarlistado" @click="cerrar()">CERRAR</button>
        </div>
      </div>

      <div :style="{ backgroundColor: selectedColor }" id="miDiv" class="header">
        <p class="titulotalonario">TALONARIO</p>
      </div>

      <div class="configurarTalonario" v-if="showDiv">
        <input type="text" placeholder="Premio" v-model.trim="premio" id="espacio" />
        <input type="valorBoleta" placeholder="Valor Boleta" v-model.trim="valorBoleta" id="espacio" />
        <select v-model="loteria" id="espacio">
          <option value="" disabled selected>loteria</option>
          <option value="Boyacá">loteria de Boyacá</option>
          <hr>
          <option value="Santander">loteria de Santander</option>
          <hr>
          <option value="Cundimarca">loteria de Cundimarca</option>
        </select>
        <select v-model="numeroboletas" id="espacio">
          <option value="" disabled selected>Numero de boletas</option>
          <option value="100">0-99</option>
          <hr>
          <option value="1000">0-999</option>
        </select>
        <input placeholder="fecha del sorteo" type="date" v-model="fecha" id="espacio" />
        <button id="guardar" @click="guardar()">GUARDAR</button>
      </div>
      <section id="loteria">
        <button id="fichas" v-for="(e, i) in botonBoletas" :key="i" :class="getColorClass(e.estado)" @click="modifiicarboleta(e, i)">{{ i < 10 ? '0' + i : i }} </button>
      </section>
      <div class="fondo1">
          <div :style="{ backgroundColor: seleccionacolor }" id="3" class="fondo">

          <div class="subtitulo">
            <h4>INFORMACION</h4>
          </div>
          <div class="informacion" style="color:black">
            <div class="premio">
              <h3>🏆 {{ premio }} </h3>
            </div>
            <div class="precioVoleta">
              <h3>💲{{valorBoleta }}</h3>
            </div>
            <div class="loteria">
              <h3>🏦{{ loteria }}</h3>
            </div>
            <div class="fecha">
              <h3>🗓️{{ fecha }}</h3>
            </div>
            <button id="edita" @click="editar(item, i)">EDITAR<svg width="24" height="24" viewBox="0 0 24 24"
                fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M7.58579 11.9142C7.21071 12.2892 7 12.7979 7 13.3284V16C7 16.5522 7.44772 17 8 17H10.6716C11.202 17 11.7107 16.7892 12.0858 16.4142L21.5858 6.91416C22.3668 6.13311 22.3668 4.86678 21.5858 4.08573L19.9142 2.41416C19.1332 1.63311 17.8668 1.63311 17.0858 2.41416L7.58579 11.9142ZM10.6716 15H9L9 13.3284L18.5 3.82837L20.1716 5.49995L10.6716 15Z"
                  fill="black" />
                <path
                  d="M10 3.99994C10 4.55223 9.55229 4.99995 9 4.99995H4L4 20H19V15C19 14.4477 19.4477 14 20 14C20.5523 14 21 14.4477 21 15V20C21 21.1045 20.1046 22 19 22H4C2.89543 22 2 21.1045 2 20V4.99995C2 3.89538 2.89543 2.99994 4 2.99994H9C9.55229 2.99994 10 3.44766 10 3.99994Z"
                  fill="black" />
              </svg></button>
          </div>
</div>

          <div :style="{ backgroundColor: seleccionacolor }" id="miDiv2" class="accion">

          <div class="subtitulo">
            <h5>ACCIONES</h5>
          </div>
          <div class="acciones">
            <button id="espacio2" @click="mirarestado()">ESTADO</button>
            <button id="espacio1" @click="listardatosparticipante()"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M2 5C2 3.89543 2.89543 3 4 3H20C21.1046 3 22 3.89543 22 5V5.24853C22 5.73298 21.8242 6.20096 21.5052 6.56554L15.4948 13.4345C15.1758 13.799 15 14.267 15 14.7515V20.5585C15 21.4193 14.4491 22.1836 13.6325 22.4559L10.3162 23.5613C9.6687 23.7771 9 23.2951 9 22.6126V14.7515C9 14.267 8.82416 13.799 8.50515 13.4345L2.49485 6.56554C2.17584 6.20096 2 5.73298 2 5.24853V5ZM4 5.24853L4 5H20V5.24853L13.9897 12.1175C13.3517 12.8466 13 13.7826 13 14.7515V20.5585L11 21.2252V14.7515C11 13.7826 10.6483 12.8466 10.0103 12.1175L4 5.24853Z"
                  fill="black" />
              </svg>LISTAR TUS BOLETAS</button>
            <button id="espacio1" @click="personalizar()"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M12.0002 16C14.2094 16 16.0002 14.2091 16.0002 12C16.0002 9.79086 14.2094 8 12.0002 8C9.79109 8 8.00023 9.79086 8.00023 12C8.00023 14.2091 9.79109 16 12.0002 16ZM12.0002 14C13.1048 14 14.0002 13.1046 14.0002 12C14.0002 10.8954 13.1048 10 12.0002 10C10.8957 10 10.0002 10.8954 10.0002 12C10.0002 13.1046 10.8957 14 12.0002 14Z"
                  fill="black" />
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M15.1182 1.86489L15.5203 4.81406C15.8475 4.97464 16.1621 5.1569 16.4623 5.35898L19.2185 4.23223C19.6814 4.043 20.2129 4.2248 20.463 4.65787L22.5901 8.34213C22.8401 8.77521 22.7318 9.3264 22.3365 9.63266L19.9821 11.4566C19.9941 11.6362 20.0002 11.8174 20.0002 12C20.0002 12.1826 19.9941 12.3638 19.9821 12.5434L22.3365 14.3673C22.7318 14.6736 22.8401 15.2248 22.5901 15.6579L20.463 19.3421C20.2129 19.7752 19.6814 19.957 19.2185 19.7678L16.4623 18.641C16.1621 18.8431 15.8475 19.0254 15.5203 19.1859L15.1182 22.1351C15.0506 22.6306 14.6274 23 14.1273 23H9.87313C9.37306 23 8.94987 22.6306 8.8823 22.1351L8.48014 19.1859C8.15296 19.0254 7.83835 18.8431 7.53818 18.641L4.78195 19.7678C4.31907 19.957 3.78756 19.7752 3.53752 19.3421L1.41042 15.6579C1.16038 15.2248 1.26869 14.6736 1.66401 14.3673L4.01841 12.5434C4.00636 12.3638 4.00025 12.1826 4.00025 12C4.00025 11.8174 4.00636 11.6362 4.01841 11.4566L1.66401 9.63266C1.26869 9.3264 1.16038 8.77521 1.41041 8.34213L3.53752 4.65787C3.78755 4.2248 4.31906 4.043 4.78195 4.23223L7.53818 5.35898C7.83835 5.1569 8.15296 4.97464 8.48014 4.81406L8.8823 1.86489C8.94987 1.3694 9.37306 1 9.87313 1H14.1273C14.6274 1 15.0506 1.3694 15.1182 1.86489ZM13.6826 6.14004L14.6392 6.60948C14.8842 6.72975 15.1201 6.86639 15.3454 7.01805L16.231 7.61423L19.1674 6.41382L20.4216 8.58619L17.9153 10.5278L17.9866 11.5905C17.9956 11.7255 18.0002 11.8621 18.0002 12C18.0002 12.1379 17.9956 12.2745 17.9866 12.4095L17.9153 13.4722L20.4216 15.4138L19.1674 17.5862L16.231 16.3858L15.3454 16.982C15.1201 17.1336 14.8842 17.2702 14.6392 17.3905L13.6826 17.86L13.2545 21H10.746L10.3178 17.86L9.36131 17.3905C9.11626 17.2702 8.88037 17.1336 8.6551 16.982L7.76954 16.3858L4.83313 17.5862L3.57891 15.4138L6.0852 13.4722L6.01392 12.4095C6.00487 12.2745 6.00024 12.1379 6.00024 12C6.00024 11.8621 6.00487 11.7255 6.01392 11.5905L6.0852 10.5278L3.57891 8.58619L4.83312 6.41382L7.76953 7.61423L8.6551 7.01805C8.88037 6.86639 9.11625 6.72976 9.36131 6.60949L10.3178 6.14004L10.746 3H13.2545L13.6826 6.14004Z"
                  fill="black" />
              </svg>PERSONALIZAR TALONARIO WEB</button>
            <button id="espacio1" @click="exportPdf()"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M15.5907 10.0001L13.005 12.5858V3.00006C13.005 2.96554 13.0032 2.93143 12.9998 2.89782C12.9486 2.39356 12.5227 2.00006 12.005 2.00006C11.4527 2.00006 11.005 2.44778 11.005 3.00006V12.5858L8.41917 10C8.02865 9.60951 7.39548 9.60951 7.00496 10C6.61443 10.3906 6.61443 11.0237 7.00496 11.4143L11.2979 15.7072C11.4854 15.8947 11.7398 16.0001 12.005 16.0001C12.2702 16.0001 12.5245 15.8947 12.7121 15.7072L17.005 11.4143C17.0538 11.3655 17.0965 11.3129 17.1331 11.2574C17.3894 10.8693 17.3467 10.3418 17.005 10.0001C16.6144 9.60955 15.9813 9.60955 15.5907 10.0001Z"
                  fill="black" />
                <path
                  d="M4.00488 14.0001C4.55717 14.0001 5.00488 14.4478 5.00488 15.0001V19.0001H19.0049V15.0001C19.0049 14.4478 19.4526 14.0001 20.0049 14.0001C20.5572 14.0001 21.0049 14.4478 21.0049 15.0001V19.0001C21.0049 20.1047 20.1095 21.0001 19.0049 21.0001H5.00488C3.90031 21.0001 3.00488 20.1047 3.00488 19.0001V15.0001C3.00488 14.4478 3.4526 14.0001 4.00488 14.0001Z"
                  fill="black" />
              </svg>GENERAR ARCHIVOS DE DATOS</button>
            <div class="botonesAcciones">
              <button id="busca" @click="crear()"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M10.502 2C5.80753 2 2.00195 5.80558 2.00195 10.5C2.00195 15.1944 5.80753 19 10.502 19C12.4884 19 14.3169 18.3176 15.7637 17.176L20.5877 22C20.9783 22.3905 21.6114 22.3905 22.002 22C22.3925 21.6095 22.3925 20.9763 22.002 20.5858L17.1779 15.7618C18.3196 14.3149 19.002 12.4865 19.002 10.5C19.002 5.80558 15.1964 2 10.502 2ZM4.00195 10.5C4.00195 6.91015 6.9121 4 10.502 4C14.0918 4 17.002 6.91015 17.002 10.5C17.002 12.2952 16.2755 13.9188 15.0981 15.0962C13.9208 16.2736 12.2972 17 10.502 17C6.9121 17 4.00195 14.0899 4.00195 10.5Z"
                    fill="black" />
                </svg>
              </button>
              <button id="compa" @click="crear()"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M17.25 8.5C19.3211 8.5 21 6.82107 21 4.75C21 2.67893 19.3211 1 17.25 1C15.1789 1 13.5 2.67893 13.5 4.75C13.5 5.07778 13.5421 5.39574 13.6211 5.69877L7.37469 9.32166C6.69831 8.65875 5.77189 8.25 4.75 8.25C2.67893 8.25 1 9.92893 1 12C1 14.0711 2.67893 15.75 4.75 15.75C5.77189 15.75 6.69831 15.3413 7.37469 14.6783L13.6211 18.3012C13.5421 18.6043 13.5 18.9222 13.5 19.25C13.5 21.3211 15.1789 23 17.25 23C19.3211 23 21 21.3211 21 19.25C21 17.1789 19.3211 15.5 17.25 15.5C16.2281 15.5 15.3017 15.9087 14.6253 16.5716L8.37895 12.9487C8.45795 12.6457 8.5 12.3278 8.5 12C8.5 11.6722 8.45795 11.3543 8.37895 11.0513L14.6253 7.42835C15.3017 8.09126 16.2281 8.5 17.25 8.5ZM19 4.75C19 5.7165 18.2165 6.5 17.25 6.5C16.2835 6.5 15.5 5.7165 15.5 4.75C15.5 3.7835 16.2835 3 17.25 3C18.2165 3 19 3.7835 19 4.75ZM4.75 13.75C5.7165 13.75 6.5 12.9665 6.5 12C6.5 11.0335 5.7165 10.25 4.75 10.25C3.7835 10.25 3 11.0335 3 12C3 12.9665 3.7835 13.75 4.75 13.75ZM17.25 21C18.2165 21 19 20.2165 19 19.25C19 18.2835 18.2165 17.5 17.25 17.5C16.2835 17.5 15.5 18.2835 15.5 19.25C15.5 20.2165 16.2835 21 17.25 21Z"
                    fill="black" />
                </svg>
              </button>
            </div>
          </div>
        </div>
</div>

      <div id="personaliza" v-if="showPersonalizar">
        <div class="titulopersonalizar">
 <p>PALETA DE COLORES </p>
 <div class="equis" >
          <button id="equis3" @click="cerrardatos2()"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.6585 4.92888C18.049 4.53836 18.6822 4.53835 19.0727 4.92888C19.4632 5.3194 19.4632 5.95257 19.0727 6.34309L13.4158 12L19.0727 17.6568C19.4632 18.0473 19.4632 18.6805 19.0727 19.071C18.6822 19.4615 18.049 19.4615 17.6585 19.071L12.0016 13.4142L6.34481 19.071C6.3387 19.0771 6.33254 19.0831 6.32632 19.089C5.93455 19.4614 5.31501 19.4554 4.93059 19.071C4.6377 18.7781 4.56447 18.3487 4.71092 17.9876C4.75973 17.8672 4.83296 17.7544 4.93059 17.6568L10.5874 12L4.93059 6.34314C4.54006 5.95262 4.54006 5.31945 4.93059 4.92893C5.32111 4.5384 5.95428 4.5384 6.3448 4.92893L12.0016 10.5857L17.6585 4.92888Z" fill="white"/>
</svg>
</button>
        </div></div>
        <p class="elige">Elige un color para el... </p>

        <div class="dif-opciones">
        <div class="opcionescolor">
        <label for="colorPicker">header y footer:</label>
        <input type="color" id="colorPicker" v-model="selectedColor">
      </div>

      <div class="opcionescolor">
        <label for="colorPicker">fondo talonario</label>
        <input type="color" id="colorPicker" v-model="selectedColor1">
      </div>

      <div class="opcionescolor">
        <label for="colorPicker">columnas laterales</label>
        <input type="color" id="colorPicker" v-model="seleccionacolor">
      </div>
      </div>
    </div>

      <div :style="{ backgroundColor: selectedColor }" id="miDiv" class="footer">
        <p>Copyright 2024-Todos los derechos reservados</p>
      </div>


<!-- <div class="impresion" v-if="showtabla"> -->
<!-- <div class="impresion">

<h3 id="titulopdf"> talonario </h3>

<div class="intro">
<div class="sorteo">
  <p>fecha del sorteo:</p>
  <p>{{ fecha }}</p>
  <p>loteria</p>
  <p>{{ loteria }}</p>
</div>
<div class="sorteo">
  <p>Ganador:</p>
  <p>?</p>
  <p>Premio:</p>
  <p>{{ premio }}</p>
</div>
</div> -->

<div class="tablapdf" v-show="talonario" >
    <table id='tab'>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Telefono</th>
          <th>Direccion</th>
          <th>Boletas</th>

          <!-- <th>Boletas pagas</th>
          <th>Boletas no pagas</th>
          <th>Total pagado</th>
          <th>Deuda</th> -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item1, i) in resultados" :key="i" >
          <td>{{ item1.nombre }}</td>
          <td>{{ item1.telefono }}</td>
          <td>{{ item1.direccion }}</td>
          <td>{{ item1.boleta.join(', ') }}</td>
          <!-- <td>{{ item.bol_paga }}</td>
          <td>{{ item.bol_no_paga }}</td>
          <td>{{ item.total_pagado }}</td>
          <td>{{ item.deuda }}</td> -->
        </tr>

      </tbody>

    </table> 
    </div>

<!-- <div class="intro">
<div class="sorteo">
  <p>Saldo recaudado:</p>
  <p>{{ saldo_recaudado }}</p>

</div>
<div class="sorteo">
  <p>Saldo pendiente:</p>
  <p>{{ saldo_pendiente }}</p>
</div>
</div>


</div> -->


    </div>



  </div>
</template>

<!-- ESTILOS____________________________________________________________________________________________________ -->

<style scoped>
@media (1367px <=width <=2700px) {

/* #miDiv3{
  
} */
.talonario {
    width: 90vw;
    height: 90vh;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid rgb(255, 255, 255);    /* background: linear-gradient(to top left, #7960e9 0%, #a84bdf 100%); */
  }

  #miDiv {
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Open Sans', Helvetica, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #333;
    font-weight: 700;
    letter-spacing: 3px;
    box-sizing: border-box;
  }

  .header {
    position: fixed;
    top: 0%;
    background-color:rgb(21, 102, 139);
    font-size: 30px;
    color:black;
    font-weight: 700;

  }

  .footer {
    height: 6%;
    font-size: 15px;
    font-weight: 500;
    letter-spacing: 0.3px;
    position: fixed;
    bottom: 0%;
 background-color:rgb(21, 102, 139);
    /* background: linear-gradient(to top right, #43389F 0%, #4ec6ca 100%); */
    margin-top: 50%;
  }

  .configurarTalonario {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 3%;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 400px;
    height: 400px;
    margin-top: -200px;
    margin-left: -200px;
    background: linear-gradient(to top right, #43389F 0%, #4ec6ca 100%);
    border-radius: 2px;
    box-shadow: 4px 8px 16px 0 rgba(0, 0, 0, 0.1);
    z-index: 1;
    /* overflow: hidden; */
  }

  #guardar {
    width: 5vw;
    height: 4vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #333;

  }

  #espacio1,
  #espacio2 {
    margin-top: 1%;
    width: 80%;
    height: 17%;
    background-color: rgb(51, 51, 226);
    color: black;
  }

  #espacio2 {
    background-color: rgb(115, 31, 163);
  }

  #espacio {
    margin-top: 1%;
    width: 80%;
    height: 10%;
    background-color: rgb(200, 198, 198);
    color: black;
    border:none;
    /* outline:none; */
    /* text-decoration: none; */
  /* border-bottom: 2px solid #fff; */

  }
  #espacio:hover{
    background-color: rgb(177, 175, 175);
}

  .fondo1 {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 95%;
    height: 70%;
    box-sizing: border-box;
  }

  .acciones,
  .informacion {
    display: flex;
    margin-top: 2%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 270px;
    height: 300px;
    background-color: aliceblue;
    border-radius: 1vmax;
    box-shadow: 4px 4px 4px rgb(99, 98, 98);
  }

  .accion,
  .fondo {
    width: 320px;
    height: 380px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: rgb(180, 180, 180);
    box-shadow: 1px 2px 2px rgb(107, 102, 102);
    border-radius: 1vmax;
  }

  .accion,
  .acciones {
    position: fixed;
    right: 0%;
    margin-right: 2%;
  }

  .accion {
    position: fixed;
    right: 0%;
    margin-right: 2%;
  }

  .acciones {
    font-size: 14px;
    margin-right: 3.5%;
    text-align: center;
  }

  .informacion,
  .fondo {
    position: fixed;
    left: 0%;
    margin-left: 2%;
  }

  .fondo {
    position: fixed;
    left: 0%;
    margin-left: 2%;
  }

  .informacion {
    margin-left: 3.5%;
    display: grid;
    text-align: left;
  }

  .subtitulo {
    position: absolute;
    color: black;
    font-size: large;
    letter-spacing: 0.3px;
    position: absolute;
    top: 10%;
    width: 7vw;
    height: 2vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 29%;
  }

  #edita {
    width: 10vw;
    height: 4vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #2649bc;
  }

  #espacio1,
  #espacio2 {
    margin-top: 1%;
    width: 80%;
    height: 17%;
    background-color: rgb(51, 51, 226);
    color: black;
    font-size: 12px;
    margin-bottom: 2px;
  }

  #espacio2 {
    background-color: rgb(115, 31, 163);
  }

  #espacio {
    margin-top: 1%;
    width: 80%;
    height: 10%;
    background-color: rgb(200, 198, 198);
    color: black;

  }

  #busca,
  #compa {
    width: 4vw;
    height: 7vh;
    align-items: center;
    background-color: #411177;
  }


  #loteria {
    width: 46vw;
    height: 60vh;
    font-size: 10px;
    display: grid;
    gap: 1%;
    grid-template-columns: repeat(10, 1fr);
    overflow: scroll;
    position: absolute;
    scrollbar-width: none;
    
  }
  #fichas{
  /* background-color: #5971be; */
  border-radius: 4vmax;
  height: 100%;
  margin-bottom: 4%;
  color:black;
}
#fichas:hover{
  background-color: #1b3dac;

}
  .adquirir {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 500px;
    height: 400px;
    margin-top: -200px;
    margin-left: -250px;
    background: linear-gradient(to top right, #43389F 0%, #4ec6ca 100%);
    z-index: 1;
    display: grid;

  }
  .disponible {
    width: 12vw;
    height: 31vh;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: linear-gradient(to top right, #564ea0 0%, #2ce2e8 100%);
    z-index: 1;
    color:black
  }
  .tituloadquirir{
    width:100%;
    height:3vmax;
    box-sizing: border-box;
    background-color: #0cabb1;
    display:flex;
    padding-left: 21%;
  }
  .tituloboladquirir{
    width:100%;
    height:4vmax;
    box-sizing: border-box;
    background-color: #32979b;
    display:flex;
justify-content: center;
align-items: center;
    padding-left: 14%;
  }
  #equis5{
    background-color: #32979b;
    width:3vmax;
    height: 3vmax;
    font-size: 10px;
    margin-left: -220%;
  }
  #equis5:hover{
    border:none;
    outline:none;
    background-color: red;
  }
  #equis1{
    background-color: #0cabb1;
    width:10px;
    height: 2vmax;
    font-size: 10px;
    margin-left: 150%;
  }
  #equis1:hover{
  border:none;
  outline:none
}

  #adquirirb {
    width: 8vw;
    height: 8vh;
    background-color: #333;
  }

  #input{
    width: 15vw;
    height: 5vh;
    color: black;
    font-weight: 500;
    background-color: #808496;
  }
  #botadquirir {
    width: 10vw;
    height: 8vh;
    background-color: rgb(20, 117, 121);
    margin-left: auto;
    margin-right: auto;
    letter-spacing: 2px;
    }
  #botadquirir:hover{
    background-color: rgb(5, 92, 95);
    }
  #si{
    width: 2vw;
    height: 3vh;  
  }
  .pagar{
    color:black;
    font-size: medium;
    font-weight: 600;
    display: flex;
justify-content: center;
}

  .participante {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 500px;
    height: 350px;
    margin-top: -200px;
    margin-left: -250px;
    background: linear-gradient(to top right, #5b6594 0%, #364780 100%);
    border-radius: 2px;
    z-index:1;
  }

  .tituloparticipante, .titulopersonalizar {
    /* width:36.7%; */
    /* height:8%; */
    width: 100%;
    height: 20%;
    margin-top: -4%;
    display: flex;
    justify-content: center;
    align-items: center;
    /* position: fixed; */
    background-color: rgb(29, 38, 122);
    color: black;
    font-size: large;
    font-weight: 600;
    letter-spacing: 3px;
    font-family: Georgia, 'Times New Roman', Times, serif;
  }

  .datosparticipante {
    display: grid;
    gap: 1%;
    grid-template-columns: repeat(2, 1fr);
    margin-top: 2%;
    width: 95%;
    height: 75%;
    z-index: 1;
  }

  #p {
    color: black;
    font-weight: 700;
    font-family: Arial, Helvetica, sans-serif;
  }

  #pa {
    text-align: justify;
    margin-left: 10%;
    display: flex;
    justify-content: justify;
    padding: 3%;
  }

  .boletanopagada {
    width: 400px;
    height: 200px;
    background: linear-gradient(to top right, #5b6594 0%, #516ece 100%);
    border-radius: 2px;
    position: fixed;
    bottom: 0;
    position: absolute;
    z-index: 1;  
  }
  .titulobolnopaga {
    width: 100%;
    height: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(29, 38, 122);
    color: white;
    font-size: larger;
    font-weight: 600;
    letter-spacing: 2px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  }

  .bolnopaga {
    display: grid;
    /* gap:2%; */
    margin-top: 1%;
  }

  .bolnopagada {
    padding: 1%;
  }

  #liberar {
    width: 85%;
    height: 100%;
    letter-spacing: 2px;
    background: linear-gradient(to top right, #374374 0%, #7085cc 100%);
    color: black;
    font-size: medium;
  }

  #liberar:hover {
    background-color: #132c9b;
  }


  .listado {
    position: absolute;
    top: 50%;
    left: 45%;
    width: 650px;
    height: 400px;
    margin-top: -200px;
    margin-left: -250px;
    border-radius: 2px;
    box-shadow: 4px 8px 16px 0 rgba(0, 0, 0, 0.1);
    background: linear-gradient(to top right, #43389f 0%, #4ec6ca 100%);
    z-index: 1;
  }

  .titulolistado {
    width: 100%;
    height: 20%;
    margin-top: -4%;
    display: flex;
    /* padding-left: 10%; */
    background-color: rgb(38, 49, 153);
    color: black;
    font-size: large;
    font-weight: 600;
    letter-spacing: 3px;
    box-sizing: border-box;
    font-family: Georgia, 'Times New Roman', Times, serif;
  }
  #equis2{
    background-color: rgb(38, 49, 153);
    width:3vmax;
    height: 2vmax;
    font-size: 10px;
text-align: center;
    margin-left: 1220%;
  }
  #equis2:hover{
    background-color:
     red;  border:none;
  outline:none

  }

  .buscador {
    margin-left: 20%;
    width: 30%;
    display: flex;
    justify-content: center;
    align-items: center;

  }

  .listadobol {
    width: 100%;
    height: 73%;
    overflow: scroll;
    scrollbar-width: none;
    display:grid;
    grid-template-columns: repeat(2, 1fr);  
  }

  .boletacomprada {
    height: 95%;
    width: 65%;
    margin-left: 3%;
    display: flex;
    box-shadow: 4px 8px 16px rgba(0, 0, 0, 0.5);
    flex-direction: column;
    background: linear-gradient(to top right, #6960e7 0%, #67addb 100%);
    box-sizing: border-box;
  }

  .boletapagada{
    width: 400px;
    height: 100px;
    background-color: rgb(29, 38, 122);
    border-radius: 2px;
    position: fixed;
    bottom: 0;
    position: absolute;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    padding-right: 2%;
  }
  #equis4{
    background-color: rgb(29, 38, 122);
    width:3vmax;
    height: 2vmax;
    font-size: 10px;
    margin-left: 20%;
  }
  #equis4:hover{
    background-color: red;
  border:none;
  outline:none

  }
  #ver {
    width: 85%;
    height: 60%;
    letter-spacing: 2px;
    background: linear-gradient(to top right, #374374 0%, #7085cc 100%);
    color: white;
    font-size: medium;
  }

  .datop {
    height: 23%;
    width: 95%;
    display: grid;
    text-align: left;
    color: black;
    font-weight: 500;
  }
  #personaliza {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 500px;
    height: 250px;
    margin-top: -100px;
    margin-left: -250px;
    background: linear-gradient(to top right, #797f9b 0%, #1871bb 100%);
    border-radius: 1vmax;
  }
  #equis3{
    background-color: rgb(29, 38, 122);
    width:3vmax;
    height: 2vmax;
    font-size: 10px;
    margin-left: -210%;
    text-decoration: none;
  }
  #equis3:hover{
    background-color: rgb(233, 12, 12);
    border:none;
  outline:none
  }
  .opcionescolor{
    display:grid;
    text-align:left;
width:80%;
color:black;
background-color: #86b1b3;
box-shadow: 4px 8px 16px 0 rgba(0, 0, 0, 0.4);
}
.dif-opciones{
  display:grid;
  width:80%;
  height:30%;
  /* border:2px solid black; */
  grid-template-columns:repeat(2, 1fr)
}
  .equis{
  width:5%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
margin-right:-25%;
margin-left: 20%;
}
#equis{
  color:white;
  width:20%;
  height: 180%;
  margin-top:-10% ;
  background-color: rgb(29, 38, 122);
  
}
#equis:hover{
  border:none;
  outline:none
}
.green {
  background-color: rgb(56, 192, 56);
}

.red {
  background-color: rgb(177, 70, 70);
}
.blue{
  background-color: #5971be;
}



}

@media (900px <=width <=1366px) {

  .talonario {
    width: 95vw;
    height: 90vh;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 2px 3px 3px rgb(92, 90, 90);
    background-color: rgb(168, 168, 241);

  }

  #miDiv {
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Open Sans', Helvetica, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #333;
    font-weight: 700;
    letter-spacing: 3px;
    box-sizing: border-box;
  }

  .header {
    position: fixed;
    top: 0%;
    background-color:rgb(21, 102, 139);
    font-size: 30px;
    color:black;
    font-weight: 700;

  }

  .footer {
    height: 6%;
    font-size: 15px;
    font-weight: 500;
    letter-spacing: 0.3px;
    position: fixed;
    bottom: 0%;
 background-color:rgb(21, 102, 139);
    /* background: linear-gradient(to top right, #43389F 0%, #4ec6ca 100%); */
    margin-top: 50%;
  }

  .configurarTalonario {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 3%;
    position: absolute;
    width: 300px;
    height: 350px;
    background: linear-gradient(to top right, #43389F 0%, #4ec6ca 100%);
    border-radius: 2px;
    z-index: 1;    
  }

  /* #guardar {
    width: 35%;
    height: 13%;
  } */
  #guardar {
    width: 70%;
    height: 40px;
    border-radius: 40px;
    background-color: rgb(177, 197, 233);
    border:none;
    outline:none;
    cursor:pointer;
    font-size: 1rem;
    font-weight: 600;
    transition: all 0.4s ease;
    color:black
  }
  #guardar:hover{
  background-color: rgb(255, 255, 255, 0.5);
}


  #espacio1,
  #espacio2 {
    margin-top: 1%;
    width: 80%;
    height: 17%;
    background-color: rgb(51, 51, 226);
    color: black;
    font-size: 12px;
    margin-bottom: 2px;
  }

  #espacio2 {
    background-color: rgb(115, 31, 163);
  }

  #espacio {
    margin-top: 1%;
    width: 80%;
    height: 10%;
    background-color: rgb(200, 198, 198);
    color: black;
    border:none;
    /* outline:none; */
    /* text-decoration: none; */
  /* border-bottom: 2px solid #fff; */

  }
  #espacio:hover{
    background-color: rgb(177, 175, 175);
}

  .subtitulo {
    position: absolute;
    color: black;
    font-size: large;
    letter-spacing: 0.3px;
    position: absolute;
    top: 5%;
    width: 7vw;
    height: 2vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 29%;
  }

  .accion {
    position: fixed;
    right: 0%;
    margin-right: 2%;
  }

  .fondo {
    position: fixed;
    left: 0%;
    margin-left: 2%;
  }

  .accion,
  .fondo {
    width: 320px;
    height: 360px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: rgb(180, 180, 180);
    box-shadow: 1px 2px 2px rgb(99, 98, 98);
    border-radius: 1vmax;
  }

  .fondo1 {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 95%;
    height: 70%;
    box-sizing: border-box;
  }

  .acciones,
  .informacion {
    display: flex;
    margin-top: 2%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 270px;
    height: 300px;
    background-color: aliceblue;
    border-radius: 1vmax;
    box-shadow: 4px 4px 4px rgb(99, 98, 98);
  }

  .accion,
  .acciones {
    position: fixed;
    right: 0%;
    margin-right: 2%;
  }

  .informacion,
  .fondo {
    position: fixed;
    left: 0%;
    margin-left: 2%;
  }

  .informacion {
    margin-left: 4%;
    display: grid;
    text-align: left;
  }

  .acciones {
    font-size: 14px;
    margin-right: 4%;
    text-align: center;
  }

  #edita {
    width: 10vw;
    height: 4vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #2649bc;
  }

  #busca,
  #compa {
    width: 4vw;
    height: 7vh;
    align-items: center;
    background-color: #411177;
  }

  #loteria {
    width: 43vw;
    height: 60vh;
    font-size: 12px;
    display: grid;
    gap: 0.5%;
    grid-template-columns: repeat(10, 1fr);
    overflow: scroll;
    position: absolute;
    scrollbar-width: none;
  }
#fichas{
  /* background-color: #5971be; */
  border-radius: 2vmax;
  height: 100%;
  margin-bottom: 4%;
  font-size: 14px;
  font-weight: 700;
  color:black;
}
#fichas:hover{
  background-color: #1b3dac;

}
  .adquirir {
    width: 400px;
    height: 400px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: linear-gradient(to top right, #43389F 0%, #4ec6ca 100%);
    display: grid;
    z-index: 1;
  }

  .disponible {
    width: 12vw;
    height: 30vh;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: linear-gradient(to top right, #564ea0 0%, #2ce2e8 100%);
    z-index: 1;
    color:black
  }
  .tituloadquirir{
    width:100%;
    height:4vmax;
    box-sizing: border-box;
    background-color: #32979b;
    display:flex;
    padding-left: 14%;
  }
  .tituloboladquirir{
    width:100%;
    height:4vmax;
    box-sizing: border-box;
    background-color: #32979b;
    display:flex;
justify-content: center;
align-items: center;
    padding-left: 14%;
  }
  #equis5{
    background-color: #32979b;
    width:3vmax;
    height: 3vmax;
    font-size: 10px;
    margin-left: -220%;
  }
  #equis5:hover{
    border:none;
    outline:none;
    background-color: red;
  }
  #equis1{
    background-color: #32979b;
    width:3vmax;
    height: 2vmax;
    font-size: 10px;
    margin-left: 30%;
  }
 #equis1{
  border:none;
  outline:none
 } 
  #adquirirb {
    width: 8vw;
    height: 10vh;
    background-color: #333;
  }

  #input{
    width: 20vw;
    height: 6vh;
    color: black;
    font-weight: 600;
    letter-spacing: 1px;
    font-family: 'Arial Narrow', Arial, sans-serif;
    background-color: #a2a3a8;
    border:none;
  }
  #botadquirir {
    width: 10vw;
    height: 8vh;
    background-color: rgb(20, 117, 121);
    margin-left: auto;
    margin-right: auto;
    letter-spacing: 2px;
    }
  #botadquirir:hover{
    background-color: rgb(5, 92, 95);
    }
  #si{
    width: 2vw;
    height: 3vh;  
  }
  .pagar{
    color:black;
    font-size: medium;
    font-weight: 600;
    display: flex;
justify-content: center;
}
  .participante {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 500px;
    height: 250px;
    margin-top: -200px;
    margin-left: -250px;
    background: linear-gradient(to top right, #5b6594 0%, #6276b6 100%);
    border-radius: 2px;
    z-index: 1;

  }

  .tituloparticipante {

    width: 100%;
    height: 20%;
    margin-top: -4%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(29, 38, 122);
    color: black;
    font-size: large;
    font-weight: 600;
    letter-spacing: 3px;
    font-family: Georgia, 'Times New Roman', Times, serif;
  }

  .datosparticipante {
    display: grid;
    gap: 1%;
    grid-template-columns: repeat(2, 1fr);
    margin-top: 2%;
    width: 95%;
    height: 75%;
    z-index: 1;
  }

  .nombrep{
    margin-top: -2%;
  }
  #p {
    color: black;
    font-weight: 700;
    font-family: Arial, Helvetica, sans-serif;
  }

  #pa {
    text-align: justify;
    margin-left: 10%;
    display: flex;
    justify-content: justify;
    padding: 3%;
  }

  .boletapagada{
    width: 400px;
    height: 100px;
    background-color: rgb(29, 38, 122);
    border-radius: 2px;
    position: fixed;
    bottom: 0;
    position: absolute;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 2%;
    box-sizing: border-box;
    }
  #equis4{
    background-color: rgb(29, 38, 122);
    width:3vmax;
    height: 2vmax;
    font-size: 10px;
    margin-left: 5%;
  }
  #equis4:hover{
    background-color: red;
    border:none;
  outline:none
  }
  #ver {
    width: 85%;
    height: 60%;
    letter-spacing: 1px;
    background: linear-gradient(to top right, #374374 0%, #7085cc 100%);
    color: white;
    font-size: medium;
  }

  .boletanopagada {
    width: 400px;
    height: 200px;
    background: linear-gradient(to top right, #5b6594 0%, #2446b4 100%);
    border-radius: 2px;
    position: fixed;
    bottom: 0;
    position: absolute;
    z-index: 1;
  }

  .titulobolnopaga {
    width: 100%;
    height: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(29, 38, 122);
    color: white;
    font-size: larger;
    font-weight: 600;
    letter-spacing: 2px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  }

  .bolnopaga {
    display: grid;
    margin-top: 1%;
  }

  .bolnopagada {
    padding: 1%;
  }

  #liberar {
    width: 85%;
    height: 100%;
    letter-spacing: 2px;
    background: linear-gradient(to top right, #374374 0%, #7085cc 100%);
    color: black;
    font-size: medium;
  }

  #liberar:hover {
    background-color: #132c9b;
  }

  .listado {
    position: absolute;
    top: 50%;
    left: 45%;
    width: 650px;
    height: 400px;
    margin-top: -200px;
    margin-left: -200px;
    border-radius: 2px;
    box-shadow: 4px 8px 16px 0 rgba(0, 0, 0, 0.1);
    background: linear-gradient(to top right, #43389f 0%, #4ec6ca 100%);
    z-index: 1;

  }

  .titulolistado {
    width: 100%;
    height: 20%;
    margin-top: -4%;
    display: flex;
    background-color: rgb(38, 49, 153);
    color: black;
    font-size: large;
    font-weight: 600;
    letter-spacing: 3px;
    box-sizing: border-box;
    font-family: Georgia, 'Times New Roman', Times, serif;
  }

  #equis2{
    background-color: rgb(38, 49, 153);
    width:3vmax;
    height: 2vmax;
    font-size: 10px;
text-align: center;
    margin-left: 1220%;
  }
  #equis2:hover{
    background-color: red;
    border:none;
  outline:none
  }

  .buscador {
    margin-left: 20%;
    width: 30%;
    display: flex;
    justify-content: center;
    align-items: center;

  }

  .listadobol {
    width: 100%;
    box-sizing: border-box;
    height: 73%;
    overflow: scroll;
    display:grid;
    grid-template-columns: repeat(2, 1fr);  
    gap:1%;
    padding:4%;
    scrollbar-width: none;
  }

  .boletacomprada {
    height: 95%;
    width: 65%;
    margin-left: 3%;
    display: flex;
    box-shadow: 4px 8px 16px rgba(0, 0, 0, 0.5);
    flex-direction: column;
    background: linear-gradient(to top right, #6960e7 0%, #67addb 100%);
    box-sizing: border-box;
  }

  .texto-nombre{
    color:white
  }

  .datop {
    height: 23%;
    width: 95%;
    display: grid;
    text-align: left;
    color: black;
    font-weight: 500;
  }

  #personaliza {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 500px;
    height: 250px;
    margin-top: -100px;
    margin-left: -250px;
    background: linear-gradient(to top right, #797f9b 0%, #1871bb 100%);
    border-radius: 2vmax;
  }

    .tituloparticipante, .titulopersonalizar {

    width: 100%;
    height: 20%;
    margin-top: -4%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(29, 38, 122);
    color: black;
    font-size: large;
    font-weight: 600;
    letter-spacing: 3px;
    box-sizing: border-box;
    font-family: Georgia, 'Times New Roman', Times, serif;
  }

  #equis3{
    background-color: rgb(29, 38, 122);
    width:3vmax;
    height: 2vmax;
    font-size: 10px;
    margin-left: -210%;
    text-decoration: none;
  }
  #equis3:hover{
    background-color: rgb(233, 12, 12);
    border:none;
  outline:none
  }

  .opcionescolor{
    display:grid;
    text-align:left;
width:80%;
color:black;
background-color: #86b1b3;
box-shadow: 4px 8px 16px 0 rgba(0, 0, 0, 0.4);
}
.dif-opciones{
  display:grid;
  width:80%;
  height:30%;
  /* border:2px solid black; */
  grid-template-columns:repeat(2, 1fr)
}

.equis{
  width:5%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
margin-right:-25%;
margin-left: 20%;
}
#equis{
  color:white;
  width:20%;
  height: 180%;
  margin-top:-10% ;
  background-color: rgb(29, 38, 122);
}
#equis:hover{
  border:none;
  outline:none
}
.green {
  background-color: rgb(56, 192, 56);
}

.red {
  background-color: rgb(177, 70, 70);
}
.blue{
  background-color: #5971be;
}


}

@media (600px <=width <=890px) {
  .talonario {
    width: 90vw;
    height: 90vh;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 2px solid black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: linear-gradient(to top left, #119126 0%, #319685 100%);
  }

  header,
  footer {
    width: 100%;
    height: 10%;
    background: linear-gradient(to top right, #43389F 0%, #4ec6ca 100%);
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Open Sans', Helvetica, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #333;
    font-size: 30px;
    font-weight: 700;
    letter-spacing: 3px;
    box-sizing: border-box;
  }

  header {
    position: fixed;
    top: 0%;
  }

  footer {
    height: 6%;
    font-size: 15px;
    font-weight: 500;
    letter-spacing: 0.3px;
    position: fixed;
    bottom: 0%;
  }

  .configurarTalonario {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 3%;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 400px;
    height: 400px;
    margin-top: -200px;
    margin-left: -200px;
    background: linear-gradient(to top right, #43389F 0%, #4ec6ca 100%);
    border-radius: 2px;
    box-shadow: 4px 8px 16px 0 rgba(0, 0, 0, 0.1);
    /* overflow: hidden; */
  }

  #guardar {
    width: 5vw;
    height: 4vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #333;

  }

  #espacio1,
  #espacio2 {
    margin-top: 1%;
    width: 80%;
    height: 17%;
    background-color: rgb(51, 51, 226);
    color: black;
  }

  #espacio2 {
    background-color: rgb(115, 31, 163);
  }

  #espacio {
    margin-top: 1%;
    width: 80%;
    height: 10%;
    background-color: rgb(200, 198, 198);
    color: black;
  }
  .tituloboladquirir{
    width:100%;
    height:4vmax;
    box-sizing: border-box;
    background-color: #32979b;
    display:flex;
justify-content: center;
align-items: center;
    padding-left: 14%;
  }
  #equis5{
    background-color: #32979b;
    width:3vmax;
    height: 3vmax;
    font-size: 10px;
    margin-left: -220%;
  }
  #equis5:hover{
    border:none;
    outline:none;
    background-color: red;
  }

  .fondo1 {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 95%;
    height: 70%;
    box-sizing: border-box;
  }

  .acciones,
  .informacion {
    display: flex;
    margin-top: 4%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 270px;
    height: 300px;
    background-color: aliceblue;
    border-radius: 1vmax;
    box-shadow: 4px 4px 4px rgb(99, 98, 98);
  }

  .accion,
  .fondo {
    width: 320px;
    height: 380px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: rgb(180, 180, 180);
    box-shadow: 1px 2px 2px rgb(99, 98, 98);
    border-radius: 1vmax;
  }

  .accion,
  .acciones {
    position: fixed;
    right: 0%;
    margin-right: 2%;
  }

  .accion {
    position: fixed;
    right: 0%;
    margin-right: 2%;
  }

  .acciones {
    font-size: 14px;
    margin-right: 4%;
    text-align: center;
  }

  .informacion,
  .fondo {
    position: fixed;
    left: 0%;
    margin-left: 2%;
  }

  .fondo {
    position: fixed;
    left: 0%;
    margin-left: 2%;
  }

  .informacion {
    margin-left: 4%;
    display: grid;
    text-align: left;
  }

  .subtitulo {
    position: absolute;
    color: black;
    font-size: large;
    letter-spacing: 0.3px;
    position: absolute;
    top: 10%;
    width: 7vw;
    height: 2vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 29%;
  }

  #edita {
    width: 10vw;
    height: 4vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #2649bc;
  }

  #espacio1,
  #espacio2 {
    margin-top: 1%;
    width: 80%;
    height: 17%;
    background-color: rgb(51, 51, 226);
    color: black;
    font-size: 12px;
    margin-bottom: 2px;
  }

  #espacio2 {
    background-color: rgb(115, 31, 163);
  }

  #espacio {
    margin-top: 1%;
    width: 80%;
    height: 10%;
    background-color: rgb(200, 198, 198);
    color: black;
  }

  #busca,
  #compa {
    width: 4vw;
    height: 7vh;
    align-items: center;
    background-color: #411177;
  }

  .disponible {
    width: 12vw;
    height: 25vh;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: linear-gradient(to top right, #564ea0 0%, #2ce2e8 100%);
    z-index: 1;
    color:black
  }

  #adquirirb {
    width: 8vw;
    height: 8vh;
    background-color: #333;
  }

  #input{
    width: 20vw;
    height: 5vh;
    color: black;
    font-weight: 500;
    background-color: #808496;
  }
  #botadquirir {
    width: 10vw;
    height: 8vh;
    background-color: rgb(20, 117, 121);
    margin-left: auto;
    margin-right: auto;
    letter-spacing: 2px;
    }
  #botadquirir:hover{
    background-color: rgb(5, 92, 95);
    }
  #si{
    width: 2vw;
    height: 3vh;  
  }
  .pagar{
    color:black;
    font-size: medium;
    font-weight: 600;
    display: flex;
justify-content: center;
}

  #loteria {
    width: 36vw;
    height: 60vh;
    font-size: 20px;
    display: grid;
    gap: 1%;
    grid-template-columns: repeat(6, 1fr);
    overflow: scroll;
    position: absolute;
    scrollbar-width: none;
  }
  #fichas{
  /* background-color: #5971be; */
  border-radius: 4vmax;
  height: 100%;
  margin-bottom: 4%;
  color:black;
}
#fichas:hover{
  background-color: #1b3dac;

}

  .adquirir {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 300px;
    height: 300px;
    margin-top: -200px;
    margin-left: -200px;
    background: linear-gradient(to top right, #43389F 0%, #4ec6ca 100%);
    z-index: 1;
    display: grid;

  }

  .boletapagada{
    width: 400px;
    height: 100px;
    background: linear-gradient(to top right, #5b6594 0%, #2446b4 100%);
    border-radius: 2px;
    position: fixed;
    bottom: 0;
    position: absolute;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #ver {
    width: 85%;
    height: 60%;
    letter-spacing: 2px;
    background: linear-gradient(to top right, #374374 0%, #7085cc 100%);
    color: white;
    font-size: medium;
  }
  #pa {
    text-align: justify;
    margin-left: 10%;
    display: flex;
    justify-content: justify;
    padding: 3%;
  }
  .opcionescolor{
    display:grid;
    text-align:left;
width:80%;
color:black;
background-color: #86b1b3;
box-shadow: 4px 8px 16px 0 rgba(0, 0, 0, 0.4);
}
.dif-opciones{
  display:grid;
  width:80%;
  height:30%;
  /* border:2px solid black; */
  grid-template-columns:repeat(2, 1fr)
}
.green {
  background-color: rgb(56, 192, 56);
}

.red {
  background-color: rgb(177, 70, 70);
}
.blue{
  background-color: #5971be;
}
}
</style>
