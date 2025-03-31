import { useTranslations } from "@/hooks/use-translations";

import { Cuboid } from "lucide-react";

import { PageProps } from "@/types";
import { BookshelfLayout } from "@/layouts/bookshelves/BookshelfLayout";
import { BookshelfForm } from "./components/BookshelfForm";
import { Zone } from "@/hooks/zones/useZones";


interface EditBookshelfProps extends PageProps{
    bookshelf: {
        id:string,
        number:number,
        max_books:number,
        zone_id:string, 
        floor_id:string
    };
    page?: string;
    perPage?: string;
    floors: {
        id:string,
        name:string
    }[];
    zones: Zone[];

}

export default function EditBookshelf({bookshelf, page, perPage, floors, zones}:EditBookshelfProps) {
  const { t } = useTranslations();
  return (
        <BookshelfLayout title={t('ui.zones.edit')}>
            <h3 className="flex ml-auto mr-auto mt-2 mb-1">
                <Cuboid className="mr-1 " />
                {t('ui.zones.edit')}
                
            </h3>
            <p className="text-s text-center mb-2 text-muted-foreground">{t('ui.zones.extra_info.edit_zone')}</p>
            <BookshelfForm initialData={bookshelf} page={page} perPage={perPage} floors={floors} zones={zones} />
        </BookshelfLayout>
  );
}