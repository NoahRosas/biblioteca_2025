import { useTranslations } from "@/hooks/use-translations";
import { BookText } from "lucide-react";

import { PageProps } from "@/types";


import { Zone } from "@/hooks/zones/useZones";
import { BookForm } from "./components/BookForm";
import { BookLayout } from "@/layouts/books/BookLayout";
import { Bookshelf } from "@/hooks/bookshelves/useBookshelves";
import { Genre } from "@/hooks/genres/useGenres";


interface CreateBookProps extends PageProps{
    books: any[];
    floors: {
        id:string,
        name:string
    }[];
    zones: Zone[];
    bookshelves:Bookshelf[];
    genres: Genre[];
}

export default function CreateBook({floors, zones,bookshelves, genres, books}:CreateBookProps) {
  const { t } = useTranslations();
  return (
        <BookLayout title={t('ui.books.create')}>
            <h3 className="flex ml-auto mr-auto mt-2 mb-1">
                <BookText className="mr-1 " />
                {t('ui.books.create')}
                
            </h3>
            <p className="text-s text-center mb-2 text-muted-foreground">{t('ui.books.extra_info.create')}</p>
            <BookForm floors={floors} zones={zones} bookshelves={bookshelves} genres={genres} books={books}/>
        </BookLayout>
  );
}