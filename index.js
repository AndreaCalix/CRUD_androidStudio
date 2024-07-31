const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')

const app = express ()
app.use(bodyParser.json())

//conexion a la bd
const PUERTO = 3000
const conexion = mysql.createConnection({
    host: 'localhost',
    database: 'pruebas',
    user:'root',
    password:''
})


app.listen(PUERTO,()=> {
    console.log('Servidor corriendo en el puerto: ' + PUERTO);
})

conexion.connect(error =>{
    if(error) throw error
    console.log('Conexion exitosa a la bd');
})

app.get('/', (req, res) => {
    res.send('API')
})

//----- obtener todos los usuarios ----------
app.get('/usuarios', (req,res)=>{
    const query = 'SELECT * FROM USUARIO;'
    conexion.query(query, (error,resultado) =>{
        if(error) return console.error(error.message)

        const obj = { }
        if (resultado.length > 0){
            obj.listaUsuario = resultado

            res.json(obj)
        }else{
             res.json('No hay registros')
        }
    })
})

//----- obtener un usuarios por id ----------
app.get('/usuarios:id', (req,res)=>{
    const {id} = req.params;
    const query = 'SELECT * FROM USUARIO WHERE idUsuario = ?'
    conexion.query(query, [id], (error,resultado) =>{
        if(error) return console.error(error.message)

        if (resultado.length > 0){
        
            res.json(resultado)
        }else{
             res.json('No hay registros')
        }
    })
})

//------- agregar un usuario -------------------------
app.post('/usuarios/add', (req,res)=>{
    //recibir la informacion a insertar
    const usuario = {
        nombre: req.body.nombre,
        email: req.body.email
    }
    const query = 'INSERT INTO usuario SET ?'
    conexion.query(query,usuario, (error) =>{
        if(error) return console.error(error.message)

        res.json('Ingresado correctamente')
        
    })
})

//------- actualizar un usuario -------------------------
app.post('/usuarios/update/:id', (req, res) => {
    // Recibir la información a actualizar
    const { id } = req.params;
    const { nombre, email } = req.body;

    const query = 'UPDATE USUARIO SET nombre = ?, email = ? WHERE idUsuario = ?';
    const values = [nombre, email, id];

    conexion.query(query, values, (error) => {
        if (error) return console.error(error.message);

        res.json('Actualización realizada correctamente');
    });
});

// --------- borrar un usuario -------------
app.delete('/usuarios/:id', (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM USUARIO WHERE idUsuario = ?';

    conexion.query(query, [id], (error, resultado) => {
        if (error) return console.error(error.message);

        if (resultado.affectedRows > 0) {
            res.json('Usuario eliminado correctamente');
        } else {
            res.json('No se encontró el usuario');
        }
    });
});