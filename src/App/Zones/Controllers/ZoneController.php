<?php

namespace App\Zones\Controllers;

use App\Core\Controllers\Controller;
use Domain\Floors\Models\Floor;
use Domain\Genres\Models\Genre;
use Domain\Zones\Actions\ZoneDestroyAction;
use Domain\Zones\Actions\ZoneStoreAction;
use Domain\Zones\Actions\ZoneUpdateAction;
use Domain\Zones\Models\Zone;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ZoneController extends Controller
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
        return Inertia::render('zones/Index', ['lang' => $lang, 'genres'=>$genres]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
         Gate::authorize('reports.export');

        $genres = Genre::select('id', 'name')->get()->toArray();
        $floors = Floor::withCount('zones')->get()->toArray();
        $zones = Zone::all()->toArray();
        return Inertia::render('zones/Create', ['floors' => $floors, 'genres' => $genres, 'zones' => $zones]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, ZoneStoreAction $action)
    {
        // dd($request->all());
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'number' => ['integer', 'min:1', Rule::unique('zones', 'number')->where(fn($query) => $query->where('floor_id', $request->floor_id)) ],
            'max_bookshelves' => ['required', 'integer', 'min:1', 'max:100'],
            'floor_id' => ['required'],
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $action($validator->validated());


        return redirect()->route('zones.index')
            ->with('success', __('messages.zones.created'));
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
    public function edit(Request $request, Zone $zone)
    { 
         Gate::authorize('reports.export');

        $genres = Genre::select('id', 'name')->get()->toArray();
        $floors = Floor::withCount('zones')->get()->toArray();
        $zones = Zone::all()->toArray();
        return Inertia::render('zones/Edit', [
            'zones' => $zones,
            'zone' => $zone,
            'genres' => $genres,
            'floors' => $floors,
            'page' => $request->query('page'),
            'perPage' => $request->query('perPage')
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Zone $zone, ZoneUpdateAction $action)
    {
        // dd($request);
        $validator = Validator::make($request->all(), [
            
            'number' => ['required', Rule::unique('zones', 'number')->where(fn($query) => $query->where('floor_id', $request->floor_id))->ignore($request->id)],
            'floor_id' => ['required', 'string'],
            'name' => ['required', 'string', 'max:255'],
            'max_bookshelves' => ['required', 'integer', 'min:1', 'max:100'],
            
            
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $action($zone, $validator->validated());

        $redirectUrl = route('zones.index');
        
        // Añadir parámetros de página a la redirección si existen
        if ($request->has('page')) {
            $redirectUrl .= "?page=" . $request->query('page');
            if ($request->has('perPage')) {
                $redirectUrl .= "&per_page=" . $request->query('perPage');
            }
        }

        return redirect($redirectUrl)
            ->with('success', __('messages.zones.updated'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Zone $zone, ZoneDestroyAction $action)
    {
         Gate::authorize('reports.view');

        $action($zone);

        return redirect()->route('zones.index')
            ->with('success', __('messages.zones.deleted'));
    }
}
