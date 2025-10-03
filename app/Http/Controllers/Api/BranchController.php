<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Branch;
use App\Models\School;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\Rule;

class BranchController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Branch::with('school');

        // Filter by school if school_id is provided
        if ($request->has('school_id')) {
            $query->where('school_id', $request->school_id);
        }

        // Search functionality
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('code', 'like', "%{$search}%")
                  ->orWhere('address', 'like', "%{$search}%");
            });
        }

        // Pagination
        $perPage = $request->get('per_page', 15);
        $branches = $query->paginate($perPage);

        return response()->json($branches);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'school_id' => 'required|exists:schools,id',
            'name' => 'required|string|max:255',
            'code' => [
                'nullable',
                'string',
                'max:255',
                Rule::unique('branches', 'code')->where('school_id', $request->school_id)
            ],
            'address' => 'nullable|string',
            'phone_number' => 'nullable|string|max:255',
        ]);

        $branch = Branch::create($validated);

        return response()->json([
            'message' => 'Branch created successfully',
            'data' => $branch->load('school')
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse
    {
        $branch = Branch::with('school')->findOrFail($id);

        return response()->json($branch);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $branch = Branch::findOrFail($id);

        $validated = $request->validate([
            'school_id' => 'required|exists:schools,id',
            'name' => 'required|string|max:255',
            'code' => [
                'nullable',
                'string',
                'max:255',
                Rule::unique('branches', 'code')
                    ->where('school_id', $request->school_id)
                    ->ignore($branch->id)
            ],
            'address' => 'nullable|string',
            'phone_number' => 'nullable|string|max:255',
        ]);

        $branch->update($validated);

        return response()->json([
            'message' => 'Branch updated successfully',
            'data' => $branch->load('school')
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): JsonResponse
    {
        $branch = Branch::findOrFail($id);
        $branch->delete(); // Soft delete

        return response()->json([
            'message' => 'Branch deleted successfully'
        ]);
    }
}
