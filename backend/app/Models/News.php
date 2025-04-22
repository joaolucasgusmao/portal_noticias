<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class News extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        "hat",
        "title",
        "summary",
        "image",
        "content",
        "caption",
        "topics",
        "is_fixed",
        "is_draft",
        "is_active",
        "slug",
        "user_id",
    ];

    protected $casts = [
        "topics" => "array",
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class, "category_news");
    }

    public function toArray()
    {
        return [
            'id' => $this->id,
        ] + parent::toArray();
    }
}
