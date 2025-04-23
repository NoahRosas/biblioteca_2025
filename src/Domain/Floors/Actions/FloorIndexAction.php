<?php

namespace Domain\Floors\Actions;

use Domain\Floors\Data\Resources\FloorResource;
use Domain\Floors\Models\Floor;

class FloorIndexAction
{
    public function __invoke(?array $search = null, int $perPage = 10){
        
       
        $name = $search[0];
        $max_zones = $search[1];
        $created_at = $search[2];

        $floors = Floor::query()
            ->when($name !== "null", function ($query) use ($name) {

                $query->where('name', 'like', $name);
            })
            ->when($max_zones !== "null", function ($query) use ($max_zones) {
                $query->where('max_zones', '=', $max_zones);

            })->when($created_at !== 'null', function ($query) use ($created_at) {

                $query->whereDate('created_at', '=', $created_at);
                
            })
            ->latest()
            ->paginate($perPage);

        return $floors->through(fn ($floor) => FloorResource::fromModel($floor));
    
    }
}