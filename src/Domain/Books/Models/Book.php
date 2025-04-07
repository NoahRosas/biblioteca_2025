<?php

namespace Domain\Books\Models;

use Database\Factories\BookFactory;
use Domain\Bookshelves\Models\Bookshelf;
use Domain\Genres\Models\Genre;
use Domain\Loan\Models\Loan;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\Image\Enums\Fit;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Book extends Model implements HasMedia
{
    /** @use HasFactory<\Database\Factories\BookFactory> */
    use HasFactory, HasUuids, InteractsWithMedia;
    /**
     * Create a new factory instance for the model.
     */
    protected static function newFactory()
    {
        return BookFactory::new();
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'id',
        'name',
        'author',
        'publisher',
        'num_pages',
        'genres',
        'bookshelf_id',


    ];

    public function floor(): BelongsTo
    {
        return $this->belongsTo(Bookshelf::class);
    }

    public function genres(): BelongsToMany
    {
        return $this->belongsToMany(Genre::class, "book_genre", 'book_id', 'genre_id');
    }

    public function registerMediaConversions(?Media $media = null): void
    {
        $this
            ->addMediaConversion('preview')
            ->fit(Fit::Contain, 300, 300)
            ->nonQueued();
    }

    public function loans(): HasMany
    {
        return $this->hasMany(Loan::class);
    }
}
