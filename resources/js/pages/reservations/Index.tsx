import { createActionsColumn, createTextColumn, DeleteDialog, FilterConfig, FiltersTable, Table, TableSkeleton } from '@/components/stack-table';
import { Button } from '@/components/ui/button';
import { Reservation, useDeleteReservation, useReservations } from '@/hooks/reservations/useReservations';


import { useTranslations } from '@/hooks/use-translations';
import { ReservationLayout } from '@/layouts/reservations/ReservationLayout';
import { PageProps } from '@/types';


import { Link, usePage } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import {PencilIcon, PlusIcon, TrashIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';


interface IndexReservationsProps extends PageProps{
    lang: string;
}

export default function ReservationsIndex({lang}:IndexReservationsProps) {
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
        filters.user_email ? filters.user_email : 'null',
        filters.book_name ? filters.book_name : 'null',
        filters.book_ISBN ? filters.book_ISBN : 'null',
        filters.created_at ? filters.created_at : 'null',
    ];

    const {
        data: reservations,
        isLoading,
        isError,
        refetch,
    } = useReservations({
        search: combinedSearch,
        page: currentPage,
        perPage: perPage,
    });
    const deleteReservationMutation = useDeleteReservation();

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
    const handleDeleteReservation = async (id: string) => {
        try {
            await deleteReservationMutation.mutateAsync(id);
            refetch();
        } catch (error) {
            toast.error(t('ui.reservations.deleted_error') || 'Error deleting reservation');
            console.error('Error deleting reservation:', error);
        }
    };

    const columns = useMemo(
        () =>
            [
                createTextColumn<Reservation>({
                    id: 'user_email',
                    header: t('ui.reservations.columns.user_email') || 'Name',
                    accessorKey: 'user_email',
                }),
                createTextColumn<Reservation>({
                    id: 'book_name',
                    header: t('ui.reservations.columns.book_name') || 'Name',
                    accessorKey: 'book_name',
                }),
                createTextColumn<Reservation>({
                    id: 'book_ISBN',
                    header: t('ui.reservations.columns.book_ISBN') || 'Author',
                    accessorKey: 'book_ISBN',
                }),
                createTextColumn<Reservation>({
                    id: 'created_at',
                    header: t('ui.reservations.columns.created_at') || 'Number of pages',
                    accessorKey: 'created_at',
                }),

                createActionsColumn<Reservation>({
                    id: 'actions',
                    header: t('ui.users.columns.actions') || 'Actions',
                    renderActions: (reservation) => (
                        <>
                        <Link href={`/reservations/${reservation.id}/edit?page=${currentPage}&perPage=${perPage}`}>
                            <Button
                                variant="outline"
                                size="icon"
                                title={t('ui.reservations.buttons.edit') || 'Edit reservation'}
                            >
                                <PencilIcon className="h-4 w-4" />
                            </Button>
                        </Link>
                            <DeleteDialog
                                id={reservation.id}
                                onDelete={handleDeleteReservation}
                                title={t('ui.reservations.delete.title') || 'Delete reservation'}
                                description={
                                    t('ui.reservations.delete.description') || 'Are you sure you want to delete this reservation? This action cannot be undone.'
                                }
                                trigger={
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="text-destructive hover:text-destructive"
                                        title={t('ui.users.buttons.delete') || 'Delete reservation'}
                                    >
                                        <TrashIcon className="h-4 w-4" />
                                    </Button>
                                }
                            />
                        </>
                    ),
                }),
            ] as ColumnDef<Reservation>[],
        [t, handleDeleteReservation],
    );

    return (
        <ReservationLayout title={t('ui.reservations.title')}>
            <div className="p-6">
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-bold">{t('ui.reservations.title')}</h1>
                        <Link href="/reservations/create">
                            <Button>
                                <PlusIcon className="mr-2 h-4 w-4" />
                                {t('ui.reservations.buttons.new')}
                            </Button>
                        </Link>
                    </div>

                    <div className="space-y-4">
                        <FiltersTable
                        lang={lang}
                            filters={
                                [
                                    {
                                        id: 'user_email',
                                        label: t('ui.reservations.filters.user_email'),
                                        type: 'text',
                                        placeholder: t('ui.reservations.placeholders.user_email') || 'Title...',
                                    },
                                    {
                                        id: 'book_name',
                                        label: t('ui.reservations.filters.book_name') || 'Title',
                                        type: 'text',
                                        placeholder: t('ui.reservations.placeholders.book_name') || 'Title...',
                                    },
                                    {
                                        id: 'book_ISBN',
                                        label: t('ui.reservations.filters.book_ISBN'),
                                        type: 'text',
                                        placeholder: t('ui.reservations.placeholders.ISBN') || 'Author...',
                                    },
                                    {
                                        id: 'created_at',
                                        label: t('ui.reservations.filters.created_at'),
                                        type: 'date',
                                        placeholder: t('ui.reservations.placeholders.created_at') || 'Publisher...',
                                    },
                                ] as FilterConfig[]
                            }
                            onFilterChange={handleFilterChange}
                            initialValues={filters}
                        />
                    </div>

                    <div className="w-full overflow-hidden">
                        {isLoading ? (
                            <TableSkeleton columns={4} rows={10} />
                        ) : isError ? (
                            <div className="p-4 text-center">
                                <div className="mb-4 text-red-500">{t('ui.reservations.error_loading')}</div>
                                <Button onClick={() => refetch()} variant="outline">
                                    {t('ui.users.buttons.retry')}
                                </Button>
                            </div>
                        ) : (
                            <div>
                                <Table
                                    data={
                                        reservations ?? {
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
                                    noResultsMessage={t('ui.reservations.no_results') || 'No reservations found'}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </ReservationLayout>
    );
}
