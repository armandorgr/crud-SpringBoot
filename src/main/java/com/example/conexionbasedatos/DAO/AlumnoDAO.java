package com.example.conexionbasedatos.DAO;

import com.example.conexionbasedatos.Modelo.Alumno;

import java.util.List;

public interface AlumnoDAO {

    List<Alumno> listar();

    void delete(int id);

    void add(Alumno alumno);

    void update(Alumno alumno);


}
