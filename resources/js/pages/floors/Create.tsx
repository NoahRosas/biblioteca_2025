
import { useTranslations } from "@/hooks/use-translations";
import { FloorLayout } from "@/layouts/floors/FloorLayout";
import { Building } from "lucide-react";
import { FloorForm } from "./components/FloorForm";


export default function CreateFloor() {
  const { t } = useTranslations();
  return (
        <FloorLayout title={t('ui.floors.create')}>
            <h3 className="flex ml-auto mr-auto mt-2 mb-1">
                <Building className="mr-1 " />
                {t('ui.floors.create')}
                
            </h3>
            <p className="text-s text-center mb-2 text-muted-foreground">{t('ui.floors.extra_info.create_floor')}</p>
            <FloorForm />
        </FloorLayout>
  );
}