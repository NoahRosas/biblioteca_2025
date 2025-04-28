import {
    createActionsColumn,
    createDateColumn,
    createTextColumn,
    DeleteDialog,
    FilterConfig,
    FiltersTable,
    Table,
    TableSkeleton,
} from '@/components/stack-table';
import { Button } from '@/components/ui/button';
import { Book, useBooks, useDeleteBook } from '@/hooks/books/useBooks';
import { Genre } from '@/hooks/genres/useGenres';
import { useTranslations } from '@/hooks/use-translations';
import { BookLayout } from '@/layouts/books/BookLayout';
import { PageProps } from '@/types';
import { Link, router, usePage } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { Handshake, PencilIcon, PlusIcon, ScrollText, TrashIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';

interface IndexBooksProps extends PageProps{
    lang: string;
    genres: Genre[];
}

export default function BooksIndex({lang, genres}:IndexBooksProps) {
    const { t } = useTranslations();
    const { url } = usePage();

    // Obtener los parámetros de la URL actual
    const urlParams = new URLSearchParams(url.split('?')[1] || '');
    const pageParam = urlParams.get('page');
    const perPageParam = urlParams.get('per_page');

    // Inicializar el estado con los valores de la URL o los valores predeterminados
    const [currentPage, setCurrentPage] = useState(pageParam ? parseInt(pageParam) : 1);
    const [perPage, setPerPage] = useState(perPageParam ? parseInt(perPageParam) : 10);
    const [filters, setFilters] = useState<Record<string, any>>({});
    
    // Combine name and email filters into a single search string if they exist
    const combinedSearch = [
        filters.name ? filters.name : 'null',
        filters.ISBN ? filters.ISBN : 'null',
        filters.author ? filters.author : 'null',
        filters.publisher ? filters.publisher : 'null',
        filters.num_pages ? filters.num_pages : 'null',
        filters.genres ? filters.genres : 'null',
        filters.bookshelf_id ? filters.bookshelf_id : 'null',
        filters.zone_id ? filters.zone_id : 'null',
        filters.zone_name ? filters.zone_name : 'null',
        filters.floor_id ? filters.floor_id : 'null',
        filters.is_available ? filters.is_available : 'null',
        filters.created_at ? filters.created_at : 'null'
    ];

    const {
        data: books,
        isLoading,
        isError,
        refetch,
    } = useBooks({
        search: combinedSearch,
        page: currentPage,
        perPage: perPage,
    });
    const deleteBookMutation = useDeleteBook();

    const handleFilterChange = (newFilters: Record<string, any>) => {
        const filtersChanged = newFilters!==filters;

        if (filtersChanged) {
            setCurrentPage(1);
        }
        setFilters(newFilters);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handlePerPageChange = (newPerPage: number) => {
        setPerPage(newPerPage);
        setCurrentPage(1); // Reset to first page when changing items per page
    };

    const handleDeleteBook = async (id: string) => {
        try {
            await deleteBookMutation.mutateAsync(id);
            refetch();
        } catch (error) {
            toast.error(t('ui.users.deleted_error') || 'Error deleting user');
            console.error('Error deleting user:', error);
        }
    };

    function handleLoan(book_id : string, book_available: boolean){
        if (!book_available) {
            return router.get('/reservations/create', {book_id});
        }else{
            return router.get('/loans/create', {book_id});
        }
    }

    const genreOptions = genres.map((genre: Genre) => ({
        label: t(`ui.genres.names.${genre.value}`),
        value: genre.value,
    })).sort((a, b) => a.label.localeCompare(b.label));

    const columns = useMemo(
        () =>
            [
                createTextColumn<Book>({
                    id: 'name',
                    header: t('ui.books.columns.name') || 'Name',
                    accessorKey: 'name',
                }),
                createActionsColumn<Book>({
                    id: 'ISBN_count',
                    header: t('ui.books.columns.ISBN') || 'Name',
                    renderActions: ($book) =>{
                        let $isbn = $book.ISBN;
                        let $isbn_loan_count = $book.ISBN_loan_count;
                        let $isbn_count = $book.ISBN_count;
                        return(
                            <span>{$isbn} {t('ui.books.columns.available')} {$isbn_loan_count}/{$isbn_count}</span>
                        )
                    }
                }),
                createTextColumn<Book>({
                    id: 'author',
                    header: t('ui.books.columns.author') || 'Author',
                    accessorKey: 'author',
                }),
                
                createTextColumn<Book>({
                    id: 'publisher',
                    header: t('ui.books.columns.publisher') || 'Publisher',
                    accessorKey: 'publisher',
                }),
                createTextColumn<Book>({
                    id: 'num_pages',
                    header: t('ui.books.columns.num_pages') || 'Number of pages',
                    accessorKey: 'num_pages',
                }),
                createTextColumn<Book>({
                    id: 'genres',
                    header: t('ui.books.columns.genres') || 'Genres',
                    accessorKey: 'genres',
                    format: (value)=>{
                        let aux;
                        let res : string[] = [];
                        if (value.includes(',')) {
                           aux = value.split(', ');
                           aux.map((genre) =>{
                            genre = t(`ui.genres.names.${genre}`)
                            res.push(genre);
                            // console.log(genre);
                           })
                        //    console.log(res);
                           aux = res.join(', ');
                           return aux;
                        }else{
                            return t(`ui.genres.names.${value}`);
                        } 
                    }
                }),
                createTextColumn<Book>({
                    id: 'available',
                    header: t('ui.books.columns.is_available') || 'Available',
                    accessorKey: 'available',
                    format(value) {
                       return value ? t(`ui.books.availability.false`) : t(`ui.books.availability.true`)
                    },
                }),
                createTextColumn<Book>({
                    id: 'bookshelf_id',
                    header: t('ui.books.columns.bookshelf_id') || 'Bookshelf number',
                    accessorKey: 'bookshelf_id',
                }),
                createTextColumn<Book>({
                    id: 'zone_id',
                    header: t('ui.books.columns.zone_id') || 'Zone ubication',
                    accessorKey: 'zone_id',
                    
                    
                }),
                createTextColumn<Book>({
                    id: 'zone_name',
                    header: t('ui.books.columns.zone_name') || 'Zone name',
                    accessorKey: 'zone_name',
                    format: (value) =>  t(`ui.genres.names.${value}`)
                    
                }),

                
                createTextColumn<Book>({
                    id: 'floor_id',
                    header: t('ui.books.columns.floor_id') || 'Floor ubication',
                    accessorKey: 'floor_id',
                }),
                createDateColumn<Book>({
                    id: 'created_at',
                    header: t('ui.users.columns.created_at') || 'Created At',
                    accessorKey: 'created_at',
                }),
                
                
                createActionsColumn<Book>({
                    id: 'actions',
                    header: t('ui.users.columns.actions') || 'Actions',
                    renderActions: (book) => (
                        <>
                            {book.available ?  
                            
                                <Button variant="outline" size="icon" title={t('ui.loans.buttons.create') || 'Loan this book'} onClick={() => {handleLoan(book.id, book.available)}}>
                                    <Handshake className="h-4 w-4 text-green-400"/>
                                </Button>
                                :
                                <Button variant="outline" size="icon" title={t('ui.reservations.buttons.create') || 'Book this book'} onClick={() => {handleLoan(book.id, book.available)}}>
                                    <ScrollText className="h-4 w-4 text-yellow-400"/>
                                </Button>
                                
                                }
                            <Link href={`/books/${book.id}/edit?page=${currentPage}&perPage=${perPage}`}>
                                <Button variant="outline" size="icon" title={t('ui.users.buttons.edit') || 'Edit book'}>
                                    <PencilIcon className="h-4 w-4" />
                                </Button>
                            </Link>
                           
                            <DeleteDialog
                                id={book.id}
                                onDelete={handleDeleteBook}
                                title={t('ui.books.delete.title') || 'Delete book'}
                                description={
                                    t('ui.books.delete.description') || 'Are you sure you want to delete this book? This action cannot be undone.'
                                }
                                trigger={
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="text-destructive hover:text-destructive"
                                        title={t('ui.books.buttons.delete') || 'Delete book'}
                                    >
                                        <TrashIcon className="h-4 w-4" />
                                    </Button>
                                }
                            />
                        </>
                    ),
                }),
            ] as ColumnDef<Book>[],
        [t, handleDeleteBook],
    );

    return (
        <BookLayout title={t('ui.books.title')}>
            <div className="p-6">
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-bold">{t('ui.books.title')}</h1>
                        <Link href="/books/create">
                            <Button>
                                <PlusIcon className="mr-2 h-4 w-4" />
                                {t('ui.books.buttons.new')}
                            </Button>
                        </Link>
                    </div>

                    <div className="space-y-4">
                        <FiltersTable
                        lang={lang}
                            filters={
                                [
                                    {
                                        id: 'name',
                                        label: t('ui.books.filters.name') || 'Title',
                                        type: 'text',
                                        placeholder: t('ui.books.placeholders.name') || 'Title...',
                                    },
                                    {
                                        id: 'ISBN',
                                        label: t('ui.books.filters.ISBN') || 'Title',
                                        type: 'text',
                                        placeholder: t('ui.books.placeholders.ISBN') || 'Title...',
                                    },
                                    {
                                        id: 'author',
                                        label: t('ui.books.filters.author') || 'Author',
                                        type: 'text',
                                        placeholder: t('ui.books.placeholders.author') || 'Author...',
                                    },
                                    {
                                        id: 'publisher',
                                        label: t('ui.books.filters.publisher') || 'Publisher',
                                        type: 'text',
                                        placeholder: t('ui.books.placeholders.publisher') || 'Publisher...',
                                    },
                                    {
                                        id: 'num_pages',
                                        label: t('ui.books.columns.num_pages') || 'Number of pages',
                                        type: 'number',
                                        placeholder: t('ui.books.placeholders.num_pages') || 'Number of pages...',
                                    },
                                    {
                                        id: 'genres',
                                        label: t('ui.books.filters.genres') || 'Genres',
                                        type: 'select',
                                        placeholder: t('ui.books.placeholders.genres') || 'Genres...',
                                        options:genreOptions
                                    },
                                    {
                                        id: 'bookshelf_id',
                                        label: t('ui.books.filters.bookshelf_id') || 'Bookshelf number',
                                        type: 'number',
                                        placeholder: t('ui.books.placeholders.bookshelf_id') || 'Bookshelf number...',
                                    },
                                    {
                                        id: 'zone_id',
                                        label: t('ui.books.columns.zone_id') || 'Zone number',
                                        type: 'number',
                                        placeholder: t('ui.books.placeholders.zone_id') || 'Zone number...',
                                    },
                                    {
                                        id: 'zone_name',
                                        label: t('ui.books.columns.zone_name') || 'Zone name',
                                        type: 'select',
                                        placeholder: t('ui.books.placeholders.zone_name') || 'Zone name...',
                                        options: genreOptions
                                    },
                                    {
                                        id: 'floor_id',
                                        label: t('ui.books.columns.floor_id') || 'Floor name',
                                        type: 'number',
                                        placeholder: t('ui.books.placeholders.floor_id') || 'Floor name...',
                                    
                                    },
                                    {
                                        id: 'is_available',
                                        label: t('ui.books.columns.is_available'),
                                        type: 'select',
                                        placeholder: t('ui.books.placeholders.is_available'),
                                        options: [
                                            {label:t('ui.books.availability.false'), value: 'false'},
                                            {label:t('ui.books.availability.true'), value: 'true'},
                                        ]
                                    },
                                    {
                                        id: 'created_at',
                                        label: t('ui.books.filters.created_at') || 'Creation date',
                                        type: 'date',
                                        placeholder: t('ui.books.placeholders.created_at') || 'Creation date...',
                                    },
                                ] as FilterConfig[]
                            }
                            onFilterChange={handleFilterChange}
                            initialValues={filters}
                        />
                    </div>

                    <div className="w-full overflow-hidden">
                    {books?.meta.total !== undefined && <h2>{t('ui.common.filters.results', {attribute: books?.meta.total.toString()})}</h2>}

                        {isLoading ? (
                            <TableSkeleton columns={4} rows={10} />
                        ) : isError ? (
                            <div className="p-4 text-center">
                                <div className="mb-4 text-red-500">{t('ui.books.error_loading')}</div>
                                <Button onClick={() => refetch()} variant="outline">
                                    {t('ui.users.buttons.retry')}
                                </Button>
                            </div>
                        ) : (
                            <div>
                                <Table
                                    data={
                                        books ?? {
                                            data: [],
                                            meta: {
                                                current_page: 1,
                                                from: 0,
                                                last_page: 1,
                                                per_page: perPage,
                                                to: 0,
                                                total: 0,
                                            },
                                        }
                                    }
                                    columns={columns}
                                    onPageChange={handlePageChange}
                                    onPerPageChange={handlePerPageChange}
                                    perPageOptions={[10, 25, 50, 100]}
                                    noResultsMessage={t('ui.books.no_results') || 'No books found'}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </BookLayout>
    );
}
