import { UserLayout } from "@/layouts/users/UserLayout";
import { useTranslations } from "@/hooks/use-translations";
import { User } from "lucide-react";
import { PageProps } from "@/types";
import { UserForm } from "./components/UserForm";


interface CreateUserProps extends PageProps {
  roles?: string[];
  permisos?: string[];

}

export default function CreateUser({ permisos, roles}: CreateUserProps) {
  const { t } = useTranslations();
  return (
    <UserLayout title={t('ui.users.create')}>
            <h3 className="flex ml-auto mr-auto mt-2 mb-1">
                <User className="mr-1 " />
                {t('ui.users.create')}
            </h3>
            <p className="text-s text-center mb-2 text-muted-foreground">{t('ui.users.extra_info.create_user')}</p>
            <UserForm permisos={permisos} roles={roles} />
        </UserLayout>
  );
}