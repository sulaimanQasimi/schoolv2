<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\School;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\Rule;

class SchoolController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $query = School::with('branches');

        // Search functionality
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('code', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        // Pagination
        $perPage = $request->get('per_page', 15);
        $schools = $query->paginate($perPage);

        return response()->json($schools);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'nullable|string|max:255|unique:schools,code',
            'address' => 'nullable|string',
            'email' => 'nullable|email|max:255',
            'phone_number' => 'nullable|string|max:255',
        ]);

        $school = School::create($validated);

        return response()->json([
            'message' => 'School created successfully',
            'data' => $school->load('branches')
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse
    {
        $school = School::with('branches')->findOrFail($id);

        return response()->json($school);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $school = School::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'code' => [
                'nullable',
                'string',
                'max:255',
                Rule::unique('schools', 'code')->ignore($school->id)
            ],
            'address' => 'nullable|string',
            'email' => 'nullable|email|max:255',
            'phone_number' => 'nullable|string|max:255',
        ]);

        $school->update($validated);

        return response()->json([
            'message' => 'School updated successfully',
            'data' => $school->load('branches')
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): JsonResponse
    {
        $school = School::findOrFail($id);
        $school->delete(); // Soft delete

        return response()->json([
            'message' => 'School deleted successfully'
        ]);
    }
}
