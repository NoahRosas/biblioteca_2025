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

interface GraphLayoutProps extends PropsWithChildren {
    title: string;
}

export function GraphLayout({ title, children }: GraphLayoutProps) {
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
            title: t('ui.graphs.title'),
            href: '/graphs',
        },
    ];

    if (title !== t('ui.graphs.title')) {
        breadcrumbs.push({
            title,
            href: '#',
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={title} />
            <div className="flex min-h-screen flex-col">{children}</div>
        </AppLayout>
    );
}
