<?php

namespace App\Loans\Controllers;

use App\Core\Controllers\Controller;
use Domain\Loans\Actions\LoanStoreAction;
use Domain\Loans\Models\Loan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class LoanController extends Controller
{
    public function index()
    {
        return Inertia::render('loans/Index');
    }

    public function create()
    {
        return Inertia::render('loans/Create');
    }

    public function store(Request $request, LoanStoreAction $action)
    {   
        // dd(request()->all());
        $validator = Validator::make($request->all(), [
            'user_email' => ['required', 'string', 'max:255'],
            'book_id' => ['required'],
            'end_loan' => ['required'],
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $action($validator->validated());


        return redirect()->route('loans.index')
            ->with('success', __('messages.loans.created'));
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

    public function destroy(Loan $loan)
    {
        

        return redirect()->route('loans.index')
            ->with('success', __('messages.loans.deleted'));
    }
}

