<?php

namespace Domain\Floors\Actions;

use Domain\Floors\Data\Resources\FloorResource;
use Domain\Floors\Models\Floor;

class FloorStoreAction
{
    public function __invoke(array $data):FloorResource
    {
        $floor = Floor::create([
            'name' => $data['name'],
            'max_zones' => $data['max_zones']
        ]);

        return FloorResource::fromModel($floor);
    }
}
