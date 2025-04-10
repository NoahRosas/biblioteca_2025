import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MultiSelect } from '@/components/ui/multi-select';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bookshelf } from '@/hooks/bookshelves/useBookshelves';
import { Genre } from '@/hooks/genres/useGenres';
import { useTranslations } from '@/hooks/use-translations';
import { Zone } from '@/hooks/zones/useZones';
import { router } from '@inertiajs/react';
import { AnyFieldApi, useForm } from '@tanstack/react-form';
import { useQueryClient } from '@tanstack/react-query';
import { Save, X } from 'lucide-react';
import { useEffect, useState } from 'react';

// Tipado de las props
export interface BookFormProps {
    initialData?: {
        id: string;
        name: string;
        ISBN: string;
        author: string;
        publisher: string;
        num_pages: number;
        genres: string;
        bookshelf_id: string;
    };
    page?: string;
    perPage?: string;
    floors: {
        id: string;
        name: string;
    }[];
    image_path?: string;
    zones: Zone[];
    bookshelves: Bookshelf[];
    genres: Genre[];
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

export function BookForm({ initialData, page, perPage, floors, zones, bookshelves, genres, image_path }: BookFormProps) {
    const { t } = useTranslations();
    const queryClient = useQueryClient();
    let zoneNow: string | undefined = undefined,
        floorNow = undefined;

    if (initialData) {
        zoneNow = bookshelves.filter((bookshelf) => bookshelf.id === initialData?.bookshelf_id)[0].zone_id;
        floorNow = zones.filter((zone) => zone.id === zoneNow)[0].floor_id;
    }
    const [selectedZone, setSelectedZone] = useState<string | undefined>(zoneNow ?? undefined);
    const [selectedFloor, setSelectedFloor] = useState<string | undefined>(floorNow ?? undefined);
    const [selectedGenres, setSelectedGenres] = useState<string[]>(initialData?.genres.split(', ') || []);
    const [selectedImage, setSelectedImage] = useState<File | undefined>(undefined);
    const form = useForm({
        defaultValues: {
            name: initialData?.name ?? '',
            ISBN: initialData?.ISBN ?? '',
            author: initialData?.author ?? '',
            publisher: initialData?.publisher ?? '',
            num_pages: initialData?.num_pages ?? undefined,
            genres: initialData?.genres ?? '',
            bookshelf_id: initialData?.bookshelf_id ?? '',
            image: undefined,
        },

        onSubmit: async ({ value }) => {
            const formData = new FormData;
                formData.append('name', value.name);
                formData.append('ISBN', value.ISBN);
                formData.append('author', value.author);
                formData.append('publisher', value.publisher);
                formData.append('num_pages', value.num_pages);
                formData.append('bookshelf_id', value.bookshelf_id);
                formData.append('image', selectedImage);
                formData.append('_method', 'PUT');
                formData.append('genres', selectedGenres.join(', '));
            const options = {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ['books'] });
                    let url = '/books';
                    if (page) {
                        url += `?page=${page}${perPage ? `&per_page=${perPage}` : ''}`;
                    }
                    router.visit(url);
                },
            };

            if (initialData) {
                router.post(`/books/${initialData.id}`, formData, options);
            } else {
                router.post('/books', value, options);
            }
        },
    });

    function checkFloor() {
        let check;
        if (selectedGenres.length == 0) {
            check = true;
        }else{
            if (selectedFloor == undefined) {
                check = true;
            } else {
                check = false;
            }
        }
        
        return check;
    }

    function checkZone() {
        let check;
        if (selectedGenres.length == 0) {
            check = true;
        }else{
            if (selectedZone == undefined) {
                check = true;
            } else {
                check = false;
            }
        }
        
        return check;
    }

    // Function to transform the genres array and add 'label' field
    const transformGenres = (genres: Genre[]) => {
        return genres.map((genre) => ({
            ...genre,
            label: t(`ui.genres.names.${genre.value}`),
        }));
    };
    
    const transformedGenres = transformGenres(genres);
    
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        event.stopPropagation();
        form.setFieldValue('genres', selectedGenres.join(', '));
        form.handleSubmit();
    };
    return (
        <div className="inset-0 flex items-center justify-center">
            <Card className="w-[600px]">
                <CardContent>
                    <form onSubmit={form.handleSubmit} noValidate>
                        {/* name field */}
                        <div className="space-y-1">
                            <form.Field
                                name="name"
                                validators={{
                                    onChangeAsync: async ({ value }) => {
                                        await new Promise((resolve) => setTimeout(resolve, 500));
                                        return !value
                                            ? t('ui.validation.required', { attribute: t('ui.books.fields.name').toLowerCase() })
                                            : value.length < 2
                                              ? t('ui.validation.min.string', {
                                                    attribute: t('ui.books.fields.name').toLowerCase(),
                                                    min: '2',
                                                })
                                              : undefined;
                                    },
                                }}
                            >
                                {(field) => (
                                    <>
                                        <div className="mt-3 mb-2 flex">
                                            <Label htmlFor={field.name} className="mt-0.5 ml-1">
                                                {t('ui.books.fields.name')}
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
                                            placeholder={t('ui.books.placeholders.name')}
                                            disabled={form.state.isSubmitting}
                                            required={true}
                                            autoComplete="off"
                                        />
                                        <FieldInfo field={field} />
                                    </>
                                )}
                            </form.Field>
                        </div>
                        
                        {/* ISBN field */}
                        <div className="space-y-1">
                            <form.Field
                                name="ISBN"
                                validators={{
                                    onChangeAsync: async ({ value }) => {
                                        await new Promise((resolve) => setTimeout(resolve, 500));
                                        return !value
                                            ? t('ui.validation.required', { attribute: t('ui.books.fields.ISBN').toLowerCase() })
                                            : value.length < 13
                                              ? t('ui.validation.min.string', {
                                                    attribute: t('ui.books.fields.ISBN').toLowerCase(),
                                                    min: '13',
                                                })
                                              : value.length>13 
                                              ? t('ui.validation.max.string', {
                                                attribute: t('ui.books.fields.ISBN').toLowerCase(),
                                                max: '13',
                                            }) : undefined
                                            ;
                                    },
                                }}
                            >
                                {(field) => (
                                    <>
                                        <div className="mt-3 mb-2 flex">
                                            <Label htmlFor={field.name} className="mt-0.5 ml-1">
                                                {t('ui.books.fields.ISBN')}
                                            </Label>
                                        </div>

                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            type="text"
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            onBlur={field.handleBlur}
                                            max={13}
                                            min={13}
                                            placeholder={t('ui.books.placeholders.ISBN')}
                                            disabled={form.state.isSubmitting}
                                            required={true}
                                            autoComplete="off"
                                        />
                                        <FieldInfo field={field} />
                                    </>
                                )}
                            </form.Field>
                        </div>


                        {/* Author field */}
                        <div className="space-y-1">
                            <form.Field
                                name="author"
                                validators={{
                                    onChangeAsync: async ({ value }) => {
                                        await new Promise((resolve) => setTimeout(resolve, 500));
                                        return !value
                                            ? t('ui.validation.required', { attribute: t('ui.books.fields.author').toLowerCase() })
                                            : value.length < 2
                                              ? t('ui.validation.min.string', {
                                                    attribute: t('ui.books.fields.author').toLowerCase(),
                                                    min: '2',
                                                })
                                              : undefined;
                                    },
                                }}
                            >
                                {(field) => (
                                    <>
                                        <div className="mt-3 mb-2 flex">
                                            <Label htmlFor={field.name} className="mt-0.5 ml-1">
                                                {t('ui.books.fields.author')}
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
                                            placeholder={t('ui.books.placeholders.author')}
                                            disabled={form.state.isSubmitting}
                                            required={true}
                                            autoComplete="off"
                                        />
                                        <FieldInfo field={field} />
                                    </>
                                )}
                            </form.Field>
                        </div>

                        {/* Publisher field */}
                        <div className="space-y-1">
                            <form.Field
                                name="publisher"
                                validators={{
                                    onChangeAsync: async ({ value }) => {
                                        await new Promise((resolve) => setTimeout(resolve, 500));
                                        return !value
                                            ? t('ui.validation.required', { attribute: t('ui.books.fields.publisher').toLowerCase() })
                                            : value.length < 2
                                              ? t('ui.validation.min.string', {
                                                    attribute: t('ui.books.fields.publisher').toLowerCase(),
                                                    min: '2',
                                                })
                                              : undefined;
                                    },
                                }}
                            >
                                {(field) => (
                                    <>
                                        <div className="mt-3 mb-2 flex">
                                            <Label htmlFor={field.name} className="mt-0.5 ml-1">
                                                {t('ui.books.fields.publisher')}
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
                                            placeholder={t('ui.books.placeholders.publisher')}
                                            disabled={form.state.isSubmitting}
                                            required={true}
                                            autoComplete="off"
                                        />
                                        <FieldInfo field={field} />
                                    </>
                                )}
                            </form.Field>
                        </div>

                        {/* num pages field */}
                        <div className="space-y-1">
                            <form.Field
                                name="num_pages"
                                validators={{
                                    onChangeAsync: async ({ value }) => {
                                        await new Promise((resolve) => setTimeout(resolve, 500));
                                        const numValue = Number(value);
                                        return !numValue
                                            ? t('ui.validation.required', { attribute: t('ui.books.fields.num_pages').toLowerCase() })
                                            : numValue < 0
                                              ? t('ui.validation.required', { attribute: t('ui.books.fields.num_pages').toLowerCase() })
                                              : undefined;
                                    },
                                }}
                            >
                                {(field) => (
                                    <>
                                        <div className="mt-3 mb-2 flex">
                                            <Label htmlFor={field.name} className="mt-0.5 ml-1">
                                                {t('ui.books.fields.num_pages')}
                                            </Label>
                                        </div>

                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            type="number"
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(parseInt(e.target.value))}
                                            onBlur={field.handleBlur}
                                            max="9999"
                                            min="1"
                                            step="1"
                                            placeholder={t('ui.books.placeholders.num_pages')}
                                            disabled={form.state.isSubmitting}
                                            required={true}
                                            autoComplete="off"
                                        />
                                        <FieldInfo field={field} />
                                    </>
                                )}
                            </form.Field>
                        </div>

                        <div className="space-y-1">
                            <div className="mt-3 mb-2 flex">
                                <Label className="mt-0.5 ml-1">{t('ui.books.fields.genres')}</Label>
                            </div>
                            <MultiSelect
                                options={transformedGenres}
                                onValueChange={setSelectedGenres}
                                defaultValue={selectedGenres}
                                placeholder={t('ui.books.placeholders.genres')}
                                variant="inverted"
                                animation={2}
                                maxCount={5}
                                
                            />
                        </div>
                        {/* Bookshelf id field */}
                        <div className="space-y-1">
                            <div className="mt-3 mb-2 flex">
                                <Label className="mt-0.5 ml-1">{t('ui.books.fields.floor_id')}</Label>
                            </div>

                            <Select
                                value={selectedFloor}
                                onValueChange={(value) => {
                                    setSelectedFloor(value);
                                    console.log(value);
                                }}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder={t('ui.books.placeholders.floor_id')} />
                                </SelectTrigger>
                                <SelectContent>
                                    { floors?.map((floor) => (
                                        <SelectItem key={floor.id} value={floor.id}>
                                            {t(`ui.floors.titles.floor`)} {floor.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <div className="mt-3 mb-2 flex">
                                <Label className="mt-0.5 ml-1">{t('ui.books.fields.zone_id')}</Label>
                            </div>
                            <Select
                                value={selectedZone}
                                onValueChange={(value) => {
                                    setSelectedZone(value);
                                    console.log(value);
                                }}
                                disabled={checkFloor()}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder={t('ui.books.placeholders.zone_id')} />
                                </SelectTrigger>
                                <SelectContent>
                                    {zones
                                        .filter((zone) => zone.floor_id === selectedFloor)
                                        .filter((zone) => selectedGenres.includes(zone.name))
                                        .map((zone) => (
                                            <SelectItem key={zone.id} value={zone.id}>
                                                {t(`ui.genres.names.${zone.name}`)}
                                            </SelectItem>
                                        ))}
                                </SelectContent>
                            </Select>
                            <div className="mt-3 mb-2 flex">
                                <Label className="mt-0.5 ml-1">{t('ui.books.fields.bookshelf_id')}</Label>
                            </div>

                            <form.Field
                                name="bookshelf_id"
                                validators={{
                                    onChangeAsync: async ({ value }) => {
                                        await new Promise((resolve) => setTimeout(resolve, 500));
                                        return !value ? t('ui.validation.required', { attribute: t('ui.books.fields.zone_id').toLowerCase() }) : null;
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
                                        disabled={checkZone()}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder={t('ui.books.placeholders.bookshelf_id')} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {bookshelves
                                                .filter((bookshelf) => bookshelf.zone_name === selectedZone)
                                                .map((bookshelf) => (
                                                    <SelectItem
                                                        key={bookshelf.id}
                                                        value={bookshelf.id}
                                                        disabled={bookshelf.books_count >= bookshelf.max_books}
                                                    >
                                                        {bookshelf.number} - {bookshelf.books_count}/{bookshelf.max_books}
                                                    </SelectItem>
                                                ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            </form.Field>
                        </div>

                        {/* img path field */}
                        <div className="space-y-1">
                            <form.Field
                                name="image"
                                validators={{
                                    onChangeAsync: async ({ value }) => {
                                        await new Promise((resolve) => setTimeout(resolve, 500));
                                        return !selectedImage && !image_path ?
                                        t('ui.validation.required', { attribute: t('ui.books.fields.image').toLowerCase() }) : null;
                                    },
                                }}
                            >
                                {(field) => (
                                    <>
                                        <div className="mt-3 mb-2 flex">
                                            <Label htmlFor={field.name} className="mt-0.5 ml-1">
                                                {t('ui.books.fields.image')}
                                            </Label>
                                        </div>

                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            type="file"
                                            // value={field.state.value}
                                            onChange={(e) => {
                                                field.handleChange(e.target.files[0]);
                                                setSelectedImage(e.target.files[0]);
                                            }}
                                            onBlur={field.handleBlur}
                                            placeholder={t('ui.books.placeholders.img_path')}
                                            disabled={form.state.isSubmitting}
                                            required={true}
                                            autoComplete="off"
                                            accept="image/*"
                                        />

                                        {selectedImage && (
                                            <img
                                                src={URL.createObjectURL(selectedImage)}
                                                alt="Preview"
                                                style={{ width: '200px', height: 'auto', marginTop: '10px' }}
                                            />
                                        )}

                                        {/* Image Preview */}

                                        {image_path && !selectedImage && (
                                            <span>
                                                <img src={image_path} alt="Preview" style={{ width: '200px', height: 'auto', marginTop: '10px' }} />
                                            </span>
                                        )}
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
                            let url = '/books';
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
