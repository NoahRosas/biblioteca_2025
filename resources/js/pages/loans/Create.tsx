import { useTranslations } from "@/hooks/use-translations";
import { LoanLayout } from "@/layouts/loans/LoanLayout";

import { Building } from "lucide-react";
import { LoanForm } from "./components/LoanForm";



export default function CreateFloor() {
  const { t } = useTranslations();
  return (
        <LoanLayout title={t('ui.loans.create')}>
            <h3 className="flex ml-auto mr-auto mt-2 mb-1">
                <Building className="mr-1 " />
                {t('ui.loans.create')}
                
            </h3>
            <p className="text-s text-center mb-2 text-muted-foreground">{t('ui.loans.extra_info.create')}</p>
            <LoanForm />
        </LoanLayout>
  );
}