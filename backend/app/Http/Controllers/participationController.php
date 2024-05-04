<?php

namespace App\Http\Controllers;

use App\Models\Participant;
use Carbon\Carbon;
use Illuminate\Http\Request;

class participationController extends Controller
{
    public function index()
    {

        $participants = Participant::all();
        return response()->json([
            "data" => $participants,
            'message' => 'Data sent successfully'
        ], 200);
    }
    public function store(Request $req)
    {
        $values = $req->input();
        $participant =  Participant::create([
            "cin" => $values["CIN"],
            "firstName" => $values["nom"],
            "lastName" => $values["prenom"],
            "age" => $values["age"],
            "phone" => $values["tel"],
            "gender" => $values["genre"],
            "adress" => $values["addresse"],
            "bloodType" => $values["bloodType"],
            "id_camp" => $values["id_camp"]
        ]);
        if ($participant)
            return response()->json(['message' => 'everything is done !', "sent" => true],);
        else    
            return response()->json(['message' => 'something went wrong !', "sent" => false],);
    }
    public function destroy($cin)
    {
        $participant =  Participant::where("cin", $cin)->whereDate("created_at", Carbon::today()->toDateString())->delete();
        if ($participant)
            return response()->json(['message' => 'everything is done !', "deleted" => true],);
        else
            return response()->json(['message' => 'something went wrong !', "deleted" => [$cin, Carbon::today()->toDateString()]],);
    }
}
