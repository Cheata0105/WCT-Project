<?php

namespace Database\Seeders;

use App\Models\Payment;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $student = User::updateOrCreate(
            ['email' => 'student@rupp.edu.kh'],
            [
                'name' => 'Chan Sotheara',
                'student_id' => '102938',
                'role' => 'student',
                'password' => Hash::make('student123'),
            ]
        );

        User::updateOrCreate(
            ['email' => 'admin@rupp.edu.kh'],
            [
                'name' => 'Admin User',
                'student_id' => null,
                'role' => 'admin',
                'password' => Hash::make('admin123'),
            ]
        );

        Payment::updateOrCreate(
            ['transaction_id' => 'TXN-001'],
            [
                'user_id' => $student->id,
                'student_id' => '102938',
                'student_name' => 'Chan Sotheara',
                'contact_number' => '012 345 678',
                'department' => 'Computer Science',
                'academic_year' => 'Year 2 - Semester 1',
                'amount' => 450,
                'payment_date' => '2024-03-10',
                'course_name' => 'Computer Science 101',
                'receipt_file' => 'receipt-001.pdf',
                'status' => 'Approved',
            ]
        );

        Payment::updateOrCreate(
            ['transaction_id' => 'TXN-002'],
            [
                'user_id' => $student->id,
                'student_id' => '102938',
                'student_name' => 'Chan Sotheara',
                'contact_number' => '012 345 678',
                'department' => 'Computer Science',
                'academic_year' => 'Year 2 - Semester 1',
                'amount' => 450,
                'payment_date' => '2024-02-15',
                'course_name' => 'Data Structures',
                'receipt_file' => 'receipt-002.pdf',
                'status' => 'Pending',
            ]
        );
    }
}
