import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslations } from '@/hooks/use-translations';
import { router } from '@inertiajs/react';
import { RoleForm } from './RoleForm';
import { UserForm, UserFormProps } from './UserForm';
import { Save, X } from 'lucide-react';
import { useRef } from 'react';
import { AnyFieldApi } from '@tanstack/react-form';

export function TabsForm({ initialData, page, perPage, roles, permisos}: UserFormProps) {
    const { t } = useTranslations();

    const userFormRef = useRef<{ handleSubmit: () => void } | null>(null);
    const roleFormRef = useRef<{ handleSubmit: () => void } | null>(null);


    const handleSubmitAll = (event: React.FormEvent) => {
      event.preventDefault();
      
      userFormRef.current?.handleSubmit();
      roleFormRef.current?.handleSubmit();
    };

    return (
        <div className="inset-0 flex items-center justify-center">
            <Tabs defaultValue="create_account" className="w-[800px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="create_user" autoFocus={true}>
                        {t('ui.users.tabs.basic_information')}
                    </TabsTrigger>
                    <TabsTrigger value="create_role">{t('ui.users.tabs.roles')}</TabsTrigger>
                </TabsList>
                <TabsContent value="create_user">
                    <Card>
                        <CardContent className="space-y-2">
                            <UserForm ref={userFormRef} initialData={initialData} page={page} perPage={perPage} />
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="create_role">
                    <Card>
                        <CardContent className="space-y-2">
                            <RoleForm roles={roles} permisos={permisos} ref={roleFormRef} />
                        </CardContent>
                    </Card>
                </TabsContent>
                <CardFooter>
                    {/* Form buttons */}
                    <div className="mt-6 flex items-center justify-between gap-x-6">
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    let url = '/users';
                                    if (page) {
                                        url += `?page=${page}`;
                                        if (perPage) {
                                            url += `&per_page=${perPage}`;
                                        }
                                    }
                                    router.visit(url);
                                }}
                            >
                                <X size={'20px'} />
                                {t('ui.users.buttons.cancel')}
                            </Button>
                        </div>
                        <div>
                          <Button type="submit" onClick={handleSubmitAll}>
                            <Save size={'20px'} />
                            {initialData ? t('ui.users.buttons.update') : t('ui.users.buttons.save')}
                          </Button>
                        </div>
                        
                    </div>
                </CardFooter>
            </Tabs>
        </div>
    );
}
