import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useTranslations } from '@/hooks/use-translations';
import { router } from '@inertiajs/react';
import { AnyFieldApi, useForm } from '@tanstack/react-form';
import { useQueryClient } from '@tanstack/react-query';

import { ChevronsUpDown, Save, X } from 'lucide-react';
import { useState } from 'react';
// Tipado de las props
export interface LoanFormProps {
    initialData?: {
        id: string;
        book_id: string;
    };
    user_email?: string;
    user_emails: {
        email: string;
    }[];
    page?: string;
    perPage?: string;
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

export function ReservationForm({ initialData, page, perPage, user_email, user_emails }: LoanFormProps) {
    const { t } = useTranslations();
    const [selectedEmail, setSelectedEmail] = useState<string>(user_email || '');
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();
    let params = window.location.search;
    let url = new URLSearchParams(params);
    const form = useForm({
        defaultValues: {
            user_email: user_email ?? '',
            book_id: initialData?.id ?? url.get('book_id') ?? '',
        },
        onSubmit: async ({ value }) => {
            const options = {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ['reservations'] });
                    let url = '/reservations';
                    if (page) {
                        url += `?page=${page}${perPage ? `&per_page=${perPage}` : ''}`;
                    }
                    router.visit(url);
                },
            };

            if (initialData) {
                router.put(`/reservations/${initialData.id}`, value, options);
            } else {
                router.post('/reservations', value, options);
            }
        },
    });

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        event.stopPropagation();
        form.handleSubmit();
    };
    return (
        <div className="inset-0 flex items-center justify-center">
            <Card className="w-full max-w-[600px]">
                <CardContent>
                    <form onSubmit={form.handleSubmit} noValidate>
                        <div className="flex w-full flex-col items-center gap-4 px-4">
                            {/* user email field */}
                            <form.Field
                                name="user_email"
                                validators={{
                                    onChangeAsync: async ({ value }) => {
                                        await new Promise((resolve) => setTimeout(resolve, 500));
                                        return !value
                                            ? t('ui.validation.required', {
                                                  attribute: t('ui.reservations.fields.user_email').toLowerCase(),
                                              })
                                            : value.length < 1
                                              ? t('ui.validation.min.string', {
                                                    attribute: t('ui.reservations.fields.user_email').toLowerCase(),
                                                    min: '1',
                                                })
                                              : undefined;
                                    },
                                }}
                            >
                                {(field) => (
                                    <>
                                        <Label className="ml-1 self-start">{t('ui.reservations.fields.user_email')}</Label>
                                        <Popover open={open} onOpenChange={setOpen}>
                                            <PopoverTrigger asChild>
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

                            {/* book id field */}
                            <form.Field
                                name="book_id"
                                validators={{
                                    onChangeAsync: async ({ value }) => {
                                        await new Promise((resolve) => setTimeout(resolve, 500));
                                        return !value
                                            ? t('ui.validation.required', {
                                                  attribute: t('ui.reservations.fields.book_id').toLowerCase(),
                                              })
                                            : value.length < 1
                                              ? t('ui.validation.min.string', {
                                                    attribute: t('ui.reservations.fields.book_id').toLowerCase(),
                                                    min: '1',
                                                })
                                              : undefined;
                                    },
                                }}
                            >
                                {(field) => (
                                    <>
                                        <Label htmlFor={field.name} className="ml-1 self-start">
                                            {t('ui.reservations.fields.book_id')}
                                        </Label>
                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            type="text"
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            onBlur={field.handleBlur}
                                            max={30}
                                            min={1}
                                            placeholder={t('ui.reservations.placeholders.book_id')}
                                            disabled={form.state.isSubmitting || url.get('book_id') !== null || initialData !== undefined}
                                            required
                                            autoComplete="off"
                                            className="w-full max-w-[550px]"
                                        />
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
                            let redirectUrl = '/reservations';
                            if (page) {
                                redirectUrl += `?page=${page}`;
                                if (perPage) {
                                    redirectUrl += `&per_page=${perPage}`;
                                }
                            }
                            router.visit(redirectUrl);
                        }}
                    >
                        <X size="20px" className="mr-1" />
                        {t('ui.users.buttons.cancel')}
                    </Button>

                    <Button type="submit" className="bg-blue-500 hover:bg-blue-700" onClick={handleSubmit}>
                        <Save size="20px" className="mr-1" />
                        {initialData ? t('ui.users.buttons.update') : t('ui.users.buttons.save')}
                    </Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
