<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Payment Status</title>
</head>
<body style="font-family: Arial; background:#f5f5f5; padding:40px;">
<div style="background:white; max-width:600px; margin:auto; padding:30px; border-radius:10px;">

    @if($payment->status === 'Approved')
        <h1 style="color:#16a34a;">✅ Payment Approved</h1>
        <p>Your payment has been reviewed and <strong>approved</strong> successfully.</p>
    @else
        <h1 style="color:#dc2626;">❌ Payment Rejected</h1>
        <p>Your payment has been reviewed and <strong>rejected</strong>. Please contact admin for more details.</p>
    @endif

    <hr>

    <p><strong>Student Name:</strong> {{ $payment->student_name }}</p>
    <p><strong>Student ID:</strong> {{ $payment->student_id }}</p>
    <p><strong>Contact:</strong> {{ $payment->contact_number }}</p>
    <p><strong>Department:</strong> {{ $payment->department }}</p>
    <p><strong>Academic Year:</strong> {{ $payment->academic_year }}</p>
    <p><strong>Course:</strong> {{ $payment->course_name }}</p>
    <p><strong>Amount:</strong> ${{ $payment->amount }}</p>
    <p><strong>Transaction ID:</strong> {{ $payment->transaction_id }}</p>
    <p><strong>Payment Date:</strong> {{ \Carbon\Carbon::parse($payment->payment_date)->format('Y-m-d') }}</p>

    <p>
        <strong>Status:</strong>
        <span style="
            background: {{ $payment->status === 'Approved' ? '#16a34a' : '#dc2626' }};
            color: white;
            padding: 5px 12px;
            border-radius: 20px;
        ">
            {{ $payment->status }}
        </span>
    </p>

</div>
</body>
</html>