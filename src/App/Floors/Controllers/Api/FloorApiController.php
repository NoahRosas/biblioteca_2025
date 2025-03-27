<?php

namespace App\Floors\Controllers\Api;

use App\Core\Controllers\Controller;
use Domain\Floors\Actions\FloorIndexAction;
use Illuminate\Http\Request;

class FloorApiController extends Controller
{
    /**
     * Display a listing of the resource search.
     */
    public function index(Request $request, FloorIndexAction $action)
    {
        dd(response()->json($action($request->search, $request->integer('per_page', 10))));
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
