<?php
require_once 'CRUD.php';
require_once 'Pregunta.php';
require_once 'Respuesta.php';

class DaosPreguntaRespuesta extends CRUD
{
    public function __CONSTRUCT($user,$password)
    {
        parent::__construct($user,$password);
    }

    public function Listar()
    {
        try
        {
            $result = array();

            $stm = $this->pdo->prepare("SELECT * FROM pregunta");
            $stm->execute();

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
    public function Obtener($idPregunta)
    {
        try 
        {
            $stm = $this->pdo
                      ->prepare("SELECT * FROM pregunta WHERE idPregunta = ?");
                      
            $stm->execute(array($idPregunta));
            $r = $stm->fetch(PDO::FETCH_OBJ);

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
			
            return $quest;
        } catch (Exception $e) 
        {
            die($e->getMessage());
        }
    }

	//DELETE QUESTIONS
    public function Eliminar($idPregunta)
    {
        try 
        {
			//Delete Answers
			$this->EliminarRespuestas($idPregunta);
			//Delete Question
            $stm2 = $this->pdo
                      ->prepare("DELETE FROM pregunta WHERE idPregunta = ?");                      

            $stm2->execute(array($idPregunta));
        } catch (Exception $e) 
        {
            die($e->getMessage());
        }
    }
	
	//DELETE ANSWERS
    public function EliminarRespuestas($idPregunta)
    {
        try 
        {
			//Delete Answers
			$stm = $this->pdo
                      ->prepare("DELETE FROM answer WHERE idPregunta = ?");                      

            $stm->execute(array($idPregunta));
        } catch (Exception $e) 
        {
            die($e->getMessage());
        }
    }

	//UPDATE
    public function Actualizar(Pregunta $data)
    {
        try 
        {
            $sql = "UPDATE pregunta SET 
                        clasificacion        = ?,
						pregunta        = ?,
						respuestaCorrecta    = ?
                    WHERE idPregunta = ?";
            $this->pdo->prepare($sql)
                 ->execute(
                array(
                    $data->__GET('clasificacion'),
					$data->__GET('pregunta'),
					$data->__GET('respuestaCorrecta'),
                    $data->__GET('idPregunta')
                    )
                );
        } catch (Exception $e) 
        {
            die($e->getMessage());
        }
    }

	//CREATE QUESTION
    public function Registrar(Pregunta $data)
    {
        try 
        {
        $sql = "INSERT INTO pregunta (idPregunta,clasificacion,pregunta,respuestaCorrecta) 
                VALUES (?, ?, ?, ?)";

        $this->pdo->prepare($sql)
             ->execute(
            array(
                $data->__GET('idPregunta'),
				$data->__GET('clasificacion'),
				$data->__GET('pregunta'), 
                $data->__GET('respuestaCorrecta')
                )
            );
		
		$size = count($data->__GET('respuestas'));

		for ($i = 0; $i < $size; $i++){
			$this->RegistrarRespuesta(array_pop($data->__GET('respuestas')),$data->__GET('idPregunta'));
		}
		
        } catch (Exception $e) 
        {
            die($e->getMessage());
        }
    }
	
	//CREATE ANSWER
    public function RegistrarRespuesta(Respuesta $data, $idPregunta)
    {
        try 
        {
        $sql = "INSERT INTO answer (idRespuesta,respuesta,idPregunta) 
                VALUES (?, ?, ?)";

        $this->pdo->prepare($sql)
             ->execute(
            array(
                $data->__GET('idRespuesta'),
				$data->__GET('respuesta'),
                $idPregunta
                )
            );
        } catch (Exception $e) 
        {
            die($e->getMessage());
        }
    }
	
	//DELETE ANSWER
    public function EliminarRespuesta($idRespuesta,$idPregunta)
    {
        try 
        {
            $stm = $this->pdo
                      ->prepare("DELETE FROM answer WHERE idRespuesta = ? AND idPregunta = ?");                      

            $stm->execute(array($idRespuesta,$idPregunta));
        } catch (Exception $e) 
        {
            die($e->getMessage());
        }
    }

	//UPDATE ANSWER
    public function ActualizarRespuesta(Respuesta $data, $idPregunta)
    {
        try 
        {
            $sql = "UPDATE answer SET 
                        respuesta        = ?
                    WHERE idRespuesta = ? AND idPregunta = ?";

            $this->pdo->prepare($sql)
                 ->execute(
                array(
                    $data->__GET('respuesta'),
                    $data->__GET('idRespuesta'),
					$idPregunta
                    )
                );
        } catch (Exception $e) 
        {
            die($e->getMessage());
        }
    }
}