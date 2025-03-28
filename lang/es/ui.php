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
        'filters'=> [
            'title' => 'Filtros',
            'clear' => 'Limpiar',
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
        'permissions'=>[
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
        ],
        'placeholders' => [
            'name' => 'Nombre completo del usuario',
            'email' => 'correo@ejemplo.com',
            'password' => 'Contraseña segura',
            'search' => 'Buscar usuarios...',
        ],
        'buttons' => [
            'new' => 'Nuevo Usuario',
            'edit' => 'Editar',
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
        'buttons' =>[
            'new' => 'Crear Planta'
        ],
        'extra_info'=>[
            'create_floor' => 'Introduce la información para crear una nueva planta',
        ],
        'titles' => [
            '1st Floor' => 'Primera Planta' ,
            '2nd Floor' => 'Segunda Planta' ,
            '3rd Floor' => 'Tercera Planta' ,
        ],
        'fields' =>[
            'name' => 'Nombre de la planta',
            'max_zones' => 'Máximo número de zonas',
        ],
        'columns' => [
            'max_zones' => 'Máximo de zonas',
        ],
        'placeholders' => [
            'name' => 'Nombre de la planta',
            'search' => 'Buscar planta...',
        ],
        'filters' => [
            'search' => 'Buscar',
            'name' => 'Nombre de la planta',
        ],
        'error_loading' => 'Error al cargar las plantas. Inténtalo de nuevo.'
    ],
    'zones' => [
        'title' => 'Zonas',
        'create' => 'Crear zona',
        'edit' => 'Editar zona',
        'buttons' =>[
            'new' => 'Crear Zona'
        ],
        'columns' => [
            'name' => 'Nombre de la zona',
            'max_bookshelves' => 'Capacidad de estanterías',
            'floor_name' => 'Planta en la que está ubicada'
        ],
        'placeholders' => [
            'name' => 'Nombre de la zona',
            'search' => 'Buscar zonas...',
        ],
        'filters' => [
            'search' => 'Buscar',
            'name' => 'Nombre de la zona',
        ],
        'error_loading' => 'Error al cargar las zonas. Inténtalo de nuevo.',
    ],
    'bookshelves' => [
        'title' => 'Estanterías',
        'create' => 'Crear estantería',
        'edit' => 'Editar estantería',
        'buttons' =>[
            'new' => 'Crear Estantería'
        ],
        'columns' => [
            'number' => 'Número de estantería',
            'max_books' => 'Capacidad de libros',
            'zone_name' => 'Zona en la que está ubicada',
            'floor_name' => 'Planta en la que está ubicada',
        ],
        'placeholders' => [
            'number' => 'Número de estantería...',
            'search' => 'Buscar estantería...',
        ],
        'filters' => [
            'search' => 'Buscar',
            'number' => 'Número de estantería',
        ],
        'error_loading' => 'Error al cargar las zonas. Inténtalo de nuevo.',
    ],
    'books' => [
        'title' => 'Libros',
        'create' => 'Crear libro',
        'edit' => 'Editar libro',
        'buttons' =>[
            'new' => 'Crear Libro'
        ],
        'columns' => [
            'name' => 'Título del libro',
            'author' => 'Autor/a',
            'publisher' => 'Editorial',
            'num_pages' => 'Número de páginas',
            'genres' => 'Géneros',
            'bookshelf_number' => 'Número de estantería en la que está',
            'zone_name' => 'Zona en la que está ubicada',
            'floor_name' => 'Planta en la que está ubicada',
        ],
        'placeholders' => [
            'search' => 'Buscar libro...',
            'name' => 'Nombre del libro...',
            'author' => 'Autor/a...',
            'publisher' => 'Editorial...',
            'num_pages' => 'Número de páginas...',
            'genres' => 'Géneros...',
            'bookshelf_number' => 'Número de estantería en la que está...',
            'zone_name' => 'Zona en la que está ubicada...',
            'floor_name' => 'Planta en la que está ubicada...',
        ],
        'filters' => [
            'search' => 'Buscar',
            'name' => 'Nombre del libro',
            'author' => 'Autor/a',
            'publisher' => 'Editorial',
            'num_pages' => 'Número de páginas',
            'genres' => 'Géneros',
            'bookshelf_number' => 'Número de estantería en la que está',
            'zone_name' => 'Zona en la que está ubicada',
            'floor_name' => 'Planta en la que está ubicada',
        ],
        'error_loading' => 'Error al cargar los libros. Inténtalo de nuevo.',
    ],
];
