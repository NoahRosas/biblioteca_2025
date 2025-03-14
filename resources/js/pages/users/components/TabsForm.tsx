import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useTranslations } from "@/hooks/use-translations"
import { UserForm, UserFormProps } from "./UserForm"
import { RoleForm } from "./RoleForm"



export function TabsForm({ initialData, page, perPage }: UserFormProps) {
    const { t } = useTranslations();
    
  return (
    <div className="inset-0 flex justify-center items-center ">
      <Tabs defaultValue="create_account" className="w-[800px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="create_user" autoFocus={true}>{t('ui.users.tabs.basic_information')}</TabsTrigger>
          <TabsTrigger value="create_role">{t('ui.users.tabs.roles')}</TabsTrigger>
        </TabsList>
        <TabsContent value="create_user">
          <Card>
            <CardContent className="space-y-2">
              <UserForm 
                initialData={initialData}
                page={page}
                perPage={perPage}
                  />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="create_role">
          <Card>
            <CardContent className="space-y-2">
              <RoleForm/>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
