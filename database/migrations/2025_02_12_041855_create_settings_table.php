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
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('caption')->nullable();
            $table->string('address')->nullable();
            $table->mediumText('description')->nullable();
            $table->string('country')->nullable();

            $table->string('image')->nullable()->default('default.png');
            $table->string('mobile')->nullable();
            $table->string('registration_no')->nullable();
            $table->string('zipcode')->nullable();
            $table->string('email')->nullable();
            $table->string('website')->nullable();
            $table->string('android')->nullable();
            $table->string('apple')->nullable();
            $table->string('youtube')->nullable();
            $table->string('instagram')->nullable();
            $table->string('facebook')->nullable();
            $table->string('tiktok')->nullable();
            $table->string('telegram')->nullable();
            $table->string('twitter')->nullable();
            $table->string('linked')->nullable();
            $table->string('whatsapp')->nullable();
            $table->string('snapchat')->nullable();


            $table->mediumText('map_url')->nullable();
            $table->mediumText('keywords')->nullable();
            $table->longText('code')->nullable();

            $table->longText('aboutus')->nullable();
            $table->longText('policy')->nullable();
            $table->longText('terms_and_conditions')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};
