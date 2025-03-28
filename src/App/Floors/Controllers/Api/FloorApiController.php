<?php

namespace App\Floors\Controllers\Api;

use App\Core\Controllers\Controller;
use Domain\Floors\Actions\FloorDestroyAction;
use Domain\Floors\Actions\FloorIndexAction;
use Domain\Floors\Actions\FloorStoreAction;
use Domain\Floors\Actions\FloorUpdateAction;
use Domain\Floors\Models\Floor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class FloorApiController extends Controller
{
    /**
     * Display a listing of the resource search.
     */
    public function index(Request $request, FloorIndexAction $action)
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
    public function store(Request $request, FloorStoreAction $action)
    {
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'max_zones' => ['required'],
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $floor = $action($validator->validated());
        
        

        return response()->json([
            'message' => __('messages.floors.created'),
            'floor' => $floor
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Floor $floor)
    {
        
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
    public function destroy(Floor $floor, FloorDestroyAction $action)
    {
        $action($floor);

        return response()->json([
            'message' => __('messages.floors.deleted')
        ]);
    }
}