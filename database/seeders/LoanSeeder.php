<?php

namespace Database\Seeders;

use Domain\Loans\Models\Loan;
use Illuminate\Database\Seeder;

class LoanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Loan::factory(5)->create();
    }
}
