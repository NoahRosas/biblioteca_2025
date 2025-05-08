<?php


return [
    'navigation' => [
        'menu' => 'Menú de Navegación',
        'items' => [
            'dashboard' => 'Panel',
            'users' => 'Usuarios',
            'floors' => 'Plantas',
            'zones' => 'Zonas',
            'bookshelves' => 'Estanterías',
            'books' => 'Libros',
            'loans' => 'Préstamos',
            'reservations' => 'Reservas',
            'graphs' => 'Estadísticas',
            'repository' => 'Repositorio',
            'documentation' => 'Documentación',
        ],
    ],
    'user_menu' => [
        'settings' => 'Configuración',
        'logout' => 'Cerrar sesión',
    ],
    'auth' => [
        'failed' => 'Estas credenciales no coinciden con nuestros registros.',
        'throttle' => 'Demasiados intentos de inicio de sesión. Por favor, inténtalo de nuevo en :seconds segundos.',
    ],
    'settings' => [
        'title' => 'Configuración',
        'description' => 'Gestiona tu perfil y configuración de cuenta',
        'navigation' => [
            'profile' => 'Perfil',
            'password' => 'Contraseña',
            'appearance' => 'Apariencia',
            'languages' => 'Idiomas',
        ],
        'profile' => [
            'title' => 'Configuración del perfil',
            'information_title' => 'Información del perfil',
            'information_description' => 'Actualiza tu nombre y dirección de correo electrónico',
            'name_label' => 'Nombre',
            'name_placeholder' => 'Nombre completo',
            'email_label' => 'Dirección de correo',
            'email_placeholder' => 'Dirección de correo',
            'unverified_email' => 'Tu dirección de correo no está verificada.',
            'resend_verification' => 'Haz clic aquí para reenviar el correo de verificación.',
            'verification_sent' => 'Se ha enviado un nuevo enlace de verificación a tu dirección de correo.',
            'save_button' => 'Guardar',
            'saved_message' => 'Guardado',
            'history' => 'Historial de actividad',
            'history_description' => 'Aquí podrás ver tu historial de actividad',
        ],
        'password' => [
            'title' => 'Configuración de contraseña',
            'update_title' => 'Actualizar contraseña',
            'update_description' => 'Asegúrate de que tu cuenta utilice una contraseña larga y aleatoria para mantenerse segura',
            'current_password_label' => 'Contraseña actual',
            'current_password_placeholder' => 'Contraseña actual',
            'new_password_label' => 'Nueva contraseña',
            'new_password_placeholder' => 'Nueva contraseña',
            'confirm_password_label' => 'Confirmar contraseña',
            'confirm_password_placeholder' => 'Confirmar contraseña',
            'save_button' => 'Guardar contraseña',
            'saved_message' => 'Guardado',
            'secure_message' => 'La contraseña debe tener al menos 8 caracteres, incluyendo letras y números',
        ],
        'appearance' => [
            'title' => 'Configuración de apariencia',
            'description' => 'Actualiza la configuración de apariencia de tu cuenta',
            'modes' => [
                'light' => 'Claro',
                'dark' => 'Oscuro',
                'system' => 'Sistema'
            ]
        ],
        'languages' => [
            'title' => 'Configuración de idioma',
            'description' => 'Cambia tu idioma preferido',
        ],
    ],
    'validation' => [
        'distinct' => 'El campo :attribute tiene un valor duplicado.',
        'required' => 'El campo :attribute es obligatorio.',
        'email' => 'El campo :attribute debe ser una dirección de correo válida.',
        'min' => [
            'string' => 'El campo :attribute debe tener al menos :min caracteres.',
        ],
        'max' => [
            'string' => 'El campo :attribute no debe tener más de :max caracteres.',
        ],
        'unique' => 'El campo :attribute ya ha sido tomado.',
        'confirmed' => 'El campo :attribute no coincide.',
    ],
    'common' => [
        'buttons' => [
            'cancel' => 'Cancelar',
            'delete' => 'Eliminar',
            'close' => 'Cerrar',
        ],
        'filters' => [
            'title' => 'Filtros',
            'clear' => 'Limpiar',
            'results' => ':attribute resultados encontrados'
        ],
        'delete_dialog' => [
            'success' => 'Usuario eliminado correctamente',
        ],
        'showing_results' => 'Mostrando :from a :to de :total resultados',
        'pagination' => [
            'previous' => 'Anterior',
            'next' => 'Siguiente',
            'first' => 'Primero',
            'last' => 'Último',
        ],
        'per_page' => 'Por página',
        'no_results' => 'No hay resultados',
    ],
    'users' => [
        'title' => 'Usuarios',
        'create' => 'Crear Usuario',
        'edit' => 'Editar Usuario',
        'history' => [
            'title' => 'Historial de usuario',
            'no_results' => 'Nada por aquí, ve a leer algún libro o algo',
        ],
        'description' => 'Gestiona los usuarios del sistema',
        'fields' => [
            'name' => 'Nombre',
            'email' => 'Email',
            'password' => 'Contraseña',
            'password_optional' => 'Contraseña (opcional)',
            'created_at' => 'Fecha de creación',
            'actions' => 'Acciones',
            'rol' => 'Selecciona un rol',
            'role' => 'Rol principal',
            'sp_permissions' => 'Permisos Específicos',
        ],
        'tabs' => [
            'basic_information' => 'Información básica',
            'roles' => 'Roles y permisos',
        ],
        'extra_info' => [
            'create_user' => 'Ingresa la información para crear un nuevo usuario en el sistema',
            'role' => 'El rol determina el nivel del acceso del usuario',
        ],
        'roles' => [
            'admin' => 'Administrador',
            'employee' => 'Empleado',
            'student' => 'Estudiante',
            'view' => 'Solo vista'
        ],
        'permissions' => [
            'users' => [
                'title' => 'Usuarios',
                'view' => 'Ver usuarios',
                'create' => 'Crear usuarios',
                'edit' => 'Editar usuarios',
                'delete' => 'Eliminar usuarios',
            ],
            'products' => [
                'title' => 'Productos',
                'view' => 'Ver productos',
                'create' => 'Crear productos',
                'edit' => 'Editar productos',
                'delete' => 'Eliminar productos',
            ],
            'reports' => [
                'title' => 'Reportes',
                'view' => 'Ver reportes',
                'export' => 'Exportar reportes',
                'print' => 'Imprimir reportes'
            ],
            'settings' => [
                'title' => 'Configuración',
                'access' => 'Acceso a configuración',
                'modify' => 'Modificar configuración'
            ]
        ],
        'columns' => [
            'name' => 'Nombre',
            'email' => 'Email',
            'created_at' => 'Fecha de creación',
            'actions' => 'Acciones',
        ],
        'filters' => [
            'search' => 'Buscar',
            'name' => 'Nombre del usuario',
            'email' => 'Email del usuario',
            'created_at' => 'Fecha de creación',
        ],
        'placeholders' => [
            'name' => 'Nombre completo del usuario',
            'email' => 'correo@ejemplo.com',
            'password' => 'Contraseña segura',
        ],
        'buttons' => [
            'new' => 'Nuevo Usuario',
            'edit' => 'Editar',
            'activity' => 'Historial de actividad',
            'save' => 'Guardar',
            'update' => 'Actualizar',
            'cancel' => 'Cancelar',
            'delete' => 'Eliminar',
            'deleting' => 'Eliminando...',
            'saving' => 'Guardando...',
            'retry' => 'Reintentar',
        ],
        'delete' => [
            'title' => '¿Estás seguro?',
            'description' => 'Esta acción no se puede deshacer. Se eliminará permanentemente el usuario del sistema.',
        ],
        'delete_dialog' => [
            'title' => '¿Estás seguro?',
            'description' => 'Esta acción no se puede deshacer. Se eliminará permanentemente el usuario del sistema.',
            'success' => 'Eliminado correctamente ;)',
        ],
        'deleted_error' => 'Error al eliminar el usuario',
        'no_results' => 'No hay resultados.',
        'error_loading' => 'Error al cargar los usuarios. Por favor, inténtalo de nuevo.',
        'showing_results' => 'Mostrando :from a :to de :total resultados',
        'pagination' => [
            'previous' => 'Anterior',
            'next' => 'Siguiente',
        ],
    ],
    'floors' => [
        'title' => 'Plantas',
        'create' => 'Crear Planta',
        'edit' => 'Editar Planta',
        'description' => 'Gestiona las plantas del sistema',
        'buttons' => [
            'new' => 'Crear Planta'
        ],
        'extra_info' => [
            'create_floor' => 'Introduce la información para crear una nueva planta',
            'edit_floor' => 'Introduce los datos para editar esta zona',
        ],
        'titles' => [
            'floor' => 'Planta',
        ],
        'fields' => [
            'name' => 'Nombre de la planta',
            'max_zones' => 'Máximo número de zonas',
        ],
        'columns' => [
            'max_zones' => 'Máximo número de zonas',
        ],
        'placeholders' => [
            'name' => 'Nombre de la planta...',
            'max_zones' => 'Máximo número de zonas...',
            'created_at' => 'Fecha de creación...'
        ],
        'filters' => [
            'name' => 'Nombre de la planta',
            'max_zones' => 'Máximo número de zonas',
            'created_at' => 'Fecha de creación',
        ],
        'error_loading' => 'Error al cargar las plantas. Inténtalo de nuevo.',
        'deleted_error' => 'Error al eliminar la planta',
        'no_results' => 'No hay resultados.',
    ],
    'zones' => [
        'title' => 'Zonas',
        'create' => 'Crear zona',
        'edit' => 'Editar zona',
        'description' => 'Gestiona las zonas del sistema',
        'buttons' => [
            'new' => 'Crear Zona'
        ],
        'extra_info' => [
            'create' => 'Introduce los datos para crear una nueva zona',
            'edit' => 'Introduce los datos para editar esta zona',
        ],
        'columns' => [
            'name' => 'Nombre de la zona',
            'number' => 'Número de la zona',
            'max_bookshelves' => 'Capacidad de estanterías',
            'floor_id' => 'Planta'
        ],
        'fields' => [
            'name' => 'Nombre de la zona',
            'number' => 'Número de la zona',
            'floor_id' => 'Planta',
            'max_bookshelves' => 'Capacidad de estanterías',
        ],
        'placeholders' => [
            'name' => 'Nombre de la zona...',
            'number' => 'Número de la zona...',
            'max_bookshelves' => 'Capacidad de estanterías...',
            'floor_id' => 'Planta...',
            'created_at' => 'Fecha de creación...'
        ],
        'filters' => [
            'name' => 'Nombre de la zona',
            'number' => 'Número de la zona',
            'max_bookshelves' => 'Capacidad de estanterías',
            'floor_id' => 'Planta',
            'created_at' => 'Fecha de creación'
        ],
        'error_loading' => 'Error al cargar las zonas. Inténtalo de nuevo.',
        'deleted_error' => 'Error al eliminar la zona',
        'no_results' => 'No hay resultados.',
    ],
    'bookshelves' => [
        'title' => 'Estanterías',
        'create' => 'Crear estantería',
        'edit' => 'Editar estantería',
        'description' => 'Gestiona las estanterías del sistema',
        'buttons' => [
            'new' => 'Crear Estantería'
        ],
        'extra_info' => [
            'create' => 'Completa el formulario para crear una nueva estantería',
            'edit' => 'Introduce los datos para editar esta estantería',
        ],
        'columns' => [
            'number' => 'Número de estantería',
            'max_books' => 'Capacidad de libros',
            'zone_name' => 'Género de la zona',
            'zone_id' => 'Zona',
            'floor_id' => 'Planta',
        ],
        'fields' => [
            'number' => 'Número de estantería',
            'floor_id' => 'Planta',
            'zone_id' => 'Zona',
            'zone_name' => 'Género de la zona',
            'max_books' => 'Capacidad de libros'
        ],
        'placeholders' => [
            'number' => 'Número de estantería...',
            'floor_id' => 'Planta...',
            'zone_id' => 'Zona...',
            'zone_name' => 'Género de la zona...',
            'max_books' => 'Capacidad de libros...',
            'created_at' => 'Fecha de creación...',
        ],
        'filters' => [
            'number' => 'Número de estantería',
            'floor_id' => 'Planta',
            'zone_id' => 'Zona',
            'zone_name' => 'Género de la zona',
            'max_books' => 'Capacidad de libros',
            'created_at' => 'Fecha de creación',
        ],
        'error_loading' => 'Error al cargar las zonas. Inténtalo de nuevo.',
        'deleted_error' => 'Error al eliminar la estantería',
        'no_results' => 'No hay resultados.',
    ],
    'books' => [
        'title' => 'Libros',
        'create' => 'Crear libro',
        'edit' => 'Editar libro',
        'description' => 'Gestiona los libros del sistema',

        'buttons' => [
            'new' => 'Crear Libro',
            'delete' => 'Eliminar',
        ],
        'extra_info' => [
            'create' => 'Completa el formulario para crear un nuevo libro',
            'edit' => 'Introduce los datos para editar este libro',
        ],
        'columns' => [
            'name' => 'Título del libro',
            'author' => 'Autor/a',
            'ISBN' => 'ISBN',
            'publisher' => 'Editorial',
            'num_pages' => 'Número de páginas',
            'genres' => 'Géneros',
            'bookshelf_id' => 'Número de estantería',
            'zone_id' => 'Zona',
            'zone_name' => 'Género zona',
            'floor_id' => 'Planta',
            'is_available' => 'Disponible',
            'available' => 'Copias prestadas:'
        ],
        'fields' => [
            'name' => 'Título del libro',
            'author' => 'Autor/a',
            'ISBN' => 'ISBN',
            'publisher' => 'Editorial',
            'num_pages' => 'Número de páginas',
            'genres' => 'Géneros',
            'bookshelf_id' => 'Número de estantería',
            'zone_id' => 'Zona',
            'floor_id' => 'Planta',
            'image' => 'Imagen de portada',
        ],
        'placeholders' => [
            'name' => 'Nombre del libro...',
            'ISBN' => 'ISBN...',
            'author' => 'Autor/a...',
            'publisher' => 'Editorial...',
            'num_pages' => 'Número de páginas...',
            'genres' => 'Géneros...',
            'bookshelf_id' => 'Número de estantería...',
            'zone_id' => 'Zona...',
            'zone_name' => 'Género zona...',
            'floor_id' => 'Planta...',
            'is_available' => 'Disponible...',
            'created_at' => 'Fecha de creación...',
        ],
        'filters' => [
            'name' => 'Nombre del libro',
            'author' => 'Autor/a',
            'ISBN' => 'ISBN',
            'publisher' => 'Editorial',
            'num_pages' => 'Número de páginas',
            'genres' => 'Géneros',
            'bookshelf_id' => 'Número de estantería',
            'zone_id' => 'Zona',
            'floor_id' => 'Planta',
            'is_available' => 'Disponible',
            'created_at' => 'Fecha de creación',
        ],
        'error_loading' => 'Error al cargar los libros. Inténtalo de nuevo.',
        'deleted_error' => 'Error al eliminar el libro',
        'availability' => [
            'false' => 'Disponible',
            'true' => 'No disponible'
        ],
        'no_results' => 'No hay resultados.',
        'by' => 'escrito por',
    ],
    'genres' => [
        'names' => [
            'Fantasy' => 'Fantasía',
            'Romantic' => 'Romántica',
            'Manga' => 'Manga',
            'Maths' => 'Matemáticas',
            'Biology' => 'Biología',
            'Computer Science' => 'Informática',
            'Programming' => 'Programación',
            'Algebra' => 'Álgebra',
            'Sports' => 'Deportes',
            'Mistery' => 'Misterio',
            'Horror' => 'Miedo',
            'Thriller' => 'Thriller',
            'Philosophy' => 'Filosofía',
            'Robotics' => 'Robótica',
        ],
        'search'=>'Buscar género...',
        'select_all' => 'Todos los géneros',
    ],

    'loans' => [
        'title' => 'Préstamos',
        'title_s' => 'Préstamo',
        'create' => 'Crear préstamo',
        'edit' => 'Editar préstamo',
        'description' => 'Gestiona los préstamo del sistema',
        'buttons' => [
            'new' => 'Crear Préstamo',
            'return' => [
                'true' => 'Devolver libro',
                'false' => 'Cancelar'
            ],
            'create' => 'Prestar libro',
            'edit' => 'Cambiar fecha de vencimiento',
        ],
        'extra_info' => [
            'create' => 'Completa el formulario para crear un nuevo préstamo',
            'edit' => 'Introduce los datos para editar este préstamo',
        ],
        'columns' => [
            'user_email' => 'Usuario',
            'book_name' => 'Título del libro',
            'book_ISBN' => 'ISBN',
            'created_at' => 'Fecha de expedición',
            'end_loan' => 'Fecha de vencimiento',
            'return_date' => 'Fecha de devolución',
            'borrowed' => 'Prestado actualmente',
            'is_overdue' => 'Con retraso',
        ],
        'fields' => [
            'user_email' => 'Email de usuario',
            'book_id' => 'Id del libro',
            'book_ISBN' => 'ISBN',
            'created_at' => 'Fecha expedición',
            'end_loan' => 'Fecha vencimiento',
            'borrowed' => 'Prestado actualmente',
            'is_overdue' => 'Con retraso',
        ],
        'placeholders' => [
            'user_email' => 'Email de usuario...',
            'book_id' => 'Id del libro...',
            'book_name' => 'Título del libro...',
            'ISBN' => 'ISBN...',
            'created_at' => 'Fecha expedición...',
            'end_loan' => 'Fecha vencimiento...',
            'borrowed' => 'Prestado actualmente...',
            'is_overdue' => 'Con retraso...',
            'pick_date' => 'Elige una fecha'
        ],
        'filters' => [
            'user_email' => 'Email de usuario',
            'book_name' => 'Título del libro',
            'book_ISBN' => 'ISBN',
            'created_at' => 'Fecha expedición',
            'end_loan' => 'Fecha vencimiento',
            'borrowed' => 'Prestado actualmente',
            'is_overdue' => 'Con retraso',
        ],
        'error_loading' => 'Error al cargar los préstamo. Inténtalo de nuevo.',
        'deleted_error' => 'Error al eliminar el préstamo',
        'date' => 'Escoge una fecha de entrega',
        'borrowed' => [
            'true' => 'Prestado',
            'false' => 'Devuelto',
        ],
        'return' => [
            'title' => '¿Quieres devolver este libro?',
            'description' => 'Si devuelves el libro, tendrás que hacer un nuevo préstamo si lo quieres volver a tener.',
            'end_loan' => 'La fecha para que se agote el préstamo es: ',
        ],

        'response' => [
            'true' => 'Sí',
            'false' => 'No',
            'return' => 'Devuelto el: ',
        ],
        'overdue' => [
            'one' => 'Día de retraso: ',
            'more' => 'Días de retraso: ',
            'false' => 'A tiempo',
            'true' => 'Con retraso',
        ],
        'no_results' => 'No hay resultados.',
    ],
    'reservations' => [
        'title' => 'Reservas',
        'create' => 'Crear Reserva',
        'edit' => 'Editar reserva',
        'description' => 'Gestiona las reservas del sistema',

        'buttons' => [
            'new' => 'Crear Reserva',
            'edit' => 'Editar Reserva',
            'create' => 'Reservar libro',
            'delete' => 'Eliminar reserva',
        ],
        'extra_info' => [
            'create' => 'Completa el formulario para crear una nueva reserva',
            'edit' => 'Introduce los datos para editar esta reserva',
        ],
        'columns' => [
            'user_email' => 'Usuario',
            'book_name' => 'Título del libro',
            'book_ISBN' => 'ISBN',
            'created_at' => 'Fecha expedición',

        ],
        'fields' => [
            'user_email' => 'Email de usuario',
            'book_id' => 'Id del libro',
            'book_ISBN' => 'ISBN',
            'created_at' => 'Fecha expedición',

        ],
        'placeholders' => [
            'user_email' => 'Email de usuario...',
            'book_id' => 'Id del libro...',
            'book_name' => 'Título del libro...',
            'ISBN' => 'ISBN...',
            'created_at' => 'Fecha de expedición...',

        ],
        'filters' => [
            'user_email' => 'Email de usuario',
            'book_name' => 'Título del libro',
            'book_ISBN' => 'ISBN',
            'created_at' => 'Fecha expedición',

        ],
        'error_loading' => 'Error al cargar las reservas. Inténtalo de nuevo.',
        'deleted_error' => 'Error al eliminar la reserva',
        'no_results' => 'No hay resultados.',

    ],
    'graphs' => [
        'title' => 'Estadísticas',
        'description' => 'Mira las estadísticas de la aplicación',
        'section' => [
            'books' => 'Libros más leídos',
            'users' => 'Usuarios más activos',
            'zones' => 'Zonas con más actividad',
        ],
    ],
];
