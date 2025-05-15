import { createActionsColumn, createTextColumn, DeleteDialog, FilterConfig, FiltersTable, Table, TableSkeleton } from '@/components/stack-table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Loan, useDeleteLoan, useLoans } from '@/hooks/loans/useLoans';

import { useTranslations } from '@/hooks/use-translations';
import { LoanLayout } from '@/layouts/loans/LoanLayout';
import { PageProps } from '@/types';

import { Link, router, usePage } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { HandHelping, PencilIcon, PlusIcon, TrashIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';

interface IndexLoanProps extends PageProps{
    lang: string;
}
export default function BooksIndex({lang}:IndexLoanProps) {
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
        filters.end_loan ? filters.end_loan : 'null',
        filters.borrowed ? filters.borrowed : 'null',
        filters.is_overdue ? filters.is_overdue : 'null',
    ];

   
    const {
        data: loans,
        isLoading,
        isError,
        refetch,
    } = useLoans({
        search: combinedSearch,
        page: currentPage,
        perPage: perPage,
    });
    const deleteLoanMutation = useDeleteLoan();

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
    function handleEdit(loan_id: string) {
        return router.get(`/loans/${loan_id}/edit?page=${currentPage}&perPage=${perPage}`);
    }
    const handleDeleteLoan = async (id: string) => {
        try {
            await deleteLoanMutation.mutateAsync(id);
            refetch();
        } catch (error) {
            toast.error(t('ui.loans.deleted_error') || 'Error deleting loan');
            console.error('Error deleting loan:', error);
        }
    };
    function handleReturn(loanId: string) {
        let borrowed = false;
        const info = new FormData();
        info.append('borrowedState', borrowed);
        info.append('_method', 'PUT');
        router.post(`/loans/${loanId}`, info);
        refetch();
    }
    const columns = useMemo(
        () =>
            [
                createTextColumn<Loan>({
                    id: 'user_email',
                    header: t('ui.loans.columns.user_email') || 'Name',
                    accessorKey: 'user_email',
                }),
                createTextColumn<Loan>({
                    id: 'book_name',
                    header: t('ui.loans.columns.book_name') || 'Name',
                    accessorKey: 'book_name',
                }),
                createTextColumn<Loan>({
                    id: 'book_ISBN',
                    header: t('ui.loans.columns.book_ISBN') || 'Author',
                    accessorKey: 'book_ISBN',
                }),
                createTextColumn<Loan>({
                    id: 'created_at',
                    header: t('ui.loans.columns.created_at') || 'Number of pages',
                    accessorKey: 'created_at',
                }),
                createTextColumn<Loan>({
                    id: 'end_loan',
                    header: t('ui.loans.columns.end_loan') || 'Publisher',
                    accessorKey: 'end_loan',
                }),
                createActionsColumn<Loan>({
                    id: 'borrowed',
                    header: t('ui.loans.columns.borrowed') || 'Bookshelf number',
                    renderActions: (loan) => {
                        let response;
                        if (loan.borrowed) {
                            response = t('ui.loans.response.true');
                        } else {
                            if (loan.return_date !== 'null') {
                                response = t('ui.loans.response.return') + loan.return_date;
                            } else {
                                response = t('ui.loans.response.false');
                            }
                        }

                        return (
                            <>
                                <span>{response}</span>
                            </>
                        );
                    },
                }),
                createActionsColumn<Loan>({
                    id: 'is_overdue',
                    header: t('ui.loans.columns.is_overdue') || 'Genres',
                    renderActions: (loan) => {
                        let response;
                        let days_overdued = Math.abs(loan.days_overdued);
                        let days_overdued_returned = Math.abs(loan.days_overdued_returned);
                        if (loan.return_date == 'null') {
                            if (loan.is_overdue) {
                                if (days_overdued > 1) {
                                    response = t('ui.loans.overdue.more') + ' ' + days_overdued;
                                } else {
                                    response = t('ui.loans.overdue.one') + ' ' + days_overdued;
                                }
                            } else {
                                response = t('ui.loans.overdue.false');
                            }
                        }else{
                            if (loan.is_overdue) {
                                if (days_overdued_returned > 1) {
                                    response = t('ui.loans.overdue.more') + ' ' + days_overdued_returned;
                                } else {
                                    response = t('ui.loans.overdue.one') + ' ' + days_overdued_returned;
                                }
                            } else {
                                response = t('ui.loans.overdue.false');
                            }
                        }
                        

                        return (
                            <>
                                <span>{response}</span>
                            </>
                        );
                    },
                }),

                createActionsColumn<Loan>({
                    id: 'actions',
                    header: t('ui.users.columns.actions') || 'Actions',
                    renderActions: (loan) => (
                        <>
                            <Dialog>
                                <DialogTrigger disabled={loan.return_date !== 'null'} asChild>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        title={t('ui.loans.buttons.return.true') || 'Return loan'}
                                        disabled={loan.return_date !== 'null'}
                                    >
                                        <HandHelping className="h-4 w-4 text-orange-400" />
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>{t('ui.loans.return.title')}</DialogTitle>
                                        <DialogDescription>
                                            {t('ui.loans.return.end_loan')}
                                            {loan.end_loan}
                                            <br />
                                            {t('ui.loans.return.description')}
                                        </DialogDescription>
                                    </DialogHeader>
                                    <DialogFooter>
                                        <Button onClick={() => handleReturn(loan.id)}>{t('ui.loans.buttons.return.true')}</Button>
                                        <Button className="bg-destructive hover:bg-red-500">{t('ui.loans.buttons.return.false')}</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>

                            <Button
                                variant="outline"
                                size="icon"
                                title={t('ui.loans.buttons.edit') || 'Edit loan'}
                                onClick={() => handleEdit(loan.id)}
                                disabled={loan.return_date !== 'null'}
                            >
                                <PencilIcon className="h-4 w-4" />
                            </Button>

                            <DeleteDialog
                                id={loan.id}
                                onDelete={handleDeleteLoan}
                                title={t('ui.loans.delete.title') || 'Delete loan'}
                                successMessage={t('messages.loans.deleted')}
                                description={
                                    t('ui.loans.delete.description') || 'Are you sure you want to delete this loan? This action cannot be undone.'
                                }
                                trigger={
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="text-destructive hover:text-destructive"
                                        title={t('ui.users.buttons.delete') || 'Delete loan'}
                                    >
                                        <TrashIcon className="h-4 w-4" />
                                    </Button>
                                }
                            />
                        </>
                    ),
                }),
            ] as ColumnDef<Loan>[],
        [t, handleDeleteLoan],
    );

    return (
        <LoanLayout title={t('ui.loans.title')}>
            <div className="p-6">
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-bold">{t('ui.loans.title')}</h1>
                        <Link href="/loans/create">
                            <Button>
                                <PlusIcon className="mr-2 h-4 w-4" />
                                {t('ui.loans.buttons.new')}
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
                                        label: t('ui.loans.filters.user_email'),
                                        type: 'text',
                                        placeholder: t('ui.loans.placeholders.user_email') || 'Title...',
                                    },
                                    {
                                        id: 'book_name',
                                        label: t('ui.loans.filters.book_name') || 'Title',
                                        type: 'text',
                                        placeholder: t('ui.loans.placeholders.book_name') || 'Title...',
                                    },
                                    {
                                        id: 'book_ISBN',
                                        label: t('ui.loans.filters.book_ISBN'),
                                        type: 'text',
                                        placeholder: t('ui.loans.placeholders.ISBN') || 'Author...',
                                    },
                                    {
                                        id: 'created_at',
                                        label: t('ui.loans.filters.created_at'),
                                        type: 'date',
                                        placeholder: t('ui.loans.placeholders.created_at') || 'Publisher...',
                                    },
                                    {
                                        id: 'end_loan',
                                        label: t('ui.loans.columns.end_loan'),
                                        type: 'date',
                                        placeholder: t('ui.loans.placeholders.end_loan') || 'Number of pages...',
                                    },
                                    {
                                        id: 'borrowed',
                                        label: t('ui.loans.columns.borrowed'),
                                        type: 'select',
                                        placeholder: t('ui.loans.placeholders.borrowed'),
                                        options: [
                                            { label: t('ui.loans.borrowed.true'), value: 'true' },
                                            { label: t('ui.loans.borrowed.false'), value: 'false' },
                                        ],
                                    },
                                    {
                                        id: 'is_overdue',
                                        label: t('ui.loans.columns.is_overdue'),
                                        type: 'select',
                                        placeholder: t('ui.loans.placeholders.is_overdue'),
                                        options: [
                                            { label: t('ui.loans.overdue.true'), value: 'true' },
                                            { label: t('ui.loans.overdue.false'), value: 'false' },
                                        ],
                                    },
                                ] as FilterConfig[]
                            }
                            onFilterChange={handleFilterChange}
                            initialValues={filters}
                        />
                    </div>

                    <div className="w-full overflow-hidden">
                    {loans?.meta.total !== undefined && <h2>{t('ui.common.filters.results', {attribute: loans?.meta.total.toString()})}</h2>}
                        {isLoading ? (
                            <TableSkeleton columns={4} rows={10} />
                        ) : isError ? (
                            <div className="p-4 text-center">
                                <div className="mb-4 text-red-500">{t('ui.loans.error_loading')}</div>
                                <Button onClick={() => refetch()} variant="outline">
                                    {t('ui.users.buttons.retry')}
                                </Button>
                            </div>
                        ) : (
                            <div>
                                <Table
                                    data={
                                        loans ?? {
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
                                    noResultsMessage={t('ui.loans.no_results') || 'No loans found'}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </LoanLayout>
    );
}
