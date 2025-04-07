<?php

return [
    'navigation' => [
        'menu' => 'Navigation Menu',
        'items' => [
            'dashboard' => 'Dashboard',
            'users' => 'Users',
            'floors' => 'Floors',
            'zones' => 'Zones',
            'bookshelves' => 'Bookshelves',
            'books' => 'Books',
            'repository' => 'Repository',
            'documentation' => 'Documentation',
        ],
    ],
    'user_menu' => [
        'settings' => 'Settings',
        'logout' => 'Log out',
    ],
    'auth' => [
        'failed' => 'These credentials do not match our records.',
        'throttle' => 'Too many login attempts. Please try again in :seconds seconds.',
    ],
    'settings' => [
        'title' => 'Settings',
        'description' => 'Manage your profile and account settings',
        'navigation' => [
            'profile' => 'Profile',
            'password' => 'Password',
            'appearance' => 'Appearance',
            'languages' => 'Languages',
        ],
        'profile' => [
            'title' => 'Profile settings',
            'information_title' => 'Profile information',
            'information_description' => 'Update your name and email address',
            'name_label' => 'Name',
            'name_placeholder' => 'Full name',
            'email_label' => 'Email address',
            'email_placeholder' => 'Email address',
            'unverified_email' => 'Your email address is unverified.',
            'resend_verification' => 'Click here to resend the verification email.',
            'verification_sent' => 'A new verification link has been sent to your email address.',
            'save_button' => 'Save',
            'saved_message' => 'Saved',
        ],
        'password' => [
            'title' => 'Password settings',
            'update_title' => 'Update password',
            'update_description' => 'Ensure your account is using a long, random password to stay secure',
            'current_password_label' => 'Current password',
            'current_password_placeholder' => 'Current password',
            'new_password_label' => 'New password',
            'new_password_placeholder' => 'New password',
            'confirm_password_label' => 'Confirm password',
            'confirm_password_placeholder' => 'Confirm password',
            'save_button' => 'Save password',
            'saved_message' => 'Saved',
            'secure_message' => 'Password must have at least 8 characters, including letters and numbers',
        ],
        'appearance' => [
            'title' => 'Appearance settings',
            'description' => 'Update your account\'s appearance settings',
            'modes' => [
                'light' => 'Light',
                'dark' => 'Dark',
                'system' => 'System'
            ]
        ],
        'languages' => [
            'title' => 'Language settings',
            'description' => 'Change your preferred language',
        ],
    ],
    'validation' => [
           'required' => 'The :attribute field is required.',
            'email' => 'The :attribute field must be a valid email address.',
            'min' => [
                'string' => 'The :attribute field must be at least :min characters.',
            ],
            'max' => [
                'string' => 'The :attribute field must not be greater than :max characters.',
            ],
            'unique' => 'The :attribute has already been taken.',
            'confirmed' => 'The :attribute confirmation does not match.',
    ],
    'common' => [
        'buttons' => [
            'cancel' => 'Cancel',
            'delete' => 'Delete',
            'close' => 'Close',
        ],
        'filters'=> [
            'title' => 'Filters',
            'clear' => 'Clear',
        ],
        'delete_dialog' => [
            'success' => 'User deleted successfully',
        ],
        'showing_results' => 'Showing :from to :to of :total results',
        'pagination' => [
            'previous' => 'Previous',
            'next' => 'Next',
            'first' => 'First',
            'last' => 'Last',
        ],
        'per_page' => 'Per page',
        'no_results' => 'No results',
    ],
    'users' => [
        'title' => 'Users',
        'create' => 'Create User',
        'edit' => 'Edit User',
        'description' => 'Manage users in the system',
        'fields' => [
            'name' => 'Name',
            'email' => 'Email',
            'password' => 'Password',
            'password_optional' => 'Password (optional)',
            'created_at' => 'Created at',
            'actions' => 'Actions',
            'rol' => 'Select a role',
            'role' => 'Main Role',
            'sp_permissions' => 'Specific Permissions',
        ],
        'tabs' => [
            'basic_information' => 'Basic information',
            'roles' => 'Roles and permissions',
        ],
        'extra_info' => [
            'create' => 'Complete the fields below to create a new user',
            'role' => 'The role determines the level of access of the user',
        ],
        'roles' =>[ 
            'admin' => 'Administrator',
            'employee' => 'Employee',
            'student' => 'Student',
            'view' => 'Only View'
        ],
        'permissions'=>[
            'users' => [
                'title' => 'Users',
                'view' => 'View users',
                'create' => 'Create users',
                'edit' => 'Edit users',
                'delete' => 'Delete users',
            ],
            'products' => [
                'title' => 'Products',
                'view' => 'View products',
                'create' => 'Create products',
                'edit' => 'Edit products',
                'delete' => 'Delete products',
            ],
            'reports' => [
                'title' => 'Reports',
                'view' => 'View reports',
                'export' => 'Export reports',
                'print' => 'Print reports'
            ],
            'settings' => [
                'title' => 'Settings',
                'access' => 'Access to settings ',
                'modify' => 'Modify settings'
            ]
        ],
        'columns' => [
            'name' => 'Name',
            'email' => 'Email',
            'created_at' => 'Created at',
            'actions' => 'Actions',
        ],
        'filters' => [
            'search' => 'Search',
            'name' => 'User name',
            'email' => 'User email',
        ],
        'placeholders' => [
            'name' => 'User full name',
            'email' => 'mail@example.com',
            'password' => 'Strong password',
        ],
        'buttons' => [
            'new' => 'New User',
            'edit' => 'Edit',
            'save' => 'Save',
            'update' => 'Update',
            'cancel' => 'Cancel',
            'delete' => 'Delete',
            'deleting' => 'Deleting...',
            'saving' => 'Saving...',
            'retry' => 'Retry',
        ],
        'delete' => [
            'title' => 'Are you sure?',
            'description' => 'This action cannot be undone. The user will be permanently deleted from the system.',
        ],
        'delete_dialog' => [
            'title' => 'Are you sure?',
            'description' => 'This action cannot be undone. The user will be permanently deleted from the system.',
            'success' => 'Successfully deleted ;)',
        ],
        'deleted_error' => 'Error deleting user',
        'no_results' => 'No results.',
        'error_loading' => 'Error loading users. Please try again.',
        'showing_results' => 'Showing :from to :to of :total results',
        'pagination' => [
            'previous' => 'Previous',
            'next' => 'Next',
        ],
    ],
    'floors' => [
        'title' => 'Floors',
        'create' => 'Create Floor',
        'edit' => 'Edit Floor',
        'description' => 'Manage floors in the system',
        'buttons' =>[
            'new' => 'Create Floor'
        ],
        'titles' => [
            'floor' => 'Floor' ,
        ],
        'extra_info'=>[
            'create' => 'Fill the fields to make a new floor',
            'edit' => 'Fill the fields to edit this floor'
        ],
        'fields' =>[
            'name' => 'Floor name',
            'max_zones' => 'Zone capacity',
        ],
        'columns' => [
            'max_zones' => 'Max Zones',
        ],
        'placeholders' => [
            'name' => 'Floor name...',
            'max_zones' => 'Zone capacity...',
        ],
        'filters' => [
            'name' => 'Floor name',
            'max_zones' => 'Zone capacity', 
        ],
        'deleted_error' => 'Error deleting floor',
        'error_loading' => 'Error loading floors. Please try again.'
    ],
    'zones' => [
        'title' => 'Zones',
        'create' => 'Create Zone',
        'edit' => 'Edit Zone',
        'description' => 'Manage zones in the system',
        'buttons' =>[
            'new' => 'Create Zone'
        ],
        'extra_info' =>[
            'create' => 'Fill the fields to create a new zone',
            'edit' => 'Update the fields to edit this zone ',
        ],
        'columns' => [
            'name' => 'Zone name',
            'number' => 'Zone number',
            'max_bookshelves' => 'Bookshelves capacity',
            'floor_id' => 'Floor ubication',
        ],
        'fields' =>[
            'name' => 'Zone name',
            'number' => 'Zone number',
            'floor_id' => 'Floor ubication',
            'max_bookshelves' => 'Bookshelves capacity',
        ],
        'placeholders' => [
            'name' => 'Zone name...',
            'number' => 'Zone number...',
            'max_bookshelves' => 'Bookshelves capacity...',
            'floor_id' => 'Floor ubication...',
        ],
        'filters' => [
            'number' => 'Zone number',
            'name' => 'Zone name',
            'max_bookshelves' => 'Bookshelves capacity...',
            'floor_id' => 'Floor ubication',
        ],
        'deleted_error' => 'Error deleting zone',
        'error_loading' => 'Error loading zones. Please try again.',
    ],
    'bookshelves' => [
        'title' => 'Bookshelves',
        'create' => 'Create Bookshelf',
        'edit' => 'Edit Bookshelf',
        'description' => 'Manage bookshelves in the system',
        'buttons' =>[
            'new' => 'Create Bookshelf'
        ],
        'extra_info' =>[
            'create' => 'Fill the fields to create a new bookshelf',
            'edit' => 'Update the fields to edit this bookshelf'
        ],
        'columns' => [
            'number' => 'Bookshelf number',
            'max_books' => 'Books capacity',
            'zone_id' => 'Zone ubication',
            'zone_name'=> 'Zone genre',
            'floor_id' => 'Floor ubication',
        ],
        'fields' => [
            'number' => 'Bookshelf number',
            'floor_id' => 'Floor ubication',
            'zone_id' => 'Zone ubication',
            'zone_name'=> 'Zone genre',
            'max_books' => 'Books capacity'
        ],
        'placeholders' => [
            'number' => 'Bookshelf number...',
            'max_books' => 'Books capacity...',
            'floor_id'=> 'Floor ubication...',
            'zone_id' => 'Zone ubication...',
            'zone_name'=> 'Zone genre...',
        ],
        'filters' => [
            'number' => 'Bookshelf number',
            'max_books' => 'Books capacity',
            'floor_id'=> 'Floor ubication',
            'zone_id' => 'Zone ubication',
            'zone_name'=> 'Zone genre',

        ],
        'deleted_error' => 'Error deleting bookshelf',
        'error_loading' => 'Error loading bookshelves. Please try again.',
    ],
    'books' => [
        'title' => 'Books',
        'create' => 'Create Book',
        'edit' => 'Edit Book',
        'description' => 'Manage books in the system',
        'buttons' =>[
            'new' => 'Create Book'
        ],
        'extra_info'=>[
            'create' => 'Fill the fields to create a new book',
            'edit' => 'Update the fields to edit this book'
        ],
        'columns' => [
            'name' => 'Title',
            'author' => 'Author',
            'publisher' => 'Publisher',
            'num_pages' => 'Number of pages',
            'genres' => 'Genres',
            'bookshelf_id' => 'Bookshelf number',
            'zone_id' => 'Zone ubication',
            'zone_name'=> 'Zone genre',
            'floor_id' => 'Floor ubication',
        ],
        'fields' => [
            'name' => 'Title',
            'author' => 'Author',
            'publisher' => 'Publisher',
            'num_pages' => 'Number of pages',
            'genres' => 'Genres',
            'bookshelf_id' => 'Bookshelf number',
            'zone_id' => 'Zone ubication',
            'zone_name'=> 'Zone genre',
            'floor_id' => 'Floor ubication',
        ],
        'placeholders' => [
            'search' => 'Search book...',
            'name' => 'Book title...',
            'author' => 'Author...',
            'publisher' => 'Publisher...',
            'num_pages' => 'Number of pages...',
            'genres' => 'Genres...',
            'bookshelf_id' => 'Bookshelf number...',
            'zone_id' => 'Zone ubication...',
            'zone_name'=> 'Zone genre...',
            'floor_id' => 'Floor ubication...',
        ],
        'filters' => [
            'search' => 'Search',
            'name' => 'Book title',
            'author' => 'Author',
            'publisher' => 'Publisher',
            'num_pages' => 'Number of pages',
            'genres' => 'Genres',
            'bookshelf_id' => 'Bookshelf number',
            'zone_id' => 'Zone ubication',
            'zone_name'=> 'Zone genre',
            'floor_id' => 'Floor ubication',
        ],
        'deleted_error' => 'Error deleting book',
        'error_loading' => 'Error loading books. Please, try again.',
    ],
    'genres' =>[
        'names' => [
            'Fantasy' => 'Fantasy',
            'Romantic' => 'Romantic',
            'Manga' => 'Manga',
            'Maths' => 'Maths',
            'Biology' => 'Biology',
            'Computer Science' => 'Computer Science',
            'Programming' => 'Programming',
            'Algebra' => 'Algebra',
            'Sports' => 'Sports',
            'Mistery' => 'Mistery',
            'Horror' => 'Horror',
            'Thriller' => 'Thriller',
            'Philosophy' => 'Philosophy',
            'Robotics' => 'Robotics',
        ],
    ],
];
