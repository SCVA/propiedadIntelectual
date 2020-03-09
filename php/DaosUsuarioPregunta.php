<?php
require_once 'CRUD.php';
require_once 'Usuario.php';
require_once 'Pregunta.php';

class DaosUsuarioPregunta extends CRUD
{
    public function __CONSTRUCT($user,$password)
    {
        parent::__construct($user,$password);
    }

	public function Listar()
    {}
	
    public function ListarNoAprobadas($nombre)
    {
        try
        {
            $result = array();

            $stm = $this->pdo->prepare("SELECT pregunta.idPregunta, pregunta.clasificacion, pregunta.pregunta, pregunta.respuestaCorrecta FROM userquestion,pregunta WHERE nombre = ? AND aprobar != '1'");
            $stm->execute(array($nombre));

            foreach($stm->fetchAll(PDO::FETCH_OBJ) as $r)
            {
                $quest = new Pregunta();

                $quest->__SET('idPregunta', $r->idPregunta);
                $quest->__SET('clasificacion', $r->clasificacion);
				$quest->__SET('pregunta', $r->pregunta);
                $quest->__SET('respuestaCorrecta', $r->respuestaCorrecta);
				
				$respuestas = array();
				$stm2 = $this->pdo->prepare("SELECT * FROM answer WHERE idPregunta = ?");
				$stm2->execute(array($quest->__GET('idPregunta')));

				foreach($stm2->fetchAll(PDO::FETCH_OBJ) as $r2)
				{
					$answ = new Respuesta();

					$answ->__SET('idRespuesta', $r2->idRespuesta);
					$answ->__SET('respuesta', $r2->respuesta);

					$respuestas[$answ->__GET('idRespuesta')] = $answ;
				}

				$quest->__SET('respuestas', $respuestas);
				
                $result[] = $quest;
            }
            return $result;
        }
        catch(Exception $e)
        {
            die($e->getMessage());
        }
    }

	//READ
    public function Obtener($nombre)
    {}

	//DELETE
    public function Eliminar($nombre)
    {
        try 
        {
            $stm = $this->pdo
                      ->prepare("DELETE FROM userquestion WHERE nombre = ?");                      

            $stm->execute(array($nombre));
        } catch (Exception $e) 
        {
            die($e->getMessage());
        }
    }

	//CREATE
    public function Registrar(Usuario $data, Pregunta $dataDos)
    {
        try 
        {
        $sql = "INSERT INTO userquestion (nombre,idPregunta,aprobar) 
                VALUES (?, ?, ?)";

        $this->pdo->prepare($sql)
             ->execute(
            array(
                $data->__GET('nombre'), 
                $dataDos->__GET('idPregunta'),
				1
                )
            );
        } catch (Exception $e) 
        {
            die($e->getMessage());
        }
    }
}