import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTranslations } from '@/hooks/use-translations';
import { Button } from '@headlessui/react';
import { router } from '@inertiajs/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { AnyFieldApi, useForm } from '@tanstack/react-form';
import { useQueryClient } from '@tanstack/react-query';
import { valuesIn } from 'lodash';
import { FileText, Lock, Mail, PackageOpen, Save, Settings, Shield, User, X } from 'lucide-react';
import { JSX, ReactNode, useState } from 'react';
;

// Tipado de las props
export interface UserFormProps {
    initialData?: {
        id: string;
        name: string;
        email: string;
        role:string;
        permisos:string[];
    };
    roles?: string[];
    permisos?: string[];
    page?: string;
    perPage?: string;
}
// Field error display component
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

export function UserForm({ initialData, page, perPage, permisos, roles}: UserFormProps) {
    const { t } = useTranslations();
    const queryClient = useQueryClient();
    const [selectRole, setSelectRole] = useState<string>(initialData?.role ?? '');
    let permisosUsuario : string[];
    permisosUsuario = [];
    function handleTogglePermits(permit: string) {
        
        if (!permisosUsuario.includes(permit)) {
            permisosUsuario.push(permit);
        }else{
            permisosUsuario = (permisosUsuario.filter((a) => a !== permit));
        }

        console.log(permisosUsuario);
        console.log(permit);

    }

    const permisosPorCategoria = permisos?.reduce((acc, [categoria, accion]) => {
        if (!acc[categoria]) {
          acc[categoria] = {}; 
        }
        acc[categoria][accion] = false; 
        return acc;
      }, {} as Record<string, Record<string, boolean>>);

    const form = useForm({
        defaultValues: {
            name: initialData?.name ?? '',
            email: initialData?.email ?? '',
            password: '',
            role: initialData?.role ?? '',
            permisos: initialData?.permisos ?? [''],
        },
        onSubmit: async ({ value }) => {
            const options = {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ['users'] });
                    let url = '/users';
                    if (page) {
                        url += `?page=${page}${perPage ? `&per_page=${perPage}` : ''}`;
                    }
                    router.visit(url);
                },
            };

            if (initialData) {
                router.put(`/users/${initialData.id}`, value, options);
            } else {
                router.post('/users', value, options);
            }
        },
    });

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        event.stopPropagation();
        form.handleSubmit();
    };

    return (
        <div className="inset-0 flex items-center justify-center border">
            <Tabs defaultValue="create_account" className="w-[800px]">
                <TabsList className="grid w-full grid-cols-2 light:bg-gray-200 dark:bg-gray-900">
                    <TabsTrigger className="hover:text-chart-1"  value="create_user" autoFocus={true}>
                        {t('ui.users.tabs.basic_information')}
                    </TabsTrigger>
                    <TabsTrigger className="hover:text-chart-1" value="create_role">{t('ui.users.tabs.roles')}</TabsTrigger>
                </TabsList>
                <TabsContent value="create_user">
                    <Card>
                        <CardContent className="space-y-2">
                            <form onSubmit={form.handleSubmit} className="space-y-4" noValidate>
                                {/* Name field */}
                                <div>
                                    <form.Field
                                        name="name"
                                        validators={{
                                            onChangeAsync: async ({ value }) => {
                                                await new Promise((resolve) => setTimeout(resolve, 500));
                                                return !value
                                                    ? t('ui.validation.required', { attribute: t('ui.users.fields.name').toLowerCase() })
                                                    : value.length < 2
                                                      ? t('ui.validation.min.string', {
                                                            attribute: t('ui.users.fields.name').toLowerCase(),
                                                            min: '2',
                                                        })
                                                      : undefined;
                                            },
                                        }}
                                    >
                                        {(field) => (
                                            <>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <User size={'17px'} />
                                                    <Label htmlFor="name" className="ml-2">
                                                        {t('ui.users.fields.name')}
                                                    </Label>
                                                </div>
                                                <Input
                                                    id={field.name}
                                                    name={field.name}
                                                    value={field.state.value}
                                                    onChange={(e) => field.handleChange(e.target.value)}
                                                    onBlur={field.handleBlur}
                                                    placeholder={t('ui.users.placeholders.name')}
                                                    disabled={form.state.isSubmitting}
                                                    required={false}
                                                    autoComplete="off"
                                                />
                                                <FieldInfo field={field} />
                                            </>
                                        )}
                                    </form.Field>
                                </div>

                                {/* Email field */}
                                <div>
                                    <form.Field
                                        name="email"
                                        validators={{
                                            onChangeAsync: async ({ value }) => {
                                                await new Promise((resolve) => setTimeout(resolve, 500));
                                                return !value
                                                    ? t('ui.validation.required', { attribute: t('ui.users.fields.email').toLowerCase() })
                                                    : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                                                      ? t('ui.validation.email', { attribute: t('ui.users.fields.email').toLowerCase() })
                                                      : undefined;
                                            },
                                        }}
                                    >
                                        {(field) => (
                                            <>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <Mail size={'17px'} />
                                                    <Label htmlFor={field.name} className="ml-2">
                                                        {t('ui.users.fields.email')}
                                                    </Label>
                                                </div>
                                                <Input
                                                    id={field.name}
                                                    name={field.name}
                                                    type="text"
                                                    value={field.state.value}
                                                    onChange={(e) => field.handleChange(e.target.value)}
                                                    onBlur={field.handleBlur}
                                                    placeholder={t('ui.users.placeholders.email')}
                                                    disabled={form.state.isSubmitting}
                                                    required={false}
                                                    autoComplete="off"
                                                />
                                                <FieldInfo field={field} />
                                            </>
                                        )}
                                    </form.Field>
                                </div>

                                {/* Password field */}
                                <div>
                                    <form.Field
                                        name="password"
                                        validators={{
                                            onChangeAsync: async ({ value }) => {
                                                await new Promise((resolve) => setTimeout(resolve, 500));
                                                if (!initialData && (!value || value.length === 0)) {
                                                    return t('ui.validation.required', { attribute: t('ui.users.fields.password').toLowerCase() });
                                                }
                                                if (value && value.length > 0 && value.length < 8) {
                                                    return t('ui.validation.min.string', {
                                                        attribute: t('ui.users.fields.password').toLowerCase(),
                                                        min: '8',
                                                    });
                                                }
                                                return undefined;
                                            },
                                        }}
                                    >
                                        {(field) => (
                                            <>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <Lock size={'17px'} />
                                                    <Label htmlFor={field.name} className="ml-2">
                                                        {initialData ? t('ui.users.fields.password_optional') : t('ui.users.fields.password')}
                                                    </Label>
                                                </div>

                                                <Input
                                                    id={field.name}
                                                    name={field.name}
                                                    type="password"
                                                    value={field.state.value}
                                                    onChange={(e) => field.handleChange(e.target.value)}
                                                    onBlur={field.handleBlur}
                                                    placeholder={t('ui.users.placeholders.password')}
                                                    disabled={form.state.isSubmitting}
                                                    autoComplete="off"
                                                    required={false}
                                                />
                                                <FieldInfo field={field} />
                                            </>
                                        )}
                                    </form.Field>
                                    {!initialData && <p className="text-muted-foreground mt-2 text-xs">{t('ui.settings.password.secure_message')}</p>}
                                </div>
                            </form>
                            <CardFooter>
                    {/* Form buttons */}
                    <div className="mt-6 flex items-center justify-between gap-x-6">
                        <div className='flex align-middle'>
                            <Button
                                type="button"
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
                            <Button type="submit" onClick={handleSubmit}>
                                <Save size={'20px'} />
                                {initialData ? t('ui.users.buttons.update') : t('ui.users.buttons.save')}
                            </Button>
                        </div>
                    </div>
                </CardFooter>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="create_role">
                    <Card>
                        <CardContent className="space-y-2">
                            <form onSubmit={form.handleSubmit} className="space-y-4" noValidate>
                                <div>
                                    <form.Field name='role'>
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
                                                    onValueChange={(value:String) => {
                                                        setSelectRole(String(value));

                                                        if (roles?.includes(String(value))) {
                                                            form.setFieldValue('permisos', []);
                                                        }
                                                        field.setValue(String(value));
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
                                    {Object.entries(permisosPorCategoria ?? {}).map(([category, actions]) => (
                                        <div key={category} className="rounded-lg p-4 shadow-inner">
                                            {getCategoryIcon(category)}

                                            <Label className="mt-1">{t(`ui.users.permissions.${category}.title`)}</Label>
                                            <br />
                                            {Object.keys(actions).map((action) => (
                                                <form.Field key={action} name='permisos'>
                                                    {(field) => (
                                                        <>
                                                            <div className="mt-2 flex items-center">
                                                                <Checkbox
                                                                    id={field.name}
                                                                    key={`${category}.${action}`}
                                                                    value={`${category}.${action}`}
                                                                    onClick={e => handleTogglePermits(e.currentTarget.value)}
                                                                    
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
                            <CardFooter>
                    {/* Form buttons */}
                    <div className="mt-6 flex items-center justify-between gap-x-6">
                        <div className='flex align-middle'>
                            <Button
                                type="button"
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
                            <Button type="submit" onClick={handleSubmit}>
                                <Save size={'20px'} />
                                {initialData ? t('ui.users.buttons.update') : t('ui.users.buttons.save')}
                            </Button>
                        </div>
                    </div>
                </CardFooter>
                        </CardContent>
                    </Card>
                    
                </TabsContent>
                
            </Tabs>
        </div>
    );
}
