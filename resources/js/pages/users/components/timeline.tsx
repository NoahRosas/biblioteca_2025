import { useTranslations } from '@/hooks/use-translations';
import { Handshake, ScrollText } from 'lucide-react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';

export interface TimelineProps{
    user_activities: any[];
}
export function Timeline ({user_activities}:TimelineProps){
const { t } = useTranslations();
console.log(user_activities);
    return (
        
        <VerticalTimeline layout="2-columns" lineColor="rgb(20, 132, 160)">
                    {user_activities.map((activity) => {
                        return (
                            <VerticalTimelineElement
                                className="vertical-timeline-element"
                                contentStyle={
                                    activity.type === 'reservation'
                                        ? { background: 'rgb(147, 12, 201)', color: '#fff' }
                                        : activity.overdue
                                          ? { background: 'rgb(201, 40, 12)', color: '#fff' }
                                          : { background: 'rgb(26, 163, 14)', color: '#fff' }
                                }
                                contentArrowStyle={
                                    activity.type === 'reservation'
                                        ? { borderRight: '7px solid rgb(147, 12, 201)' }
                                        : activity.overdue
                                          ? { borderRight: '7px solid rgb(201, 40, 12)' }
                                          : { borderRight: '7px solid rgb(26, 163, 14)' }
                                }
                                iconStyle={
                                    activity.type === 'reservation'
                                        ? { background: 'rgb(147, 12, 201)', color: '#fff' }
                                        : activity.overdue
                                          ? { background: 'rgb(201, 40, 12)', color: '#fff' }
                                          : { background: 'rgb(26, 163, 14)', color: '#fff' }
                                }
                                icon={activity.type === 'reservation' ? <ScrollText /> : <Handshake />}
                            >
                                <h3 className="vertical-timeline-element-title text-2xl font-bold">{activity.book.name}</h3>
                                <h4 className="vertical-timeline-element-subtitle text-xl font-semibold">{activity.book.author}</h4>
                                <h6 className='text-gray-800'>ISBN: {activity.book.ISBN}</h6>
                                {activity.type === 'reservation' && <p>{activity.expedit}</p>}
                                {activity.type === 'loan' && (
                                    <div>
                                        <p>
                                            {activity.expedit} - {activity.return ? activity.return : t('ui.loans.columns.borrowed')}
                                        </p>
                                        <p>{t('ui.loans.columns.end_loan') + ': ' + activity.end}</p>
                                        <p>
                                            {activity.overdue
                                                ? Math.abs(activity.days_overdue) > 1
                                                    ? t('ui.loans.overdue.more') + Math.abs(activity.days_overdue)
                                                    : t('ui.loans.overdue.one') + Math.abs(activity.days_overdue)
                                                : t('ui.loans.overdue.false')}
                                        </p>
                                    </div>
                                )}
                            </VerticalTimelineElement>
                        );
                    })}
                </VerticalTimeline>
    );
}