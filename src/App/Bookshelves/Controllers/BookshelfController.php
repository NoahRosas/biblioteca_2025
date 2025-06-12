<?php

namespace App\Bookshelves\Controllers;

use App\Core\Controllers\Controller;
use Domain\Bookshelves\Actions\BookshelfDestroyAction;
use Domain\Bookshelves\Actions\BookshelfStoreAction;
use Domain\Bookshelves\Actions\BookshelfUpdateAction;
use Domain\Bookshelves\Models\Bookshelf;
use Domain\Floors\Models\Floor;
use Domain\Genres\Models\Genre;
use Domain\Zones\Models\Zone;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class BookshelfController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
         Gate::authorize('reports.view');

        $lang = Auth::user()->settings ? Auth::user()->settings->preferences['locale'] : 'en';
        $genres = Genre::select('name')->get()->map(function ($genre) {
            return [
                'value' => $genre->name
            ];
        });
        return Inertia::render('bookshelves/Index', ['lang' => $lang, 'genres'=>$genres]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
         Gate::authorize('reports.export');

        $floors = Floor::select('id', 'name')->get()->toArray();
        $zones = Zone::withCount('bookshelves')->get()->toArray();
        $bookshelves = Bookshelf::all()->toArray();
        
        return Inertia::render('bookshelves/Create', ['floors' => $floors, 'zones' => $zones, 'bookshelves'=>$bookshelves]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, BookshelfStoreAction $action)
    {
        $validator = Validator::make($request->all(), [
            'number' => ['required', Rule::unique('bookshelves', 'number')->where(fn($query) => $query->where('zone_id', $request->zone_id))],
            'zone_id' => ['required', 'string', 'max:255'],
            'max_books' => ['required', 'integer', 'min:1', 'max:100'],
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $action($validator->validated());


        return redirect()->route('bookshelves.index')
            ->with('success', __('messages.bookshelves.created'));
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
    public function edit(Request $request, Bookshelf $bookshelf)
    {
         Gate::authorize('reports.export');

        $floors = Floor::select('id', 'name')->get()->toArray();
        $zones = Zone::withCount('bookshelves')->get()->toArray(); 
        $bookshelves = Bookshelf::all()->toArray();   
        return Inertia::render('bookshelves/Edit', [
            'bookshelves' => $bookshelves,
            'bookshelf' => $bookshelf,
            'floors' => $floors,
            'zones' => $zones,
            'page' => $request->query('page'),
            'perPage' => $request->query('perPage')]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Bookshelf $bookshelf, BookshelfUpdateAction $action)
    {
        $validator = Validator::make($request->all(), [
            'number' => ['required', Rule::unique('bookshelves', 'number')->where(fn($query) => $query->where('zone_id', $request->zone_id))->ignore($bookshelf->id)],
            'max_books' => ['required', 'integer', 'min:1', 'max:100'],
            'zone_id' => ['required', 'string', 'max:255'],
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $action($bookshelf, $validator->validated());

        $redirectUrl = route('bookshelves.index');
        
        // Añadir parámetros de página a la redirección si existen
        if ($request->has('page')) {
            $redirectUrl .= "?page=" . $request->query('page');
            if ($request->has('perPage')) {
                $redirectUrl .= "&per_page=" . $request->query('perPage');
            }
        }

        return redirect($redirectUrl)
            ->with('success', __('messages.bookshelves.updated'));
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Bookshelf $bookshelf, BookshelfDestroyAction $action)
    {
         Gate::authorize('reports.view');

        $action($bookshelf);

        return redirect()->route('bookshelves.index')
            ->with('success', __('messages.bookshelves.deleted'));
    }
}
