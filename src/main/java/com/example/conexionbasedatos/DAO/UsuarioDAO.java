package com.example.conexionbasedatos.DAO;

import com.example.conexionbasedatos.Modelo.Usuario;

public interface UsuarioDAO {

    boolean add(Usuario usuario);

    int login(String usrName, String password);
}
