<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('real_states', function (Blueprint $table) {
            $table->id();
            $table->string("image");
            $table->string("title");
            $table->enum("type", ["house", "apartment", "studio", "comercial"]);
            $table->enum("payment_method", ["sale", "rent"]);
            $table->decimal("price", 15, 2)->index();
            $table->string("city");
            $table->string("address");
            $table->string("hood")->index();
            $table->tinyInteger("rooms")->index();
            $table->tinyInteger("bathrooms");
            $table->string("cep");
            $table->decimal("square_m", 10, 2);
            $table->string("condominium")->nullable();
            $table->tinyInteger("suites")->nullable();
            $table->boolean("air_conditioning")->default(false);
            $table->boolean("custom_furniture")->default(false);
            $table->boolean("furnished")->default(false);
            $table->foreignId("user_id")->constrained()->onDelete("cascade");
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('real_states');
    }
};
