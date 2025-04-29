import Heading from '@/components/heading';
import HeadingSmall from '@/components/heading-small';
import { useTranslations } from '@/hooks/use-translations';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { PageProps, type BreadcrumbItem, type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import Timeline from '@mui/lab/Timeline';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import { Typography } from '@mui/material';

interface UserSettingsProps extends PageProps {
    user_loans: any[];
    books: any[];
}

export default function Profile({ user_loans, books }: UserSettingsProps) {
    const { t } = useTranslations();
    const page = usePage<SharedData>();
    const { auth } = page.props;

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('ui.settings.profile.title'),
            href: '/settings/profile',
        },
    ];

    let userBooks = new Map();

    console.log(user_loans);
    books.forEach((book) => {
        user_loans.forEach((loan) => {
            if (loan.book_id === book.id) {
                userBooks.set(book.id, book);
            }
        });
    });
    console.log(userBooks);
    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('ui.settings.profile.title')} />

            <SettingsLayout>
                <div className="space-y-2">
                    <Heading title={t('ui.settings.profile.loan_history')} description={t('')} />
                </div>
                <Timeline position="alternate">
                    {user_loans.map((loan) => {
                        return (
                            <TimelineItem key={loan.id}>
                                <TimelineSeparator>
                                    <TimelineDot color="primary" />
                                    <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent>
                                    <Typography variant="h6" component="span">
                                        {t('ui.loans.title_s')}: {userBooks.get(loan.book_id).name}
                                        <br />
                                    </Typography>
                                    {console.log(loan)}
                                    {t('ui.loans.columns.created_at')}:<br /> {loan.expedit} <br />
                                    {t('ui.loans.columns.return_date')}: <br />{loan.return ? loan.return : t('ui.loans.columns.borrowed')} <br />
                                </TimelineContent>
                            </TimelineItem>
                        );
                    })}
                </Timeline>
            </SettingsLayout>
        </AppLayout>
    );
}
