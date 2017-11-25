$(document).ready(function(){
  $.ajax({
  headers: { 'X-Auth-Token': '46039cc6938f4e7c82acc6efdc8a623d' },
  url: 'https://api.football-data.org/v1/competitions',
  dataType: 'json',
  type: 'GET',
  }).done(function(response) {
    $.each(response, function(indice){
      var option = $('<option>'+response[indice].caption+'</option>').attr('value',response[indice].id);
      $("#ligas").append(option);
    });
    var liga =  document.getElementById('ligas').value;
    CargarEquipos(liga);
  });
});

$("#ligas").change(function () {
    var liga =  document.getElementById('ligas').value;
    CargarEquipos(liga);
});
function CargarEquipos(liga) {
  $.ajax({
  headers: { 'X-Auth-Token': '46039cc6938f4e7c82acc6efdc8a623d' },
  url: 'http://api.football-data.org/v1/competitions/'+liga+'/teams',
  dataType: 'json',
  type: 'GET',
  }).done(function(response) {
    $("#equipo").html("");
    $.each(response.teams, function(indice){
      var option = $('<option>'+response.teams[indice].name+'</option>').attr('value',response.teams[indice]._links.players.href);
      $("#equipo").append(option);
    });
    var equipo =  document.getElementById('equipo').value;
    cargarJugadores(equipo);
  });
}
$("#equipo").change(function () {
  var equipo =  document.getElementById('equipo').value;
  cargarJugadores(equipo);
});

function cargarJugadores(equipo) {
  $.ajax({
  headers: { 'X-Auth-Token': '46039cc6938f4e7c82acc6efdc8a623d' },
  url: equipo,
  dataType: 'json',
  type: 'GET',
  }).done(function(response) {
    $("#jugadores").html("");
      if (response.players.length != 0) {
        $.each(response.players, function(indice){
        var div = $('<div>').append("<h3>"+response.players[indice].name+"</h3><p>Posición: "+response.players[indice].position+"</p><p>Número: "+response.players[indice].jerseyNumber+"</p><p>Nacimiento:"+response.players[indice].dateOfBirth+"</p><p>Nacionalidad: "+response.players[indice].nationality+"</p>").attr('class','col-sm-4');
        $("#jugadores").append(div);
        });
      }else {
        var div = $('<div>').append("<h3>No hay jugadores</h3>").attr('class','col-sm-4');
        $("#jugadores").append(div);
      }
  });
}
