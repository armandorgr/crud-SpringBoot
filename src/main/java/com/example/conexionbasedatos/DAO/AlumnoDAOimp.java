package com.example.conexionbasedatos.DAO;

import com.example.conexionbasedatos.Modelo.Alumno;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Transactional
@Repository
public class AlumnoDAOimp implements AlumnoDAO {

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public List<Alumno> listar() {
        String query = "FROM Alumno";
        return entityManager.createQuery(query).getResultList();
    }

    @Override
    public void delete(int id) {
        Alumno alumno = entityManager.find(Alumno.class,id);
        if(alumno !=null){
            entityManager.remove(alumno);
        }

    }

    @Override
    public void add(Alumno alumno) {
        entityManager.merge(alumno);
    }

    @Override
    public void update(Alumno alumno) {
        Alumno student = entityManager.find(Alumno.class,alumno.getId());
        if(student!=null){
            entityManager.merge(alumno);
        }
    }
}
