import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTranslations } from '@/hooks/use-translations';
import { router } from '@inertiajs/react';
import { AnyFieldApi, useForm } from '@tanstack/react-form';
import { useQueryClient } from '@tanstack/react-query';
import { Save, X } from 'lucide-react';
import { useState } from 'react';

// Tipado de las props
export interface ZoneFormProps {
    initialData?: {
        id: string;
        name: string;
        number: number;
        max_bookshelves: number;
        floor_id: string;
    };
    page?: string;
    perPage?: string;
    floors: {
        id: string;
        name: string;
        zones_count: number;
        max_zones: number;
    }[];
    genres: {
        id: string;
        name: string;
    }[];
    zones: any[];
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

export function ZoneForm({ initialData, page, perPage, floors, genres, zones }: ZoneFormProps) {
    const { t } = useTranslations();
    const queryClient = useQueryClient();
    const [selectedFloor, setSelectedFloor] = useState<string>(initialData?.floor_id || '');
    const form = useForm({
        defaultValues: {
            name: initialData?.name ?? '',
            number: initialData?.number ?? '',
            max_bookshelves: initialData?.max_bookshelves ?? '',
            floor_id: initialData?.floor_id ?? '',
        },
        onSubmit: async ({ value }) => {
            const options = {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ['zones'] });
                    let url = '/zones';
                    if (page) {
                        url += `?page=${page}${perPage ? `&per_page=${perPage}` : ''}`;
                    }
                    router.visit(url);
                },
            };

            if (initialData) {
                router.put(`/zones/${initialData.id}`, value, options);
            } else {
                router.post('/zones', value, options);
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
                        {/* Name field */}
                        <div className="space-y-1">
                            <form.Field
                                name="name"
                                validators={{
                                    onChangeAsync: async ({ value }) => {
                                        await new Promise((resolve) => setTimeout(resolve, 500));
                                        return !value ? t('ui.validation.required', { attribute: t('ui.zones.fields.name').toLowerCase() }) : null;
                                    },
                                }}
                            >
                                {(field) => (
                                    <>
                                        <div className="mt-3 mb-2 flex">
                                            <Label htmlFor={field.name} className="mt-0.5 ml-1">
                                                {t('ui.zones.fields.name')}
                                            </Label>
                                        </div>

                                        <Select
                                            name={field.name}
                                            required={true}
                                            value={field.state.value}
                                            onValueChange={(value) => {
                                                field.handleChange(value);
                                                console.log(value);
                                            }}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder={t('ui.zones.placeholders.name')} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {genres?.map((genre) => (
                                                    <SelectItem key={genre.id} value={genre.name}>
                                                        {t(`ui.genres.names.${genre.name}`)}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FieldInfo field={field} />
                                    </>
                                )}
                            </form.Field>
                        </div>

                        {/* Floor name field */}
                        <div className="space-y-1">
                            <form.Field
                                name="floor_id"
                                validators={{
                                    onChangeAsync: async ({ value }) => {
                                        await new Promise((resolve) => setTimeout(resolve, 500));
                                        return !value
                                            ? t('ui.validation.required', { attribute: t('ui.zones.fields.floor_name').toLowerCase() })
                                            : null;
                                    },
                                }}
                            >
                                {(field) => (
                                    <>
                                        <div className="mt-3 mb-2 flex">
                                            <Label htmlFor={field.name} className="mt-0.5 ml-1">
                                                {t('ui.zones.fields.floor_id')}
                                            </Label>
                                        </div>

                                        <Select
                                            name={field.name}
                                            value={field.state.value}
                                            onValueChange={(value) => {
                                                field.handleChange(value);
                                                setSelectedFloor(value);
                                                console.log(value);
                                            }}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder={t('ui.zones.placeholders.floor_id')} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {floors?.map((floor) => (
                                                    <SelectItem key={floor.id} value={floor.id} disabled={floor.zones_count >= floor.max_zones}>
                                                        {t(`ui.floors.titles.floor`)} {floor.name} - {floor.zones_count}/{floor.max_zones}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FieldInfo field={field} />
                                    </>
                                )}
                            </form.Field>
                        </div>

                        {/* Number field */}
                        <div className="space-y-1">
                            <form.Field
                                name="number"
                                validators={{
                                    onChangeAsync: async ({ value }) => {
                                        await new Promise((resolve) => setTimeout(resolve, 500));

                                        const attributeName = t('ui.zones.fields.number').toLowerCase();
                                        const numValue = Number(value);

                                        return !numValue
                                            ? t('ui.validation.required', { attribute: attributeName })
                                            : numValue < 0
                                              ? t('ui.validation.required', { attribute: attributeName })
                                              : initialData
                                                ? zones
                                                      .filter((zone) => zone.floor_id === selectedFloor && zone.id !== initialData.id)
                                                      .find((zone) => zone.number === numValue)
                                                    ? t('ui.validation.distinct', { attribute: attributeName })
                                                    : undefined
                                                : zones.filter((zone) => zone.floor_id === selectedFloor).find((zone) => zone.number === numValue)
                                                  ? t('ui.validation.distinct', { attribute: attributeName })
                                                  : undefined;
                                    },
                                }}
                            >
                                {(field) => (
                                    <>
                                        <div className="mt-3 mb-2 flex">
                                            <Label htmlFor={field.name} className="mt-0.5 ml-1">
                                                {t('ui.zones.fields.number')}
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
                                            placeholder={t('ui.zones.placeholders.number')}
                                            disabled={selectedFloor === '' || form.state.isSubmitting}
                                            required={true}
                                            autoComplete="off"
                                        />
                                        <FieldInfo field={field} />
                                    </>
                                )}
                            </form.Field>
                        </div>

                        {/* Max bookshelves field */}
                        <div className="space-y-1">
                            <form.Field
                                name="max_bookshelves"
                                validators={{
                                    onChangeAsync: async ({ value }) => {
                                        await new Promise((resolve) => setTimeout(resolve, 500));
                                        const numValue = Number(value);
                                        return !numValue
                                            ? t('ui.validation.required', { attribute: t('ui.zones.fields.max_bookshelves').toLowerCase() })
                                            : numValue < 0
                                              ? t('ui.validation.required', { attribute: t('ui.zones.fields.max_bookshelves').toLowerCase() })
                                              : undefined;
                                    },
                                }}
                            >
                                {(field) => (
                                    <>
                                        <div className="mt-3 mb-2 flex">
                                            <Label htmlFor={field.name} className="mt-0.5 ml-1">
                                                {t('ui.zones.fields.max_bookshelves')}
                                            </Label>
                                        </div>

                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            type="number"
                                            value={Number(field.state.value)}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            onBlur={field.handleBlur}
                                            max={100}
                                            min={1}
                                            placeholder={t('ui.zones.placeholders.max_bookshelves')}
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
                            let url = '/zones';
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
