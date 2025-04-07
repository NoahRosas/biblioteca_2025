<?php

namespace Domain\Loan\Models;

use Domain\Books\Models\Book;
use Domain\Users\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\MediaLibrary\MediaCollections\Models\Concerns\HasUuid;

class Loan extends Model
{
    use HasUuid;

/**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'id',
        'user_id',
        'book_id',
        'start_loan',
        'end_loan',
        'borrowed_state',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    
    public function book(): BelongsTo
    {
        return $this->belongsTo(Book::class);
    }
}
