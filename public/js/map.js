var map;

function success(post) {
  if (map === undefined){
    map = L.map('mapid').setView([post.coords.latitude, post.coords.longitude], 13);
  }else{
    map.remove();
    map = L.map('mapid').setView([post.coords.latitude, post.coords.longitude], 13);
  }

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">nascOpenMap</a> contributors'
}).addTo(map);

L.marker([post.coords.latitude, post.coords.longitude]).addTo(map) 
  .bindPopup('Eu estou aqui!')
  .openPopup();
}
function error(err){
  console.log(err);
}
var watchId = navigator.geolocation.watchPosition(success, error, {
  enableHighAccuracy: true,
  timeout: 5000
})

// Foto do item.PNG/JPEG
document.getElementById("fileInput").addEventListener("change", function (e) {
  var file = e.target.files[0];

  if (file) {
    var reader = new FileReader();

    reader.onload = function (e) {
      var image = new Image();
      image.src = e.target.result;
      document.getElementById("preview").innerHTML = "";
      document.getElementById("preview").appendChild(image);
    };

    reader.readAsDataURL(file);
  }
});

//Validação left-conteudo
document.getElementById("submit").addEventListener("click",  (nasc) => {
  // validacao do tipo de item (radio)
  var tipoItemRadios = document.getElementsByName("tipoItem");
  var tipoItemValido = false;
  for (var i = 0; i < tipoItemRadios.length; i++) {
    if (tipoItemRadios[i].checked) {
      tipoItemValido = true;
      break;
    }
  }
  // validacao da descricao (textarea)
  var descricao = document.getElementById("descricao").value.trim();
  var descricaoValida = descricao !== "";

  // validacao do desejo (radio)
  var desejoRadios = document.getElementsByName("desejo");
  var desejoValido = false;
  for (var j = 0; j < desejoRadios.length; j++) {
    if (desejoRadios[j].checked) {
      desejoValido = true;
      break;
    }
  }

  var file = document.getElementById("fileInput").value

  // exibe a mensagem de validacao ou sucesso
  var validationMessage = document.getElementById("validationMessage");
  var successMessage = document.getElementById("successMessage");

  if (tipoItemValido && descricaoValida && desejoValido && file) {
    validationMessage.textContent = "";
    successMessage.textContent = "Recebido com sucesso!";
  } else {
    validationMessage.textContent = "Por favor, preencha todos os campos obrigatórios.";
    successMessage.textContent = "";
    nasc.preventDefault();
  }
});