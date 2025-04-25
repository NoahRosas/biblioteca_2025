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
import { Bookshelf, useBookshelves, useDeleteBookshelf } from '@/hooks/bookshelves/useBookshelves';
import { useTranslations } from '@/hooks/use-translations';

import { BookshelfLayout } from '@/layouts/bookshelves/BookshelfLayout';
import { PageProps } from '@/types';

import { Link, usePage } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { PencilIcon, PlusIcon, TrashIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';

interface IndexBookshelvesProps extends PageProps{
    lang: string;
}

export default function BookshelvesIndex({lang}:IndexBookshelvesProps) {
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
        filters.number ? filters.number : 'null',
        filters.max_books? filters.max_books : 'null',
        filters.zone_id ? filters.zone_id : 'null',
        filters.zone_name? filters.zone_name : 'null',
        filters.floor_id ? filters.floor_id : 'null',
        filters.created_at ? filters.created_at : 'null'
    ];

    const {
        data: bookshelves,
        isLoading,
        isError,
        refetch,
    } = useBookshelves({
        search: combinedSearch,
        page: currentPage,
        perPage: perPage,
    });
    const deleteBookshelfMutation = useDeleteBookshelf();

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

    const handleDeleteBookshelf = async (id: string) => {
        try {
            await deleteBookshelfMutation.mutateAsync(id);
            refetch();
        } catch (error) {
            toast.error(t('ui.bookshelves.deleted_error') || 'Error deleting bookshelf');
            console.error('Error deleting bookshelf:', error);
        }
    };

    const columns = useMemo(
        () =>
            [
                createTextColumn<Bookshelf>({
                    id: 'number',
                    header: t('ui.bookshelves.columns.number') || 'Name',
                    accessorKey: 'number',
                }),
                createTextColumn<Bookshelf>({
                    id: 'max_books',
                    header: t('ui.bookshelves.columns.max_books') || 'Max bookshelves',
                    accessorKey: 'max_books',
                }),
                createTextColumn<Bookshelf>({
                    id: 'zone_id',
                    header: t('ui.bookshelves.columns.zone_id') || 'Zone ubication',
                    accessorKey: 'zone_id',
                    
                }),
                createTextColumn<Bookshelf>({
                    id: 'zone_name',
                    header: t('ui.bookshelves.columns.zone_name') || 'Zone ubication',
                    accessorKey: 'zone_name',
                    format: (value) =>  t(`ui.genres.names.${value}`)
                }),
                createTextColumn<Bookshelf>({
                    id: 'floor_id',
                    header: t('ui.bookshelves.columns.floor_id') || 'Floor ubication',
                    accessorKey: 'floor_id',
                }),
                createDateColumn<Bookshelf>({
                    id: 'created_at',
                    header: t('ui.users.columns.created_at') || 'Created At',
                    accessorKey: 'created_at',
                }),
                
                
                createActionsColumn<Bookshelf>({
                    id: 'actions',
                    header: t('ui.users.columns.actions') || 'Actions',
                    renderActions: (bookshelf) => (
                        <>
                            <Link href={`/bookshelves/${bookshelf.id}/edit?page=${currentPage}&perPage=${perPage}`}>
                                <Button variant="outline" size="icon" title={t('ui.users.buttons.edit') || 'Edit bookshelf'}>
                                    <PencilIcon className="h-4 w-4" />
                                </Button>
                            </Link>
                            <DeleteDialog
                                id={bookshelf.id}
                                onDelete={handleDeleteBookshelf}
                                title={t('ui.users.delete.title') || 'Delete bookshelf'}
                                description={
                                    t('ui.users.delete.description') || 'Are you sure you want to delete this bookshelf? This action cannot be undone.'
                                }
                                trigger={
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="text-destructive hover:text-destructive"
                                        title={t('ui.users.buttons.delete') || 'Delete zone'}
                                    >
                                        <TrashIcon className="h-4 w-4" />
                                    </Button>
                                }
                            />
                        </>
                    ),
                }),
            ] as ColumnDef<Bookshelf>[],
        [t, handleDeleteBookshelf],
    );

    return (
        <BookshelfLayout title={t('ui.bookshelves.title')}>
            <div className="p-6">
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-bold">{t('ui.bookshelves.title')}</h1>
                        <Link href="/bookshelves/create">
                            <Button>
                                <PlusIcon className="mr-2 h-4 w-4" />
                                {t('ui.bookshelves.buttons.new')}
                            </Button>
                        </Link>
                    </div>

                    <div className="space-y-4">
                        <FiltersTable
                        lang={lang}
                            filters={
                                [
                                    {
                                        id: 'number',
                                        label: t('ui.bookshelves.filters.number') || 'Número',
                                        type: 'text',
                                        placeholder: t('ui.bookshelves.placeholders.number') || 'Número...',
                                    },
                                    {
                                        id: 'max_books',
                                        label: t('ui.bookshelves.columns.max_books') || 'Max books',
                                        type: 'number',
                                        placeholder: t('ui.bookshelves.placeholders.max_books') || 'Max books...',
                                    },
                                    {
                                        id: 'zone_id',
                                        label: t('ui.bookshelves.columns.zone_id') || 'Zone name',
                                        type: 'number',
                                        placeholder: t('ui.bookshelves.placeholders.zone_id') || 'Zone name...',
                                    },
                                    {
                                        id: 'zone_name',
                                        label: t('ui.bookshelves.columns.zone_name') || 'Zone number',
                                        type: 'text',
                                        placeholder: t('ui.bookshelves.placeholders.zone_name') || 'Zone number...',
                                    },
                                    {
                                        id: 'floor_id',
                                        label: t('ui.bookshelves.columns.floor_id') || 'Floor name',
                                        type: 'number',
                                        placeholder: t('ui.bookshelves.placeholders.floor_id') || 'Floor name...',
                                    },
                                    {
                                        id: 'created_at',
                                        label: t('ui.bookshelves.filters.created_at') || 'Creation date',
                                        type: 'date',
                                        placeholder: t('ui.bookshelves.placeholders.created_at') || 'Creation date...',
                                    },
                                ] as FilterConfig[]
                            }
                            onFilterChange={handleFilterChange}
                            initialValues={filters}
                        />
                    </div>

                    <div className="w-full overflow-hidden">
                    {bookshelves?.meta.total !== undefined && <h2>{t('ui.common.filters.results', {attribute: bookshelves?.meta.total.toString()})}</h2>}

                        {isLoading ? (
                            <TableSkeleton columns={4} rows={10} />
                        ) : isError ? (
                            <div className="p-4 text-center">
                                <div className="mb-4 text-red-500">{t('ui.bookshelves.error_loading')}</div>
                                <Button onClick={() => refetch()} variant="outline">
                                    {t('ui.users.buttons.retry')}
                                </Button>
                            </div>
                        ) : (
                            <div>
                                <Table
                                    data={
                                        bookshelves ?? {
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
                                    noResultsMessage={t('ui.users.no_results') || 'No bookshelves found'}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </BookshelfLayout>
    );
}
