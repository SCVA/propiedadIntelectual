<?php
require_once 'Respuesta.php';
class Pregunta{
    private $idPregunta;
    private $clasificacion;
	private $pregunta;
	private $respuestaCorrecta;
	private $respuestas = array();
	
    public function __GET($k){ return $this->$k; }
    public function __SET($k, $v){ return $this->$k = $v; }
}