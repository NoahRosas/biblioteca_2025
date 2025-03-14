import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQueryClient } from "@tanstack/react-query";
import { router } from "@inertiajs/react";
import { toast } from "sonner";
import { useTranslations } from "@/hooks/use-translations";
import { FileText, Lock, Mail, PackageOpen, Save, Settings, Shield, User, Users, X} from 'lucide-react';
import { useForm } from "@tanstack/react-form";
import type { AnyFieldApi } from "@tanstack/react-form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox";
import React, { useState } from "react";
  


interface RoleFormProps {
    roleInitialData?: {
        id: string;
        role: string;
        permits:{
            users:{
                read: boolean|string;
                create: boolean |string;
                edit: boolean |string;
                delete: boolean |string;
            },
            products:{
                read: boolean |string;
                create:boolean |string;
                edit:boolean |string;
                delete:boolean |string;
            },
            reports:{
                read:boolean |string;
                export:boolean |string;
                print:boolean |string;
            },
            settings:{
                access: boolean |string;
                modify: boolean |string;
            }
        }
       
        
    }
    page?: string;
    perPage?: string;
}

// Field error display component
function FieldInfo({ field }: { field: AnyFieldApi }) {
    return (
        <>
            {field.state.meta.isTouched && field.state.meta.errors.length ? (
                <p className="mt-1 text-sm text-destructive">
                    {field.state.meta.errors.join(", ")}
                </p>
            ) : null}
            {field.state.meta.isValidating ? (
                <p className="mt-1 text-sm text-muted-foreground">Validating...</p>
            ) : null}
        </>
    );
}

export function RoleForm({ roleInitialData, page, perPage}: RoleFormProps) {
    const { t } = useTranslations();
    const queryClient = useQueryClient();

    // TanStack Form setup
    const form = useForm({
        defaultValues: {
            role: roleInitialData?.role ?? "",
            permits: roleInitialData?.permits ?? "",
            
        },
        onSubmit: async ({ value }) => {
            const options = {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ["users"] });

                    // Construct URL with page parameters
                    let url = "/users";
                    if (page) {
                        url += `?page=${page}`;
                        if (perPage) {
                            url += `&per_page=${perPage}`;
                        }
                    }

                    router.visit(url);
                },
                onError: (errors: Record<string, string>) => {
                    if (Object.keys(errors).length === 0) {
                        toast.error(
                            roleInitialData
                                ? t("messages.users.error.update")
                                : t("messages.users.error.create")
                        );
                    }
                },
            };
            // Submit with Inertia
            if (roleInitialData) {
                router.put(`/users/${roleInitialData.id}`, value, options);
            } else {
                
                router.post("/users", value, options);
            }           
                    },
                });

    // Form submission handler
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
    };

    const [selectRole, setSelectRole] = useState<string>("");
    
    const changeRole = (e: React.ChangeEvent<HTMLSelectElement>) =>{
        return setSelectRole(e.target.value);
    }


    return (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
           {/* Main role field */}
            <div>
                <form.Field
                    name="role"
                >
                    {(field) => (
                        <>
                            <div className="flex">
                                <Shield className="mb-2"/>
                                <Label htmlFor="name" className="ml-3 mt-1">{t("ui.users.fields.role")}
                                </Label>
                                
                            </div>
                            <Select value={selectRole}>
                                <SelectTrigger>
                                    <SelectValue placeholder={t('ui.users.fields.rol')} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="view">{t('ui.users.roles.view')}</SelectItem>
                                    <SelectItem value="student">{t('ui.users.roles.student')}</SelectItem>
                                    <SelectItem value="employee">{t('ui.users.roles.employee')}</SelectItem>
                                    <SelectItem value="admin">{t('ui.users.roles.admin')}</SelectItem>
                                </SelectContent>
                            </Select>
                            <p style={{fontSize: "small" , marginTop: "1em" , color: "#8D959C"}}>{t('ui.users.extra_info.role')}</p>
                            <FieldInfo field={field} />
                        </>
                    )}
                </form.Field>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
            <Shield className="text-chart-1"/><p style={{marginLeft:'8px'}}>{t('ui.users.fields.sp_permissions')}</p>
                
            </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                
                {/* Role fields */}
                    <div className="p-4 rounded-lg shadow">
                        <div className="flex mb-4">
                            <User size={'15px'} className="text-chart-1 mr-2"/><Label>{t('ui.users.permissions.users.title')}</Label>
                        </div>
                        
                        <form.Field
                            name="permits.users.read">
                            {(field) => (
                                <>
                                    <Checkbox id={field.name} className="border-chart-1" /><Label htmlFor={field.name} style={{marginLeft:'5px'}}>
                                        {t('ui.users.permissions.users.show')}<br/></Label>
                                    <FieldInfo field={field} />
                                </>
                            )}
                        </form.Field>
                        <form.Field
                            name="permits.users.create">
                            {(field) => (
                                <>
                                    <Checkbox id={field.name} className="border-chart-1"/><Label htmlFor={field.name} style={{marginLeft:'5px'}}>
                                        {t('ui.users.permissions.users.create')}<br/></Label>
                                    <FieldInfo field={field} />
                                </>
                            )}
                        </form.Field>
                        <form.Field
                            name="permits.users.edit">
                            {(field) => (
                                <>
                                    <Checkbox id={field.name} className="border-chart-1"/><Label htmlFor={field.name} style={{marginLeft:'5px'}}>
                                        {t('ui.users.permissions.users.edit')}<br/></Label>
                                    <FieldInfo field={field} />
                                </>
                            )}
                        </form.Field>
                        <form.Field
                            name="permits.users.delete">
                            {(field) => (
                                <>
                                    <Checkbox id={field.name} className="border-chart-1"/><Label htmlFor={field.name} style={{marginLeft:'5px'}}>
                                        {t('ui.users.permissions.users.delete')}<br/></Label>
                                    <FieldInfo field={field} />
                                </>
                            )}
                        </form.Field>
                    </div>
                    <div className="p-4 rounded-lg shadow">
                    <div className="flex mb-4">
                            <PackageOpen size={'15px'} className="text-chart-1 mr-2"/><Label>{t('ui.users.permissions.products.title')}</Label>
                        </div>
                        <form.Field
                            name="permits.products.read">
                            {(field) => (
                                <>
                                    <Checkbox id={field.name} className="border-chart-1"/><Label htmlFor={field.name} style={{marginLeft:'5px'}}>
                                        {t('ui.users.permissions.products.show')}<br/></Label>
                                    <FieldInfo field={field} />
                                </>
                            )}
                        </form.Field>
                        <form.Field
                            name="permits.products.create">
                            {(field) => (
                                <>
                                    <Checkbox id={field.name} className="border-chart-1"/><Label htmlFor={field.name} style={{marginLeft:'5px'}}>
                                        {t('ui.users.permissions.products.create')}<br/></Label>
                                    <FieldInfo field={field} />
                                </>
                            )}
                        </form.Field>
                        <form.Field
                            name="permits.products.edit">
                            {(field) => (
                                <>
                                    <Checkbox id={field.name} className="border-chart-1"/><Label htmlFor={field.name} style={{marginLeft:'5px'}}>
                                        {t('ui.users.permissions.products.edit')}<br/></Label>
                                    <FieldInfo field={field} />
                                </>
                            )}
                        </form.Field>
                        <form.Field
                            name="permits.products.delete">
                            {(field) => (
                                <>
                                    <Checkbox id={field.name} className="border-chart-1"/><Label htmlFor={field.name} style={{marginLeft:'5px'}}>
                                        {t('ui.users.permissions.products.delete')}<br/></Label>
                                    <FieldInfo field={field} />
                                </>
                            )}
                        </form.Field>
                    </div>
                    <div className="p-4 rounded-lg shadow">
                    <div className="flex mb-4">
                            <FileText size={'15px'} className="text-chart-1 mr-2"/><Label>{t('ui.users.permissions.reports.title')}</Label>
                        </div>
                        <form.Field
                            name="permits.reports.read">
                            {(field) => (
                                <>
                                    <Checkbox id={field.name} className="border-chart-1"/><Label htmlFor={field.name} style={{marginLeft:'5px'}}>
                                        {t('ui.users.permissions.reports.show')}<br/></Label>
                                    <FieldInfo field={field} />
                                </>
                            )}
                        </form.Field>
                        <form.Field
                            name="permits.reports.export">
                            {(field) => (
                                <>
                                    <Checkbox id={field.name} className="border-chart-1"/><Label htmlFor={field.name} style={{marginLeft:'5px'}}>
                                        {t('ui.users.permissions.reports.export')}<br/></Label>
                                    <FieldInfo field={field} />
                                </>
                            )}
                        </form.Field>
                        <form.Field
                            name="permits.reports.print">
                            {(field) => (
                                <>
                                    <Checkbox id={field.name} className="border-chart-1"/><Label htmlFor={field.name} style={{marginLeft:'5px'}}>{
                                    t('ui.users.permissions.reports.print')}<br/></Label>
                                    <FieldInfo field={field} />
                                </>
                            )}
                        </form.Field>
                        
                    </div>
                    <div className="p-4 rounded-lg shadow">
                        <div className="flex mb-4">
                            <Settings size={'15px'} className="text-chart-1 mr-2"/><Label>{t('ui.users.permissions.settings.title')}</Label>
                        </div>
                        <form.Field
                            name="permits.settings.access">
                            {(field) => (
                                <>
                                    <Checkbox id={field.name} className="border-chart-1"/><Label htmlFor={field.name} style={{marginLeft:'5px'}}>
                                        {t('ui.users.permissions.settings.access')}<br/></Label>
                                    <FieldInfo field={field} />
                                </>
                            )}
                        </form.Field>
                        <form.Field
                            name="permits.settings.modify">
                            {(field) => (
                                <>
                                    <Checkbox id={field.name}className="border-chart-1" /><Label htmlFor={field.name} style={{marginLeft:'5px'}}>
                                        {t('ui.users.permissions.settings.modify')}<br/></Label>
                                    <FieldInfo field={field} />
                                </>
                            )}
                        </form.Field>
                    </div>

             </div>

           {/* Form buttons */}
           
            <div className="mt-6 flex items-center justify-between gap-x-6">
                <div style={{ display: "flex", alignItems: "center" }}>
                    
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                            let url = "/users";
                            if (page) {
                                url += `?page=${page}`;
                                if (perPage) {
                                    url += `&per_page=${perPage}`;
                                }
                            }
                            router.visit(url);
                        }
                        
                        }
                        disabled={form.state.isSubmitting}
                        
                    >
                        <X size={"20px"} />
                        {t("ui.users.buttons.cancel")}
                    </Button>
                </div>
                    <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                        {([canSubmit, isSubmitting]) => (
                            <Button type="submit" disabled={!canSubmit}>
                            <Save size={"20px"}/>
                            {isSubmitting
                                ? t("ui.users.buttons.saving")
                                : roleInitialData
                                    ? t("ui.users.buttons.update")
                                    : t("ui.users.buttons.save")}
                            </Button>
                        )}
                    </form.Subscribe>

                
            </div>
        </form>
    );
}
