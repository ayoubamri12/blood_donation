<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Campaign;

class CampaignController extends Controller
{

    public function index()
    {

        $campaigns = Campaign::join('places', 'places.id', '=', 'campaigns.id_place')
            ->select('campaigns.*', 'places.placeName')
            ->get();
        return response()->json([
            "data" => $campaigns,
            'message' => 'Data sent successfully'
        ], 200);
    }

    public function store(Request $req)
    {

        $values = $req->input();
        $campaigns = Campaign::create([
            "title" => $values["title"],
            "StartTime" => NULL,
            "endTime" => NULL,
            "id_place" => $values["lieu"]
        ]);
        if ($campaigns)
            return response()->json([
                'message' => 'Data saved successfully',
                "data" => $campaigns,
            ], 201);
        else
            return response()->json([
                'message' => 'something went wrong'
            ]);
    }
}
