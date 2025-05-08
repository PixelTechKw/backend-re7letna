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
        Schema::create('questions', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('description')->nullable();
            $table->smallInteger("order")->unsigned()->nullable();
            $table->json('answers');  //['value' => 'text' , 'is_correct' => true]
            $table->foreignId('questionnaire_id')->references('id')->on('questionnaires')->cascadeOnDelete()->cascadeOnUpdate(); // parent
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('questions');
    }
};
