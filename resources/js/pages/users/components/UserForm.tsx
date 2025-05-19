import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTranslations } from '@/hooks/use-translations';
import { router } from '@inertiajs/react';
import { AnyFieldApi, useForm } from '@tanstack/react-form';
import { useQueryClient } from '@tanstack/react-query';
import { Eye, EyeClosed, FileText, Lock, Mail, PackageOpen, Save, Settings, Shield, User, Users, X } from 'lucide-react';
import { ReactNode, useState } from 'react';
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
  } from "@/components/ui/card"
  import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"


// Tipado de las props
export interface UserFormProps {
    initialData?: {
        id: string;
        name: string;
        email: string;
        role: string;
    };
    roles?: string[];
    permisos?: string[];
    userPermits?:string[];
    page?: string;
    perPage?: string;
}


let selectRole: string;
selectRole = '';
// Field error display component
function FieldInfo({ field }: { field: AnyFieldApi }) {
    return (
        <>
            {field.state.meta.isTouched && field.state.meta.errors.length ? (
                <p className="text-destructive mt-1 text-sm">{field.state.meta.errors.join(', ')}</p>
            ) : null}
        </>
    );
}
function getCategoryIcon(category: string): ReactNode {
    switch (category) {
        case 'users':
            return <Users size="19px" className="text-blue-700 mr-2" />;

        case 'products':
            return <PackageOpen size="19px" className="text-blue-700 mr-2" />;

        case 'reports':
            return <FileText size="19px" className="text-blue-700 mr-2" />;

        case 'settings':
            return <Settings size="19px" className="text-blue-700 mr-2" />;

        default:
            return 0;
    }
}

export function UserForm({ initialData, page, perPage, permisos, roles, userPermits}: UserFormProps) {
    let permisosUsuario: string[];
    permisosUsuario = userPermits ? userPermits : [];
    const { t } = useTranslations();
    const queryClient = useQueryClient();
    const [selectedRole, setSelectRole] = useState<string>(initialData?.role ?? '');
    const [listaPermisosUsuario, setLista] = useState(permisosUsuario);
    const [showPassword, setShowPassword] = useState(false);
    
    let arrayRoles : string[];
    arrayRoles = [];
    
    roles?.forEach(element => {
        if (!arrayRoles.includes(element[0])) {
            arrayRoles.push(element[0]);
        }
    });

    //  console.log(arrayRoles);

    function handleOnClickPermits(permit: string) {
        if (!listaPermisosUsuario.includes(permit)) {
            setLista([...listaPermisosUsuario, permit]);
        } else {
            setLista(listaPermisosUsuario.filter((a) => a !== permit));
        }
        console.log(permit);
        console.log(listaPermisosUsuario);
    }


    function fSelectRole(valor: string) {
        selectRole = valor;
        setSelectRole(valor);
        console.log(valor);

        setLista([]);

        let newPermissions: string[];
        newPermissions = [];

        roles?.forEach((rolName) => {
            if (rolName[0].includes(valor)) {
                console.log(`Rol encontrado: ${rolName[0]}`);
                newPermissions.push(rolName[1]);
            }
        });

        setLista(newPermissions);
        
        console.log("Permisos del usuario", listaPermisosUsuario);
    }
    // console.log('Estos son los permisos', userPermits);
    const permissionsByCategory = permisos?.reduce(
        (acc, [categoria, accion]) => {
            if (!acc[categoria]) {
                acc[categoria] = [];
            }
            if (!acc[categoria].includes(accion)) {
                acc[categoria].push(accion);
            }
            
            return acc;
        },
        {} as Record<string, string[]>,
    );

    
    const form = useForm({
        defaultValues: {
            name: initialData?.name ?? '',
            email: initialData?.email ?? '',
            password: '',
            role: initialData?.role ?? '',
            permits: [""],
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
        
        form.setFieldValue("permits", listaPermisosUsuario);
        form.handleSubmit();
    };

    return (
        <div className="inset-0 flex items-center justify-center">
        
            <Tabs defaultValue="create_account" className="w-full max-w-[600px] px-4">
                <TabsList className="grid h-[50px] w-full grid-cols-2 ">
                    <TabsTrigger value="create_user" autoFocus={true}>
                        {t('ui.users.tabs.basic_information')}
                        </TabsTrigger>
                    <TabsTrigger  value="create_role">
                        {t('ui.users.tabs.roles')}
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="create_user">
                    <Card>
                        <CardContent >
                            <form onSubmit={form.handleSubmit} noValidate>
                                {/* Name field */}
                                <div className='space-y-1'>
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
                                                <div className='flex mb-2'>
                                                    <User size={'17px'} />
                                                    <Label htmlFor="name" className="ml-1 mt-1">
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
                                <div className='space-y-1'>
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
                                                <div className='flex mb-2 mt-3'>
                                                    <Mail size={'17px'} />
                                                    <Label htmlFor={field.name} className="ml-1 mt-0.5">
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
                                <div className='space-y-1'>
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
                                                <div className='flex mb-2 mt-3'>
                                                    <Lock size={'17px'} />
                                                    <Label htmlFor={field.name} className="ml-1 mt-1">
                                                        {initialData ? t('ui.users.fields.password_optional') : t('ui.users.fields.password')}

                                                    </Label>
                                                </div>                                                                                               
                                            <div className='relative w-full '>
                                                <Input
                                                    id={field.name}
                                                    name={field.name}
                                                    type={showPassword ? 'text' : 'password'}
                                                    value={field.state.value}
                                                    onChange={(e) => field.handleChange(e.target.value)}
                                                    onBlur={field.handleBlur}
                                                    placeholder={t('ui.users.placeholders.password')}
                                                    disabled={form.state.isSubmitting}
                                                    autoComplete="off"
                                                    required={false}
                                                    className='flex'
                                                    
                                                />
                                                <button type='button' className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700" onClick={() => setShowPassword(!showPassword)}>
                                                    { !showPassword ? <EyeClosed className='flex'/> : <Eye/> }
                                                </button>
                                            </div>
                                                <FieldInfo field={field} />
                                            </>
                                        )}
                                    </form.Field>
                                    {!initialData && <p className="text-muted-foreground mt-2 text-xs">{t('ui.settings.password.secure_message')}</p>}
                                </div>
                            </form>
                        </CardContent>
                        <CardFooter className='flex justify-between'>
                            {/* Form buttons */}
                            
                                
                                    <Button
                                    // className='flex'
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
                                        <X size={'20px'} className='mr-1 '/>
                                        {t('ui.users.buttons.cancel')}
                                    </Button>
                                
                                
                                    <Button type="submit" className='bg-blue-500 hover:bg-blue-700' onClick={handleSubmit}>
                                        <Save size={'20px'} className=' mr-1'/>
                                        {initialData ? t('ui.users.buttons.update') : t('ui.users.buttons.save')}
                                    </Button>
                                
                           
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="create_role">
                    <Card>
                        <CardContent className="space-y-2">
                            <form onSubmit={form.handleSubmit} noValidate>
                                <div className='space-y-1'>
                                    <form.Field name="role">
                                        {(field) => (
                                            <>
                                                <div className="flex">
                                                    <Shield className="text-blue-700 mb-2" />
                                                    <Label htmlFor="role" className="mt-1 ml-2">
                                                        {t('ui.users.fields.role')}
                                                    </Label>
                                                </div>

                                                <Select name="role" value={selectRole} onValueChange={(value) => fSelectRole(value)}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder={t('ui.users.fields.role')} />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {arrayRoles?.map((role) => (
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
                                    {Object.entries(permissionsByCategory ?? {}).map(([category, actions]) => (
                                        
                                        <div key={category} className="rounded-lg p-4 border bg-gray-100 dark:bg-gray-900">
                                            <div className='flex mb-4'>
                                                    {getCategoryIcon(category)}
                                                <Label className="mt-1 ">{t(`ui.users.permissions.${category}.title`)}</Label>
                                            </div>
      
                                            {Object.keys(actions).map((action) => (
                                                <form.Field key={action} name="permits">
                                                    {(field) => (
                                                        <>                                                  
                                                            <div className="mt-2 flex items-center">
                                                                
                                                                <Checkbox
                                                                    id={`${category}.${actions[action]}`}
                                                                    name={`${field.name}.${category}.${actions[action]}`}
                                                                    checked={listaPermisosUsuario.includes(`${category}.${actions[action]}`)}
                                                                    value={`${category}.${actions[action]}`}
                                                                    onClick={(e) => handleOnClickPermits(e.currentTarget.value)}
                                                                    className='border-blue-700'
                                                                />
                                                                <br />
                                                                <Label htmlFor={field.name} className="ml-2">
                                                                    {t(`ui.users.permissions.${category}.${actions[action]}`)}
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
                        </CardContent>
                        <CardFooter className='flex justify-between'>
                            {/* Form buttons */}
                                                    
                                    <Button
                                    className='flex'
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
                                        <X size={'20px'} className='mr-1 '/>
                                        {t('ui.users.buttons.cancel')}
                                    </Button>
                                
                                
                                    <Button type="submit" className='bg-blue-500 hover:bg-blue-700' onClick={handleSubmit}>
                                        <Save size={'20px'} className=' mr-1 '/>
                                        {initialData ? t('ui.users.buttons.update') : t('ui.users.buttons.save')}
                                    </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}