<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Participant extends Model
{
    use HasFactory;
    
    protected $fillable=["cin","firstName","lastName","age","phone","gender",'adress',"bloodType","id_camp"];

    public function campaign()  {
        $this->belongsTo(campaign::class,"id_camp","id");
    }
}
