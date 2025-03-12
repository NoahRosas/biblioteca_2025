import { UserForm } from "@/pages/users/components/UserForm";
import { UserLayout } from "@/layouts/users/UserLayout";
import { useTranslations } from "@/hooks/use-translations";
import { User } from "lucide-react";
import { TabsForm } from "./components/TabsForm";

export default function CreateUser() {
  const { t } = useTranslations();

  return (

    
    <UserLayout title={t("ui.users.create")}> 
      <div className="p-6">
        <h3 style={{display: "flex", marginBottom: "5px"}}><User color="blue"/>{t("ui.users.create")}</h3>
        <p style={{fontSize: "smaller" , marginBottom: "2em",  color: "#8D959C"}}>{t("ui.users.extra_info.create_user")}</p>
        <div className="max-w-xl">
          <TabsForm/>
        </div>
      </div>
    </UserLayout>
  );
}
