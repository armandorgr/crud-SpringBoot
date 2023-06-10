package com.example.conexionbasedatos.DAO;

import com.example.conexionbasedatos.Modelo.Usuario;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import java.time.Duration;
import java.time.Instant;
import java.util.List;

import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;

@Transactional
@Repository
public class UsuarioDAOimp implements UsuarioDAO{

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public boolean add(Usuario usuario) {
        boolean resultado = false;
        TypedQuery<Usuario> query = entityManager.createQuery("FROM Usuario WHERE username = :usrName",Usuario.class);
        Usuario usr;
        try{
            usr = query.setParameter("usrName", usuario.getUsername()).getSingleResult();
        }catch(Exception e){
            resultado=true;
            Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
            usuario.setPasswd(argon2.hash(4, 1024 * 1024, 8, usuario.getPasswd()));
            entityManager.merge(usuario);
        }
    return resultado;
    }

    @Override
    public int login(String usrName, String password) {
        Usuario usr;
        int resultado = -1;
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        TypedQuery<Usuario> query = entityManager.createQuery("FROM Usuario WHERE username = :usrName",Usuario.class);
        try{usr = query.setParameter("usrName", usrName).getSingleResult();

            if(argon2.verify(usr.getPasswd(), password)){
                resultado=usr.getRol();
            }
        }catch (Exception e){
            resultado=-1;
        }
        return resultado;
    }
}
