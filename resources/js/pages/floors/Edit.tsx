
import { PageProps } from "@inertiajs/core";
import { useTranslations } from "@/hooks/use-translations";
import { FloorLayout } from "@/layouts/floors/FloorLayout";
import { FloorForm } from "./components/FloorForm";
import { Building } from "lucide-react";


interface EditFloorProps extends PageProps {
  floor: {
    id: string;
    name: string;
    max_zones: number;

  };

  floors:string[];
  page?: string;
  perPage?: string;
}

export default function EditFloor({ floor, page, perPage, floors}: EditFloorProps) {
  const { t } = useTranslations();

  return (
    <FloorLayout title={t('ui.floors.edit')}>
    <h3 className="mr-auto mb-4 ml-auto flex mt-2">
        <Building className="mr-2" />
        {t('ui.floors.edit')}
    </h3>
    <FloorForm initialData={floor} page={page} perPage={perPage} floors={floors}/>
</FloorLayout>
  );
}