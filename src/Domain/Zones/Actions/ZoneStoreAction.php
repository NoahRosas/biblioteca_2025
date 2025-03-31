<?php

namespace Domain\Zones\Actions;

use Domain\Zones\Data\Resources\ZoneResource;
use Domain\Zones\Models\Zone;

class ZoneStoreAction
{
    public function __invoke(array $data):ZoneResource
    {
        $zone = Zone::create([
            'name' => $data['name'],
            'floor_id' => $data['floor_id'],
            'max_bookshelves' => $data['max_bookshelves'],
        ]);

        return ZoneResource::fromModel($zone);
    }
}
