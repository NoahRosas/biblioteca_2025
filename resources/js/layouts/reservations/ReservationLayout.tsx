import { useTranslations } from '@/hooks/use-translations';
import { BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { PropsWithChildren, useEffect } from 'react';
import { toast } from 'sonner';
import AppLayout from '../app-layout';

interface FlashMessages {
    success?: string;
    error?: string;
}

interface PageProps {
    flash: FlashMessages;
    [key: string]: unknown;
}


interface ReservationLayoutProps extends PropsWithChildren {
    title: string;
    // floors: Floor[];
}

export function ReservationLayout({ title,  children }: ReservationLayoutProps) {
    const { flash } = usePage<PageProps>().props;
    const { t } = useTranslations();
    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }
        if (flash.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: t('ui.reservations.title'),
            href: '/reservations',
        },
    ];

    if (title !== t('ui.reservations.title')) {
        breadcrumbs.push({
            title,
            href: '#',
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={title} />
            {children}
        </AppLayout>
    );
}
