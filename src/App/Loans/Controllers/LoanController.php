<?php

namespace App\Loans\Controllers;

use App\Core\Controllers\Controller;
use Domain\Books\Models\Book;
use Domain\Loans\Actions\LoanDestroyAction;
use Domain\Loans\Actions\LoanStoreAction;
use Domain\Loans\Actions\LoanUpdateAction;
use Domain\Loans\Models\Loan;
use Domain\Users\Models\User;
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
        $books = Book::with('activeLoan');
        return Inertia::render('loans/Create', ['books' => $books]);
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
        return Inertia::render('loans/Edit',[
            'loan' => $loan,
            'page' => $request->query('page'),
            'perPage' => $request->query('perPage'),
        ]);
    }

    public function update(Request $request, Loan $loan, LoanUpdateAction $action)
    {
        $validator = Validator::make($request->all(), [
            'borrowedState'=>[],
            

        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $action($loan, $validator->validated());

        $redirectUrl = route('loans.index');

        // Añadir parámetros de página a la redirección si existen
        if ($request->has('page')) {
            $redirectUrl .= "?page=" . $request->query('page');
            if ($request->has('perPage')) {
                $redirectUrl .= "&per_page=" . $request->query('perPage');
            }
        }

        return redirect($redirectUrl)
            ->with('success', __('messages.loans.updated'));
    }
    

    public function destroy(Loan $loan, LoanDestroyAction $action)
    {
        $action($loan);

        return redirect()->route('loans.index')
            ->with('success', __('messages.loans.deleted'));
    }
}

