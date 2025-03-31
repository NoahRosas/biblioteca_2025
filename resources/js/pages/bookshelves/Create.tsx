import { useTranslations } from "@/hooks/use-translations";
import { Cuboid } from "lucide-react";

import { PageProps } from "@/types";
import { BookshelfForm } from "./components/BookshelfForm";
import { BookshelfLayout } from "@/layouts/bookshelves/BookshelfLayout";
import { Zone } from "@/hooks/zones/useZones";


interface CreateBookshelfProps extends PageProps{
    floors: {
        id:string,
        name:string
    }[];
    zones: Zone[];
    
}

export default function CreateFloor({floors, zones}:CreateBookshelfProps) {
  const { t } = useTranslations();
  return (
        <BookshelfLayout title={t('ui.bookshelves.create')}>
            <h3 className="flex ml-auto mr-auto mt-2 mb-1">
                <Cuboid className="mr-1 " />
                {t('ui.bookshelves.create')}
                
            </h3>
            <p className="text-s text-center mb-2 text-muted-foreground">{t('ui.bookshelves.extra_info.create_zone')}</p>
            <BookshelfForm floors={floors} zones={zones}/>
        </BookshelfLayout>
  );
}