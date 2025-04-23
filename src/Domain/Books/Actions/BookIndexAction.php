<?php

namespace Domain\Books\Actions;

use Domain\Books\Data\Resources\BookResource;
use Domain\Books\Models\Book;
use Domain\Bookshelves\Models\Bookshelf;
use Domain\Floors\Models\Floor;
use Domain\Loans\Models\Loan;
use Domain\Zones\Models\Zone;



class BookIndexAction
{
    public function __invoke(?array $search = null, int $perPage = 10){
        
        $name = $search[0];
        $ISBN = $search[1];
        $author = $search[2];
        $publisher = $search[3];
        $num_pages = $search[4];
        $genres = $search[5];
        $bookshelf_number = $search[6];
        $zone = $search[7];
        $zone_name = $search[8];
        $floor = $search[9];
        $is_available = $search[10];
        $created_at = $search[11];


        $floor_id = Floor::query()->when($floor !== 'null', function ($query) use ($floor){
            $query->where('name', 'like', $floor);
        })->first()->id;


        $zones = Zone::query()->when($floor !== 'null', function ($query) use ($floor_id){
            $query->where('floor_id', 'like', $floor_id);
        })->when($zone_name !== 'null', function ($query) use ($zone_name) {

            $query->where('name', 'ILIKE', '%' . $zone_name . '%');

        })->when($zone !== 'null', function ($query) use ($zone) {

            $query->where('number', '=',  $zone );

        })->pluck('id');


        $bookshelves = Bookshelf::query()->when($floor!== 'null' || $zone !== 'null' || $zone_name !== 'null', function ($query) use ($zones){
            $query->whereIn('zone_id', $zones);
        })->when($bookshelf_number !== 'null', function ($query) use ($bookshelf_number){
            $query->where('number', '=', $bookshelf_number);
        })->pluck('id');

        $loans = Loan::query()->when($is_available !== 'null', function ($query) use ($is_available){
            $query->where('borrowed', '=', $is_available);
        })->pluck('book_id');

        $books = Book::query()
            ->when($name !== 'null', function ($query) use ($name) {

                $query->where('name', 'ILIKE', "%".$name."%");

            })->when($ISBN !== 'null', function ($query) use ($ISBN) {

                $query->where('ISBN', 'ILIKE', "%".$ISBN."%");

            })->when($author !== 'null', function ($query) use ($author) { 

                $query->where('author', 'ILIKE', "%".$author."%");

            })->when($publisher !== 'null', function ($query) use ($publisher) {

                $query->where('publisher', 'ILIKE', "%".$publisher."%");

            })->when($num_pages!== 'null', function ($query) use ($num_pages) {

                $query->where('num_pages', '=', $num_pages);

            })->when($genres!== 'null', function ($query) use ($genres) {

                $query->where('genres', 'ILIKE', "%".$genres."%");

            })->when($bookshelves !== 'null', function ($query) use ($bookshelves) {

                $query->whereIn('bookshelf_id',$bookshelves);

            })->when($is_available !== 'null', function ($query) use ($loans) {

                $query->whereIn('id',$loans);
                
            })->when($created_at !== 'null', function ($query) use ($created_at) {

                $query->whereDate('created_at', '=', $created_at);
                
            })
            ->latest()
            ->paginate($perPage);

        return $books->through(fn ($book) => BookResource::fromModel($book));
    
    }
}