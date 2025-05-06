import Heading from '@/components/heading';
import { useTranslations } from '@/hooks/use-translations';
import { UserLayout } from '@/layouts/users/UserLayout';
import { PageProps } from '@/types';
import 'react-vertical-timeline-component/style.min.css';
import { Timeline } from './components/timeline';

interface ShowHistoryProps extends PageProps {
    user_activities: any[];
}

export default function ShowHistory({ user_activities }: ShowHistoryProps) {
    const { t } = useTranslations();

    function NoHistory() {
        return (
            <div className="text-center">
                <p>{t('ui.users.history.no_results')}</p>
            </div>
        );
    }
    return (
        <UserLayout title={t('ui.users.history.title')}>
            <div className="space-y-2 text-center">
                <Heading title={t('ui.settings.profile.history')} description={t('ui.settings.profile.history_description')} />
            </div>
            {user_activities.length > 0 ? <Timeline user_activities={user_activities} /> : <NoHistory />}
        </UserLayout>
    );
}
