<?php

namespace App\Graphs\Controllers;

use Domain\Graphs\Actions\GraphBookAction;
use Domain\Graphs\Actions\GraphUserAction;
use Domain\Graphs\Actions\GraphZoneAction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GraphController
{
    /**
     * Display a listing of the resource.
     */
    public function index(GraphBookAction $book_action, GraphUserAction $user_action, GraphZoneAction $zone_action)
    {
        $books = $book_action();

        $users = $user_action();

        $zones = $zone_action();

        return Inertia::render('graphs', ['books' => $books, 'users' => $users, 'zones' => $zones]);
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
    public function show(string $id)
    {
        //
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
    public function destroy(string $id)
    {
        //
    }
}
