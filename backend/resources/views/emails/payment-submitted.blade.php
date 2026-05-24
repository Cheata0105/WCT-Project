<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>New Payment Submitted</title>
</head>
<body style="font-family: Arial; background:#f5f5f5; padding:40px;">
<div style="background:white; max-width:600px; margin:auto; padding:30px; border-radius:10px;">

    <h1 style="color:#2563eb;">📋 New Payment Submitted</h1>
    <p>A student has submitted a payment. Please review and take action.</p>

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
        <span style="background:orange; color:white; padding:5px 12px; border-radius:20px;">
            Pending
        </span>
    </p>

    <p style="margin-top:20px; color:#6b7280;">
        Please log in to the admin dashboard to approve or reject.
    </p>

</div>
</body>
</html>