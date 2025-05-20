<?php

namespace App\Books\Controllers;
use App\Core\Controllers\Controller;
use Domain\Books\Actions\BookDestroyAction;
use Domain\Books\Actions\BookStoreAction;
use Domain\Books\Actions\BookUpdateAction;
use Domain\Books\Models\Book;
use Domain\Bookshelves\Models\Bookshelf;
use Domain\Floors\Models\Floor;
use Domain\Genres\Models\Genre;
use Domain\Zones\Models\Zone;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
         Gate::authorize('products.view');

        $lang = Auth::user()->settings ? Auth::user()->settings->preferences['locale'] : 'en';
        $genres = Genre::select('name')->get()->map(function ($genre) {
            return [
                'value' => $genre->name
            ];
        });
        
        return Inertia::render('books/Index', ['lang' => $lang, 'genres' => $genres]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
         Gate::authorize('products.create');

        $books = Book::all()->toArray();
        $floors = Floor::select('id', 'name')->get()->toArray();
        $zones = Zone::all();
        $bookshelves = Bookshelf::withCount('books')->get()->toArray();
        $genres = Genre::select('name')->get()->map(function ($genre) {
            return [
                'value' => $genre->name
            ];
        });
        
        return Inertia::render('books/Create', ['floors' => $floors, 'zones' => $zones, 'bookshelves' => $bookshelves, 'genres' => $genres, 'books' => $books]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, BookStoreAction $action)
    {
    //    dd($request);
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'ISBN' => ['required', 'string', 'max:255'],
            'author' => ['required', 'string', 'max:255'],
            'publisher' => ['required', 'string', 'max:255'],
            'num_pages' => ['required', 'integer', 'min:1', 'max:9999'],
            'bookshelf_id' => ['required', 'string', 'max:255'],
            'genres' => ['required', 'string'],
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $action($validator->validated(), $request->files);

        

        return redirect()->route('books.index')
            ->with('success', __('messages.books.created'));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, Book $book)
    {
         Gate::authorize('products.edit');
        
        $floors = Floor::select('id', 'name')->get()->toArray();
        $zones = Zone::all();
        $bookshelves = Bookshelf::withCount('books')->get()->toArray();
        $genres = Genre::select('name')->get()->map(function ($genre) {
            return [
                'value' => $genre->name
            ];
        });
        
        $image_path = $book->getFirstMediaUrl('images');
        
        return Inertia::render('books/Edit', [
            'book' => $book,
            'floors' => $floors,
            'zones' => $zones,
            'bookshelves'=> $bookshelves,
            'genres' => $genres,
            'image_path'=>$image_path,
            'page' => $request->query('page'),
            'perPage' => $request->query('perPage')]);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Book $book, BookUpdateAction $action)
    {
        // dd($request);
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'ISBN' => ['required', 'string', 'max:255'],
            'author' => ['required', 'string', 'max:255'],
            'publisher' => ['required', 'string', 'max:255'],
            'num_pages' => ['required', 'integer', 'min:1', 'max:9999'],
            'bookshelf_id' => ['required', 'string', 'max:255'],
            'genres' => ['required', 'string']
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $action($book, $validator->validated(), $request->files);

        $redirectUrl = route('books.index');

        // Añadir parámetros de página a la redirección si existen
        if ($request->has('page')) {
            $redirectUrl .= "?page=" . $request->query('page');
            if ($request->has('perPage')) {
                $redirectUrl .= "&per_page=" . $request->query('perPage');
            }
        }

        return redirect($redirectUrl)
            ->with('success', __('messages.books.updated'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Book $book, BookDestroyAction $action)
    {
         Gate::authorize('products.destroy');

        $action($book);

        return redirect()->route('books.index')
            ->with('success', __('messages.books.deleted'));
    }
}