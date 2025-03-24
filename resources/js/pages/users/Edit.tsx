import { UserLayout } from "@/layouts/users/UserLayout";
import { PageProps } from "@inertiajs/core";
import { useTranslations } from "@/hooks/use-translations";
import { User } from "lucide-react";
import { UserForm } from "./components/UserForm";

interface EditUserProps extends PageProps {
  user: {
    id: string;
    name: string;
    email: string;
    role:string;
  };
  roles?: string[];
  permisos?: string[];
  userPermits? : string[];
  page?: string;
  perPage?: string;
}

export default function EditUser({ user, page, perPage, permisos, roles, userPermits}: EditUserProps) {
  const { t } = useTranslations();

 
  return (
    <UserLayout title={t("ui.users.edit")}>
      <div className="flex justify-center items-center min-h-screen">
        <div className="p-6 w-full max-w-2xl">
          <h3 className="flex mb-2"><User className="mr-2"/>{t("ui.users.edit")}</h3>
          <div className="max-w-xl">
            <UserForm permisos={permisos} userPermits={userPermits} roles={roles} initialData={user} page={page} perPage={perPage}/>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}