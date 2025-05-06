import { useTranslations } from '@/hooks/use-translations';
import { GraphLayout } from '@/layouts/graphs/graph-layout';
import { ChartColumnIncreasing } from 'lucide-react';
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const data = [
    { name: 'Page A', uv: 400, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 100, pv: 2000, amt: 2500 },
];

export default function Graphs() {
    const { t } = useTranslations();

    const getIntroOfPage = (label: string) => {
        if (label === 'Page A') {
          return "Page A is about men's clothing";
        }
        if (label === 'Page B') {
          return "Page B is about women's dress";
        }
        if (label === 'Page C') {
          return "Page C is about women's bag";
        }
        if (label === 'Page D') {
          return 'Page D is about household goods';
        }
        if (label === 'Page E') {
          return 'Page E is about food';
        }
        if (label === 'Page F') {
          return 'Page F is about baby food';
        }
        return '';
      };
      
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
          return (
            <div className="custom-tooltip">
              <p className="label">{`${label} : ${payload[0].value}`}</p>
              <p className="intro">{getIntroOfPage(label)}</p>
              <p className="desc">Anything you want can be displayed here.</p>
            </div>
          );
        }
      
        return null;
      };
    return (
        <GraphLayout title={t('ui.graphs.title')}>
            <div className="flex min-h-screen flex-col items-center">
                <h2 className="mt-6 flex items-center justify-center text-xl">
                    <ChartColumnIncreasing className="mr-2" />
                    {t('ui.graphs.title')}
                </h2>
                <div className="flex w-full flex-1 items-center justify-center">
                    <div className="flex w-full max-w-4xl items-center justify-center px-4">
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart
                                width={500}
                                height={300}
                                data={data}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >

                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip content={<CustomTooltip active={undefined} payload={undefined} label={undefined} />} />
                                <Legend />
                                <Bar dataKey="pv" barSize={20} fill="#8884d8" />
                                <Bar dataKey="uv" barSize={20} fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </GraphLayout>
    );
}
