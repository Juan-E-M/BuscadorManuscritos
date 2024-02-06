<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('manuscript_ocde', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('manuscript_id');
            $table->foreign('manuscript_id')
                ->references('id')
                ->on('manuscripts')
                ->onDelete('cascade');
            $table->unsignedBigInteger('ocde_id')->nullable();
            $table->foreign('ocde_id')
                ->references('id')
                ->on('ocdes')
                ->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('manuscript_ocde');
    }
};
