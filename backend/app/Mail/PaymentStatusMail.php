<?php

namespace App\Mail;

use App\Models\Payment;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PaymentStatusMail extends Mailable
{
    use Queueable, SerializesModels;

    public Payment $payment;

    public function __construct(Payment $payment)
    {
        $this->payment = $payment;
    }

    public function build(): self
    {
        $subject = $this->payment->status === 'Approved'
            ? '[STUDENT] ✅ Your Payment Has Been Approved'
            : '[STUDENT] ❌ Your Payment Has Been Rejected';

        return $this->subject($subject)
                    ->view('emails.payment-status');
    }
}