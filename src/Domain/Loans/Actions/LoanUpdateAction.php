<?php

namespace Domain\Loans\Actions;

use Carbon\Carbon;
use Domain\Loans\Data\Resources\LoanResource;
use Domain\Loans\Models\Loan;

class LoanUpdateAction
{
    public function __invoke(Loan $loan, array $data): LoanResource
    {
        $borrowedStateCheck = $loan->borrowed;
        $return_dateCheck = $loan->return_date;
        $is_overdueCheck = $loan->is_overdue;
        if (isset($data['borrowedState'])) {
            $borrowedStateCheck = $data['borrowedState'];
            $return_dateCheck = Carbon::now();
            if ($return_dateCheck>$loan->end_loan) {
                $is_overdueCheck = true;
            }
        }

        $updateData = [
            'borrowed' => $borrowedStateCheck,
            'return_date' => $return_dateCheck,
            'is_overdue' => $is_overdueCheck,
        ];

        $loan->update($updateData);
     

        return LoanResource::fromModel($loan->fresh());
    }
}
