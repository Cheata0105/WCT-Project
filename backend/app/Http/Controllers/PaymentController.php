<?php

namespace App\Http\Controllers;
use App\Models\Payment;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use App\Mail\PaymentSubmittedMail;
use App\Mail\PaymentStatusMail;

class PaymentController extends ApiController
{
    public function index(Request $request): JsonResponse
    {
        $user = $this->userFromToken($request);

        if (! $user) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        $query = Payment::query()->latest();

        if ($user->role !== 'admin') {
            $query->where('student_id', $user->student_id);
        }

        return response()->json([
            'payments' => $query->get()->map(fn (Payment $payment) => $this->paymentPayload($payment))->values(),
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $user = $this->userFromToken($request);

        if (! $user || $user->role !== 'student') {
            return response()->json(['message' => 'Student access required'], 403);
        }

        $validated = $request->validate([
            'studentId'     => ['required', 'string', 'max:50'],
            'studentName'   => ['required', 'string', 'max:255'],
            'contactNumber' => ['required', 'string', 'max:50'],
            'department'    => ['required', 'string', 'max:255'],
            'academicYear'  => ['required', 'string', 'max:255'],
            'amount'        => ['required', 'numeric', 'min:0.01'],
            'transactionId' => ['nullable', 'string', 'max:255', Rule::unique('payments', 'transaction_id')],
            'paymentDate'   => ['required', 'date'],
            'courseName'    => ['required', 'string', 'max:255'],
            'receiptFile'   => ['required', 'string'],
        ]);

        $payment = Payment::create([
            'user_id'        => $user->id,
            'student_id'     => $validated['studentId'],
            'student_name'   => $validated['studentName'],
            'contact_number' => $validated['contactNumber'],
            'department'     => $validated['department'],
            'academic_year'  => $validated['academicYear'],
            'amount'         => $validated['amount'],
            'transaction_id' => $validated['transactionId'] ?? 'TXN-'.Str::upper(Str::random(10)),
            'payment_date'   => $validated['paymentDate'],
            'course_name'    => $validated['courseName'],
            'receipt_file'   => $validated['receiptFile'],
            'status'         => 'Pending',
        ]);

        // Student submits → notify ADMIN
        Mail::to('sinhporsurii@gmail.com')
        ->send(new PaymentSubmittedMail($payment));

        return response()->json(['payment' => $this->paymentPayload($payment)], 201);
    }

    public function updateStatus(Request $request, Payment $payment): JsonResponse
{
    $user = $this->userFromToken($request);

    if (! $user || $user->role !== 'admin') {
        return response()->json(['message' => 'Admin access required'], 403);
    }

    $validated = $request->validate([
        'status' => ['required', Rule::in(['Approved', 'Rejected'])],
    ]);

    $payment->update(['status' => $validated['status']]);

    // ✅ PaymentStatusMail — sends Approved or Rejected to student
    Mail::to('sinhporsurii@gmail.com')
        ->send(new PaymentStatusMail($payment));

    return response()->json(['payment' => $this->paymentPayload($payment)]);
}

    private function paymentPayload(Payment $payment): array
    {
        return [
            'id'            => (string) $payment->id,
            'studentId'     => $payment->student_id,
            'studentName'   => $payment->student_name,
            'contactNumber' => $payment->contact_number,
            'department'    => $payment->department,
            'academicYear'  => $payment->academic_year,
            'amount'        => (float) $payment->amount,
            'transactionId' => $payment->transaction_id,
            'paymentDate'   => $payment->payment_date->format('Y-m-d'),
            'courseName'    => $payment->course_name,
            'receiptFile'   => $payment->receipt_file,
            'status'        => $payment->status,
            'dateSubmitted' => $payment->created_at->format('Y-m-d'),
        ];
    }
}