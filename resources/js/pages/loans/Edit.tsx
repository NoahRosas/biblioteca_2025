import { useTranslations } from "@/hooks/use-translations";
import { LoanLayout } from "@/layouts/loans/LoanLayout";

import { PageProps } from "@/types";
import { Handshake } from "lucide-react";
import { LoanForm } from "./components/LoanForm";





interface EditLoansProps extends PageProps{
    loan:{
        id: string;
        user_email: string;
        book_id: string;
        end_loan: Date;
    }

    page?: string;
    perPage?: string;

}

export default function EditLoan({loan}:EditLoansProps) {
  const { t } = useTranslations();
  return (
        <LoanLayout title={t('ui.loans.edit')}>
            <h3 className="flex ml-auto mr-auto mt-2 mb-1">
                <Handshake className="mr-1 " />
                {t('ui.loans.edit')}
                
            </h3>
            <p className="text-s text-center mb-2 text-muted-foreground">{t('ui.loans.extra_info.edit')}</p>
            <LoanForm initialData={loan}/>
        </LoanLayout>
  );
}