import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTranslations } from '@/hooks/use-translations';
import { Zone } from '@/hooks/zones/useZones';
import { router } from '@inertiajs/react';
import { AnyFieldApi, useForm } from '@tanstack/react-form';
import { useQueryClient } from '@tanstack/react-query';
import { Save, X } from 'lucide-react';
import { useState } from 'react';

// Tipado de las props
export interface BookshelfFormProps {
    initialData?: {
        id: string;
        number: number;
        max_books: number;
        floor_id: string;
        zone_id: string;
    };
    page?: string;
    perPage?: string;
    floors: {
        id: string;
        name: string;
    }[];
    zones: Zone[];
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

export function BookshelfForm({ initialData, page, perPage, floors, zones}: BookshelfFormProps) {
    // console.log(initialData);
    const { t } = useTranslations();
    const queryClient = useQueryClient();
    const [selectedFloor, setSelectedFloor] = useState(initialData?.floor_id ?? undefined);
    const form = useForm({
        defaultValues: {
            number: initialData?.number ?? '',
            max_books: initialData?.max_books ?? '',
            floor_id: initialData?.floor_id ?? '',
            zone_id: initialData?.zone_id ?? '',
        },
        onSubmit: async ({ value }) => {
            const options = {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ['bookshelves'] });
                    let url = '/bookshelves';
                    if (page) {
                        url += `?page=${page}${perPage ? `&per_page=${perPage}` : ''}`;
                    }
                    router.visit(url);
                },
            };

            if (initialData) {
                router.put(`/bookshelves/${initialData.id}`, value, options);
            } else {
                router.post('/bookshelves', value, options);
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
                        {/* number field */}
                        <div className="space-y-1">
                            <form.Field
                                name="number"
                                validators={{
                                    onChangeAsync: async ({ value }) => {
                                        await new Promise((resolve) => setTimeout(resolve, 500));
                                        const numValue = Number(value);
                                        return !numValue
                                            ? t('ui.validation.required', { attribute: t('ui.bookshelves.fields.number').toLowerCase() })
                                            : numValue < 0
                                              ? t('ui.validation.required', { attribute: t('ui.bookshelves.fields.number').toLowerCase() })
                                              : undefined;
                                    },
                                }}
                            >
                                {(field) => (
                                    <>
                                        <div className="mt-3 mb-2 flex">
                                            <Label htmlFor={field.name} className="mt-0.5 ml-1">
                                                {t('ui.bookshelves.fields.number')}
                                            </Label>
                                        </div>

                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            type="number"
                                            value={Number(field.state.value)}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            onBlur={field.handleBlur}
                                            max={30}
                                            min={1}
                                            placeholder={t('ui.bookshelves.placeholders.number')}
                                            disabled={form.state.isSubmitting}
                                            required={true}
                                            autoComplete="off"
                                        />
                                        <FieldInfo field={field} />
                                    </>
                                )}
                            </form.Field>
                        </div>

                        {/* Floor id field */}
                        <div className="space-y-1">
                                        <div className="mt-3 mb-2 flex">
                                            <Label className="mt-0.5 ml-1">
                                                {t('ui.bookshelves.fields.floor_id')}
                                            </Label>
                                        </div>

                                        <Select
                                            value={selectedFloor}
                                            onValueChange={(value) => {
                                                setSelectedFloor(value);
                                                console.log(value);
                                            }}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder={t('ui.bookshelves.placeholders.zone_id')} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {floors?.map((floor) => (
                                                    <SelectItem key={floor.id} value={floor.id}>
                                                        {t(`ui.floors.titles.${floor.name}`)}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>

                                     
 
                            <form.Field
                                name="zone_id"
                                validators={{
                                    onChangeAsync: async ({ value }) => {
                                        await new Promise((resolve) => setTimeout(resolve, 500));
                                        return !value
                                            ? t('ui.validation.required', { attribute: t('ui.bookshelves.fields.zone_id').toLowerCase() })
                                            : null;
                                    },
                                }}
                            >
                                {(field) => (
                                    <Select
                                        name={field.name}
                                        value={field.state.value}
                                        onValueChange={(value) => {
                                            field.handleChange(value);
                                            console.log(value);
                                        }}
                                        required={true}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder={t('ui.bookshelves.placeholders.zone_id')} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {zones.filter(zone => zone.floor_id === selectedFloor).map((zone)=>(
                                                <SelectItem key={zone.id} value={zone.id}>
                                                    {t(`ui.genres.names.${zone.name}`)}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            </form.Field>
                        </div>

                        {/* Max books field */}
                        <div className="space-y-1">
                            <form.Field
                                name="max_books"
                                validators={{
                                    onChangeAsync: async ({ value }) => {
                                        await new Promise((resolve) => setTimeout(resolve, 500));
                                        const numValue = Number(value);
                                        return !numValue
                                            ? t('ui.validation.required', { attribute: t('ui.bookshelves.fields.max_bookshelves').toLowerCase() })
                                            : numValue < 0
                                              ? t('ui.validation.required', { attribute: t('ui.bookshelves.fields.max_bookshelves').toLowerCase() })
                                              : undefined;
                                    },
                                }}
                            >
                                {(field) => (
                                    <>
                                        <div className="mt-3 mb-2 flex">
                                            <Label htmlFor={field.name} className="mt-0.5 ml-1">
                                                {t('ui.bookshelves.fields.max_bookshelves')}
                                            </Label>
                                        </div>

                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            type="number"
                                            value={Number(field.state.value)}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            onBlur={field.handleBlur}
                                            max={30}
                                            min={1}
                                            placeholder={t('ui.bookshelves.placeholders.max_bookshelves')}
                                            disabled={form.state.isSubmitting}
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
                            let url = '/bookshelves';
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
