<?php

namespace App\Notifications;

use Domain\Books\Models\Book;
use Domain\Users\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class MailNotification extends Notification implements ShouldQueue
{
    use Queueable;
    public $book, $user;
    /**
     * Create a new notification instance.
     */
    
    public function __construct(Book $book, User $user)
    {
        $this->book = $book;
        $this->user = $user;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(): MailMessage
    {
        return (new MailMessage)
                    ->line('Hola, '.$this->user->name.', el libro que habías reservado ('. $this->book->name .') ya está disponible para prestar.')
                    ->action('Ir a por el libro', url('/loans'))
                    ->line('Tiene 7 días para ir a por su reserva.');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
