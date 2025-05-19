import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useTranslations } from '@/hooks/use-translations';
import { cn } from '@/lib/utils';
import { router } from '@inertiajs/react';
import { AnyFieldApi, useForm } from '@tanstack/react-form';
import { useQueryClient } from '@tanstack/react-query';
import { format, isSunday } from 'date-fns';
import { CalendarIcon, ChevronsUpDown, Save, X } from 'lucide-react';
import { useState } from 'react';

import { enUS, es } from 'date-fns/locale';
import 'react-day-picker/style.css';

// Tipado de las props
export interface LoanFormProps {
    initialData?: {
        id: string;
        book_id: string;
        end_loan: Date;
    };
    lang: string;
    user_email?: string;
    page?: string;
    perPage?: string;
    user_emails: {
        email: string;
    }[];
}

function FieldInfo({ field }: { field: AnyFieldApi }) {
    return (
        <>
            {field.state.meta.isTouched && field.state.meta.errors.length ? (
                <p className="text-destructive mt-1 text-sm">{field.state.meta.errors.join(', ')}</p>
            ) : null}
        </>
    );
}

export function LoanForm({ initialData, page, perPage, user_email, lang, user_emails }: LoanFormProps) {
    const { t } = useTranslations();
    const queryClient = useQueryClient();
    const [selectedEndLoan, setSelectEndLoan] = useState(initialData?.end_loan || undefined);
    const [selectedEmail, setSelectedEmail] = useState<string>(user_email || '');
    const [open, setOpen] = useState(false);
    let params = window.location.search;
    let url = new URLSearchParams(params);
    const form = useForm({
        defaultValues: {
            user_email: user_email ?? '',
            book_id: initialData?.id ?? url.get('book_id') ?? '',
            end_loan: initialData?.end_loan ?? '',
        },
        onSubmit: async ({ value }) => {
            const options = {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ['loans'] });
                    let url = '/loans';
                    if (page) {
                        url += `?page=${page}${perPage ? `&per_page=${perPage}` : ''}`;
                    }
                    router.visit(url);
                },
            };

            if (initialData) {
                router.put(`/loans/${initialData.id}`, value, options);
            } else {
                router.post('/loans', value, options);
            }
        },
    });

    const langMap = {
        en: enUS,
        es: es,
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        event.stopPropagation();
        form.setFieldValue('end_loan', selectedEndLoan ? selectedEndLoan : '');
        form.handleSubmit();
    };
    return (
        <div className="inset-0 flex items-center justify-center px-4">
            <Card className="w-full max-w-[600px]">
                <CardContent className="px-4">
                    <form onSubmit={form.handleSubmit} noValidate>
                        {/* user email field */}
                        <div className="space-y-1">
                            <form.Field
                                name="user_email"
                                validators={{
                                    onChangeAsync: async ({ value }) => {
                                        await new Promise((resolve) => setTimeout(resolve, 500));
                                        return !value
                                            ? t('ui.validation.required', { attribute: t('ui.loans.fields.user_email').toLowerCase() })
                                            : value.length < 1
                                              ? t('ui.validation.min.string', {
                                                    attribute: t('ui.loans.fields.user_email').toLowerCase(),
                                                    min: '1',
                                                })
                                              : undefined;
                                    },
                                }}
                            >
                                {(field) => (
                                    <>
                                        <div className="mb-2 flex">
                                            <Label htmlFor={field.name} className="mt-1 ml-1">
                                                {t('ui.loans.fields.user_email')}
                                            </Label>
                                        </div>

                                        <Popover open={open} onOpenChange={setOpen}>
                                            <PopoverTrigger asChild disabled={user_email ? true : false}>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    aria-expanded={open}
                                                    className="w-full max-w-[550px] justify-between"
                                                >
                                                    {selectedEmail ? selectedEmail : t('ui.loans.placeholders.user_email')}
                                                    <ChevronsUpDown className="opacity-50" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-full max-w-[550px] p-0">
                                                <Command>
                                                    <CommandInput placeholder={t('ui.loans.placeholders.search')} className="h-9" />
                                                    <CommandList>
                                                        <CommandEmpty>{t('ui.users.no_results')}</CommandEmpty>
                                                        <CommandGroup>
                                                            {user_emails.map((user) => (
                                                                <CommandItem
                                                                    key={user.email}
                                                                    value={user.email}
                                                                    onSelect={(currentValue) => {
                                                                        field.handleChange(currentValue);
                                                                        setSelectedEmail(currentValue);
                                                                        setOpen(false);
                                                                    }}
                                                                >
                                                                    {user.email}
                                                                </CommandItem>
                                                            ))}
                                                        </CommandGroup>
                                                    </CommandList>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>

                                        <FieldInfo field={field} />
                                    </>
                                )}
                            </form.Field>
                        </div>

                        {/* book id field */}
                        <div className="space-y-1">
                            <form.Field
                                name="book_id"
                                validators={{
                                    onChangeAsync: async ({ value }) => {
                                        await new Promise((resolve) => setTimeout(resolve, 500));
                                        return !value
                                            ? t('ui.validation.required', { attribute: t('ui.loans.fields.book_id').toLowerCase() })
                                            : value.length < 1
                                              ? t('ui.validation.min.string', {
                                                    attribute: t('ui.loans.fields.book_id').toLowerCase(),
                                                    min: '1',
                                                })
                                              : undefined;
                                    },
                                }}
                            >
                                {(field) => (
                                    <>
                                        <div className="mt-3 mb-2 flex">
                                            <Label htmlFor={field.name} className="mt-0.5 ml-1">
                                                {t('ui.loans.fields.book_id')}
                                            </Label>
                                        </div>

                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            type="text"
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            onBlur={field.handleBlur}
                                            max={30}
                                            min={1}
                                            placeholder={t('ui.loans.placeholders.book_id')}
                                            disabled={form.state.isSubmitting || url.get('book_id') !== null || initialData !== undefined}
                                            required={true}
                                            autoComplete="off"
                                            className="w-full max-w-[550px]"
                                        />
                                        <FieldInfo field={field} />
                                    </>
                                )}
                            </form.Field>
                        </div>

                        {/* end loan field */}
                        <div className="space-y-1">
                            <form.Field name="end_loan">
                                {(field) => (
                                    <>
                                        <div className="mt-3 mb-2 flex">
                                            <Label htmlFor={field.name} className="mt-0.5 ml-1">
                                                {t('ui.loans.fields.end_loan')}
                                            </Label>
                                        </div>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant={'outline'}
                                                    className={cn(
                                                        'w-full max-w-[550px] pl-3 text-left font-normal',
                                                        !field.state.value && 'text-muted-foreground',
                                                    )}
                                                >
                                                    {selectedEndLoan ? (
                                                        format(selectedEndLoan, 'PPP', { locale: langMap[lang] })
                                                    ) : (
                                                        <span>{t('ui.loans.placeholders.pick_date')}</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    animate
                                                    timeZone="Europe/Madrid"
                                                    locale={langMap[lang]}
                                                    mode="single"
                                                    className="rounded-md border shadow"
                                                    showOutsideDays
                                                    selected={selectedEndLoan}
                                                    disabled={[{ before: new Date() }, new Date(), isSunday]}
                                                    onSelect={setSelectEndLoan}
                                                />
                                            </PopoverContent>
                                        </Popover>

                                        <FieldInfo field={field} />
                                    </>
                                )}
                            </form.Field>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="px-4 pt-4">
                    <div className="mx-auto flex w-full max-w-[550px] justify-between">
                        <Button
                            type="button"
                            onClick={() => {
                                let url = '/loans';
                                if (page) {
                                    url += `?page=${page}`;
                                    if (perPage) {
                                        url += `&per_page=${perPage}`;
                                    }
                                }
                                router.visit(url);
                            }}
                        >
                            <X size={'20px'} className="mr-1" />
                            {t('ui.users.buttons.cancel')}
                        </Button>

                        <Button type="submit" className="bg-blue-500 hover:bg-blue-700" onClick={handleSubmit}>
                            <Save size={'20px'} className="mr-1" />
                            {initialData ? t('ui.users.buttons.update') : t('ui.users.buttons.save')}
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
