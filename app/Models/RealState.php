<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RealState extends Model
{
    use HasFactory;

    protected $fillable = [
        "title",
        "type",
        "rooms",
        "condominium",
        "square_m",
        "price",
        "payment_method",
        "bathrooms",
        "address",
        "city",
        "hood",
        "cep",
        "suites",
        "air_conditioning",
        "custom_furniture",
        "furnished",
        "user_id"
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
