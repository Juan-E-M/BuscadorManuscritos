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
        Schema::create('manuscripts', function (Blueprint $table) {
            $table->id();
            $table->string('institution', 200);
            $table->string('name', 200);
            $table->text('summary');
            $table->string('type',50);
            $table->boolean('apc');
            $table->string('apc_value', 50)->nullable();
            $table->string('q',10);
            $table->string('index_base',20);
            $table->date('start_date');
            $table->date('end_date');
            $table->boolean('status');
            $table->text('link');
            //foreign keys
            $table->unsignedBigInteger('country_id')->nullable();
            $table->foreign('country_id')
                ->references('id')
                ->on('countrys')
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
        Schema::dropIfExists('manuscripts');
    }
};
