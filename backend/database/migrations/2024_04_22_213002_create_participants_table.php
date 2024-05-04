<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('participants', function (Blueprint $table) {
            $table->id();            
            $table->string("CIN");
            $table->string("firstName");
            $table->string("lastName");
            $table->string("gender");
            $table->string("phone");
            $table->string("age");
            $table->string("addresse");
            $table->string("bloodType");
            $table->unsignedBigInteger("id_camp");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('participants');
    }
};
