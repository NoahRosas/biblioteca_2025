import { UserForm } from "@/pages/users/components/UserForm";
import { UserLayout } from "@/layouts/users/UserLayout";
import { useTranslations } from "@/hooks/use-translations";
import { User } from "lucide-react";

export default function CreateUser() {
  const { t } = useTranslations();

  return (
    <UserLayout title={t("ui.users.create")}> 
      <div className="p-6">
        <h3 style={{display: "flex", marginBottom: "1em"}}><User/>{t("ui.users.create")}</h3>
        <div className="max-w-xl">
          <UserForm />
        </div>
      </div>
    </UserLayout>
  );
}
