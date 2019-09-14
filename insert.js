let key;
PegarUsuarios();
$('#formulario').submit(function(){
	event.preventDefault();
	let firstName = $('#first_name').val();
	let lastName = $('#last_name').val();
	let email = $('#email').val();
	let password = $('#password').val();
	
	salvarUsuario(firstName, lastName, email, password)
		.then (function(result){
			console.log('Registro salvo com sucesso');
			$('#formulario')[0].reset();
		})
		.catch(function(erro){
			console.log("Algum erro aconteceu");
		})
	
});


$('#atualizarform').on('click',function(){ 

        let firstName = $('#first_name').val();
        let lastName = $('#last_name').val();
        let email = $('#email').val();
        let password = $('#password').val();
        let key = $('#id').val();
        
        atualizarUsuario(key,firstName,lastName,email,password)
            .then (function(result) {
                console.log('Registro atualizado com sucesso');
                $('#formulario')[0].reset();
            })
            .catch(function(erro) 
            {
                console.log('Algum erro aconteceu');
            })
    });

function salvarUsuario(firstName, lastName, email, password){
	return firebase.database().ref().child('usuarios/').push({
		nome: firstName,
		sobrenome: lastName,
		email: email,
		senha: password

	});
}


function atualizarUsuario(key,firstName, lastName, email, password){
	return firebase.database().ref().child('usuarios/' + key).update({
		key: id,
		nome: firstName,
		sobrenome: lastName,
		email: email,
		senha: password

	});
}

function deleteUsuarioFirebase(key) 
{
    let resposta = confirm("Tem certeza?");
    if (resposta) 
    {
        return firebase.database().ref().child('usuarios/' + key).remove();
    }
}


function PegarUsuarios() {

firebase.database().ref('usuarios').on('value', function(snapshot){
	data = snapshot.val();
	let keys = Object.keys(data);
	id= 0;
	$("#lista").empty();
	keys.forEach(function(key){
		let usuarios = data[key];
		console.log(usuarios.nome);
		$("#lista").append('<div class="collection-item" id="linha' + id+ '">' + usuarios.nome + ' ' + usuarios.sobrenome +  '<a class="waves-effect waves-light btn grey darken-4 botaozin" onclick="deleteUsuarioFirebase(this.id)" id="' + key + '">' + '<i class = "material-icons right">' + 'delete_forever'  + '</i>' + '</a>' + '<a class="waves-effect waves-light btn grey darken-4 botaozin" onclick="preencherForm(this.id)" id="' + key + '">' + '<i class = "material-icons right">' + 'edit'  + '</i>' + '</a>' + '</div>')
		id++;
		} ,this);
	});
}

	function preencherForm(key){
	let usuarios = data[key];
	$("#id").val(key);
	$("#first_name").val(usuarios.nome);
	$("#last_name").val(usuarios.sobrenome);
	$("#password").val(usuarios.senha);
	$("#email").val(usuarios.email);
	Materialize.updateTextFields();

}

$("#idzao").hide();


