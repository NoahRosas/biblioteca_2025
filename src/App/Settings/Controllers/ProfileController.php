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
        $user_loans = Loan::where('user_id', $request->user()->id)
        ->withTrashed()
        ->with('book')
        ->orderBy('created_at', 'desc')
        ->get()
        ->map(function ($loan) {
            $loan->expedit = $loan->created_at ? Carbon::parse($loan->created_at)->format('d-m-Y') : null;
            $loan->return = $loan->return_date ? Carbon::parse($loan->return_date)->format('d-m-Y') : null;
            $loan->end = $loan->end_loan ? Carbon::parse($loan->end_loan)->format('d-m-Y') : null;
            $loan->overdue = (Carbon::now() > $loan->end_loan && $loan->return_date === null || $loan->return_date > $loan->end_loan) || false;
            // dd($loan->overdue);
            if ($loan->overdue) {
                if ($loan->return_date === null) {
                    $loan->days_overdue = (int) Carbon::now()->diffInDays($loan->end_loan);
                } else {
                    $loan->end_loan = new Carbon($loan->end_loan);
                    $loan->days_overdue = (int) $loan->end_loan->diffInDays($loan->return_date);
                }
            } else {
                $loan->days_overdue = null;
            }
            $loan->img = $loan->book->getFirstMediaUrl('images', 'preview');
            return $loan;
        })
        ->toArray();
 

        // dd($user_loans);
        return Inertia::render('settings/profile', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => $request->session()->get('status'),
            'user_loans'=>$user_loans,
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
