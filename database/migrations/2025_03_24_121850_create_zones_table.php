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
        Schema::create('zones', function (Blueprint $table) {
            $table->uuid('id')->primary()->unique();
            $table->integer('number');
            $table->string('name')->references('name')->on('genres')->onDelete('cascade');
            $table->foreignUuid('floor_id')->references("id")->on("floors")->onDelete('cascade');
            $table->integer('max_bookshelves');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('zones');
    }
};
