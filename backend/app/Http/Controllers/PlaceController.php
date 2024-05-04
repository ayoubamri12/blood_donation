<?php

namespace App\Http\Controllers;

use App\Models\Place;
use Illuminate\Http\Request;

class PlaceController extends Controller
{
    public function index()
    {

        $places = Place::all();
        return response()->json([
            "data" => $places,
            'message' => 'Data sent successfully'
        ], 200);
    }
    public function store(Request $req)
    {
        $values = $req->input();
        $places =  Place::create([
            "placeName" => $values["place"],
        ]);
        if ($places)
            return response()->json(['message' => 'everything is done !', "sent" => true],);
        else    
            return response()->json(['message' => 'something went wrong !', "sent" => false],);
    }
}
