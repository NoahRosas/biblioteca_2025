import Heading from '@/components/heading';
import { useTranslations } from '@/hooks/use-translations';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { PageProps, type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import 'react-vertical-timeline-component/style.min.css';
import { Timeline } from '../users/components/timeline';

interface UserSettingsProps extends PageProps {
    user_activities: any[];
}

export default function Profile({ user_activities }: UserSettingsProps) {
    const { t } = useTranslations();

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('ui.settings.profile.title'),
            href: '/settings/profile',
        },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('ui.settings.profile.title')} />

            <SettingsLayout>
                <div className="space-y-2 text-center">
                    <Heading title={t('ui.settings.profile.history')} description={t('ui.settings.profile.history_description')} />
                </div>

                <Timeline user_activities={user_activities}/>
            </SettingsLayout>
        </AppLayout>
    );
}
