<?php

namespace App\Http\Middleware;

use App\Http\Resources\SettingExtraLightResource;
use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'ziggy' => fn() => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
                'query' => $request->query()
            ],
            'flash' => [
                // in your case, you named your flash message 'success'
                'success' => fn() => $request->session()->get('success'),
                'error' => fn() => $request->session()->get('error')
            ],
            'settings' => SettingExtraLightResource::make(Setting::first()),
        ];
    }
}
