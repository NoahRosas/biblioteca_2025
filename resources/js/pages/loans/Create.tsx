import { useTranslations } from "@/hooks/use-translations";
import { LoanLayout } from "@/layouts/loans/LoanLayout";

import { Handshake } from "lucide-react";
import { LoanForm } from "./components/LoanForm";
import { PageProps } from "@/types";

interface CreateLoanProps extends PageProps{
  lang: string;
}

export default function CreateLoan({lang}:CreateLoanProps) {
  const { t } = useTranslations();
  return (
        <LoanLayout title={t('ui.loans.create')}>
            <h3 className="flex ml-auto mr-auto mt-2 mb-1">
                <Handshake className="mr-1 " />
                {t('ui.loans.create')}
                
            </h3>
            <p className="text-s text-center mb-2 text-muted-foreground">{t('ui.loans.extra_info.create')}</p>
            <LoanForm lang={lang}/>
        </LoanLayout>
  );
}