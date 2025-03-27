<?php

namespace Domain\Bookshelves\Models;

use Database\Factories\BookshelfFactory;
use Domain\Books\Models\Book;
use Domain\Zones\Models\Zone;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Bookshelf extends Model
{
    /** @use HasFactory<\Database\Factories\BookshelfFactory> */
    use HasFactory, HasUuids;

    /**
     * Create a new factory instance for the model.
     */
    protected static function newFactory(){
        return BookshelfFactory::new();
    }

     /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'id',
        'number',
        'zone_id',
        'max_books',
        
    ];

    public function zone(): BelongsTo
    {
        return $this->belongsTo(Zone::class);
    }

    public function books(): HasMany
    {
        return $this->hasMany(Book::class);
    }
}
