import { useTranslations } from "@/hooks/use-translations";
import { Container, Library} from "lucide-react";
import { PageProps } from "@/types";
import { BookshelfLayout } from "@/layouts/bookshelves/BookshelfLayout";
import { BookshelfForm } from "./components/BookshelfForm";
import { Zone } from "@/hooks/zones/useZones";


interface EditBookshelfProps extends PageProps{
    bookshelf: {
        id:string,
        number:number,
        floor_id:string
        zone_id:string, 
        max_books:number,
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
        <BookshelfLayout title={t('ui.bookshelves.edit')}>
            <h3 className="flex ml-auto mr-auto mt-2 mb-1">
                <Library className="mr-1 " />
                {t('ui.bookshelves.edit')}
                
            </h3>
            <p className="text-s text-center mb-2 text-muted-foreground">{t('ui.bookshelves.extra_info.edit')}</p>
            <BookshelfForm initialData={bookshelf} page={page} perPage={perPage} floors={floors} zones={zones} />
        </BookshelfLayout>
  );
}