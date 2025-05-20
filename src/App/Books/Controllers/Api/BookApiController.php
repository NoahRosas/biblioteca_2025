<?php

namespace App\Books\Controllers\Api;
use App\Core\Controllers\Controller;
use Domain\Books\Actions\BookDestroyAction;
use Domain\Books\Actions\BookIndexAction;
use Domain\Books\Models\Book;
use Domain\Bookshelves\Models\Bookshelf;
use Domain\Floors\Models\Floor;
use Domain\Loans\Models\Loan;
use Domain\Zones\Models\Zone;
use Illuminate\Http\Request;

class BookApiController extends Controller
{
    /**
     * Display a listing of the resource search.
     */
    public function index(Request $request, BookIndexAction $action)
    {
        return response()->json($action($request->search, $request->integer('per_page',10)));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Book $book)
    {
        return response()->json(['book' => $book]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Book $book, BookDestroyAction $action)
    {
        $action($book);

        return response()->json([
            'message' => __('messages.books.deleted')
        ]);
    }
     public function book_search(Request $request)
    {
        $id = $request['id'];
        $name = $request['name'];
        $ISBN = $request['ISBN'];
        $author = $request['author'];
        $publisher = $request['publisher'];
        $num_pages = $request['num_pages'];
        $genres = $request['genres'];
        $bookshelf_number = $request['bookshelf_number'];
        $zone = $request['zone'];
        $zone_name = $request['zone_name'];
        $floor = $request['floor'];
        $is_available = $request['is_available'];
        $created_at = $request['created_at'];

        $floor_id = Floor::query()->when($floor !== null, function ($query) use ($floor){
            $query->where('name', '=', $floor);
        })->first()->id;


        $zones = Zone::query()->when($floor !== null, function ($query) use ($floor_id){
            $query->where('floor_id', 'like', $floor_id);
        })->when($zone_name !== null, function ($query) use ($zone_name) {

            $query->where('name', 'ILIKE', '%' . $zone_name . '%');

        })->when($zone !== null, function ($query) use ($zone) {

            $query->where('number', '=',  $zone );

        })->pluck('id');


        $bookshelves = Bookshelf::query()->when($floor!== null || $zone !== null || $zone_name !== null, function ($query) use ($zones){
            $query->whereIn('zone_id', $zones);
        })->when($bookshelf_number !== null, function ($query) use ($bookshelf_number){
            $query->where('number', '=', $bookshelf_number);
        })->pluck('id');

        $loans = Loan::where('borrowed', 'like', 'true')->pluck('book_id');

        $books = Book::query()
            ->when($name !== null, function ($query) use ($name) {

                $query->where('name', 'ILIKE', "%".$name."%");

            })->when($id !== null, function ($query) use ($id) {

                $query->where('id', 'like', $id);

            })->when($ISBN !== null, function ($query) use ($ISBN) {

                $query->where('ISBN', 'ILIKE', "%".$ISBN."%");

            })->when($author !== null, function ($query) use ($author) { 

                $query->where('author', 'ILIKE', "%".$author."%");

            })->when($publisher !== null, function ($query) use ($publisher) {

                $query->where('publisher', 'ILIKE', "%".$publisher."%");

            })->when($num_pages!== null, function ($query) use ($num_pages) {

                $query->where('num_pages', '=', $num_pages);

            })->when($genres!== null, function ($query) use ($genres) {

                $query->where('genres', 'ILIKE', "%".$genres."%");

            })->when($bookshelves !== null, function ($query) use ($bookshelves) {

                $query->whereIn('bookshelf_id',$bookshelves);

            })->when($is_available == 'false', function ($query) use ($loans) {

                $query->whereNotIn('id', $loans);
                
            })->when($is_available == 'true', function ($query) use ($loans) {

                $query->whereIn('id', $loans);
                
            })->when($created_at !== null, function ($query) use ($created_at) {

                $query->whereDate('created_at', '=', $created_at);
                
            });

        return response()->json([
            'books'=>$books->get()
        ]);
    }
}