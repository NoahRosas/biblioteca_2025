<?php

namespace App\Loans\Controllers;

use App\Core\Controllers\Controller;
use App\Notifications\MailNotification;
use Domain\Books\Models\Book;
use Domain\Loans\Actions\LoanDestroyAction;
use Domain\Loans\Actions\LoanStoreAction;
use Domain\Loans\Actions\LoanUpdateAction;
use Domain\Loans\Models\Loan;
use Domain\Reservations\Actions\ReservationDestroyAction;
use Domain\Reservations\Models\Reservation;
use Domain\Users\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class LoanController extends Controller
{
    public function index()
    {
         Gate::authorize('reports.view');

        $lang = Auth::user()->settings ? Auth::user()->settings->preferences['locale'] : 'en';
        return Inertia::render('loans/Index', ['lang' => $lang]);
    }

    public function create()
    {
         Gate::authorize('reports.view');

        $user_emails = User::select('email')->get()->toArray();
        $books = Book::with('activeLoan');
        $lang = Auth::user()->settings ? Auth::user()->settings->preferences['locale'] : 'en';
        // dd($user_emails);
        return Inertia::render('loans/Create', ['user_emails'=> $user_emails,'books' => $books, 'lang' => $lang]);
    }

    public function store(Request $request, LoanStoreAction $action)
    {   

        $validator = Validator::make($request->all(), [
            'user_email' => ['required', 'string', 'max:255'],
            'book_id' => ['required', 'string', 'max:255'],
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

    public function edit(Request $request, Loan $loan){
         Gate::authorize('reports.view');

        $user_email = User::select('email')->where('id', $loan->user_id)->get();
        $user_emails = User::select('email')->get()->toArray();
        $lang = Auth::user()->settings ? Auth::user()->settings->preferences['locale'] : 'en';
        return Inertia::render('loans/Edit',[
            'loan' => $loan,
            'lang' => $lang,
            'user_email' => $user_email[0]->email,
            'user_emails' => $user_emails,
            'page' => $request->query('page'),
            'perPage' => $request->query('perPage'),
        ]);
    }

    public function update(Request $request, Loan $loan, LoanUpdateAction $action, ReservationDestroyAction $destroy_reservation)
    {
        $validator = Validator::make($request->all(), [
            'borrowedState'=>[],
            'end_loan'=>[],

        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $action($loan, $validator->validated());

        $reservation = Reservation::where('book_id', $loan->book_id)->first();
        
        if(isset($reservation)){
            $user = User::where('id', $reservation->user_id)->first();
            $book = Book::where('id', $reservation->book_id)->first();
            $user->notify(new MailNotification($book, $user));
            $destroy_reservation($reservation);
        }
        
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
        // $action($loan);

        // return redirect()->route('loans.index')
        //     ->with('success', __('messages.loans.deleted'));
    }
}

