import { DashboardCard } from '@/components/dashboard/DashboardCard';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { BookText, Building, ChartColumnIncreasing, Cuboid, Handshake, Library, ScrollText, Users } from 'lucide-react';

import { useTranslations } from '@/hooks/use-translations';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const { t } = useTranslations();
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
                <DashboardCard title={t(`ui.users.title`)} description={t(`ui.users.description`)} href="/users" icon={Users} />
                <DashboardCard title={t(`ui.floors.title`)} description={t(`ui.floors.description`)} href="/floors" icon={Building} />
                <DashboardCard title={t(`ui.zones.title`)} description={t(`ui.zones.description`)} href="/zones" icon={Cuboid} />
                <DashboardCard title={t(`ui.bookshelves.title`)} description={t(`ui.bookshelves.description`)} href="/bookshelves" icon={Library} />
                <DashboardCard title={t(`ui.books.title`)} description={t(`ui.books.description`)} href="/books" icon={BookText} />
                <DashboardCard title={t(`ui.loans.title`)} description={t(`ui.loans.description`)} href="/loans" icon={Handshake} />
                <DashboardCard title={t(`ui.reservations.title`)} description={t(`ui.reservations.description`)} href="/reservations" icon={ScrollText} />
                <DashboardCard title={t(`ui.graphs.title`)} description={t(`ui.graphs.description`)} href="/graphs" icon={ChartColumnIncreasing} />
            </div>
        </AppLayout>
    );
}
