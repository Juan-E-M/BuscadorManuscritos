<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Manuscript extends Model
{
    use HasFactory;

    protected $fillable = [
        'institution',
        'name',
        'summary',
        'type',
        'apc',
        'apc_value',
        'q',
        'index_base', 
        'start_date',
        'end_date',
        'status',
        'link',
    ];

    public function country()
    {
        return $this->belongsTo(Country::class);
    }
    public function ocde()
    {
        return $this->belongsToMany(Ocde::class, 'manuscript_ocde', 'manuscript_id', 'ocde_id');
    }
    public function ods()
    {
        return $this->belongsToMany(Ods::class, 'manuscript_ods', 'manuscript_id', 'ods_id');
    }
}
