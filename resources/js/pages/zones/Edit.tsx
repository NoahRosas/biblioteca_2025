import { useTranslations } from "@/hooks/use-translations";
import { ZoneLayout } from "@/layouts/zones/ZoneLayout";
import { Cuboid } from "lucide-react";
import { ZoneForm } from "./components/ZoneForm";
import { PageProps } from "@/types";


interface EditZoneProps extends PageProps{
    zone: {
        id:string,
        name:string,
        max_bookshelves:number,
        floor_id:string
    };
    page?: string;
    perPage?: string;
    floors: {
        id:string,
        name:string
    }[];
    genres: {
        id:string,
        name:string
    }[];
}

export default function EditZone({zone, page, perPage, floors, genres}:EditZoneProps) {
  const { t } = useTranslations();
  return (
        <ZoneLayout title={t('ui.zones.edit')}>
            <h3 className="flex ml-auto mr-auto mt-2 mb-1">
                <Cuboid className="mr-1 " />
                {t('ui.zones.edit')}
                
            </h3>
            <p className="text-s text-center mb-2 text-muted-foreground">{t('ui.zones.extra_info.edit_zone')}</p>
            <ZoneForm initialData={zone} page={page} perPage={perPage} floors={floors} genres={genres} />
        </ZoneLayout>
  );
}