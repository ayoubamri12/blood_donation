<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Campaign extends Model
{
    use HasFactory;
    protected $fillable=["title","startTime","endTime"];
    public function place(){
        $this->belognsTo(Place::class,'id_place','id');
    }

    public function participants()  {
        $this->hasMany(Participant::class,"id_camp","id");
    }
}
