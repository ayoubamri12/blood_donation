<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CampaignController;
use App\Http\Controllers\participationController;
use App\Http\Controllers\PlaceController;

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
Route::post("/campaigns/add",[CampaignController::class,"store"]);
# ----------------------------------------------------------
Route::get("/participants",[participationController::class,"index"]);
Route::post("/participants/add",[participationController::class,"store"]);
Route::DELETE("/participants/{id}/delete",[participationController::class,"destroy"]);
# ---------------------------------------------------------------------------------
Route::get("/places",[PlaceController::class,"index"]);
Route::post("/places/add",[PlaceController::class,"store"]);
