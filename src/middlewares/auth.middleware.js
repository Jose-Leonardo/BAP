/**
 * La mejor forma es crear un meddleware con pocos datos necesarios del usuario
 * ejemplo: id, gmail, passport(incriptada)
 * realizar una autenticacion y verificacion del usuario
 * crea un token del usuario, y de ahi extraer la informacion necesaria
 */

//* Esta funcion representa en teoria el usuario que hace la peticion 
//*Por defecto es el usuario 1
const meddleware = (req, res, next) =>{
    const {user = 1 } = req.params
    console.log(`Soy el usuario ${user}`);
    next()
}

module.exports = meddleware ;