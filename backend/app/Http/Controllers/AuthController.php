<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class AuthController extends ApiController
{
    public function login(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        $user = User::where('email', $validated['email'])->first();

        if (! $user || ! Hash::check($validated['password'], $user->password)) {
            return response()->json(['message' => 'Invalid email or password'], 422);
        }

        $token = Str::random(80);
        $user->forceFill(['api_token' => $token])->save();

        return response()->json([
            'token' => $token,
            'user' => $this->userPayload($user),
        ]);
    }

    public function register(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'studentId' => ['required', 'string', 'max:50', Rule::unique('users', 'student_id')],
            'email' => ['required', 'email', 'max:255', Rule::unique('users', 'email')],
            'password' => ['required', 'string', 'min:6'],
        ]);

        $token = Str::random(80);

        $user = User::create([
            'name' => $validated['name'],
            'student_id' => $validated['studentId'],
            'email' => $validated['email'],
            'password' => $validated['password'],
            'role' => 'student',
            'api_token' => $token,
        ]);

        return response()->json([
            'token' => $token,
            'user' => $this->userPayload($user),
        ], 201);
    }

    public function me(Request $request): JsonResponse
    {
        $user = $this->userFromToken($request);

        if (! $user) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        return response()->json(['user' => $this->userPayload($user)]);
    }

    public function logout(Request $request): JsonResponse
    {
        $user = $this->userFromToken($request);

        if ($user) {
            $user->forceFill(['api_token' => null])->save();
        }

        return response()->json(['message' => 'Logged out']);
    }
}
