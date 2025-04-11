<?php

namespace App\Loans\Controllers\Api;

use App\Core\Controllers\Controller;
use Domain\Loans\Actions\LoanDestroyAction;
use Domain\Loans\Actions\LoanIndexAction;
use Domain\Loans\Models\Loan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LoanApiController extends Controller
{
    public function index(Request $request, LoanIndexAction $action)
    {
        return response()->json($action($request->search, $request->integer('per_page',10)));
    }

    public function create()
    {
       
    }

    public function store(Request $request)
    {
        
    }

     /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    public function edit(Request $request, Loan $loan)
    {

    }

    public function update(Request $request, Loan $loan)
    {

    }

    public function destroy(Loan $loan, LoanDestroyAction $action)
    {
        $action($loan);

        return response()->json([
            'message' => __('messages.loans.deleted')
        ]);
    }
}

