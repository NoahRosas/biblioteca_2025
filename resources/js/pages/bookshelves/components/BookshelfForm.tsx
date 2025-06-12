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
        zone_id: string;
    };
    page?: string;
    perPage?: string;
    floors: {
        id: string;
        name: string;
    }[];
    zones: Zone[];
    bookshelves: any[];
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

export function BookshelfForm({ initialData, page, perPage, floors, zones, bookshelves }: BookshelfFormProps) {
    const { t } = useTranslations();
    const queryClient = useQueryClient();
    let floorNow = undefined;

    if (initialData) {
        floorNow = zones.filter((zone) => zone.id === initialData?.zone_id)[0].floor_id;
    }

    const [selectedFloor, setSelectedFloor] = useState<string | undefined>(floorNow ?? undefined);
    const [selectedZone, setSelectedZone] = useState<string | undefined>(initialData?.zone_id ?? undefined);
    const form = useForm({
        defaultValues: {
            number: initialData?.number ?? '',
            max_books: initialData?.max_books ?? '',
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

    function checkFloor() {
        let check;
        if (selectedFloor == undefined) {
            check = true;
        } else {
            check = false;
        }
        return check;
    }

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
                        {/* Floor id field */}
                        <div className="space-y-1">
                            <div className="mt-3 mb-2 flex">
                                <Label className="mt-0.5 ml-1">{t('ui.bookshelves.fields.floor_id')}</Label>
                            </div>

                            <Select
                                value={selectedFloor}
                                onValueChange={(value) => {
                                    setSelectedFloor(value);
                                }}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder={t('ui.bookshelves.placeholders.floor_id')} />
                                </SelectTrigger>
                                <SelectContent>
                                    {floors?.map((floor) => (
                                        <SelectItem key={floor.id} value={floor.id}>
                                            {t(`ui.floors.titles.floor`)} {floor.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <div className="mt-3 mb-2 flex">
                                <Label className="mt-0.5 ml-1">{t('ui.bookshelves.fields.zone_id')}</Label>
                            </div>
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
                                            setSelectedZone(value);
                                        }}
                                        required={true}
                                        disabled={checkFloor()}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder={t('ui.bookshelves.placeholders.zone_id')} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {zones
                                                .filter((zone) => zone.floor_id === selectedFloor)
                                                .map((zone) => (
                                                    <SelectItem
                                                        key={zone.id}
                                                        value={zone.id}
                                                        disabled={zone.bookshelves_count >= zone.max_bookshelves}
                                                    >
                                                        {zone.number} - {t(`ui.genres.names.${zone.name}`)} ({zone.bookshelves_count}/
                                                        {zone.max_bookshelves})
                                                    </SelectItem>
                                                ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            </form.Field>
                        </div>

                        {/* number field */}
                        <div className="space-y-1">
                            <form.Field
                                name="number"
                                validators={{
                                    onChangeAsync: async ({ value }) => {
                                        await new Promise((resolve) => setTimeout(resolve, 500));

                                        const attributeName = t('ui.bookshelves.fields.number').toLowerCase();
                                        const numValue = Number(value);

                                        return !numValue
                                            ? t('ui.validation.required', { attribute: attributeName })
                                            : numValue < 0
                                              ? t('ui.validation.required', { attribute: attributeName })
                                              : initialData
                                                ? bookshelves
                                                      .filter((bookshelf) => bookshelf.zone_id === selectedZone && bookshelf.id !== initialData.id)
                                                      .find((bookshelf) => bookshelf.number === numValue)
                                                    ? t('ui.validation.distinct', { attribute: attributeName })
                                                    : undefined
                                                : bookshelves
                                                        .filter((bookshelf) => bookshelf.zone_id === selectedZone)
                                                        .find((bookshelf) => bookshelf.number === numValue)
                                                  ? t('ui.validation.distinct', { attribute: attributeName })
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
                                            disabled={selectedZone === undefined || form.state.isSubmitting}
                                            required={true}
                                            autoComplete="off"
                                        />
                                        <FieldInfo field={field} />
                                    </>
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
                                            ? t('ui.validation.required', { attribute: t('ui.bookshelves.fields.max_books').toLowerCase() })
                                            : numValue < 0
                                              ? t('ui.validation.required', { attribute: t('ui.bookshelves.fields.max_books').toLowerCase() })
                                              : undefined;
                                    },
                                }}
                            >
                                {(field) => (
                                    <>
                                        <div className="mt-3 mb-2 flex">
                                            <Label htmlFor={field.name} className="mt-0.5 ml-1">
                                                {t('ui.bookshelves.fields.max_books')}
                                            </Label>
                                        </div>

                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            type="number"
                                            value={Number(field.state.value)}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            onBlur={field.handleBlur}
                                            max={70}
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
