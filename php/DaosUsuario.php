<?php
require_once 'CRUD.php';
require_once 'Usuario.php';

class DaosUsuario extends CRUD
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

            $stm = $this->pdo->prepare("SELECT * FROM user");
            $stm->execute();

            foreach($stm->fetchAll(PDO::FETCH_OBJ) as $r)
            {
                $userAc = new Usuario();

                $userAc->__SET('nombre', $r->nombre);
                $userAc->__SET('puntaje', $r->puntaje);

                $result[] = $userAc;
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
    {
        try 
        {
            $stm = $this->pdo
                      ->prepare("SELECT * FROM alumnos WHERE nombre = ?");
                      
            $stm->execute(array($nombre));
            $r = $stm->fetch(PDO::FETCH_OBJ);

            $user = new Usuario();

            $user->__SET('nombre', $r->nombre);
            $user->__SET('puntaje', $r->puntaje);
			
            return $user;
        } catch (Exception $e) 
        {
            die($e->getMessage());
        }
    }

	//DELETE
    public function Eliminar($nombre)
    {
        try 
        {
            $stm = $this->pdo
                      ->prepare("DELETE FROM alumnos WHERE nombre = ?");                      

            $stm->execute(array($nombre));
        } catch (Exception $e) 
        {
            die($e->getMessage());
        }
    }

	//UPDATE
    public function Actualizar(Usuario $data)
    {
        try 
        {
            $sql = "UPDATE user SET 
                        puntaje        = ?
                    WHERE nombre = ?";

            $this->pdo->prepare($sql)
                 ->execute(
                array(
                    $data->__GET('puntaje'),
                    $data->__GET('nombre')
                    )
                );
        } catch (Exception $e) 
        {
            die($e->getMessage());
        }
    }

	//CREATE
    public function Registrar(Usuario $data)
    {
        try 
        {
        $sql = "INSERT INTO user (nombre,puntaje) 
                VALUES (?, ?)";

        $this->pdo->prepare($sql)
             ->execute(
            array(
                $data->__GET('nombre'), 
                $data->__GET('puntaje')
                )
            );
        } catch (Exception $e) 
        {
            die($e->getMessage());
        }
    }
}