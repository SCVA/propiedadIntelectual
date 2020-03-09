<?php 
require_once 'DaosPreguntaRespuesta.php';
require_once 'Pregunta.php';
require_once 'Respuesta.php';
$quest = new Pregunta();
$db = new DaosPreguntaRespuesta("root","");
$quest = $db->Obtener($_POST['id']);
$total = "";
$total = $total.$quest->__GET('pregunta')."\n";
foreach ($quest->__GET('respuestas') as $valor){
	$indice = ($valor->__GET('idRespuesta')-(($quest->__GET('idPregunta')-1)*4)).". ";
	$total = $total.$indice.$valor->__GET('respuesta')."\n";
}
$indice = 0;
foreach ($quest->__GET('respuestas') as $valor){
	if($valor->__GET('respuesta') == $quest->__GET('respuestaCorrecta')){
		$total = $total.$indice."\n";
	}
	$indice++;
}
$total = $total.$quest->__GET('idPregunta')."\n";
echo utf8_encode($total);
?>