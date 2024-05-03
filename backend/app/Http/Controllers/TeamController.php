<?php

namespace App\Http\Controllers;

use App\Models\TeamMember;
use Illuminate\Http\Request;

class TeamController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $team=TeamMember::all();
        return response()->json([
            "data"=>$team,
            'message' => 'Team sent successfully'
          ], 200);
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
        $values=$request->input();
        TeamMember::create([
            "cin"=>$values["CIN"],
            "firstName"=>$values["nom"],
            "lastName"=>$values["prenom"],
            "age"=>$values["age"],
            "phone"=>$values["tel"],
            "gender"=>$values["genre"],
            "role"=>$values["role"],
            "id_camp"=>$values["id_camp"]
        ]);
       
    return response()->json(['message' => 'everything is done !',"sent"=>true],); 
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
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
