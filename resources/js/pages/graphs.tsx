import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useTranslations } from '@/hooks/use-translations';
import { GraphLayout } from '@/layouts/graphs/graph-layout';
import { PageProps } from '@/types';
import { ChartColumnIncreasing } from 'lucide-react';
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface GraphDataProps extends PageProps {
    books: any[];
    users: any[];
    zones: any[];
}

export default function Graphs({ books, users, zones }: GraphDataProps) {
    const { t } = useTranslations();

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="custom-tooltip bg-primary text-primary-foreground flex max-w-100 flex-col items-center rounded-md p-1 shadow-md max-sm:max-h-40 max-sm:w-64 max-sm:overflow-auto">
                    <h4 className="text-center text-[20px] font-semibold max-sm:text-sm">
                        {data.number ? `${data.number} - ${t(`ui.genres.names.${data.name}`)}` : `${data.name}`}
                    </h4>
                    {data.floor_id ? (
                        <p className="label mt-1 text-[16px] max-sm:text-xs">{`${t('ui.zones.columns.floor_id')}: ${data.floor_name}`}</p>
                    ) : data.author ? (
                        <p className="label mt-1 text-[16px] max-sm:text-xs">
                            {t('ui.books.by')} {data.author}
                        </p>
                    ) : data.email ? (
                        <p className="label mt-1 text-[16px] max-sm:text-xs">{data.email}</p>
                    ) : null}
                    {data.ISBN ? <p className="label mt-1 text-[16px] max-sm:text-xs">{`${t('ui.books.columns.ISBN')} : ${data.ISBN}`}</p> : null}
                    <p className="label mt-1 text-[14px] max-sm:text-xs" style={{ color: payload[1].fill }}>
                        {`${t('ui.reservations.title')} : ${data.reservations_count}`}
                    </p>
                    <p className="label mt-1 text-[14px] max-sm:text-xs" style={{ color: payload[0].fill }}>
                        {`${t('ui.loans.title')} : ${data.loans_count}`}
                    </p>
                </div>
            );
        }

        return null;
    };

    return (
        <GraphLayout title={t('ui.graphs.title')}>
            <div className="flex min-h-screen flex-col items-center max-w-8xl">
                <h2 className="mt-6 flex items-center justify-center text-3xl font-bold">
                    <ChartColumnIncreasing className="mr-2" />
                    {t('ui.graphs.title')}
                </h2>
                <div className="max-w-8xl flex w-full flex-col items-center justify-center ">
                    <h3 className="mt-15 mb-4 text-center text-lg font-semibold">{t('ui.graphs.section.books')}</h3>
                    <ResponsiveContainer width="100%" height={400}>
                        <ScrollArea className="mx-auto w-full lg:max-w-[1200px] sm: max-w-[700px] rounded-md border whitespace-nowrap">
                            <div className="min-w-[1200px]">
                                <BarChart
                                    width={1200}
                                    height={400}
                                    data={books}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 50,
                                    }}
                                >
                                    <XAxis dataKey="index" height={100}  />
                                    <YAxis allowDecimals={false} />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'var(--primary)',
                                            color: 'var(--primary-foreground)',
                                            borderRadius: '6px',
                                        }}
                                        content={CustomTooltip}
                                    />
                                    <Legend />
                                    <Bar dataKey="loans_count" barSize={50} stackId="a" fill="#2144cf" name={t('ui.loans.title')} />
                                    <Bar dataKey="reservations_count" barSize={50} fill="#a71dd1" stackId="a" name={t('ui.reservations.title')} />
                                </BarChart>
                            </div>
                            <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                    </ResponsiveContainer>
                </div>
                <div className="max-w-8xl flex w-full flex-col items-center justify-center px-4">
                    <h3 className="mt-15 mb-4 text-center text-lg font-semibold">{t('ui.graphs.section.users')}</h3>
                    <div className="max-w-8xl flex w-full items-center justify-center px-4">
                        <ResponsiveContainer width="100%" height={400}>
                            <ScrollArea className="mx-auto w-full lg:max-w-[1200px] sm: max-w-[700px] rounded-md border whitespace-nowrap">
                                <div className="min-w-[1200px]">
                                    <BarChart
                                    width={1200}
                                    height={400}
                                    data={users}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 50,
                                    }}
                                >
                                    <XAxis dataKey="index" height={100}  />
                                    <YAxis allowDecimals={false} />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'var(--primary)',
                                            color: 'var(--primary-foreground)',
                                            borderRadius: '6px',
                                        }}
                                        content={CustomTooltip}
                                    />
                                    <Legend />
                                    <Bar dataKey="loans_count" barSize={50} stackId="a" fill="#2144cf" name={t('ui.loans.title')} />
                                    <Bar dataKey="reservations_count" barSize={50} fill="#a71dd1" stackId="a" name={t('ui.reservations.title')} />
                                </BarChart>
                                </div>
                                <ScrollBar orientation="horizontal" />
                            </ScrollArea>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="max-w-8xl flex w-full flex-col items-center justify-center px-4">
                    <h3 className="mt-15 mb-4 text-center text-lg font-semibold">{t('ui.graphs.section.zones')}</h3>
                    <div className="max-w-8xl flex w-full items-center justify-center px-4">
                        <ResponsiveContainer width="100%" height={400}>
                            <ScrollArea className="mx-auto w-full lg:max-w-[1200px] sm: max-w-[700px] rounded-md border whitespace-nowrap">
                                <div className="min-w-[1200px]">
                                    <BarChart
                                    width={1200}
                                    height={400}
                                    data={zones}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 50,
                                    }}
                                >
                                    <XAxis dataKey="index" height={100}  />
                                    <YAxis allowDecimals={false}/>
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'var(--primary)',
                                            color: 'var(--primary-foreground)',
                                            borderRadius: '6px',
                                        }}
                                        content={CustomTooltip}
                                    />
                                    <Legend />
                                    <Bar dataKey="loans_count" barSize={50} stackId="a" fill="#2144cf" name={t('ui.loans.title')} />
                                    <Bar dataKey="reservations_count" barSize={50} fill="#a71dd1" stackId="a" name={t('ui.reservations.title')} />
                                </BarChart>
                                </div>
                                <ScrollBar orientation="horizontal" />
                            </ScrollArea>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </GraphLayout>
    );
}
