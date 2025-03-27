<?php

namespace Domain\Zones\Data\Resources;

use Domain\Floors\Models\Floor;
use Domain\Zones\Models\Zone;
use Spatie\LaravelData\Data;

class ZoneResource extends Data
{
    public function __construct(
        public readonly string $id,
        public readonly string $name,
        public readonly int $max_bookshelves,
        public readonly string $floor_name,
        public readonly string $created_at,
        public readonly string $updated_at,
    ) {
    }

    public static function fromModel(Zone $zone): self
    {
        $floor = Floor::find($zone->floor_id)->name;


        return new self(
            id: $zone->id,
            name: $zone->name,
            max_bookshelves: $zone->max_bookshelves,
            floor_name:$floor,
            created_at: $zone->created_at->format('Y-m-d H:i:s'),
            updated_at: $zone->updated_at->format('Y-m-d H:i:s'),
        );
    }
}
