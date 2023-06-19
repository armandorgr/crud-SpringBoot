package com.example.conexionbasedatos.Controller;

import com.example.conexionbasedatos.DAO.AlumnoDAO;
import com.example.conexionbasedatos.DAO.UsuarioDAO;
import com.example.conexionbasedatos.Modelo.Alumno;
import com.example.conexionbasedatos.Modelo.Usuario;
import com.example.conexionbasedatos.utils.Jwt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

public class Controlador {
    @Autowired
    AlumnoDAO asignaturaDAO;
    @Autowired
    UsuarioDAO usuarioDAO;
    @Autowired
    Jwt jwt;

    @GetMapping("/listar")
    public List<Alumno> listar(){
        return asignaturaDAO.listar();
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable int id){
        asignaturaDAO.delete(id);
    }

    @PutMapping("/update")
    public void update(@RequestBody Alumno alumno){asignaturaDAO.update(alumno);}

    @PostMapping("/add")
    public void add(@RequestBody Alumno alumno){
        asignaturaDAO.add(alumno);
    }

    @PostMapping("/register")
    public boolean add(@RequestBody Usuario usuario){ return usuarioDAO.add(usuario);}

    @GetMapping("/login/{usrName}/{password}")
    public String login(@PathVariable String usrName, @PathVariable String password){
        if(usuarioDAO.login(usrName, password)!=-1){
            String token = jwt.create(String.valueOf(usuarioDAO.login(usrName,password)),usrName);

            return token;
        }
        else{
            return "No login";
        }
    }
}
