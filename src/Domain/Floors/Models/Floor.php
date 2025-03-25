<?php

namespace Domain\Floors\Models;

use Database\Factories\FloorFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Floor extends Model
{
    /** @use HasFactory<\Database\Factories\FloorFactory> */
    use HasFactory, HasUuids;

    
    /**
     * Create a new factory instance for the model.
     */
    protected static function newFactory(){
        return FloorFactory::new();
    }

     /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'id',
        'name',
        'max_zones',
        
    ];
}
