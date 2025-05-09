<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreConsultantRequest;
use App\Http\Requests\UpdateConsultantRequest;
use App\Models\Consultant;

class ConsultantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $elements = Consultant::active()
            ->orderBy('order', 'asc')
            ->paginate(10)
            ->setPath('?')
            ->withQueryString();
        return $elements;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreConsultantRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Consultant $consultant)
    {
        return $consultant;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Consultant $consultant)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateConsultantRequest $request, Consultant $consultant)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Consultant $consultant)
    {
        //
    }
}
