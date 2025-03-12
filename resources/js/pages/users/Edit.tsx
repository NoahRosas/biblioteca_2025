import { UserForm } from "@/pages/users/components/UserForm";
import { UserLayout } from "@/layouts/users/UserLayout";
import { PageProps } from "@inertiajs/core";
import { useTranslations } from "@/hooks/use-translations";
import { User } from "lucide-react";
import { TabsForm } from "./components/TabsForm";

interface EditUserProps extends PageProps {
  user: {
    id: string;
    name: string;
    email: string;
  };
  page?: string;
  perPage?: string;
}

export default function EditUser({ user, page, perPage }: EditUserProps) {
  const { t } = useTranslations();

 
  return (
   
    <UserLayout title={t("ui.users.edit")}>
      <div className="p-6">
      <h3 style={{display: "flex", marginBottom: "1em"}}><User/>{t("ui.users.edit")}</h3>
        <div className="max-w-xl">
          <TabsForm initialData={user} page={page} perPage={perPage}/>
        </div>
      </div>
    </UserLayout>
  );
}
