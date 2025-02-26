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
        Schema::create("banners", function (Blueprint $table) {
            $table->id();
            $table->string("image");
            $table->boolean("top")->default(false);
            $table->boolean("side")->default(false);
            $table->boolean("home")->default(false);
            $table->string("description")->nullable();
            $table->boolean("is_active")->default(true);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists("banners");
    }
};
