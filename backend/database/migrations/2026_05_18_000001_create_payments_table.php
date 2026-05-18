<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->string('student_id');
            $table->string('student_name');
            $table->string('contact_number');
            $table->string('department');
            $table->string('academic_year');
            $table->decimal('amount', 10, 2);
            $table->string('transaction_id')->unique();
            $table->date('payment_date');
            $table->string('course_name');
            $table->longText('receipt_file')->nullable();
            $table->string('status')->default('Pending');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
