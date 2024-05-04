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
        Schema::create('teammembers', function (Blueprint $table) {
            $table->id();
            $table->string("CIN");
            $table->string("firstname");
            $table->string("lastname");
            $table->string("age");
            $table->string("role");
            $table->string("gender");
            $table->string("phone");
            $table->unsignedBigInteger("id_camp");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('temmembers');
    }
};
