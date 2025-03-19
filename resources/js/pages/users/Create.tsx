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
    <UserLayout title={t("ui.users.create")}>
      <div className="flex justify-center items-center min-h-screen">
        <div className="p-6 w-full max-w-2xl">
        <h3 className="flex" ><User className="mr-2"/>{t("ui.users.create")}</h3>
        <p className="mb-2 text-s text-muted-foreground" >{t("ui.users.extra_info.create_user")}</p>
          <div className="max-w-xl">
            <UserForm permisos={permisos} roles={roles}/>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}