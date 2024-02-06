<?php

use App\Http\Controllers\ManuscriptController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/', function () {
    return Inertia::render('Auth/Login');
});



Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    // Rutas comunes para admin y user
    Route::get('/users', [UserController::class, 'index'])->name('users.index');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/manuscripts', [ManuscriptController::class, 'index'])->name('manuscripts.index');
    Route::get('/manuscripts/{id}', [ManuscriptController::class, 'show'])->name('manuscripts.show');
    

    Route::middleware(['checkrole:admin'])->group(function () {
        Route::get('/users/{id}', [UserController::class, 'show'])->name('users.show');
        Route::get('/manuscripts-create', [ManuscriptController::class, 'create'])->name('manuscripts.create');
        Route::post('/manuscripts-store', [ManuscriptController::class, 'store'])->name('manuscripts.store');
        Route::delete('/manuscripts/{id}', [ManuscriptController::class, 'destroy'])->name('manuscripts.destroy');
    });

    Route::middleware(['checkrole:user'])->group(function () {
        // Puedes agregar rutas específicas para el rol de usuario si es necesario
    });
});

require __DIR__.'/auth.php';
