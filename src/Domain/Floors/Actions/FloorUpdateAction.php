<?php

namespace Domain\Floors\Actions;

use Domain\Floors\Data\Resources\FloorResource;
use Domain\Floors\Models\Floor;



class FloorUpdateAction
{
    public function __invoke(Floor $floor, array $data): FloorResource
    {
        $updateData = [
            'name' => $data['name'],
            'max_zones' => $data['max_zones'],
        ];

        $floor->update($updateData);

        return FloorResource::fromModel($floor->fresh());
    }
}
