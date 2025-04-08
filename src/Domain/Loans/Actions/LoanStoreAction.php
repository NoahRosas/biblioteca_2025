<?php

namespace Domain\Loans\Actions;

use Domain\Loans\Data\Resources\LoanResource;
use Domain\Loans\Models\Loan;
use Domain\Users\Models\User;

class LoanStoreAction
{
    public function __invoke(array $data):LoanResource
    {
        $user_id = User::find($data['user_email']);
        $loan = Loan::create([
            'user_id' => $user_id,
            'book_id' => $data['book_id'],
            'end_loan' => $data['end_loan'],
        ]);

        return LoanResource::fromModel($loan);
    }
}
