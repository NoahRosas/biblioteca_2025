import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useTranslations } from '@/hooks/use-translations';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { router } from '@inertiajs/react';
import { AnyFieldApi, useForm } from '@tanstack/react-form';
import { useQueryClient } from '@tanstack/react-query';
import { CalendarIcon, Save, X } from 'lucide-react';
import { useState } from 'react';
import { format, isSunday, isWeekend, lastDayOfWeek } from 'date-fns';

import 'react-day-picker/style.css';
import { enUS, es } from 'date-fns/locale';


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
    user_emails: any [];
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

export function LoanForm({ initialData, page, perPage, user_email, lang, user_emails}: LoanFormProps) {
    const { t } = useTranslations();
    const queryClient = useQueryClient();
    const [selectedEndLoan, setSelectEndLoan] = useState(initialData?.end_loan || undefined);
    const [selectedEmail, setSelectedEmail] = useState<string>();
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
    console.log(user_emails);
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        event.stopPropagation();
        form.setFieldValue('end_loan', selectedEndLoan ? selectedEndLoan : '');
        form.handleSubmit();
    };
    return (
        <div className="inset-0 flex items-center justify-center">
            <Card className="w-[600px]">
                <CardContent>
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
                                            <Label htmlFor="name" className="mt-1 ml-1">
                                                {t('ui.loans.fields.user_email')}
                                            </Label>
                                        </div>

                                        {/* <Input
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            onBlur={field.handleBlur}
                                            placeholder={t('ui.loans.placeholders.user_email')}
                                            disabled={form.state.isSubmitting || user_email !== undefined}
                                            required={false}
                                            autoComplete="off"
                                        /> */}
                                        <Select name={field.name} value={field.state.value} onValueChange={(value) => {
                                            field.handleChange(value);
                                            setSelectedEmail(value);
                                            console.log(value);
                                            }}>
                                            <SelectTrigger>
                                                <SelectValue placeholder={t('ui.loans.placeholders.user_email')} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {user_emails?.map((email) => (
                                                    <SelectItem key={email} value={email} >
                                                        {email}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FieldInfo field={field} />
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
                                        />
                                        <FieldInfo field={field} />
                                    </>
                                )}
                            </form.Field>
                        </div>

                        {/* end loan field */}
                        <div className="space-y-1">
                            <form.Field
                                name="end_loan"
                            >
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
                                                            'w-[240px] pl-3 text-left font-normal',
                                                            !field.state.value && 'text-muted-foreground',
                                                        )}
                                                    >
                                                        {selectedEndLoan ? format(selectedEndLoan, 'PPP', {locale:langMap[lang]}) : <span>{t('ui.loans.placeholders.pick_date')}</span>}
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
                                            disabled={[{before: new Date()}, new Date(), isSunday] }
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
                <CardFooter className="flex justify-between">
                    {/* Form buttons */}

                    <Button
                        // className='flex'
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
                </CardFooter>
            </Card>
        </div>
    );
}
