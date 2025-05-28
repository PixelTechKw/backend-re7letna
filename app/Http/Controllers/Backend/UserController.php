<?php

namespace App\Http\Controllers\Backend;

use App\Enums\UserGenderEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use App\Services\Search\UserFilters;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Throwable;

class UserController extends Controller
{


    /**
     * Display a listing of the resource.
     */
    public function index(UserFilters $filters)
    {
        $elements = User::filters($filters)
            ->orderBy('id', 'desc')
            ->with('children')
            ->get();
        return inertia('Backend/User/UserIndex', compact('elements'));
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $genders = collect(UserGenderEnum::cases())->pluck('value');
        return inertia('Backend/User/UserCreate', compact('roles', 'genders', 'roles'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        try {
            DB::beginTransaction();
            $request->request->set('password', Hash::make($request->password));
            $user = User::create($request->request->all());
            DB::commit();
            if ($user) {
                $request->has("role") ? $user->syncRoles([$request->role]) : null;
                $request->file("image") ? $this->saveMimes(
                    $user,
                    $request,
                    ["image"],
                    ["1500", "1500"],
                    true,
                    false
                ) : $user->update(['image' => $request->role . '.png']);
                $user = $user->load('roles');
                return redirect()->route("backend.user.edit", $user)->with("success", trans("general.process_success"));
            }
        } catch (Throwable $e) {
            DB::rollback();
            return redirect()->back()->withErrors($e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        $genders = collect(UserGenderEnum::cases())->pluck('value');
        $element = $user->load('roles');
        return inertia('Backend/User/UserEdit', compact('roles', 'genders', 'element'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $updated = $user->update($request->filled("password") ? $request->except(["_token", "image", "categories", "tags"]) : $request->except(["_token", "image", "categories", "tags", "password"]));
        if ($updated) {
            $user->syncRoles([$request->role]);
            $request->file("image") ? $this->saveMimes(
                $user,
                $request,
                ["image"],
                ["1500", "1500"],
                true,
                false
            ) : null;
            return redirect()->route("backend.user.index")->with("success", trans("general.process_success"));
        }
        return redirect()->route("backend.user.edit", $user->id)->with("error", trans("general.process_failure"));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->courses()->sync([]);
        $user->roles()->sync([]);
        $user->delete();
        return redirect()->route("backend.user.index")->with("success", trans("general.process_success"));
    }
}
