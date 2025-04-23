<?php

namespace App\Reservations\Controllers;

use Domain\Reservations\Actions\ReservationStoreAction;
use Domain\Reservations\Actions\ReservationUpdateAction;
use Domain\Reservations\Models\Reservation;
use Domain\Users\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class ReservationController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $lang = Auth::user()->settings ? Auth::user()->settings->preferences['locale'] : 'en';
        return Inertia::render('reservations/Index', ['lang' => $lang]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('reservations/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, ReservationStoreAction $action)
    {
        // dd(request()->all());
        $validator = Validator::make($request->all(), [
            'user_email' => ['required', 'string', 'max:255'],
            'book_id' => ['required'],
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $action($validator->validated());


        return redirect()->route('reservations.index')
            ->with('success', __('messages.reservations.created'));
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
    public function edit(Request $request, Reservation $reservation)
    {
        $user_email = User::select('email')->where('id', $reservation->user_id)->get();
        return Inertia::render('reservations/Edit', [
            'reservation' => $reservation,
            'user_email' => $user_email[0]->email,
            'page' => $request->query('page'),
            'perPage' => $request->query('perPage'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Reservation $reservation, ReservationUpdateAction $action)
    {
        $validator = Validator::make($request->all(), [
            'user_email' => ['required', 'string', 'max:255'],
            'book_id' => ['required'],
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $action($reservation, $validator->validated());

        $redirectUrl = route('reservations.index');

        // Añadir parámetros de página a la redirección si existen
        if ($request->has('page')) {
            $redirectUrl .= "?page=" . $request->query('page');
            if ($request->has('perPage')) {
                $redirectUrl .= "&per_page=" . $request->query('perPage');
            }
        }

        return redirect($redirectUrl)
            ->with('success', __('messages.loans.updated'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
