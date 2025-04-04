<?php

namespace Domain\Books\Actions;

use Domain\Books\Data\Resources\BookResource;
use Domain\Books\Models\Book;
use Domain\Bookshelves\Models\Bookshelf;
use Domain\Floors\Models\Floor;
use Domain\Zones\Models\Zone;



class BookIndexAction
{
    public function __invoke(?array $search = null, int $perPage = 10){
        
        $name = $search[0];
        $author = $search[1];
        $publisher = $search[2];
        $num_pages = $search[3];
        $genres = $search[4];
        $bookshelf_number = $search[5];
        $zone = $search[6];
        $zone_name = $search[7];
        $floor = $search[8];


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


        $books = Book::query()
            ->when($name !== 'null', function ($query) use ($name) {
                $query->where('name', 'ILIKE', "%".$name."%");
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
            })
            ->latest()
            ->paginate($perPage);

        return $books->through(fn ($book) => BookResource::fromModel($book));
    
    }
}