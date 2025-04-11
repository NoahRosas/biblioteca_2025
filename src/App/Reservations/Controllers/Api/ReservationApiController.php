<?php

namespace App\Reservations\Controllers\Api;

use Domain\Reservations\Actions\ReservationDestroyAction;
use Domain\Reservations\Actions\ReservationIndexAction;
use Domain\Reservations\Models\Reservation;
use Illuminate\Http\Request;

class ReservationApiController
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, ReservationIndexAction $action)
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
    public function destroy(Reservation $reservation, ReservationDestroyAction $action)
    {
        $action($reservation);

        return response()->json([
            'message' => __('messages.reservations.deleted')
        ]);
    }
}
