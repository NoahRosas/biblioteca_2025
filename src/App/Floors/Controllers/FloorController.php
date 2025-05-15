<?php

namespace App\Floors\Controllers;

use App\Core\Controllers\Controller;
use Domain\Floors\Actions\FloorDestroyAction;
use Domain\Floors\Actions\FloorStoreAction;
use Domain\Floors\Actions\FloorUpdateAction;
use Domain\Floors\Models\Floor;
use Domain\Genres\Models\Genre;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class FloorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
         Gate::authorize('reports.view');
        $lang = Auth::user()->settings ? Auth::user()->settings->preferences['locale'] : 'en';

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
            'lang' => $lang,

        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
         Gate::authorize('reports.export');

        $floors = Floor::all()->pluck('name')->toArray();
        
        return Inertia::render('floors/Create', ['floors' => $floors]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, FloorStoreAction $action)
    {  
        // dd(request()->all());
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255',
                Rule::unique('floors', 'name')],
            'max_zones' => ['required'],
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $action($validator->validated());


        return redirect()->route('floors.index')
            ->with('success', __('messages.floors.created'));
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
    public function edit(Request $request, Floor $floor)
    {
         Gate::authorize('reports.export');

        $floors = Floor::all()->pluck('name')->toArray();
        return Inertia::render('floors/Edit', [
            'floors'=> $floors,
            'floor' => $floor,
            'page' => $request->query('page'),
            'perPage' => $request->query('perPage')
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Floor $floor, FloorUpdateAction $action)
    {
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255',
            Rule::unique('floors', 'name')->ignore($request->id)],
            'max_zones' => ['required']
            
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $action($floor, $validator->validated());

        $redirectUrl = route('floors.index');
        
        // Añadir parámetros de página a la redirección si existen
        if ($request->has('page')) {
            $redirectUrl .= "?page=" . $request->query('page');
            if ($request->has('perPage')) {
                $redirectUrl .= "&per_page=" . $request->query('perPage');
            }
        }

        return redirect($redirectUrl)
            ->with('success', __('messages.floors.updated'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Floor $floor, FloorDestroyAction $action)
    {
         Gate::authorize('reports.view');

        $action($floor);

        return redirect()->route('floors.index')
            ->with('success', __('messages.floors.deleted'));
    }
}
