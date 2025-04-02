import { useTranslations } from "@/hooks/use-translations";
import { BookText } from "lucide-react";

import { PageProps } from "@/types";


import { Zone } from "@/hooks/zones/useZones";
import { BookForm } from "./components/BookForm";
import { BookLayout } from "@/layouts/books/BookLayout";
import { Bookshelf } from "@/hooks/bookshelves/useBookshelves";
import { Genre } from "@/hooks/genres/useGenres";


interface EditBookProps extends PageProps{
    book: {
        id:string,
        name: string,
        author: string,
        publisher: string,
        num_pages: number,
        genres: string,
        bookshelf_id: string,
        
    };
    floors: {
        id:string,
        name:string
    }[];
    zones: Zone[];
    bookshelves:Bookshelf[];
    page?: string;
    perPage?: string;
    genres:Genre[];
    img_path: File,
    
}

export default function EditBook({book, floors, zones,bookshelves, page, perPage, genres, img_path, path}:EditBookProps) {
  const { t } = useTranslations();
  return (
        <BookLayout title={t('ui.books.edit')}>
            <h3 className="flex ml-auto mr-auto mt-2 mb-1">
                <BookText className="mr-1 " />
                {t('ui.books.edit')}
                
            </h3>
            <p className="text-s text-center mb-2 text-muted-foreground">{t('ui.books.extra_info.edit')}</p>
            <BookForm initialData={book} floors={floors} zones={zones} bookshelves={bookshelves} page={page} perPage={perPage} genres={genres} img_path={img_path} />
        </BookLayout>
  );
}