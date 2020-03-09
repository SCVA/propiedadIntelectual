<?php
class Usuario{
    private $nombre;
    private $puntaje;

    public function __GET($k){ return $this->$k; }
    public function __SET($k, $v){ return $this->$k = $v; }
}