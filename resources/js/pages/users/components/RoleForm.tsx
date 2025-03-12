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
  


interface RoleFormProps {
    roleInitialData?: {
        id: string;
        role: string;
        permits:{
            users:{
                read: boolean;
                create: boolean;
                edit: boolean;
                delete: boolean;
            },
            products:{
                read: boolean;
                create:boolean;
                edit:boolean;
                delete:boolean;
            },
            reports:{
                read:boolean;
                export:boolean;
                print:boolean;
            },
            settings:{
                access: boolean;
                modify: boolean;
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

    
    return (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
           {/* Main role field */}
            <div>
                <form.Field
                    name="role"
                >
                    {(field) => (
                        <>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <Shield />
                                <Label htmlFor="name" style={{ marginLeft: "8px" }}>{t("ui.users.fields.role")}
                                </Label>
                                
                            </div>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder={t('ui.users.fields.rol')} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="view">{t('ui.users.roles.view')}</SelectItem>
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

            {/* Role fields */}
            <div>
                <form.Field
                    name="permits">
                    {(field) => (
                        <>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <Shield color="blue"/>
                                <Label htmlFor={field.name} style={{ marginLeft: "8px" }}>{t("ui.users.fields.sp_permissions")}
                                </Label>
                                
                            </div>
                            <div className="grid grid-cols-2 gap-4 mt-4">
                                    <div className="bg-white p-4 rounded-lg shadow">
                                        <p style={{display:'flex'}}><Users size={'19px'} style={{marginRight:'5px', color:'blue'}}/>{t("ui.users.title")}</p>
                                        <Checkbox id="users.show"  /><Label htmlFor="users.show" style={{marginLeft:'5px'}}>{t('ui.users.permissions.users.show')}<br/></Label>
                                        <Checkbox id="users.create" /><Label htmlFor="users.create" style={{marginLeft:'5px'}}>{t('ui.users.permissions.users.create')}<br/></Label>
                                        <Checkbox id="users.edit" /><Label htmlFor="users.edit" style={{marginLeft:'5px'}}>{t('ui.users.permissions.users.edit')}<br/></Label>
                                        <Checkbox id="users.delete" /><Label htmlFor="users.delete" style={{marginLeft:'5px'}}>{t('ui.users.permissions.users.delete')}</Label>
                                    </div>
                                    <div className="bg-white p-4 rounded-lg shadow">
                                    <p style={{display:'flex'}}><PackageOpen size={'19px'} style={{marginRight:'5px', color:'blue'}}/> {t("ui.users.permissions.products.title")}</p>
                                        <Checkbox id="products.show"  /><Label htmlFor="products.show" style={{marginLeft:'5px'}}>{t('ui.users.permissions.products.show')}<br/></Label>
                                        <Checkbox id="products.create" /><Label htmlFor="products.create" style={{marginLeft:'5px'}}>{t('ui.users.permissions.products.create')}<br/></Label>
                                        <Checkbox id="products.edit" /><Label htmlFor="products.edit" style={{marginLeft:'5px'}}>{t('ui.users.permissions.products.edit')}<br/></Label>
                                        <Checkbox id="products.delete" /><Label htmlFor="products.delete" style={{marginLeft:'5px'}}>{t('ui.users.permissions.products.delete')}</Label>
                                    </div>
                                    <div className="bg-white p-4 rounded-lg shadow">
                                    <p style={{display:'flex'}}><FileText size={'19px'} style={{marginRight:'5px', color:'blue'}}/>{t("ui.users.permissions.reports.title")}</p>
                                        <Checkbox id="reports.show"  /><Label htmlFor="reports.show" style={{marginLeft:'5px'}}>{t('ui.users.permissions.reports.show')}<br/></Label>
                                        <Checkbox id="reports.create" /><Label htmlFor="reports.create" style={{marginLeft:'5px'}}>{t('ui.users.permissions.reports.export')}<br/></Label>
                                        <Checkbox id="reports.edit" /><Label htmlFor="reports.edit" style={{marginLeft:'5px'}}>{t('ui.users.permissions.reports.print')}<br/></Label>
                                        
                                    </div>
                                    <div className="bg-white p-4 rounded-lg shadow">
                                    <p style={{display:'flex'}}><Settings size={'19px'} style={{marginRight:'5px', color:'blue'}}/>{t("ui.users.permissions.settings.title")}</p>
                                        <Checkbox id="settings.show"  /><Label htmlFor="settings.show" style={{marginLeft:'5px'}}>{t('ui.users.permissions.settings.access')}<br/></Label>
                                        <Checkbox id="settings.create" /><Label htmlFor="settings.show" style={{marginLeft:'5px'}}>{t('ui.users.permissions.settings.modify')}<br/></Label>
                                    </div>
                                </div>
                            <FieldInfo field={field} />

                        </>
                    )}
                </form.Field>
            </div>

           

           {/* Form buttons */}
           {/*
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
                                : initialData
                                    ? t("ui.users.buttons.update")
                                    : t("ui.users.buttons.save")}
                            </Button>
                        )}
                    </form.Subscribe>

                
            </div>*/}
        </form>
    );
}
