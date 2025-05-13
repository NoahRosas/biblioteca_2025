import { useTranslations } from "@/hooks/use-translations";
import { ReservationLayout } from "@/layouts/reservations/ReservationLayout";



import { ScrollText } from "lucide-react";
import { ReservationForm } from "./components/ReservationForm";
import { PageProps } from "@/types";

interface CreateReservationProps extends PageProps{
  user_emails:{
    email: string;
  }[];
}

export default function CreateReservation({user_emails}:CreateReservationProps) {
  const { t } = useTranslations();
  return (
        <ReservationLayout title={t('ui.reservations.create')}>
            <h3 className="flex ml-auto mr-auto mt-2 mb-1">
                <ScrollText className="mr-1 " />
                {t('ui.reservations.create')}
                
            </h3>
            <p className="text-s text-center mb-2 text-muted-foreground">{t('ui.reservations.extra_info.create')}</p>
            <ReservationForm user_emails={user_emails}/>
        </ReservationLayout>
  );
}