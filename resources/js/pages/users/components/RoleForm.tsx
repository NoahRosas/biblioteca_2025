import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTranslations } from '@/hooks/use-translations';
import { router } from '@inertiajs/react';
import type { AnyFieldApi } from '@tanstack/react-form';
import { useForm } from '@tanstack/react-form';
import { useQueryClient } from '@tanstack/react-query';
import { FileText, PackageOpen, Settings, Shield, User } from 'lucide-react';
import { forwardRef, ReactNode, useEffect, useImperativeHandle, useState } from 'react';
import { toast } from 'sonner';

interface RoleFormProps {
    roleInitialData?: {
        id: string;
        role: string;
        permisos: Record<string, Record<string, boolean | string>>;
    };
    roles?: string[];
    permisos?: [string, string][];
    page?: string;
    perPage?: string;
}
function getCategoryIcon(category: string): ReactNode {
    switch (category) {
        case 'users':
            return <User size="19px" className="text-chart-1 mr-2" />;

        case 'products':
            return <PackageOpen size="19px" className="text-chart-1 mr-2" />;

        case 'reports':
            return <FileText size="19px" className="text-chart-1 mr-2" />;

        case 'settings':
            return <Settings size="19px" className="text-chart-1 mr-2" />;

        default:
            return 0;
    }
}

function FieldInfo({ field }: { field: AnyFieldApi }) {
    return (
        <>
            {field.state.meta.isTouched && field.state.meta.errors.length ? (
                <p className="text-destructive mt-1 text-sm">{field.state.meta.errors.join(', ')}</p>
            ) : null}
            {field.state.meta.isValidating ? <p className="text-muted-foreground mt-1 text-sm">Validating...</p> : null}
        </>
    );
}

export const RoleForm = forwardRef(({ roleInitialData, page, perPage, roles, permisos }: RoleFormProps, ref) => {
    const { t } = useTranslations();
    const queryClient = useQueryClient();
    const [selectRole, setSelectRole] = useState<string>(roleInitialData?.role ?? '');

    const permisosPorCategoria = permisos?.reduce((acc, [categoria, accion]) => {
        if (!acc[categoria]) {
          acc[categoria] = {}; // Si no existe la categoría, la creamos
        }
        acc[categoria][accion] = false; // Inicializamos cada acción como `false`
        return acc;
      }, {} as Record<string, Record<string, boolean>>);
      
    const form = useForm({
        defaultValues: {
            role: roleInitialData?.role ?? '',
            permisos: roleInitialData?.permisos ?? '',
        },
        onSubmit: async ({ value }) => {
            const options = {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ['roles'] });
                    let url = '/roles';
                    if (page) url += `?page=${page}${perPage ? `&per_page=${perPage}` : ''}`;
                    router.visit(url);
                },
                onError: () => {
                    toast.error(roleInitialData ? t('messages.roles.error.update') : t('messages.roles.error.create'));
                },
            };
            roleInitialData ? router.put(`/roles/${roleInitialData.id}`, value, options) : router.post('/roles', value, options);
        },
    });

    useImperativeHandle(ref, () => ({
        submitForm: () => {
            form.handleSubmit();
        },
    }));

    useEffect(() => {
        if (roleInitialData?.role) setSelectRole(roleInitialData.role);
    }, [roleInitialData]);

    return (
        <form onSubmit={form.handleSubmit} className="space-y-4" noValidate>
            <div>
                <form.Field name="role">
                    {(field) => (
                        <>
                            <div className="flex">
                                <Shield className="text-chart-1 mb-2" />
                                <Label htmlFor="role" className="mt-1 ml-2">
                                    {t('ui.users.fields.role')}
                                </Label>
                            </div>
                            <Select
                                value={selectRole}
                                onValueChange={(value) => {
                                    setSelectRole(value);

                                    // Verificamos si el rol seleccionado existe en el array de roles
                                    if (roles?.includes(value)) {
                                        form.setFieldValue('permisos', {}); // Aquí asigna los permisos correctos si los tienes
                                    }

                                    field.setValue(value);
                                }}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder={t('ui.users.fields.role')} />
                                </SelectTrigger>
                                <SelectContent>
                                    {roles?.map((role) => (
                                        <SelectItem key={role} value={role}>
                                            {t(`ui.users.roles.${role}`)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FieldInfo field={field} />
                        </>
                    )}
                </form.Field>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
                {Object.entries(permisosPorCategoria??{}).map(([category, actions]) => (
                    <div key={category} className="rounded-lg p-4 shadow">
                        {getCategoryIcon(category)}

                        <Label className="mt-1">{t(`ui.users.permissions.${category}.title`)}</Label>
                        <br />
                        {Object.keys(actions).map((action) => (
                            <form.Field key={action} name={`permisos.${category}.${action}`}>
                                {(field) => (
                                    <>
                                        <div className="mt-2 flex items-center">
                                            <Checkbox
                                                id={field.name}
                                                checked={Boolean(field.state.value)}
                                                onCheckedChange={(checked) => field.setValue(checked === true)}
                                            />
                                            <br />
                                            <Label htmlFor={field.name} className="ml-2">
                                                {t(`ui.users.permissions.${category}.${action}`)}
                                            </Label>
                                            <FieldInfo field={field} />
                                        </div>
                                    </>
                                )}
                            </form.Field>
                        ))}
                    </div>
                ))}
            </div>
        </form>
    );
});
