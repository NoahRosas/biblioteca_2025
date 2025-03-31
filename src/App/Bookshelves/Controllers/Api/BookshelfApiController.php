<?php

namespace App\Bookshelves\Controllers\Api;

use App\Core\Controllers\Controller;
use Domain\Bookshelf\Actions\BookshelfDestroyAction;
use Domain\Bookshelves\Actions\BookshelfIndexAction;
use Domain\Bookshelves\Actions\BookshelfStoreAction;
use Domain\Bookshelves\Models\Bookshelf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BookshelfApiController extends Controller
{
    /**
     * Display a listing of the resource search.
     */
    public function index(Request $request, BookshelfIndexAction $action)
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
    public function store(Request $request, BookshelfStoreAction $action)
    {
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'zone_id' => ['required'],
            'max_books' => ['required'],
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
    public function show(Bookshelf $bookshelf)
    {
        return response()->json(['bookshelf' => $bookshelf]);
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
    public function destroy(Bookshelf $bookshelf, BookshelfDestroyAction $action)
    {
        $action($bookshelf);

        return response()->json([
            'message' => __('messages.bookshelves.deleted')
        ]);
    }
}
