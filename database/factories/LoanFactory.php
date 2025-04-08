<?php

namespace Database\Factories;

use Domain\Books\Models\Book;
use Domain\Loans\Models\Loan;
use Domain\Users\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Model>
 */
class LoanFactory extends Factory
{
    
    /**
     * Define the model's default state.
     *
     * @return string
     * 
     */
    protected $model = Loan::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $user= User::all()->random();
        $book = Book::all()->random();
        return [
            'user_id' => $user->id,
            'book_id' => $book->id,
            'end_loan' => date('d,m,Y', strtotime('+1 month')),
        ];
    }
}
