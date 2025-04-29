<?php

namespace App\Settings\Controllers;

use App\Core\Controllers\Controller;
use App\Http\Requests\Settings\ProfileUpdateRequest;
use Carbon\Carbon;
use Domain\Books\Models\Book;
use Domain\Loans\Models\Loan;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Show the user's profile settings page.
     */
    public function edit(Request $request): Response
    {
        $user_loans = Loan::where('user_id', $request->user()->id)->orderBy('created_at')->get()->map(function ($loan) {
            $loan->expedit = $loan->created_at ? Carbon::parse($loan->created_at)->format('d-m-Y') : null;
            $loan->return = $loan->return_date ? Carbon::parse($loan->return_date)->format('d-m-Y') : null;
            return $loan;
        })->toArray();
        $books = Book::all()->toArray();

        // dd($user_loans);
        return Inertia::render('settings/profile', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => $request->session()->get('status'),
            'user_loans'=>$user_loans,
            'books' => $books,
        ]);
    }

    /**
     * Update the user's profile settings.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return to_route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
