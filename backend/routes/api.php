<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CampaignController;
use App\Http\Controllers\participationController;
use App\Http\Controllers\StaffController;
use App\Http\Controllers\TeamController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});
Route::get("/csrf-token",function (){
    return response()->json(["csrfToken"=>csrf_token()]);
});
Route::post("/login",[AuthController::class,"login"]);
Route::post("/logout",[AuthController::class,"logout"]);
# --------------------------------------------------------
Route::get("/campaigns",[CampaignController::class,"index"]);
# ----------------------------------------------------------
Route::get("/participants",[participationController::class,"index"]);
Route::post("/participants/add",[participationController::class,"store"]);
# ----------------------------------------------------------
Route::get("/staffMembers",[StaffController::class,"index"]);
Route::post("/staffMembers/add",[StaffController::class,"store"]);
# ----------------------------------------------------------
Route::get("/teamMembers",[TeamController::class,"index"]);
Route::post("/teamMembers/add",[TeamController::class,"store"]);
