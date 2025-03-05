<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class RealState extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        "image",
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

    public function setPriceAttribute($value)
    {
        $this->attributes['price'] = floatval(str_replace(['.', ','], '', $value));
    }

    public function getPriceAttribute($value)
    {
        return number_format($value, 2, ',', '.');
    }

    public function setSquareMAttribute($value)
    {
        $this->attributes['square_m'] = (float) str_replace(['.', ','], ['', '.'], $value);
    }

    public function getSquareMAttribute($value)
    {
        return number_format($value, 2, ',', '.');
    }

    public function toArray()
    {
        return [
            'id' => $this->id,
        ] + parent::toArray();
    }
}
