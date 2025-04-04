<?php

namespace Domain\Zones\Actions;

use Domain\Floors\Models\Floor;
use Domain\Zones\Data\Resources\ZoneResource;
use Domain\Zones\Models\Zone;

class ZoneIndexAction
{
    public function __invoke(?array $search = null, int $perPage = 10){
        
    
        $name = $search[0];
        $number = $search[1];
        $max_bookshelves = $search[2];
        $floor = $search[3];

        $floor_id = Floor::query()->when($floor!== 'null', function ($query) use ($floor){
            $query->where('name', 'like', $floor);
        })->first()->id;

        $zones = Zone::query()
            ->when($name !== "null", function ($query) use ($name) {

                $query->where('name', 'ILIKE', '%'. $name .'%');
            })
            ->when($number !== "null", function ($query) use ($number) {

                $query->where('number', '=', $number);
            })
            ->when($max_bookshelves !== "null", function ($query) use ($max_bookshelves) {

                $query->where('max_bookshelves', '=', $max_bookshelves);
            })
            ->when($floor_id !== "null", function ($query) use ($floor_id) {

                $query->where('floor_id', '=', $floor_id);
            })
            ->latest()
            ->paginate($perPage);

        return $zones->through(fn ($zone) => ZoneResource::fromModel($zone));
    
    }
}