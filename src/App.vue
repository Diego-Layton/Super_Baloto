<!-- SCRIPT____________________________________________________________________________________________________ -->
<script setup>
import { ref } from "vue";
import Swal from 'sweetalert2';

let loteria = ref("");
let premio = ref("");
let valorBoleta = ref("");
let numeroboletas = ref("");
let fecha = ref("");
let boletas = ref([]);
let alertax = ref("");

function guardar() {
  if (premio.value === "") {
    mostrarError("Debe ingresar la cantidad del premio");
  } else if (valorBoleta.value === "") {
    mostrarError("Debe ingresar el valor de la boleta");
  } else if (loteria.value === "") {
    mostrarError("Debe ingresar la loteria con la que juega");
  } else if (numeroboletas.value === "") {
    mostrarError("Debe seleccionar una cantidad de boletas");
  } else if (fecha.value === "") {
    mostrarError("Debe ingresar una fecha que sea después del día de hoy");
  } else {
    // Lógica para guardar los datos
    // ...

    // Ejemplo de agregar elementos al array 'boletas'
    for (let i = 0; i < 100; i++) {
      boletas.value.push({
        i,
        estado: 'disponible'
      });
    }
  }
}

function mostrarError(mensaje) {
  Swal.fire({
    icon: "error",
    title: mensaje,
    text: "Vuelve e intenta!",
  });
}
</script>

<!-- MAQUETADO_________________________________________________________________________________________________ -->
<template>
  <div class="contenedorPrincipal">
<div>
    <button @click="mostrarAlerta">Mostrar Alerta</button>
  </div>

  <div class="talonario">
  <header>TALONARIO</header>
    <div class="configurarTalonario">
      <input type="text" placeholder="Premio" v-model.trim="premio" id="espacio"/>
      <input type="valorBoleta" placeholder="Valor Boleta" v-model.trim="valorBoleta" id="espacio"/>
      <select v-model="loteria" id="espacio">
        <option value="" disabled selected>loteria</option>
        <option value="Boyacá">loteria de Boyacá</option>
        <hr>
        <option value="Santander">loteria de Santander</option>
        <hr>
        <option value="Cundimarca">loteria de Cundimarca</option>
      </select>
      <select v-model="numeroboletas" id="espacio">
        <option  value="" disabled selected>Numero de boletas</option>
        <option value="100">0-99</option>
        <hr>
        <option value="1000">0-999</option>
      </select>
      <input  placeholder="fecha del sorteo" type="date" v-model="fecha" id="espacio"/>
      <button id="guardar" @click="guardar()">GUARDAR</button>
    </div>
<section id="loteria">
<button v-for="(e, i) in boletas" :key="i" @click="modifiicarboleta(e,i)">{{e.i<10?'0'+ e.i:e.i}}</button>
</section>
<button id="crear" @click="crear()">Crear Talonario</button>
<div class="fondo1">
    <div class="fondo">
      <div class="subtitulo">
      <h4>INFORMACION</h4>
      </div>
      <div class="informacion">
        <div class="premio"> <h3>🏆 {{premio}} </h3></div>
        <div class="precioVoleta"><h3>💲{{valorBoleta}}</h3> </div>
        <div class="loteria"> <h3>🏦{{ loteria}}</h3> </div>
        <div class="fecha"> <h3>🗓️{{fecha}}</h3> </div>
        <button id="edita" @click="crear()">EDITAR<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.58579 11.9142C7.21071 12.2892 7 12.7979 7 13.3284V16C7 16.5522 7.44772 17 8 17H10.6716C11.202 17 11.7107 16.7892 12.0858 16.4142L21.5858 6.91416C22.3668 6.13311 22.3668 4.86678 21.5858 4.08573L19.9142 2.41416C19.1332 1.63311 17.8668 1.63311 17.0858 2.41416L7.58579 11.9142ZM10.6716 15H9L9 13.3284L18.5 3.82837L20.1716 5.49995L10.6716 15Z" fill="black"/>
<path d="M10 3.99994C10 4.55223 9.55229 4.99995 9 4.99995H4L4 20H19V15C19 14.4477 19.4477 14 20 14C20.5523 14 21 14.4477 21 15V20C21 21.1045 20.1046 22 19 22H4C2.89543 22 2 21.1045 2 20V4.99995C2 3.89538 2.89543 2.99994 4 2.99994H9C9.55229 2.99994 10 3.44766 10 3.99994Z" fill="black"/>
</svg></button>
      </div>
    </div>

<div class="accion">
  <div class="subtitulo">
  <h5>ACCIONES</h5>
</div>
      <div class="acciones">
      <button id="espacio2" @click="crear()">ESTADO</button>
      <button id="espacio1" @click="crear()"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M2 5C2 3.89543 2.89543 3 4 3H20C21.1046 3 22 3.89543 22 5V5.24853C22 5.73298 21.8242 6.20096 21.5052 6.56554L15.4948 13.4345C15.1758 13.799 15 14.267 15 14.7515V20.5585C15 21.4193 14.4491 22.1836 13.6325 22.4559L10.3162 23.5613C9.6687 23.7771 9 23.2951 9 22.6126V14.7515C9 14.267 8.82416 13.799 8.50515 13.4345L2.49485 6.56554C2.17584 6.20096 2 5.73298 2 5.24853V5ZM4 5.24853L4 5H20V5.24853L13.9897 12.1175C13.3517 12.8466 13 13.7826 13 14.7515V20.5585L11 21.2252V14.7515C11 13.7826 10.6483 12.8466 10.0103 12.1175L4 5.24853Z" fill="black"/>
</svg>LISTAR TUS BOLETAS</button>
      <button id="espacio1" @click="crear()"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.0002 16C14.2094 16 16.0002 14.2091 16.0002 12C16.0002 9.79086 14.2094 8 12.0002 8C9.79109 8 8.00023 9.79086 8.00023 12C8.00023 14.2091 9.79109 16 12.0002 16ZM12.0002 14C13.1048 14 14.0002 13.1046 14.0002 12C14.0002 10.8954 13.1048 10 12.0002 10C10.8957 10 10.0002 10.8954 10.0002 12C10.0002 13.1046 10.8957 14 12.0002 14Z" fill="black"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.1182 1.86489L15.5203 4.81406C15.8475 4.97464 16.1621 5.1569 16.4623 5.35898L19.2185 4.23223C19.6814 4.043 20.2129 4.2248 20.463 4.65787L22.5901 8.34213C22.8401 8.77521 22.7318 9.3264 22.3365 9.63266L19.9821 11.4566C19.9941 11.6362 20.0002 11.8174 20.0002 12C20.0002 12.1826 19.9941 12.3638 19.9821 12.5434L22.3365 14.3673C22.7318 14.6736 22.8401 15.2248 22.5901 15.6579L20.463 19.3421C20.2129 19.7752 19.6814 19.957 19.2185 19.7678L16.4623 18.641C16.1621 18.8431 15.8475 19.0254 15.5203 19.1859L15.1182 22.1351C15.0506 22.6306 14.6274 23 14.1273 23H9.87313C9.37306 23 8.94987 22.6306 8.8823 22.1351L8.48014 19.1859C8.15296 19.0254 7.83835 18.8431 7.53818 18.641L4.78195 19.7678C4.31907 19.957 3.78756 19.7752 3.53752 19.3421L1.41042 15.6579C1.16038 15.2248 1.26869 14.6736 1.66401 14.3673L4.01841 12.5434C4.00636 12.3638 4.00025 12.1826 4.00025 12C4.00025 11.8174 4.00636 11.6362 4.01841 11.4566L1.66401 9.63266C1.26869 9.3264 1.16038 8.77521 1.41041 8.34213L3.53752 4.65787C3.78755 4.2248 4.31906 4.043 4.78195 4.23223L7.53818 5.35898C7.83835 5.1569 8.15296 4.97464 8.48014 4.81406L8.8823 1.86489C8.94987 1.3694 9.37306 1 9.87313 1H14.1273C14.6274 1 15.0506 1.3694 15.1182 1.86489ZM13.6826 6.14004L14.6392 6.60948C14.8842 6.72975 15.1201 6.86639 15.3454 7.01805L16.231 7.61423L19.1674 6.41382L20.4216 8.58619L17.9153 10.5278L17.9866 11.5905C17.9956 11.7255 18.0002 11.8621 18.0002 12C18.0002 12.1379 17.9956 12.2745 17.9866 12.4095L17.9153 13.4722L20.4216 15.4138L19.1674 17.5862L16.231 16.3858L15.3454 16.982C15.1201 17.1336 14.8842 17.2702 14.6392 17.3905L13.6826 17.86L13.2545 21H10.746L10.3178 17.86L9.36131 17.3905C9.11626 17.2702 8.88037 17.1336 8.6551 16.982L7.76954 16.3858L4.83313 17.5862L3.57891 15.4138L6.0852 13.4722L6.01392 12.4095C6.00487 12.2745 6.00024 12.1379 6.00024 12C6.00024 11.8621 6.00487 11.7255 6.01392 11.5905L6.0852 10.5278L3.57891 8.58619L4.83312 6.41382L7.76953 7.61423L8.6551 7.01805C8.88037 6.86639 9.11625 6.72976 9.36131 6.60949L10.3178 6.14004L10.746 3H13.2545L13.6826 6.14004Z" fill="black"/>
</svg>PERSONALIZAR TALONARIO WEB</button>
      <button id="espacio1" @click="crear()"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.5907 10.0001L13.005 12.5858V3.00006C13.005 2.96554 13.0032 2.93143 12.9998 2.89782C12.9486 2.39356 12.5227 2.00006 12.005 2.00006C11.4527 2.00006 11.005 2.44778 11.005 3.00006V12.5858L8.41917 10C8.02865 9.60951 7.39548 9.60951 7.00496 10C6.61443 10.3906 6.61443 11.0237 7.00496 11.4143L11.2979 15.7072C11.4854 15.8947 11.7398 16.0001 12.005 16.0001C12.2702 16.0001 12.5245 15.8947 12.7121 15.7072L17.005 11.4143C17.0538 11.3655 17.0965 11.3129 17.1331 11.2574C17.3894 10.8693 17.3467 10.3418 17.005 10.0001C16.6144 9.60955 15.9813 9.60955 15.5907 10.0001Z" fill="black"/>
<path d="M4.00488 14.0001C4.55717 14.0001 5.00488 14.4478 5.00488 15.0001V19.0001H19.0049V15.0001C19.0049 14.4478 19.4526 14.0001 20.0049 14.0001C20.5572 14.0001 21.0049 14.4478 21.0049 15.0001V19.0001C21.0049 20.1047 20.1095 21.0001 19.0049 21.0001H5.00488C3.90031 21.0001 3.00488 20.1047 3.00488 19.0001V15.0001C3.00488 14.4478 3.4526 14.0001 4.00488 14.0001Z" fill="black"/>
</svg>GENERAR ARCHIVOS DE DATOS</button>
      <div class="botonesAcciones">
        <button id="busca" @click="crear()"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.502 2C5.80753 2 2.00195 5.80558 2.00195 10.5C2.00195 15.1944 5.80753 19 10.502 19C12.4884 19 14.3169 18.3176 15.7637 17.176L20.5877 22C20.9783 22.3905 21.6114 22.3905 22.002 22C22.3925 21.6095 22.3925 20.9763 22.002 20.5858L17.1779 15.7618C18.3196 14.3149 19.002 12.4865 19.002 10.5C19.002 5.80558 15.1964 2 10.502 2ZM4.00195 10.5C4.00195 6.91015 6.9121 4 10.502 4C14.0918 4 17.002 6.91015 17.002 10.5C17.002 12.2952 16.2755 13.9188 15.0981 15.0962C13.9208 16.2736 12.2972 17 10.502 17C6.9121 17 4.00195 14.0899 4.00195 10.5Z" fill="black"/>
</svg>
</button>
        <button id="compa" @click="crear()"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M17.25 8.5C19.3211 8.5 21 6.82107 21 4.75C21 2.67893 19.3211 1 17.25 1C15.1789 1 13.5 2.67893 13.5 4.75C13.5 5.07778 13.5421 5.39574 13.6211 5.69877L7.37469 9.32166C6.69831 8.65875 5.77189 8.25 4.75 8.25C2.67893 8.25 1 9.92893 1 12C1 14.0711 2.67893 15.75 4.75 15.75C5.77189 15.75 6.69831 15.3413 7.37469 14.6783L13.6211 18.3012C13.5421 18.6043 13.5 18.9222 13.5 19.25C13.5 21.3211 15.1789 23 17.25 23C19.3211 23 21 21.3211 21 19.25C21 17.1789 19.3211 15.5 17.25 15.5C16.2281 15.5 15.3017 15.9087 14.6253 16.5716L8.37895 12.9487C8.45795 12.6457 8.5 12.3278 8.5 12C8.5 11.6722 8.45795 11.3543 8.37895 11.0513L14.6253 7.42835C15.3017 8.09126 16.2281 8.5 17.25 8.5ZM19 4.75C19 5.7165 18.2165 6.5 17.25 6.5C16.2835 6.5 15.5 5.7165 15.5 4.75C15.5 3.7835 16.2835 3 17.25 3C18.2165 3 19 3.7835 19 4.75ZM4.75 13.75C5.7165 13.75 6.5 12.9665 6.5 12C6.5 11.0335 5.7165 10.25 4.75 10.25C3.7835 10.25 3 11.0335 3 12C3 12.9665 3.7835 13.75 4.75 13.75ZM17.25 21C18.2165 21 19 20.2165 19 19.25C19 18.2835 18.2165 17.5 17.25 17.5C16.2835 17.5 15.5 18.2835 15.5 19.25C15.5 20.2165 16.2835 21 17.25 21Z" fill="black"/>
</svg>
</button>
      </div>
    </div>
</div>
</div>

<footer>Copyright 2023-Todos los derechos reservados</footer>
    </div>


  </div>
</template>

<!-- ESTILOS____________________________________________________________________________________________________ -->
<style scoped>

.talonario{
  width:90vw;
  height:90vh;
    position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  border:2px solid black;
    display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

}
header, footer{
  width:100%;
  height: 10%;
  background: linear-gradient(to top right, #43389F 0%, #4ec6ca 100%);
  display: flex;
  justify-content: center;
  align-items: center;
	font-family: 'Open Sans', Helvetica, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
    color: #333;
	font-size:30px;
	font-weight:700;
  	letter-spacing: 3px;
    box-sizing: border-box;
  }
header{
  position: fixed;
  top: 0%;
}
footer{
    height: 6%;
	font-size:15px;
	font-weight:500;
  letter-spacing: 0.3px;
  position: fixed;
  bottom: 0%;
}
.configurarTalonario{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap:3%;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  height: 400px;
  margin-top: -200px;
  margin-left: -200px;
    background: linear-gradient(to top right, #43389F 0%, #4ec6ca 100%);
  border-radius: 2px;
	box-shadow: 4px 8px 16px 0 rgba(0,0,0,0.1);
	overflow: hidden;
}
#guardar{
    width:5vw;
  height:4vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #333;

}
.accion, .fondo{
  width: 400px;
  height: 480px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: rgb(162, 159, 159);
}
.acciones, .informacion{
  display: flex;
  margin-top:5%;
  flex-direction: column;
    justify-content: center;
  align-items: center;
      width: 400px;
  height: 400px;
  background-color: aliceblue;
}
#espacio1, #espacio2{
  margin-top: 1%;
  width:80%;
  height:17%;
background-color: rgb(51, 51, 226);
  color:black;
}
#espacio2{
background-color: rgb(115, 31, 163);
}
#espacio{
margin-top: 1%;
  width:80%;
  height:10%;
background-color: rgb(200, 198, 198);
  color:black;
}

.botoneAcciones{
  display: flex;
  flex-direction: row;
}

.fondo1{
display:flex;
}
.accion, .acciones{
position: fixed;
right:0%;
margin-right: 2%;
}
.informacion, .fondo{
  position: fixed;
left:0%;
margin-left: 2%;
}

@media
(1100px <= width <= 1366px){
  .talonario{
    background-color:rgb(168, 168, 241)
  }

  .configurarTalonario{
    width: 350px;
  height: 350px;
  }

    #guardar{
    width:25%;
  height:10%;
    }
    .accion{
position: fixed;
right:0%;
margin-right: 2%;
}
#espacio1, #espacio2{
  margin-top: 1%;
  width:80%;
  height:17%;
background-color: rgb(51, 51, 226);
  color:black;
  font-size: 12px;
  margin-bottom:2px;
}
#espacio2{
background-color: rgb(115, 31, 163);
}
#espacio{
margin-top: 1%;
  width:80%;
  height:10%;
background-color: rgb(200, 198, 198);
  color:black;
}
.subtitulo{
  position: absolute;
  color:black;
  font-size: large;
  letter-spacing: 0.3px;
  position: absolute;
  top:10%;
  width: 7vw;
  height: 2vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 29%;
}

.fondo{
  position: fixed;
left:0%;
margin-left: 2%;
}
    #crear{
 position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  width:13vw;
  height: 8vh;
  background-color:rgb(221, 163, 163)
    }
  .accion, .fondo{
  width: 320px;
  height: 380px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: rgb(180, 180, 180);
  box-shadow: 1px 2px 2px rgb(99, 98, 98);
  border-radius: 1vmax;
}
.fondo1{
display:flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 95%;
height: 70%;
box-sizing: border-box;
}
.acciones, .informacion{
  display: flex;
  margin-top:4%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 270px;
  height: 300px;
  background-color: aliceblue;
  border-radius: 1vmax;
  box-shadow: 4px 4px 4px rgb(99, 98, 98);
}

.informacion{
  margin-left: 4%;
  display:grid;
  text-align: left;
}
.acciones{
  font-size: 14px;
  margin-right: 4%;
 text-align: center;
}
    #edita{
      width:10vw;
      height: 4vh;
      display: flex;
  justify-content: center;
  align-items: center;
  background-color: #333;
    }

    #busca, #compa{
      width:4vw;
      height: 7vh;
  align-items: center;
  background-color: #333;
    }

  }

</style>
