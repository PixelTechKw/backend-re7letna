<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCategoryRequest;
use App\Models\Category;
use Illuminate\Http\Request;
use Throwable;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $elements = Category::orderBy('order', 'asc')->get();
        return inertia('Backend/Category/CategoryIndex', compact('elements'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Backend/Category/CategoryCreate');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoryRequest $request)
    {
        try {
            $element = Category::create($request->except('image'));
            if ($element) {
                $request->file("image") ? $this->saveMimes(
                    $element,
                    $request,
                    ["image"],
                    ['800', '800'],
                    true,
                    false
                ) : null;
            }
            return redirect()->route('backend.category.index')->with('success', trans('general.process_success'));
        } catch (Throwable $e) {

            return redirect()->back()->withErrors($e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        return inertia('Backend/Category/CategoryEdit', ['element' => $category]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        try {
            $element = $category->update($request->except('image'));
            if ($element) {
                $request->file("image") ? $this->saveMimes(
                    $category,
                    $request,
                    ["image"],
                    ['800', '800'],
                    true,
                    false
                ) : null;
            }
            return redirect()->route('backend.category.index')->with('success', trans('general.process_success'));
        } catch (Throwable $e) {
            return redirect()->back()->withErrors($e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        try {
            $category->videos()->sync([]);
            $category->tools()->sync([]);
            $category->questions()->sync([]);
            $category->children()->sync([]);
            $category->delete();
            return redirect()->route('backend.category.index')->with('success', trans('general.process_success'));
        } catch (Throwable $e) {
            return redirect()->back()->withErrors($e->getMessage());
        }
    }
}
