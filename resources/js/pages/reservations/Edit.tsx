import { useTranslations } from "@/hooks/use-translations";
import { ReservationLayout } from "@/layouts/reservations/ReservationLayout";
import { PageProps } from "@/types";
import { ScrollText } from "lucide-react";
import { ReservationForm } from "./components/ReservationForm";



interface EditReservationProps extends PageProps{
    reservation:{
        id: string;
        book_id: string;
    }
    user_email:string;
    page?: string;
    perPage?: string;

}

export default function EditLoan({reservation, user_email}:EditReservationProps) {
  const { t } = useTranslations();
  return (
        <ReservationLayout title={t('ui.reservations.edit')}>
            <h3 className="flex ml-auto mr-auto mt-2 mb-1">
                <ScrollText className="mr-1 " />
                {t('ui.reservations.edit')}
                
            </h3>
            <p className="text-s text-center mb-2 text-muted-foreground">{t('ui.reservations.extra_info.edit')}</p>
            <ReservationForm initialData={reservation} user_email={user_email}/>
        </ReservationLayout>
  );
}