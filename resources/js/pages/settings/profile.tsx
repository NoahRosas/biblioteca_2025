import Heading from '@/components/heading';
import { useTranslations } from '@/hooks/use-translations';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { PageProps, type BreadcrumbItem, type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Handshake } from 'lucide-react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
interface UserSettingsProps extends PageProps {
    user_loans: any[];
}

export default function Profile({ user_loans }: UserSettingsProps) {
    const { t } = useTranslations();
    const page = usePage<SharedData>();

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('ui.settings.profile.title'),
            href: '/settings/profile',
        },
    ];
    console.log(user_loans);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('ui.settings.profile.title')} />

            <SettingsLayout>
                <div className="space-y-2 text-center">
                    <Heading title={t('ui.settings.profile.loan_history')} description={t('ui.settings.profile.loan_history_description')} />
                </div>
                
                <VerticalTimeline
                layout = '2-columns'
                lineColor = 'rgb(20, 132, 160)'
                >
                    
                    {user_loans.map(loan =>{
                        return <VerticalTimelineElement 
                        className="vertical-timeline-element"
                        contentStyle={loan.overdue ?
                            {  background: 'rgb(201, 40, 12)', color: '#fff'}
                            : {  background: 'rgb(26, 163, 14)', color: '#fff'}}
                        contentArrowStyle={loan.overdue ?
                            {  borderRight: 'rgb(201, 40, 12)', color: '#fff'}
                            : {  borderRight: 'rgb(26, 163, 14)', color: '#fff'}}
                        
                        iconStyle={loan.overdue ?
                            {  background: 'rgb(201, 40, 12)', color: '#fff'}
                            : {  background: 'rgb(26, 163, 14)', color: '#fff'}}
                        icon={< Handshake/>}>
                            <h3 className="vertical-timeline-element-title font-bold text-2xl">{loan.book.name}</h3>
                        <h4 className="vertical-timeline-element-subtitle font-semibold text-xl">{loan.book.author}</h4>
                        <p>{loan.expedit}  -  {loan.return ? loan.return : t('ui.loans.columns.borrowed')}</p>
                        <p>{t('ui.loans.columns.end_loan')+': '+loan.end}</p>
                        <p>{loan.overdue ? (Math.abs(loan.days_overdue) > 1 ? t('ui.loans.overdue.more') +Math.abs(loan.days_overdue) : t('ui.loans.overdue.one') +Math.abs(loan.days_overdue)) : t('ui.loans.overdue.false')}</p>
                        </VerticalTimelineElement>
                    })}
                    
                </VerticalTimeline>
            </SettingsLayout>
        </AppLayout>
    );
}
