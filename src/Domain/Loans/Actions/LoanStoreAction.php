<?php

namespace Domain\Loans\Actions;

use Domain\Loans\Data\Resources\LoanResource;
use Domain\Loans\Models\Loan;
use Domain\Users\Models\User;
use Illuminate\Support\Facades\DB;

class LoanStoreAction
{
    public function __invoke(array $data):LoanResource
    {
        $user_id = DB::table('users')->where('email', $data['user_email'])->first()->id;
        $loan = Loan::create([
            'user_id' => $user_id,
            'book_id' => $data['book_id'],
            'end_loan' => $data['end_loan'],
            'borrowed' => true,
            'is_overdue' => false,
        ]);

        return LoanResource::fromModel($loan);
    }
}
