<?php

namespace App\Floors\Controllers;

use App\Core\Controllers\Controller;
use Domain\Floors\Models\Floor;
use Domain\Genres\Models\Genre;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FloorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $floors = Floor::with(['zones'])
            ->withCount('zones')
            ->orderBy('name')
            ->get()
            ->map(fn(Floor $floor) => [
                'id' => $floor->id,
                'name' => $floor->name,
                'max_zones' => $floor->max_zones,
                'zones' => $floor->zones,
                'count' => $floor->zones_count, // Este campo se genera con withCount
            ])->toArray();



        return Inertia::render('floors/Index', [
            'floors' => $floors,

        ]);
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
