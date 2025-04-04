<?php

namespace Domain\Floors\Actions;

use Domain\Floors\Data\Resources\FloorResource;
use Domain\Floors\Models\Floor;

class FloorIndexAction
{
    public function __invoke(?array $search = null, int $perPage = 10){
        
       
        $name = $search[0];
        $max_zones = $search[1];

        $floors = Floor::query()
            ->when($name !== "null", function ($query) use ($name) {

                $query->where('name', 'like', $name);
            })
            ->when($max_zones !== "null", function ($query) use ($max_zones) {
                $query->where('max_zones', '=', $max_zones);
            })
            ->latest()
            ->paginate($perPage);

        return $floors->through(fn ($floor) => FloorResource::fromModel($floor));
    
    }
}