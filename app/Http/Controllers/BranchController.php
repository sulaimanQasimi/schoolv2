<?php

namespace App\Http\Controllers;

use App\Models\Branch;
use App\Models\School;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BranchController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Branch::with('school');

        // Search functionality
        if ($request->filled('search')) {
            $search = $request->get('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('code', 'like', "%{$search}%")
                  ->orWhere('address', 'like', "%{$search}%")
                  ->orWhere('phone_number', 'like', "%{$search}%")
                  ->orWhereHas('school', function ($schoolQuery) use ($search) {
                      $schoolQuery->where('name', 'like', "%{$search}%")
                                 ->orWhere('code', 'like', "%{$search}%");
                  });
            });
        }

        // Filter by school
        if ($request->filled('school_id')) {
            $query->where('school_id', $request->get('school_id'));
        }

        // Filter by creation date
        if ($request->filled('date_from')) {
            $query->whereDate('created_at', '>=', $request->get('date_from'));
        }

        if ($request->filled('date_to')) {
            $query->whereDate('created_at', '<=', $request->get('date_to'));
        }

        // Sort functionality
        $sortBy = $request->get('sort_by', 'created_at');
        $sortOrder = $request->get('sort_order', 'desc');
        
        if (in_array($sortBy, ['name', 'code', 'created_at'])) {
            $query->orderBy($sortBy, $sortOrder);
        } elseif ($sortBy === 'school_name') {
            $query->join('schools', 'branches.school_id', '=', 'schools.id')
                  ->orderBy('schools.name', $sortOrder)
                  ->select('branches.*');
        } else {
            $query->orderBy('created_at', 'desc');
        }

        $branches = $query->paginate(10)->withQueryString();

        // Get schools for filter dropdown
        $schools = School::select('id', 'name')->orderBy('name')->get();

        return Inertia::render('Branches/Index', [
            'branches' => $branches,
            'schools' => $schools,
            'filters' => $request->only(['search', 'school_id', 'date_from', 'date_to', 'sort_by', 'sort_order'])
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $schools = School::select('id', 'name')->get();

        return Inertia::render('Branches/Create', [
            'schools' => $schools
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'school_id' => 'required|exists:schools,id',
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:50|unique:branches,code',
            'address' => 'required|string|max:500',
            'phone_number' => 'required|string|max:20',
        ]);

        Branch::create($request->all());

        return redirect()->route('branches.index')
            ->with('success', 'Branch created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Branch $branch)
    {
        $branch->load('school');

        return Inertia::render('Branches/Show', [
            'branch' => $branch
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Branch $branch)
    {
        $schools = School::select('id', 'name')->get();

        return Inertia::render('Branches/Edit', [
            'branch' => $branch,
            'schools' => $schools
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Branch $branch)
    {
        $request->validate([
            'school_id' => 'required|exists:schools,id',
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:50|unique:branches,code,' . $branch->id,
            'address' => 'required|string|max:500',
            'phone_number' => 'required|string|max:20',
        ]);

        $branch->update($request->all());

        return redirect()->route('branches.index')
            ->with('success', 'Branch updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Branch $branch)
    {
        $branch->delete();

        return redirect()->route('branches.index')
            ->with('success', 'Branch deleted successfully.');
    }
}
