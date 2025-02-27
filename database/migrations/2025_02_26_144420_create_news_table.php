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
        Schema::create("news", function (Blueprint $table) {
            $table->id();
            $table->string("hat")->nullable();
            $table->string("title");
            $table->text("summary")->nullable();
            $table->string("image");
            $table->text("content");
            $table->string("caption")->nullable();
            $table->json("topics")->nullable();
            $table->boolean("is_fixed")->default(false);
            $table->boolean("is_draft")->default(false);
            $table->foreignId("user_id")->constrained()->onDelete("cascade");
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
        Schema::dropIfExists("news");
    }
};
