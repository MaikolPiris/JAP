var alumnos = [];
$(document).ready(function(){
	
                    
	//Codigo AJAX primera vez
	if(localStorage.getItem("alumnosGuardados")== undefined){
		$.ajax({
			url:"http://www.scaggiano.com.uy/json.js",
			type: "GET",
			async: true,
			success: function(datos){
				var alumnos_temp = JSON.parse(datos);
				for (var i=0;i<alumnos_temp.length;i++){
					var alumno_temp = new alumno(alumnos_temp[i].nombre,alumnos_temp[i].apellido,alumnos_temp[i].edad,alumnos_temp[i].email,alumnos_temp[i].foto);
					alumnos.push(alumno_temp);
				};
				completarTabla(alumnos);
				var save_alumnos = JSON.stringify(alumnos);
				localStorage.setItem("alumnosGuardados",save_alumnos);
			},
			error: function(){
				$("body").append("<div class='alert alert-danger alert-dismissible fade show'><strong>ERROR!!</strong> No se han podido cargar los datos</div>");
			}
		});
	}
	
	//cargar desde localStorage
	else{
		var save_alumnos = localStorage.getItem("alumnosGuardados");
		alumnos = JSON.parse(save_alumnos);
		completarTabla(alumnos);
	}         
});
//funcion de validacion

function agregarAlumno(){
    var alumno_temp = new alumno($("#formName").val(),$("#formApellido").val(),$("#formEdad").val(),$("#formEMail").val(),$("#formLinkFoto").val());
    alumnos.push(alumno_temp);
    completarTabla(alumnos);	
    var save_alumnos = JSON.stringify(alumnos);
    localStorage.setItem("alumnosGuardados",save_alumnos);
}

function completarTabla(alumnos){
	$("#tabla1").html("");
	$("#tabla1").append("<thead><tr><th>Nombre</th><th>Apellido</th><th>Edad</th><th>Mail</th><th>Foto</th></tr></thead>");	// creo el Encabezado)
	$("#tabla1").append("<tbody id='body1'></body>");	//creo el cuerpo de id=body1
	for (var i=0;i<alumnos.length;i++)					//relleno la tabla
            $("#body1").append("<tr><td>"+alumnos[i].nombre+"</td><td>"+alumnos[i].apellido+"</td>><td>"+alumnos[i].edad+"</td><td>"+alumnos[i].email+"</td><td><div align='center'><img class='rounded-circle' alt='Imagen Invalida' src="+alumnos[i].foto+" style='width:50px'></div></td></tr>");
};

//Constructor alumno
function alumno(nombre,apellido,edad,email,foto){
	this.nombre = nombre;
	this.apellido = apellido;
	this.edad = edad;
	this.email = email;
	this.foto = foto;
};