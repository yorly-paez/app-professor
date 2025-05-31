// Función principal que obtiene y muestra una lista de usuarios paginada
function users(page) {
    // Actualiza el título de la sección
    document.getElementById('cardHeader').innerHTML = '<h5>Listado de usuarios</h5>'
    
    // Define el endpoint de la API con el número de página
    const REQRES_ENDPOINT = 'https://reqres.in/api/users?page='+page
    
    // Realiza una petición GET a la API
    fetch(REQRES_ENDPOINT, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'x-api-key': 'reqres-free-v1'  // Cabecera de autenticación
        }
    })
    .then((response) => {
        // Procesa la respuesta convirtiéndola a JSON y añadiendo el status
        return response.json().then(
            data => {
                return {
                    status: response.status,
                    info: data
                }
            }
        )
    })
    .then((result) => {
        // Si la respuesta es exitosa (status 200)
        if(result.status === 200) {
            // Comienza a construir la tabla HTML para mostrar los usuarios
            let listUsers = `
                <button type="button" class="btn btn-outline-secondary" onclick="addUser()">
                <i class="fa-solid fa-user-plus"></i>
                </button>
                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Apellido</th>
                        <th scope="col">Avatar</th>
                        <th scope="col">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
            `
            
            // Itera sobre cada usuario y añade una fila a la tabla
            result.info.data.forEach(user => {
                listUsers = listUsers + `
                    <tr>
                        <td>${user.id}</td>
                        <td>${user.first_name}</td>
                        <td>${user.last_name}</td>
                        <td><img src="${user.avatar}" class="img-thumbnail" alt="avatar del usuario"></td>
                        <td>
                            <button type="button" class="btn btn-outline-info" onclick="getUser('${user.id}')"><i class="fa-solid fa-eye"></i></button>
                        </td>
                    </tr>
                `  
            });
            
            // Cierra la tabla y añade paginación
            listUsers = listUsers + `
                </tbody>
                </table>
                <nav aria-label="Page navigation example">
                    <ul class="pagination">
                        <li class="page-item">
                        <a class="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                        </li>
                        <li class="page-item"><a class="page-link" href="#usersPage1" onclick="users('1')">1</a></li>
                        <li class="page-item"><a class="page-link" href="#usersPage2" onclick="users('2')">2</a></li>
                        <li class="page-item">
                        <a class="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                        </li>
                    </ul>
                </nav>
            `
            
            // Inserta el HTML generado en el elemento con id 'info'
            document.getElementById('info').innerHTML = listUsers
        }
        else {
            // Muestra mensaje si no hay usuarios
            document.getElementById('info').innerHTML = 'No existen usuarios en la BD'
        }
    })
}

// Función que obtiene los detalles de un usuario específico por su ID
function getUser(idUser) {
    // Define el endpoint de la API con el ID del usuario
    const REQRES_ENDPOINT = 'https://reqres.in/api/users/'+idUser
    
    // Realiza una petición GET a la API
    fetch(REQRES_ENDPOINT, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'x-api-key': 'reqres-free-v1'  // Cabecera de autenticación
        }
    })
    .then((response) => {
        // Procesa la respuesta convirtiéndola a JSON y añadiendo el status
        return response.json().then(
            data => {
                return {
                    status: response.status,
                    info: data
                }
            }
        )
    })
    .then((result) => {
        // Si la respuesta es exitosa (status 200)
        if(result.status === 200) {
            // Obtiene los datos del usuario y muestra el modal
            const user = result.info.data
            showModalUser(user)
        }
        else {
            // Muestra mensaje si no se encuentra el usuario
            document.getElementById('info').innerHTML = 
                '<h3>No se encontro el usuario en la Api</h3>'
        }
    })
}

// Función que muestra un modal con la información detallada de un usuario
function showModalUser(user) {
    // Construye el HTML del modal con los datos del usuario
    const modalUser = `
    <!-- Modal -->
    <div class="modal fade" id="showModalUser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-sm">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Ver Usuario</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="card">
                <img src="${user.avatar}" class="card-img-top" alt="Avatar del usuario">
                <div class="card-body">
                    <h5 class="card-title">Información del usuario</h5>
                    <p class="card-text">Correo: ${user.email}</p>
                    <p class="card-text">Nombre: ${user.first_name}</p>
                    <p class="card-text">Apellido: ${user.last_name}</p>
                </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    `
    
    // Inserta el modal en el elemento con id 'modalUser'
    document.getElementById('modalUser').innerHTML = modalUser
    
    // Crea una instancia del modal y lo muestra
    const modal = new bootstrap.Modal(document.getElementById('showModalUser'))
    modal.show()
}

function addUser() {
    // Construye el HTML del modal con los datos del usuario
    const modalUser = `
    <!-- Modal -->
    <div class="modal fade" id="showModalUser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Agregar Usuario</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="card">
                        <form id="formAddUser">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col">
                                        <input type="text" class="form-control" placeholder="Primer Nombre" aria-label="First name" id="first_name">
                                    </div>
                                    <div class="col">
                                        <input type="text" class="form-control" placeholder="Apellido" aria-label="Last name" id="last_name">
                                    </div>
                                </div>

                                <div class="row mt-3">
                                    <div class="col">
                                        <input type="email" class="form-control" placeholder="Correo Electrónico" aria-label="Ingresa el email" id="email" required>
                                    </div>
                                    <div class="col">
                                        <input type="url" class="form-control" placeholder="Link del avatar" aria-label="Avatar URL" id="avatar" required>
                                    </div>
                                </div>

                                <div class="row mt-3">
                                    <div class="col text-center">
                                        <button type="button" class="btn btn-outline-success" onclick="saveUser()">Guardar Usuario</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>
    `;
    
    // Inserta el modal en el elemento con id 'modalUser'
    document.getElementById('modalUser').innerHTML = modalUser;
    
    // Crea una instancia del modal y lo muestra
    const modal = new bootstrap.Modal(document.getElementById('showModalUser'));
    modal.show();
}

function saveUser() {
    const REQRES_ENDPOINT = 'https://reqres.in/api/users';
    const form = document.getElementById('formAddUser');

    // Verifica si el formulario es válido
    if (form.checkValidity()) {
        // Obtiene los valores del formulario
        const first_name = document.getElementById('first_name').value;
        const last_name = document.getElementById('last_name').value;
        const email = document.getElementById('email').value;
        const avatar = document.getElementById('avatar').value;

        // Crea un objeto con los datos del usuario
        const user = { first_name, last_name, email, avatar };

        // Realiza una petición POST a la API
        fetch(REQRES_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'x-api-key': 'reqres-free-v1'  // Cabecera de autenticación
            },
            body: JSON.stringify(user)  // Envía los datos del usuario
        })
        .then((response) => {
            // Procesa la respuesta convirtiéndola a JSON
            return response.json().then(data => ({
                status: response.status,
                info: data
            }));
        })
        .then((result) => {
            // Muestra mensaje de éxito o error según el resultado
            if (result.status === 201) {
                document.getElementById('info').innerHTML = 
                    '<h3>Usuario guardado exitosamente</h3>';
            } else {
                document.getElementById('info').innerHTML = 
                    '<h3>No se encontró el usuario en la API</h3>';
            }

            // Cierra el modal después de guardar el usuario
            const modalID = document.getElementById('showModalUser');
            const modal = bootstrap.Modal.getInstance(modalID);
            modal.hide();
        })
        .catch((error) => {
            // Maneja errores en la petición
            console.error('Error al guardar el usuario:', error);
            document.getElementById('info').innerHTML = 
                '<h3>Error al guardar el usuario. Intenta nuevamente.</h3>';
        });
    } else {
        // Si el formulario no es válido, muestra un mensaje de error
        form.reportValidity();
    }
}
