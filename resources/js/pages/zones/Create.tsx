import { useTranslations } from "@/hooks/use-translations";
import { ZoneLayout } from "@/layouts/zones/ZoneLayout";
import { Cuboid } from "lucide-react";
import { ZoneForm } from "./components/ZoneForm";
import { PageProps } from "@/types";


interface CreateZoneProps extends PageProps{
    floors: {
        id:string,
        name:string
        zones_count:number,
        max_zones:number,
    }[];
    genres: {
        id:string,
        name:string
    }[];
}

export default function CreateFloor({floors, genres}:CreateZoneProps) {
  const { t } = useTranslations();
  return (
        <ZoneLayout title={t('ui.zones.create')}>
            <h3 className="flex ml-auto mr-auto mt-2 mb-1">
                <Cuboid className="mr-1 " />
                {t('ui.zones.create')}
                
            </h3>
            <p className="text-s text-center mb-2 text-muted-foreground">{t('ui.zones.extra_info.create_zone')}</p>
            <ZoneForm floors={floors} genres={genres} />
        </ZoneLayout>
  );
}