import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { useTranslations } from '@/hooks/use-translations';
import { FloorLayout } from '@/layouts/floors/FloorLayout';
import { PageProps } from '@/types';
import { Cuboid, PlusIcon } from 'lucide-react';

interface Zone {
    id: string;
    name: string;
    max_bookshelves: number;
}

interface Floor {
    id: string;
    name: string;
    max_zones: number;
    count: number;
    zones: Zone[];
}

interface IndexFloorProps extends PageProps {
    floors: Floor[];
}

export default function FloorsIndex({ floors }: IndexFloorProps) {
    const { t } = useTranslations();

    const floorList = floors.map((floor) => (
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value={floor.name} key={floor.id}>
                <AccordionTrigger>
                    <Cuboid  />
                    {t(`ui.floors.titles.${floor.name}`)}
                </AccordionTrigger>
                <AccordionContent>
                    {t(`ui.floors.descriptions.${floor.name}`)}
                    <div>
                        {floor.count}/{floor.max_zones}
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    ));

    return (
        <FloorLayout title={t('ui.floors.title')} floors={floors}>
            <div className="p-6">
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-bold">{t('ui.floors.title')}</h1>
                        <Button>
                            <PlusIcon className="mr-2 h-4 w-4" />
                            {t('ui.floors.buttons.new')}
                        </Button>
                    </div>
                    <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">{floorList}</div>
                </div>
            </div>
        </FloorLayout>
    );
}
