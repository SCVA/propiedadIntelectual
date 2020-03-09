<?php
class Respuesta{
    private $idRespuesta;
    private $respuesta;

    public function __GET($k){ return $this->$k; }
    public function __SET($k, $v){ return $this->$k = $v; }
}