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
import { Floor, useDeleteFloor, useFloors } from '@/hooks/floors/useFloors';
import { useTranslations } from '@/hooks/use-translations';
import { FloorLayout } from '@/layouts/floors/FloorLayout';
import { PageProps } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { PencilIcon, PlusIcon, TrashIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';

interface IndexFloorProps extends PageProps{
    lang: string;
}

export default function FloorsIndex({lang}:IndexFloorProps) {
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
        filters.max_zones ? filters.max_zones : 'null',
        filters.created_at ? filters.created_at : 'null',
    ];
    

    const {
        data: floors,
        isLoading,
        isError,
        refetch,
    } = useFloors({
        search: combinedSearch,
        page: currentPage,
        perPage: perPage,
    });
    const deleteFloorMutation = useDeleteFloor();

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

    const handleDeleteFloor = async (id: string) => {
        try {
            await deleteFloorMutation.mutateAsync(id);
            refetch();
        } catch (error) {
            toast.error(t('ui.users.deleted_error') || 'Error deleting user');
            console.error('Error deleting user:', error);
        }
    };

    const columns = useMemo(
        () =>
            [
                createTextColumn<Floor>({
                    id: 'name',
                    header: t('ui.floors.title') || 'Name',
                    accessorKey: 'name',
                    format: (value)=>t(`ui.floors.titles.floor`)+' '+value
                }),
                createTextColumn<Floor>({
                    id: 'max_zones',
                    header: t('ui.floors.columns.max_zones') || 'Max Zones',
                    accessorKey: 'max_zones',
                }),
                createDateColumn<Floor>({
                    id: 'created_at',
                    header: t('ui.users.columns.created_at') || 'Created At',
                    accessorKey: 'created_at',
                }),
                createActionsColumn<Floor>({
                    id: 'actions',
                    header: t('ui.users.columns.actions') || 'Actions',
                    renderActions: (floor) => (
                        <>
                            <Link href={`/floors/${floor.id}/edit?page=${currentPage}&perPage=${perPage}`}>
                                <Button variant="outline" size="icon" title={t('ui.users.buttons.edit') || 'Edit floor'}>
                                    <PencilIcon className="h-4 w-4" />
                                </Button>
                            </Link>
                            <DeleteDialog
                                id={floor.id}
                                onDelete={handleDeleteFloor}
                                title={t('ui.users.delete.title') || 'Delete floor'}
                                description={
                                    t('ui.users.delete.description') || 'Are you sure you want to delete this floor? This action cannot be undone.'
                                }
                                trigger={
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="text-destructive hover:text-destructive"
                                        title={t('ui.users.buttons.delete') || 'Delete floor'}
                                    >
                                        <TrashIcon className="h-4 w-4" />
                                    </Button>
                                }
                            />
                        </>
                    ),
                }),
            ] as ColumnDef<Floor>[],
        [t, handleDeleteFloor],
    );

    return (
        <FloorLayout title={t('ui.floors.title')}>
            <div className="p-6">
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-bold">{t('ui.floors.title')}</h1>
                        <Link href="/floors/create">
                            <Button>
                                <PlusIcon className="mr-2 h-4 w-4" />
                                {t('ui.floors.buttons.new')}
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
                                        label: t('ui.floors.filters.name') || 'Nombre',
                                        type: 'number',
                                        placeholder: t('ui.floors.placeholders.name') || 'Nombre...',
                                    },
                                    {
                                        id: 'max_zones',
                                        label: t('ui.floors.filters.max_zones') || 'Max zones',
                                        type: 'number',
                                        placeholder: t('ui.floors.placeholders.max_zones') || 'Max zones...',
                                    },
                                    {
                                        id: 'created_at',
                                        label: t('ui.floors.filters.created_at') || 'Creation date',
                                        type: 'date',
                                        placeholder: t('ui.floors.placeholders.created_at') || 'Creation date...',
                                    }
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
                                <div className="mb-4 text-red-500">{t('ui.floors.error_loading')}</div>
                                <Button onClick={() => refetch()} variant="outline">
                                    {t('ui.users.buttons.retry')}
                                </Button>
                            </div>
                        ) : (
                            <div>
                                <Table
                                    data={
                                        floors ?? {
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
                                    noResultsMessage={t('ui.users.no_results') || 'No floors found'}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </FloorLayout>
    );
}
