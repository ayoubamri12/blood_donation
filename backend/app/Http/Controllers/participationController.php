<?php

namespace App\Http\Controllers;

use App\Models\Participant;
use Illuminate\Http\Request;

class participationController extends Controller
{
    public function index(){
  
        $participants=Participant::all();
        return response()->json([
            "data"=>$participants,
            'message' => 'Data sent successfully'
          ], 200);

    }
    public function store(Request $req){
        $values=$req->input();
        Participant::create([
            "cin"=>$values["CIN"],
            "firstName"=>$values["nom"],
            "lastName"=>$values["prenom"],
            "age"=>$values["age"],
            "phone"=>$values["tel"],
            "gender"=>$values["genre"],
            "adress"=>$values["addresse"],
            "bloodType"=>$values["bloodType"],
            "id_camp"=>$values["id_camp"]
        ]);
       
    return response()->json(['message' => 'everything is done !',"sent"=>true],); 

    }
}
