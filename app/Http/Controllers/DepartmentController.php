<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\Branch;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class DepartmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Department::with(['branch.school', 'head']);

        // Search functionality
        if ($request->filled('search')) {
            $search = $request->get('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('code', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%")
                  ->orWhereHas('branch', function ($branchQuery) use ($search) {
                      $branchQuery->where('name', 'like', "%{$search}%")
                                 ->orWhere('code', 'like', "%{$search}%")
                                 ->orWhereHas('school', function ($schoolQuery) use ($search) {
                                     $schoolQuery->where('name', 'like', "%{$search}%")
                                                ->orWhere('code', 'like', "%{$search}%");
                                 });
                  })
                  ->orWhereHas('head', function ($headQuery) use ($search) {
                      $headQuery->where('name', 'like', "%{$search}%")
                               ->orWhere('email', 'like', "%{$search}%");
                  });
            });
        }

        // Filter by branch
        if ($request->filled('branch_id')) {
            $query->where('branch_id', $request->get('branch_id'));
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
        } elseif ($sortBy === 'branch_name') {
            $query->join('branches', 'departments.branch_id', '=', 'branches.id')
                  ->orderBy('branches.name', $sortOrder)
                  ->select('departments.*');
        } elseif ($sortBy === 'school_name') {
            $query->join('branches', 'departments.branch_id', '=', 'branches.id')
                  ->join('schools', 'branches.school_id', '=', 'schools.id')
                  ->orderBy('schools.name', $sortOrder)
                  ->select('departments.*');
        } else {
            $query->orderBy('created_at', 'desc');
        }

        $departments = $query->paginate(10)->withQueryString();

        // Get branches for filter dropdown
        $branches = Branch::with('school')->select('id', 'name', 'school_id')->orderBy('name')->get();

        return Inertia::render('Departments/Index', [
            'departments' => $departments,
            'branches' => $branches,
            'filters' => $request->only(['search', 'branch_id', 'date_from', 'date_to', 'sort_by', 'sort_order'])
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $branches = Branch::with('school')->select('id', 'name', 'school_id')->orderBy('name')->get();
        $users = User::select('id', 'name', 'email')->orderBy('name')->get();

        return Inertia::render('Departments/Create', [
            'branches' => $branches,
            'users' => $users,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'branch_id' => 'required|exists:branches,id',
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:255',
            'description' => 'nullable|string',
            'head_user_id' => 'nullable|exists:users,id',
        ]);

        Department::create($request->all());

        return redirect()->route('departments.index')
            ->with('success', 'Department created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Department $department)
    {
        $department->load(['branch.school', 'head']);

        return Inertia::render('Departments/Show', [
            'department' => $department,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Department $department)
    {
        $branches = Branch::with('school')->select('id', 'name', 'school_id')->orderBy('name')->get();
        $users = User::select('id', 'name', 'email')->orderBy('name')->get();

        return Inertia::render('Departments/Edit', [
            'department' => $department,
            'branches' => $branches,
            'users' => $users,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Department $department)
    {
        $request->validate([
            'branch_id' => 'required|exists:branches,id',
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:255',
            'description' => 'nullable|string',
            'head_user_id' => 'nullable|exists:users,id',
        ]);

        $department->update($request->all());

        return redirect()->route('departments.index')
            ->with('success', 'Department updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Department $department)
    {
        $department->delete();

        return redirect()->route('departments.index')
            ->with('success', 'Department deleted successfully.');
    }
}