<?php

namespace App\Core\Middleware;

use Domain\Users\Models\User;
use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');
        $permissions = $request->user() ? $request->user()->permissions->pluck('name')->toArray() : null;
        

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'quote' => ['message' => trim($message), 'author' => trim($author)],
            'auth' => [
                'user' => $request->user(),
                'permits' => [
                    'users' => [
                        'view' => $request->user() ? in_array('users.view',$permissions) : null,
                        'create' => $request->user() ? in_array('users.create', $permissions): null,
                        'edit' => $request->user() ? in_array('users.edit', $permissions) : null,
                        'delete' => $request->user() ? in_array('users.delete', $permissions) : null,
                    ],
                    'products' => [
                        'view' => $request->user() ? in_array('products.view',$permissions) : null,
                        'create' => $request->user() ? in_array('products.create', $permissions): null,
                        'edit' => $request->user() ? in_array('products.edit', $permissions) : null,
                        'delete' => $request->user() ? in_array('products.delete', $permissions) : null,
                    ],
                    'reports' => [
                        'view' => $request->user() ? in_array('reports.view',$permissions) : null,
                        'export' => $request->user() ? in_array('reports.export', $permissions): null,
                        'print' => $request->user() ? in_array('reports.print', $permissions) : null,
                    ],
                    'settings' => [
                        'access' => $request->user() ? in_array('settings.access',$permissions) : null,
                        'modify' => $request->user() ? in_array('settings.modify', $permissions): null,
                ],
            ],
        ],
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
            ],
            'translations' => [
                'ui' => trans('ui'),
                'messages' => trans('messages'),
            ],
            
        ];
    }
}
