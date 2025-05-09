<?php

namespace App\Http\Controllers\Api;


use App\Enums\UserGenderEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\ProfileUpdateRequest;
use App\Http\Resources\AuthResource;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $elements = UserResource::collection(User::active()
        //     ->filters($filters)
        //     ->notAdmins()
        //     ->teachers()
        //     ->whereHas('teacher_courses', fn($q) => $q->active()->has('sessions', '>', 0), '>', 0)
        //     ->whereHas('contracts', fn($q) => $q->active(), '>', 0)
        //     ->with('roles', 'title')
        //     ->orderBy('id', 'desc')
        //     ->paginate(SELF::TAKE_LESS)
        //     ->setPath('?')
        //     ->withQueryString());
        // return $elements;
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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        // if ($user->hasRole('teacher')) {
        //     $element = UserResource::make($user->load('teacher_courses.sessions', 'teacher_courses.subject.grade.stage', 'title', 'roles'));
        //     return response()->json($element, 200);
        // }
        // return response()->json(['message' => trans('general.process_failure')], 500);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update($id)
    {
        try {
            $validator = validator(request()->all(), [
                'name' => ['string', 'max:255', Rule::unique(User::class)->ignore($id)],
                'email' => ['string', 'required', 'lowercase', 'email', 'max:255', Rule::unique(User::class)->ignore($id)],
                'mobile' => ['min:6', 'max:16', 'regex:/[0-9]/', Rule::unique(User::class)->ignore($id)],
                'gender' => [Rule::in(UserGenderEnum::cases())],
                'dob' => 'nullable|string|date|before:' . Carbon::now()->subtract('15 years'),
            ]);
            if ($validator->fails()) {
                return response()->json(["message" => $validator->errors()->all()], 403);
            }
            $element = User::whereId(request()->user()->id)->first();
            $element->update(request()->all());
            $token = $element->createToken('personal')->plainTextToken;
            $element->token = $token;
            return response()->json(AuthResource::make($element), 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user): JsonResponse
    {
        $user = User::find(request()->user()->id());
        $user->update(['active' => false]);
        return response()->json(['message' => trans('general.process_success')], 200);
    }

    public function login(Request $request): JsonResponse
    {
        $validator = validator($request->all(), [
            "login" => "required",
            "password" => "required|min:6"
        ]);
        if ($validator->fails()) {
            return response()->json(["message" => $validator->errors()->all()], 404);
        }
        $user = User::where('email', $request->login)->orWhere('mobile', $request->login)->with('children')->first();
        if (!$user || !Hash::check($request->password, $user->password) || !$user->active) {
            return response()->json(["message" => trans("general.credentials_not_correct")], 404);
        }
        if (
            Auth::attempt(['mobile' => $request->login, 'password' => $request->password]) ||
            Auth::attempt(['email' => $request->login, 'password' => $request->password])

        ) {
            $token = $user->createToken('personal')->plainTextToken;
            $user->token = $token;
            return response()->json(AuthResource::make($user), 200);
        }
        return response()->json(["message" => trans("general.credentials_not_correct")], 404);
    }

    public function register(Request $request): JsonResponse
    {

        $validator = validator($request->all(), [
            'name' => 'required|string|min:6|max:255',
            'email' => 'string|required|email|lowercase|max:255|unique:' . User::class,
            'mobile' => 'required|string|min:6|max:16|regex:/[0-9]{6}/|unique:' . User::class,
            'dob' => 'nullable|string|date|before:' . Carbon::now()->subtract('15 years'),
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'gender' => ['required', Rule::in(UserGenderEnum::cases())],

        ]);
        if ($validator->fails()) {
            return response()->json(["message" => $validator->errors()->all()], 403);
        }
        try {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'mobile' => $request->mobile,
                'gender' => $request->has('gender') ? $request->gender : UserGenderEnum::MALE->value,
                'password' => Hash::make($request->password),
            ]);
            if (app()->environment("production")) {
                event(new Registered($user));
            }
            $user->token = $user->createToken('personal')->plainTextToken;
            return response()->json(AuthResource::make($user), 200);
        } catch (\Exception $e) {
            return response()->json(["message" => $e->getMessage()], 404);
        }
    }
    /**
     * Update the specified resource in storage.
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function reAuthenticate(Request $request): JsonResponse
    {
        try {
            $element = $request->user();
            return response()->json(AuthResource::make($element), 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function changePassword(Request $request): JsonResponse
    {
        $validator = validator($request->all(), [
            "password" => "required|min:8|confirmed|max:50",
        ]);
        if ($validator->fails()) {
            return response()->json(["message" => $validator->errors()->all()], 403);
        }
        $element = $request->user()->load('children');
        try {
            $update = $element->update(["password" => Hash::make($request->password)]);
            if ($update) {
                return response()->json(AuthResource::make($element), 200);
            }
            return response()->json(["message" => trans("general.information_not_correct")], 403);
        } catch (\Exception $e) {
            return response()->json(["message" => $e->getMessage()], 404);
        }
    }

    public function forgotPassword(Request $request): JsonResponse
    {
        $validator = validator($request->all(), [
            "email" => "required|email|exists:users,email",
        ]);
        if ($validator->fails()) {
            return response()->json(["message" => $validator->errors()->all()], 403);
        }
        $status = Password::sendResetLink(
            $request->only("email")
        );
        if ($status == Password::RESET_LINK_SENT) {
            return response()->json(['message' => trans('general.process_success')], 200);
        }
        return response()->json(['message' => trans('general.process_failure')], 200);
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => trans('general.process_success')], 200);
    }
}
