import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTranslations } from '@/hooks/use-translations';

import { router } from '@inertiajs/react';
import { AnyFieldApi, useForm } from '@tanstack/react-form';
import { useQueryClient } from '@tanstack/react-query';

import { Save, X } from 'lucide-react';
// Tipado de las props
export interface LoanFormProps {
    initialData?: {
        id: string;
        book_id: string;
    };
    user_email?:string;
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

export function ReservationForm({ initialData, page, perPage, user_email}: LoanFormProps) {
    const { t } = useTranslations();
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
                                            ? t('ui.validation.required', { attribute: t('ui.reservations.fields.user_email').toLowerCase() })
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
                                        <div className="mb-2 flex">
                                            <Label htmlFor="name" className="mt-1 ml-1">
                                                {t('ui.reservations.fields.user_email')}
                                            </Label>
                                        </div>

                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            onBlur={field.handleBlur}
                                            placeholder={t('ui.reservations.placeholders.user_email')}
                                            disabled={form.state.isSubmitting}
                                            required={false}
                                            autoComplete="off"
                                        />
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
                                            ? t('ui.validation.required', { attribute: t('ui.reservations.fields.book_id').toLowerCase() })
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
                                        <div className="mt-3 mb-2 flex">
                                            <Label htmlFor={field.name} className="mt-0.5 ml-1">
                                                {t('ui.reservations.fields.book_id')}
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
                                            placeholder={t('ui.reservations.placeholders.book_id')}
                                            disabled={form.state.isSubmitting || url.get('book_id') !== null || initialData !== undefined}
                                            required={true}
                                            autoComplete="off"
                                        />
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
                            let url = '/reservations';
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
