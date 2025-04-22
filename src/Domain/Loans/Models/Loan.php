<?php

namespace Domain\Loans\Models;

use Database\Factories\LoanFactory;
use Domain\Books\Models\Book;
use Domain\Users\Models\User;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Loan extends Model
{
    use HasUuids, HasFactory, SoftDeletes;
    protected static function newFactory()
    {
        return LoanFactory::new();
    }
/**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'id',
        'user_id',
        'book_id',
        'end_loan',
        'borrowed',
        'return_date',
        'is_overdue',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    
    public function book(): BelongsTo
    {
        return $this->belongsTo(Book::class, 'book_id');
    }

    
}
